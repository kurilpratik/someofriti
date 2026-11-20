"use client";

import { useEffect, useRef } from "react";

/** Seconds for one full cycle. The motion is periodic in this, so the loop is seamless. */
const LOOP_SECONDS = 22;
/** Cap the backing-store resolution — the surface is soft, so extra pixels buy nothing. */
const MAX_DPR = 1.5;

const VERTEX = `
attribute vec2 a_pos;
varying vec2 v_uv;
void main() {
  v_uv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

/*
 * Draped satin: a height field of a few warped sine folds, lit like cloth.
 * Every time-dependent term is driven by the loop angle `a` (0 → 2π) through
 * sin/cos or whole multiples of `a`, so the last frame meets the first exactly.
 */
const FRAGMENT = `
precision highp float;
varying vec2 v_uv;
uniform vec2 u_res;
uniform float u_phase;

const float TAU = 6.28318530718;

// Long folds running roughly along x, each bent into a slow S-curve.
float folds(vec2 p, float a) {
  float h = 0.0;
  h += 0.60 * sin(p.y * 2.1 + 1.25 * sin(p.x * 0.75 + 0.7 * sin(a)) + a);
  h += 0.32 * sin(p.y * 3.4 - 1.0 * sin(p.x * 1.05 - 0.9 * cos(a)) + 0.45 * p.x - 2.0 * a);
  h += 0.10 * sin(p.y * 6.2 + 1.6 * sin(p.x * 0.6 + a) + 0.8 * cos(a));
  return h;
}

float hash(vec2 p) {
  p = fract(p * vec2(443.897, 441.423));
  p += dot(p, p.yx + 19.19);
  return fract((p.x + p.y) * p.x);
}

void main() {
  float a = u_phase * TAU;
  float aspect = u_res.x / u_res.y;
  vec2 p = (v_uv - 0.5) * vec2(aspect, 1.0) * 3.4;
  p = mat2(0.906, -0.423, 0.423, 0.906) * p; // drape on a gentle diagonal

  // Surface normal from the height field.
  float e = 0.01;
  float h = folds(p, a);
  float hx = folds(p + vec2(e, 0.0), a) - h;
  float hy = folds(p + vec2(0.0, e), a) - h;
  vec3 n = normalize(vec3(-hx / e, -hy / e, 1.5));

  vec3 L = normalize(vec3(-0.45, 0.7, 0.55)); // warm key from the upper left
  vec3 V = vec3(0.0, 0.0, 1.0);
  float diff = max(dot(n, L), 0.0);
  vec3 H = normalize(L + V);
  float ndh = max(dot(n, H), 0.0);
  float spec = pow(ndh, 9.0);    // broad satin lobe
  float glint = pow(ndh, 60.0);  // tight highlight on the ridges

  // Regalium burgundy (#5f1b1e) as the mid-tone, falling to near black.
  vec3 deep  = vec3(0.035, 0.008, 0.011);
  vec3 wine  = vec3(0.373, 0.106, 0.118);
  vec3 glow  = vec3(0.86, 0.44, 0.30); // warm, faintly amber sheen
  vec3 col = mix(deep, wine * 0.8, smoothstep(0.05, 1.0, diff * diff));
  col += wine * spec * 0.75;
  col += glow * glint * 0.45;

  // Keep the centre quiet so the artwork reads, and let the edges fall away.
  vec2 c = v_uv - 0.5;
  col *= 1.0 - 0.3 * exp(-dot(c * vec2(1.0, 1.4), c * vec2(1.0, 1.4)) * 8.0);
  col *= smoothstep(1.1, 0.3, length(c * vec2(1.1, 0.85)));

  // Fine film grain, re-seeded a few times a second.
  float g = hash(gl_FragCoord.xy + floor(u_phase * 240.0) * 17.0) - 0.5;
  col += g * 0.035;

  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

/**
 * Slowly moving burgundy satin, drawn with a small WebGL shader and looped
 * seamlessly. Fills its positioned parent. Pauses off-screen, holds a single
 * still frame under `prefers-reduced-motion`, and falls back to a CSS gradient
 * if WebGL is unavailable.
 */
export default function SilkBackground({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", {
      antialias: false,
      alpha: false,
      powerPreference: "low-power",
    });
    if (!gl) return; // CSS fallback on the canvas stays visible

    const vs = compile(gl, gl.VERTEX_SHADER, VERTEX);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
    const program = gl.createProgram();
    if (!vs || !fs || !program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const aPos = gl.getAttribLocation(program, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "u_res");
    const uPhase = gl.getUniformLocation(program, "u_phase");

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
    };

    const draw = (phase: number) => {
      gl.uniform1f(uPhase, phase);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    let visible = false;
    let elapsed = 0; // seconds of animation shown, so pausing doesn't jump
    let last = 0;

    const frame = (now: number) => {
      if (last) elapsed += Math.min((now - last) / 1000, 0.1);
      last = now;
      draw((elapsed / LOOP_SECONDS) % 1);
      raf = requestAnimationFrame(frame);
    };

    const sync = () => {
      cancelAnimationFrame(raf);
      raf = 0;
      last = 0;
      if (reduceMotion.matches) {
        draw(0.18);
      } else if (visible) {
        raf = requestAnimationFrame(frame);
      }
    };

    resize();
    draw(0);
    canvas.dataset.ready = "true";

    const ro = new ResizeObserver(() => {
      resize();
      if (!raf) draw(reduceMotion.matches ? 0.18 : (elapsed / LOOP_SECONDS) % 1);
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    io.observe(canvas);

    reduceMotion.addEventListener("change", sync);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      reduceMotion.removeEventListener("change", sync);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 size-full bg-[radial-gradient(120%_90%_at_25%_20%,#5f1b1e_0%,#2a0a0d_55%,#0e0304_100%)] ${className}`}
    />
  );
}
