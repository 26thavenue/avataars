import type { AvatarConfig } from "../lib/avatar";

const SKIN = "#FFD6A5";
const DARK = "#0D0D14";

export function buildAvatarParts(cfg: AvatarConfig) {
  const { shape, eye, nose, mouth, body, limb, color } = cfg;

  // ── Head ──────────────────────────────────────────────────────────────────
  const headMap: Record<AvatarConfig["shape"], React.ReactNode> = {
    circle: <circle cx="50" cy="30" r="18" fill={SKIN} />,
    square: <rect x="32" y="12" width="36" height="36" rx="8" fill={SKIN} />,
    hex:    <polygon points="50,12 66,22 66,42 50,52 34,42 34,22" fill={SKIN} />,
  };

  // ── Eyes ──────────────────────────────────────────────────────────────────
  const ex1 = 43, ex2 = 57, ey = 27;

  const eyeMap: Record<AvatarConfig["eye"], React.ReactNode> = {
    dot: (
      <>
        <circle cx={ex1} cy={ey} r="3" fill={DARK} />
        <circle cx={ex2} cy={ey} r="3" fill={DARK} />
      </>
    ),
    star: (
      <>
        <text x={ex1 - 6} y={ey + 4} fontSize="10" fill={DARK}>★</text>
        <text x={ex2 - 2} y={ey + 4} fontSize="10" fill={DARK}>★</text>
      </>
    ),
    x: (
      <>
        <text x={ex1 - 6} y={ey + 5} fontSize="12" fill={DARK} fontWeight="bold">×</text>
        <text x={ex2 - 2} y={ey + 5} fontSize="12" fill={DARK} fontWeight="bold">×</text>
      </>
    ),
    sleepy: (
      <>
        <path d={`M${ex1 - 4} ${ey} Q${ex1} ${ey - 4} ${ex1 + 4} ${ey}`} stroke={DARK} strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d={`M${ex2 - 4} ${ey} Q${ex2} ${ey - 4} ${ex2 + 4} ${ey}`} stroke={DARK} strokeWidth="2" fill="none" strokeLinecap="round" />
      </>
    ),
  };

  // ── Nose ──────────────────────────────────────────────────────────────────
  const noseMap: Record<AvatarConfig["nose"], React.ReactNode> = {
    dot:  <circle cx="50" cy="34" r="2" fill={DARK} />,
    bump: <path d="M47 33 Q50 38 53 33" stroke={DARK} strokeWidth="1.5" fill="none" strokeLinecap="round" />,
    none: null,
  };

  // ── Mouth ─────────────────────────────────────────────────────────────────
  const mouthMap: Record<AvatarConfig["mouth"], React.ReactNode> = {
    smile: <path d="M43 38 Q50 44 57 38" stroke={DARK} strokeWidth="2" fill="none" strokeLinecap="round" />,
    flat:  <rect x="44" y="38" width="12" height="2.5" rx="1.25" fill={DARK} />,
    smirk: <path d="M44 37 Q50 43 56 36" stroke={DARK} strokeWidth="2" fill="none" strokeLinecap="round" />,
  };

  // ── Body ──────────────────────────────────────────────────────────────────
  const bodyMap: Record<AvatarConfig["body"], React.ReactNode> = {
    rect:     <rect x="28" y="50" width="44" height="32" rx="8" fill={color} />,
    triangle: <polygon points="50,48 22,84 78,84" fill={color} />,
    round:    <ellipse cx="50" cy="68" rx="24" ry="18" fill={color} />,
  };

  // ── Limbs ─────────────────────────────────────────────────────────────────
  const limbMap: Record<AvatarConfig["limb"], React.ReactNode> = {
    stick: (
      <>
        <line x1="28" y1="58" x2="10" y2="50" stroke={color} strokeWidth="5" strokeLinecap="round" />
        <line x1="72" y1="58" x2="90" y2="50" stroke={color} strokeWidth="5" strokeLinecap="round" />
        <line x1="36" y1="82" x2="30" y2="96" stroke={color} strokeWidth="5" strokeLinecap="round" />
        <line x1="64" y1="82" x2="70" y2="96" stroke={color} strokeWidth="5" strokeLinecap="round" />
      </>
    ),
    rounded: (
      <>
        <rect x="6"  y="52" width="22" height="8"  rx="4" fill={color} />
        <rect x="72" y="52" width="22" height="8"  rx="4" fill={color} />
        <rect x="30" y="82" width="12" height="14" rx="5" fill={color} />
        <rect x="58" y="82" width="12" height="14" rx="5" fill={color} />
      </>
    ),
    none: null,
  };

  return {
    head:  headMap[shape],
    eyes:  eyeMap[eye],
    nose:  noseMap[nose],
    mouth: mouthMap[mouth],
    body:  bodyMap[body],
    limb:  limbMap[limb],
  };
}