import type {
  AvatarConfig,
  HeadShape,
  EyeStyle,
  MouthStyle,
  LimbStyle,
} from "./avatar";

// re-export so consumers only need one import
export type { AvatarConfig };

export const DEFAULT_CONFIG: AvatarConfig = {
  shape:      "circle",
  eye:        "dot",
  mouth:      "smile",
  hand:       "rounded",
  leg:        "rounded",
  limbColor:  "#7b6cff",
  eyeColor:   "#0D0D14",
  mouthColor: "#0D0D14",
  headColor:  "#FFD6A5",
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

export const HEAD_COLORS: string[] = [
  "#FFD6A5",
  ...COLORS,
];

// Colors available for face features (eyes / mouth)
export const FEATURE_COLORS: string[] = [
  "#0D0D14",
  "#7b6cff",
  "#ff6b6b",
  "#c8ff57",
  "#00cec9",
  "#fd79a8",
  "#f97316",
  "#ffffff",
];

export const OPTIONS: {
  shape: HeadShape[];
  eye:   EyeStyle[];
  mouth: MouthStyle[];
  hand:  LimbStyle[];
  leg:   LimbStyle[];
} = {
  shape: ["circle", "square", "hex", "roundSquare", "bigRoundSquare", "toast"],
  eye:   ["dot", "star", "x", "sleepy", "plus", "roundedStar", "dash", "asterisk", "dollars", "arrowUp", "arrowDown", "chevron"],
  mouth: ["smile", "flat", "smirk", "none", "arrowUp", "arrowDown"],
  hand:  ["stick", "rounded", "none"],
  leg:   ["stick", "rounded", "none"],
};

export const LABELS: Record<string, Record<string, string>> = {
  shape: {
    circle: "Circle",
    square: "Square",
    hex: "Hex",
    roundSquare: "Round Square",
    bigRoundSquare: "Big Round Square",
    toast: "Toast",
  },
  eye: {
    dot: "Dot",
    star: "Star",
    x: "× Cross",
    sleepy: "Sleepy",
    plus: "+ Plus",
    roundedStar: "Rounded Star",
    dash: "Dash",
    asterisk: "Asterisk",
    dollars: "$ Dollar",
    arrowUp: "Arrow Up",
    arrowDown: "Arrow Down",
    chevron: "Chevron",
  },
  mouth: { smile: "Smile", flat: "Flat", smirk: "Smirk", none: "None", arrowUp: "Chevron Up", arrowDown: "Chevron Down" },
  hand:  { stick: "Stick", rounded: "Rounded", none: "None" },
  leg:   { stick: "Stick", rounded: "Rounded", none: "None" },
};



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
    desc: "Mix dot, star, sleepy or cross eyes. Set your expression: smile, flat, or a cheeky smirk.",
    accentFrom: "#c8ff57",
    accentTo: "#00cec9",
  },
  {
    num: "03",
    icon: "⟁",
    title: "Style hands & legs",
    desc: "Choose hand and leg style independently. Use stick for a light look, rounded for bold shapes, or none for minimalist avatars.",
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
