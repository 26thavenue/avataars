import type { AvatarConfig } from "../lib/avatar";


// ─── Shared stroke weight — every stroked feature uses this ──────────────────
const SW = 2;       // strokeWidth for eyes / nose / mouth
const SWB = 5;      // strokeWidth for body limbs

const DEFAULT_HEAD = "#FFD6A5";

export function buildAvatarParts(cfg: AvatarConfig) {
  const {
    shape, eye, nose, mouth, body, limb,
    headColor, bodyColor, eyeColor, noseColor, mouthColor,
  } = cfg;

  const HEAD_FILL = headColor || DEFAULT_HEAD;

  // When body is "none" shift the head to vertically center in viewBox
  const ho = body === "none" ? 20 : 0; // head offset



  const cx = 50;               // horizontal centre
  const cy = 31 + ho;          // vertical centre (head)
  const r  = 20;               // "radius" / half-size reference

  const headMap: Record<AvatarConfig["shape"], React.ReactNode> = {

    // ── Circle ────────────────────────────────────────────────────────────
    circle: (
      <circle cx={cx} cy={cy} r={r} fill={HEAD_FILL} />
    ),

    // ── Square (softly rounded) ───────────────────────────────────────────
    square: (
      <rect
        x={cx - r} y={cy - r}
        width={r * 2} height={r * 2}
        rx="6" ry="6"
        fill={HEAD_FILL}
      />
    ),

    // ── Round-square (pillow) ─────────────────────────────────────────────
    roundSquare: (
      <rect
        x={cx - r} y={cy - r}
        width={r * 2} height={r * 2}
        rx="14" ry="14"
        fill={HEAD_FILL}
      />
    ),

    // ── Hex (pointy-top regular hexagon) ─────────────────────────────────
    // Vertices of a regular pointy-top hexagon:
    //   top: (cx, cy-r), upper-right: (cx+r*√3/2, cy-r/2), etc.
    hex: (() => {
      const h = r * 0.866; // r * √3/2
      const pts = [
        `${cx},${cy - r}`,
        `${cx + h},${cy - r * 0.5}`,
        `${cx + h},${cy + r * 0.5}`,
        `${cx},${cy + r}`,
        `${cx - h},${cy + r * 0.5}`,
        `${cx - h},${cy - r * 0.5}`,
      ].join(" ");
      return <polygon points={pts} fill={HEAD_FILL} />;
    })(),

    // ── Star (8-point, built as two rotated squares via path) ────────────
    // Outer radius ro, inner radius ri
    star: (() => {
      const ro = r;       // outer tip radius
      const ri = r * 0.5; // inner notch radius
      const pts: string[] = [];
      for (let i = 0; i < 8; i++) {
        const outerAngle = (i * Math.PI * 2) / 8 - Math.PI / 2;
        const innerAngle = outerAngle + Math.PI / 8;
        pts.push(`${cx + ro * Math.cos(outerAngle)},${cy + ro * Math.sin(outerAngle)}`);
        pts.push(`${cx + ri * Math.cos(innerAngle)},${cy + ri * Math.sin(innerAngle)}`);
      }
      return <polygon points={pts.join(" ")} fill={HEAD_FILL} />;
    })(),

    // ── Parallelogram (leaning right) ────────────────────────────────────
    // Top edge shifted 8px to the right; bottom edge shifted 8px to the left
    parallelogram: (() => {
      const skew = 8;
      const top = cy - r;
      const bot = cy + r;
      const lft = cx - r;
      const rgt = cx + r;
      const pts = [
        `${lft + skew},${top}`,
        `${rgt + skew},${top}`,
        `${rgt - skew},${bot}`,
        `${lft - skew},${bot}`,
      ].join(" ");
      return <polygon points={pts} fill={HEAD_FILL} />;
    })(),

    // ── Triangle (rounded, pointing up) ──────────────────────────────────
    // Drawn as a path with rounded joins using quadratic curves at each corner
    triangle: (() => {
      const rad = 5; // corner radius
      // Apex top, bottom-left, bottom-right
      const ax = cx,       ay = cy - r;
      const lx = cx - r,   ly = cy + r;
      const rx2 = cx + r,  ry2 = cy + r;
      // Each corner: approach via straight, leave via curve
      return (
        <path
          d={`
            M ${ax} ${ay + rad}
            Q ${ax} ${ay} ${ax + rad} ${ay + (rad * 0.6)}
            L ${rx2 - rad * 1.5} ${ry2 - rad}
            Q ${rx2} ${ry2} ${rx2 - rad} ${ry2}
            L ${lx + rad} ${ly}
            Q ${lx} ${ly} ${lx + rad * 1.5} ${ly - rad}
            L ${ax - rad} ${ay + (rad * 0.6)}
            Q ${ax} ${ay} ${ax} ${ay + rad}
            Z
          `}
          fill={HEAD_FILL}
        />
      );
    })(),

    // ── Cloud (4 overlapping circles traced as a smooth path) ────────────
    // We place 4 circles and approximate the union with a smooth SVG path.
    // Circles (cx, cy, r): left(35,cy+4,12), top-left(42,cy-7,13),
    //                      top-right(58,cy-7,13), right(65,cy+4,12)
    // Then a wide bottom arc to close.
    cloud: (() => {
      const by = cy; // base reference
      return (
        <path
          d={`
            M ${cx - 23} ${by + 10}
            Q ${cx - 26} ${by - 2}  ${cx - 18} ${by - 8}
            Q ${cx - 12} ${by - 22} ${cx}      ${by - 20}
            Q ${cx + 12} ${by - 22} ${cx + 18} ${by - 8}
            Q ${cx + 26} ${by - 2}  ${cx + 23} ${by + 10}
            Q ${cx + 20} ${by + 18} ${cx}      ${by + 18}
            Q ${cx - 20} ${by + 18} ${cx - 23} ${by + 10}
            Z
          `}
          fill={HEAD_FILL}
        />
      );
    })(),
  };

  // ── Face feature positions ─────────────────────────────────────────────────
  // Anchored relative to head centre (cy). Consistent spacing.
  const eyeY  = cy - 5;   // eyes:  5px above head centre
  const noseY = cy + 2;   // nose:  2px below head centre
  const mouthY = cy + 9;  // mouth: 9px below head centre
  const eyeLX = cx - 7;   // left eye X
  const eyeRX = cx + 7;   // right eye X

  // ── Eyes ──────────────────────────────────────────────────────────────────
  // ALL symbol eyes use the same 6×6 bounding box drawn with SVG paths.
  // No <text> elements — guarantees consistent sizing across all variants.

  const eyeR = 2.5; // radius for dot eyes
  const eyeSymW = 5; // half-width for symbol eyes

  function eyePair(left: React.ReactNode, right: React.ReactNode) {
    return <>{left}{right}</>;
  }

  // Reusable eye shapes
  function dotEye(x: number, y: number) {
    return <circle cx={x} cy={y} r={eyeR} fill={eyeColor} />;
  }

  // 5-point star path centred at (x,y) with outer radius `or` and inner `ir`
  function starPath(x: number, y: number, or_: number, ir: number) {
    const pts: string[] = [];
    for (let i = 0; i < 10; i++) {
      const angle = (i * Math.PI) / 5 - Math.PI / 2;
      const rr = i % 2 === 0 ? or_ : ir;
      pts.push(`${x + rr * Math.cos(angle)},${y + rr * Math.sin(angle)}`);
    }
    return <polygon points={pts.join(" ")} fill={eyeColor} />;
  }

  // X eye: two crossing lines
  function xEye(x: number, y: number) {
    const d = eyeSymW * 0.7;
    return (
      <>
        <line x1={x - d} y1={y - d} x2={x + d} y2={y + d} stroke={eyeColor} strokeWidth={SW} strokeLinecap="round" />
        <line x1={x + d} y1={y - d} x2={x - d} y2={y + d} stroke={eyeColor} strokeWidth={SW} strokeLinecap="round" />
      </>
    );
  }

  // Sleepy eye: arc opening downward (half-circle arc)
  function sleepyEye(x: number, y: number) {
    const w = eyeSymW;
    return (
      <path
        d={`M ${x - w} ${y} Q ${x} ${y - w} ${x + w} ${y}`}
        stroke={eyeColor} strokeWidth={SW} fill="none" strokeLinecap="round"
      />
    );
  }

  // Plus eye: + shape
  function plusEye(x: number, y: number) {
    const w = eyeSymW * 0.8;
    return (
      <>
        <line x1={x} y1={y - w} x2={x} y2={y + w} stroke={eyeColor} strokeWidth={SW} strokeLinecap="round" />
        <line x1={x - w} y1={y} x2={x + w} y2={y} stroke={eyeColor} strokeWidth={SW} strokeLinecap="round" />
      </>
    );
  }

  // 4-point rounded star (✦)
  function roundedStarEye(x: number, y: number) {
    const or_ = eyeSymW, ir = eyeSymW * 0.35;
    const pts: string[] = [];
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI) / 4 - Math.PI / 4;
      const rr = i % 2 === 0 ? or_ : ir;
      pts.push(`${x + rr * Math.cos(angle)},${y + rr * Math.sin(angle)}`);
    }
    return <polygon points={pts.join(" ")} fill={eyeColor} />;
  }

  // Dash eye: short horizontal line
  function dashEye(x: number, y: number) {
    return (
      <line x1={x - eyeSymW} y1={y} x2={x + eyeSymW} y2={y} stroke={eyeColor} strokeWidth={SW} strokeLinecap="round" />
    );
  }

  // Asterisk eye: 3 lines crossing at centre
  function asteriskEye(x: number, y: number) {
    const w = eyeSymW * 0.85;
    return (
      <>
        <line x1={x - w} y1={y} x2={x + w} y2={y} stroke={eyeColor} strokeWidth={SW} strokeLinecap="round" />
        <line x1={x} y1={y - w} x2={x} y2={y + w} stroke={eyeColor} strokeWidth={SW} strokeLinecap="round" />
        <line x1={x - w * 0.7} y1={y - w * 0.7} x2={x + w * 0.7} y2={y + w * 0.7} stroke={eyeColor} strokeWidth={SW} strokeLinecap="round" />
      </>
    );
  }

  // Dollar eye: S-curve with vertical line
  function dollarEye(x: number, y: number) {
    const h = eyeSymW;
    return (
      <>
        <path
          d={`M ${x + h * 0.5} ${y - h * 0.5} Q ${x - h * 0.6} ${y - h * 0.5} ${x} ${y} Q ${x + h * 0.6} ${y + h * 0.5} ${x - h * 0.5} ${y + h * 0.5}`}
          stroke={eyeColor} strokeWidth={SW} fill="none" strokeLinecap="round"
        />
        <line x1={x} y1={y - h} x2={x} y2={y + h} stroke={eyeColor} strokeWidth={SW} strokeLinecap="round" />
      </>
    );
  }

  // Arrow up / down eye: a small chevron
  function arrowEye(x: number, y: number, up: boolean) {
    const w = eyeSymW * 0.8, h = eyeSymW * 0.7;
    const tipY = up ? y - h : y + h;
    const baseY = up ? y + h * 0.3 : y - h * 0.3;
    return (
      <path
        d={`M ${x - w} ${baseY} L ${x} ${tipY} L ${x + w} ${baseY}`}
        stroke={eyeColor} strokeWidth={SW} fill="none" strokeLinecap="round" strokeLinejoin="round"
      />
    );
  }

  // Chevron eye: open arc pointing up
  function chevronEye(x: number, y: number) {
    const w = eyeSymW * 0.85, h = eyeSymW * 0.7;
    return (
      <path
        d={`M ${x - w} ${y + h * 0.3} L ${x} ${y - h} L ${x + w} ${y + h * 0.3}`}
        stroke={eyeColor} strokeWidth={SW} fill="none" strokeLinecap="round" strokeLinejoin="round"
      />
    );
  }

  const eyeMap: Record<AvatarConfig["eye"], React.ReactNode> = {
    dot:         eyePair(dotEye(eyeLX, eyeY),          dotEye(eyeRX, eyeY)),
    star:        eyePair(starPath(eyeLX, eyeY, eyeSymW, eyeSymW * 0.4), starPath(eyeRX, eyeY, eyeSymW, eyeSymW * 0.4)),
    x:           eyePair(xEye(eyeLX, eyeY),            xEye(eyeRX, eyeY)),
    sleepy:      eyePair(sleepyEye(eyeLX, eyeY),       sleepyEye(eyeRX, eyeY)),
    plus:        eyePair(plusEye(eyeLX, eyeY),         plusEye(eyeRX, eyeY)),
    roundedStar: eyePair(roundedStarEye(eyeLX, eyeY),  roundedStarEye(eyeRX, eyeY)),
    dash:        eyePair(dashEye(eyeLX, eyeY),         dashEye(eyeRX, eyeY)),
    asterisk:    eyePair(asteriskEye(eyeLX, eyeY),     asteriskEye(eyeRX, eyeY)),
    dollars:     eyePair(dollarEye(eyeLX, eyeY),       dollarEye(eyeRX, eyeY)),
    arrowUp:     eyePair(arrowEye(eyeLX, eyeY, true),  arrowEye(eyeRX, eyeY, true)),
    arrowDown:   eyePair(arrowEye(eyeLX, eyeY, false), arrowEye(eyeRX, eyeY, false)),
    chevron:     eyePair(chevronEye(eyeLX, eyeY),      chevronEye(eyeRX, eyeY)),
  };

  // ── Nose ──────────────────────────────────────────────────────────────────
  // All nose variants use SW strokeWidth or a small filled shape of similar visual weight
  const noseW = 5; // half-width of nose features
  const noseMap: Record<AvatarConfig["nose"], React.ReactNode> = {
    dot:  <circle cx={cx} cy={noseY} r={1.8} fill={noseColor} />,
    bump: (
      <path
        d={`M ${cx - noseW} ${noseY + 2} Q ${cx} ${noseY - 3} ${cx + noseW} ${noseY + 2}`}
        stroke={noseColor} strokeWidth={SW} fill="none" strokeLinecap="round"
      />
    ),
    dash: (
      <line
        x1={cx - noseW} y1={noseY} x2={cx + noseW} y2={noseY}
        stroke={noseColor} strokeWidth={SW} strokeLinecap="round"
      />
    ),
    tri: (
      <polygon
        points={`${cx},${noseY - 2.5} ${cx - 3.5},${noseY + 2.5} ${cx + 3.5},${noseY + 2.5}`}
        fill={noseColor}
      />
    ),
    none: null,
  };

  // ── Mouth ─────────────────────────────────────────────────────────────────
  // All mouth variants use SW strokeWidth for consistency
  const mouthW = 7; // half-width of mouth features
  const mouthMap: Record<AvatarConfig["mouth"], React.ReactNode> = {
    smile: (
      <path
        d={`M ${cx - mouthW} ${mouthY} Q ${cx} ${mouthY + 6} ${cx + mouthW} ${mouthY}`}
        stroke={mouthColor} strokeWidth={SW} fill="none" strokeLinecap="round"
      />
    ),
    flat: (
      <line
        x1={cx - mouthW} y1={mouthY} x2={cx + mouthW} y2={mouthY}
        stroke={mouthColor} strokeWidth={SW} strokeLinecap="round"
      />
    ),
    smirk: (
      <path
        d={`M ${cx - mouthW} ${mouthY + 1} Q ${cx} ${mouthY + 5} ${cx + mouthW} ${mouthY - 3}`}
        stroke={mouthColor} strokeWidth={SW} fill="none" strokeLinecap="round"
      />
    ),
    arrowUp: (
      <path
        d={`M ${cx - mouthW * 0.7} ${mouthY + 3} L ${cx} ${mouthY - 2} L ${cx + mouthW * 0.7} ${mouthY + 3}`}
        stroke={mouthColor} strokeWidth={SW} fill="none" strokeLinecap="round" strokeLinejoin="round"
      />
    ),
    arrowDown: (
      <path
        d={`M ${cx - mouthW * 0.7} ${mouthY - 2} L ${cx} ${mouthY + 3} L ${cx + mouthW * 0.7} ${mouthY - 2}`}
        stroke={mouthColor} strokeWidth={SW} fill="none" strokeLinecap="round" strokeLinejoin="round"
      />
    ),
    none: null,
  };

  // ── Body ──────────────────────────────────────────────────────────────────
  const bodyMap: Record<AvatarConfig["body"], React.ReactNode> = {
    rect:     <rect x="28" y="52" width="44" height="30" rx="8" fill={bodyColor} />,
    triangle: <polygon points="50,50 22,84 78,84" fill={bodyColor} />,
    round:    <ellipse cx="50" cy="68" rx="22" ry="16" fill={bodyColor} />,
    none:     null,
  };

  // ── Limbs (suppressed when body is "none") ────────────────────────────────
  const limbMap: Record<AvatarConfig["limb"], React.ReactNode> = {
    stick: body !== "none" ? (
      <>
        <line x1="28" y1="60" x2="10" y2="52" stroke={bodyColor} strokeWidth={SWB} strokeLinecap="round" />
        <line x1="72" y1="60" x2="90" y2="52" stroke={bodyColor} strokeWidth={SWB} strokeLinecap="round" />
        <line x1="36" y1="82" x2="30" y2="96" stroke={bodyColor} strokeWidth={SWB} strokeLinecap="round" />
        <line x1="64" y1="82" x2="70" y2="96" stroke={bodyColor} strokeWidth={SWB} strokeLinecap="round" />
      </>
    ) : null,
    rounded: body !== "none" ? (
      <>
        <rect x="6"  y="54" width="22" height="8" rx="4" fill={bodyColor} />
        <rect x="72" y="54" width="22" height="8" rx="4" fill={bodyColor} />
        <rect x="30" y="82" width="12" height="13" rx="5" fill={bodyColor} />
        <rect x="58" y="82" width="12" height="13" rx="5" fill={bodyColor} />
      </>
    ) : null,
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