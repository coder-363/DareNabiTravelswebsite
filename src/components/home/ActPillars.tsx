"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useExperience } from "@/context/ExperienceContext";
import { FOUR_PILLARS, TRUST_CREDENTIALS } from "@/data/content";
import { SplitHeading } from "@/components/ui/SplitHeading";

gsap.registerPlugin(ScrollTrigger);

export function ActPillars() {
  const { setAtmosphere, setActiveAct } = useExperience();
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activePillar, setActivePillar] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top 58%",
        end: "bottom 42%",
        onEnter: () => {
          setActiveAct(5);
          setAtmosphere("ivory");
        },
        onEnterBack: () => {
          setActiveAct(5);
          setAtmosphere("ivory");
        },
      });

      const rows = section.querySelectorAll<HTMLElement>(".pillar-row");
      rows.forEach((row, idx) => {
        ScrollTrigger.create({
          trigger: row,
          start: "top 58%",
          end: "bottom 42%",
          onEnter: () => setActivePillar(idx),
          onEnterBack: () => setActivePillar(idx),
        });
      });

      const creds = section.querySelectorAll<HTMLElement>(".trust-item");
      if (creds.length) {
        gsap.fromTo(
          creds,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".trust-grid",
              start: "top 86%",
              once: true,
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, [setAtmosphere, setActiveAct]);

  return (
    <section
      id="act-pillars"
      ref={sectionRef}
      style={{
        paddingTop: "var(--section-pad)",
        paddingBottom: "var(--section-pad)",
      }}
    >
      <div className="container">
        <div
          className="grid-12"
          style={{ alignItems: "start", rowGap: "56px" }}
        >
          <div style={{ gridColumn: "span 7" }} className="pillars-left">
            <div className="t-eyebrow" style={{ marginBottom: "18px" }}>
              Act VI — Brand Values of Dar E Nabi
            </div>

            <SplitHeading
              className="t-display-xl"
              style={{ marginBottom: "clamp(40px, 5vw, 68px)" }}
              lines={[
                <>Every decision serves</>,
                <>
                  your <em className="editorial-em">peace of heart</em>.
                </>,
              ]}
            />

            <div style={{ borderTop: "1px solid var(--color-hairline)" }}>
              {FOUR_PILLARS.map((pillar, idx) => {
                const isActive = activePillar === idx;
                return (
                  <div
                    key={pillar.name}
                    className="pillar-row"
                    onMouseEnter={() => setActivePillar(idx)}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "56px 1fr",
                      gap: "20px",
                      paddingBlock: "clamp(26px, 3.5vw, 40px)",
                      borderBottom: "1px solid var(--color-hairline)",
                      transition: "opacity 0.4s ease",
                    }}
                  >
                    <span
                      className="font-serif"
                      style={{
                        fontStyle: "italic",
                        fontSize: "1.2rem",
                        color: isActive
                          ? "var(--color-burgundy)"
                          : "var(--color-gold-text)",
                        paddingTop: "6px",
                      }}
                    >
                      {pillar.index}
                    </span>

                    <div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "baseline",
                          justifyContent: "space-between",
                          gap: "16px",
                        }}
                      >
                        <h3
                          className="t-display-l"
                          style={{
                            color: isActive
                              ? "var(--color-burgundy)"
                              : "var(--color-ink)",
                            transition: "color 0.35s ease",
                          }}
                        >
                          {pillar.name}
                        </h3>
                        <span
                          lang="ar"
                          dir="rtl"
                          className="font-arabic"
                          style={{
                            fontSize: "1.35rem",
                            color: "var(--color-gold-text)",
                          }}
                        >
                          {pillar.arabic}
                        </span>
                      </div>

                      <p
                        className="t-body"
                        style={{
                          marginTop: "12px",
                          color: "var(--color-ink-muted)",
                          maxWidth: "48ch",
                        }}
                      >
                        {pillar.summary}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div
            style={{
              gridColumn: "9 / span 4",
              position: "sticky",
              top: "120px",
            }}
            className="pillars-right"
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "3 / 4",
                overflow: "hidden",
                backgroundColor: "var(--color-sand)",
                border: "1px solid var(--color-hairline)",
              }}
            >
              {FOUR_PILLARS.map((pillar, idx) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={pillar.name}
                  src={pillar.image}
                  alt={`${pillar.name} — Dar E Nabi Travels`}
                  loading="lazy"
                  className="editorial-photo"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    opacity: activePillar === idx ? 1 : 0,
                    transform:
                      activePillar === idx ? "scale(1)" : "scale(1.06)",
                    transition:
                      "opacity 0.75s ease, transform 1.1s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                />
              ))}
            </div>
            <div
              className="t-meta"
              style={{
                marginTop: "14px",
                display: "flex",
                justifyContent: "space-between",
                color: "var(--color-ink-muted)",
              }}
            >
              <span>Value {FOUR_PILLARS[activePillar].index}</span>
              <span>{FOUR_PILLARS[activePillar].name}</span>
            </div>
          </div>
        </div>

        <div
          className="trust-grid"
          style={{
            marginTop: "clamp(72px, 10vw, 128px)",
            paddingTop: "clamp(40px, 5vw, 64px)",
            borderTop: "1px solid var(--color-hairline)",
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gap: "32px",
          }}
        >
          {TRUST_CREDENTIALS.map((cred) => (
            <div key={cred.label} className="trust-item">
              <div
                aria-hidden="true"
                style={{
                  width: "28px",
                  height: "1.5px",
                  backgroundColor: "var(--color-gold)",
                  marginBottom: "16px",
                }}
              />
              <div
                className="font-serif"
                style={{
                  fontSize: "clamp(2.2rem, 3.6vw, 3.4rem)",
                  fontWeight: 300,
                  color: "var(--color-burgundy)",
                  lineHeight: 1.05,
                }}
              >
                {cred.figure}
              </div>
              <p
                className="t-meta"
                style={{
                  marginTop: "10px",
                  color: "var(--color-ink-muted)",
                  fontWeight: 400,
                  maxWidth: "24ch",
                }}
              >
                {cred.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 960px) {
          .pillars-left,
          .pillars-right {
            grid-column: 1 / -1 !important;
            position: relative !important;
            top: auto !important;
          }
          .trust-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }
        @media (max-width: 520px) {
          .trust-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
