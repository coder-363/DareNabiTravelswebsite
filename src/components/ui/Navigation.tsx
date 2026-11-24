"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { useExperience } from "@/context/ExperienceContext";
import { BRAND_CONTACT, PHOTOS } from "@/data/content";
import { ArrowRightThin, CloseThin } from "./SacredIcons";
import { BrandLogo } from "./BrandLogo";
import { useFocusTrap, useRovingTabindex } from "@/hooks/useFocusTrap";

const NAV_ITEMS = [
  { label: "Home", href: "/", numeral: "01", photo: PHOTOS.makkahDawn, caption: "Masjid al-Haram · Makkah" },
  { label: "Umrah Journeys", href: "/journeys", numeral: "02", photo: PHOTOS.kaabaKiswah, caption: "Curated Pilgrimages" },
  { label: "The Sacred Guide", href: "/guide", numeral: "03", photo: PHOTOS.quranStillness, caption: "Interactive Companion & Du'as" },
  { label: "Madinah & Ziyarat", href: "/madinah", numeral: "04", photo: PHOTOS.madinahGolden, caption: "The City of the Prophet ﷺ" },
  { label: "Our Care", href: "/about", numeral: "05", photo: PHOTOS.marbleColonnade, caption: "Faith · Trust · Hospitality · Care" },
];

