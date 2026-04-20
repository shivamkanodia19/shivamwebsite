import { motion } from "framer-motion";
import { slide01Accent, slide01HeadlineLines, slide01Subhead } from "@/data/slides";
import { SlideWrapper } from "@/components/SlideWrapper";

type Props = { showHint?: boolean };

export function Slide01Problem({ showHint = false }: Props) {
  let idx = 0;

  return (
    <SlideWrapper label="PROBLEM" className="bg-[#0D0D0D]">
      <h2
        className="font-playfair font-normal leading-[1.08] tracking-[-0.02em] text-[#FAFAF8]"
        style={{ fontSize: "clamp(36px, 6vw, 92px)" }}
      >
        {slide01HeadlineLines.map((line) => (
          <span key={line} className="block">
            {line.split(" ").map((word, i, arr) => {
              const local = idx++;
              const space = i < arr.length - 1 ? "\u00A0" : "";
              return (
                <motion.span
                  key={`${line}-${word}-${i}`}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: local * 0.055, ease: [0.25, 0.1, 0.25, 1] }}
                  className="inline-block"
                >
                  {word}
                  {space}
                </motion.span>
              );
            })}
          </span>
        ))}
      </h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: idx * 0.055 + 0.1, duration: 0.3 }}
        className="mt-5 text-[18px] text-[#444]"
      >
        {slide01Subhead}
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: idx * 0.055 + 0.25, duration: 0.3 }}
        className="mt-3 text-[18px] text-[#C8F565]"
      >
        {slide01Accent}
      </motion.p>

      {showHint ? (
        <p className="mt-14 text-center font-mono text-[9px] tracking-[0.2em] text-[#3a3a3a]">
          SCROLL OR ARROWS TO CONTINUE
        </p>
      ) : null}
    </SlideWrapper>
  );
}
