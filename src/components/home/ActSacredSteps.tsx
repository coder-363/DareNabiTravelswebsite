"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useExperience } from "@/context/ExperienceContext";
import { SACRED_STEPS } from "@/data/content";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { ArrowRightThin } from "@/components/ui/SacredIcons";

gsap.registerPlugin(ScrollTrigger);

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/* Authentic brief supplication whisper per station */
const STEP_DUAS: Record<string, { arabic: string; meaning: string }> = {
  "01": {
    arabic: "اللَّهُمَّ إِنِّي أُرِيدُ الْعُمْرَةَ فَيَسِّرْهَا لِي وَتَقَبَّلْهَا مِنِّي",
    meaning: "O Allah, I intend to perform Umrah; make it easy for me and accept it from me.",
  },
  "02": {
    arabic: "لَبَّيْكَ اللَّهُمَّ عُمْرَةً",
    meaning: "Here I am, O Allah, answering Your call for Umrah.",
  },
  "03": {
    arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً",
    meaning: "Our Lord, grant us goodness in this world and in the Hereafter.",
  },
  "04": {
    arabic: "إِنَّ الصَّفَا وَالْمَرْوَةَ مِن شَعَائِرِ اللَّهِ",
    meaning: "Indeed, Safa and Marwa are among the sacred symbols of Allah.",
  },
  "05": {
    arabic: "رَبَّنَا تَقَبَّلْ مِنَّا إِنَّكَ أَنتَ السَّمِيعُ الْعَلِيمُ",
    meaning: "Our Lord, accept this from us; truly You are the All-Hearing, All-Knowing.",
  },
  "06": {
    arabic: "السَّلَامُ عَلَيْكَ يَا رَسُولَ اللَّهِ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ",
    meaning: "Peace be upon you, O Messenger of Allah, and the mercy of Allah and His blessings.",
  },
  "07": {
    arabic: "آيِبُونَ تَائِبُونَ عَابِدُونَ لِرَبِّنَا حَامِدُونَ",
    meaning: "Returning safely, turning in repentance, worshipping and praising our Lord.",
  },
};

