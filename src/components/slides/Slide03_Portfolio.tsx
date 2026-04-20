import { motion } from "framer-motion";
import { clsx } from "clsx";
import { portfolioCards } from "@/data/slides";
import { SlideWrapper } from "@/components/SlideWrapper";

function badge(status: string) {
  if (status === "ACTIVE") return "bg-[#111] text-[#FAFAF8]";
  if (status === "IN PROGRESS") return "bg-[#F5F0E8] text-[#999]";
  return "bg-[#F5F5F5] text-[#BBB]";
}

export function Slide03Portfolio() {
  return (
    <SlideWrapper label="PORTFOLIO" className="bg-[#FAFAF8]">
      <h2 className="font-playfair text-[52px] text-[#111]">The bets.</h2>
      <div className="mt-8 grid grid-cols-1 gap-[14px] md:grid-cols-[repeat(auto-fit,minmax(280px,1fr))]">
        {portfolioCards.map((card, i) => (
          <motion.article
            key={card.name}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, delay: i * 0.09 }}
            className="rounded-[12px] border border-[#E8E0D0] bg-white px-[26px] py-[22px]"
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-playfair text-[17px] text-[#111]">{card.name}</h3>
              <span className={clsx("rounded-[9999px] px-[10px] py-[3px] font-mono text-[9px] tracking-[0.1em]", badge(card.status))}>
                {card.status}
              </span>
            </div>
            <p className="mt-1.5 text-[13px] italic text-[#777]">{card.thesis}</p>
            <p className="mt-1.5 text-[12px] leading-[1.6] text-[#AAA]">{card.detail}</p>
            <p className="mt-2.5 border-t border-[#F0EDE8] pt-2.5 font-mono text-[10px] text-[#CCC]">{card.metric}</p>
          </motion.article>
        ))}
      </div>
    </SlideWrapper>
  );
}
