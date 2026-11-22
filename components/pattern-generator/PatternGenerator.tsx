"use client";

import { type ReactNode, useCallback, useEffect, useRef, useState } from "react";

import { RangeSlider } from "@/components/ui/be-ui-range-slider";

import PatternCanvas from "./PatternCanvas";
import {
  applyPalette,
  DEFAULT_SETTINGS,
  PALETTES,
  type PatternSettings,
  SQUARE_PATTERNS,
} from "./settings";

const STORAGE_KEY = "pattern-generator:settings";

const ASPECTS = [
  { value: "fill", label: "Fill" },
  { value: "1:1", label: "1:1" },
  { value: "4:5", label: "4:5" },
  { value: "9:16", label: "9:16" },
  { value: "16:9", label: "16:9" },
] as const;
type Aspect = (typeof ASPECTS)[number]["value"];

type Section = "squares" | "dots" | "burst" | "text";

/* ---------- small controls ---------- */

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  format = (v) => String(v),
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  format?: (v: number) => string;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline justify-between text-xs">
        <span className="text-foreground/70">{label}</span>
        <span className="text-foreground tabular-nums">{format(value)}</span>
      </div>
      <RangeSlider
        value={value}
        min={min}
        max={max}
        step={step}
        showTicks={false}
        onValueChange={onChange}
        aria-label={label}
        className="h-7"
      />
    </div>
  );
}

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  // While typing, the hex field shows the draft; otherwise the live value.
  const [draft, setDraft] = useState<string | null>(null);

  return (
    <label className="flex items-center justify-between gap-3 text-xs">
      <span className="text-foreground/70">{label}</span>
      <span className="bg-muted flex items-center gap-2 rounded-md py-1 pr-2 pl-1">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="size-6 cursor-pointer rounded border-0 bg-transparent p-0"
          aria-label={`${label} colour`}
        />
        <input
          value={draft ?? value}
          onChange={(e) => {
            setDraft(e.target.value);
            if (/^#[0-9a-f]{6}$/i.test(e.target.value)) onChange(e.target.value);
          }}
          onBlur={() => setDraft(null)}
          spellCheck={false}
          className="w-16 bg-transparent font-mono uppercase outline-none"
          aria-label={`${label} hex`}
        />
      </span>
    </label>
  );
}

