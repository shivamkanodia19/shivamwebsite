import { motion } from "framer-motion";
import { askBody, askPills } from "@/data/slides";
import { SlideWrapper } from "@/components/SlideWrapper";

const PILL_STAGGER = 0.08;

export function Slide06Ask() {
  const paragraphs = askBody.trim().split(/\n\n/);

  return (
    <SlideWrapper label="ASK" className="bg-deck-bg-light">
      <h2 className="font-playfair text-[52px] leading-tight text-deck-primary">
        The ask.
      </h2>
      <div className="mt-7 max-w-[600px]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
          className="space-y-4 font-body text-lg leading-[1.7] text-[#555555]"
        >
          {paragraphs.map((p) => (
            <p key={p.slice(0, 32)}>{p}</p>
          ))}
        </motion.div>
        <div className="mt-9 flex flex-wrap gap-3">
          {askPills.map((label, i) => (
            <motion.span
              key={label}
              className="inline-block rounded-[9999px] border border-deck-pill-border px-5 py-2 font-mono text-xs text-[#888888] transition-colors duration-[180ms] hover:border-deck-primary hover:bg-deck-primary hover:text-deck-text-on-dark"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.35,
                delay: 0.35 + i * PILL_STAGGER,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              {label}
            </motion.span>
          ))}
        </div>
      </div>
    </SlideWrapper>
  );
}
