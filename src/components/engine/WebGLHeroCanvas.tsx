"use client";

import { useEffect, useRef, useState } from "react";
import { Renderer, Program, Mesh, Triangle, Texture } from "ogl";
import { useExperience } from "@/context/ExperienceContext";

/* ==========================================================================
   PHASE 3 — FX-GL2: LIVING PHOTOGRAPHY WEBGL SHADER (HERO)
   Renders the authentic Masjid al-Haram dawn photograph as a GPU WebGL
   texture with ultra-subtle dawn light respiration, pointer micro-parallax,
   and scroll-linked atmospheric warmth — zero distortion of sacred architecture.
   ========================================================================== */

const VERTEX = /* glsl */ `
  attribute vec2 uv;
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const FRAGMENT = /* glsl */ `
  precision mediump float;
  uniform sampler2D uTexture;
  uniform vec2 uResolution;
  uniform vec2 uImageRes;
  uniform vec2 uMouse;
  uniform float uTime;
  uniform float uScroll;
  varying vec2 vUv;

  // Aspect-correct cover UVs matching CSS object-fit: cover + object-position: center 68%
  vec2 getCoverUv(vec2 uv, vec2 res, vec2 imgRes) {
    float screenAspect = res.x / max(res.y, 1.0);
    float imgAspect = imgRes.x / max(imgRes.y, 1.0);
    vec2 scale = vec2(1.0);
    if (screenAspect > imgAspect) {
      scale.y = imgAspect / screenAspect;
    } else {
      scale.x = screenAspect / imgAspect;
    }
    vec2 centered = (uv - vec2(0.5, 0.32)) * scale + vec2(0.5, 0.32);
    return centered;
  }

  void main() {
    // Whisper-soft camera breath & subtle pointer parallax (<= 1.2% shift)
    vec2 parallax = (uMouse - 0.5) * 0.018;
    float scrollShift = uScroll * 0.06;

    vec2 uv = getCoverUv(vUv, uResolution, uImageRes);
    uv = (uv - 0.5) * (0.96 - uScroll * 0.04) + 0.5;
    uv += parallax + vec2(0.0, scrollShift);

    // Imperceptible upper-sky atmospheric shimmer (strictly confined to sky region vUv.y > 0.58)
    float skyMask = smoothstep(0.56, 0.96, vUv.y);
    float shimmer = sin(uv.x * 4.5 + uTime * 0.35) * cos(uv.y * 3.0 - uTime * 0.22) * 0.0018 * skyMask;
    vec2 sampleUv = clamp(uv + vec2(shimmer, 0.0), 0.002, 0.998);

    vec4 tex = texture2D(uTexture, sampleUv);

    // Unified warm editorial film grade (matches CSS .editorial-photo)
    vec3 col = tex.rgb;
    float luma = dot(col, vec3(0.299, 0.587, 0.114));
    col = mix(vec3(luma), col, 0.92);
    col = (col - 0.5) * 1.03 + 0.5;

    // Subtle Warm Gold pointer light bloom (#D2A04A)
    float dist = distance(vUv, uMouse);
    float goldHalo = smoothstep(0.55, 0.0, dist) * 0.085;
    vec3 warmGold = vec3(0.824, 0.627, 0.290);
    col = mix(col, col + warmGold * 0.35, goldHalo);

    // Soft scroll departure dimming into Deep Burgundy-Charcoal
    vec3 burgundyTint = vec3(0.12, 0.04, 0.05);
    col = mix(col, burgundyTint, clamp(uScroll * 0.32, 0.0, 0.38));

    gl_FragColor = vec4(col, 1.0);
  }
`;

interface WebGLHeroCanvasProps {
  src: string;
}

export function WebGLHeroCanvas({ src }: WebGLHeroCanvasProps) {
  const { reducedMotion } = useExperience();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || reducedMotion) return;
    if (window.innerWidth < 900) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer: Renderer | null = null;
    try {
      renderer = new Renderer({
        canvas,
        alpha: true,
        antialias: false,
        dpr: Math.min(window.devicePixelRatio, 1.5),
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }

    const gl = renderer.gl;
    const geometry = new Triangle(gl);
    const texture = new Texture(gl, {
      generateMipmaps: false,
      minFilter: gl.LINEAR,
      magFilter: gl.LINEAR,
    });

    const program = new Program(gl, {
      vertex: VERTEX,
      fragment: FRAGMENT,
      uniforms: {
        uTexture: { value: texture },
        uResolution: { value: [window.innerWidth, window.innerHeight] },
        uImageRes: { value: [1800, 1200] },
        uMouse: { value: [0.5, 0.5] },
        uTime: { value: 0 },
        uScroll: { value: 0 },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });

    let disposed = false;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      if (disposed) return;
      texture.image = img;
      program.uniforms.uImageRes.value = [
        img.naturalWidth || 1800,
        img.naturalHeight || 1200,
      ];
      setReady(true);
    };
    img.src = src;

    const resize = () => {
      if (!renderer || !canvas.parentElement) return;
      const w = canvas.parentElement.clientWidth || window.innerWidth;
      const h = canvas.parentElement.clientHeight || window.innerHeight;
      renderer.setSize(w, h);
      program.uniforms.uResolution.value = [w, h];
    };
    resize();

    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    const onMove = (e: PointerEvent) => {
      mouse.tx = e.clientX / Math.max(window.innerWidth, 1);
      mouse.ty = 1.0 - e.clientY / Math.max(window.innerHeight, 1);
    };

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });

    let rafId = 0;
    const start = performance.now();

    const loop = (now: number) => {
      rafId = requestAnimationFrame(loop);
      // Pause GPU work when hero is scrolled completely off screen
      const scrollRatio = Math.min(
        1.2,
        Math.max(0, window.scrollY / Math.max(window.innerHeight, 1))
      );
      if (scrollRatio > 1.15) return;

      program.uniforms.uTime.value = (now - start) * 0.001;
      program.uniforms.uScroll.value = scrollRatio;

      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      program.uniforms.uMouse.value = [mouse.x, mouse.y];

      renderer?.render({ scene: mesh });
    };
    rafId = requestAnimationFrame(loop);

    return () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, [src, reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        opacity: ready ? 1 : 0,
        transition: "opacity 1.1s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    />
  );
}
