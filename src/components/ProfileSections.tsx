type SectionHeadingProps = {
  label: string;
  title: string;
  intro?: string;
};

function SectionHeading({ label, title, intro }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{label}</p>
      <div>
        <h2>{title}</h2>
        {intro ? <p>{intro}</p> : null}
      </div>
    </div>
  );
}

function WorkflowVisual() {
  return (
    <div className="workflow-visual" aria-label="Operational workflow from intake through resolution">
      <div className="workflow-label-row"><span>Operational workflow</span><span>Human in the loop</span></div>
      <div className="workflow-track">
        {["Intake", "Triage", "Draft", "Review", "Resolve"].map((step, index) => (
          <div key={step} className="workflow-step">
            <span>{index + 1}</span>
            <strong>{step}</strong>
          </div>
        ))}
      </div>
      <div className="workflow-pulse"><span /><p>Designing for the handoffs—not just the happy path.</p></div>
    </div>
  );
}

const principles = [
  {
    number: "01",
    title: "Map the real workflow",
    copy: "Start with the operators, handoffs, edge cases, and incentives—not a feature list.",
  },
  {
    number: "02",
    title: "Make ambiguity legible",
    copy: "Turn scattered data and conversations into a model people can inspect and act on.",
  },
  {
    number: "03",
    title: "Ship the useful version",
    copy: "Build, test, and tighten the system around what changes the operator’s next decision.",
  },
];

const projects = [
  { name: "Clara", type: "Healthcare workflow", copy: "A voice-based intake concept that turns patient conversations into structured pre-visit information." },
  { name: "Celvio", type: "Medical product", copy: "A wearable rehabilitation concept developed across product economics, hardware, and regulatory positioning." },
  { name: "FinSeek", type: "Decision system", copy: "A fraud detection pipeline designed to surface suspicious transactions while limiting false positives." },
];

export function ProfileSections() {
  return (
    <div className="page-sections">
      <section id="work" className="section-block featured-work">
        <div className="site-container">
          <SectionHeading
            label="Selected experience"
            title="Work with real operators and real constraints."
            intro="The common thread is operational clarity: understanding how work moves, identifying where it breaks, and building a better way through."
          />

          <div className="work-grid">
            <article className="work-card work-card-matic">
              <div className="work-card-topline">
                <span className="work-number">01 · Featured</span>
                <span className="role-pill">Software Engineering</span>
              </div>
              <div className="matic-layout">
                <div className="work-copy">
                  <p className="company-label">Matic</p>
                  <h3>Building software around complex healthcare workflows.</h3>
                  <p className="work-summary">Working on physician-facing operational systems where speed, accuracy, and human review all matter.</p>
                  <div className="contribution-list">
                    <div><span>Focus</span><strong>Healthcare workflow automation</strong></div>
                    <div><span>Approach</span><strong>Product thinking + engineering execution</strong></div>
                    <div><span>Environment</span><strong>High-context, operationally sensitive systems</strong></div>
                  </div>
                  <p className="confidential-note">Public-safe overview; implementation details remain private.</p>
                </div>
                <WorkflowVisual />
              </div>
            </article>

            <article className="work-card work-card-legends">
              <div className="work-card-topline">
                <span className="work-number">02</span>
                <span className="role-pill">Insights &amp; Strategy</span>
              </div>
              <p className="company-label">Legends Global</p>
              <h3>Turning venue data into clearer operating decisions.</h3>
              <p className="work-summary">Supporting hospitality insights across the questions that shape product, pricing, and venue operations.</p>
              <div className="insight-flow" aria-label="Data to decision process">
                <div><span>01</span><strong>Context</strong><small>What is happening?</small></div>
                <i aria-hidden="true">→</i>
                <div><span>02</span><strong>Insight</strong><small>What matters?</small></div>
                <i aria-hidden="true">→</i>
                <div><span>03</span><strong>Action</strong><small>What changes?</small></div>
              </div>
            </article>

            <article
              id="clinicalhours"
              className="work-card work-card-clinical"
            >
              <div className="work-card-topline">
                <span className="work-number">03</span>
                <span className="role-pill">Founder · Product &amp; Ops</span>
              </div>
              <p className="company-label">ClinicalHours</p>
              <h3>Volunteer infrastructure built around the clinic.</h3>
              <p className="work-summary">Co-building the application, onboarding, scheduling, and communication workflow connecting clinics with pre-health students.</p>
              <div className="clinical-proof">
                <img src="/img/clinicalhours-pitch.jpg" alt="Shivam presenting ClinicalHours to judges" />
                <div>
                  <p><strong>BCS Free Health Clinic</strong><span>Pilot partner</span></p>
                  <p><strong>Good Bull Pitch</strong><span>Winner</span></p>
                  <p><strong>End-to-end</strong><span>Product, GTM &amp; operations</span></p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="approach" className="section-block approach-section">
        <div className="site-container">
          <SectionHeading
            label="Operating style"
            title="How I approach messy systems."
            intro="I’m most useful where the problem crosses functions and the answer needs both structured thinking and hands-on execution."
          />
          <div className="principle-grid">
            {principles.map((item) => (
              <article
                key={item.title}
                className="principle-card"
              >
                <span>{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="research" className="section-block research-section">
        <div className="site-container">
          <SectionHeading label="Research" title="Rigorous models, grounded decisions." />
          <div className="research-grid">
            <article className="research-feature">
              <div className="research-copy">
                <p className="card-label">Forecasting · Applied ML</p>
                <h3>Cattle futures forecasting for feedlot decision support</h3>
                <p>Built a forecasting dashboard using 65 inputs across six cost categories, comparing time-series approaches through walk-forward validation.</p>
                <ul>
                  <li>SARIMA selected through comparative validation</li>
                  <li>Presented at Texas A&amp;M Student Research Week</li>
                </ul>
              </div>
              <img src="/img/research-poster.jpg" alt="Cattle futures forecasting research poster" />
            </article>
            <article className="research-secondary">
              <p className="card-label">System dynamics</p>
              <h3>Modeling stress across interconnected dairy systems</h3>
              <p>Exploring how economic and material shocks move through water, energy, and food systems using scenario-based models.</p>
              <div className="system-rings" aria-hidden="true"><span>Water</span><span>Energy</span><span>Food</span></div>
            </article>
          </div>
        </div>
      </section>

      <section id="projects" className="section-block projects-section">
        <div className="site-container">
          <SectionHeading
            label="Selected earlier builds"
            title="Experiments that sharpened the toolkit."
            intro="Compact explorations across healthcare, hardware, and decision systems."
          />
          <div className="project-list">
            {projects.map((project, index) => (
              <article key={project.name} className="project-row">
                <span className="project-index">0{index + 1}</span>
                <div><p>{project.type}</p><h3>{project.name}</h3></div>
                <p className="project-copy">{project.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="resume" className="resume-section">
        <div className="site-container resume-panel">
          <div>
            <p className="eyebrow">The short version</p>
            <h2>Looking for someone who can connect the system—and help build it?</h2>
          </div>
          <div className="resume-actions">
            <p>I’m interested in product, strategy, and software engineering roles tied to real operational problems.</p>
            <div>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="button button-light">Open résumé ↗</a>
              <a href="mailto:shivamkanodia77@gmail.com" className="text-link-light">Start a conversation →</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
