import type { AvatarConfig } from "../lib/avatar";
import { buildAvatarParts } from "./BuildAvatar";


interface AvatarSvgProps {
  cfg: AvatarConfig;
  size?: number;
  bg?: string;
}

export default function AvatarSvg({ cfg, size = 140, bg = "#111118" }: AvatarSvgProps) {
  const parts = buildAvatarParts(cfg);

  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
    >
      <rect width="100" height="100" fill={bg} />
      {parts.body}
      {parts.limb}
      {parts.head}
      {parts.eyes}
      {parts.nose}
      {parts.mouth}
    </svg>
  );
}