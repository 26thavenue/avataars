interface ColorSwatchProps {
  color: string;
  active: boolean;
  onClick: () => void;
}

export default function ColorSwatch({ color, active, onClick }: ColorSwatchProps) {
  return (
    <button
      onClick={onClick}
      className={`w-7 h-7 rounded-full border-2 transition-all duration-150 cursor-pointer hover:scale-110 ${
        active ? "border-white scale-110" : "border-transparent hover:border-white/50"
      }`}
      style={{ background: color }}
      aria-label={`Select color ${color}`}
    />
  );
}