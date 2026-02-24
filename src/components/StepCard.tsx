interface StepCardProps {
  num: string;
  icon: string;
  title: string;
  desc: string;
  accentFrom: string;
  accentTo: string;
}

export default function StepCard({ num, icon, title, desc, accentFrom, accentTo }: StepCardProps) {
  return (
    <div className="group relative flex-1 min-w-[220px] bg-[#14141f] border border-[#1e1e2e] p-8 overflow-hidden transition-all duration-300 hover:border-[#c8ff57]/25">
      {/* Animated bottom accent bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
        style={{ background: `linear-gradient(90deg, ${accentFrom}, ${accentTo})` }}
      />

      <span className="block text-[10px] font-mono text-[#6b6b80] tracking-widest mb-5">
        {num} —
      </span>
      <div className="mb-5 text-4xl">{icon}</div>
      <h3 className="text-lg font-extrabold mb-3 tracking-tight">{title}</h3>
      <p className="text-sm text-[#6b6b80] leading-relaxed">{desc}</p>
    </div>
  );
}