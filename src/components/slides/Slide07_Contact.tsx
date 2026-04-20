import { motion } from "framer-motion";
import { contactLinks } from "@/data/slides";
import { SlideWrapper } from "@/components/SlideWrapper";

const STEP = 0.18;

export function Slide07Contact() {
  return (
    <SlideWrapper
      label="CONTACT"
      labelTone="dark"
      className="bg-deck-bg-dark"
      contentClassName="text-center"
    >
      <div
        className="pointer-events-none absolute bottom-[-40px] right-[-20px] z-0 select-none font-playfair text-[320px] leading-none text-deck-deco-dark"
        aria-hidden
      >
        07
      </div>
      <div className="relative z-[1] mx-auto flex w-full max-w-xl flex-col items-center">
        <motion.h1
          className="font-playfair text-[64px] font-normal leading-tight text-deck-text-on-dark"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0 * STEP, ease: [0.25, 0.1, 0.25, 1] }}
        >
          Shivam Kanodia
        </motion.h1>
        <motion.div
          className="mx-auto mt-5 h-px w-12 bg-deck-divider-dark"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.35, delay: 1 * STEP, ease: [0.25, 0.1, 0.25, 1] }}
          aria-hidden
        />
        <motion.a
          href={`mailto:${contactLinks.email}`}
          className="mt-5 block font-mono text-sm text-deck-muted-on-dark no-underline transition-colors duration-150 hover:text-deck-text-on-dark"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 2 * STEP, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {contactLinks.email}
        </motion.a>
        <motion.a
          href={`tel:${contactLinks.phoneTel}`}
          className="mt-2.5 block font-mono text-sm text-deck-muted-on-dark no-underline transition-colors duration-150 hover:text-deck-text-on-dark"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 3 * STEP, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {contactLinks.phoneDisplay}
        </motion.a>
        <motion.a
          href={contactLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2.5 block font-mono text-sm text-deck-muted-on-dark no-underline transition-colors duration-150 hover:text-deck-text-on-dark"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 4 * STEP, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {contactLinks.linkedinLabel}
        </motion.a>
        <motion.p
          className="mt-8 font-mono text-[10px] uppercase tracking-[0.2em] text-deck-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, delay: 5 * STEP, ease: [0.25, 0.1, 0.25, 1] }}
        >
          TEXAS A&M · ISE HONORS · CLASS OF 2029
        </motion.p>
      </div>
    </SlideWrapper>
  );
}
