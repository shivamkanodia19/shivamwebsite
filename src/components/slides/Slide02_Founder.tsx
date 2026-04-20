import { motion } from "framer-motion";
import { slide02Paragraphs } from "@/data/slides";
import { SlideWrapper } from "@/components/SlideWrapper";

const STAGGER = 0.09;

export function Slide02Founder() {
  return (
    <SlideWrapper label="FOUNDER" className="bg-deck-bg-light">
      <div
        className="pointer-events-none absolute left-[-40px] top-[-20px] z-0 select-none font-playfair text-[200px] leading-none text-deck-cream"
        aria-hidden
      >
        01
      </div>
      <div className="relative z-[1]">
        <h2 className="font-playfair text-[52px] leading-tight text-deck-primary">
          The founder.
        </h2>
        <div className="mt-7 space-y-4">
          {slide02Paragraphs.map((text, i) => (
            <motion.p
              key={i}
              className="font-body text-[17px] leading-[1.75] text-deck-body"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.45,
                delay: i * STAGGER,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              {text}
            </motion.p>
          ))}
        </div>
      </div>
    </SlideWrapper>
  );
}
