"use client";

import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle, Color } from "ogl";
import { useExperience, AtmosphereMode } from "@/context/ExperienceContext";

/* ==========================================================================
   FX-GL1 & FX-GL4 — WARM IVORY & DEEP BURGUNDY WEBGL ATMOSPHERE
   Custom OGL fragment shader rendering sunlit editorial paper/limestone grain
   and smooth chromatic interpolation:
   Warm Ivory (#F3EEE6) -> Warm Sand (#E8E0D4) -> Deep Burgundy (#4A0711) -> Burgundy Ink (#1F1214)
   with restrained Warm Gold (#D2A04A) ambient light.
   ========================================================================== */

const ATMOSPHERE_RGB: Record<AtmosphereMode, [number, number, number]> = {
  ivory: [243 / 255, 238 / 255, 230 / 255], // #F3EEE6 Warm Ivory
  sand: [232 / 255, 224 / 255, 212 / 255], // #E8E0D4 Warm Sand
  burgundy: [74 / 255, 7 / 255, 17 / 255], // #4A0711 Deep Burgundy
  ink: [31 / 255, 18 / 255, 20 / 255], // #1F1214 Deep Burgundy Ink
};

const VERTEX_SHADER = /* glsl */ `
  attribute vec2 uv;
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  precision mediump float;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform vec3 uBaseColor;
  uniform vec3 uGoldColor;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 3; i++) {
      v += a * noise(p);
      p *= 2.02;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    vec2 aspectUv = vec2(uv.x * (uResolution.x / max(uResolution.y, 1.0)), uv.y);

    float t = uTime * 0.055;
    float cloud = fbm(aspectUv * 1.45 + vec2(t, -t * 0.55));

    float dist = distance(uv, uMouse);
    float halo = smoothstep(0.65, 0.0, dist) * 0.04;

    float grain = (hash(gl_FragCoord.xy * 0.5 + fract(uTime * 0.02)) - 0.5) * 0.02;

    vec3 col = uBaseColor;
    col = mix(col, uGoldColor, (cloud - 0.5) * 0.05 + halo);
    col += vec3(grain);

    gl_FragColor = vec4(col, 1.0);
  }
`;

export function WebGLAtmosphere() {
  const { atmosphere, reducedMotion } = useExperience();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const targetColorRef = useRef<[number, number, number]>(ATMOSPHERE_RGB.ivory);

  useEffect(() => {
    targetColorRef.current = ATMOSPHERE_RGB[atmosphere];
  }, [atmosphere]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isMobile = window.innerWidth < 768;
    if (reducedMotion || isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer: Renderer | null = null;
    try {
      renderer = new Renderer({
        canvas,
        alpha: false,
        antialias: false,
        dpr: Math.min(window.devicePixelRatio, 1.5),
        powerPreference: "low-power",
      });
    } catch {
      return;
    }

    const gl = renderer.gl;
    const geometry = new Triangle(gl);

    const currentRgb = [...targetColorRef.current];
    const baseColor = new Color(currentRgb[0], currentRgb[1], currentRgb[2]);
    const goldColor = new Color(210 / 255, 160 / 255, 74 / 255); // #D2A04A Warm Gold

    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };

    const program = new Program(gl, {
      vertex: VERTEX_SHADER,
      fragment: FRAGMENT_SHADER,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: [window.innerWidth, window.innerHeight] },
        uMouse: { value: [0.5, 0.5] },
        uBaseColor: { value: baseColor },
        uGoldColor: { value: goldColor },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });

    const resize = () => {
      if (!renderer) return;
      renderer.setSize(window.innerWidth, window.innerHeight);
      program.uniforms.uResolution.value = [
        window.innerWidth,
        window.innerHeight,
      ];
    };
    resize();

    const onPointerMove = (e: PointerEvent) => {
      mouse.tx = e.clientX / Math.max(window.innerWidth, 1);
      mouse.ty = 1.0 - e.clientY / Math.max(window.innerHeight, 1);
    };

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    let rafId = 0;
    const start = performance.now();

    const loop = (now: number) => {
      rafId = requestAnimationFrame(loop);
      const elapsed = (now - start) * 0.001;
      program.uniforms.uTime.value = elapsed;

      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;
      program.uniforms.uMouse.value = [mouse.x, mouse.y];

      const target = targetColorRef.current;
      currentRgb[0] += (target[0] - currentRgb[0]) * 0.045;
      currentRgb[1] += (target[1] - currentRgb[1]) * 0.045;
      currentRgb[2] += (target[2] - currentRgb[2]) * 0.045;
      baseColor.set(currentRgb[0], currentRgb[1], currentRgb[2]);

      renderer?.render({ scene: mesh });
    };

    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, [reducedMotion]);

  const fallbackBg =
    atmosphere === "burgundy"
      ? "var(--color-burgundy)"
      : atmosphere === "ink"
        ? "var(--color-ink)"
        : atmosphere === "sand"
          ? "var(--color-sand)"
          : "var(--color-ivory)";

  return (
    <div
      aria-hidden="true"
      className="no-print"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
        backgroundColor: fallbackBg,
        transition: "background-color 0.9s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
        }}
      />
    </div>
  );
}
