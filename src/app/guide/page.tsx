"use client";

import { useState } from "react";
import { SACRED_GUIDE_CHAPTERS } from "@/data/content";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { ArabicSweep } from "@/components/ui/ArabicSweep";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { KhatamStar } from "@/components/ui/SacredIcons";
import { useExperience } from "@/context/ExperienceContext";

export default function SacredGuidePage() {
  const { openConcierge } = useExperience();
  const [activeId, setActiveId] = useState(SACRED_GUIDE_CHAPTERS[0].id);

  return (
    <div style={{ paddingTop: "clamp(132px, 16vh, 184px)" }}>
      <section
        className="container"
        style={{
          paddingBottom: "clamp(56px, 7vw, 92px)",
          borderBottom: "1px solid var(--color-hairline)",
        }}
      >
        <div className="grid-12" style={{ alignItems: "end", rowGap: "28px" }}>
          <div style={{ gridColumn: "span 8" }} className="guide-head-left">
            <div className="t-eyebrow" style={{ marginBottom: "18px" }}>
              The Sacred Guide — Interactive Umrah Companion
            </div>
            <SplitHeading
              as="h1"
              immediate
              className="t-monument"
              lines={[
                <>Perform Umrah</>,
                <>
                  with <em className="editorial-em">clarity</em> &amp; calm.
                </>,
              ]}
            />
          </div>

          <div
            style={{
              gridColumn: "9 / span 4",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
            className="guide-head-right"
          >
            <ArabicSweep
              immediate
              text="دَلِيلُ الْعُمْرَةِ وَالْأَدْعِيَة"
              style={{ fontSize: "1.65rem", color: "var(--color-burgundy)" }}
            />
            <p className="t-body" style={{ color: "var(--color-ink-muted)" }}>
              A calm, step-by-step handbook with authentic Arabic supplications,
              transliteration, and gentle guidance — formatted cleanly so you
              may print or save it as your pocket companion.
            </p>
            <div className="no-print">
              <MagneticButton
                variant="outline"
                onClick={() => window.print()}
              >
                Print / Save Companion PDF
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>

      <section
        className="container"
        style={{ paddingBlock: "clamp(64px, 8vw, 112px)" }}
      >
        <div className="grid-12" style={{ alignItems: "start", rowGap: "48px" }}>
          <aside
            className="guide-index no-print"
            style={{
              gridColumn: "span 3",
              position: "sticky",
              top: "112px",
            }}
          >
            <div className="t-eyebrow" style={{ marginBottom: "20px" }}>
              Chapters
            </div>
            <ul
              style={{
                listStyle: "none",
                borderTop: "1px solid var(--color-hairline)",
              }}
            >
              {SACRED_GUIDE_CHAPTERS.map((ch) => (
                <li
                  key={ch.id}
                  style={{ borderBottom: "1px solid var(--color-hairline)" }}
                >
                  <a
                    href={`#${ch.id}`}
                    onClick={() => setActiveId(ch.id)}
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: "12px",
                      paddingBlock: "14px",
                      color:
                        activeId === ch.id
                          ? "var(--color-burgundy)"
                          : "var(--color-ink-muted)",
                      fontWeight: activeId === ch.id ? 500 : 400,
                      fontSize: "0.9rem",
                      transition: "color 0.3s ease",
                    }}
                  >
                    <span
                      className="font-serif"
                      style={{
                        fontStyle: "italic",
                        color: "var(--color-gold-text)",
                      }}
                    >
                      {ch.number}
                    </span>
                    <span>{ch.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          <div
            style={{
              gridColumn: "5 / span 8",
              display: "flex",
              flexDirection: "column",
              gap: "clamp(64px, 8vw, 108px)",
            }}
            className="guide-chapters"
          >
            {SACRED_GUIDE_CHAPTERS.map((ch) => (
              <article
                key={ch.id}
                id={ch.id}
                style={{
                  scrollMarginTop: "112px",
                  paddingBottom: "clamp(48px, 6vw, 72px)",
                  borderBottom: "1px solid var(--color-hairline)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    gap: "16px",
                    marginBottom: "16px",
                  }}
                >
                  <span
                    className="font-serif"
                    style={{
                      fontStyle: "italic",
                      fontSize: "1.25rem",
                      color: "var(--color-gold-text)",
                    }}
                  >
                    Chapter {ch.number}
                  </span>
                  <span
                    lang="ar"
                    dir="rtl"
                    className="font-arabic"
                    style={{ fontSize: "1.6rem", color: "var(--color-burgundy)" }}
                  >
                    {ch.arabicTitle}
                  </span>
                </div>

                <h2 className="t-display-l">{ch.title}</h2>

                <p
                  className="t-body-lg"
                  style={{
                    marginTop: "16px",
                    color: "var(--color-ink-muted)",
                    maxWidth: "58ch",
                  }}
                >
                  {ch.summary}
                </p>

                <ul
                  style={{
                    listStyle: "none",
                    marginTop: "28px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "14px",
                  }}
                >
                  {ch.steps.map((step) => (
                    <li
                      key={step}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "14px",
                      }}
                    >
                      <KhatamStar
                        size={12}
                        color="var(--color-gold-text)"
                        style={{ marginTop: "8px", flexShrink: 0 }}
                      />
                      <span className="t-body">{step}</span>
                    </li>
                  ))}
                </ul>

                {/* Sacred Du'a Block (Deep Burgundy Sanctuary Panel with Fine Gold Accent) */}
                <div
                  style={{
                    marginTop: "32px",
                    padding: "clamp(24px, 3.5vw, 40px)",
                    backgroundColor: "var(--color-burgundy)",
                    color: "var(--color-ivory)",
                    borderLeft: "2px solid var(--color-gold)",
                  }}
                >
                  <div
                    className="t-eyebrow t-eyebrow--light"
                    style={{ marginBottom: "18px" }}
                  >
                    {ch.dua.label}
                  </div>
                  <p
                    lang="ar"
                    dir="rtl"
                    className="font-arabic"
                    style={{
                      fontSize: "clamp(1.45rem, 2.5vw, 2.15rem)",
                      lineHeight: 2.0,
                      color: "var(--color-ivory)",
                      marginBottom: "18px",
                    }}
                  >
                    {ch.dua.arabic}
                  </p>
                  <p
                    className="font-serif"
                    style={{
                      fontStyle: "italic",
                      fontSize: "1.12rem",
                      color: "var(--color-gold)",
                      marginBottom: "8px",
                    }}
                  >
                    {ch.dua.transliteration}
                  </p>
                  <p
                    className="t-meta"
                    style={{
                      color: "var(--color-ivory-muted)",
                      fontWeight: 400,
                      maxWidth: "60ch",
                    }}
                  >
                    “{ch.dua.translation}”
                  </p>
                </div>
              </article>
            ))}

            <div className="no-print" style={{ paddingTop: "12px" }}>
              <h3 className="t-display-l">
                Need personal scholarly or travel{" "}
                <em className="editorial-em">guidance</em>?
              </h3>
              <p
                className="t-body"
                style={{
                  marginTop: "12px",
                  marginBottom: "24px",
                  color: "var(--color-ink-muted)",
                  maxWidth: "50ch",
                }}
              >
                Every Dar E Nabi pilgrim receives a printed copy of this
                companion and a quiet pre-departure orientation with our
                advisors.
              </p>
              <MagneticButton variant="primary" onClick={() => openConcierge()}>
                Speak With Our Concierge
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @media (max-width: 960px) {
          .guide-head-left,
          .guide-head-right,
          .guide-chapters {
            grid-column: 1 / -1 !important;
          }
          .guide-index {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
