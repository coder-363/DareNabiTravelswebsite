"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useExperience } from "@/context/ExperienceContext";

gsap.registerPlugin(ScrollTrigger);

/* ==========================================================================
   PHASE 2 SIGNATURE GRAPHIC — HARAMAIN TRAVEL ROUTE LINE
   Honors Brand Guide §6 ("fine gold lines · travel-inspired route lines").
   Draws a delicate curved Warm Gold route line from Origin -> Jeddah ->
   Makkah al-Mukarramah -> Haramain Rail -> Madinah al-Munawwarah on scroll.
   ========================================================================== */

const WAYPOINTS = [
  { label: "Departure", sub: "Calm Send-Off", x: 60 },
  { label: "Jeddah", sub: "Private Reception", x: 310 },
  { label: "Makkah", sub: "21.4225° N · 39.8262° E", x: 620 },
  { label: "Madinah", sub: "24.4672° N · 39.6112° E", x: 940 },
];

export function HaramainRouteLine() {
  const { reducedMotion } = useExperience();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    const path = pathRef.current;
    if (!root || !path || reducedMotion) return;

    const totalLen = path.getTotalLength();
    gsap.set(path, {
      strokeDasharray: totalLen,
      strokeDashoffset: totalLen,
    });

    const ctx = gsap.context(() => {
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top 82%",
          end: "bottom 42%",
          scrub: 0.9,
        },
      });
    }, root);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div
      ref={rootRef}
      style={{
        paddingBlock: "clamp(48px, 6vw, 84px)",
        borderTop: "1px solid var(--color-hairline)",
        borderBottom: "1px solid var(--color-hairline)",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
            marginBottom: "28px",
          }}
        >
          <span className="t-eyebrow">The Sacred Corridor</span>
          <span className="t-meta" style={{ color: "var(--color-ink-muted)" }}>
            Private Reception · Haramain High-Speed Rail · Seamless Transfers
          </span>
        </div>

        {/* Fine Gold Travel Route Arc */}
        <svg
          viewBox="0 0 1000 130"
          width="100%"
          fill="none"
          aria-label="Travel route line from Departure through Jeddah and Makkah to Madinah"
          style={{ width: "100%", height: "auto", overflow: "visible" }}
        >
          {/* Quiet Dashed Reference Arc */}
          <path
            d="M 60 92 Q 185 28 310 74 T 620 56 T 940 42"
            stroke="#D7CCBC"
            strokeWidth="1"
            strokeDasharray="4 6"
          />

          {/* Live-Drawing Fine Warm Gold Route Line */}
          <path
            ref={pathRef}
            d="M 60 92 Q 185 28 310 74 T 620 56 T 940 42"
            stroke="#D2A04A"
            strokeWidth="1.5"
          />

          {/* Waypoint Markers */}
          {WAYPOINTS.map((pt, i) => {
            const cy = i === 0 ? 92 : i === 1 ? 74 : i === 2 ? 56 : 42;
            const isSanctuary = i >= 2;
            return (
              <g key={pt.label}>
                {isSanctuary && (
                  <circle
                    cx={pt.x}
                    cy={cy}
                    r="11"
                    stroke="#D2A04A"
                    strokeOpacity="0.45"
                    strokeWidth="1"
                  />
                )}
                <circle
                  cx={pt.x}
                  cy={cy}
                  r={isSanctuary ? "4.5" : "3.5"}
                  fill={isSanctuary ? "#4A0711" : "#D2A04A"}
                  stroke="#D2A04A"
                  strokeWidth="1.2"
                />
              </g>
            );
          })}
        </svg>

        {/* Waypoint Labels */}
        <div
          className="route-labels"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gap: "16px",
            marginTop: "14px",
          }}
        >
          {WAYPOINTS.map((pt, i) => (
            <div key={pt.label}>
              <div
                className="font-serif"
                style={{
                  fontSize: "clamp(1.1rem, 1.6vw, 1.45rem)",
                  color: i >= 2 ? "var(--color-burgundy)" : "var(--color-ink)",
                  fontWeight: 500,
                }}
              >
                {pt.label}
              </div>
              <div
                className="t-meta"
                style={{
                  color: "var(--color-ink-muted)",
                  fontWeight: 400,
                  marginTop: "2px",
                  fontSize: "0.76rem",
                }}
              >
                {pt.sub}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 680px) {
          .route-labels {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            row-gap: 20px !important;
          }
        }
      `}</style>
    </div>
  );
}
