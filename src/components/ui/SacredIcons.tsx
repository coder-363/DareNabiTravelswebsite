import React from "react";

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

/** Minimal 8-Point Geometric Star (Restrained Islamic Geometric Reference) */
export function KhatamStar({
  size = 14,
  color = "currentColor",
  className,
  style,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <rect
        x="5"
        y="5"
        width="14"
        height="14"
        stroke={color}
        strokeWidth="1.1"
      />
      <rect
        x="5"
        y="5"
        width="14"
        height="14"
        transform="rotate(45 12 12)"
        stroke={color}
        strokeWidth="1.1"
      />
    </svg>
  );
}

/** Subtle 4.5% Opacity Warm Gold Islamic Geometric Lattice (Footer & Preloader Only) */
export function KhatamLatticePattern({ opacity = 0.05 }: { opacity?: number }) {
  return (
    <svg
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        opacity,
        pointerEvents: "none",
      }}
    >
      <defs>
        <pattern
          id="khatam-lattice"
          width="96"
          height="96"
          patternUnits="userSpaceOnUse"
        >
          <g fill="none" stroke="#D2A04A" strokeWidth="0.75">
            <rect x="24" y="24" width="48" height="48" />
            <rect
              x="24"
              y="24"
              width="48"
              height="48"
              transform="rotate(45 48 48)"
            />
            <circle cx="48" cy="48" r="10" strokeOpacity="0.55" />
            <path d="M0 48H14M82 48H96M48 0V14M48 82V96" strokeOpacity="0.4" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#khatam-lattice)" />
    </svg>
  );
}

/** Refined Editorial Thin Arrow */
export function ArrowRightThin({
  size = 18,
  color = "currentColor",
  className,
  style,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path
        d="M3.5 10H16.5M16.5 10L11.5 5M16.5 10L11.5 15"
        stroke={color}
        strokeWidth="1.25"
        strokeLinecap="square"
      />
    </svg>
  );
}

/** Refined Hairline Close Cross */
export function CloseThin({
  size = 22,
  color = "currentColor",
  className,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M5 5L19 19M19 5L5 19"
        stroke={color}
        strokeWidth="1.25"
        strokeLinecap="square"
      />
    </svg>
  );
}
