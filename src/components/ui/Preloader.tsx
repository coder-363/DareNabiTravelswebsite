"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useExperience } from "@/context/ExperienceContext";
import { KhatamLatticePattern } from "./SacredIcons";
import { BrandLogo } from "./BrandLogo";

/* ==========================================================================
   FX-UI1 — ACT 0: THE OPENING THRESHOLD PRELOADER
   Deep Burgundy (#4A0711) canvas with fine Warm Gold (#D2A04A) architectural
   arch line, RTL Bismillah reveal, and the approved BrandLogo.
   ========================================================================== */

export function Preloader() {
  const { preloaderDone, completePreloader, reducedMotion } = useExperience();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const archPathRef = useRef<SVGPathElement | null>(null);
  const innerArchRef = useRef<SVGPathElement | null>(null);
  const bismillahRef = useRef<HTMLDivElement | null>(null);
  const logoWrapRef = useRef<HTMLDivElement | null>(null);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (preloaderDone || reducedMotion) return;

    const root = rootRef.current;
    const archPath = archPathRef.current;
    const innerArch = innerArchRef.current;
    if (!root || !archPath || !innerArch) return;

    const len1 = archPath.getTotalLength();
    const len2 = innerArch.getTotalLength();

    gsap.set(archPath, { strokeDasharray: len1, strokeDashoffset: len1 });
    gsap.set(innerArch, { strokeDasharray: len2, strokeDashoffset: len2 });

    const obj = { val: 0 };

    const tl = gsap.timeline({
      onComplete: () => {
        completePreloader();
      },
    });

    tl.to(archPath, {
      strokeDashoffset: 0,
      duration: 1.15,
      ease: "power2.inOut",
    })
      .to(
        innerArch,
        {
          strokeDashoffset: 0,
          duration: 0.95,
          ease: "power2.inOut",
        },
        0.22
      )
      .to(
        obj,
        {
          val: 100,
          duration: 1.35,
          ease: "power2.inOut",
          onUpdate: () => setCounter(Math.round(obj.val)),
        },
        0.05
      )
      .fromTo(
        bismillahRef.current,
        { clipPath: "inset(0% 0% 0% 100%)", opacity: 0 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          opacity: 1,
          duration: 0.85,
          ease: "power3.inOut",
        },
        0.35
      )
      .fromTo(
        logoWrapRef.current,
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
        0.55
      )
      .to(
        root,
        {
          clipPath: "inset(0% 0% 100% 0%)",
          duration: 0.95,
          ease: "power4.inOut",
        },
        "+=0.22"
      );

    return () => {
      tl.kill();
    };
  }, [preloaderDone, reducedMotion, completePreloader]);

  if (preloaderDone) return null;

  return (
    <div
      ref={rootRef}
      role="status"
      aria-label="Preparing Dar E Nabi Travels"
      className="no-print"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9800,
        backgroundColor: "var(--color-burgundy)",
        color: "var(--color-ivory)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        clipPath: "inset(0% 0% 0% 0%)",
        overflow: "hidden",
      }}
    >
      <KhatamLatticePattern opacity={0.05} />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "26px",
        }}
      >
        <div
          ref={bismillahRef}
          lang="ar"
          dir="rtl"
          className="font-arabic"
          style={{
            fontSize: "clamp(1.25rem, 2.2vw, 1.75rem)",
            color: "var(--color-gold)",
            opacity: 0,
          }}
        >
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </div>

        <svg
          width="116"
          height="148"
          viewBox="0 0 120 154"
          fill="none"
          aria-hidden="true"
        >
          <path
            ref={archPathRef}
            d="M12 146V68C12 36 33.5 14 60 6C86.5 14 108 36 108 68V146H12Z"
            stroke="#D2A04A"
            strokeWidth="1.2"
          />
          <path
            ref={innerArchRef}
            d="M28 146V72C28 49 42.5 32 60 26C77.5 32 92 49 92 72V146"
            stroke="#F3EEE6"
            strokeOpacity="0.4"
            strokeWidth="0.9"
          />
          <text
            x="60"
            y="96"
            textAnchor="middle"
            fill="#F3EEE6"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "26px",
              fontWeight: 300,
              letterSpacing: "0.04em",
            }}
          >
            {String(counter).padStart(2, "0")}
          </text>
        </svg>

        <div
          ref={logoWrapRef}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            opacity: 0,
          }}
        >
          <BrandLogo variant="light" height={112} />
          <div
            style={{
              fontSize: "0.72rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--color-gold)",
            }}
          >
            A journey of faith, guided with care.
          </div>
        </div>
      </div>
    </div>
  );
}
