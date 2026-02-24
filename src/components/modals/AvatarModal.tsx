import { useState, useEffect, useRef } from "react";
import { COLORS, DEFAULT_CONFIG, FEATURE_COLORS, LABELS, OPTIONS, HEAD_COLORS, type AvatarConfig } from "../../lib/data";
import { copySvgToClipboard, downloadAsPng } from "../../lib/utils";
import AvatarSvg from "../AvatarSVG";
import OptionButton from "../OptionButton";
import ColorSwatch from "../ColorSwatch";


interface AvatarModalProps {
  open: boolean;
  onClose: () => void;
}

// Which feature is currently targeted by the color picker
type ColorTarget = "body" | "eye" | "nose" | "mouth" | "head";

const COLOR_TARGET_LABELS: Record<ColorTarget, string> = {
  body:  "Body color",
  eye:   "Eye color",
  nose:  "Nose color",
  mouth: "Mouth color",
  head:  "Head color",
};

export default function AvatarModal({ open, onClose }: AvatarModalProps) {
  const [cfg, setCfg] = useState<AvatarConfig>({ ...DEFAULT_CONFIG });
  const [colorTarget, setColorTarget] = useState<ColorTarget>("body");
  const [copied, setCopied] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  // Reset when modal opens
  useEffect(() => {
    if (open) {
      setCfg({ ...DEFAULT_CONFIG });
      setColorTarget("body");
    }
  }, [open]);

  const setOption = <K extends keyof AvatarConfig>(key: K, value: AvatarConfig[K]) => {
    setCfg((prev) => ({ ...prev, [key]: value }));
  };

  // Derive which color palette and setter to use based on active target
  const activeColorPalette = colorTarget === "body" ? COLORS : colorTarget === "head" ? HEAD_COLORS : FEATURE_COLORS;
  const activeColorKey = `${colorTarget}Color` as "bodyColor" | "eyeColor" | "noseColor" | "mouthColor" | "headColor";
  const activeColor = cfg[activeColorKey];

  const handleColorSelect = (color: string) => {
    setOption(activeColorKey, color);
  };

  const handleCopy = async () => {
    const svgEl = previewRef.current?.querySelector("svg");
    if (!svgEl) return;
    await copySvgToClipboard(svgEl as SVGSVGElement);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const svgEl = previewRef.current?.querySelector("svg");
    if (!svgEl) return;
    downloadAsPng(svgEl as SVGSVGElement);
  };

  if (!open) return null;

  const controlGroups = Object.entries(OPTIONS) as [keyof typeof OPTIONS, string[]][];

  // Tabs for which feature the color picker targets
  const colorTabs: ColorTarget[] = ["body", "head", "eye", "nose", "mouth"];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(12px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="relative w-full max-w-2xl rounded-3xl border border-[#1e1e2e] p-8 overflow-y-auto"
        style={{ background: "#14141f", maxHeight: "90vh" }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-lg bg-[#1e1e2e] text-[#6b6b80] hover:bg-[#c8ff57] hover:text-[#0a0a0f] transition-all flex items-center justify-center text-base cursor-pointer"
          aria-label="Close modal"
        >
          ✕
        </button>

        <h2 className="text-2xl font-extrabold tracking-tight mb-1">Build your avatar</h2>
        <p className="text-sm text-[#6b6b80] mb-7">Mix and match to craft your character.</p>

        <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-8 items-start">
          {/* Live preview — bg passed as prop so SVG itself stays clean */}
          <div
            ref={previewRef}
            className="flex items-center justify-center aspect-square rounded-2xl border border-[#1e1e2e] bg-[#0a0a0f]"
          >
            <AvatarSvg cfg={cfg} size={150} previewBg="#0a0a0f" />
          </div>

          {/* Controls */}
          <div className="flex flex-col gap-5">
            {/* Trait selectors */}
            {controlGroups.map(([key, values]) => (
              <div key={key}>
                <label className="block text-[10px] font-semibold tracking-widest uppercase text-[#6b6b80] mb-2.5">
                  {key === "eye" ? "Eyes" : key === "limb" ? "Limbs" : key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
                <div className="flex flex-wrap gap-2">
                  {values.map((val) => (
                    <OptionButton
                      key={val}
                      label={LABELS[key][val]}
                      active={cfg[key] === val}
                      onClick={() => setOption(key, val as AvatarConfig[typeof key])}
                    />
                  ))}
                </div>
              </div>
            ))}

            {/* Color picker with feature tabs */}
            <div>
              <label className="block text-[10px] font-semibold tracking-widest uppercase text-[#6b6b80] mb-2.5">
                Colors
              </label>

              {/* Target tabs */}
              <div className="flex gap-1.5 mb-3 flex-wrap">
                {colorTabs.map((tab) => {
                  const colorKey = `${tab}Color` as typeof activeColorKey;
                  const currentColor = cfg[colorKey];
                  const isActive = colorTarget === tab;
                  return (
                    <button
                      key={tab}
                      onClick={() => setColorTarget(tab)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono border transition-all duration-150 cursor-pointer ${
                        isActive
                          ? "border-[#c8ff57] text-[#c8ff57] bg-[#c8ff57]/10"
                          : "border-[#1e1e2e] text-[#6b6b80] bg-[#111118] hover:border-[#7b6cff] hover:text-white"
                      }`}
                    >
                      {/* Mini swatch showing current color for that feature */}
                      <span
                        className="w-2.5 h-2.5 rounded-full border border-white/10 flex-shrink-0"
                        style={{ background: currentColor }}
                      />
                      {COLOR_TARGET_LABELS[tab]}
                    </button>
                  );
                })}
              </div>

              {/* Swatches for active target */}
              <div className="flex flex-wrap gap-2.5">
                {activeColorPalette.map((c) => (
                  <ColorSwatch
                    key={c}
                    color={c}
                    active={activeColor === c}
                    onClick={() => handleColorSelect(c)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 mt-7 pt-6 border-t border-[#1e1e2e]">
          <button
            onClick={handleCopy}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-[#1e1e2e] text-sm font-bold text-white hover:border-[#7b6cff] hover:bg-[#7b6cff]/10 transition-all cursor-pointer"
          >
            <CopyIcon />
            {copied ? "Copied!" : "Copy SVG"}
          </button>
          <button
            onClick={handleDownload}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold text-[#0a0a0f] hover:opacity-85 hover:-translate-y-0.5 transition-all cursor-pointer"
            style={{ background: "#c8ff57" }}
          >
            <DownloadIcon />
            Download PNG
          </button>
        </div>
      </div>
    </div>
  );
}

function CopyIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}