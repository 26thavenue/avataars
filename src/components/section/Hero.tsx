

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
        <span className="w-1.5 h-1.5 rounded-full pulse mono-font" style={{ background: "#c8ff57" }} />
        Free to use · No signup needed
      </div>

      {/* Headline */}
      <h1
        className="fade-up-1 relative z-10 font-extrabold leading-none"
        style={{ fontSize: "clamp(56px, 9vw, 120px)", letterSpacing: "-3px" }}
      >
        Build your
        <em className="not-italic text-[#c8ff57] ml-3 ">avatar<span className="animate-pulse">.</span></em>
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
      <div className="fade-up-3 relative z-10 flex gap-4 mt-8 mb-8">
        
        <svg viewBox="28 28 44 44"
        xmlns="http://www.w3.org/2000/svg" 
        width="50" height="50" className="bg-amber-500 rounded-md">
          <rect x="32" y="32" width="36" height="36" rx="8" fill="#FFD6A5"></rect>
          <path d="M39 47 Q43 43 47 47" stroke="#0D0D14" stroke-width="2" fill="none" stroke-linecap="round"></path>
          <path d="M53 47 Q57 43 61 47" stroke="#0D0D14" stroke-width="2" fill="none" stroke-linecap="round">
            </path><path d="M44 57 Q50 63 56 56" stroke="#0D0D14" stroke-width="2" fill="none" stroke-linecap="round">
          </path></svg>
        <svg viewBox="28 28 44 44"
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
          className="bg-sky-100 rounded-md"
        >
          <rect x="32" y="32" width="36" height="36" rx="8" fill="#0EA5E9" />
          <path d="M39 47 Q43 43 47 47" stroke="#FFFFFF" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M53 47 Q57 43 61 47" stroke="#FFFFFF" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M44 57 Q50 63 56 56" stroke="#FFFFFF" strokeWidth="2" fill="none" strokeLinecap="round" />
        </svg>
       <svg viewBox="28 28 44 44"
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        height="50"
        className="bg-emerald-100 rounded-md"
      >
        <rect x="32" y="32" width="36" height="36" rx="8" fill="#10B981" />
        <path d="M39 47 Q43 43 47 47" stroke="#064E3B" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M53 47 Q57 43 61 47" stroke="#064E3B" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M44 57 Q50 63 56 56" stroke="#064E3B" strokeWidth="2" fill="none" strokeLinecap="round" />
      </svg>
     <svg viewBox="28 28 44 44"
  xmlns="http://www.w3.org/2000/svg"
  width="50"
  height="50"
  className="bg-indigo-900 rounded-md"
>
  <rect x="32" y="32" width="36" height="36" rx="8" fill="#A78BFA" />
  <path d="M39 47 Q43 43 47 47" stroke="#1E1B4B" strokeWidth="2" fill="none" strokeLinecap="round" />
  <path d="M53 47 Q57 43 61 47" stroke="#1E1B4B" strokeWidth="2" fill="none" strokeLinecap="round" />
  <path d="M44 57 Q50 63 56 56" stroke="#1E1B4B" strokeWidth="2" fill="none" strokeLinecap="round" />
</svg>
    

        
      </div>

      {/* CTA */}
      <button
        onClick={onOpenModal}
        className="fade-up-4 relative z-10 mono-font inline-flex items-center gap-3 px-8 py-4 rounded-xl text-base font-bold text-[#0a0a0f] cursor-pointer"
        style={{ background: "#c8ff57", transition: "transform .2s, box-shadow .2s" }}
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