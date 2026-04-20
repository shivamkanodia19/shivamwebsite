import { motion } from "framer-motion";
import { slide01HeadlineLines, slide01Subhead } from "@/data/slides";
import { SlideWrapper } from "@/components/SlideWrapper";

const WORD_DELAY = 0.055;
const WORD_DURATION = 0.4;

export function Slide01Problem() {
  const lines = slide01HeadlineLines.map((line) =>
    line.split(/\s+/).filter(Boolean),
  );
  const totalWords = lines.reduce((acc, w) => acc + w.length, 0);
  const subheadDelay = (totalWords - 1) * WORD_DELAY + WORD_DURATION * 0.5 + 0.2;

  let wordIndex = 0;

  return (
    <SlideWrapper label="PROBLEM" className="bg-deck-bg-light">
      <h1
        className="font-playfair font-normal leading-[1.1] tracking-[-0.02em] text-deck-primary"
        style={{ fontSize: "clamp(42px, 6vw, 88px)" }}
      >
        {lines.map((wordsInLine, lineIdx) => (
          <span key={lineIdx} className="block">
            {wordsInLine.map((word, wi) => {
              const i = wordIndex++;
              const isLastInLine = wi === wordsInLine.length - 1;
              return (
                <motion.span
                  key={`${lineIdx}-${wi}-${word}`}
                  className="inline-block"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: WORD_DURATION,
                    delay: i * WORD_DELAY,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                >
                  {word}
                  {!isLastInLine ? "\u00A0" : ""}
                </motion.span>
              );
            })}
          </span>
        ))}
      </h1>
      <motion.p
        className="mt-5 max-w-xl font-body text-lg text-deck-muted"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.35,
          delay: subheadDelay,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        {slide01Subhead}
      </motion.p>
    </SlideWrapper>
  );
}
