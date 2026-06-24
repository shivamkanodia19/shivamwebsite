import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SlideWrapper } from "@/components/SlideWrapper";

type Props = { isActive?: boolean; showHint?: boolean };

const ease = [0.16, 1, 0.3, 1] as const;

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}


const stats: {
  key: string;
  target: number;
  decimals: number;
  suffix: string;
  sublabel: string;
}[] = [
  { key: "students", target: 200, decimals: 0, suffix: "+", sublabel: "Public ClinicalHours student milestone" },
  { key: "inputs",   target: 65,  decimals: 0, suffix: "",  sublabel: "Research inputs across six cost categories" },
  { key: "projects", target: 8,   decimals: 0, suffix: "",  sublabel: "Verified projects in the archive" },
  { key: "meets",    target: 3,   decimals: 0, suffix: "",  sublabel: "First-place USAPL meet results" },
];

function AnimatedValue({ target, decimals, suffix, active }: { target: number; decimals: number; suffix: string; active: boolean }) {
  const [value, setValue] = useState(decimals > 0 ? `0.${"0".repeat(decimals)}` : "0");

  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const duration = target > 100 ? 1300 : decimals > 0 ? 1100 : 700;
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const e = easeOutCubic(t);
      const v = target * e;
      setValue(`${decimals > 0 ? v.toFixed(decimals) : Math.round(v)}${suffix}`);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target, decimals, suffix]);

  return (
    <span className="font-sans leading-none tabular-nums text-[#F5F2EE]" style={{ fontSize: "clamp(38px, 5vw, 72px)" }}>
      {value}
    </span>
  );
}

export function Slide04Traction({ isActive = false }: Props) {
  return (
    <SlideWrapper label="TRACTION" className="bg-[#F5F2EE]">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.05, duration: 0.4 }}
        className="mb-4 font-mono text-[10px] uppercase tracking-[0.35em] text-[#AAA]"
      >
        04 / Recognition
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08, duration: 0.55, ease }}
        className="mb-10 font-sans font-normal leading-tight tracking-[-0.02em] text-[#111]"
        style={{ fontSize: "clamp(30px, 3.8vw, 52px)" }}
      >
        Public proof.
      </motion.h2>

      <div className="grid grid-cols-2 gap-x-8 gap-y-8 md:gap-x-16 md:gap-y-10">
        {stats.map((s, i) => (
          <motion.div
            key={s.key}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 + i * 0.07, duration: 0.5, ease }}
            className="flex flex-col"
          >
            {/* Top rule */}
            <div className="mb-4 h-px bg-[#DDD]" aria-hidden />

            {/* Big number on dark pill */}
            <div className="inline-flex items-baseline rounded-lg bg-[#111] px-5 py-3 self-start">
              <AnimatedValue target={s.target} decimals={s.decimals} suffix={s.suffix} active={isActive} />
            </div>

            {/* Label */}
            <p className="mt-3 font-mono text-[9px] leading-[1.65] text-[#777]">
              {s.sublabel}
            </p>
          </motion.div>
        ))}
      </div>
    </SlideWrapper>
  );
}
