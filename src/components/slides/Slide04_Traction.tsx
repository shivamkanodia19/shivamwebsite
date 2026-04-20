import { useEffect, useState } from "react";
import { tractionStats } from "@/data/slides";
import { SlideWrapper } from "@/components/SlideWrapper";

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

function StatValue({ kind, active }: { kind: "plus" | "type" | "decimal" | "times"; active: boolean }) {
  const [value, setValue] = useState(kind === "type" ? "" : kind === "decimal" ? "0.0" : "0");

  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const total = kind === "times" ? 800 : kind === "decimal" ? 1200 : 1400;
    let frame = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / total);
      const e = easeOutCubic(t);

      if (kind === "plus") setValue(`${Math.round(200 * e)}+`);
      else if (kind === "decimal") setValue((3.7 * e).toFixed(1));
      else if (kind === "times") setValue(`${Math.round(4 * e)}×`);
      else {
        const full = "R²=0.97";
        const chars = Math.ceil(full.length * e);
        setValue(full.slice(0, chars));
      }

      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, kind]);

  return <span className="font-playfair text-[52px] leading-none text-[#FAFAF8] md:text-[76px]">{value}</span>;
}

export function Slide04Traction({ isActive = false }: { isActive?: boolean }) {
  return (
    <SlideWrapper label="TRACTION" labelTone="dark" className="bg-[#0D0D0D]">
      <h2 className="font-playfair text-[52px] text-[#FAFAF8]">The numbers.</h2>
      <div className="mt-12 grid grid-cols-2 gap-y-12 gap-x-8 md:gap-y-12 md:gap-x-16">
        {tractionStats.map((item) => (
          <div key={item.key} className="text-center">
            <StatValue kind={item.kind} active={isActive} />
            <p className="mt-3 font-mono text-[12px] text-[#444]">{item.label}</p>
          </div>
        ))}
      </div>
    </SlideWrapper>
  );
}
