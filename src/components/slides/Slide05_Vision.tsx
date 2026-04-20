import { motion } from "framer-motion";
import { visionTimeline } from "@/data/slides";
import { SlideWrapper } from "@/components/SlideWrapper";

const STAGGER = 0.15;

export function Slide05Vision() {
  return (
    <SlideWrapper label="VISION" className="bg-deck-bg-light">
      <h2 className="font-playfair text-[52px] leading-tight text-deck-primary">
        Where this is going.
      </h2>
      <div className="relative mt-10 pl-1">
        <div
          className="absolute bottom-0 left-[2px] top-0 w-px bg-deck-border"
          aria-hidden
        />
        <ul className="relative space-y-10">
          {visionTimeline.map((item, i) => (
            <motion.li
              key={item.date}
              className="relative flex gap-4 pl-6"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.45,
                delay: i * STAGGER,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <span
                className="absolute left-0 top-[7px] h-1.5 w-1.5 rounded-full bg-deck-primary"
                aria-hidden
              />
              <div>
                <p className="mb-1 font-mono text-xs text-deck-muted">{item.date}</p>
                <p className="font-body text-base leading-relaxed text-[#555555]">
                  {item.body}
                </p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </SlideWrapper>
  );
}
