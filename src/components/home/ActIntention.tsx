"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useExperience } from "@/context/ExperienceContext";
import { KhatamStar } from "@/components/ui/SacredIcons";

gsap.registerPlugin(ScrollTrigger);

const MANIFESTO_TOKENS: { word: string; italic?: boolean }[] = [
  { word: "Umrah" },
  { word: "is" },
  { word: "not" },
  { word: "a" },
  { word: "destination" },
  { word: "on" },
  { word: "a" },
  { word: "map." },
  { word: "It" },
  { word: "is" },
  { word: "a" },
  { word: "quiet", italic: true },
  { word: "return", italic: true },
  { word: "—" },
  { word: "to" },
  { word: "humility," },
  { word: "to" },
  { word: "gratitude," },
  { word: "to" },
  { word: "the" },
  { word: "House" },
  { word: "of" },
  { word: "Allah." },
  { word: "Our" },
  { word: "purpose" },
  { word: "is" },
  { word: "simply" },
  { word: "to" },
  { word: "remove" },
  { word: "every" },
  { word: "earthly" },
  { word: "burden," },
  { word: "so" },
  { word: "your" },
  { word: "heart" },
  { word: "remains" },
  { word: "undisturbed.", italic: true },
];

const LANDMARKS = [
  "Makkah al-Mukarramah",
  "Masjid al-Haram",
  "Safa & Marwa",
  "Jabal al-Noor",
  "Madinah al-Munawwarah",
  "Masjid an-Nabawi",
  "Riyad ul-Jannah",
  "Masjid Quba",
];

export function ActIntention() {
  const { setAtmosphere, setActiveAct, reducedMotion } = useExperience();
  const sectionRef = useRef<HTMLElement | null>(null);
  const statementRef = useRef<HTMLParagraphElement | null>(null);
  const ribbonRef = useRef<HTMLDivElement | null>(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    const statement = statementRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top 60%",
        end: "bottom 40%",
        onEnter: () => {
          setActiveAct(1);
          setAtmosphere("ivory");
        },
        onEnterBack: () => {
          setActiveAct(1);
          setAtmosphere("ivory");
        },
      });

      if (!reducedMotion && statement) {
        const words = statement.querySelectorAll<HTMLElement>(".illum-word");
        gsap.fromTo(
          words,
          { opacity: 0.2 },
          {
            opacity: 1,
            stagger: 0.04,
            ease: "none",
            scrollTrigger: {
              trigger: statement,
              start: "top 82%",
              end: "bottom 48%",
              scrub: 0.7,
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, [reducedMotion, setAtmosphere, setActiveAct]);

  /* FX-TY5: Continuous Velocity-Reactive Sacred Horizon Ribbon (60fps GPU translate3d) */
  useEffect(() => {
    if (typeof window === "undefined" || reducedMotion) return;
    const track = ribbonRef.current;
    if (!track) return;

    let offset = 0;
    let direction = -1;
    let rafId = 0;

    const tick = () => {
      rafId = requestAnimationFrame(tick);
      if (pausedRef.current) return;

      const rawVel = parseFloat(
        document.documentElement.style.getPropertyValue("--scroll-velocity") ||
          "0"
      );
      if (rawVel < -0.4) direction = 1;
      else if (rawVel > 0.4) direction = -1;

      const speedBoost = Math.min(2.2, Math.abs(rawVel) * 0.12);
      offset += direction * (0.022 + speedBoost * 0.04);

      if (offset <= -50) offset += 50;
      if (offset > 0) offset -= 50;

      track.style.transform = `translate3d(${offset.toFixed(3)}%, 0, 0)`;
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [reducedMotion]);

  return (
    <section
      id="act-intention"
      ref={sectionRef}
      style={{
        paddingTop: "var(--section-pad)",
        paddingBottom: "clamp(64px, 8vw, 112px)",
      }}
    >
      <div className="container">
        <div className="grid-12">
          <div
            style={{
              gridColumn: "2 / span 10",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            className="intention-col"
          >
            <div
              className="t-eyebrow"
              style={{ marginBottom: "clamp(28px, 4vw, 48px)" }}
            >
              Act II — Niyyah · The Intention
            </div>

            <p
              ref={statementRef}
              className="t-editorial"
              style={{
                maxWidth: "34ch",
                color: "var(--color-ink)",
                fontSize: "clamp(1.65rem, 3.3vw, 3.1rem)",
                lineHeight: 1.26,
                fontWeight: 300,
              }}
            >
              {MANIFESTO_TOKENS.map((token, idx) => (
                <span
                  key={idx}
                  className="illum-word"
                  style={{
                    display: "inline-block",
                    marginRight: "0.28em",
                    fontStyle: token.italic ? "italic" : "normal",
                    color: token.italic ? "var(--color-burgundy)" : "inherit",
                    borderBottom: token.italic
                      ? "1px solid rgba(210, 160, 74, 0.65)"
                      : "none",
                  }}
                >
                  {token.word}
                </span>
              ))}
            </p>

            <div
              style={{
                marginTop: "clamp(36px, 5vw, 56px)",
                display: "flex",
                alignItems: "center",
                gap: "16px",
                color: "var(--color-ink-muted)",
              }}
            >
              <span
                style={{
                  width: "40px",
                  height: "1px",
                  backgroundColor: "var(--color-gold)",
                }}
              />
              <span className="t-meta">
                Dar E Nabi Travels · Faith, Trust &amp; Hospitality
              </span>
              <span
                style={{
                  width: "40px",
                  height: "1px",
                  backgroundColor: "var(--color-gold)",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* FX-TY5: Velocity-Reactive Sacred Horizon Ribbon */}
      <div
        aria-hidden="true"
        onMouseEnter={() => {
          pausedRef.current = true;
        }}
        onMouseLeave={() => {
          pausedRef.current = false;
        }}
        style={{
          marginTop: "clamp(72px, 10vw, 132px)",
          paddingBlock: "24px",
          borderTop: "1px solid var(--color-hairline)",
          borderBottom: "1px solid var(--color-hairline)",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        <div
          ref={ribbonRef}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "38px",
            willChange: "transform",
          }}
        >
          {[...LANDMARKS, ...LANDMARKS].map((place, i) => (
            <span
              key={i}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "38px",
              }}
            >
              <span
                className="font-serif"
                style={{
                  fontSize: "clamp(1.25rem, 2.2vw, 2rem)",
                  fontWeight: 300,
                  fontStyle: i % 2 === 1 ? "italic" : "normal",
                  color: "var(--color-burgundy)",
                  letterSpacing: "0.01em",
                }}
              >
                {place}
              </span>
              <KhatamStar size={12} color="var(--color-gold)" />
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .intention-col {
            grid-column: 1 / -1 !important;
          }
        }
      `}</style>
    </section>
  );
}