export function ActSacredSteps() {
  const { setAtmosphere, setActiveAct, navigateTo, reducedMotion } =
    useExperience();
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const pathLineRef = useRef<SVGLineElement | null>(null);
  const pinTriggerRef = useRef<ScrollTrigger | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [openDua, setOpenDua] = useState<string | null>(null);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top 58%",
        end: "bottom 42%",
        onEnter: () => {
          setActiveAct(3);
          setAtmosphere("burgundy");
        },
        onEnterBack: () => {
          setActiveAct(3);
          setAtmosphere("burgundy");
        },
      });

      if (!reducedMotion && window.innerWidth >= 1024 && track) {
        const getScrollDistance = () =>
          Math.max(0, track.scrollWidth - window.innerWidth + 140);

        const tween = gsap.to(track, {
          x: () => -getScrollDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${getScrollDistance() * 1.15}`,
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              const p = self.progress;
              const idx = Math.min(
                SACRED_STEPS.length - 1,
                Math.floor(p * SACRED_STEPS.length)
              );
              setActiveIndex(idx);
              if (pathLineRef.current) {
                pathLineRef.current.style.strokeDashoffset = String(
                  1000 * (1 - p)
                );
              }
            },
          },
        });

        pinTriggerRef.current = tween.scrollTrigger || null;

        const numerals = track.querySelectorAll<HTMLElement>(".step-ghost-num");
        numerals.forEach((num) => {
          gsap.fromTo(
            num,
            { x: 40 },
            {
              x: -40,
              ease: "none",
              scrollTrigger: {
                trigger: num,
                containerAnimation: tween,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            }
          );
        });
      }
    }, section);

    return () => {
      pinTriggerRef.current = null;
      ctx.revert();
    };
  }, [reducedMotion, setAtmosphere, setActiveAct]);

  /* Phase 3: Click any bottom station marker to glide smoothly directly to that step */
  const jumpToStep = (idx: number) => {
    const st = pinTriggerRef.current;
    if (!st) return;
    const ratio = idx / Math.max(1, SACRED_STEPS.length - 1);
    const targetScroll = st.start + (st.end - st.start) * ratio;
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  return (
    <div>
      <section
        id="act-steps"
      ref={sectionRef}
      style={{
        position: "relative",
        backgroundColor: "var(--color-burgundy)",
        color: "var(--color-ivory)",
        paddingTop: "clamp(72px, 9vh, 110px)",
        paddingBottom: "clamp(56px, 7vh, 88px)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "hidden",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "flex-end",
          gap: "24px",
          marginBottom: "clamp(32px, 4vh, 48px)",
        }}
      >
        <div>
          <div
            className="t-eyebrow t-eyebrow--light"
            style={{ marginBottom: "14px" }}
          >
            Act IV — The Seven Sacred Steps
          </div>
          <SplitHeading
            className="t-display-l"
            lines={[
              <>
                Every step of Umrah,{" "}
                <em className="editorial-em">held in stillness</em>.
              </>,
            ]}
          />
        </div>

        <a
          href="/guide"
          onClick={(e) => {
            e.preventDefault();
            navigateTo("/guide");
          }}
          className="gold-link"
          style={{ color: "var(--color-gold)" }}
        >
          Open the Complete Sacred Guide <ArrowRightThin size={16} />
        </a>
      </div>

      <div
        ref={trackRef}
        className="steps-track"
        data-cursor="drag"
        style={{
          display: "flex",
          gap: "clamp(32px, 5vw, 72px)",
          paddingLeft: "var(--gutter)",
          paddingRight: "var(--gutter)",
          alignItems: "center",
          willChange: "transform",
        }}
      >
        {SACRED_STEPS.map((step, idx) => {
          const dua = STEP_DUAS[step.numeral];
          const isDuaOpen = openDua === step.numeral;

          return (
            <article
              key={step.numeral}
              className="step-panel"
              style={{
                position: "relative",
                flex: "0 0 min(78vw, 760px)",
                display: "grid",
                gridTemplateColumns: "0.92fr 1.08fr",
                gap: "clamp(24px, 3vw, 44px)",
                alignItems: "center",
                padding: "clamp(20px, 2.5vw, 32px) 0",
                borderTop: "1px solid var(--color-hairline-dark)",
              }}
            >
              <span
                aria-hidden="true"
                className="font-serif step-ghost-num"
                style={{
                  position: "absolute",
                  top: "-18px",
                  right: "10px",
                  fontSize: "clamp(5.5rem, 11vw, 9.5rem)",
                  fontWeight: 300,
                  lineHeight: 0.85,
                  color: "rgba(210, 160, 74, 0.14)",
                  pointerEvents: "none",
                  userSelect: "none",
                }}
              >
                {step.numeral}
              </span>

              <div
                className={idx === 2 || idx === 5 ? "arch-mask" : ""}
                style={{
                  width: "100%",
                  aspectRatio: "4 / 5",
                  overflow: "hidden",
                  backgroundColor: "var(--color-burgundy-muted)",
                  border: "1px solid rgba(210, 160, 74, 0.2)",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={step.image}
                  alt={`${step.title} — ${step.subtitle}`}
                  loading="lazy"
                  className="editorial-photo"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: idx === 0 ? "75% center" : "center center",
                  }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <span
                    className="font-serif"
                    style={{
                      fontStyle: "italic",
                      color: "var(--color-gold)",
                      fontSize: "1.15rem",
                    }}
                  >
                    {step.numeral} / 07
                  </span>
                  <span
                    lang="ar"
                    dir="rtl"
                    className="font-arabic"
                    style={{ fontSize: "1.55rem", color: "var(--color-gold)" }}
                  >
                    {step.arabic}
                  </span>
                </div>

                <h3 className="t-display-l" style={{ color: "var(--color-ivory)" }}>
                  {step.title}
                </h3>

                <p
                  className="font-serif"
                  style={{
                    fontStyle: "italic",
                    fontSize: "1.2rem",
                    color: "rgba(243, 238, 230, 0.88)",
                  }}
                >
                  {step.subtitle}
                </p>

                <p className="t-body" style={{ color: "var(--color-ivory-muted)" }}>
                  {step.description}
                </p>

                <div
                  style={{
                    marginTop: "4px",
                    paddingTop: "14px",
                    borderTop: "1px solid var(--color-hairline-dark)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.7rem",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "var(--color-gold)",
                      marginBottom: "6px",
                    }}
                  >
                    How we guide you
                  </div>
                  <p
                    className="t-meta"
                    style={{
                      color: "rgba(243, 238, 230, 0.84)",
                      fontWeight: 400,
                    }}
                  >
                    {step.careNote}
                  </p>
                </div>

                {/* Phase 3 Interactive Step Du'a Whisper */}
                {dua && (
                  <div style={{ marginTop: "4px" }}>
                    <button
                      type="button"
                      onClick={() =>
                        setOpenDua(isDuaOpen ? null : step.numeral)
                      }
                      aria-expanded={isDuaOpen}
                      style={{
                        fontSize: "0.74rem",
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "var(--color-gold)",
                        borderBottom: "1px solid rgba(210, 160, 74, 0.45)",
                        paddingBottom: "3px",
                      }}
                    >
                      {isDuaOpen ? "Hide Supplication" : "Read Step Du'a"}
                    </button>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateRows: isDuaOpen ? "1fr" : "0fr",
                        transition:
                          "grid-template-rows 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                    >
                      <div style={{ overflow: "hidden" }}>
                        <div
                          style={{
                            marginTop: "12px",
                            padding: "14px 16px",
                            backgroundColor: "var(--color-burgundy-muted)",
                            borderLeft: "1.5px solid var(--color-gold)",
                          }}
                        >
                          <div
                            lang="ar"
                            dir="rtl"
                            className="font-arabic"
                            style={{
                              fontSize: "1.2rem",
                              lineHeight: 1.9,
                              color: "var(--color-ivory)",
                            }}
                          >
                            {dua.arabic}
                          </div>
                          <div
                            className="t-meta"
                            style={{
                              marginTop: "6px",
                              color: "rgba(243, 238, 230, 0.82)",
                              fontWeight: 400,
                            }}
                          >
                            “{dua.meaning}”
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {/* Bottom Interactive Live-Drawing 1px Warm Gold Path */}
      <div
        className="container steps-progress-bar"
        style={{ marginTop: "clamp(24px, 3vh, 40px)" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "12px",
            fontSize: "0.72rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          {SACRED_STEPS.map((s, idx) => (
            <button
              key={s.numeral}
              type="button"
              onClick={() => jumpToStep(idx)}
              style={{
                color:
                  idx <= activeIndex
                    ? "var(--color-gold)"
                    : "rgba(243, 238, 230, 0.42)",
                transition: "color 0.35s ease",
                paddingBlock: "4px",
              }}
            >
              {s.numeral} · {s.title}
            </button>
          ))}
        </div>
        <svg
          width="100%"
          height="2"
          viewBox="0 0 1000 2"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <line
            x1="0"
            y1="1"
            x2="1000"
            y2="1"
            stroke="rgba(210, 160, 74, 0.24)"
            strokeWidth="1"
          />
          <line
            ref={pathLineRef}
            x1="0"
            y1="1"
            x2="1000"
            y2="1"
            stroke="#D2A04A"
            strokeWidth="1.5"
            strokeDasharray="1000"
            strokeDashoffset="1000"
          />
        </svg>
      </div>

      <style jsx>{`
        @media (max-width: 1023px) {
          .steps-track {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 48px !important;
          }
          .step-panel {
            flex: 1 1 auto !important;
            grid-template-columns: 1fr !important;
          }
          .steps-progress-bar {
            display: none !important;
          }
        }
      `}</style>
      </section>
    </div>
  );
}
