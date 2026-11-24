"use client";

import { MADINAH_CHAPTERS, PHOTOS } from "@/data/content";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { ArabicSweep } from "@/components/ui/ArabicSweep";
import { LivingImage } from "@/components/engine/LivingImage";
import { ActEpilogue } from "@/components/home/ActEpilogue";

export default function MadinahPage() {
  return (
    <>
      <section
        style={{
          position: "relative",
          minHeight: "92svh",
          backgroundColor: "var(--color-ink)",
          color: "var(--color-ivory)",
          display: "flex",
          alignItems: "flex-end",
          paddingTop: "140px",
          paddingBottom: "clamp(48px, 7vh, 88px)",
          overflow: "hidden",
        }}
      >
        <div aria-hidden="true" style={{ position: "absolute", inset: 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={PHOTOS.madinahGolden}
            alt="Masjid an-Nabawi Green Dome and courtyard arches bathed in golden light"
            className="editorial-photo"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(31,18,20,0.48) 0%, rgba(74,7,17,0.28) 45%, rgba(31,18,20,0.85) 100%)",
            }}
          />
        </div>

        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <ArabicSweep
            immediate
            text="الْمَدِينَةُ الْمُنَوَّرَة"
            style={{
              fontSize: "clamp(1.5rem, 2.8vw, 2.5rem)",
              color: "var(--color-gold)",
              marginBottom: "14px",
            }}
          />
          <SplitHeading
            as="h1"
            immediate
            className="t-monument"
            lines={[
              <>Madinah —</>,
              <>
                Where the heart finds <em className="editorial-em">peace</em>.
              </>,
            ]}
          />
          <p
            className="t-body-lg"
            style={{
              marginTop: "24px",
              color: "rgba(243, 238, 230, 0.9)",
              maxWidth: "50ch",
            }}
          >
            Every pilgrim remembers the quiet shift in the air the moment
            Madinah appears on the horizon. We protect that stillness with
            footsteps-away stays and unhurried Seerah mornings.
          </p>
        </div>
      </section>

      <section
        className="container"
        style={{ paddingBlock: "var(--section-pad)" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "clamp(84px, 12vw, 156px)",
          }}
        >
          {MADINAH_CHAPTERS.map((chapter, idx) => {
            const reverse = idx % 2 === 1;
            return (
              <div
                key={chapter.numeral}
                className="grid-12"
                style={{ alignItems: "center", rowGap: "36px" }}
              >
                <div
                  style={{
                    gridColumn: reverse ? "7 / span 6" : "span 6",
                    order: reverse ? 2 : 1,
                  }}
                  className="madinah-img-col"
                >
                  <LivingImage
                    src={chapter.image}
                    alt={chapter.title}
                    aspect={idx === 1 ? "4 / 5" : "16 / 11"}
                    arch={idx === 1}
                    cursorLabel="view"
                  />
                </div>

                <div
                  style={{
                    gridColumn: reverse ? "1 / span 5" : "8 / span 5",
                    order: reverse ? 1 : 2,
                    display: "flex",
                    flexDirection: "column",
                    gap: "18px",
                  }}
                  className="madinah-txt-col"
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                    }}
                  >
                    <span
                      className="font-serif"
                      style={{
                        fontStyle: "italic",
                        fontSize: "1.2rem",
                        color: "var(--color-gold-text)",
                      }}
                    >
                      Chapter {chapter.numeral}
                    </span>
                    <span
                      lang="ar"
                      dir="rtl"
                      className="font-arabic"
                      style={{
                        fontSize: "1.45rem",
                        color: "var(--color-burgundy)",
                      }}
                    >
                      {chapter.arabic}
                    </span>
                  </div>

                  <h2 className="t-display-l">{chapter.title}</h2>
                  <p
                    className="t-body-lg"
                    style={{ color: "var(--color-ink-muted)" }}
                  >
                    {chapter.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <ActEpilogue />

      <style jsx>{`
        @media (max-width: 960px) {
          .madinah-img-col,
          .madinah-txt-col {
            grid-column: 1 / -1 !important;
            order: initial !important;
          }
        }
      `}</style>
    </>
  );
}
