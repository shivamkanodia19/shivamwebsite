import { motion } from "framer-motion";
import { SlideWrapper } from "@/components/SlideWrapper";

type Props = { isActive?: boolean; showHint?: boolean };

const ease = [0.16, 1, 0.3, 1] as const;

const milestones = [
  {
    date: "Presented",
    title: "Cattle futures",
    body: "65 inputs. Six cost categories. Three model families. Walk-forward validation.",
  },
  {
    date: "In progress",
    title: "Dairy decision support",
    body: "Systems modeling and economic decision-support tools for dairy-farm management.",
  },
  {
    date: "Collaborator",
    title: "Dr. Karun Kaniyamattam",
    body: "Applied research at Texas A&M University.",
  },
];

export function Slide05Vision(_props: Props) {
  return (
    <SlideWrapper label="RESEARCH" className="bg-[#080808]">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.05, duration: 0.4 }}
        className="mb-4 font-mono text-[10px] uppercase tracking-[0.35em] text-[#333]"
      >
        05 / Research
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08, duration: 0.55, ease }}
        className="mb-12 font-sans font-normal leading-tight tracking-[-0.02em] text-[#F5F2EE]"
        style={{ fontSize: "clamp(30px, 3.8vw, 52px)" }}
      >
        Models for decisions.
      </motion.h2>

      {/* Horizontal timeline */}
      <div className="relative">
        {/* Connecting track line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.15, duration: 0.9, ease }}
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
              transition={{ delay: 0.2 + i * 0.08, duration: 0.55, ease }}
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
              <p className="mb-2 font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-[#2D6A50]">
                {m.date}
              </p>

              {/* Title */}
              <p className="mb-2 font-sans text-[clamp(18px,2vw,26px)] font-normal text-[#F5F2EE]">
                {m.title}
              </p>

              {/* Body */}
              <p className="font-mono text-[10px] leading-[1.75] text-[#666]">
                {m.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Pull quote */}
      <motion.blockquote
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="mt-10 border-l-2 border-[#2D6A50] pl-5"
      >
        <p className="font-sans text-[clamp(14px,1.5vw,18px)] leading-[1.6] text-[#666]">
          Research status is stated conservatively. No publication outcome is implied.
        </p>
      </motion.blockquote>

      {/* Decorative arrow at end */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55, duration: 0.5 }}
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
