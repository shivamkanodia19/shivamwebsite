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
};

export function ProfileSections() {
  return (
    <section className="bg-[#0a0a0a] px-6 py-14 md:px-12">
      <div className="mx-auto max-w-6xl space-y-14">

        {/* About */}
        <section id="about" className="rounded-xl border border-[#1f1f1f] bg-[#101010] p-6 md:p-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#5d5d5d]">About</p>
          <h2 className="mt-4 font-playfair text-[36px] leading-tight text-[#f3f3f0] md:text-[50px]">
            Everything outside the pitch.
          </h2>
          <div className="mt-6 space-y-4">
            {slide02Paragraphs.map((line) => (
              <p key={line} className="font-mono text-[13px] leading-relaxed tracking-[0.04em] text-[#b0b0b0]">
                {line}
              </p>
            ))}
          </div>
          <div className="mt-8">
            <Link
              to="/pitch"
              className="inline-block rounded border border-[#3a3a3a] px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.12em] text-[#afafaf] transition-colors hover:border-[#f0f0ee] hover:text-[#f0f0ee]"
            >
              View pitch →
            </Link>
          </div>
        </section>

        {/* Resume */}
        <section className="rounded-xl border border-[#1f1f1f] bg-[#101010] p-6 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#5d5d5d]">Resume</p>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded border border-[#3a3a3a] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-[#afafaf] transition-colors hover:border-[#f0f0ee] hover:text-[#f0f0ee]"
            >
              Open / Download
            </a>
          </div>
          <div className="mt-4 overflow-hidden rounded-lg border border-[#252525] bg-[#0a0a0a]">
            <iframe
              title="Shivam Kanodia Resume"
              src="/resume.pdf#view=fitH"
              className="h-[68vh] min-h-[540px] w-full"
            />
          </div>
          <p className="mt-3 font-mono text-[11px] leading-relaxed tracking-[0.04em] text-[#666]">
            If the embed is blank,{" "}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#9a9a9a] underline underline-offset-2 transition-colors hover:text-[#f0f0ee]"
            >
              open it directly
            </a>
            . File lives at{" "}
            <span className="text-[#7a7a7a]">public/resume.pdf</span>.
          </p>
        </section>

        {/* Portfolio */}
        <section id="portfolio" className="rounded-xl border border-[#1f1f1f] bg-[#101010] p-6 md:p-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#5d5d5d]">Selected Work</p>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {portfolioCards.map((card, i) => {
              const meta = ROLE_LABELS[card.name];
              const isPrimary = i < 2;
              return (
                <article
                  key={card.name}
                  className={`rounded-lg border bg-[#0d0d0d] p-5 ${
                    isPrimary ? "border-[#3d3d3d]" : "border-[#1e1e1e]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-playfair text-[22px] leading-tight text-[#f3f3f0]">{card.name}</h3>
                    <span
                      className={`mt-1 shrink-0 rounded-full border px-2.5 py-1 font-mono text-[9px] tracking-[0.08em] ${
                        card.status === "ACTIVE"
                          ? "border-[#2a4a2a] text-[#6aaa6a]"
                          : card.status === "IN PROGRESS"
                            ? "border-[#4a3a1a] text-[#c09060]"
                            : "border-[#323232] text-[#7a7a7a]"
                      }`}
                    >
                      {card.status}
                    </span>
                  </div>

                  {meta?.role ? (
                    <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[#5a5a5a]">
                      {meta.role}
                    </p>
                  ) : null}

                  <p className="mt-3 text-[13px] italic leading-snug text-[#b8b8b8]">{card.thesis}</p>
                  <p className="mt-2 text-[12px] leading-relaxed text-[#888]">{card.detail}</p>

                  {meta?.tags?.length ? (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {meta.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded border border-[#2a2a2a] px-2 py-0.5 font-mono text-[9px] tracking-[0.06em] text-[#666]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  <p className="mt-3 border-t border-[#1e1e1e] pt-3 font-mono text-[11px] text-[#9e9e9e]">
                    {card.metric}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        {/* Traction + Vision */}
        <section className="grid gap-6 md:grid-cols-2">
          <article className="rounded-xl border border-[#1f1f1f] bg-[#101010] p-6 md:p-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#5d5d5d]">Traction</p>
            <div className="mt-5 grid grid-cols-2 gap-4">
              {tractionStats.map((stat) => (
                <div key={stat.key} className="rounded-lg border border-[#242424] bg-[#0d0d0d] p-4">
                  <p className="font-playfair text-[32px] leading-none text-[#f3f3f0]">{stat.value}</p>
                  <p className="mt-2 font-mono text-[10px] leading-snug text-[#7f7f7f]">{stat.label}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-xl border border-[#1f1f1f] bg-[#101010] p-6 md:p-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#5d5d5d]">Direction</p>
            <ul className="mt-5 space-y-3">
              {visionTimeline.map((item) => (
                <li key={item.date} className="rounded-lg border border-[#242424] bg-[#0d0d0d] p-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#9a9a9a]">{item.date}</p>
                  <p className="mt-2 text-[13px] leading-relaxed text-[#8a8a8a]">{item.body}</p>
                </li>
              ))}
            </ul>
          </article>
        </section>

        {/* Ask / Contact */}
        <section id="contact" className="rounded-xl border border-[#1f1f1f] bg-[#101010] p-6 md:p-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#5d5d5d]">Ask</p>
          <div className="mt-4 space-y-4 text-[14px] leading-relaxed text-[#a0a0a0]">
            {askBody.split("\n\n").map((chunk) => (
              <p key={chunk}>{chunk}</p>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {askPills.map((pill) => (
              <span
                key={pill}
                className="rounded-full border border-[#363636] px-3 py-1.5 font-mono text-[10px] text-[#999]"
              >
                {pill}
              </span>
            ))}
          </div>
          <div className="mt-6 grid gap-3 font-mono text-[13px] text-[#8e8e8e]">
            <a href={`mailto:${contactLinks.email}`} className="w-fit transition-colors hover:text-[#f3f3f0]">
              {contactLinks.email}
            </a>
            <a href={`tel:${contactLinks.phoneTel}`} className="w-fit transition-colors hover:text-[#f3f3f0]">
              {contactLinks.phoneDisplay}
            </a>
            <a
              href={contactLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit transition-colors hover:text-[#f3f3f0]"
            >
              {contactLinks.linkedinLabel}
            </a>
          </div>
        </section>
      </div>
    </section>
  );
}
