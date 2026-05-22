import { useEffect, useRef, useState } from "react";
import { animate, useInView, useMotionValue, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import {
  askBody,
  askPills,
  contactLinks,
  portfolioCards,
  slide02Paragraphs,
  tractionStats,
  visionTimeline,
} from "@/data/slides";

function parseStatValue(value: string): { prefix: string; target: number; suffix: string; decimals: number } {
  if (value.startsWith("R²=")) {
    const num = parseFloat(value.slice(3));
    return { prefix: "R²=", target: num, suffix: "", decimals: 2 };
  }
  if (value.endsWith("+")) {
    const num = parseFloat(value.slice(0, -1));
    return { prefix: "", target: num, suffix: "+", decimals: 0 };
  }
  const num = parseFloat(value);
  const decimals = value.includes(".") ? value.split(".")[1].length : 0;
  return { prefix: "", target: num, suffix: "", decimals };
}

function StatValue({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { prefix, target, suffix, decimals } = parseStatValue(value);
  const mv = useMotionValue(0);
  const display = useTransform(mv, (v) => {
    const formatted = decimals > 0 ? v.toFixed(decimals) : Math.round(v).toString();
    return `${prefix}${formatted}${suffix}`;
  });
  const [text, setText] = useState(value);

  useEffect(() => {
    return display.on("change", (v) => setText(v));
  }, [display]);

  useEffect(() => {
    if (isInView) {
      const controls = animate(mv, target, { duration: 1.2, ease: "easeOut" });
      return () => controls.stop();
    }
  }, [isInView, mv, target]);

  return <span ref={ref}>{text}</span>;
}

const ROLE_LABELS: Record<string, { role: string; tags: string[] }> = {
  ClinicalHours: {
    role: "Co-Founder · Product & Ops",
    tags: ["SaaS", "Claude API", "Gmail API", "Accelerator"],
  },
  "FEDVT Research": {
    role: "Lead Researcher",
    tags: ["SARIMA", "LSTM", "XGBoost", "R", "Walk-forward validation"],
  },
  FinSeek: {
    role: "ML Engineer",
    tags: ["LightGBM", "Isolation Forest", "Python", "200k+ rows"],
  },
  Clara: {
    role: "System Designer",
    tags: ["Twilio", "GPT-4o mini", "Epic FHIR", "Voice AI"],
  },
  Celvio: {
    role: "Product & Hardware",
    tags: ["Altium", "FDA 510K", "PCB", "Financial model"],
  },
  Persona: {
    role: "Product Designer",
    tags: ["Identity", "Trust & Safety", "Reputation Systems", "Product@TAMU"],
  },
};

export function ProfileSections() {
  return (
    <section className="bg-[#F9F6F0] px-6 py-14 md:px-12">
      <div className="mx-auto max-w-6xl space-y-14">

        {/* About */}
        <section id="about" className="rounded-xl border border-[#D8D0C4] bg-[#F0ECE3] p-6 md:p-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#8A8580]">About</p>
          <h2 className="mt-4 font-playfair text-[36px] leading-tight text-[#1C1C1A] md:text-[50px]">
            Freshman. Builder. Systems thinker.
          </h2>
          <div className="mt-6 space-y-4">
            {slide02Paragraphs.map((line) => (
              <p key={line} className="font-mono text-[13px] leading-relaxed tracking-[0.04em] text-[#555555]">
                {line}
              </p>
            ))}
          </div>
          <div className="mt-8">
            <Link
              to="/pitch"
              className="inline-block rounded border border-[#D8D0C4] px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.12em] text-[#5A5855] transition-colors hover:border-[#1C1C1A] hover:text-[#1C1C1A]"
            >
              View pitch →
            </Link>
          </div>
        </section>

        {/* Resume */}
        <section className="rounded-xl border border-[#D8D0C4] bg-[#F0ECE3] p-6 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#8A8580]">Resume</p>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded border border-[#D8D0C4] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-[#5A5855] transition-colors hover:border-[#1C1C1A] hover:text-[#1C1C1A]"
            >
              Open / Download
            </a>
          </div>
          <div className="mt-4 overflow-hidden rounded-lg border border-[#D8D0C4] bg-[#E8E2D8]">
            <iframe
              title="Shivam Kanodia Resume"
              src="/resume.pdf#view=fitH"
              className="h-[68vh] min-h-[540px] w-full"
            />
          </div>
          <p className="mt-3 font-mono text-[11px] leading-relaxed tracking-[0.04em] text-[#8A8580]">
            If the embed is blank,{" "}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1B4332] underline underline-offset-2 transition-colors hover:text-[#1C1C1A]"
            >
              open it directly
            </a>
            . File lives at{" "}
            <span className="text-[#8A8580]">public/resume.pdf</span>.
          </p>
        </section>

        {/* Portfolio */}
        <section id="portfolio" className="rounded-xl border border-[#D8D0C4] bg-[#F0ECE3] p-6 md:p-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#8A8580]">Selected Work</p>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {portfolioCards.map((card, i) => {
              const meta = ROLE_LABELS[card.name];
              return (
                <article
                  key={card.name}
                  className={`rounded-lg border bg-[#F9F6F0] ${i === 0 ? "md:col-span-2 p-6" : "p-5"} ${
                    i === 0 ? "border-[#C8BFAF]" : i < 2 ? "border-[#C8BFAF]" : "border-[#E8E2D8]"
                  }`}
                >
                  {i === 0 ? (
                    <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.2em] text-[#1B4332]">Featured Project</p>
                  ) : null}
                  <div className="flex items-start justify-between gap-3">
                    <h3
                      className={`font-playfair leading-tight text-[#1C1C1A] ${
                        i === 0 ? "text-[28px]" : "text-[22px]"
                      }`}
                    >
                      {card.name}
                    </h3>
                    <span
                      className={`mt-1 shrink-0 rounded-full border px-2.5 py-1 font-mono text-[9px] tracking-[0.08em] ${
                        card.status === "ACTIVE"
                          ? "border-[#2D6A4F] bg-[#E8F5EE] text-[#2D6A4F]"
                          : card.status === "IN PROGRESS"
                            ? "border-[#8B5E1A] bg-[#FBF3E8] text-[#8B5E1A]"
                            : "border-[#D8D0C4] text-[#8A8580]"
                      }`}
                    >
                      {card.status}
                    </span>
                  </div>

                  {meta?.role ? (
                    <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[#8A8580]">
                      {meta.role}
                    </p>
                  ) : null}

                  <p className="mt-3 text-[13px] italic leading-snug text-[#555555]">{card.thesis}</p>
                  <p className="mt-2 text-[12px] leading-relaxed text-[#5A5855]">{card.detail}</p>

                  {meta?.tags?.length ? (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {meta.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded border border-[#D8D0C4] px-2 py-0.5 font-mono text-[9px] tracking-[0.06em] text-[#8A8580]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  <p className="mt-3 border-t border-[#E8E2D8] pt-3 font-mono text-[11px] text-[#6A6560]">
                    {card.metric}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        {/* Traction + Vision */}
        <section className="grid gap-6 md:grid-cols-2">
          <article className="rounded-xl border border-[#D8D0C4] bg-[#F0ECE3] p-6 md:p-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#8A8580]">Traction</p>
            <div className="mt-5 grid grid-cols-2 gap-4">
              {tractionStats.map((stat) => (
                <div key={stat.key} className="rounded-lg border border-[#D8D0C4] bg-[#F9F6F0] p-4">
                  <p className="font-playfair text-[32px] leading-none text-[#1C1C1A]"><StatValue value={stat.value} /></p>
                  <p className="mt-2 font-mono text-[10px] leading-snug text-[#8A8580]">{stat.label}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-xl border border-[#D8D0C4] bg-[#F0ECE3] p-6 md:p-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#8A8580]">Direction</p>
            <ul className="mt-5 space-y-3">
              {visionTimeline.map((item) => (
                <li key={item.date} className="rounded-lg border border-[#D8D0C4] bg-[#F9F6F0] p-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#6A6560]">{item.date}</p>
                  <p className="mt-2 text-[13px] leading-relaxed text-[#5A5855]">{item.body}</p>
                </li>
              ))}
            </ul>
          </article>
        </section>

        {/* Ask / Contact */}
        <section id="contact" className="rounded-xl border border-[#D8D0C4] bg-[#F0ECE3] p-6 md:p-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#8A8580]">Available</p>
          <div className="mt-4 space-y-4 text-[14px] leading-relaxed text-[#555555]">
            {askBody.split("\n\n").map((chunk) => (
              <p key={chunk}>{chunk}</p>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {askPills.map((pill) => (
              <span
                key={pill}
                className="rounded-full border border-[#D8D0C4] px-3 py-1.5 font-mono text-[10px] text-[#6A6560]"
              >
                {pill}
              </span>
            ))}
          </div>
          <div className="mt-6 flex flex-col gap-3">
            <a
              href={`mailto:${contactLinks.email}`}
              className="inline-flex w-fit items-center gap-2 rounded border border-[#1B4332] bg-[#E8F3ED] px-5 py-2.5 font-mono text-[12px] tracking-[0.08em] text-[#1B4332] transition-colors hover:bg-[#1B4332] hover:text-white"
            >
              Email me →
            </a>
            <div className="mt-2 grid gap-2 font-mono text-[13px] text-[#5A5855]">
              <a href={`tel:${contactLinks.phoneTel}`} className="w-fit transition-colors hover:text-[#1C1C1A]">
                {contactLinks.phoneDisplay}
              </a>
              <a
                href={contactLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit transition-colors hover:text-[#1C1C1A]"
              >
                {contactLinks.linkedinLabel}
              </a>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
