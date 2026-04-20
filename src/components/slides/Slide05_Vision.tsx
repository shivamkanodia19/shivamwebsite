import { motion } from "framer-motion";
import { visionTimeline } from "@/data/slides";
import { SlideWrapper } from "@/components/SlideWrapper";

export function Slide05Vision() {
  return (
    <SlideWrapper label="VISION" labelTone="light" className="bg-[#FAFAF8]">
      <h2 className="font-playfair text-[52px] text-[#111]">Where this is going.</h2>
      <div className="relative mt-10 pl-0">
        <div className="absolute bottom-0 left-[3px] top-0 w-px bg-[#E8E0D0]" aria-hidden />
        <ul className="space-y-10">
          {visionTimeline.map((item, i) => (
            <motion.li
              key={item.date}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15, duration: 0.35 }}
              className="relative pl-6"
            >
              <span className="absolute left-0 top-[6px] h-[7px] w-[7px] rounded-full bg-[#111]" aria-hidden />
              <p className="mb-1 font-mono text-[11px] text-[#999]">{item.date}</p>
              <p className="text-[16px] leading-[1.65] text-[#555]">{item.body}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </SlideWrapper>
  );
}
