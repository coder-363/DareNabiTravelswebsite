"use client";

import React from "react";
import { useParams } from "next/navigation";
import { BRAND_CONTACT, JOURNEYS } from "@/data/content";
import { useExperience } from "@/context/ExperienceContext";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { LivingImage } from "@/components/engine/LivingImage";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ArrowRightThin, KhatamStar } from "@/components/ui/SacredIcons";

export default function JourneyDetailPage() {
  const params = useParams<{ slug: string }>();
  const { openConcierge, navigateTo } = useExperience();

  const journey =
    JOURNEYS.find((j) => j.slug === params?.slug) || JOURNEYS[0];

  const otherJourneys = JOURNEYS.filter((j) => j.slug !== journey.slug);

  return (
    <article style={{ paddingTop: "clamp(124px, 15vh, 168px)" }}>
      {/* SPLIT ARCHITECTURAL HERO */}
      <section className="container" style={{ paddingBottom: "clamp(64px, 8vw, 112px)" }}>
        <button
          type="button"
          onClick={() => navigateTo("/journeys")}
          className="t-eyebrow"
          style={{ marginBottom: "28px", cursor: "pointer" }}
        >
          ← All Umrah Journeys
        </button>

        <div className="grid-12" style={{ alignItems: "center", rowGap: "44px" }}>
          <div style={{ gridColumn: "span 6" }} className="jd-col">
            <span
              className="font-serif"
              style={{
                fontStyle: "italic",
                fontSize: "1.3rem",
                color: "var(--color-gold-text)",
                display: "block",
                marginBottom: "10px",
              }}
            >
              Journey {journey.index} · {journey.category}
            </span>
            <SplitHeading
              as="h1"
              immediate
              className="t-display-xl"
              lines={[journey.title]}
            />
            <p
              className="t-editorial"
              style={{
                marginTop: "18px",
                fontStyle: "italic",
                fontWeight: 300,
                color: "var(--color-burgundy)",
              }}
            >
              {journey.subtitle}
            </p>

            {/* Key Facts Ledger */}
            <div
              style={{
                marginTop: "36px",
                borderTop: "1px solid var(--color-hairline)",
              }}
            >
              {[
                { label: "Duration", value: journey.nightsSplit },
                { label: "Proximity", value: journey.proximity },
                { label: "Departures", value: journey.season },
                { label: "Starting From", value: `${journey.priceFrom} per pilgrim` },
              ].map((row) => (
                <div
                  key={row.label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "16px",
                    paddingBlock: "14px",
                    borderBottom: "1px solid var(--color-hairline)",
                    fontSize: "0.94rem",
                  }}
                >
                  <span style={{ color: "var(--color-ink-muted)" }}>{row.label}</span>
                  <span
                    style={{
                      fontWeight: 500,
                      color: "var(--color-ink)",
                      textAlign: "right",
                    }}
                  >
                    {row.value}
                  </span>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: "32px",
                display: "flex",
                flexWrap: "wrap",
                gap: "14px",
              }}
            >
              <MagneticButton
                variant="primary"
                onClick={() => openConcierge(journey.title)}
              >
                Enquire About This Journey
              </MagneticButton>
              <MagneticButton
                variant="outline"
                external
                href={`https://wa.me/${BRAND_CONTACT.whatsappDigits}?text=${encodeURIComponent(
                  `Assalamu Alaikum Dar E Nabi Travels, I would like details regarding "${journey.title}" (${journey.nightsSplit}).`
                )}`}
              >
                WhatsApp Advisor
              </MagneticButton>
            </div>
          </div>

          <div style={{ gridColumn: "8 / span 5" }} className="jd-col">
            <LivingImage
              src={journey.image}
              alt={journey.heroAlt}
              aspect="3 / 4"
              arch
              priority
            />
          </div>
        </div>
      </section>

      {/* MONOGRAPH BODY + STICKY CONCIERGE RAIL */}
      <section
        style={{
          borderTop: "1px solid var(--color-hairline)",
          paddingBlock: "clamp(72px, 9vw, 128px)",
        }}
      >
        <div className="container">
          <div className="grid-12" style={{ alignItems: "start", rowGap: "56px" }}>
            <div
              style={{
                gridColumn: "span 7",
                display: "flex",
                flexDirection: "column",
                gap: "clamp(56px, 7vw, 88px)",
              }}
              className="jd-main"
            >
              <div>
                <div className="t-eyebrow" style={{ marginBottom: "16px" }}>
                  01 — The Spirit of This Journey
                </div>
                <p className="t-body-lg" style={{ color: "var(--color-ink)" }}>
                  {journey.spirit}
                </p>
              </div>

              <div>
                <div className="t-eyebrow" style={{ marginBottom: "24px" }}>
                  02 — Your Sanctuaries
                </div>
                <div style={{ borderTop: "1px solid var(--color-hairline)" }}>
                  {[
                    { city: "Makkah al-Mukarramah", ...journey.makkahHotel },
                    { city: "Madinah al-Munawwarah", ...journey.madinahHotel },
                  ].map((h) => (
                    <div
                      key={h.city}
                      style={{
                        paddingBlock: "26px",
                        borderBottom: "1px solid var(--color-hairline)",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "0.75rem",
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                          color: "var(--color-gold-text)",
                          marginBottom: "8px",
                        }}
                      >
                        {h.city}
                      </div>
                      <h3
                        className="t-display-l"
                        style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.15rem)" }}
                      >
                        {h.name}
                      </h3>
                      <p
                        className="t-meta"
                        style={{ color: "var(--color-burgundy)", marginTop: "8px" }}
                      >
                        {h.distance}
                      </p>
                      <p
                        className="t-body"
                        style={{ color: "var(--color-ink-muted)", marginTop: "8px" }}
                      >
                        {h.note}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Day-by-Day Vertical Fine Gold Route Timeline */}
              <div>
                <div className="t-eyebrow" style={{ marginBottom: "28px" }}>
                  03 — Rhythm of the Journey
                </div>
                <div
                  style={{
                    position: "relative",
                    paddingLeft: "32px",
                    borderLeft: "1px solid var(--color-gold)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "36px",
                  }}
                >
                  {journey.itinerary.map((stop) => (
                    <div key={stop.day} style={{ position: "relative" }}>
                      <span
                        aria-hidden="true"
                        style={{
                          position: "absolute",
                          left: "-37px",
                          top: "7px",
                          width: "9px",
                          height: "9px",
                          borderRadius: "50%",
                          backgroundColor: "var(--color-burgundy)",
                          border: "1.5px solid var(--color-gold)",
                        }}
                      />
                      <div
                        className="font-serif"
                        style={{
                          fontStyle: "italic",
                          color: "var(--color-gold-text)",
                          fontSize: "1.1rem",
                        }}
                      >
                        {stop.day}
                      </div>
                      <h3
                        className="font-serif"
                        style={{
                          fontSize: "1.65rem",
                          fontWeight: 400,
                          color: "var(--color-ink)",
                          marginTop: "4px",
                        }}
                      >
                        {stop.title}
                      </h3>
                      <p
                        className="t-body"
                        style={{
                          marginTop: "8px",
                          color: "var(--color-ink-muted)",
                        }}
                      >
                        {stop.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="t-eyebrow" style={{ marginBottom: "24px" }}>
                  04 — What Is Quietly Taken Care Of
                </div>
                <ul
                  style={{
                    listStyle: "none",
                    borderTop: "1px solid var(--color-hairline)",
                  }}
                >
                  {journey.included.map((item) => (
                    <li
                      key={item}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "14px",
                        paddingBlock: "16px",
                        borderBottom: "1px solid var(--color-hairline)",
                      }}
                    >
                      <KhatamStar size={12} color="var(--color-gold-text)" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div style={{ marginTop: "32px" }}>
                  <div
                    className="t-meta"
                    style={{
                      color: "var(--color-gold-text)",
                      textTransform: "uppercase",
                      letterSpacing: "0.14em",
                      marginBottom: "12px",
                    }}
                  >
                    Optional Personal Care Additions
                  </div>
                  <ul
                    style={{
                      listStyle: "none",
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                      color: "var(--color-ink-muted)",
                    }}
                  >
                    {journey.optionalCare.map((opt) => (
                      <li key={opt}>— {opt}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <aside
              style={{
                gridColumn: "9 / span 4",
                position: "sticky",
                top: "112px",
                padding: "clamp(24px, 3vw, 38px)",
                backgroundColor: "var(--color-ivory-soft)",
                border: "1px solid var(--color-hairline)",
              }}
              className="jd-rail"
            >
              <div className="t-eyebrow" style={{ marginBottom: "14px" }}>
                Private Consultation
              </div>
              <div
                className="font-serif"
                style={{
                  fontSize: "2.35rem",
                  color: "var(--color-burgundy)",
                  lineHeight: 1.05,
                }}
              >
                {journey.priceFrom}
              </div>
              <div
                className="t-meta"
                style={{ color: "var(--color-ink-muted)", marginTop: "6px" }}
              >
                Per pilgrim · {journey.nightsSplit}
              </div>

              <hr className="hairline" style={{ marginBlock: "24px" }} />

              <p className="t-body" style={{ color: "var(--color-ink-muted)" }}>
                Every booking begins with a calm conversation — never an online
                cart. We confirm exact rooms, flights, and mobility wishes in
                writing before any payment.
              </p>

              <div
                style={{
                  marginTop: "24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <MagneticButton
                  variant="primary"
                  style={{ width: "100%" }}
                  onClick={() => openConcierge(journey.title)}
                >
                  Enquire About This Journey
                </MagneticButton>
                <MagneticButton
                  variant="outline"
                  style={{ width: "100%" }}
                  external
                  href={`https://wa.me/${BRAND_CONTACT.whatsappDigits}?text=${encodeURIComponent(
                    `Assalamu Alaikum Dar E Nabi Travels, please share an itinerary for ${journey.title}.`
                  )}`}
                >
                  Speak on WhatsApp
                </MagneticButton>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section
        style={{
          backgroundColor: "rgba(232, 224, 212, 0.55)",
          paddingBlock: "clamp(64px, 8vw, 108px)",
        }}
      >
        <div className="container">
          <div className="t-eyebrow" style={{ marginBottom: "28px" }}>
            Other Curated Journeys
          </div>
          <div style={{ borderTop: "1px solid var(--color-hairline)" }}>
            {otherJourneys.map((other) => (
              <a
                key={other.slug}
                href={`/journeys/${other.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo(`/journeys/${other.slug}`);
                }}
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "16px",
                  paddingBlock: "24px",
                  borderBottom: "1px solid var(--color-hairline)",
                }}
              >
                <div>
                  <span
                    className="t-display-l"
                    style={{ fontSize: "clamp(1.45rem, 2.2vw, 2rem)" }}
                  >
                    {other.title}
                  </span>
                  <div className="t-meta" style={{ color: "var(--color-ink-muted)" }}>
                    {other.nightsSplit} · {other.proximity}
                  </div>
                </div>
                <span className="gold-link" style={{ color: "var(--color-burgundy)" }}>
                  View Monograph <ArrowRightThin size={15} />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        @media (max-width: 960px) {
          .jd-col,
          .jd-main,
          .jd-rail {
            grid-column: 1 / -1 !important;
            position: relative !important;
            top: auto !important;
          }
        }
      `}</style>
    </article>
  );
}
