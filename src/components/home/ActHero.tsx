"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useExperience } from "@/context/ExperienceContext";
import { PHOTOS } from "@/data/content";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { ArabicSweep } from "@/components/ui/ArabicSweep";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { WebGLHeroCanvas } from "@/components/engine/WebGLHeroCanvas";
import { HaramainLiveBar } from "@/components/ui/HaramainLiveBar";
import { KhatamStar } from "@/components/ui/SacredIcons";

gsap.registerPlugin(ScrollTrigger);

export function ActHero() {
  const {
    preloaderDone,
    openConcierge,
    navigateTo,
    setAtmosphere,
    setActiveAct,
    reducedMotion,
  } = useExperience();

  const sectionRef = useRef<HTMLElement | null>(null);
  const bgImgRef = useRef<HTMLImageElement | null>(null);
  const contentWrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bgImg = bgImgRef.current;
    const contentWrap = contentWrapRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          setActiveAct(0);
          setAtmosphere("ivory");
        },
        onEnterBack: () => {
          setActiveAct(0);
          setAtmosphere("ivory");
        },
      });

      if (reducedMotion) return;

      if (preloaderDone && bgImg) {
        gsap.fromTo(
          bgImg,
          { scale: 1.08 },
          { scale: 1.0, duration: 1.9, ease: "power3.out" }
        );
      }

      if (window.innerWidth >= 900 && bgImg && contentWrap) {
        gsap.to(bgImg, {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 0.9,
          },
        });

        gsap.to(contentWrap, {
          yPercent: -14,
          opacity: 0.2,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, [preloaderDone, reducedMotion, setAtmosphere, setActiveAct]);

  return (
    <section
      id="act-arrival"
      ref={sectionRef}
      style={{
        position: "relative",
        minHeight: "100svh",
        width: "100%",
        overflow: "hidden",
        backgroundColor: "var(--color-ink)",
        color: "var(--color-ivory)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        paddingTop: "clamp(112px, 13vh, 144px)",
        paddingBottom: "clamp(28px, 4.5vh, 48px)",
      }}
    >
      {/* Instant-LCP Authentic Masjid al-Haram Dawn Photography + Phase 3 WebGL Living Shader Layer */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={bgImgRef}
          src={PHOTOS.makkahDawn}
          alt="Masjid al-Haram and the Holy Kaaba in soft morning light"
          loading="eager"
          decoding="sync"
          className="editorial-photo"
          style={{
            width: "100%",
            height: "112%",
            objectFit: "cover",
            objectPosition: "center 68%",
            willChange: "transform",
          }}
        />
        {/* Phase 3 FX-GL2: Custom OGL GLSL Living Dawn Light & Pointer Micro-Parallax */}
        <WebGLHeroCanvas src={PHOTOS.makkahDawn} />
        {/* Calibrated Luminous Sanctuary Scrim: crisp navbar top, luminous dawn mid-ground, soft focal center */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 72% 58% at 50% 50%, rgba(31,18,20,0.54) 0%, rgba(31,18,20,0.34) 58%, rgba(31,18,20,0.68) 100%), linear-gradient(180deg, rgba(31,18,20,0.54) 0%, rgba(74,7,17,0.14) 36%, rgba(31,18,20,0.72) 100%)",
          }}
        />
      </div>

      {/* Centered Monumental Sanctuary Composition (Zero Top Clutter) */}
      <div
        ref={contentWrapRef}
        className="container"
        style={{
          position: "relative",
          zIndex: 2,
          marginBlock: "auto",
          paddingBlock: "clamp(28px, 5vh, 56px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          willChange: "transform, opacity",
        }}
      >
        {/* Delicate Fine-Gold Ornamental Crest */}
        <div
          aria-hidden="true"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "14px",
            marginBottom: "clamp(16px, 2.5vh, 24px)",
            opacity: 0.88,
          }}
        >
          <span
            style={{
              width: "36px",
              height: "1px",
              backgroundColor: "rgba(210, 160, 74, 0.55)",
            }}
          />
          <KhatamStar size={14} color="var(--color-gold)" />
          <span
            style={{
              width: "36px",
              height: "1px",
              backgroundColor: "rgba(210, 160, 74, 0.55)",
            }}
          />
        </div>

        {/* Centered Arabic Talbiyah */}
        <ArabicSweep
          immediate={preloaderDone}
          delay={0.35}
          text="لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ"
          style={{
            fontSize: "clamp(1.45rem, 2.8vw, 2.4rem)",
            color: "var(--color-gold)",
            marginBottom: "clamp(16px, 2.6vh, 26px)",
            textShadow: "0 2px 24px rgba(31, 18, 20, 0.45)",
          }}
        />

        {/* Monumental Centered Headline */}
        <div style={{ width: "100%", maxWidth: "1120px" }}>
          <SplitHeading
            as="h1"
            immediate={preloaderDone}
            delay={0.15}
            className="t-monument"
            style={{
              textAlign: "center",
              fontSize: "clamp(2.8rem, 6.4vw, 6.2rem)",
              textShadow: "0 4px 36px rgba(31, 18, 20, 0.35)",
            }}
            lines={[
              <>
                A journey of <em className="editorial-em">faith</em>,
              </>,
              <>
                guided with <em className="editorial-em">care</em>.
              </>,
            ]}
          />
        </div>

        {/* Restrained Centered Narrative */}
        <p
          className="t-body-lg"
          style={{
            color: "rgba(243, 238, 230, 0.92)",
            maxWidth: "50ch",
            marginTop: "clamp(20px, 3vh, 30px)",
            marginBottom: "clamp(28px, 4.2vh, 42px)",
            textShadow: "0 1px 16px rgba(31, 18, 20, 0.4)",
          }}
        >
          Dar E Nabi Travels makes sacred Umrah journeys feel peaceful,
          comfortable, organized, and trustworthy — so your heart remains
          present before Allah.
        </p>

        {/* Balanced Centered CTAs */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <MagneticButton
            variant="ivory"
            onClick={() => openConcierge()}
          >
            Begin Your Intention
          </MagneticButton>
          <MagneticButton
            variant="outline-light"
            href="/journeys"
            onClick={() => navigateTo("/journeys")}
          >
            Explore Journeys
          </MagneticButton>
        </div>
      </div>

      {/* Quiet Bottom Anchor Bar: Live Haramain Sanctuary Clock + Scroll Prompt */}
      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div
          className="hero-bottom-bar"
          style={{
            paddingTop: "18px",
            borderTop: "1px solid rgba(210, 160, 74, 0.26)",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "16px",
            fontSize: "0.74rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "rgba(243, 238, 230, 0.82)",
          }}
        >
          <HaramainLiveBar />

          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <span>Scroll gently to enter</span>
            <span
              aria-hidden="true"
              style={{
                width: "44px",
                height: "1px",
                backgroundColor: "rgba(210, 160, 74, 0.35)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundColor: "var(--color-gold)",
                  animation:
                    "scrollPulse 2.6s cubic-bezier(0.76, 0, 0.24, 1) infinite",
                }}
              />
            </span>
          </span>
        </div>
      </div>

      <style jsx global>{`
        @keyframes scrollPulse {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
        @media (max-width: 720px) {
          .hero-bottom-bar {
            justify-content: center !important;
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
}
