"use client";

import React, { useEffect, useState, useRef } from "react";
import { useExperience } from "@/context/ExperienceContext";
import { BRAND_CONTACT, JOURNEYS } from "@/data/content";
import { ArrowRightThin, CloseThin } from "./SacredIcons";
import { MagneticButton } from "./MagneticButton";
import { BrandLogo } from "./BrandLogo";
import { useFocusTrap } from "@/hooks/useFocusTrap";

export function ConciergeDrawer() {
  const { conciergeOpen, conciergeJourney, closeConcierge } = useExperience();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pilgrims, setPilgrims] = useState("2");
  const [month, setMonth] = useState("Next Available Calm Window");
  const [journey, setJourney] = useState("");
  const [withElders, setWithElders] = useState(false);
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Refs for focus trap
  const drawerRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null); // The button that opened the drawer

  // Focus trap with automatic focus management
  useFocusTrap({
    isOpen: conciergeOpen,
    containerRef: drawerRef,
    triggerRef,
    onClose: closeConcierge,
  });

  useEffect(() => {
    if (conciergeJourney) {
      setJourney(conciergeJourney);
    }
  }, [conciergeJourney]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const whatsappMessage = encodeURIComponent(
    `Assalamu Alaikum Dar E Nabi Travels.\nName: ${name || "Prospective Pilgrim"}\nTravellers: ${pilgrims}${withElders ? " (Travelling with elderly parents)" : ""}\nPreferred Journey: ${journey || "Tailored Umrah Consultation"}\nPreferred Window: ${month}\nNotes: ${notes || "Please share guidance."}`
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Private Umrah Concierge Enquiry"
      aria-hidden={!conciergeOpen}
      className="no-print"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 8800,
        pointerEvents: conciergeOpen ? "all" : "none",
      }}
    >
      <div
        onClick={closeConcierge}
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(31, 18, 20, 0.6)",
          opacity: conciergeOpen ? 1 : 0,
          transition: "opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />

      <aside
        ref={drawerRef}
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          width: "min(600px, 100vw)",
          backgroundColor: "var(--color-ivory-soft)",
          color: "var(--color-ink)",
          borderLeft: "1px solid var(--color-hairline)",
          padding: "clamp(28px, 4.5vw, 56px)",
          overflowY: "auto",
          transform: conciergeOpen ? "translateX(0)" : "translateX(102%)",
          transition: "transform 0.68s cubic-bezier(0.16, 1, 0.3, 1)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: "36px",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingBottom: "20px",
              borderBottom: "1px solid var(--color-hairline)",
            }}
          >
            <BrandLogo variant="dark" height={44} />
            <button
              type="button"
              onClick={closeConcierge}
              aria-label="Close concierge drawer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "0.75rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--color-ink-muted)",
              }}
            >
              Close <CloseThin size={18} />
            </button>
          </div>

          {!submitted ? (
            <>
              <div style={{ marginTop: "32px", marginBottom: "36px" }}>
                <div className="t-eyebrow" style={{ marginBottom: "12px" }}>
                  Private Concierge
                </div>
                <h2
                  className="t-display-l"
                  style={{ color: "var(--color-burgundy)" }}
                >
                  Begin your <em className="editorial-em">intention</em>.
                </h2>
                <p
                  className="t-body"
                  style={{ marginTop: "12px", color: "var(--color-ink-muted)" }}
                >
                  Share a few quiet details below. A senior Dar E Nabi advisor
                  will respond personally — with transparent options and zero
                  pressure.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                style={{ display: "flex", flexDirection: "column", gap: "26px" }}
              >
                <div className="editorial-field">
                  <label htmlFor="den-name">Your Full Name</label>
                  <input
                    id="den-name"
                    required
                    type="text"
                    placeholder="e.g. Salman & Hina Qureshi"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1.4fr 1fr",
                    gap: "20px",
                  }}
                >
                  <div className="editorial-field">
                    <label htmlFor="den-phone">Phone / WhatsApp</label>
                    <input
                      id="den-phone"
                      required
                      type="tel"
                      placeholder="+92 300 000 0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="editorial-field">
                    <label htmlFor="den-pilgrims">Pilgrims</label>
                    <select
                      id="den-pilgrims"
                      value={pilgrims}
                      onChange={(e) => setPilgrims(e.target.value)}
                    >
                      <option value="1">1 Pilgrim</option>
                      <option value="2">2 Pilgrims</option>
                      <option value="3-4">3–4 Family</option>
                      <option value="5+">5+ Extended Family</option>
                    </select>
                  </div>
                </div>

                <div className="editorial-field">
                  <label htmlFor="den-journey">Journey of Interest</label>
                  <select
                    id="den-journey"
                    value={journey}
                    onChange={(e) => setJourney(e.target.value)}
                  >
                    <option value="">Tailored Private Umrah Consultation</option>
                    {JOURNEYS.map((j) => (
                      <option key={j.slug} value={j.title}>
                        {j.title} ({j.nightsSplit})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="editorial-field">
                  <label htmlFor="den-month">Preferred Travel Window</label>
                  <input
                    id="den-month"
                    type="text"
                    placeholder="e.g. December, Sha'ban, or Ramadan"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                  />
                </div>

                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    fontSize: "0.92rem",
                    color: "var(--color-ink)",
                    cursor: "pointer",
                    paddingBlock: "6px",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={withElders}
                    onChange={(e) => setWithElders(e.target.checked)}
                    style={{
                      width: "18px",
                      height: "18px",
                      accentColor: "var(--color-burgundy)",
                    }}
                  />
                  <span>
                    We are travelling with elderly parents or require step-free
                    mobility care
                  </span>
                </label>

                <div className="editorial-field">
                  <label htmlFor="den-notes">Any Special Wishes (Optional)</label>
                  <textarea
                    id="den-notes"
                    rows={2}
                    placeholder="Haram-view preference, departure city, wheelchair assistance..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "14px",
                    marginTop: "8px",
                  }}
                >
                  <MagneticButton type="submit" variant="primary">
                    Send Enquiry Quietly
                  </MagneticButton>
                  <MagneticButton
                    variant="outline"
                    external
                    href={`https://wa.me/${BRAND_CONTACT.whatsappDigits}?text=${whatsappMessage}`}
                  >
                    Continue on WhatsApp
                  </MagneticButton>
                </div>
              </form>
            </>
          ) : (
            <div style={{ paddingBlock: "64px" }}>
              <span
                lang="ar"
                dir="rtl"
                className="font-arabic"
                style={{
                  fontSize: "1.9rem",
                  color: "var(--color-burgundy)",
                  display: "block",
                  marginBottom: "18px",
                }}
              >
                تَقَبَّلَ اللَّهُ نِيَّتَكُمْ
              </span>
              <h3 className="t-display-l">
                Thank you,{" "}
                <em className="editorial-em">{name || "dear guest"}</em>.
              </h3>
              <p
                className="t-body-lg"
                style={{ marginTop: "18px", color: "var(--color-ink-muted)" }}
              >
                Your enquiry is now with our senior concierge team. We will
                reach out with calm, transparent guidance shortly.
              </p>
              <div
                style={{
                  marginTop: "32px",
                  display: "flex",
                  gap: "16px",
                  flexWrap: "wrap",
                }}
              >
                <MagneticButton
                  variant="primary"
                  external
                  href={`https://wa.me/${BRAND_CONTACT.whatsappDigits}?text=${whatsappMessage}`}
                >
                  Also Message on WhatsApp
                </MagneticButton>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    closeConcierge();
                  }}
                  className="gold-link"
                >
                  Return to Website <ArrowRightThin size={15} />
                </button>
              </div>
            </div>
          )}
        </div>

        <div
          style={{
            paddingTop: "22px",
            borderTop: "1px solid var(--color-hairline)",
            fontSize: "0.82rem",
            color: "var(--color-ink-muted)",
            display: "flex",
            flexDirection: "column",
            gap: "6px",
          }}
        >
          <div>
            Direct Line:{" "}
            <strong style={{ color: "var(--color-ink)", fontWeight: 500 }}>
              {BRAND_CONTACT.phone}
            </strong>
          </div>
          <div>{BRAND_CONTACT.office}</div>
        </div>
      </aside>
    </div>
  );
}
