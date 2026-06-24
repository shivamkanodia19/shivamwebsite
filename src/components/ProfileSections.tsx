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

function MaticWorkflow() {
  return (
    <div className="workflow-visual" aria-label="Public Matic product context from clinical input to physician review">
      <div className="workflow-label-row">
        <span>Public product context</span>
        <span>Physician in control</span>
      </div>
      <div className="workflow-track">
        {["Capture", "Structure", "Summarize", "Review"].map((step, index) => (
          <div key={step} className="workflow-step">
            <span>0{index + 1}</span>
            <strong>{step}</strong>
          </div>
        ))}
      </div>
      <div className="workflow-status"><span aria-hidden="true" />Company-level context only. Work details remain private.</div>
    </div>
  );
}

const clinicalMilestones = [
  { stamp: "3RD PLACE", name: "Good Bull Pitch", detail: "$200 award / March 2026" },
  { stamp: "FINALIST", name: "Ideas Challenge", detail: "McFerrin Center" },
  { stamp: "3 OF 60", name: "Meloy Bullet Pitch", detail: "Selected placement" },
  { stamp: "1 OF 3", name: "Meloy Kickstart Launch", detail: "Selected from 11 teams" },
  { stamp: "PILOT", name: "BCS Free Health Clinic", detail: "First clinic partner" },
  { stamp: "200+", name: "Student users", detail: "Conservative public milestone" },
];

const projects = [
  {
    name: "Clara",
    meta: "Healthcare workflow / Prototype",
    what: "AI voice intake concept for clinical pre-visit workflows.",
    owned: "System design from conversational intake to structured clinical information.",
    proof: "Working workflow prototype documented in the portfolio.",
  },
  {
    name: "Celvio",
    meta: "Medical product / February 2026",
    what: "Wearable NMES rehabilitation concept.",
    owned: "Product strategy, business case, PCB layout, and pulse generator circuitry.",
    proof: "$45 COGS target with a product demonstration and competition pitch.",
    image: "/img/celvio-deck.jpg",
    alt: "Celvio MedXplore presentation title slide listing Shivam Kanodia on the team",
  },
  {
    name: "FinSeek",
    meta: "Fraud detection / January 2026",
    what: "Full-stack fraud detection platform built for TAMUHack.",
    owned: "Model ensemble, API, risk dashboard, and containerized delivery.",
    proof: "95%+ precision and 99% fewer false positives, self-reported on PaySim.",
  },
  {
    name: "Persona",
    meta: "Digital identity / November 2025",
    what: "Cross-platform identity and reputation concept.",
    owned: "Product development, interactive prototype, pitch, and launch story.",
    proof: "Product@TAMU 24-hour Ideathon, 2nd place.",
    image: "/img/persona-win.jpg",
    alt: "Persona team holding certificates after placing second at the Product at TAMU Ideathon",
  },
];

const archiveProjects = [
  {
    name: "JPMorgan Chase App Redesign",
    meta: "Product@TAMU / August to November 2025",
    owned: "Semester-long Figma redesign, MVP, pitch deck, and AI assistant concept.",
    proof: "3rd place. Impact figures were estimates, not measured outcomes.",
  },
  {
    name: "Study Buddy",
    meta: "Google Labs Make-A-Thon / November 2025",
    owned: "Prompt design for personalized study guides and practice tests in a three-person team.",
    proof: "Built and presented on the Google Opal platform.",
  },
  {
    name: "Ignite Design Challenge",
    meta: "Engineering design / October 2025",
    owned: "CAD solution, technical documentation, and final presentation for a Formula SAE stability scenario.",
    proof: "Completed Texas A&amp;M first-year engineering design challenge.",
  },
  {
    name: "Blackjack Simulator",
    meta: "React application / June to September 2025",
    owned: "Single-page simulator with bankroll tracking, strategy guidance, and a testing mode.",
    proof: "Designed in Figma and deployed as a working application.",
  },
];

