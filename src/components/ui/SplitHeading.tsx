"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useExperience } from "@/context/ExperienceContext";

gsap.registerPlugin(ScrollTrigger);

interface SplitHeadingProps {
  lines: React.ReactNode[];
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  style?: React.CSSProperties;
  immediate?: boolean;
  delay?: number;
}

export function SplitHeading({
  lines,
  as: Tag = "h2",
  className = "t-display-xl",
  style,
  immediate = false,
  delay = 0,
}: SplitHeadingProps) {
  const { reducedMotion } = useExperience();
  const rootRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || reducedMotion) return;

    const inners = el.querySelectorAll<HTMLElement>(".split-line-inner");
    if (!inners.length) return;

    const ctx = gsap.context(() => {
      if (immediate) {
        gsap.fromTo(
          inners,
          { yPercent: 112, rotate: 1.6, opacity: 0 },
          {
            yPercent: 0,
            rotate: 0,
            opacity: 1,
            duration: 1.15,
            stagger: 0.1,
            delay,
            ease: "power3.out",
          }
        );
      } else {
        gsap.fromTo(
          inners,
          { yPercent: 112, rotate: 1.4, opacity: 0 },
          {
            yPercent: 0,
            rotate: 0,
            opacity: 1,
            duration: 1.05,
            stagger: 0.09,
            delay,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 86%",
              once: true,
            },
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, [immediate, delay, reducedMotion]);

  return (
    <Tag ref={rootRef as React.RefObject<HTMLHeadingElement>} className={className} style={style}>
      {lines.map((line, i) => (
        <span key={i} className="split-line-mask">
          <span className="split-line-inner">{line}</span>
        </span>
      ))}
    </Tag>
  );
}
