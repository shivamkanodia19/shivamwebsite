import { motion, useReducedMotion } from "framer-motion";
import { TrackedLink } from "@/analytics/TrackedLink";
import { CaseLink } from "@/components/CaseLink";

const roles = [
  {
    company: "Matic",
    role: "Software Engineering Intern",
    projectId: "matic",
    href: "/work/matic",
    logo: "/brand/matic-logo-white.svg",
    logoClass: "credential-logo-matic",
  },
  {
    company: "Legends Global",
    role: "Business Insights Intern",
    projectId: "legends",
    href: "/work/legends",
    logo: "/brand/legends-global-logo.svg",
    logoClass: "credential-logo-legends",
  },
  {
    company: "ClinicalHours",
    role: "Co-founder",
    projectId: "clinicalhours",
    href: "/work/clinicalhours",
    logo: "/brand/clinicalhours-logo.png",
    logoClass: "credential-logo-clinical",
  },
] as const;

export function Hero() {
  const reduceMotion = useReducedMotion();
  const reveal = (delay: number) => ({
    initial: { opacity: 0, y: reduceMotion ? 0 : 14 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section id="hero" className="hero-shell" aria-labelledby="hero-title">
      <div className="hero-grid-lines" aria-hidden="true" />
      <div className="site-container hero-grid">
        <div className="hero-copy">
          <motion.p {...reveal(0)} className="eyebrow">
            Product / Data / Operations
          </motion.p>
          <motion.h1 {...reveal(0.06)} id="hero-title" className="hero-title">
            Systems engineer.
          </motion.h1>
          <motion.p {...reveal(0.13)} className="hero-intro">
            Software engineering at Matic on a physician inbox. Food and beverage product and pricing work at Legends Global. Co-founder of ClinicalHours. Incoming Commercial Strategy &amp; Operations Intern at Zipline, Spring 2027.
          </motion.p>
          <motion.div {...reveal(0.2)} className="hero-actions">
            <TrackedLink href="#matic" className="button button-primary" tracking={{ eventName: "element_clicked", properties: { element_id: "hero-work", label: "Explore work", section_id: "hero", destination_type: "project" } }}>Explore work <span aria-hidden="true">↓</span></TrackedLink>
            <TrackedLink href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="button button-secondary" tracking={{ eventName: "resume_viewed", properties: { placement: "hero" } }}>View resume <span aria-hidden="true">↗</span></TrackedLink>
          </motion.div>
        </div>

        <motion.aside {...reveal(0.14)} className="hero-proof" aria-label="Current roles">
          <div className="hero-proof-heading">
            <div>
              <p className="proof-kicker">Shivam Kanodia</p>
              <p className="proof-title">Engineer. Analyst. Founder.</p>
            </div>
            <img src="/headshot.jpg" alt="Shivam Kanodia" className="hero-portrait" />
          </div>
          <TrackedLink
            className="incoming-role"
            href="https://www.zipline.com/"
            target="_blank"
            rel="noopener noreferrer"
            tracking={{
              eventName: "element_clicked",
              properties: {
                element_id: "hero-zipline",
                label: "Zipline",
                section_id: "hero",
                destination_type: "external",
              },
            }}
          >
            <span className="incoming-stamp">Incoming</span>
            <span className="incoming-logo-box">
              <img src="/brand/zipline-logo-dark.svg" alt="Zipline" />
            </span>
            <span className="incoming-copy">
              <strong>Zipline</strong>
              <small>Commercial Strategy &amp; Operations Intern · Spring 2027</small>
            </span>
            <span className="role-arrow" aria-hidden="true">↗</span>
          </TrackedLink>
          <div className="role-stack">
            {roles.map((item, index) => (
              <CaseLink key={item.company} to={item.href} className="role-card" projectId={item.projectId}>
                <span className="role-index">0{index + 1}</span>
                <span className="credential-logo-box">
                  <img src={item.logo} alt={`${item.company} logo`} className={item.logoClass} />
                </span>
                <span className="role-content">
                  <strong>{item.company}</strong>
                  <small>{item.role}</small>
                </span>
                <span className="role-arrow" aria-hidden="true">↘</span>
              </CaseLink>
            ))}
          </div>
          <p className="proof-footer">Texas A&amp;M / Industrial &amp; Systems Engineering Honors, Integrated M.S. Finance</p>
        </motion.aside>
      </div>
    </section>
  );
}
