import { motion } from "framer-motion";
import { slide02Paragraphs } from "@/data/slides";
import { SlideWrapper } from "@/components/SlideWrapper";

export function Slide02Founder() {
  return (
    <SlideWrapper label="FOUNDER" labelTone="light" className="bg-[#FAFAF8]">
      <div className="pointer-events-none absolute left-[-20px] top-[-30px] z-0 font-playfair text-[220px] leading-none text-[#F0EDE8]" aria-hidden>
        02
      </div>
      <div className="relative z-10">
        <h2 className="font-playfair text-[52px] text-[#111]">The founder.</h2>
        <div className="mt-7 space-y-3">
          {slide02Paragraphs.map((line, i) => (
            <motion.p
              key={line}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.085 }}
              className="text-[17px] leading-[1.8] text-[#555]"
            >
              {line}
            </motion.p>
          ))}
        </div>
      </div>
    </SlideWrapper>
  );
}
