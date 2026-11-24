"use client";

import { useExperience } from "@/context/ExperienceContext";
import { BrandLogo } from "@/components/ui/BrandLogo";

/* ==========================================================================
   FX-UI6 — ARCHITECTURAL PAGE TRANSITION VEIL
   Deep Burgundy (#4A0711) curtain displaying the approved BrandLogo
   with a fine Warm Gold horizontal line — zero visual clutter.
   ========================================================================== */

export function PageTransition() {
  const { isTransitioning } = useExperience();

  return (
    <div
      aria-hidden="true"
      className="no-print"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9200,
        backgroundColor: "var(--color-burgundy)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
        pointerEvents: "none",
        clipPath: isTransitioning
          ? "inset(0% 0% 0% 0%)"
          : "inset(100% 0% 0% 0%)",
        transition: "clip-path 0.52s cubic-bezier(0.76, 0, 0.24, 1)",
      }}
    >
      <div
        style={{
          opacity: isTransitioning ? 1 : 0,
          transform: isTransitioning ? "translateY(0)" : "translateY(10px)",
          transition: "opacity 0.38s ease 0.1s, transform 0.45s ease 0.1s",
        }}
      >
        <BrandLogo variant="light" height={96} />
      </div>
      <span
        style={{
          width: isTransitioning ? "64px" : "0px",
          height: "1px",
          backgroundColor: "var(--color-gold)",
          transition: "width 0.45s cubic-bezier(0.16, 1, 0.3, 1) 0.14s",
        }}
      />
    </div>
  );
}