const recognition = [
  ["ClinicalHours", "Good Bull Pitch, 3rd place / Ideas Challenge finalist"],
  ["Meloy", "Bullet Pitch, 3 of 60 / Kickstart Launch, 1 of 3 from 11"],
  ["Persona", "Product@TAMU Ideathon, 2nd place"],
  ["Chase redesign", "Product@TAMU semester project, 3rd place"],
  ["Aggie Venture Fund", "Cohort 6"],
  ["EH EDGE", "One of 35 in the 2026 cohort"],
  ["Research", "Texas A&amp;M Student Research Week presenter"],
];

export function ProfileSections() {
  return (
    <div className="page-sections">
      <nav className="section-index" aria-label="Page sections">
        <a href="#matic">Work</a>
        <a href="#research">Research</a>
        <a href="#projects">Projects</a>
        <a href="#recognition">Recognition</a>
      </nav>

      <section id="work" className="section-block featured-work">
        <div className="site-container">
          <SectionHeading
            label="Featured experience"
            title="The record, in context."
            intro="Software inside clinical workflows. Business intelligence around live experiences. A healthcare product built from zero."
          />

          <div className="work-grid">
            <article id="matic" className="work-card work-card-matic">
              <div className="work-card-topline">
                <span className="proof-stamp">CURRENT</span>
                <span className="work-date">2026 / Current</span>
              </div>
              <div className="experience-brand experience-brand-matic">
                <a href="https://maticinside.ai/" target="_blank" rel="noopener noreferrer" aria-label="Visit Matic">
                  <img src="/brand/matic-logo-white.svg" alt="Matic" />
                </a>
                <span>Software Engineering Intern</span>
              </div>
              <div className="matic-layout">
                <div className="work-copy">
                  <h3>Software for clinical work that has to hold up in practice.</h3>
                  <p className="work-summary">Engineering in the context of Matic's public clinical intelligence platform, which spans documentation, coding, summarization, and care workflows.</p>
                  <div className="proof-list">
                    <p><span>Scope</span><strong>Healthcare software and physician-facing workflows</strong></p>
                    <p><span>Constraint</span><strong>Accuracy, speed, and human review all matter</strong></p>
                    <p><span>Safety</span><strong>Company-level context only</strong></p>
                  </div>
                </div>
                <MaticWorkflow />
              </div>
            </article>

            <article id="legends" className="work-card work-card-legends">
              <div className="work-card-topline">
                <span className="proof-stamp proof-stamp-dark">IN PROGRESS</span>
                <span className="work-date">Summer 2026</span>
              </div>
              <div className="experience-brand experience-brand-legends">
                <a href="https://legendsglobal.com/" target="_blank" rel="noopener noreferrer" aria-label="Visit Legends Global">
                  <img src="/brand/legends-global-logo.svg" alt="Legends Global" />
                </a>
                <span>Business Intelligence Intern</span>
              </div>
              <h3>Data in service of live hospitality decisions.</h3>
              <p className="work-summary">Supporting the hospitality team with business intelligence in the public context of sports and entertainment experiences.</p>
              <div className="decision-line" aria-label="Business intelligence flow">
                <span>Operating context</span><i aria-hidden="true" /><span>Useful signal</span><i aria-hidden="true" /><span>Clear decision</span>
              </div>
              <p className="safety-note">No internal venue data, recommendations, or performance metrics are published here.</p>
            </article>

            <article id="clinicalhours" className="work-card work-card-clinical">
              <div className="work-card-topline">
                <span className="proof-stamp proof-stamp-green">SHIPPED</span>
                <span className="work-date">2026 / Current</span>
              </div>
              <div className="experience-brand experience-brand-clinical">
                <a href="https://clinicalhours.org/" target="_blank" rel="noopener noreferrer" aria-label="Visit ClinicalHours">
                  <img src="/brand/clinicalhours-logo.png" alt="ClinicalHours logo" />
                  <strong>ClinicalHours</strong>
                </a>
                <span>Co-founder</span>
              </div>
              <h3>Volunteer infrastructure built around the clinic.</h3>
              <p className="work-summary">Co-building the application, onboarding, scheduling, and communication workflow connecting clinics with pre-health students.</p>
              <div className="clinical-ownership">
                <span>Product</span><span>Go to market</span><span>Operations</span><span>Pilot delivery</span>
              </div>
              <figure className="clinical-photo">
                <img src="/img/clinicalhours-pitch.jpg" alt="Shivam presenting ClinicalHours to judges" loading="lazy" />
                <figcaption>Pitching the product and clinic-side workflow.</figcaption>
              </figure>
            </article>
          </div>
        </div>
      </section>

      <section id="clinicalhours-recognition" className="section-block clinical-recognition-section">
        <div className="site-container">
          <SectionHeading
            label="ClinicalHours recognition"
            title="A product with public proof."
            intro="Exact placements, a clinic partner, and the conservative public user milestone. No inflated totals."
          />
          <div className="clinical-evidence-grid">
            <figure className="award-photo">
              <img src="/img/clinicalhours-win.jpg" alt="ClinicalHours team holding the Good Bull Pitch award check" loading="lazy" />
              <figcaption>Good Bull Pitch / 3rd place / $200</figcaption>
            </figure>
            <div className="milestone-rail" aria-label="ClinicalHours verified milestones">
              {clinicalMilestones.map((item) => (
                <article key={item.name} className="milestone-card">
                  <span>{item.stamp}</span>
                  <h3>{item.name}</h3>
                  <p>{item.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="research" className="section-block research-section">
        <div className="site-container">
          <SectionHeading
            label="Research"
            title="Two decision-support strands."
            intro="Applied modeling with Dr. Karun Kaniyamattam, presented with careful language about what is complete and what remains in progress."
          />
          <div className="research-grid">
            <article className="research-card research-cattle">
              <div className="research-copy">
                <div className="card-meta"><span className="proof-stamp proof-stamp-blue">PRESENTED</span><span>Texas A&amp;M Student Research Week</span></div>
                <h3>Cattle futures forecasting for feedlot decision support</h3>
                <p>A forecasting dashboard built from 65 inputs across six cost categories. SARIMA, LSTM, and XGBoost were compared through walk-forward validation.</p>
                <ul>
                  <li><span>Researcher</span>Shivam Kanodia</li>
                  <li><span>Faculty</span>Dr. Karun Kaniyamattam</li>
                  <li><span>Status</span>Research in progress</li>
                </ul>
              </div>
              <div className="poster-panel">
                <a href="/img/research-poster.jpg" target="_blank" rel="noopener noreferrer" className="poster-link">
                  <img src="/img/research-poster.jpg" alt="Full cattle futures forecasting research poster" width="483" height="378" loading="lazy" />
                  <span>View full poster <b aria-hidden="true">↗</b></span>
                </a>
                <p>Original available asset / 483 by 378 pixels / shown without crop</p>
              </div>
            </article>

            <article className="research-card research-dairy">
              <div className="card-meta"><span className="proof-stamp proof-stamp-amber">IN PROGRESS</span><span>Systems modeling</span></div>
              <h3>Dairy farm decision support</h3>
              <p>Building systems models and economic decision-support tools for dairy-farm management with Dr. Karun Kaniyamattam.</p>
              <div className="research-note">
                <span>Verified scope</span>
                <strong>Forecasting dashboards, decision-support tools, systems modeling, and machine learning.</strong>
              </div>
              <p className="safety-note">A formal title, model artifact, collaborator list, and publication status remain unpublished until confirmed.</p>
            </article>
          </div>
        </div>
      </section>

      <section id="projects" className="section-block projects-section">
        <div className="site-container">
          <SectionHeading
            label="Selected projects"
            title="Different problems. Concrete ownership."
            intro="Each build states the premise, the part Shivam owned, and the evidence behind the result."
          />

          <div className="featured-projects">
            {projects.slice(0, 2).map((project, index) => (
              <article key={project.name} className={`project-card project-card-featured project-card-${index + 1}`} tabIndex={0}>
                <div className="project-card-copy">
                  <p className="project-meta">{project.meta}</p>
                  <h3>{project.name}</h3>
                  <p className="project-premise">{project.what}</p>
                  <dl>
                    <div><dt>Owned</dt><dd>{project.owned}</dd></div>
                    <div><dt>Proof</dt><dd>{project.proof}</dd></div>
                  </dl>
                </div>
                {project.image ? <img src={project.image} alt={project.alt} loading="lazy" /> : (
                  <div className="clara-flow" aria-label="Clara workflow concept">
                    <span>Conversation</span><i aria-hidden="true">→</i><span>Structured intake</span><i aria-hidden="true">→</i><span>Clinical handoff</span>
                  </div>
                )}
              </article>
            ))}
          </div>

          <div className="medium-projects">
            {projects.slice(2).map((project) => (
              <article key={project.name} className="project-card project-card-medium" tabIndex={0}>
                {project.image ? <img src={project.image} alt={project.alt} loading="lazy" /> : null}
                <div className="project-card-copy">
                  <p className="project-meta">{project.meta}</p>
                  <h3>{project.name}</h3>
                  <p className="project-premise">{project.what}</p>
                  <dl>
                    <div><dt>Owned</dt><dd>{project.owned}</dd></div>
                    <div><dt>Proof</dt><dd>{project.proof}</dd></div>
                  </dl>
                </div>
              </article>
            ))}
          </div>

          <div className="archive-heading"><p className="eyebrow">More builds</p><span>04 archived projects</span></div>
          <div className="project-archive">
            {archiveProjects.map((project, index) => (
              <article key={project.name} className="archive-row">
                <span className="archive-index">0{index + 1}</span>
                <div><p>{project.meta}</p><h3>{project.name}</h3></div>
                <p><strong>Owned:</strong> {project.owned}</p>
                <p><strong>Proof:</strong> {project.proof}</p>
              </article>
            ))}
          </div>
          <a className="writing-link" href="https://medium.com/@shivamkanodia77/inside-fuzzingbrain-how-an-llm-powered-crs-detects-and-patches-vulnerabilities-at-scale-918fac5c5b1c" target="_blank" rel="noopener noreferrer">
            <span>Technical writing</span>
            <strong>Inside FuzzingBrain</strong>
            <span className="writing-action">Read on Medium ↗</span>
          </a>
        </div>
      </section>

      <section id="recognition" className="section-block recognition-section">
        <div className="site-container">
          <SectionHeading label="Recognition and programs" title="A concise index of verified proof." />
          <div className="recognition-list">
            {recognition.map(([name, result], index) => (
              <div key={name} className="recognition-row"><span>0{index + 1}</span><strong>{name}</strong><p>{result}</p></div>
            ))}
          </div>
          <a className="personal-proof" href="https://www.openpowerlifting.org/u/shivamkanodia" target="_blank" rel="noopener noreferrer">
            <span className="proof-stamp">PERSONAL PROOF</span>
            <strong>Three first-place USAPL meet results.</strong>
            <p>152.5 kg competition bench. The public record is linked, and the broader state-record label is intentionally not claimed.</p>
            <b aria-hidden="true">↗</b>
          </a>
        </div>
      </section>

      <section id="resume" className="resume-section">
        <div className="site-container resume-panel">
          <div>
            <p className="eyebrow">The short version</p>
            <h2>Roles, work, and proof in one page.</h2>
          </div>
          <div className="resume-actions">
            <p>Open the resume, scan LinkedIn, or start a direct conversation.</p>
            <div>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="button button-light">Open resume ↗</a>
              <a href="mailto:shivamkanodia77@gmail.com" className="text-link-light">Email Shivam →</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
