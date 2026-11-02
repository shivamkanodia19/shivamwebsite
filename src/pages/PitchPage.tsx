import { Link } from "react-router-dom";
import { TrackedLink } from "@/analytics/TrackedLink";

const pitchRoles = [
  ["/brand/zipline-logo.png", "Zipline", "Commercial Strategy & Operations Intern", "Incoming / Spring 2027"],
  ["/brand/matic-logo-dark.svg", "Matic", "Software Engineering Intern", "Summer 2026"],
  ["/brand/legends-global-logo-dark.svg", "Legends Global", "Business Insights Intern", "Summer 2026"],
  ["/brand/clinicalhours-logo.png", "ClinicalHours", "Co-founder", "2025 to 2026"],
] as const;

export function PitchPage() {
  return (
    <main className="min-h-screen bg-[#F6F8F7] px-4 py-4 font-sans text-[#182526] sm:px-8 sm:py-7">
      <div className="mx-auto max-w-[1200px]">
        <header className="flex items-center justify-between border-b border-[#D9E2DF] pb-4">
          <Link to="/" className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#526261] hover:text-[#182526]">
            ← Portfolio
          </Link>
          <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-[#7A8A88]">Evidence brief / 2026</p>
        </header>

        <section className="grid gap-8 py-10 lg:grid-cols-[1fr_1.05fr] lg:items-end lg:py-14">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#006B63]">Product / Data / Operations</p>
            <h1 className="mt-5 max-w-[760px] font-[family-name:var(--font-display)] text-[clamp(44px,5.5vw,68px)] font-semibold leading-[1.08] tracking-[-0.03em]">
              Systems <span className="text-[#006B63]">engineer.</span>
            </h1>
            <p className="mt-6 max-w-[620px] text-[clamp(16px,1.5vw,19px)] leading-relaxed text-[#526261]">
              Software engineering at Matic on a physician inbox. Food and beverage product and pricing work at Legends Global. Co-founder of ClinicalHours. Incoming Commercial Strategy &amp; Operations Intern at Zipline, Spring 2027.
            </p>
          </div>

          <div className="grid gap-0">
            {pitchRoles.map(([logo, company, role, date]) => (
              <article key={company} className="grid grid-cols-[64px_1fr_auto] items-center gap-4 border-b border-[#D9E2DF] py-3 first:border-t">
                <div className="flex h-12 w-16 items-center justify-center overflow-hidden rounded-[10px] border border-[#D9E2DF] bg-white p-1.5">
                  <img
                    src={logo}
                    alt={`${company} logo`}
                    className={
                      company === "ClinicalHours" || company === "Zipline"
                        ? "h-full w-full object-cover"
                        : "max-h-7 w-full object-contain"
                    }
                  />
                </div>
                <div>
                  <h2 className="text-base font-semibold tracking-[-0.02em]">{company}</h2>
                  <p className="mt-1 text-sm text-[#526261]">{role}</p>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#7A8A88]">{date}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-3 border-t border-[#D9E2DF] pt-5 md:grid-cols-3">
          <article className="min-h-[210px] rounded-[14px] border border-[#D9E2DF] bg-white p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-[#006B63]">ClinicalHours / Shipped</p>
            <h2 className="mt-8 text-2xl font-semibold tracking-[-0.03em]">Built from idea to clinic pilot.</h2>
            <p className="mt-3 text-sm leading-relaxed text-[#526261]">700+ users. Partner clinic live. Product, onboarding, scheduling, go-to-market work, and operations.</p>
          </article>
          <article className="min-h-[210px] rounded-[14px] border border-[#D9E2DF] bg-[#F7EEE8] p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-[#A64B36]">Research / Presented</p>
            <h2 className="mt-8 text-2xl font-semibold tracking-[-0.03em]">Forecasting for real decisions.</h2>
            <p className="mt-3 text-sm leading-relaxed text-[#526261]">65 inputs. Six cost categories. Three model families. Walk-forward validation. Texas A&amp;M Student Research Week.</p>
          </article>
          <article className="min-h-[210px] rounded-[14px] border border-[#D9E2DF] bg-[#E6F1ED] p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-[#006B63]">Projects / Built</p>
            <h2 className="mt-8 text-2xl font-semibold tracking-[-0.03em]">Eleven verified builds.</h2>
            <p className="mt-3 text-sm leading-relaxed text-[#526261]">Healthcare intake, rehabilitation hardware, fraud detection, identity, consumer finance, study tools, CAD, simulation, trading research, a multiplayer football sim, and agent tooling.</p>
          </article>
        </section>

        <footer className="mt-5 flex flex-col gap-4 border-t border-[#D9E2DF] py-5 text-sm text-[#526261] sm:flex-row sm:items-center sm:justify-between">
          <p>Texas A&amp;M / Industrial &amp; Systems Engineering Honors</p>
          <div className="flex gap-5">
            <TrackedLink href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#182526] underline-offset-3 hover:underline" tracking={{ eventName: "resume_viewed", properties: { placement: "pitch" } }}>Resume ↗</TrackedLink>
            <TrackedLink href="https://www.linkedin.com/in/shivamkanodia19/" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#182526] underline-offset-3 hover:underline" tracking={{ eventName: "contact_clicked", properties: { channel: "linkedin" } }}>LinkedIn ↗</TrackedLink>
            <TrackedLink href="mailto:shivamkanodia77@gmail.com" className="font-semibold text-[#182526] underline-offset-3 hover:underline" tracking={{ eventName: "contact_clicked", properties: { channel: "email" } }}>Email ↗</TrackedLink>
          </div>
        </footer>
      </div>
    </main>
  );
}
