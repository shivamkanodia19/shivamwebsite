import { motion } from "framer-motion";
import { contactLinks } from "@/data/slides";
import { SlideWrapper } from "@/components/SlideWrapper";

type Props = { isActive?: boolean; showHint?: boolean };

const ease = [0.16, 1, 0.3, 1] as const;

const links = [
  { label: "Email", href: `mailto:${contactLinks.email}`, display: contactLinks.email },
  { label: "Phone", href: `tel:${contactLinks.phoneTel}`, display: contactLinks.phoneDisplay },
  { label: "LinkedIn", href: contactLinks.linkedin, display: contactLinks.linkedinLabel },
];

export function Slide07Contact(_props: Props) {
  return (
    <SlideWrapper rootId="slide-contact" label="CONTACT" className="bg-[#080808]">
      {/* Grain overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
        }}
        aria-hidden
      />

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="mb-5 font-mono text-[10px] uppercase tracking-[0.35em] text-[#333]"
      >
        07 — Contact
      </motion.p>

      <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease }}
        >
          <h2
            className="font-playfair font-normal leading-[1.05] tracking-[-0.025em] text-[#F5F2EE]"
            style={{ fontSize: "clamp(42px, 5.5vw, 80px)" }}
          >
            Shivam
            <br />
            Kanodia.
          </h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65, duration: 0.5 }}
            className="mt-6 font-mono text-[9px] uppercase tracking-[0.3em] text-[#2a2a2a]"
          >
            Texas A&amp;M · ISE Honors · Class of 2029
          </motion.p>
        </motion.div>

        {/* Contact links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="flex flex-col gap-4"
        >
          {links.map((link, i) => (
            <motion.div
              key={link.label}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.12, duration: 0.5, ease }}
              className="flex items-baseline gap-4"
            >
              <span className="w-16 shrink-0 font-mono text-[9px] uppercase tracking-[0.25em] text-[#333]">
                {link.label}
              </span>
              <a
                href={link.href}
                target={link.label === "LinkedIn" ? "_blank" : undefined}
                rel={link.label === "LinkedIn" ? "noopener" : undefined}
                className="font-mono text-[12px] text-[#666] no-underline transition-colors duration-150 hover:text-[#F5F2EE] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#555]"
              >
                {link.display}
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Decorative large initials */}
      <div
        className="pointer-events-none absolute bottom-[-0.1em] right-[4vw] z-0 select-none font-playfair leading-none text-[#0f0f0f]"
        style={{ fontSize: "clamp(100px, 18vw, 260px)" }}
        aria-hidden
      >
        SK
      </div>
    </SlideWrapper>
  );
}
