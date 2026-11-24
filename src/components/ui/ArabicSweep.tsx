"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useExperience } from "@/context/ExperienceContext";

gsap.registerPlugin(ScrollTrigger);

interface ArabicSweepProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  immediate?: boolean;
  delay?: number;
}

/** FX-TY4: Native Amiri RTL Arabic Calligraphy Ink-Sweep (Right-to-Left) */
export function ArabicSweep({
  text,
  className = "",
  style,
  immediate = false,
  delay = 0,
}: ArabicSweepProps) {
  const { reducedMotion } = useExperience();
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion) return;

    const ctx = gsap.context(() => {
      const animProps = {
        clipPath: "inset(0% 0% 0% 0%)",
        opacity: 1,
        duration: 1.35,
        delay,
        ease: "power3.inOut",
      };

      gsap.fromTo(
        el,
        {
          clipPath: "inset(0% 0% 0% 100%)",
          opacity: 0.2,
        },
        immediate
          ? animProps
          : {
              ...animProps,
              scrollTrigger: {
                trigger: el,
                start: "top 88%",
                once: true,
              },
            }
      );
    }, el);

    return () => ctx.revert();
  }, [immediate, delay, reducedMotion]);

  return (
    <span
      ref={ref}
      lang="ar"
      dir="rtl"
      className={`font-arabic arabic-sweep ${className}`}
      style={style}
    >
      {text}
    </span>
  );
}
