import { motion } from "framer-motion";
import { clsx } from "clsx";
import { portfolioCards } from "@/data/slides";
import type { PortfolioStatus } from "@/types";
import { SlideWrapper } from "@/components/SlideWrapper";

function statusBadgeClass(status: PortfolioStatus) {
  switch (status) {
    case "ACTIVE":
      return "bg-deck-primary text-deck-text-on-dark";
    case "IN PROGRESS":
      return "bg-deck-cream text-[#888888]";
    case "COMPLETE":
      return "bg-[#F5F5F5] text-[#999999]";
    default:
      return "";
  }
}

export function Slide03Portfolio() {
  return (
    <SlideWrapper label="PORTFOLIO" className="bg-deck-bg-light">
      <h2 className="font-playfair text-[52px] leading-tight text-deck-primary">
        The bets.
      </h2>
      <div className="mt-9 grid grid-cols-1 gap-4 md:grid-cols-2">
        {portfolioCards.map((card, i) => (
          <motion.article
            key={card.name}
            className="box-border rounded-[12px] border border-deck-border bg-white px-7 py-6"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.4,
              delay: i * 0.1,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-playfair text-lg text-deck-primary">{card.name}</h3>
              <span
                className={clsx(
                  "shrink-0 rounded-[9999px] px-3 py-1 font-mono text-[10px] uppercase tracking-wide",
                  statusBadgeClass(card.status),
                )}
              >
                {card.status}
              </span>
            </div>
            <p className="mt-2 font-body text-sm italic leading-snug text-[#555555]">
              {card.thesis}
            </p>
            <p className="mt-1.5 font-body text-[13px] leading-relaxed text-[#888888]">
              {card.detail}
            </p>
            <p className="mt-3 border-t border-deck-cream pt-3 font-mono text-[11px] text-deck-card-metric">
              {card.metric}
            </p>
          </motion.article>
        ))}
      </div>
    </SlideWrapper>
  );
}
