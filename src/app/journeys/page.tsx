"use client";

import { SplitHeading } from "@/components/ui/SplitHeading";
import { ArabicSweep } from "@/components/ui/ArabicSweep";
import { ActJourneys } from "@/components/home/ActJourneys";
import { ActEpilogue } from "@/components/home/ActEpilogue";

export default function JourneysPage() {
  return (
    <>
      <section
        style={{
          paddingTop: "clamp(132px, 16vh, 184px)",
          paddingBottom: "clamp(36px, 5vw, 56px)",
        }}
      >
        <div className="container">
          <div className="grid-12" style={{ alignItems: "end", rowGap: "24px" }}>
            <div style={{ gridColumn: "span 8" }} className="j-head-left">
              <div className="t-eyebrow" style={{ marginBottom: "18px" }}>
                Umrah Archive — Dar E Nabi Travels
              </div>
              <SplitHeading
                as="h1"
                immediate
                className="t-monument"
                lines={[
                  <>Curated</>,
                  <>
                    <em className="editorial-em">pilgrimages</em>.
                  </>,
                ]}
              />
            </div>

            <div style={{ gridColumn: "9 / span 4" }} className="j-head-right">
              <ArabicSweep
                immediate
                text="رِحْلَةُ عُمْرَةٍ بِطُمَأْنِينَة"
                style={{
                  fontSize: "1.5rem",
                  color: "var(--color-burgundy)",
                  marginBottom: "12px",
                }}
              />
              <p className="t-body" style={{ color: "var(--color-ink-muted)" }}>
                Four distinct ways to answer the call — each adaptable as a
                private family departure or quiet small-group journey with
                verified walking-distance sanctuaries.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ActJourneys compactHeader />
      <ActEpilogue />

      <style jsx>{`
        @media (max-width: 960px) {
          .j-head-left,
          .j-head-right {
            grid-column: 1 / -1 !important;
          }
        }
      `}</style>
    </>
  );
}
