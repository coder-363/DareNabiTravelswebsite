"use client";

import { useExperience } from "@/context/ExperienceContext";

const ACTS = [
  { id: "act-arrival", label: "Arrival" },
  { id: "act-intention", label: "Intention" },
  { id: "act-sanctuaries", label: "Sanctuaries" },
  { id: "act-steps", label: "The Steps" },
  { id: "act-journeys", label: "Journeys" },
  { id: "act-pillars", label: "Values" },
  { id: "act-reflections", label: "Guidance" },
];

export function ActCompass() {
  const { activeAct, atmosphere } = useExperience();
  const isDark = atmosphere === "burgundy" || atmosphere === "ink";

  return (
    <aside
      aria-label="Chapter progress"
      className="act-compass no-print"
      style={{
        position: "fixed",
        right: "26px",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 4000,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: "14px",
      }}
    >
      {ACTS.map((act, idx) => {
        const isActive = activeAct === idx;
        return (
          <button
            key={act.id}
            type="button"
            onClick={() => {
              const el = document.getElementById(act.id);
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            aria-label={`Jump to ${act.label}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              paddingBlock: "3px",
              color: isDark ? "var(--color-ivory)" : "var(--color-ink)",
            }}
          >
            <span
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                opacity: isActive ? 0.9 : 0,
                transform: isActive ? "translateX(0)" : "translateX(6px)",
                transition: "opacity 0.4s ease, transform 0.4s ease",
              }}
            >
              {act.label}
            </span>
            <span
              style={{
                width: isActive ? "22px" : "8px",
                height: "1px",
                backgroundColor: isActive
                  ? "var(--color-gold)"
                  : isDark
                    ? "rgba(243,238,230,0.35)"
                    : "rgba(31,18,20,0.28)",
                transition:
                  "width 0.45s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.35s ease",
              }}
            />
          </button>
        );
      })}

      <style jsx>{`
        @media (max-width: 1180px) {
          .act-compass {
            display: none !important;
          }
        }
      `}</style>
    </aside>
  );
}
