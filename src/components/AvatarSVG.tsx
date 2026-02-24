import type { AvatarConfig } from "../lib/avatar";
import { buildAvatarParts } from "./BuildAvatar";

interface AvatarSvgProps {
  cfg: AvatarConfig;
  size?: number;
  /** Shown in the UI preview only — not included in the exportable SVG */
  previewBg?: string;
}

export default function AvatarSvg({ cfg, size = 140, previewBg }: AvatarSvgProps) {
  const parts = buildAvatarParts(cfg);

  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
    >
      {/* Background rect only for UI preview — omitted on export */}
      {previewBg && <rect width="100" height="100" fill={previewBg} />}
      {parts.body}
      {parts.limb}
      {parts.head}
      {parts.eyes}
      {parts.nose}
      {parts.mouth}
    </svg>
  );
}