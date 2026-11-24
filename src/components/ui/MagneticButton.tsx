"use client";

import React, { useRef } from "react";
import { useExperience } from "@/context/ExperienceContext";
import { ArrowRightThin } from "./SacredIcons";

interface MagneticButtonProps {
  children: string;
  variant?: "primary" | "ivory" | "outline" | "outline-light";
  href?: string;
  external?: boolean;
  onClick?: () => void;
  showArrow?: boolean;
  className?: string;
  style?: React.CSSProperties;
  type?: "button" | "submit";
}

export function MagneticButton({
  children,
  variant = "primary",
  href,
  external = false,
  onClick,
  showArrow = true,
  className = "",
  style,
  type = "button",
}: MagneticButtonProps) {
  const { navigateTo, reducedMotion } = useExperience();
  const ref = useRef<HTMLElement | null>(null);

  const handleMove = (e: React.PointerEvent<HTMLElement>) => {
    if (reducedMotion || e.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.18;
    const dy = (e.clientY - (rect.top + rect.height / 2)) * 0.22;
    const cx = Math.max(-10, Math.min(10, dx));
    const cy = Math.max(-8, Math.min(8, dy));
    ref.current.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
  };

  const handleLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "translate3d(0, 0, 0)";
  };

  const inner = (
    <>
      <span className="btn-sakinah__fill" aria-hidden="true" />
      <span className="btn-sakinah__slot">
        <span className="btn-sakinah__text">{children}</span>
        <span
          className="btn-sakinah__text btn-sakinah__text--clone"
          aria-hidden="true"
        >
          {children}
        </span>
      </span>
      {showArrow && <ArrowRightThin size={16} className="btn-sakinah__icon" />}
    </>
  );

  const sharedClasses = `btn-sakinah btn-sakinah--${variant} magnetic-btn ${className}`;
  const sharedStyle: React.CSSProperties = {
    transition:
      "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease, color 0.4s ease",
    willChange: "transform",
    ...style,
  };

  if (href && external) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={sharedClasses}
        style={sharedStyle}
        data-cursor="magnetic"
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
      >
        {inner}
      </a>
    );
  }

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={sharedClasses}
        style={sharedStyle}
        data-cursor="magnetic"
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        onClick={(e) => {
          e.preventDefault();
          onClick?.();
          navigateTo(href);
        }}
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      className={sharedClasses}
      style={sharedStyle}
      data-cursor="magnetic"
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      onClick={onClick}
    >
      {inner}
    </button>
  );
}
