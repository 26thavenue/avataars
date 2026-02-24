export type HeadShape  = "circle" | "square" | "hex" | "roundSquare" | "star" | "parallelogram" | "triangle" | "cloud";
export type EyeStyle   = "dot" | "star" | "x" | "sleepy" | "plus" | "roundedStar" | "dash" | "asterisk" | "dollars" | "arrowUp" | "arrowDown" | "chevron";
export type NoseStyle  = "dot" | "bump" | "dash" | "tri" | "none";
export type MouthStyle = "smile" | "flat" | "smirk" | "none" | "arrowUp" | "arrowDown";
export type BodyStyle  = "rect" | "triangle" | "round" | "none";
export type LimbStyle  = "stick" | "rounded" | "none";

export interface AvatarConfig {
  shape: HeadShape;
  eye:   EyeStyle;
  nose:  NoseStyle;
  mouth: MouthStyle;
  body:  BodyStyle;
  limb:  LimbStyle;
  // per-feature colors
  bodyColor:  string;
  eyeColor:   string;
  noseColor:  string;
  mouthColor: string;
  headColor:  string;
}