import { motion } from "framer-motion";

const roles = [
  { company: "Matic", role: "Software Engineering Intern", tone: "blue" },
  { company: "Legends Global", role: "Insights Intern", tone: "amber" },
  { company: "ClinicalHours", role: "Co-founder", tone: "green" },
] as const;

export function Hero() {
  return (
    <section id="hero" className="hero-shell" aria-labelledby="hero-title">
      <div className="hero-orb hero-orb-one" aria-hidden="true" />
      <div className="hero-orb hero-orb-two" aria-hidden="true" />

      <div className="site-container hero-grid">
        <div className="hero-copy">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="eyebrow"
          >
            Shivam Kanodia · Product-minded engineer
          </motion.p>

          <motion.h1
            id="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="hero-title"
          >
            I turn messy operations into <em>useful systems.</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.45 }}
            className="hero-intro"
          >
            I work across product, software, and analysis to make healthcare and hospitality workflows clearer, faster, and easier to run.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.26, duration: 0.45 }}
            className="seeking-note"
          >
            <span className="seeking-dot" aria-hidden="true" />
            <p><strong>What I’m looking for:</strong> product, strategy, and software engineering roles where technical execution meets real operating problems.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.34, duration: 0.45 }}
            className="hero-actions"
          >
            <a href="#work" className="button button-primary">Explore my work <span aria-hidden="true">↓</span></a>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="button button-secondary">View résumé <span aria-hidden="true">↗</span></a>
          </motion.div>
        </div>

        <motion.aside
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.18, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="hero-proof"
          aria-label="Current work"
        >
          <div className="hero-portrait-row">
            <img src="/headshot.jpg" alt="Shivam Kanodia" className="hero-portrait" />
            <div>
              <p className="proof-kicker">Currently building across</p>
              <p className="proof-domains">Healthcare · Hospitality · Operations</p>
            </div>
          </div>
          <div className="role-stack">
            {roles.map((item, index) => (
              <a key={item.company} href={`#${item.company === "ClinicalHours" ? "clinicalhours" : "work"}`} className={`role-card role-card-${item.tone}`}>
                <span className="role-index">0{index + 1}</span>
                <span className="role-content">
                  <strong>{item.company}</strong>
                  <small>{item.role}</small>
                </span>
                <span className="role-arrow" aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
          <p className="proof-footer">Texas A&amp;M · Industrial &amp; Systems Engineering Honors</p>
        </motion.aside>
      </div>
    </section>
  );
}
