export type HeadShape  = "circle" | "square" | "hex" | "roundSquare" | "star" | "parallelogram" | "triangle" | "cloud";
export type EyeStyle   = "dot" | "star" | "x" | "sleepy" | "plus" | "roundedStar" | "dash" | "asterisk" | "dollars" | "arrowUp" | "arrowDown" | "chevron";
export type MouthStyle = "smile" | "flat" | "smirk" | "none" | "arrowUp" | "arrowDown";
export type LimbStyle  = "stick" | "rounded" | "none";

export interface AvatarConfig {
  shape: HeadShape;
  eye:   EyeStyle;
  mouth: MouthStyle;
  hand:  LimbStyle;
  leg:   LimbStyle;
  // per-feature colors
  limbColor:  string;
  eyeColor:   string;
  mouthColor: string;
  headColor:  string;
}
