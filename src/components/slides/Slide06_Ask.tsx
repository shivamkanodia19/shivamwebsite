import { motion } from "framer-motion";
import { SlideWrapper } from "@/components/SlideWrapper";

type Props = { isActive?: boolean; showHint?: boolean };

const ease = [0.16, 1, 0.3, 1] as const;

const asks = [
  {
    index: "01",
    title: "Legends Global · BI Intern",
    sub: "Summer 2026 — confirmed",
    accent: true,
  },
  {
    index: "02",
    title: "Research Collaboration",
    sub: "ClinicalHours · FEDVT · Applied ML",
    accent: false,
  },
  {
    index: "03",
    title: "Mentor · Advisor",
    sub: "If you're building something worth building",
    accent: false,
  },
];

export function Slide06Ask(_props: Props) {
  return (
    <SlideWrapper label="ASK" className="bg-[#F5F2EE]">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-[auto_1fr] md:gap-20">

        {/* Left: heading */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease }}
          className="flex flex-col justify-center"
        >
          <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.35em] text-[#AAA]">
            06 — Ask
          </p>
          <h2
            className="font-playfair font-normal leading-[1.08] tracking-[-0.02em] text-[#111]"
            style={{ fontSize: "clamp(40px, 4.8vw, 68px)" }}
          >
            The
            <br />
            ask.
          </h2>

          <div className="mt-8 h-px w-10 bg-[#CCC]" aria-hidden />

          <p className="mt-8 max-w-[200px] font-mono text-[10px] leading-[1.85] text-[#AAA]">
            Open to internships,
            <br />
            research, and mentorship
            <br />
            from operators.
          </p>

          {/* Decorative large numeral */}
          <p
            className="mt-4 select-none font-playfair font-normal leading-none tracking-[-0.04em] text-[#E8E4DF]"
            aria-hidden
            style={{ fontSize: "clamp(60px, 7vw, 96px)" }}
          >
            3
          </p>
        </motion.div>

        {/* Right: ask cards */}
        <div className="flex flex-col justify-center gap-3">
          {asks.map((a, i) => (
            <motion.div
              key={a.index}
              initial={{ opacity: 0, x: 14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.10 + i * 0.08, duration: 0.55, ease }}
              className={
                a.accent
                  ? "flex items-center gap-5 rounded-xl border border-[#2D6A50]/25 px-6 py-5"
                  : "flex items-center gap-5 rounded-xl border border-[#E0DAD2] bg-white px-6 py-5"
              }
              style={a.accent ? { backgroundColor: "rgba(45,106,80,0.05)" } : undefined}
            >
              <span className={`font-mono text-[13px] tabular-nums shrink-0 font-medium ${a.accent ? "text-[#2D6A50]" : "text-[#BBB]"}`}>
                {a.index}
              </span>
              <div>
                <p className={`font-playfair text-[clamp(15px,1.6vw,19px)] font-normal ${a.accent ? "text-[#2D6A50]" : "text-[#111]"}`}>
                  {a.title}
                </p>
                <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-[#AAA]">
                  {a.sub}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SlideWrapper>
  );
}
