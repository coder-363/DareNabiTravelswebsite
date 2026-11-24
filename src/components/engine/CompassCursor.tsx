"use client";

import { useEffect, useRef, useState } from "react";
import { useExperience } from "@/context/ExperienceContext";

/* ==========================================================================
   FX-UI2 — ADAPTIVE WARM GOLD COMPASS CURSOR
   Desktop fine-pointer only. Zero React re-renders during pointer movement.
   ========================================================================== */

export function CompassCursor() {
  const { reducedMotion } = useExperience();
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const [label, setLabel] = useState<string>("");
  const [mode, setMode] = useState<"default" | "active" | "label" | "drag">(
    "default"
  );
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || reducedMotion) return;
    const isFinePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;
    if (!isFinePointer) return;

    setEnabled(true);
    document.body.classList.add("has-compass-cursor");

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { x: pos.x, y: pos.y };
    let visible = false;

    const onMove = (e: PointerEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (!visible) {
        visible = true;
        if (dotRef.current) dotRef.current.style.opacity = "1";
        if (ringRef.current) ringRef.current.style.opacity = "1";
      }

      const target = e.target as HTMLElement | null;
      const cursorHost = target?.closest<HTMLElement>("[data-cursor]");
      const interactive = target?.closest<HTMLElement>(
        "a, button, input, select, textarea"
      );

      if (cursorHost) {
        const type = cursorHost.getAttribute("data-cursor");
        if (type === "drag") {
          setMode("drag");
          setLabel("←  →");
        } else if (type === "explore") {
          setMode("label");
          setLabel("Explore");
        } else if (type === "view") {
          setMode("label");
          setLabel("View");
        } else {
          setMode("active");
          setLabel("");
        }
      } else if (interactive) {
        setMode("active");
        setLabel("");
      } else {
        setMode("default");
        setLabel("");
      }
    };

    const onLeave = () => {
      visible = false;
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    let rafId = 0;
    const tick = () => {
      rafId = requestAnimationFrame(tick);
      ringPos.x += (pos.x - ringPos.x) * 0.14;
      ringPos.y += (pos.y - ringPos.y) * 0.14;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%)`;
      }
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.body.classList.remove("has-compass-cursor");
    };
  }, [reducedMotion]);

  if (!enabled) return null;

  const ringSize =
    mode === "label" || mode === "drag" ? 74 : mode === "active" ? 50 : 34;

  return (
    <div aria-hidden="true" className="no-print" style={{ pointerEvents: "none" }}>
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: mode === "label" || mode === "drag" ? 0 : 6,
          height: mode === "label" || mode === "drag" ? 0 : 6,
          borderRadius: "50%",
          backgroundColor: "var(--color-gold)",
          pointerEvents: "none",
          zIndex: 9999,
          opacity: 0,
          transition: "width 0.3s ease, height 0.3s ease, opacity 0.3s ease",
          willChange: "transform",
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: ringSize,
          height: ringSize,
          borderRadius: "50%",
          border: "1px solid var(--color-gold)",
          backgroundColor:
            mode === "label" || mode === "drag"
              ? "rgba(74, 7, 17, 0.92)"
              : "transparent",
          color: "var(--color-ivory)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "0.66rem",
          fontWeight: 500,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          pointerEvents: "none",
          zIndex: 9998,
          opacity: 0,
          transition:
            "width 0.4s cubic-bezier(0.16, 1, 0.3, 1), height 0.4s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.35s ease, opacity 0.3s ease",
          willChange: "transform",
        }}
      >
        {label}
      </div>
    </div>
  );
}
