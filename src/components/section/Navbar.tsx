export default function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-10 py-5"
      style={{
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div className="text-lg font-extrabold tracking-tight">
        avata<span className="text-[#c8ff57]">ar</span>
      </div>
      <a
        href="#howto"
        className="text-sm font-medium text-[#6b6b80] hover:text-white transition-colors no-underline"
      >
        How it works
      </a>
    </nav>
  );
}