export type HeadShape = "circle" | "square" | "hex";
export type EyeStyle = "dot" | "star" | "x" | "sleepy";
export type NoseStyle = "dot" | "bump" | "none";
export type MouthStyle = "smile" | "flat" | "smirk";
export type BodyStyle = "rect" | "triangle" | "round";
export type LimbStyle = "stick" | "rounded" | "none";

export interface AvatarConfig {
  shape: HeadShape;
  eye: EyeStyle;
  nose: NoseStyle;
  mouth: MouthStyle;
  body: BodyStyle;
  limb: LimbStyle;
  color: string;
}