function Segmented<T extends string>({
  options,
  value,
  onChange,
  label,
}: {
  options: readonly { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  label: string;
}) {
  return (
    <div role="radiogroup" aria-label={label} className="bg-muted flex flex-wrap gap-1 rounded-lg p-1">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={o.value === value}
          onClick={() => onChange(o.value)}
          className={`flex-1 rounded-md px-2 py-1.5 text-xs transition-colors ${
            o.value === value ? "bg-foreground text-background" : "text-foreground/70 hover:text-foreground"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function Panel({
  title,
  enabled,
  onToggle,
  children,
}: {
  title: string;
  enabled?: boolean;
  onToggle?: (v: boolean) => void;
  children: ReactNode;
}) {
  return (
    <section className="space-y-4 border-t border-white/10 px-5 py-5">
      <div className="flex items-center justify-between">
        <h2 className="text-foreground/50 text-[11px] tracking-[0.14em] uppercase">{title}</h2>
        {onToggle && (
          <button
            type="button"
            role="switch"
            aria-checked={enabled}
            aria-label={`Show ${title.toLowerCase()}`}
            onClick={() => onToggle(!enabled)}
            className={`relative h-5 w-9 rounded-full transition-colors ${enabled ? "bg-brand-primary" : "bg-muted"}`}
          >
            <span
              className={`bg-foreground absolute top-0.5 left-0.5 size-4 rounded-full transition-transform ${
                enabled ? "translate-x-4" : ""
              }`}
            />
          </button>
        )}
      </div>
      {(enabled ?? true) && <div className="space-y-4">{children}</div>}
    </section>
  );
}

function Button({
  children,
  onClick,
  primary,
  disabled,
}: {
  children: ReactNode;
  onClick: () => void;
  primary?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`flex-1 rounded-lg px-3 py-2 text-xs transition-colors disabled:opacity-50 ${
        primary
          ? "bg-brand-primary hover:bg-brand-primary-dark text-white"
          : "bg-muted text-foreground hover:bg-white/10"
      }`}
    >
      {children}
    </button>
  );
}

/* ---------- helpers ---------- */

const pct = (v: number) => `${Math.round(v * 100)}%`;
const times = (v: number) => `${v.toFixed(2)}×`;

function randomise(s: PatternSettings): PatternSettings {
  const r = Math.random;
  const pick = <T,>(a: readonly T[]) => a[Math.floor(r() * a.length)];
  const next = applyPalette(s, pick(PALETTES));
  return {
    ...next,
    seed: Math.floor(r() * 10000),
    squares: {
      ...next.squares,
      columns: 8 + Math.floor(r() * 40),
      pattern: pick(SQUARE_PATTERNS).value,
      frequency: Math.round((0.5 + r() * 4) * 10) / 10,
      density: Math.round((0.25 + r() * 0.4) * 100) / 100,
      softness: r() < 0.6 ? 0 : Math.round(r() * 100) / 100,
      accentRatio: r() < 0.5 ? 0 : Math.round(r() * 30) / 100,
    },
    dots: {
      ...next.dots,
      columns: 3 + Math.floor(r() * 10),
      size: Math.round((0.2 + r() * 0.5) * 100) / 100,
    },
    burst: {
      ...next.burst,
      points: 8 + Math.floor(r() * 30),
      depth: Math.round((0.08 + r() * 0.3) * 100) / 100,
      spin: Math.round((r() - 0.5) * 100) / 100,
    },
  };
}

function download(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function pickVideoType(): string | undefined {
  const types = ["video/webm;codecs=vp9", "video/webm;codecs=vp8", "video/webm", "video/mp4"];
  return types.find((t) => typeof MediaRecorder !== "undefined" && MediaRecorder.isTypeSupported(t));
}

/* ---------- tool ---------- */

/**
 * Full-page tool for designing the generative square/dot/starburst pattern
 * used by the Preloader. Settings persist in this browser, and can be copied
 * as JSON to hard-code a preset.
 */
export default function PatternGenerator() {
  const [settings, setSettings] = useState<PatternSettings>(DEFAULT_SETTINGS);
  const [loaded, setLoaded] = useState(false);
  const [paused, setPaused] = useState(false);
  const [aspect, setAspect] = useState<Aspect>("fill");
  const [panelOpen, setPanelOpen] = useState(true);
  const [recordSeconds, setRecordSeconds] = useState(5);
  const [recording, setRecording] = useState(false);
  const [notice, setNotice] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Restore the last session's settings (merged over defaults so new
  // fields added later still get values).
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const p = JSON.parse(saved) as Partial<PatternSettings>;
        // Restored after hydration on purpose: the server can't read localStorage.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSettings({
          ...DEFAULT_SETTINGS,
          ...p,
          squares: { ...DEFAULT_SETTINGS.squares, ...p.squares },
          dots: { ...DEFAULT_SETTINGS.dots, ...p.dots },
          burst: { ...DEFAULT_SETTINGS.burst, ...p.burst },
          text: { ...DEFAULT_SETTINGS.text, ...p.text },
        });
      }
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {}
  }, [settings, loaded]);

  useEffect(() => {
    if (!notice) return;
    const id = setTimeout(() => setNotice(""), 2200);
    return () => clearTimeout(id);
  }, [notice]);

  const set = useCallback(
    <K extends Section, F extends keyof PatternSettings[K]>(section: K, key: F, value: PatternSettings[K][F]) =>
      setSettings((s) => ({ ...s, [section]: { ...s[section], [key]: value } })),
    [],
  );

  // Space toggles play/pause, H hides the panel (unless typing in a field).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement;
      if (el.closest("input, textarea, [role=slider], button")) return;
      if (e.code === "Space") {
        e.preventDefault();
        setPaused((p) => !p);
      } else if (e.key === "h" || e.key === "H") {
        setPanelOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const savePng = () => {
    canvasRef.current?.toBlob((b) => b && download(b, `pattern-${Date.now()}.png`), "image/png");
  };

  const record = () => {
    const canvas = canvasRef.current;
    const type = pickVideoType();
    if (!canvas || !type) {
      setNotice("Recording isn't supported in this browser");
      return;
    }
    const stream = canvas.captureStream(60);
    const recorder = new MediaRecorder(stream, { mimeType: type, videoBitsPerSecond: 16_000_000 });
    const chunks: Blob[] = [];
    recorder.ondataavailable = (e) => e.data.size && chunks.push(e.data);
    recorder.onstop = () => {
      stream.getTracks().forEach((t) => t.stop());
      download(new Blob(chunks, { type }), `pattern-${Date.now()}.${type.includes("mp4") ? "mp4" : "webm"}`);
      setRecording(false);
    };
    setPaused(false);
    setRecording(true);
    recorder.start();
    setTimeout(() => recorder.stop(), recordSeconds * 1000);
  };

  const copySettings = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(settings, null, 2));
      setNotice("Settings copied as JSON");
    } catch {
      setNotice("Couldn't access the clipboard");
    }
  };

  const ratio = aspect === "fill" ? null : aspect.split(":").map(Number);
  const { squares, dots, burst, text } = settings;

  return (
    <main className="bg-background text-foreground font-degular fixed inset-0 flex overflow-hidden">
      {/* Stage */}
      <div
        className={`relative min-w-0 flex-1 ${ratio ? "flex items-center justify-center p-6 sm:p-10" : ""}`}
        style={{ containerType: "size" }}
      >
        <div
          className={ratio ? "relative shadow-2xl" : "absolute inset-0"}
          style={
            ratio
              ? {
                  aspectRatio: `${ratio[0]} / ${ratio[1]}`,
                  width: `min(100cqw - 3rem, (100cqh - 3rem) * ${ratio[0] / ratio[1]})`,
                }
              : undefined
          }
        >
          <PatternCanvas ref={canvasRef} settings={settings} paused={paused} />
        </div>

        {!panelOpen && (
          <button
            type="button"
            onClick={() => setPanelOpen(true)}
            className="bg-background/80 absolute top-4 right-4 rounded-lg px-3 py-2 text-xs backdrop-blur hover:bg-black"
          >
            Show controls
          </button>
        )}

        {notice && (
          <p
            role="status"
            className="bg-background/90 absolute bottom-4 left-1/2 -translate-x-1/2 rounded-lg px-4 py-2 text-xs"
          >
            {notice}
          </p>
        )}
      </div>

      {/* Controls */}
      {panelOpen && (
        <aside
          aria-label="Pattern controls"
          className="bg-background absolute inset-y-0 right-0 z-10 w-[min(20rem,100%)] overflow-y-auto border-l border-white/10 sm:static"
        >
          <header className="space-y-4 px-5 pt-5 pb-5">
            <div className="flex items-center justify-between">
              <h1 className="font-ivy-ora text-2xl font-light italic">Pattern generator</h1>
              <button
                type="button"
                onClick={() => setPanelOpen(false)}
                className="text-foreground/50 hover:text-foreground text-xs"
                title="Hide controls (H)"
              >
                Hide
              </button>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => setPaused((p) => !p)}>{paused ? "Play" : "Pause"}</Button>
              <Button onClick={() => setSettings(randomise)}>Randomise</Button>
              <Button onClick={() => setSettings(DEFAULT_SETTINGS)}>Reset</Button>
            </div>
          </header>

          <Panel title="Motion">
            <Slider
              label="Speed"
              value={settings.speed}
              min={0}
              max={3}
              step={0.05}
              format={times}
              onChange={(v) => setSettings((s) => ({ ...s, speed: v }))}
            />
            <Slider
              label="Seed"
              value={settings.seed}
              min={0}
              max={9999}
              step={1}
              onChange={(v) => setSettings((s) => ({ ...s, seed: v }))}
            />
            <div className="space-y-1.5">
              <span className="text-foreground/70 text-xs">Frame</span>
              <Segmented label="Frame" options={ASPECTS} value={aspect} onChange={setAspect} />
            </div>
          </Panel>

          <Panel title="Colours">
            <div className="grid grid-cols-6 gap-2">
              {PALETTES.map((p) => (
                <button
                  key={p.name}
                  type="button"
                  title={p.name}
                  aria-label={`${p.name} palette`}
                  onClick={() => setSettings((s) => applyPalette(s, p))}
                  className="grid aspect-square grid-cols-2 overflow-hidden rounded-md ring-1 ring-white/15 transition-transform hover:scale-105"
                >
                  {[p.background, p.squares, p.dots, p.burst].map((c, i) => (
                    <span key={i} style={{ background: c }} />
                  ))}
                </button>
              ))}
            </div>
            <ColorField
              label="Background"
              value={settings.background}
              onChange={(v) => setSettings((s) => ({ ...s, background: v }))}
            />
            <ColorField label="Squares" value={squares.color} onChange={(v) => set("squares", "color", v)} />
            <ColorField label="Square accent" value={squares.accent} onChange={(v) => set("squares", "accent", v)} />
            <ColorField label="Dots" value={dots.color} onChange={(v) => set("dots", "color", v)} />
            <ColorField label="Starburst" value={burst.color} onChange={(v) => set("burst", "color", v)} />
            <ColorField label="Text" value={text.color} onChange={(v) => set("text", "color", v)} />
          </Panel>

          <Panel title="Squares" enabled={squares.enabled} onToggle={(v) => set("squares", "enabled", v)}>
            <Segmented
              label="Square pattern"
              options={SQUARE_PATTERNS}
              value={squares.pattern}
              onChange={(v) => set("squares", "pattern", v)}
            />
            <Slider
              label="Squares across"
              value={squares.columns}
              min={2}
              max={96}
              step={1}
              onChange={(v) => set("squares", "columns", v)}
            />
            <Slider
              label="Density"
              value={squares.density}
              min={0}
              max={1}
              step={0.01}
              format={pct}
              onChange={(v) => set("squares", "density", v)}
            />
            <Slider
              label="Frequency"
              value={squares.frequency}
              min={0.1}
              max={8}
              step={0.1}
              onChange={(v) => set("squares", "frequency", v)}
            />
            <Slider
              label="Gap"
              value={squares.gap}
              min={0}
              max={0.8}
              step={0.01}
              format={pct}
              onChange={(v) => set("squares", "gap", v)}
            />
            <Slider
              label="Softness"
              value={squares.softness}
              min={0}
              max={1}
              step={0.01}
              format={pct}
              onChange={(v) => set("squares", "softness", v)}
            />
            <Slider
              label="Accent squares"
              value={squares.accentRatio}
              min={0}
              max={1}
              step={0.01}
              format={pct}
              onChange={(v) => set("squares", "accentRatio", v)}
            />
          </Panel>

          <Panel title="Dots" enabled={dots.enabled} onToggle={(v) => set("dots", "enabled", v)}>
            <Slider
              label="Dots across"
              value={dots.columns}
              min={1}
              max={40}
              step={1}
              onChange={(v) => set("dots", "columns", v)}
            />
            <Slider
              label="Size"
              value={dots.size}
              min={0.05}
              max={1}
              step={0.01}
              format={pct}
              onChange={(v) => set("dots", "size", v)}
            />
            <Slider
              label="Pulse"
              value={dots.pulse}
              min={0}
              max={1}
              step={0.01}
              format={pct}
              onChange={(v) => set("dots", "pulse", v)}
            />
          </Panel>

          <Panel title="Starburst" enabled={burst.enabled} onToggle={(v) => set("burst", "enabled", v)}>
            <Slider
              label="Points"
              value={burst.points}
              min={3}
              max={60}
              step={1}
              onChange={(v) => set("burst", "points", v)}
            />
            <Slider
              label="Spike depth"
              value={burst.depth}
              min={0}
              max={0.9}
              step={0.01}
              format={pct}
              onChange={(v) => set("burst", "depth", v)}
            />
            <Slider
              label="Size"
              value={burst.size}
              min={0.05}
              max={1.5}
              step={0.01}
              format={pct}
              onChange={(v) => set("burst", "size", v)}
            />
            <Slider
              label="Spin"
              value={burst.spin}
              min={-2}
              max={2}
              step={0.01}
              format={times}
              onChange={(v) => set("burst", "spin", v)}
            />
            <Slider
              label="Pulse"
              value={burst.pulse}
              min={0}
              max={0.4}
              step={0.01}
              format={pct}
              onChange={(v) => set("burst", "pulse", v)}
            />
          </Panel>

          <Panel title="Text" enabled={text.enabled} onToggle={(v) => set("text", "enabled", v)}>
            <input
              value={text.value}
              onChange={(e) => set("text", "value", e.target.value)}
              aria-label="Text"
              className="bg-muted w-full rounded-lg px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-white/30"
            />
            <Segmented
              label="Font"
              options={[
                { value: "ivy", label: "Ivy Ora" },
                { value: "degular", label: "Degular" },
              ]}
              value={text.font}
              onChange={(v) => set("text", "font", v)}
            />
            <Segmented
              label="Style"
              options={[
                { value: "italic", label: "Italic" },
                { value: "upright", label: "Upright" },
              ]}
              value={text.italic ? "italic" : "upright"}
              onChange={(v) => set("text", "italic", v === "italic")}
            />
            <Slider
              label="Size"
              value={text.size}
              min={0.03}
              max={0.5}
              step={0.005}
              format={pct}
              onChange={(v) => set("text", "size", v)}
            />
            <Slider
              label="Wave"
              value={text.wave}
              min={0}
              max={1}
              step={0.01}
              format={pct}
              onChange={(v) => set("text", "wave", v)}
            />
          </Panel>

          <Panel title="Export">
            <Slider
              label="Recording length"
              value={recordSeconds}
              min={1}
              max={20}
              step={1}
              format={(v) => `${v}s`}
              onChange={setRecordSeconds}
            />
            <div className="flex gap-2">
              <Button primary onClick={record} disabled={recording}>
                {recording ? "Recording…" : "Record video"}
              </Button>
              <Button onClick={savePng}>Save PNG</Button>
            </div>
            <Button onClick={copySettings}>Copy settings (JSON)</Button>
            <p className="text-foreground/40 text-[11px] leading-relaxed">
              Space pauses, H hides this panel. Video records the canvas at its current size; pick a frame above for a
              fixed ratio.
            </p>
          </Panel>
        </aside>
      )}
    </main>
  );
}
