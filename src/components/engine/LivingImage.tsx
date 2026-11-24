"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useExperience } from "@/context/ExperienceContext";

gsap.registerPlugin(ScrollTrigger);

interface LivingImageProps {
  src: string;
  alt: string;
  aspect?: string;
  arch?: boolean;
  parallax?: boolean;
  priority?: boolean;
  cursorLabel?: "view" | "explore" | "drag";
  objectPosition?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function LivingImage({
  src,
  alt,
  aspect = "4 / 5",
  arch = false,
  parallax = true,
  priority = false,
  cursorLabel,
  objectPosition = "center center",
  className = "",
  style,
}: LivingImageProps) {
  const { reducedMotion } = useExperience();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const sheenRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const img = imgRef.current;
    if (!wrapper || !img || reducedMotion) return;

    const ctx = gsap.context(() => {
      // FX-GL3: Dawn-Wash Architectural Veil Unveil (plays once)
      gsap.fromTo(
        wrapper,
        {
          clipPath: "inset(14% 0% 0% 0%)",
          opacity: 0.35,
        },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          opacity: 1,
          duration: 1.45,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrapper,
            start: "top 88%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        img,
        { scale: 1.13 },
        {
          scale: parallax ? 1.06 : 1.0,
          duration: 1.75,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrapper,
            start: "top 88%",
            once: true,
          },
        }
      );

      // FX-SC4: Gentle Asymmetric Depth Parallax inside frame
      if (parallax && window.innerWidth >= 900) {
        gsap.fromTo(
          img,
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: wrapper,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.1,
            },
          }
        );
      }
    }, wrapper);

    return () => ctx.revert();
  }, [parallax, reducedMotion]);

  /* Phase 2: Subtle Silk-Light Cursor Reflection inside frame */
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || e.pointerType !== "mouse" || !wrapperRef.current || !sheenRef.current)
      return;
    const rect = wrapperRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    sheenRef.current.style.background = `radial-gradient(circle 340px at ${x}% ${y}%, rgba(210, 160, 74, 0.14), transparent 70%)`;
    sheenRef.current.style.opacity = "1";
  };

  const handlePointerLeave = () => {
    if (!sheenRef.current) return;
    sheenRef.current.style.opacity = "0";
  };

  return (
    <div
      ref={wrapperRef}
      data-cursor={cursorLabel}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`living-image ${arch ? "arch-mask" : ""} ${className}`}
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: aspect,
        overflow: "hidden",
        backgroundColor: "var(--color-sand)",
        ...style,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className="editorial-photo"
        style={{
          width: "100%",
          height: parallax ? "116%" : "100%",
          marginTop: parallax ? "-8%" : "0",
          objectFit: "cover",
          objectPosition,
          willChange: "transform",
          transition:
            "transform 0.9s cubic-bezier(0.16, 1, 0.3, 1), filter 0.8s ease",
        }}
      />
      {/* Phase 2 Silk Warm Gold Optical Sheen */}
      <div
        ref={sheenRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0,
          pointerEvents: "none",
          transition: "opacity 0.6s ease",
        }}
      />
      {/* Delicate Architectural Edge Framing */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          border: "1px solid rgba(210, 160, 74, 0.14)",
          borderRadius: arch ? "var(--radius-arch)" : "0",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
