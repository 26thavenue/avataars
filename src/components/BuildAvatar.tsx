import type { AvatarConfig } from "../lib/avatar";

const SW = 2;
const SWL = 5;
const DEFAULT_HEAD = "#FFD6A5";

export function buildAvatarParts(cfg: AvatarConfig) {
  const { shape, eye, mouth, hand, leg, headColor, limbColor, eyeColor, mouthColor } = cfg;

  const HEAD_FILL = headColor || DEFAULT_HEAD;
  const cx = 50;
  const cy = 36;
  const r = 20;

  const headMap: Record<AvatarConfig["shape"], React.ReactNode> = {
    circle: <circle cx={cx} cy={cy} r={r} fill={HEAD_FILL} />,
    square: <rect x={cx - r} y={cy - r} width={r * 2} height={r * 2} rx="6" ry="6" fill={HEAD_FILL} />,
    roundSquare: <rect x={cx - r} y={cy - r} width={r * 2} height={r * 2} rx="14" ry="14" fill={HEAD_FILL} />,
    hex: (() => {
      const h = r * 0.866;
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
    star: (() => {
      const ro = r;
      const ri = r * 0.5;
      const pts: string[] = [];
      for (let i = 0; i < 8; i++) {
        const outerAngle = (i * Math.PI * 2) / 8 - Math.PI / 2;
        const innerAngle = outerAngle + Math.PI / 8;
        pts.push(`${cx + ro * Math.cos(outerAngle)},${cy + ro * Math.sin(outerAngle)}`);
        pts.push(`${cx + ri * Math.cos(innerAngle)},${cy + ri * Math.sin(innerAngle)}`);
      }
      return <polygon points={pts.join(" ")} fill={HEAD_FILL} />;
    })(),
    parallelogram: (() => {
      const skew = 8;
      const top = cy - r;
      const bot = cy + r;
      const lft = cx - r;
      const rgt = cx + r;
      const pts = [`${lft + skew},${top}`, `${rgt + skew},${top}`, `${rgt - skew},${bot}`, `${lft - skew},${bot}`].join(" ");
      return <polygon points={pts} fill={HEAD_FILL} />;
    })(),
    triangle: (() => {
      const rad = 5;
      const ax = cx;
      const ay = cy - r;
      const lx = cx - r;
      const ly = cy + r;
      const rx2 = cx + r;
      const ry2 = cy + r;
      return (
        <path
          d={`
            M ${ax} ${ay + rad}
            Q ${ax} ${ay} ${ax + rad} ${ay + rad * 0.6}
            L ${rx2 - rad * 1.5} ${ry2 - rad}
            Q ${rx2} ${ry2} ${rx2 - rad} ${ry2}
            L ${lx + rad} ${ly}
            Q ${lx} ${ly} ${lx + rad * 1.5} ${ly - rad}
            L ${ax - rad} ${ay + rad * 0.6}
            Q ${ax} ${ay} ${ax} ${ay + rad}
            Z
          `}
          fill={HEAD_FILL}
        />
      );
    })(),
    cloud: (() => {
      const by = cy;
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

  const eyeY = cy - 5;
  const mouthY = cy + 9;
  const eyeLX = cx - 7;
  const eyeRX = cx + 7;
  const eyeR = 2.5;
  const eyeSymW = 5;

  function eyePair(left: React.ReactNode, right: React.ReactNode) {
    return (
      <>
        {left}
        {right}
      </>
    );
  }

  function dotEye(x: number, y: number) {
    return <circle cx={x} cy={y} r={eyeR} fill={eyeColor} />;
  }

  function starPath(x: number, y: number, or_: number, ir: number) {
    const pts: string[] = [];
    for (let i = 0; i < 10; i++) {
      const angle = (i * Math.PI) / 5 - Math.PI / 2;
      const rr = i % 2 === 0 ? or_ : ir;
      pts.push(`${x + rr * Math.cos(angle)},${y + rr * Math.sin(angle)}`);
    }
    return <polygon points={pts.join(" ")} fill={eyeColor} />;
  }

  function xEye(x: number, y: number) {
    const d = eyeSymW * 0.7;
    return (
      <>
        <line x1={x - d} y1={y - d} x2={x + d} y2={y + d} stroke={eyeColor} strokeWidth={SW} strokeLinecap="round" />
        <line x1={x + d} y1={y - d} x2={x - d} y2={y + d} stroke={eyeColor} strokeWidth={SW} strokeLinecap="round" />
      </>
    );
  }

  function sleepyEye(x: number, y: number) {
    return <path d={`M ${x - eyeSymW} ${y} Q ${x} ${y - eyeSymW} ${x + eyeSymW} ${y}`} stroke={eyeColor} strokeWidth={SW} fill="none" strokeLinecap="round" />;
  }

  function plusEye(x: number, y: number) {
    const w = eyeSymW * 0.8;
    return (
      <>
        <line x1={x} y1={y - w} x2={x} y2={y + w} stroke={eyeColor} strokeWidth={SW} strokeLinecap="round" />
        <line x1={x - w} y1={y} x2={x + w} y2={y} stroke={eyeColor} strokeWidth={SW} strokeLinecap="round" />
      </>
    );
  }

  function roundedStarEye(x: number, y: number) {
    const or_ = eyeSymW;
    const ir = eyeSymW * 0.35;
    const pts: string[] = [];
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI) / 4 - Math.PI / 4;
      const rr = i % 2 === 0 ? or_ : ir;
      pts.push(`${x + rr * Math.cos(angle)},${y + rr * Math.sin(angle)}`);
    }
    return <polygon points={pts.join(" ")} fill={eyeColor} />;
  }

  function dashEye(x: number, y: number) {
    return <line x1={x - eyeSymW} y1={y} x2={x + eyeSymW} y2={y} stroke={eyeColor} strokeWidth={SW} strokeLinecap="round" />;
  }

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

  function dollarEye(x: number, y: number) {
    const h = eyeSymW;
    return (
      <>
        <path
          d={`M ${x + h * 0.5} ${y - h * 0.5} Q ${x - h * 0.6} ${y - h * 0.5} ${x} ${y} Q ${x + h * 0.6} ${y + h * 0.5} ${x - h * 0.5} ${y + h * 0.5}`}
          stroke={eyeColor}
          strokeWidth={SW}
          fill="none"
          strokeLinecap="round"
        />
        <line x1={x} y1={y - h} x2={x} y2={y + h} stroke={eyeColor} strokeWidth={SW} strokeLinecap="round" />
      </>
    );
  }

  function arrowEye(x: number, y: number, up: boolean) {
    const w = eyeSymW * 0.8;
    const h = eyeSymW * 0.7;
    const tipY = up ? y - h : y + h;
    const baseY = up ? y + h * 0.3 : y - h * 0.3;
    return <path d={`M ${x - w} ${baseY} L ${x} ${tipY} L ${x + w} ${baseY}`} stroke={eyeColor} strokeWidth={SW} fill="none" strokeLinecap="round" strokeLinejoin="round" />;
  }

  function chevronEye(x: number, y: number) {
    const w = eyeSymW * 0.85;
    const h = eyeSymW * 0.7;
    return <path d={`M ${x - w} ${y + h * 0.3} L ${x} ${y - h} L ${x + w} ${y + h * 0.3}`} stroke={eyeColor} strokeWidth={SW} fill="none" strokeLinecap="round" strokeLinejoin="round" />;
  }

  const eyeMap: Record<AvatarConfig["eye"], React.ReactNode> = {
    dot: eyePair(dotEye(eyeLX, eyeY), dotEye(eyeRX, eyeY)),
    star: eyePair(starPath(eyeLX, eyeY, eyeSymW, eyeSymW * 0.4), starPath(eyeRX, eyeY, eyeSymW, eyeSymW * 0.4)),
    x: eyePair(xEye(eyeLX, eyeY), xEye(eyeRX, eyeY)),
    sleepy: eyePair(sleepyEye(eyeLX, eyeY), sleepyEye(eyeRX, eyeY)),
    plus: eyePair(plusEye(eyeLX, eyeY), plusEye(eyeRX, eyeY)),
    roundedStar: eyePair(roundedStarEye(eyeLX, eyeY), roundedStarEye(eyeRX, eyeY)),
    dash: eyePair(dashEye(eyeLX, eyeY), dashEye(eyeRX, eyeY)),
    asterisk: eyePair(asteriskEye(eyeLX, eyeY), asteriskEye(eyeRX, eyeY)),
    dollars: eyePair(dollarEye(eyeLX, eyeY), dollarEye(eyeRX, eyeY)),
    arrowUp: eyePair(arrowEye(eyeLX, eyeY, true), arrowEye(eyeRX, eyeY, true)),
    arrowDown: eyePair(arrowEye(eyeLX, eyeY, false), arrowEye(eyeRX, eyeY, false)),
    chevron: eyePair(chevronEye(eyeLX, eyeY), chevronEye(eyeRX, eyeY)),
  };

  const mouthW = 7;
  const mouthMap: Record<AvatarConfig["mouth"], React.ReactNode> = {
    smile: <path d={`M ${cx - mouthW} ${mouthY} Q ${cx} ${mouthY + 6} ${cx + mouthW} ${mouthY}`} stroke={mouthColor} strokeWidth={SW} fill="none" strokeLinecap="round" />,
    flat: <line x1={cx - mouthW} y1={mouthY} x2={cx + mouthW} y2={mouthY} stroke={mouthColor} strokeWidth={SW} strokeLinecap="round" />,
    smirk: <path d={`M ${cx - mouthW} ${mouthY + 1} Q ${cx} ${mouthY + 5} ${cx + mouthW} ${mouthY - 3}`} stroke={mouthColor} strokeWidth={SW} fill="none" strokeLinecap="round" />,
    arrowUp: <path d={`M ${cx - mouthW * 0.7} ${mouthY + 3} L ${cx} ${mouthY - 2} L ${cx + mouthW * 0.7} ${mouthY + 3}`} stroke={mouthColor} strokeWidth={SW} fill="none" strokeLinecap="round" strokeLinejoin="round" />,
    arrowDown: <path d={`M ${cx - mouthW * 0.7} ${mouthY - 2} L ${cx} ${mouthY + 3} L ${cx + mouthW * 0.7} ${mouthY - 2}`} stroke={mouthColor} strokeWidth={SW} fill="none" strokeLinecap="round" strokeLinejoin="round" />,
    none: null,
  };

  const handMap: Record<AvatarConfig["hand"], React.ReactNode> = {
    stick: (
      <>
        <line x1="30" y1={cy + 2} x2="12" y2={cy + 6} stroke={limbColor} strokeWidth={SWL} strokeLinecap="round" />
        <line x1="70" y1={cy + 2} x2="88" y2={cy + 6} stroke={limbColor} strokeWidth={SWL} strokeLinecap="round" />
      </>
    ),
    rounded: (
      <>
        <rect x="8" y={cy + 1} width="22" height="9" rx="5" fill={limbColor} />
        <rect x="70" y={cy + 1} width="22" height="9" rx="5" fill={limbColor} />
      </>
    ),
    none: null,
  };

  const legMap: Record<AvatarConfig["leg"], React.ReactNode> = {
    stick: (
      <>
        <line x1="42" y1={cy + 19} x2="37" y2="97" stroke={limbColor} strokeWidth={SWL} strokeLinecap="round" />
        <line x1="58" y1={cy + 19} x2="63" y2="97" stroke={limbColor} strokeWidth={SWL} strokeLinecap="round" />
      </>
    ),
    rounded: (
      <>
        <rect x="35" y={cy + 18} width="12" height="18" rx="6" fill={limbColor} />
        <rect x="53" y={cy + 18} width="12" height="18" rx="6" fill={limbColor} />
      </>
    ),
    none: null,
  };

  return {
    head: headMap[shape],
    hands: handMap[hand],
    legs: legMap[leg],
    eyes: eyeMap[eye],
    mouth: mouthMap[mouth],
  };
}
