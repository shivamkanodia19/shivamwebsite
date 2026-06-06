import { motion } from "framer-motion";
import { SlideWrapper } from "@/components/SlideWrapper";

type Props = { isActive?: boolean; showHint?: boolean };

const ease = [0.16, 1, 0.3, 1] as const;

const credentials = [
  {
    label: "Incoming Intern",
    value: "Legends Global",
    sub: "Business Intelligence · Summer 2026",
    accent: true,
  },
  {
    label: "GPA",
    value: "3.7",
    sub: "ISE Honors · Freshman",
    accent: false,
  },
  {
    label: "Students",
    value: "400+",
    sub: "ClinicalHours · BCS Free Health Clinic pilot",
    accent: false,
  },
  {
    label: "Competition Wins",
    value: "5+",
    sub: "First semester · Multiple categories",
    accent: false,
  },
];

export function Slide02Founder(_props: Props) {
  return (
    <SlideWrapper label="FOUNDER" className="bg-[#F5F2EE]">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_1fr] md:gap-16">

        {/* Left: identity */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease }}
          className="flex flex-col justify-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease }}
            className="mb-5 w-fit"
          >
            <img
              src="/headshot.jpg"
              alt="Shivam Kanodia"
              className="h-[88px] w-[88px] rounded-2xl object-cover object-[center_15%]"
              style={{ filter: "grayscale(100%)" }}
            />
          </motion.div>
          <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.35em] text-[#AAA]">
            02 — Founder
          </p>
          <h2
            className="font-playfair font-normal leading-[1.05] tracking-[-0.02em] text-[#111]"
            style={{ fontSize: "clamp(40px, 5vw, 72px)" }}
          >
            The
            <br />
            Founder.
          </h2>

          {/* Divider */}
          <div className="my-7 h-px w-10 bg-[#CCC]" aria-hidden />

          <p className="font-mono text-[11px] leading-[1.9] text-[#888]">
            Texas A&amp;M · ISE Honors
            <br />
            Aggie Venture Fund Cohort 6
            <br />
            EH EDGE · Investment Management
          </p>
        </motion.div>

        {/* Right: credential callout grid */}
        <div className="grid grid-cols-2 gap-3">
          {credentials.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 + i * 0.1, duration: 0.5, ease }}
              className={
                c.accent
                  ? "flex flex-col justify-between rounded-xl border border-[#2D6A50]/30 bg-[#2D6A50]/8 px-5 py-5"
                  : "flex flex-col justify-between rounded-xl border border-[#E0DAD2] bg-white px-5 py-5"
              }
              style={c.accent ? { backgroundColor: "rgba(45,106,80,0.06)" } : undefined}
            >
              <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-[#AAA]">
                {c.label}
              </p>
              <div className="mt-3">
                <p
                  className={
                    c.accent
                      ? "font-playfair text-[clamp(18px,2.2vw,28px)] font-normal leading-tight text-[#2D6A50]"
                      : "font-playfair text-[clamp(18px,2.2vw,28px)] font-normal leading-tight text-[#111]"
                  }
                >
                  {c.value}
                </p>
                <p className="mt-1.5 font-mono text-[9px] leading-[1.7] text-[#AAA]">
                  {c.sub}
                </p>
                {c.accent && (
                  <img
                    src="/img/legends-logo-black.jpg"
                    alt="Legends Global"
                    className="mt-3 h-10 w-auto object-contain opacity-80"
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SlideWrapper>
  );
}
