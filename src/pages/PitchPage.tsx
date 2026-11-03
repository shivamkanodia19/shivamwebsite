import { contactLinks } from "@/data/contact";
import { Link } from "react-router-dom";
import { TrackedLink } from "@/analytics/TrackedLink";
import { CaseLink } from "@/components/CaseLink";

const pitchRoles = [
  {
    logo: "/brand/zipline-logo.png",
    company: "Zipline",
    role: "Commercial Strategy & Operations Intern",
    date: "Incoming / Spring 2027",
    href: "https://www.zipline.com/",
    external: true,
  },
  {
    logo: "/brand/matic-logo-dark.svg",
    company: "Matic",
    role: "Software Engineering Intern",
    date: "Summer 2026",
    href: "/work/matic",
    projectId: "matic" as const,
  },
  {
    logo: "/brand/legends-global-logo-dark.svg",
    company: "Legends Global",
    role: "Business Insights Intern",
    date: "Summer 2026",
    href: "/work/legends",
    projectId: "legends" as const,
  },
  {
    logo: "/brand/clinicalhours-logo.png",
    company: "ClinicalHours",
    role: "Co-founder",
    date: "2025 to 2026",
    href: "/work/clinicalhours",
    projectId: "clinicalhours" as const,
  },
] as const;

export function PitchPage() {
  return (
    <main className="min-h-screen bg-[var(--paper)] px-4 py-4 font-sans text-[var(--ink)] sm:px-8 sm:py-7">
      <div className="mx-auto max-w-[1200px]">
        <header className="flex items-center justify-between border-b border-[var(--line)] pb-4">
          <Link to="/" className="font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--muted)] hover:text-[var(--ink)]">
            ← Portfolio
          </Link>
          <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--faint)]">Evidence brief / 2026</p>
        </header>

        <section className="grid gap-8 py-10 lg:grid-cols-[1fr_1.05fr] lg:items-end lg:py-14">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--accent)]">Product / Data / Operations</p>
            <h1 className="mt-5 max-w-[760px] font-serif text-[clamp(44px,5.5vw,68px)] font-semibold leading-[1.08] tracking-[-0.03em]">
              Shivam Kanodia
            </h1>
            <p className="mt-3 text-[clamp(20px,2vw,28px)] font-medium tracking-[-0.02em]">
              Systems engineer working across software, analytics, and operations.
            </p>
            <p className="mt-6 max-w-[620px] text-[clamp(16px,1.5vw,19px)] leading-relaxed text-[var(--muted)]">
              Software engineering at Matic on a physician inbox. Food and beverage product and pricing work at Legends Global. Co-founder of ClinicalHours. Incoming Commercial Strategy &amp; Operations Intern at Zipline, Spring 2027.
            </p>
          </div>

          <div className="grid gap-0">
            {pitchRoles.map((item) => {
              const body = (
                <>
                  <div className="flex h-12 w-16 items-center justify-center overflow-hidden rounded-[10px] border border-[var(--line)] bg-[var(--surface)] p-1.5">
                    <img
                      src={item.logo}
                      alt={`${item.company} logo`}
                      className="max-h-8 w-full object-contain"
                    />
                  </div>
                  <div>
                    <h2 className="text-base font-semibold tracking-[-0.02em]">{item.company}</h2>
                    <p className="mt-1 text-sm text-[var(--muted)]">{item.role}</p>
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-[var(--faint)]">{item.date}</span>
                </>
              );
              const className = "grid grid-cols-[64px_1fr_auto] items-center gap-4 border-b border-[var(--line)] py-3 first:border-t";
              if ("external" in item && item.external) {
                return (
                  <TrackedLink
                    key={item.company}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={className}
                    tracking={{ eventName: "element_clicked", properties: { element_id: "pitch-zipline", label: "Zipline", section_id: "pitch", destination_type: "external" } }}
                  >
                    {body}
                  </TrackedLink>
                );
              }
              return (
                <CaseLink key={item.company} to={item.href} className={className} projectId={"projectId" in item ? item.projectId : undefined}>
                  {body}
                </CaseLink>
              );
            })}
          </div>
        </section>

        <section className="grid gap-3 border-t border-[var(--line)] pt-5 md:grid-cols-3">
          <CaseLink to="/work/clinicalhours" className="min-h-[210px] rounded-[14px] border border-[var(--line)] bg-[var(--surface)] p-6" projectId="clinicalhours">
            <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--accent)]">ClinicalHours</p>
            <h2 className="mt-8 text-2xl font-semibold tracking-[-0.03em]">Built from idea to clinic pilot.</h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">700+ student users. At the pilot clinic, applications rose 325% to 150+ and recruiting time fell 50%.</p>
          </CaseLink>
          <CaseLink to="/work/matic" className="min-h-[210px] rounded-[14px] border border-[var(--line)] bg-[var(--surface)] p-6" projectId="matic">
            <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--accent)]">Matic</p>
            <h2 className="mt-8 text-2xl font-semibold tracking-[-0.03em]">A physician inbox in testing.</h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">Saves physicians about 90 min/day. 90% first-pass approval, 64% lower latency, 82% lower token cost.</p>
          </CaseLink>
          <CaseLink to="/work/legends" className="min-h-[210px] rounded-[14px] border border-[var(--line)] bg-[var(--copper-tint)] p-6" projectId="legends">
            <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--copper)]">Legends Global</p>
            <h2 className="mt-8 text-2xl font-semibold tracking-[-0.03em]">Stadium pricing decision.</h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">Pricing model across 1,400+ SKUs with a projected $3.6M in annual revenue uplift.</p>
          </CaseLink>
        </section>

        <footer className="mt-5 flex flex-col gap-4 border-t border-[var(--line)] py-5 text-sm text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>Texas A&amp;M / Industrial &amp; Systems Engineering Honors</p>
          <div className="flex gap-5">
            <TrackedLink href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="font-semibold text-[var(--ink)] underline-offset-3 hover:underline" tracking={{ eventName: "resume_viewed", properties: { placement: "pitch" } }}>Resume ↗</TrackedLink>
            <TrackedLink href={contactLinks.linkedin} target="_blank" rel="noopener noreferrer" className="font-semibold text-[var(--ink)] underline-offset-3 hover:underline" tracking={{ eventName: "contact_clicked", properties: { channel: "linkedin" } }}>LinkedIn ↗</TrackedLink>
            <TrackedLink href={`mailto:${contactLinks.email}`} className="font-semibold text-[var(--ink)] underline-offset-3 hover:underline" tracking={{ eventName: "contact_clicked", properties: { channel: "email" } }}>Email ↗</TrackedLink>
          </div>
        </footer>
      </div>
    </main>
  );
}
