"use client";

import { useExperience } from "@/context/ExperienceContext";
import { BRAND_CONTACT } from "@/data/content";
import { KhatamLatticePattern, ArrowRightThin } from "./SacredIcons";
import { ArabicSweep } from "./ArabicSweep";
import { BrandLogo } from "./BrandLogo";

export function Footer() {
  const { navigateTo, openConcierge } = useExperience();

  return (
    <footer
      style={{
        position: "relative",
        backgroundColor: "var(--color-burgundy)",
        color: "var(--color-ivory)",
        overflow: "hidden",
        paddingTop: "clamp(84px, 10vw, 136px)",
        paddingBottom: "48px",
      }}
    >
      {/* Subtle 4.5% Warm Gold Islamic Geometric Lattice */}
      <KhatamLatticePattern opacity={0.05} />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* Top Logo + Tagline + Closing Arabic Supplication */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "24px",
            paddingBottom: "clamp(48px, 6vw, 76px)",
            borderBottom: "1px solid var(--color-hairline-dark)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "24px", flexWrap: "wrap" }}>
            <BrandLogo variant="light" height={76} />
            <div
              style={{
                borderLeft: "1px solid var(--color-hairline-dark)",
                paddingLeft: "20px",
              }}
            >
              <div className="t-eyebrow t-eyebrow--light">
                {BRAND_CONTACT.tagline}
              </div>
              <div
                className="t-meta"
                style={{ color: "var(--color-ivory-muted)", marginTop: "6px" }}
              >
                {BRAND_CONTACT.licence}
              </div>
            </div>
          </div>

          <ArabicSweep
            text="تَقَبَّلَ اللَّهُ مِنَّا وَمِنْكُمْ"
            style={{
              fontSize: "clamp(1.4rem, 2.4vw, 2.1rem)",
              color: "var(--color-gold)",
            }}
          />
        </div>

        {/* 3-Column Editorial Navigation & Contact */}
        <div
          className="grid-12"
          style={{
            paddingBlock: "clamp(52px, 6.5vw, 88px)",
            borderBottom: "1px solid var(--color-hairline-dark)",
          }}
        >
          <div style={{ gridColumn: "span 4" }} className="footer-col">
            <div
              className="t-eyebrow t-eyebrow--light"
              style={{ marginBottom: "22px" }}
            >
              Explore
            </div>
            <ul
              style={{
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
              }}
            >
              {[
                { label: "Umrah Journeys", href: "/journeys" },
                { label: "The Sacred Guide", href: "/guide" },
                { label: "Madinah & Ziyarat", href: "/madinah" },
                { label: "Our Care & Heritage", href: "/about" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      navigateTo(link.href);
                    }}
                    className="gold-link"
                    style={{ color: "var(--color-ivory)" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div style={{ gridColumn: "span 4" }} className="footer-col">
            <div
              className="t-eyebrow t-eyebrow--light"
              style={{ marginBottom: "22px" }}
            >
              Sanctuary Concierge
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                color: "var(--color-ivory-muted)",
              }}
            >
              <a
                href={`tel:${BRAND_CONTACT.phone.replace(/\s+/g, "")}`}
                style={{ color: "var(--color-ivory)", fontSize: "1.12rem" }}
              >
                {BRAND_CONTACT.phone}
              </a>
              <a href={`mailto:${BRAND_CONTACT.email}`}>{BRAND_CONTACT.email}</a>
              <p className="t-meta">{BRAND_CONTACT.office}</p>
              <p className="t-meta" style={{ opacity: 0.72 }}>
                {BRAND_CONTACT.hours}
              </p>
            </div>
          </div>

          <div style={{ gridColumn: "span 4" }} className="footer-col">
            <div
              className="t-eyebrow t-eyebrow--light"
              style={{ marginBottom: "22px" }}
            >
              Begin Quietly
            </div>
            <p
              className="t-body"
              style={{
                color: "var(--color-ivory-muted)",
                marginBottom: "24px",
                maxWidth: "34ch",
              }}
            >
              Whether you are planning your first Umrah or arranging step-free
              care for your parents, our advisors are here.
            </p>
            <button
              type="button"
              onClick={() => openConcierge()}
              className="gold-link"
              style={{ color: "var(--color-gold)" }}
            >
              Speak With Our Concierge <ArrowRightThin size={16} />
            </button>
          </div>
        </div>

        {/* Monumental Ivory Wordmark Across Full Width */}
        <div
          style={{
            paddingTop: "clamp(36px, 5vw, 64px)",
            paddingBottom: "24px",
            textAlign: "center",
          }}
        >
          <div
            className="font-serif"
            style={{
              fontSize: "clamp(2.8rem, 11.4vw, 10.2rem)",
              fontWeight: 300,
              lineHeight: 0.9,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "var(--color-ivory)",
              opacity: 0.94,
              userSelect: "none",
            }}
          >
            Dar E Nabi
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "12px",
            fontSize: "0.78rem",
            color: "var(--color-ivory-muted)",
            opacity: 0.78,
          }}
        >
          <span>
            © {new Date().getFullYear()} {BRAND_CONTACT.name}. All rights
            reserved.
          </span>
          <span>Makkah al-Mukarramah · Madinah al-Munawwarah</span>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .footer-col {
            grid-column: 1 / -1 !important;
          }
        }
      `}</style>
    </footer>
  );
}
