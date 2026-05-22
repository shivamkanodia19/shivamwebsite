import { motion } from "framer-motion";
import { SlideWrapper } from "@/components/SlideWrapper";

type Props = { isActive?: boolean; showHint?: boolean };

const ease = [0.16, 1, 0.3, 1] as const;

const milestones = [
  {
    date: "Summer 2026",
    title: "Legends Global",
    body: "Business Intelligence Intern. Sports and entertainment analytics at scale.",
  },
  {
    date: "2026 – 2027",
    title: "Scale & Publish",
    body: "ClinicalHours to 10 Texas universities. FEDVT cattle futures paper. WEF nexus research.",
  },
  {
    date: "2027+",
    title: "Quant or VC",
    body: "Quantitative finance or venture capital. Data meets real-world operations.",
  },
];

export function Slide05Vision(_props: Props) {
  return (
    <SlideWrapper label="VISION" className="bg-[#080808]">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="mb-4 font-mono text-[10px] uppercase tracking-[0.35em] text-[#333]"
      >
        05 — Vision
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18, duration: 0.55, ease }}
        className="mb-12 font-playfair font-normal leading-tight tracking-[-0.02em] text-[#F5F2EE]"
        style={{ fontSize: "clamp(30px, 3.8vw, 52px)" }}
      >
        Where this goes.
      </motion.h2>

      {/* Horizontal timeline */}
      <div className="relative">
        {/* Connecting track line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.4, duration: 0.9, ease }}
          className="absolute left-0 right-0 origin-left"
          style={{ top: "12px", height: "1px", backgroundColor: "#222" }}
          aria-hidden
        />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
          {milestones.map((m, i) => (
            <motion.div
              key={m.date}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.15, duration: 0.55, ease }}
              className="relative pt-8 md:pt-8"
            >
              {/* Node dot */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 + i * 0.15, duration: 0.35, ease }}
                className="absolute left-0 top-[6px] h-[13px] w-[13px] rounded-full border-2 border-[#2D6A50] bg-[#080808]"
                aria-hidden
              />

              {/* Date badge */}
              <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.28em] text-[#2D6A50]">
                {m.date}
              </p>

              {/* Title */}
              <p className="mb-2 font-playfair text-[clamp(16px,1.8vw,22px)] font-normal text-[#F5F2EE]">
                {m.title}
              </p>

              {/* Body */}
              <p className="font-mono text-[10px] leading-[1.75] text-[#555]">
                {m.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative arrow at end */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.5 }}
        className="mt-12 hidden md:flex items-center gap-3"
        aria-hidden
      >
        <div className="h-px flex-1 bg-[#1a1a1a]" />
        <svg width="18" height="10" viewBox="0 0 18 10" fill="none">
          <path d="M0 5H16M16 5L12 1M16 5L12 9" stroke="#2D6A50" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-[#2a2a2a]">
          Ongoing
        </p>
      </motion.div>
    </SlideWrapper>
  );
}
