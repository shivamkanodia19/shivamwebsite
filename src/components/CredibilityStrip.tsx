import { tractionStats } from "@/data/slides";

export function CredibilityStrip() {
  return (
    <div className="border-y border-[#D8D0C4] bg-[#F0ECE3]">
      <div className="mx-auto max-w-6xl px-6 py-5 md:px-12">
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
          {tractionStats.map((stat) => (
            <div key={stat.key} className="flex items-baseline gap-3">
              <span className="font-playfair text-[22px] leading-none text-[#1C1C1A]">{stat.value}</span>
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#8A8580]">{stat.label}</span>
            </div>
          ))}
          <div className="flex items-baseline gap-3">
            <span className="font-playfair text-[22px] leading-none text-[#1C1C1A]">5+</span>
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#8A8580]">shipped projects</span>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="font-playfair text-[22px] leading-none text-[#1C1C1A]">#1</span>
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#8A8580]">Texas state bench press record</span>
          </div>
        </div>
      </div>
    </div>
  );
}
