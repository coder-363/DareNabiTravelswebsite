"use client";

import { useEffect, useState } from "react";

/* ==========================================================================
   PHASE 3 — LIVE HARAMAIN SANCTUARY TIME & PRAYER ATMOSPHERE
   Quietly displays current local time in Makkah & Madinah (Asia/Riyadh)
   alongside the current prayer window — creating instant emotional presence.
   ========================================================================== */

function getPrayerAtmosphere(hour24: number): string {
  if (hour24 >= 4 && hour24 < 6) return "Fajr Dawn";
  if (hour24 >= 6 && hour24 < 12) return "Morning Stillness";
  if (hour24 >= 12 && hour24 < 15) return "Dhuhr Midday";
  if (hour24 >= 15 && hour24 < 18) return "Asr Afternoon";
  if (hour24 >= 18 && hour24 < 19) return "Maghrib Dusk";
  return "Isha & Night Prayer";
}

export function HaramainLiveBar() {
  const [timeStr, setTimeStr] = useState<string>("");
  const [prayerPeriod, setPrayerPeriod] = useState<string>("");

  useEffect(() => {
    const update = () => {
      try {
        const now = new Date();
        const formatted = new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Riyadh",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }).format(now);

        const hour24 = Number(
          new Intl.DateTimeFormat("en-GB", {
            timeZone: "Asia/Riyadh",
            hour: "2-digit",
            hour12: false,
          }).format(now)
        );

        setTimeStr(formatted);
        setPrayerPeriod(getPrayerAtmosphere(hour24));
      } catch {
        setTimeStr("");
      }
    };

    update();
    const id = window.setInterval(update, 30000);
    return () => window.clearInterval(id);
  }, []);

  if (!timeStr) return null;

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "12px",
        fontSize: "0.74rem",
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: "rgba(243, 238, 230, 0.84)",
      }}
    >
      <span
        aria-hidden="true"
        style={{
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          backgroundColor: "var(--color-gold)",
          display: "inline-block",
          animation: "gentlePulse 3.2s ease-in-out infinite",
        }}
      />
      <span>Makkah &amp; Madinah</span>
      <span style={{ opacity: 0.45 }}>·</span>
      <span style={{ color: "var(--color-gold)", fontWeight: 500 }}>
        {timeStr} KSA
      </span>
      <span style={{ opacity: 0.45 }}>·</span>
      <span style={{ opacity: 0.8 }}>{prayerPeriod}</span>

      <style jsx>{`
        @keyframes gentlePulse {
          0%, 100% { opacity: 0.45; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1.15); }
        }
      `}</style>
    </div>
  );
}
