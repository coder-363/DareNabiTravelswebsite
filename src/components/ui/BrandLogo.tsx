"use client";

import React from "react";

interface BrandLogoProps {
  /**
   * "light": sits directly on Deep Burgundy (#4A0711) or dark photography surfaces
   *          using the transparent official artwork (/logo-light.png).
   * "dark":  sits on Warm Ivory (#F3EEE6) surfaces inside a refined Deep Burgundy
   *          crest plate so the original white & gold logo maintains AAA contrast
   *          without altering any logo color, shape, or proportion.
   */
  variant?: "dark" | "light";
  height?: number;
  className?: string;
}

export function BrandLogo({
  variant = "dark",
  height = 52,
  className = "",
}: BrandLogoProps) {
  if (variant === "dark") {
    return (
      <span
        className={className}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "var(--color-burgundy)",
          border: "1px solid rgba(210, 160, 74, 0.42)",
          borderRadius: "2px",
          padding: `${Math.max(6, Math.round(height * 0.14))}px ${Math.max(12, Math.round(height * 0.28))}px`,
          lineHeight: 0,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo-light.png"
          alt="Dar E Nabi Travels"
          style={{
            height: `${height}px`,
            width: "auto",
            objectFit: "contain",
            display: "block",
            filter: "none",
            boxShadow: "none",
          }}
        />
      </span>
    );
  }

  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "4px 6px", // Protected clear space
        lineHeight: 0,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo-light.png"
        alt="Dar E Nabi Travels"
        style={{
          height: `${height}px`,
          width: "auto",
          objectFit: "contain",
          display: "block",
          filter: "none",
          boxShadow: "none",
        }}
      />
    </span>
  );
}
