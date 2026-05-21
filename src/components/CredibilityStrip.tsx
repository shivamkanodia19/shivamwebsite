import { tractionStats } from "@/data/slides";

export function CredibilityStrip() {
  return (
    <div className="border-y border-[#1a1a1a] bg-[#0D0D0D]">
      <div className="mx-auto max-w-6xl px-6 py-5 md:px-12">
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
          {tractionStats.map((stat) => (
            <div key={stat.key} className="flex items-baseline gap-3">
              <span className="font-playfair text-[22px] leading-none text-[#f3f3f0]">{stat.value}</span>
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#5a5a5a]">{stat.label}</span>
            </div>
          ))}
          <div className="flex items-baseline gap-3">
            <span className="font-playfair text-[22px] leading-none text-[#f3f3f0]">5+</span>
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#5a5a5a]">shipped projects</span>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="font-playfair text-[22px] leading-none text-[#f3f3f0]">#1</span>
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#5a5a5a]">Texas state bench press record</span>
          </div>
        </div>
      </div>
    </div>
  );
}
