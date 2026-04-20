import { motion } from "framer-motion";
import { contactLinks } from "@/data/slides";
import { SlideWrapper } from "@/components/SlideWrapper";

export function Slide07Contact() {
  return (
    <SlideWrapper rootId="contact" label="CONTACT" labelTone="dark" className="bg-[#0D0D0D]">
      <div className="pointer-events-none absolute bottom-[-20px] right-[4vw] z-0 font-playfair text-[280px] leading-none text-[#111]" aria-hidden>
        SK
      </div>
      <div className="relative z-10 w-full text-center">
        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0 }}
          className="font-playfair text-[48px] font-normal text-[#FAFAF8] md:text-[68px]"
        >
          Shivam Kanodia
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.3, delay: 0.18 }}
          className="mx-auto mt-[22px] h-px w-10 bg-[#222]"
          aria-hidden
        />
        <motion.a
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.36 }}
          href={`mailto:${contactLinks.email}`}
          className="mx-auto mt-[10px] block w-fit font-mono text-[14px] text-[#555] no-underline transition-colors duration-150 hover:text-[#FAFAF8]"
        >
          {contactLinks.email}
        </motion.a>
        <motion.a
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.54 }}
          href={`tel:${contactLinks.phoneTel}`}
          className="mx-auto mt-[10px] block w-fit font-mono text-[14px] text-[#555] no-underline transition-colors duration-150 hover:text-[#FAFAF8]"
        >
          {contactLinks.phoneDisplay}
        </motion.a>
        <motion.a
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.72 }}
          href={contactLinks.linkedin}
          target="_blank"
          rel="noopener"
          className="mx-auto mt-[10px] block w-fit font-mono text-[14px] text-[#555] no-underline transition-colors duration-150 hover:text-[#FAFAF8]"
        >
          {contactLinks.linkedinLabel}
        </motion.a>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.9 }}
          className="mt-9 font-mono text-[10px] tracking-[0.22em] text-[#2a2a2a]"
        >
          TEXAS A&M · ISE HONORS · CLASS OF 2029
        </motion.p>
      </div>
    </SlideWrapper>
  );
}
