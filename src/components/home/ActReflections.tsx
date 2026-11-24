"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useExperience } from "@/context/ExperienceContext";
import { FAQS, PILGRIM_REFLECTIONS } from "@/data/content";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { ArrowRightThin } from "@/components/ui/SacredIcons";

gsap.registerPlugin(ScrollTrigger);

export function ActReflections() {
  const { setAtmosphere, setActiveAct, navigateTo, reducedMotion } =
    useExperience();
  const sectionRef = useRef<HTMLElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);

  const [quoteIdx, setQuoteIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const section = sectionRef.current;
    const inner = innerRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top 58%",
        end: "bottom 42%",
        onEnter: () => {
          setActiveAct(6);
          setAtmosphere("sand");
        },
        onEnterBack: () => {
          setActiveAct(6);
          setAtmosphere("sand");
        },
      });

      // Phase 3 FX-SC3: Archival Cotton-Page Recede as Epilogue Curtain Rises
      if (!reducedMotion && inner && window.innerWidth >= 960) {
        gsap.to(inner, {
          scale: 0.965,
          opacity: 0.62,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "bottom 92%",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, [reducedMotion, setAtmosphere, setActiveAct]);

  /* Calm 8-second reflection rotation (paused respectfully on hover or reduced motion) */
  useEffect(() => {
    if (paused || reducedMotion) return;
    const id = window.setInterval(() => {
      setQuoteIdx((prev) => (prev + 1) % PILGRIM_REFLECTIONS.length);
    }, 8000);
    return () => window.clearInterval(id);
  }, [paused, reducedMotion]);

  const currentQuote = PILGRIM_REFLECTIONS[quoteIdx];

  return (
    <section
      id="act-reflections"
      ref={sectionRef}
      style={{
        backgroundColor: "rgba(232, 224, 212, 0.58)",
        paddingTop: "var(--section-pad)",
        paddingBottom: "var(--section-pad)",
        overflow: "hidden",
      }}
    >
      <div
        ref={innerRef}
        className="container"
        style={{ willChange: "transform, opacity", transformOrigin: "center bottom" }}
      >
        {/* PART A: PILGRIM REFLECTIONS */}
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          style={{
            paddingBottom: "clamp(72px, 10vw, 132px)",
            borderBottom: "1px solid var(--color-hairline)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "clamp(32px, 5vw, 56px)",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <div className="t-eyebrow">Act VII — Pilgrim Reflections</div>
            <div
              className="font-serif"
              style={{
                fontStyle: "italic",
                fontSize: "1.15rem",
                color: "var(--color-gold-text)",
              }}
            >
              {String(quoteIdx + 1).padStart(2, "0")} /{" "}
              {String(PILGRIM_REFLECTIONS.length).padStart(2, "0")}
            </div>
          </div>

          <div
            key={quoteIdx}
            style={{
              maxWidth: "46ch",
              marginInline: "auto",
              textAlign: "center",
              animation: "quoteFadeIn 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <blockquote
              className="t-editorial"
              style={{
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: "clamp(1.6rem, 3.1vw, 2.85rem)",
                lineHeight: 1.32,
                color: "var(--color-ink)",
              }}
            >
              “{currentQuote.quote}”
            </blockquote>

            <div style={{ marginTop: "32px" }}>
              <div
                style={{
                  fontWeight: 500,
                  fontSize: "0.95rem",
                  color: "var(--color-burgundy)",
                }}
              >
                {currentQuote.author}
              </div>
              <div
                className="t-meta"
                style={{
                  marginTop: "4px",
                  color: "var(--color-ink-muted)",
                  fontWeight: 400,
                }}
              >
                {currentQuote.city}
              </div>
            </div>
          </div>

          {/* Fine Gold Reflection Step Ticks */}
          <div
            style={{
              marginTop: "36px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            {PILGRIM_REFLECTIONS.map((q, idx) => (
              <button
                key={q.author}
                type="button"
                aria-label={`Read reflection ${idx + 1}`}
                onClick={() => setQuoteIdx(idx)}
                style={{
                  width: idx === quoteIdx ? "36px" : "12px",
                  height: "1.5px",
                  backgroundColor:
                    idx === quoteIdx
                      ? "var(--color-gold)"
                      : "var(--color-hairline)",
                  transition: "width 0.5s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.35s ease",
                }}
              />
            ))}
          </div>

          <div
            style={{
              marginTop: "28px",
              display: "flex",
              justifyContent: "center",
              gap: "32px",
            }}
          >
            <button
              type="button"
              onClick={() =>
                setQuoteIdx(
                  (prev) =>
                    (prev - 1 + PILGRIM_REFLECTIONS.length) %
                    PILGRIM_REFLECTIONS.length
                )
              }
              className="gold-link"
              style={{ color: "var(--color-ink-muted)" }}
            >
              Previous Reflection
            </button>
            <button
              type="button"
              onClick={() =>
                setQuoteIdx((prev) => (prev + 1) % PILGRIM_REFLECTIONS.length)
              }
              className="gold-link"
              style={{ color: "var(--color-burgundy)" }}
            >
              Next Reflection <ArrowRightThin size={15} />
            </button>
          </div>
        </div>

        {/* PART B: QUIET GUIDANCE FAQ */}
        <div
          className="grid-12"
          style={{
            paddingTop: "clamp(72px, 10vw, 132px)",
            alignItems: "start",
            rowGap: "40px",
          }}
        >
          <div style={{ gridColumn: "span 4" }} className="faq-left">
            <div className="t-eyebrow" style={{ marginBottom: "16px" }}>
              Quiet Guidance
            </div>
            <SplitHeading
              className="t-display-l"
              lines={[
                <>Questions asked</>,
                <>
                  with <em className="editorial-em">care</em>.
                </>,
              ]}
            />
            <p
              className="t-body"
              style={{
                marginTop: "18px",
                color: "var(--color-ink-muted)",
                maxWidth: "34ch",
              }}
            >
              Clarity brings peace of mind long before your departure day.
            </p>
            <div style={{ marginTop: "28px" }}>
              <a
                href="/guide"
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo("/guide");
                }}
                className="gold-link"
                style={{ color: "var(--color-burgundy)" }}
              >
                Read the Full Sacred Guide <ArrowRightThin size={15} />
              </a>
            </div>
          </div>

          <div
            style={{
              gridColumn: "6 / span 7",
              borderTop: "1px solid var(--color-hairline)",
            }}
            className="faq-right"
          >
            {FAQS.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={item.question}
                  style={{
                    borderBottom: "1px solid var(--color-hairline)",
                  }}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "24px",
                      textAlign: "left",
                      paddingBlock: "24px",
                      fontSize: "clamp(1.02rem, 1.35vw, 1.18rem)",
                      fontWeight: 500,
                      color: isOpen
                        ? "var(--color-burgundy)"
                        : "var(--color-ink)",
                      transition: "color 0.3s ease",
                    }}
                  >
                    <span>{item.question}</span>
                    <span
                      aria-hidden="true"
                      style={{
                        position: "relative",
                        width: "16px",
                        height: "16px",
                        flexShrink: 0,
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          top: "7.5px",
                          left: 0,
                          width: "16px",
                          height: "1px",
                          backgroundColor: "var(--color-gold-text)",
                        }}
                      />
                      <span
                        style={{
                          position: "absolute",
                          top: 0,
                          left: "7.5px",
                          width: "1px",
                          height: "16px",
                          backgroundColor: "var(--color-gold-text)",
                          transform: isOpen ? "scaleY(0)" : "scaleY(1)",
                          transition:
                            "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
                        }}
                      />
                    </span>
                  </button>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateRows: isOpen ? "1fr" : "0fr",
                      transition:
                        "grid-template-rows 0.55s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                  >
                    <div style={{ overflow: "hidden" }}>
                      <p
                        className="t-body"
                        style={{
                          color: "var(--color-ink-muted)",
                          paddingBottom: "26px",
                          maxWidth: "58ch",
                        }}
                      >
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes quoteFadeIn {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (max-width: 960px) {
          .faq-left,
          .faq-right {
            grid-column: 1 / -1 !important;
          }
        }
      `}</style>
    </section>
  );
}
