import { motion } from "framer-motion";
import { SlideWrapper } from "@/components/SlideWrapper";
import { slide01HeadlineLines, slide01Subhead, slide01Accent } from "@/data/slides";

type Props = { isActive?: boolean; showHint?: boolean };

const ease = [0.16, 1, 0.3, 1] as const;

export function Slide01Problem({ showHint = false }: Props) {
  return (
    <SlideWrapper label="PROBLEM" className="bg-[#080808]">
      {/* Noise grain overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
        }}
        aria-hidden
      />

      <div className="grid grid-cols-1 gap-0 md:grid-cols-[1fr_auto]">
        {/* Left: main content */}
        <div>
          {/* Accent rule */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, ease }}
            className="mb-8 h-px w-14 origin-left bg-[#2D6A50]"
            aria-hidden
          />

          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5, ease }}
            className="mb-5 font-mono text-[10px] uppercase tracking-[0.35em] text-[#3a3a3a]"
          >
            01 — Problem
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38, duration: 0.7, ease }}
            className="font-playfair font-normal leading-[1.08] tracking-[-0.025em] text-[#F5F2EE]"
            style={{ fontSize: "clamp(42px, 6vw, 88px)" }}
          >
            {slide01HeadlineLines.map((line, i) => (
              <span key={i}>{line}{i < slide01HeadlineLines.length - 1 ? <br /> : null}</span>
            ))}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85, duration: 0.6 }}
            className="mt-8 space-y-1"
          >
            <p className="font-playfair text-[clamp(17px,1.8vw,24px)] italic leading-[1.5] text-[#444]">
              {slide01Subhead}
            </p>
            <p className="font-playfair text-[clamp(17px,1.8vw,24px)] italic leading-[1.5] text-[#2D6A50]">
              {slide01Accent}
            </p>
          </motion.div>
        </div>

        {/* Right: identifier badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="hidden items-end pb-1 pl-16 md:flex"
        >
          <div className="flex flex-col items-end gap-[6px] text-right">
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#2a2a2a]">
              Texas A&amp;M
            </p>
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#2a2a2a]">
              ISE Honors
            </p>
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#2a2a2a]">
              Class of 2029
            </p>
          </div>
        </motion.div>
      </div>

      {showHint && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.5 }}
          className="mt-16 font-mono text-[9px] tracking-[0.22em] text-[#2a2a2a]"
        >
          ARROWS · SWIPE · KEYS 1–7
        </motion.p>
      )}
    </SlideWrapper>
  );
}
