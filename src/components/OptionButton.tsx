interface OptionButtonProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

export default function OptionButton({ label, active, onClick }: OptionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all duration-150 cursor-pointer ${
        active
          ? "border-[#c8ff57] text-[#c8ff57] bg-[#c8ff57]/10"
          : "border-[#1e1e2e] text-[#6b6b80] bg-[#111118] hover:border-[#7b6cff] hover:text-white"
      }`}
    >
      {label}
    </button>
  );
}