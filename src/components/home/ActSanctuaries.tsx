"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useExperience } from "@/context/ExperienceContext";
import { PHOTOS } from "@/data/content";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { ArabicSweep } from "@/components/ui/ArabicSweep";
import { LivingImage } from "@/components/engine/LivingImage";
import { ArrowRightThin } from "@/components/ui/SacredIcons";
import { HaramainRouteLine } from "@/components/ui/HaramainRouteLine";

gsap.registerPlugin(ScrollTrigger);

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function ActSanctuaries() {
  const { setAtmosphere, setActiveAct, navigateTo, reducedMotion } =
    useExperience();
  const sectionRef = useRef<HTMLElement | null>(null);
  const portalStageRef = useRef<HTMLDivElement | null>(null);
  const portalFrameRef = useRef<HTMLDivElement | null>(null);
  const portalImgRef = useRef<HTMLImageElement | null>(null);
  const portalCaptionRef = useRef<HTMLDivElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    const stage = portalStageRef.current;
    const frame = portalFrameRef.current;
    const img = portalImgRef.current;
    const caption = portalCaptionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top 55%",
        end: "bottom 45%",
        onEnter: () => {
          setActiveAct(2);
          setAtmosphere("ivory");
        },
        onEnterBack: () => {
          setActiveAct(2);
          setAtmosphere("ivory");
        },
      });

      if (!reducedMotion && window.innerWidth >= 960 && stage && frame && img && caption) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stage,
            start: "top top",
            end: "+=140%",
            scrub: 1.15,
            pin: true,
            anticipatePin: 1,
          },
        });

        tl.fromTo(
          frame,
          {
            width: "36vw",
            height: "70vh",
            borderRadius: "400px 400px 0px 0px",
          },
          {
            width: "100vw",
            height: "100vh",
            borderRadius: "0px 0px 0px 0px",
            ease: "power2.inOut",
          },
          0
        )
          .fromTo(img, { scale: 1.2 }, { scale: 1.0, ease: "power2.inOut" }, 0)
          .fromTo(
            caption,
            { opacity: 0, y: 36 },
            { opacity: 1, y: 0, ease: "power2.out" },
            0.48
          );
      }
    }, section);

    return () => ctx.revert();
  }, [reducedMotion, setAtmosphere, setActiveAct]);

  return (
    <section id="act-sanctuaries" ref={sectionRef}>
      {/* PART A: MAKKAH AL-MUKARRAMAH — ASYMMETRIC EDITORIAL DIPTYCH */}
      <div
        className="container"
        style={{
          paddingTop: "clamp(64px, 8vw, 120px)",
          paddingBottom: "clamp(72px, 9vw, 128px)",
        }}
      >
        <div
          className="grid-12"
          style={{ alignItems: "start", rowGap: "48px" }}
        >
          <div style={{ gridColumn: "span 5" }} className="sanct-left">
            <LivingImage
              src={PHOTOS.kaabaKiswah}
              alt="The Sacred Kiswah and golden door of the Holy Kaaba in Makkah"
              aspect="3 / 4"
              arch
              cursorLabel="view"
            />
            <div
              className="t-meta"
              style={{
                marginTop: "16px",
                display: "flex",
                justifyContent: "space-between",
                color: "var(--color-ink-muted)",
              }}
            >
              <span>01 · Al-Masjid al-Haram, Makkah</span>
              <span
                lang="ar"
                dir="rtl"
                className="font-arabic"
                style={{ color: "var(--color-burgundy)" }}
              >
                مَكَّةُ الْمُكَرَّمَة
              </span>
            </div>
          </div>

          <div
            style={{
              gridColumn: "7 / span 6",
              paddingTop: "clamp(0px, 6vw, 88px)",
              display: "flex",
              flexDirection: "column",
              gap: "32px",
            }}
            className="sanct-right"
          >
            <div className="t-eyebrow">Act III — The Two Sanctuaries</div>

            <SplitHeading
              className="t-display-xl"
              lines={[
                <>Makkah — Where</>,
                <>
                  every step turns <em className="editorial-em">inward</em>.
                </>,
              ]}
            />

            <p
              className="t-body-lg"
              style={{ color: "var(--color-ink-muted)", maxWidth: "46ch" }}
            >
              Proximity matters most when you are answering the call of Fajr. We
              select verified hotels within calm, level walking minutes of
              Masjid al-Haram — sparing your family long shuttles so your
              strength stays reserved for Tawaf and prayer.
            </p>

            <div
              style={{
                marginTop: "12px",
                width: "min(460px, 100%)",
                marginLeft: "auto",
              }}
            >
              <LivingImage
                src={PHOTOS.makkahMinarets}
                alt="Minarets of Masjid al-Haram rising toward the Makkah sky"
                aspect="16 / 10"
                cursorLabel="explore"
              />
              <p
                className="t-meta"
                style={{ marginTop: "12px", color: "var(--color-ink-muted)" }}
              >
                Step-free sanctuaries within 1–4 minutes of the Haram piazza.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* PHASE 2 GRAPHIC: FINE GOLD TRAVEL-INSPIRED ROUTE LINE */}
      <HaramainRouteLine />

      {/* PART B: FX-SC1 — EXPANDING ARCH PORTAL INTO MADINAH */}
      <div
        ref={portalStageRef}
        className="portal-stage"
        style={{
          position: "relative",
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden="true"
          className="portal-bg-label"
          style={{
            position: "absolute",
            insetInline: "var(--gutter)",
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            justifyContent: "space-between",
            pointerEvents: "none",
            color: "var(--color-ink-muted)",
            fontSize: "0.75rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          <span>Cross the threshold</span>
          <span>Madinah al-Munawwarah</span>
        </div>

        <div
          ref={portalFrameRef}
          className="portal-frame"
          data-cursor="explore"
          style={{
            position: "relative",
            width: "100vw",
            height: "86vh",
            overflow: "hidden",
            backgroundColor: "var(--color-ink)",
            willChange: "width, height, border-radius",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={portalImgRef}
            src={PHOTOS.madinahGolden}
            alt="Masjid an-Nabawi Green Dome, minarets, and limestone arches in warm golden light"
            className="editorial-photo"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center center",
              willChange: "transform",
            }}
          />

          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(74,7,17,0.22) 0%, rgba(31,18,20,0.26) 45%, rgba(31,18,20,0.82) 100%)",
            }}
          />

          <div
            ref={portalCaptionRef}
            className="container"
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: "clamp(40px, 7vh, 88px)",
              color: "var(--color-ivory)",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: "28px",
            }}
          >
            <div>
              <ArabicSweep
                text="الْمَدِينَةُ الْمُنَوَّرَة"
                style={{
                  fontSize: "clamp(1.3rem, 2.2vw, 1.9rem)",
                  color: "var(--color-gold)",
                  marginBottom: "10px",
                }}
              />
              <h2 className="t-display-xl" style={{ maxWidth: "16ch" }}>
                Madinah — Where the heart finds{" "}
                <em className="editorial-em">rest</em>.
              </h2>
            </div>

            <div style={{ maxWidth: "38ch" }}>
              <p
                className="t-body"
                style={{
                  color: "rgba(243, 238, 230, 0.9)",
                  marginBottom: "20px",
                }}
              >
                Arrive quietly via the Haramain High-Speed Rail. Walk steps to
                the Green Dome, receive calm Nusuk Rawdah guidance, and linger
                in unhurried peace.
              </p>
              <a
                href="/madinah"
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo("/madinah");
                }}
                className="gold-link"
                style={{ color: "var(--color-ivory)" }}
              >
                Enter the Madinah Photo Essay <ArrowRightThin size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 960px) {
          .sanct-left,
          .sanct-right {
            grid-column: 1 / -1 !important;
          }
          .portal-bg-label {
            display: none !important;
          }
          .portal-stage {
            min-height: 76vh !important;
          }
          .portal-frame {
            width: 100% !important;
            height: 76vh !important;
            border-radius: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}
