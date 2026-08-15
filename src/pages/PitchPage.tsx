import { Link } from "react-router-dom";
import { TrackedLink } from "@/analytics/TrackedLink";

const pitchRoles = [
  ["/brand/matic-logo-white.svg", "Matic", "Software Engineering Intern", "2026 / Current"],
  ["/brand/legends-global-logo.svg", "Legends Global", "Business Intelligence Intern", "Summer 2026"],
  ["/brand/clinicalhours-logo.png", "ClinicalHours", "Co-founder", "2026 / Current"],
] as const;

export function PitchPage() {
  return (
    <main className="min-h-screen bg-[#111827] px-4 py-4 font-sans text-white sm:px-8 sm:py-7">
      <div className="mx-auto max-w-[1280px]">
        <header className="flex items-center justify-between border-b border-white/15 pb-4">
          <Link to="/" className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#b8c5e5] hover:text-white">
            ← Portfolio
          </Link>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#7080a5]">Evidence brief / 2026</p>
        </header>

        <section className="grid gap-8 py-10 lg:grid-cols-[1fr_1.05fr] lg:items-end lg:py-14">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#8fa9ff]">Product / Data / Operations</p>
            <h1 className="mt-5 max-w-[760px] text-[clamp(48px,6.5vw,92px)] font-semibold leading-[0.92] tracking-[-0.065em]">
              Systems <span className="text-[#8fa9ff]">engineer.</span>
            </h1>
            <p className="mt-6 max-w-[620px] text-[clamp(16px,1.7vw,22px)] leading-relaxed text-[#c3cbe0]">
              Software engineering at Matic on physician inbox tooling. Business intelligence at Legends Global across products, pricing, and revenue. Co-founder of ClinicalHours, the volunteer operating system for clinics with 600+ users.
            </p>
          </div>

          <div className="grid gap-3">
            {pitchRoles.map(([logo, company, role, date]) => (
              <article key={company} className="grid grid-cols-[74px_1fr_auto] items-center gap-4 border border-white/15 bg-white/[0.04] p-3">
                <div className="flex h-14 items-center justify-center bg-[#0c1220] p-2">
                  <img src={logo} alt={`${company} logo`} className={company === "ClinicalHours" ? "h-11 w-11 object-contain" : "max-h-9 w-full object-contain"} />
                </div>
                <div>
                  <h2 className="text-base font-semibold">{company}</h2>
                  <p className="mt-1 text-xs text-[#aeb8ce]">{role}</p>
                </div>
                <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-[#7180a0]">{date}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-3 border-t border-white/15 pt-5 md:grid-cols-3">
          <article className="min-h-[210px] bg-[#e3f0e8] p-6 text-[#153d2c]">
            <p className="font-mono text-[10px] uppercase tracking-[0.13em] text-[#1e6a4c]">ClinicalHours / Shipped</p>
            <h2 className="mt-8 text-2xl font-semibold tracking-[-0.035em]">Built from idea to clinic pilot.</h2>
            <p className="mt-3 text-sm leading-relaxed text-[#416453]">600+ users. Partner clinic live. Product, onboarding, scheduling, go-to-market work, and operations.</p>
          </article>
          <article className="min-h-[210px] bg-[#f4e3c8] p-6 text-[#3b2914]">
            <p className="font-mono text-[10px] uppercase tracking-[0.13em] text-[#8b500f]">Research / Presented</p>
            <h2 className="mt-8 text-2xl font-semibold tracking-[-0.035em]">Forecasting for real decisions.</h2>
            <p className="mt-3 text-sm leading-relaxed text-[#6c5438]">65 inputs. Six cost categories. Three model families. Walk-forward validation. Texas A&amp;M Student Research Week.</p>
          </article>
          <article className="min-h-[210px] bg-[#dfe7ff] p-6 text-[#172b68]">
            <p className="font-mono text-[10px] uppercase tracking-[0.13em] text-[#234fd1]">Projects / Built</p>
            <h2 className="mt-8 text-2xl font-semibold tracking-[-0.035em]">Eleven verified builds.</h2>
            <p className="mt-3 text-sm leading-relaxed text-[#3e5188]">Healthcare intake, rehabilitation hardware, fraud detection, identity, consumer finance, study tools, CAD, simulation, trading research, a multiplayer football sim, and agent tooling.</p>
          </article>
        </section>

        <footer className="mt-5 flex flex-col gap-4 border-t border-white/15 py-5 text-xs text-[#9ba7c3] sm:flex-row sm:items-center sm:justify-between">
          <p>Texas A&amp;M / Industrial &amp; Systems Engineering Honors</p>
          <div className="flex gap-5">
            <TrackedLink href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="text-white" tracking={{ eventName: "resume_viewed", properties: { placement: "pitch" } }}>Resume ↗</TrackedLink>
            <TrackedLink href="https://www.linkedin.com/in/shivamkanodia19/" target="_blank" rel="noopener noreferrer" className="text-white" tracking={{ eventName: "contact_clicked", properties: { channel: "linkedin" } }}>LinkedIn ↗</TrackedLink>
            <TrackedLink href="mailto:shivamkanodia77@gmail.com" className="text-white" tracking={{ eventName: "contact_clicked", properties: { channel: "email" } }}>Email ↗</TrackedLink>
          </div>
        </footer>
      </div>
    </main>
  );
}
