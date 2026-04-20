import { useEffect, useState } from "react";
import { tractionStats } from "@/data/slides";
import { SlideWrapper } from "@/components/SlideWrapper";

const DURATION_MS = 1400;

function cubicOut(t: number) {
  return 1 - (1 - t) ** 3;
}

function StatNumber({ kind }: { kind: (typeof tractionStats)[number]["kind"] }) {
  const [text, setText] = useState(() => {
    if (kind === "plus") return "0";
    if (kind === "type") return "";
    if (kind === "decimal") return "0.0";
    return "0";
  });

  useEffect(() => {
    const full =
      kind === "plus"
        ? "200+"
        : kind === "type"
          ? "R²=0.97"
          : kind === "decimal"
            ? "3.7"
            : "4×";
    let frame: number;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION_MS);
      const e = cubicOut(t);
      if (kind === "plus") {
        const n = Math.round(200 * e);
        setText(`${n}+`);
      } else if (kind === "type") {
        const len = Math.ceil(full.length * e);
        setText(full.slice(0, len));
      } else if (kind === "decimal") {
        const v = 3.7 * e;
        setText(v.toFixed(1));
      } else {
        const n = Math.round(4 * e);
        setText(`${n}×`);
      }
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [kind]);

  return (
    <span className="block font-playfair text-[clamp(48px,12vw,72px)] leading-none text-deck-text-on-dark">
      {text}
    </span>
  );
}

export function Slide04Traction() {
  return (
    <SlideWrapper label="TRACTION" labelTone="dark" className="bg-deck-bg-dark">
      <h2 className="font-playfair text-[52px] leading-tight text-deck-text-on-dark">
        The numbers.
      </h2>
      <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-10">
        {tractionStats.map((s) => (
          <div key={s.key} className="text-center">
            <StatNumber kind={s.kind} />
            <p className="mt-3 font-mono text-xs leading-snug text-deck-muted-on-dark">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </SlideWrapper>
  );
}
