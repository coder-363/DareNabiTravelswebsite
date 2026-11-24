"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";

export type AtmosphereMode = "ivory" | "sand" | "burgundy" | "ink";

interface ExperienceContextValue {
  preloaderDone: boolean;
  completePreloader: () => void;

  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  toggleMenu: () => void;

  conciergeOpen: boolean;
  conciergeJourney: string;
  openConcierge: (journeyTitle?: string) => void;
  closeConcierge: () => void;

  isTransitioning: boolean;
  navigateTo: (href: string) => void;

  atmosphere: AtmosphereMode;
  setAtmosphere: (mode: AtmosphereMode) => void;

  activeAct: number;
  setActiveAct: (act: number) => void;

  audioEnabled: boolean;
  toggleAudio: () => void;

  reducedMotion: boolean;
}

const ExperienceContext = createContext<ExperienceContextValue | null>(null);

export function ExperienceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [preloaderDone, setPreloaderDone] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [conciergeOpen, setConciergeOpen] = useState(false);
  const [conciergeJourney, setConciergeJourney] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [atmosphere, setAtmosphere] = useState<AtmosphereMode>("ivory");
  const [activeAct, setActiveAct] = useState(0);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);

    if (mq.matches || sessionStorage.getItem("den_threshold_seen_v3") === "1") {
      setPreloaderDone(true);
    }

    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setAtmosphere("ivory");
    const timer = window.setTimeout(() => {
      setIsTransitioning(false);
    }, 320);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    if (menuOpen || conciergeOpen) {
      document.documentElement.setAttribute("data-overlay-open", "true");
    } else {
      document.documentElement.removeAttribute("data-overlay-open");
    }
  }, [menuOpen, conciergeOpen]);

  const completePreloader = useCallback(() => {
    sessionStorage.setItem("den_threshold_seen_v3", "1");
    setPreloaderDone(true);
  }, []);

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  const openConcierge = useCallback((journeyTitle?: string) => {
    setMenuOpen(false);
    setConciergeJourney(journeyTitle || "");
    setConciergeOpen(true);
  }, []);

  const closeConcierge = useCallback(() => {
    setConciergeOpen(false);
  }, []);

  const navigateTo = useCallback(
    (href: string) => {
      setMenuOpen(false);
      if (href === pathname) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      if (href.startsWith("#")) {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
        return;
      }
      if (reducedMotion) {
        router.push(href);
        return;
      }
      setIsTransitioning(true);
      router.push(href);
      const timer = window.setTimeout(() => {
        setIsTransitioning(false);
      }, 550);
      return () => window.clearTimeout(timer);
    },
    [pathname, reducedMotion, router]
  );

  /* Pure Non-Musical Courtyard Stillness Generator (zero instruments) */
  const toggleAudio = useCallback(() => {
    if (typeof window === "undefined") return;

    if (!audioEnabled) {
      try {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext;
        if (!audioCtxRef.current) {
          const ctx = new AudioCtx();
          const bufferSize = ctx.sampleRate * 4;
          const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
          const output = noiseBuffer.getChannelData(0);
          let lastOut = 0.0;
          for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            output[i] = (lastOut + 0.02 * white) / 1.02;
            lastOut = output[i];
            output[i] *= 1.8;
          }

          const noise = ctx.createBufferSource();
          noise.buffer = noiseBuffer;
          noise.loop = true;

          const filter = ctx.createBiquadFilter();
          filter.type = "lowpass";
          filter.frequency.value = 340;
          filter.Q.value = 0.7;

          const lfo = ctx.createOscillator();
          const lfoGain = ctx.createGain();
          lfo.frequency.value = 0.08;
          lfoGain.gain.value = 110;
          lfo.connect(lfoGain);
          lfoGain.connect(filter.frequency);
          lfo.start();

          const gain = ctx.createGain();
          gain.gain.setValueAtTime(0.0001, ctx.currentTime);

          noise.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);
          noise.start();

          audioCtxRef.current = ctx;
          masterGainRef.current = gain;
        }

        const ctx = audioCtxRef.current;
        const gain = masterGainRef.current;
        if (ctx && gain) {
          if (ctx.state === "suspended") ctx.resume();
          gain.gain.cancelScheduledValues(ctx.currentTime);
          gain.gain.setTargetAtTime(0.11, ctx.currentTime, 0.75);
        }
        setAudioEnabled(true);
      } catch {
        setAudioEnabled(false);
      }
    } else {
      const ctx = audioCtxRef.current;
      const gain = masterGainRef.current;
      if (ctx && gain) {
        gain.gain.cancelScheduledValues(ctx.currentTime);
        gain.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.4);
      }
      setAudioEnabled(false);
    }
  }, [audioEnabled]);

  useEffect(() => {
    const onVisibility = () => {
      if (!audioCtxRef.current || !masterGainRef.current) return;
      const ctx = audioCtxRef.current;
      const gain = masterGainRef.current;
      if (document.hidden && audioEnabled) {
        gain.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.3);
      } else if (!document.hidden && audioEnabled) {
        gain.gain.setTargetAtTime(0.11, ctx.currentTime, 0.6);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [audioEnabled]);

  return (
    <ExperienceContext.Provider
      value={{
        preloaderDone,
        completePreloader,
        menuOpen,
        setMenuOpen,
        toggleMenu,
        conciergeOpen,
        conciergeJourney,
        openConcierge,
        closeConcierge,
        isTransitioning,
        navigateTo,
        atmosphere,
        setAtmosphere,
        activeAct,
        setActiveAct,
        audioEnabled,
        toggleAudio,
        reducedMotion,
      }}
    >
      {children}
    </ExperienceContext.Provider>
  );
}

export function useExperience() {
  const ctx = useContext(ExperienceContext);
  if (!ctx) {
    throw new Error("useExperience must be used inside ExperienceProvider");
  }
  return ctx;
}
