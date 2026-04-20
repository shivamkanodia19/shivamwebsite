import {
  askBody,
  askPills,
  contactLinks,
  portfolioCards,
  slide02Paragraphs,
  tractionStats,
  visionTimeline,
} from "@/data/slides";

const resumeEmbedSrc = "/resume.pdf#view=fitH";

export function ProfileSections() {
  return (
    <section className="bg-[#0a0a0a] px-6 py-14 md:px-12">
      <div className="mx-auto max-w-6xl space-y-14">
        <section className="rounded-xl border border-[#1f1f1f] bg-[#101010] p-6 md:p-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#5d5d5d]">About</p>
          <h2 className="mt-4 font-playfair text-[40px] text-[#f3f3f0] md:text-[54px]">Everything outside the pitch.</h2>
          <div className="mt-5 space-y-3">
            {slide02Paragraphs.map((line) => (
              <p key={line} className="font-mono text-[12px] leading-relaxed tracking-[0.06em] text-[#979797]">
                {line}
              </p>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-[#1f1f1f] bg-[#101010] p-6 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#5d5d5d]">Embedded resume</p>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded border border-[#3a3a3a] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-[#afafaf] transition-colors hover:border-[#f0f0ee] hover:text-[#f0f0ee]"
            >
              Open resume
            </a>
          </div>
          <div className="mt-4 overflow-hidden rounded-lg border border-[#252525] bg-[#0a0a0a]">
            <iframe
              title="Shivam Kanodia Resume"
              src={resumeEmbedSrc}
              className="h-[68vh] min-h-[540px] w-full"
            />
          </div>
          <p className="mt-2 font-mono text-[10px] tracking-[0.06em] text-[#666]">
            If the embed is blank, add your file at <span className="text-[#8b8b8b]">public/resume.pdf</span>.
          </p>
        </section>

        <section className="rounded-xl border border-[#1f1f1f] bg-[#101010] p-6 md:p-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#5d5d5d]">Portfolio</p>
          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
            {portfolioCards.map((card) => (
              <article key={card.name} className="rounded-lg border border-[#242424] bg-[#0d0d0d] p-5">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-playfair text-[22px] text-[#f3f3f0]">{card.name}</h3>
                  <span className="rounded-full border border-[#323232] px-2.5 py-1 font-mono text-[9px] tracking-[0.08em] text-[#9a9a9a]">
                    {card.status}
                  </span>
                </div>
                <p className="mt-2 text-[13px] italic text-[#a8a8a8]">{card.thesis}</p>
                <p className="mt-2 text-[12px] leading-relaxed text-[#7d7d7d]">{card.detail}</p>
                <p className="mt-3 border-t border-[#252525] pt-3 font-mono text-[10px] text-[#8e8e8e]">{card.metric}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <article className="rounded-xl border border-[#1f1f1f] bg-[#101010] p-6 md:p-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#5d5d5d]">Traction</p>
            <div className="mt-5 grid grid-cols-2 gap-4">
              {tractionStats.map((stat) => (
                <div key={stat.key} className="rounded-lg border border-[#242424] bg-[#0d0d0d] p-4">
                  <p className="font-playfair text-[34px] leading-none text-[#f3f3f0]">{stat.value}</p>
                  <p className="mt-2 font-mono text-[10px] text-[#7f7f7f]">{stat.label}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-xl border border-[#1f1f1f] bg-[#101010] p-6 md:p-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#5d5d5d]">Vision</p>
            <ul className="mt-5 space-y-4">
              {visionTimeline.map((item) => (
                <li key={item.date} className="rounded-lg border border-[#242424] bg-[#0d0d0d] p-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#9a9a9a]">{item.date}</p>
                  <p className="mt-2 text-[13px] leading-relaxed text-[#7f7f7f]">{item.body}</p>
                </li>
              ))}
            </ul>
          </article>
        </section>

        <section className="rounded-xl border border-[#1f1f1f] bg-[#101010] p-6 md:p-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#5d5d5d]">Ask</p>
          <div className="mt-4 space-y-4 text-[14px] leading-relaxed text-[#909090]">
            {askBody.split("\n\n").map((chunk) => (
              <p key={chunk}>{chunk}</p>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {askPills.map((pill) => (
              <span key={pill} className="rounded-full border border-[#363636] px-3 py-1.5 font-mono text-[10px] text-[#999]">
                {pill}
              </span>
            ))}
          </div>
          <div className="mt-6 grid gap-2 font-mono text-[12px] text-[#8e8e8e]">
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
