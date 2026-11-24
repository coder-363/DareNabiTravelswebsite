"use client";

import { BRAND_CONTACT, PHOTOS, TRUST_CREDENTIALS } from "@/data/content";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { ArabicSweep } from "@/components/ui/ArabicSweep";
import { LivingImage } from "@/components/engine/LivingImage";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useExperience } from "@/context/ExperienceContext";
import { ActEpilogue } from "@/components/home/ActEpilogue";

export default function AboutPage() {
  const { openConcierge } = useExperience();

  return (
    <>
      <section
        className="container"
        style={{
          paddingTop: "clamp(132px, 16vh, 184px)",
          paddingBottom: "clamp(64px, 8vw, 108px)",
        }}
      >
        <div className="grid-12" style={{ alignItems: "end", rowGap: "36px" }}>
          <div style={{ gridColumn: "span 7" }} className="about-col">
            <div className="t-eyebrow" style={{ marginBottom: "18px" }}>
              Our Care &amp; Heritage — Dar E Nabi Travels
            </div>
            <SplitHeading
              as="h1"
              immediate
              className="t-monument"
              lines={[
                <>Serving guests of</>,
                <>
                  the <em className="editorial-em">Haramain</em>.
                </>,
              ]}
            />
          </div>

          <div style={{ gridColumn: "9 / span 4" }} className="about-col">
            <ArabicSweep
              immediate
              text="خِدْمَةُ ضُيُوفِ الرَّحْمَٰن"
              style={{
                fontSize: "1.55rem",
                color: "var(--color-burgundy)",
                marginBottom: "10px",
              }}
            />
            <p className="t-body" style={{ color: "var(--color-ink-muted)" }}>
              We do not treat Umrah as an ordinary holiday booking. Every
              family entrusted to Dar E Nabi is received as a guest of Allah.
            </p>
          </div>
        </div>
      </section>

      <section
        style={{
          borderTop: "1px solid var(--color-hairline)",
          paddingBlock: "var(--section-pad)",
        }}
      >
        <div className="container">
          <div className="grid-12" style={{ alignItems: "start", rowGap: "48px" }}>
            <div style={{ gridColumn: "span 5" }} className="about-col">
              <LivingImage
                src={PHOTOS.marbleColonnade}
                alt="Pilgrims walking calmly through serene white marble mosque arcades"
                aspect="3 / 4"
                arch
              />
              <p
                className="t-meta"
                style={{ marginTop: "14px", color: "var(--color-ink-muted)" }}
              >
                {BRAND_CONTACT.licence}
              </p>
            </div>

            <div
              style={{
                gridColumn: "7 / span 6",
                display: "flex",
                flexDirection: "column",
                gap: "24px",
              }}
              className="about-col"
            >
              <div className="t-eyebrow">A Sincere Word From Our Founders</div>
              <h2 className="t-display-l">
                Why we built Dar E Nabi differently.
              </h2>

              <p className="t-body-lg" style={{ color: "var(--color-ink)" }}>
                Too often, families save for years to visit Makkah and Madinah —
                only to arrive exhausted by confusing hotel transfers, distant
                rooms, and unanswered phone calls.
              </p>

              <p className="t-body" style={{ color: "var(--color-ink-muted)" }}>
                Dar E Nabi Travels was founded on a quieter promise: to handle
                every visa, flight, railway ticket, and hotel check-in with
                personal accountability, written transparency, and heartfelt
                hospitality.
              </p>

              <p className="t-body" style={{ color: "var(--color-ink-muted)" }}>
                Our deepest care is reserved for elderly parents and first-time
                pilgrims. When an ageing mother steps cleanly from a hotel
                elevator onto the cool marble courtyard of Masjid an-Nabawi
                without a single stair in her way — that is our definition of
                excellence.
              </p>

              <div
                style={{
                  marginTop: "12px",
                  paddingTop: "24px",
                  borderTop: "1px solid var(--color-hairline)",
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "20px",
                }}
              >
                <div>
                  <div
                    className="font-serif"
                    style={{
                      fontSize: "1.45rem",
                      color: "var(--color-burgundy)",
                    }}
                  >
                    Dar E Nabi Leadership &amp; Haramain Team
                  </div>
                  <div
                    className="t-meta"
                    style={{ color: "var(--color-ink-muted)" }}
                  >
                    Lahore · Makkah · Madinah
                  </div>
                </div>

                <MagneticButton
                  variant="primary"
                  onClick={() => openConcierge()}
                >
                  Speak With Us Directly
                </MagneticButton>
              </div>
            </div>
          </div>

          <div
            className="about-creds"
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
              <div key={cred.label}>
                <div
                  className="font-serif"
                  style={{
                    fontSize: "clamp(2.1rem, 3.4vw, 3.2rem)",
                    fontWeight: 300,
                    color: "var(--color-burgundy)",
                  }}
                >
                  {cred.figure}
                </div>
                <p
                  className="t-meta"
                  style={{
                    marginTop: "8px",
                    color: "var(--color-ink-muted)",
                    fontWeight: 400,
                  }}
                >
                  {cred.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ActEpilogue />

      <style jsx>{`
        @media (max-width: 960px) {
          .about-col {
            grid-column: 1 / -1 !important;
          }
          .about-creds {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }
        @media (max-width: 520px) {
          .about-creds {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
