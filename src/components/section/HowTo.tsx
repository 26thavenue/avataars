
import { HOW_TO_STEPS } from "../../lib/data"
import StepCard from "../StepCard";

export default function HowTo() {
  return (
    <section id="howto" className="max-w-6xl mx-auto px-8 py-28">
      {/* Section label */}
      <p className="text-[10px] font-semibold tracking-[.18em] uppercase text-[#c8ff57] mb-4">
        How it works
      </p>

      {/* Heading */}
      <h2
        className="font-extrabold leading-none mb-16"
        style={{ fontSize: "clamp(36px, 5vw, 64px)", letterSpacing: "-2px" }}
      >
        Four steps to
        <br />
        <span className="text-[#7b6cff]">your character.</span>
      </h2>

      {/* Step cards */}
      <div className="flex flex-wrap gap-0.5">
        {HOW_TO_STEPS.map((step) => (
          <StepCard key={step.num} {...step} />
        ))}
      </div>

      {/* Export callout */}
      <div
        className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 rounded-3xl border border-[#1e1e2e] p-10"
        style={{ background: "#14141f" }}
      >
        <div>
          <h3 className="text-xl font-extrabold tracking-tight mb-2">
            Two export formats, zero hassle.
          </h3>
          <p className="text-sm text-[#6b6b80] leading-relaxed max-w-md">
            Copy the raw SVG code to drop your avatar into any website or design
            tool. Or download a crisp PNG for profile pics, games, emails —
            whatever you need.
          </p>
        </div>

        <div className="flex gap-3 flex-shrink-0">
          {[
            { ext: ".svg", label: "VECTOR" },
            { ext: ".png", label: "400×400" },
          ].map((f) => (
            <div
              key={f.ext}
              className="min-w-[96px] text-center rounded-2xl border border-[#1e1e2e] bg-[#0a0a0f] py-4 px-6"
            >
              <span className="block text-xl font-mono font-medium text-[#c8ff57] mb-1">
                {f.ext}
              </span>
              <span className="text-[10px] text-[#6b6b80] tracking-widest">
                {f.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}