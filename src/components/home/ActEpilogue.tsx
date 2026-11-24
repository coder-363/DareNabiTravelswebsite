"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useExperience } from "@/context/ExperienceContext";
import { BRAND_CONTACT, PHOTOS } from "@/data/content";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { ArabicSweep } from "@/components/ui/ArabicSweep";
import { MagneticButton } from "@/components/ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export function ActEpilogue() {
  const { setAtmosphere, openConcierge, reducedMotion } = useExperience();
  const sectionRef = useRef<HTMLElement | null>(null);
  const bgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top 65%",
        end: "bottom 20%",
        onEnter: () => setAtmosphere("ink"),
        onEnterBack: () => setAtmosphere("ink"),
      });

      if (!reducedMotion && bgRef.current && window.innerWidth >= 900) {
        gsap.fromTo(
          bgRef.current,
          { scale: 1.12, yPercent: -6 },
          {
            scale: 1.0,
            yPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.1,
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, [reducedMotion, setAtmosphere]);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        minHeight: "88svh",
        backgroundColor: "var(--color-ink)",
        color: "var(--color-ivory)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        paddingBlock: "clamp(100px, 14vw, 176px)",
      }}
    >
      <div aria-hidden="true" style={{ position: "absolute", inset: 0 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={bgRef}
          src={PHOTOS.duskSanctuary}
          alt="Illuminated white marble sanctuary arches reflecting in calm twilight"
          loading="lazy"
          className="editorial-photo"
          style={{
            width: "100%",
            height: "114%",
            objectFit: "cover",
            objectPosition: "center center",
            willChange: "transform",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(31,18,20,0.72) 0%, rgba(74,7,17,0.58) 52%, rgba(74,7,17,0.92) 100%)",
          }}
        />
      </div>

      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "28px",
        }}
      >
        <ArabicSweep
          text="سَكِينَةٌ فِي كُلِّ خُطْوَة"
          style={{
            fontSize: "clamp(1.35rem, 2.3vw, 2rem)",
            color: "var(--color-gold)",
          }}
        />

        <SplitHeading
          className="t-monument"
          style={{ maxWidth: "16ch" }}
          lines={[
            <>When your heart is</>,
            <>
              ready, we are <em className="editorial-em">here</em>.
            </>,
          ]}
        />

        <p
          className="t-body-lg"
          style={{
            color: "rgba(243, 238, 230, 0.88)",
            maxWidth: "46ch",
          }}
        >
          Speak directly with a Dar E Nabi Umrah advisor. No automated call
          centers, no sales urgency — only sincere guidance tailored to your
          family.
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "16px",
            marginTop: "12px",
          }}
        >
          <MagneticButton variant="ivory" onClick={() => openConcierge()}>
            Speak With Our Concierge
          </MagneticButton>
          <MagneticButton
            variant="outline-light"
            external
            href={`https://wa.me/${BRAND_CONTACT.whatsappDigits}?text=${encodeURIComponent(
              "Assalamu Alaikum Dar E Nabi Travels, I would like to begin planning an Umrah journey."
            )}`}
          >
            Message on WhatsApp
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
