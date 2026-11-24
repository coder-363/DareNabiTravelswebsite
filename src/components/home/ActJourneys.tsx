"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { useExperience } from "@/context/ExperienceContext";
import { JOURNEYS, Journey } from "@/data/content";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { ArrowRightThin } from "@/components/ui/SacredIcons";
import { MagneticButton } from "@/components/ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger, Flip);

const FILTERS = ["All", "Serenity", "Heritage", "Family", "Ramadan"] as const;

interface ActJourneysProps {
  compactHeader?: boolean;
}

export function ActJourneys({ compactHeader = false }: ActJourneysProps) {
  const { setAtmosphere, setActiveAct, navigateTo, openConcierge, reducedMotion } =
    useExperience();

  const sectionRef = useRef<HTMLElement | null>(null);
  const ledgerRef = useRef<HTMLDivElement | null>(null);
  const previewRef = useRef<HTMLDivElement | null>(null);

  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  const visibleJourneys =
    filter === "All"
      ? JOURNEYS
      : JOURNEYS.filter((j) => j.category === filter);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || compactHeader) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top 58%",
        end: "bottom 42%",
        onEnter: () => {
          setActiveAct(4);
          setAtmosphere("sand");
        },
        onEnterBack: () => {
          setActiveAct(4);
          setAtmosphere("sand");
        },
      });
    }, section);

    return () => ctx.revert();
  }, [compactHeader, setAtmosphere, setActiveAct]);

  useEffect(() => {
    if (typeof window === "undefined" || reducedMotion) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const pos = { x: window.innerWidth * 0.6, y: window.innerHeight * 0.5 };
    const cur = { x: pos.x, y: pos.y };
    let rafId = 0;

    const onMove = (e: PointerEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
    };

    window.addEventListener("pointermove", onMove, { passive: true });

    const loop = () => {
      rafId = requestAnimationFrame(loop);
      const vx = pos.x - cur.x;
      cur.x += vx * 0.11;
      cur.y += (pos.y - cur.y) * 0.11;
      const tilt = Math.max(-4.5, Math.min(4.5, vx * 0.065));

      if (previewRef.current) {
        previewRef.current.style.transform = `translate3d(${cur.x + 28}px, ${cur.y - 165}px, 0) rotate(${tilt.toFixed(2)}deg)`;
      }
    };
    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onMove);
    };
  }, [reducedMotion]);

  const handleFilter = (next: (typeof FILTERS)[number]) => {
    if (next === filter) return;
    const ledger = ledgerRef.current;
    if (!ledger || reducedMotion) {
      setFilter(next);
      return;
    }
    const state = Flip.getState(ledger.querySelectorAll(".journey-row"));
    setFilter(next);
    requestAnimationFrame(() => {
      Flip.from(state, {
        duration: 0.65,
        ease: "power3.out",
        absolute: false,
        stagger: 0.04,
      });
      ScrollTrigger.refresh();
    });
  };

  return (
    <section
      id="act-journeys"
      ref={sectionRef}
      style={{
        position: "relative",
        paddingTop: compactHeader ? "40px" : "var(--section-pad)",
        paddingBottom: "var(--section-pad)",
        backgroundColor: compactHeader ? "transparent" : "rgba(232, 224, 212, 0.72)",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: "32px",
            marginBottom: "clamp(48px, 6vw, 80px)",
          }}
        >
          <div>
            {!compactHeader && (
              <div className="t-eyebrow" style={{ marginBottom: "16px" }}>
                Act V — Curated Umrah Journeys
              </div>
            )}
            <SplitHeading
              className="t-display-xl"
              lines={[
                <>Choose the way you</>,
                <>
                  wish to <em className="editorial-em">travel</em>.
                </>,
              ]}
            />
          </div>

          <div
            role="tablist"
            aria-label="Filter Umrah journeys"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "clamp(16px, 2.2vw, 28px)",
              paddingBottom: "6px",
            }}
          >
            {FILTERS.map((f) => {
              const active = filter === f;
              return (
                <button
                  key={f}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => handleFilter(f)}
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: active ? 500 : 400,
                    color: active
                      ? "var(--color-burgundy)"
                      : "var(--color-ink-muted)",
                    paddingBottom: "6px",
                    borderBottom: active
                      ? "1.5px solid var(--color-gold)"
                      : "1.5px solid transparent",
                    transition: "color 0.3s ease, border-color 0.3s ease",
                  }}
                >
                  {f}
                </button>
              );
            })}
          </div>
        </div>

        <div
          ref={ledgerRef}
          style={{
            borderTop: "1px solid var(--color-hairline)",
          }}
          onMouseLeave={() => setHoveredSlug(null)}
        >
          {visibleJourneys.map((j: Journey) => {
            const isHovered = hoveredSlug === j.slug;
            const isDimmed = hoveredSlug !== null && !isHovered;

            return (
              <a
                key={j.slug}
                href={`/journeys/${j.slug}`}
                data-cursor="view"
                className="journey-row"
                onMouseEnter={() => setHoveredSlug(j.slug)}
                onFocus={() => setHoveredSlug(j.slug)}
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo(`/journeys/${j.slug}`);
                }}
                style={{
                  display: "grid",
                  gridTemplateColumns: "64px 1.4fr 1fr 0.9fr auto",
                  alignItems: "center",
                  gap: "clamp(16px, 2.5vw, 32px)",
                  paddingBlock: "clamp(28px, 3.8vw, 44px)",
                  borderBottom: "1px solid var(--color-hairline)",
                  opacity: isDimmed ? 0.42 : 1,
                  transform: isHovered ? "translateX(8px)" : "translateX(0)",
                  transition:
                    "opacity 0.45s ease, transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                <span
                  className="font-serif"
                  style={{
                    fontStyle: "italic",
                    fontSize: "1.3rem",
                    color: "var(--color-gold-text)",
                  }}
                >
                  {j.index}
                </span>

                <div>
                  <div
                    className="t-display-l"
                    style={{
                      fontSize: "clamp(1.65rem, 2.7vw, 2.45rem)",
                      color: isHovered
                        ? "var(--color-burgundy)"
                        : "var(--color-ink)",
                      transition: "color 0.35s ease",
                    }}
                  >
                    {j.title}
                  </div>
                  <div
                    className="t-meta"
                    style={{
                      marginTop: "6px",
                      color: "var(--color-ink-muted)",
                      fontWeight: 400,
                    }}
                  >
                    {j.subtitle}
                  </div>
                </div>

                <div className="ledger-meta-col">
                  <div className="t-meta" style={{ color: "var(--color-ink)" }}>
                    {j.nightsSplit}
                  </div>
                  <div
                    className="t-meta"
                    style={{
                      marginTop: "6px",
                      color: "var(--color-ink-muted)",
                      fontWeight: 400,
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        width: "16px",
                        height: "1px",
                        backgroundColor: "var(--color-gold)",
                        display: "inline-block",
                      }}
                    />
                    <span>{j.proximity}</span>
                  </div>
                </div>

                <div className="ledger-price-col">
                  <div
                    style={{
                      fontSize: "0.7rem",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "var(--color-gold-text)",
                    }}
                  >
                    From
                  </div>
                  <div
                    className="font-serif"
                    style={{
                      fontSize: "1.45rem",
                      color: "var(--color-burgundy)",
                      fontWeight: 500,
                    }}
                  >
                    {j.priceFrom}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                  }}
                >
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      openConcierge(j.title);
                    }}
                    className="gold-link ledger-quick-enquire"
                    style={{
                      fontSize: "0.78rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--color-burgundy)",
                    }}
                  >
                    Enquire
                  </button>

                  <span
                    className="ledger-arrow"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "44px",
                      height: "44px",
                      borderRadius: "50%",
                      border: "1px solid var(--color-hairline)",
                      color: isHovered
                        ? "var(--color-ivory)"
                        : "var(--color-burgundy)",
                      backgroundColor: isHovered
                        ? "var(--color-burgundy)"
                        : "transparent",
                      transition:
                        "background-color 0.35s ease, color 0.35s ease, border-color 0.35s ease",
                    }}
                  >
                    <ArrowRightThin size={16} />
                  </span>
                </div>

                <div className="ledger-mobile-thumb">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={j.image}
                    alt={j.heroAlt}
                    loading="lazy"
                    className="editorial-photo"
                    style={{
                      width: "100%",
                      height: "180px",
                      objectFit: "cover",
                      marginTop: "12px",
                    }}
                  />
                </div>
              </a>
            );
          })}
        </div>

        <div
          style={{
            marginTop: "clamp(40px, 5vw, 64px)",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <p
            className="t-body"
            style={{ color: "var(--color-ink-muted)", maxWidth: "54ch" }}
          >
            Travelling on custom dates or arranging a completely private family
            Umrah? Every sanctuary hotel, flight, and Haramain transfer can be
            tailored around your household.
          </p>
          <MagneticButton
            variant="primary"
            onClick={() => openConcierge("Tailored Private Family Umrah")}
          >
            Tailor a Private Journey
          </MagneticButton>
        </div>
      </div>

      <div
        ref={previewRef}
        aria-hidden="true"
        className="ledger-floating-preview no-print"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "260px",
          height: "330px",
          pointerEvents: "none",
          zIndex: 5500,
          overflow: "hidden",
          borderRadius: "200px 200px 0 0",
          border: "1px solid rgba(210, 160, 74, 0.38)",
          opacity: hoveredSlug ? 1 : 0,
          transition: "opacity 0.42s cubic-bezier(0.16, 1, 0.3, 1)",
          willChange: "transform, opacity",
        }}
      >
        {JOURNEYS.map((j) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={j.slug}
            src={j.image}
            alt=""
            className="editorial-photo"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: hoveredSlug === j.slug ? 1 : 0,
              transform: hoveredSlug === j.slug ? "scale(1)" : "scale(1.08)",
              transition:
                "opacity 0.5s ease, transform 0.75s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
        ))}
      </div>

      <style jsx>{`
        .ledger-mobile-thumb {
          display: none;
        }
        @media (max-width: 960px) {
          .journey-row {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
          .ledger-arrow,
          .ledger-floating-preview {
            display: none !important;
          }
          .ledger-mobile-thumb {
            display: block;
          }
        }
      `}</style>
    </section>
  );
}
