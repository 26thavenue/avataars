
import { SAMPLE_CONFIGS } from "../../lib/data"
import AvatarSvg from "../AvatarSVG";

interface HeroProps {
  onOpenModal: () => void;
}

export default function Hero({ onOpenModal }: HeroProps) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-28 pb-20 overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(200,255,87,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(200,255,87,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glow blobs */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{ width: 600, height: 600, background: "#7b6cff", top: -100, left: -200, filter: "blur(130px)", opacity: 0.13 }}
      />
      <div
        className="absolute rounded-full pointer-events-none"
        style={{ width: 500, height: 500, background: "#c8ff57", bottom: -150, right: -150, filter: "blur(130px)", opacity: 0.11 }}
      />

      {/* Badge */}
      <div
        className="fade-up relative z-10 inline-flex items-center gap-2 text-[10px] font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-8"
        style={{
          background: "rgba(200,255,87,0.08)",
          border: "1px solid rgba(200,255,87,0.2)",
          color: "#c8ff57",
        }}
      >
        <span className="w-1.5 h-1.5 rounded-full pulse" style={{ background: "#c8ff57" }} />
        Free to use · No signup needed
      </div>

      {/* Headline */}
      <h1
        className="fade-up-1 relative z-10 font-extrabold leading-none"
        style={{ fontSize: "clamp(56px, 9vw, 120px)", letterSpacing: "-3px" }}
      >
        Build your
        <br />
        <em className="not-italic text-[#c8ff57]">avatar.</em>
      </h1>

      {/* Subtext */}
      <p
        className="fade-up-2 relative z-10 mt-7 text-[#6b6b80] max-w-md leading-relaxed font-normal"
        style={{ fontSize: "clamp(16px, 2vw, 19px)" }}
      >
        Mix shapes, eyes, limbs & expressions to craft a character that's
        unmistakably yours. Export as SVG or PNG — done.
      </p>

      {/* Sample avatars */}
      <div className="fade-up-3 relative z-10 flex gap-4 mt-12 mb-10">
        {SAMPLE_CONFIGS.map((cfg, i) => (
          <div
            key={i}
            className="av-card rounded-full overflow-hidden border-2 border-[#1e1e2e] cursor-pointer hover:border-[#c8ff57]"
            style={{ transition: "border-color .3s" }}
          >
            <AvatarSvg cfg={cfg} size={68} />
          </div>
        ))}
      </div>

      {/* CTA */}
      <button
        onClick={onOpenModal}
        className="fade-up-4 relative z-10 inline-flex items-center gap-3 px-8 py-4 rounded-xl text-base font-bold text-[#0a0a0f] cursor-pointer"
        style={{ background: "#c8ff57", fontFamily: "Syne, sans-serif", transition: "transform .2s, box-shadow .2s" }}
        onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 16px 48px rgba(200,255,87,0.25)")}
        onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z" />
        </svg>
        Generate my avatar
      </button>
    </section>
  );
}