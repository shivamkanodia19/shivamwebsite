import { motion, useReducedMotion } from "framer-motion";

const roles = [
  {
    company: "Matic",
    role: "Software Engineering Intern",
    href: "#matic",
    logo: "/brand/matic-logo-dark.svg",
    logoClass: "credential-logo-matic",
  },
  {
    company: "Legends Global",
    role: "Business Intelligence Intern",
    href: "#legends",
    logo: "/brand/legends-global-logo.svg",
    logoClass: "credential-logo-legends",
  },
  {
    company: "ClinicalHours",
    role: "Co-founder",
    href: "#clinicalhours",
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
            I build agentic systems.
          </motion.p>
          <motion.div {...reveal(0.2)} className="hero-actions">
            <a href="#matic" className="button button-primary">Explore work <span aria-hidden="true">↓</span></a>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="button button-secondary">View resume <span aria-hidden="true">↗</span></a>
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
          <div className="role-stack">
            {roles.map((item, index) => (
              <a key={item.company} href={item.href} className="role-card">
                <span className="role-index">0{index + 1}</span>
                <span className="credential-logo-box">
                  <img src={item.logo} alt={`${item.company} logo`} className={item.logoClass} />
                </span>
                <span className="role-content">
                  <strong>{item.company}</strong>
                  <small>{item.role}</small>
                </span>
                <span className="role-arrow" aria-hidden="true">↘</span>
              </a>
            ))}
          </div>
          <p className="proof-footer">Texas A&amp;M / Industrial &amp; Systems Engineering Honors</p>
        </motion.aside>
      </div>
    </section>
  );
}