export function Navigation() {
  const pathname = usePathname();
  const {
    menuOpen,
    toggleMenu,
    setMenuOpen,
    openConcierge,
    navigateTo,
    audioEnabled,
    toggleAudio,
    atmosphere,
  } = useExperience();

  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState(0);
  const lastScrollY = useRef(0);

  // Memoize onClose to prevent focus trap re-running
  const handleMenuClose = useCallback(() => {
    setMenuOpen(false);
  }, [setMenuOpen]);

  // Refs for accessibility
  const menuOverlayRef = useRef<HTMLDivElement>(null);
  const indexButtonRef = useRef<HTMLButtonElement>(null);
  const navItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  // Focus trap for architectural menu overlay
  useFocusTrap({
    isOpen: menuOpen,
    containerRef: menuOverlayRef,
    triggerRef: indexButtonRef,
    onClose: handleMenuClose,
  });

  // Roving tabindex for numbered chapter links
  useRovingTabindex({
    isOpen: menuOpen,
    containerRef: menuOverlayRef,
    itemsRef: navItemsRef,
    orientation: "vertical",
    onSelect: (index) => {
      const item = NAV_ITEMS[index];
      if (item) {
        navigateTo(item.href);
        setMenuOpen(false);
      }
    },
  });

  const isHeroPage = pathname === "/" || pathname === "/madinah";
  const lightTextOverHero = isHeroPage && !scrolled && !menuOpen;
  const darkSurfaceBar =
    !menuOpen && scrolled && (atmosphere === "burgundy" || atmosphere === "ink");

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 72);
      if (y > 240 && y > lastScrollY.current + 12 && !menuOpen) {
        setHidden(true);
      } else if (y < lastScrollY.current - 6 || y < 120) {
        setHidden(false);
      }
      lastScrollY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpen]);

  const barBg = menuOpen
    ? "transparent"
    : !scrolled
      ? "transparent"
      : darkSurfaceBar
        ? "rgba(74, 7, 17, 0.96)"
        : "rgba(243, 238, 230, 0.96)";

  const barFg =
    lightTextOverHero || darkSurfaceBar
      ? "var(--color-ivory)"
      : "var(--color-ink)";

  const barBorder =
    scrolled && !menuOpen
      ? darkSurfaceBar
        ? "1px solid var(--color-hairline-dark)"
        : "1px solid var(--color-hairline)"
      : "1px solid transparent";

  return (
    <>
      <header
        className="no-print"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 8000,
          height: scrolled ? "82px" : "104px",
          backgroundColor: barBg,
          color: barFg,
          borderBottom: barBorder,
          transform: hidden ? "translateY(-100%)" : "translateY(0)",
          transition:
            "transform 0.55s cubic-bezier(0.16, 1, 0.3, 1), height 0.45s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.45s ease, color 0.35s ease, border-color 0.35s ease",
        }}
      >
        <div
          className="container"
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "24px",
          }}
        >
          {/* Left: Approved BrandLogo with Protected Clear Space */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigateTo("/");
            }}
            style={{ zIndex: 2, display: "inline-flex", alignItems: "center" }}
            aria-label="Dar E Nabi Travels Home"
          >
            <BrandLogo
              variant={lightTextOverHero || darkSurfaceBar ? "light" : "dark"}
              height={
                lightTextOverHero || darkSurfaceBar
                  ? scrolled
                    ? 52
                    : 64
                  : 44
              }
            />
          </a>

          {/* Center: Quiet Editorial Links (Desktop) */}
          <nav
            aria-label="Primary Navigation"
            className="nav-desktop-links"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "clamp(20px, 2.8vw, 40px)",
            }}
          >
            {NAV_ITEMS.slice(1).map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo(item.href);
                  }}
                  style={{
                    position: "relative",
                    fontSize: "0.875rem",
                    fontWeight: active ? 500 : 400,
                    letterSpacing: "0.02em",
                    opacity: active ? 1 : 0.85,
                    paddingBlock: "6px",
                    borderBottom: active
                      ? "1px solid var(--color-gold)"
                      : "1px solid transparent",
                    transition: "opacity 0.3s ease, border-color 0.3s ease",
                  }}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Right: Stillness Audio + Enquire + Index Menu */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "clamp(12px, 1.8vw, 24px)",
            }}
          >
            <button
              type="button"
              onClick={toggleAudio}
              aria-pressed={audioEnabled}
              aria-label={
                audioEnabled
                  ? "Mute ambient courtyard stillness"
                  : "Enable soft non-musical courtyard stillness ambience"
              }
              title={
                audioEnabled
                  ? "Stillness ambience active (non-musical breeze)"
                  : "Optional courtyard stillness (non-musical)"
              }
              className="nav-audio-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "0.72rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                opacity: 0.82,
                padding: "6px 8px",
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  display: "inline-flex",
                  alignItems: "flex-end",
                  gap: "2.5px",
                  height: "12px",
                }}
              >
                {[0, 1, 2].map((bar) => (
                  <span
                    key={bar}
                    style={{
                      width: "1.5px",
                      height: audioEnabled
                        ? bar === 1
                          ? "12px"
                          : "8px"
                        : "4px",
                      backgroundColor: "var(--color-gold)",
                      transition: "height 0.4s ease",
                      animation: audioEnabled
                        ? `stillnessBar ${1.1 + bar * 0.25}s ease-in-out infinite alternate`
                        : "none",
                    }}
                  />
                ))}
              </span>
              <span className="nav-audio-label">
                {audioEnabled ? "Stillness" : "Quiet"}
              </span>
            </button>

            <button
              type="button"
              onClick={() => openConcierge()}
              className="nav-enquire-btn"
              style={{
                padding: "10px 20px",
                borderRadius: "2px",
                fontSize: "0.82rem",
                fontWeight: 500,
                letterSpacing: "0.04em",
                border:
                  lightTextOverHero || darkSurfaceBar
                    ? "1px solid rgba(210, 160, 74, 0.65)"
                    : "1px solid var(--color-burgundy)",
                backgroundColor:
                  lightTextOverHero || darkSurfaceBar
                    ? "transparent"
                    : "var(--color-burgundy)",
                color: "var(--color-ivory)",
                transition: "background-color 0.35s ease, color 0.35s ease",
              }}
            >
              Enquire
            </button>

            <button
              type="button"
              ref={indexButtonRef}
              onClick={toggleMenu}
              aria-expanded={menuOpen}
              aria-controls="architectural-menu"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                fontSize: "0.78rem",
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                padding: "6px 0",
              }}
            >
              <span>{menuOpen ? "Close" : "Index"}</span>
              {menuOpen ? (
                <CloseThin size={18} />
              ) : (
                <span
                  aria-hidden="true"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                    width: "22px",
                  }}
                >
                  <span
                    style={{
                      height: "1px",
                      width: "100%",
                      backgroundColor: "currentColor",
                    }}
                  />
                  <span
                    style={{
                      height: "1px",
                      width: "70%",
                      marginLeft: "auto",
                      backgroundColor: "var(--color-gold)",
                    }}
                  />
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* FULL-SCREEN ARCHITECTURAL INDEX OVERLAY */}
      <div
        id="architectural-menu"
        ref={menuOverlayRef}
        aria-hidden={!menuOpen}
        className="no-print"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 7900,
          backgroundColor: "var(--color-ivory-soft)",
          color: "var(--color-ink)",
          clipPath: menuOpen
            ? "inset(0% 0% 0% 0%)"
            : "inset(0% 0% 100% 0%)",
          pointerEvents: menuOpen ? "all" : "none",
          transition: "clip-path 0.72s cubic-bezier(0.76, 0, 0.24, 1)",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          paddingTop: "110px",
          paddingBottom: "48px",
        }}
      >
        <div
          className="container"
          style={{ flex: 1, display: "flex", alignItems: "center" }}
        >
          <div
            className="grid-12"
            style={{ width: "100%", alignItems: "center" }}
          >
            {/* Left: Oversized Numbered Chapters */}
            <div style={{ gridColumn: "span 7" }} className="menu-col-left">
              <div className="t-eyebrow" style={{ marginBottom: "28px" }}>
                Index — Dar E Nabi Travels
              </div>
              <ul style={{ listStyle: "none" }}>
                {NAV_ITEMS.map((item, idx) => (
                  <li
                    key={item.href}
                    style={{
                      borderBottom: "1px solid var(--color-hairline)",
                    }}
                  >
                    <a
                      ref={(el) => { navItemsRef.current[idx] = el; }}
                      href={item.href}
                      tabIndex={menuOpen ? 0 : -1}
                      onMouseEnter={() => setHoveredIdx(idx)}
                      onFocus={() => setHoveredIdx(idx)}
                      onClick={(e) => {
                        e.preventDefault();
                        navigateTo(item.href);
                        setMenuOpen(false);
                      }}
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        justifyContent: "space-between",
                        paddingBlock: "clamp(16px, 2.2vh, 26px)",
                        gap: "20px",
                        opacity: menuOpen ? 1 : 0,
                        transform: menuOpen
                          ? "translateY(0)"
                          : "translateY(20px)",
                        transition: `opacity 0.6s ease ${0.15 + idx * 0.05}s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${0.15 + idx * 0.05}s, color 0.3s ease`,
                      }}
                    >
                      <span
                        style={{
                          display: "flex",
                          alignItems: "baseline",
                          gap: "20px",
                        }}
                      >
                        <span
                          className="font-serif"
                          style={{
                            fontStyle: "italic",
                            color: "var(--color-gold-text)",
                            fontSize: "1.1rem",
                          }}
                        >
                          {item.numeral}
                        </span>
                        <span
                          className="t-display-l"
                          style={{
                            color:
                              hoveredIdx === idx
                                ? "var(--color-burgundy)"
                                : "var(--color-ink)",
                            transition: "color 0.3s ease",
                          }}
                        >
                          {item.label}
                        </span>
                      </span>
                      <ArrowRightThin
                        size={20}
                        color="var(--color-gold-text)"
                        style={{
                          transform:
                            hoveredIdx === idx
                              ? "translateX(6px)"
                              : "translateX(0)",
                          transition: "transform 0.4s ease",
                        }}
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Live Crossfading Arch Destination Preview */}
            <div
              style={{ gridColumn: "9 / span 4" }}
              className="menu-col-right"
            >
              <div
                className="arch-mask"
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "3 / 4",
                  maxHeight: "52vh",
                  backgroundColor: "var(--color-sand)",
                  border: "1px solid var(--color-hairline)",
                }}
              >
                {NAV_ITEMS.map((item, idx) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={item.href}
                    src={item.photo}
                    alt={item.caption}
                    className="editorial-photo"
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      opacity: hoveredIdx === idx ? 1 : 0,
                      transform:
                        hoveredIdx === idx ? "scale(1)" : "scale(1.06)",
                      transition:
                        "opacity 0.65s ease, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                  />
                ))}
              </div>
              <div
                className="t-meta"
                style={{
                  marginTop: "14px",
                  color: "var(--color-ink-muted)",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>{NAV_ITEMS[hoveredIdx]?.caption}</span>
                <span
                  className="font-arabic"
                  lang="ar"
                  dir="rtl"
                  style={{ color: "var(--color-burgundy)" }}
                >
                  {BRAND_CONTACT.arabicName}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Footer Contact Bar */}
        <div
          className="container"
          style={{
            marginTop: "32px",
            paddingTop: "24px",
            borderTop: "1px solid var(--color-hairline)",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div className="t-meta" style={{ color: "var(--color-ink-muted)" }}>
            {BRAND_CONTACT.phone} &nbsp;·&nbsp; {BRAND_CONTACT.email}
          </div>
          <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
            <a
              href={`https://wa.me/${BRAND_CONTACT.whatsappDigits}?text=${encodeURIComponent(
                "Assalamu Alaikum Dar E Nabi Travels, I would like to enquire about an Umrah journey."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="gold-link"
              style={{ color: "var(--color-burgundy)" }}
            >
              WhatsApp Concierge <ArrowRightThin size={15} />
            </a>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes stillnessBar {
          0% { height: 4px; }
          100% { height: 12px; }
        }
        @media (max-width: 960px) {
          .nav-desktop-links,
          .nav-audio-label {
            display: none !important;
          }
          .menu-col-left {
            grid-column: 1 / -1 !important;
          }
          .menu-col-right {
            display: none !important;
          }
        }
        @media (max-width: 520px) {
          .nav-enquire-btn {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
