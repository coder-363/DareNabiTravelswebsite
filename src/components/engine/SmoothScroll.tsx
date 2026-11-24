"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useExperience } from "@/context/ExperienceContext";
import { usePathname } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll() {
  const { menuOpen, conciergeOpen, reducedMotion } = useExperience();
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Tier 2 / Tier 3 Guardrail: Native kinetic touch scroll on mobile & reduced motion
    const isTouchDevice =
      window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 1024;
    if (reducedMotion || isTouchDevice) {
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      duration: 1.25,
      lerp: 0.085,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.2,
    });

    lenisRef.current = lenis;

    lenis.on("scroll", (e: Lenis) => {
      ScrollTrigger.update();
      const clampedVel = Math.max(-25, Math.min(25, e.velocity || 0));
      document.documentElement.style.setProperty(
        "--scroll-velocity",
        clampedVel.toFixed(3)
      );
    });

    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reducedMotion]);

  /* Pause smooth scroll while full-screen overlays are open */
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    if (menuOpen || conciergeOpen) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [menuOpen, conciergeOpen]);

  /* Reset scroll to top cleanly on route change & refresh ScrollTrigger */
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
    const timer = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 180);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  return null;
}
