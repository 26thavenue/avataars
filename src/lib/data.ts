import type {
  AvatarConfig,
  HeadShape,
  EyeStyle,
  NoseStyle,
  MouthStyle,
  BodyStyle,
  LimbStyle,
} from "./avatar"

export const DEFAULT_CONFIG: AvatarConfig = {
  shape: "circle",
  eye: "dot",
  nose: "dot",
  mouth: "smile",
  body: "rect",
  limb: "rounded",
  color: "#7b6cff",
};

export const COLORS: string[] = [
  "#7b6cff",
  "#ff6b6b",
  "#c8ff57",
  "#00cec9",
  "#fd79a8",
  "#ffeaa7",
  "#f97316",
  "#06b6d4",
];

export const OPTIONS: {
  shape: HeadShape[];
  eye: EyeStyle[];
  nose: NoseStyle[];
  mouth: MouthStyle[];
  body: BodyStyle[];
  limb: LimbStyle[];
} = {
  shape: ["circle", "square", "hex"],
  eye: ["dot", "star", "x", "sleepy"],
  nose: ["dot", "bump", "none"],
  mouth: ["smile", "flat", "smirk"],
  body: ["rect", "triangle", "round"],
  limb: ["stick", "rounded", "none"],
};

export const LABELS: Record<string, Record<string, string>> = {
  shape: { circle: "Circle", square: "Square", hex: "Hex" },
  eye: { dot: "Dot", star: "Star", x: "× Cross", sleepy: "Sleepy" },
  nose: { dot: "Dot", bump: "Bump", none: "None" },
  mouth: { smile: "Smile", flat: "Flat", smirk: "Smirk" },
  body: { rect: "Block", triangle: "Triangle", round: "Round" },
  limb: { stick: "Stick", rounded: "Rounded", none: "None" },
};

export const SAMPLE_CONFIGS: AvatarConfig[] = [
  { shape: "circle", eye: "dot",    nose: "dot",  mouth: "smile", body: "rect",     limb: "rounded", color: "#7b6cff" },
  { shape: "square", eye: "star",   nose: "none", mouth: "flat",  body: "rect",     limb: "stick",   color: "#ff6b6b" },
  { shape: "circle", eye: "sleepy", nose: "bump", mouth: "smile", body: "round",    limb: "none",    color: "#00cec9" },
  { shape: "hex",    eye: "x",      nose: "none", mouth: "smirk", body: "triangle", limb: "stick",   color: "#fd79a8" },
  { shape: "square", eye: "dot",    nose: "dot",  mouth: "smile", body: "round",    limb: "rounded", color: "#c8ff57" },
];

export const HOW_TO_STEPS = [
  {
    num: "01",
    icon: "◉",
    title: "Pick your shape",
    desc: "Choose your avatar's head shape — circle, square, hexagon, and more. This sets the whole vibe of your character.",
    accentFrom: "#7b6cff",
    accentTo: "#c8ff57",
  },
  {
    num: "02",
    icon: "◟◞",
    title: "Choose face features",
    desc: "Mix dot, star, sleepy or cross eyes. Add a dot or bump nose — or skip it. Set your expression: smile, flat, or a cheeky smirk.",
    accentFrom: "#c8ff57",
    accentTo: "#00cec9",
  },
  {
    num: "03",
    icon: "⟁",
    title: "Style body & limbs",
    desc: "Pick a body — blocky, triangular or round. Add stick arms and legs, chunky rounded limbs, or go limbless for a minimal look.",
    accentFrom: "#ff6b6b",
    accentTo: "#fd79a8",
  },
  {
    num: "04",
    icon: "⬡",
    title: "Color & export",
    desc: "Choose from 8 hand-picked colors. Hit Copy SVG to paste anywhere, or Download PNG to save a crisp 400×400 image instantly.",
    accentFrom: "#fd79a8",
    accentTo: "#7b6cff",
  },
];