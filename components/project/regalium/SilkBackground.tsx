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

float folds(vec2 p, float a) {
  // Domain warp gives the folds their slow, liquid drift.
  vec2 q = p + 0.32 * vec2(
    sin(p.y * 1.35 + 1.4 * sin(a)),
    cos(p.x * 1.15 + 1.4 * cos(a))
  );
  float h = 0.0;
  h += 0.55 * sin(q.x * 1.25 + q.y * 2.05 + 0.8 * sin(q.y * 1.1 + a) + a);
  h += 0.30 * sin(-q.x * 2.1 + q.y * 1.05 + 1.1 * sin(q.x * 1.6 + 2.0 * cos(a)) - a);
  h += 0.15 * sin(q.x * 3.3 - q.y * 2.6 + 2.0 * a + 0.6 * cos(q.y * 2.0));
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
  vec2 p = (v_uv - 0.5) * vec2(aspect, 1.0) * 2.4;
  p = mat2(0.866, -0.5, 0.5, 0.866) * p; // drape on a diagonal

  // Surface normal from the height field.
  float e = 0.012;
  float h = folds(p, a);
  float hx = folds(p + vec2(e, 0.0), a) - h;
  float hy = folds(p + vec2(0.0, e), a) - h;
  vec3 n = normalize(vec3(-hx / e, -hy / e, 2.6));

  vec3 L = normalize(vec3(-0.55, 0.65, 0.75)); // warm key from the upper left
  vec3 V = vec3(0.0, 0.0, 1.0);
  float diff = max(dot(n, L), 0.0);
  float spec = pow(max(dot(reflect(-L, n), V), 0.0), 22.0);
  float sheen = pow(1.0 - max(dot(n, V), 0.0), 2.2); // satin rim on the fold edges

  // Regalium burgundy (#5f1b1e) as the mid-tone, falling to near black.
  vec3 deep  = vec3(0.055, 0.012, 0.016);
  vec3 wine  = vec3(0.373, 0.106, 0.118);
  vec3 glow  = vec3(0.74, 0.30, 0.25);
  vec3 col = mix(deep, wine, smoothstep(0.15, 0.95, diff));
  col += glow * spec * 0.55;
  col += wine * sheen * 0.9;

  // Keep the centre quiet so the artwork reads, and let the edges fall away.
  vec2 c = v_uv - 0.5;
  col *= 1.0 - 0.28 * exp(-dot(c, c) * 9.0);
  col *= smoothstep(1.05, 0.25, length(c * vec2(1.1, 0.9)));

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
