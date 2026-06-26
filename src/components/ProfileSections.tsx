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

const clinicalMilestones = [
  { value: "3RD", name: "Good Bull Pitch", detail: "$200 award" },
  { value: "FINALIST", name: "Ideas Challenge", detail: "McFerrin Center" },
  { value: "3 OF 60", name: "Meloy Bullet Pitch", detail: "Selected placement" },
  { value: "1 OF 3", name: "Meloy Kickstart Launch", detail: "Selected from 11" },
] as const;

const featuredProjects = [
  {
    name: "Clara",
    type: "Healthcare workflow",
    description: "AI voice intake concept for clinical pre-visit workflows.",
    ownership: "Designed the flow from conversation to structured clinical information.",
    proof: "Working workflow prototype",
  },
  {
    name: "FinSeek",
    type: "Fraud detection",
    description: "Full-stack fraud detection platform built for TAMUHack.",
    ownership: "Built the model ensemble, API, risk dashboard, and containerized delivery.",
    proof: "95%+ precision on PaySim, self-reported",
  },
  {
    name: "Celvio",
    type: "Medical product",
    description: "Wearable NMES rehabilitation concept.",
    ownership: "Owned product strategy, business case, PCB layout, and pulse generator circuitry.",
    proof: "$45 COGS target and product demonstration",
  },
] as const;

const archiveProjects = [
  ["Persona", "Digital identity concept", "Product@TAMU Ideathon, 2nd place"],
  ["JPMorgan Chase App Redesign", "Consumer finance product", "Product@TAMU, 3rd place"],
  ["Study Buddy", "Personalized AI study tools", "Built and presented at Google Labs Make-A-Thon"],
  ["Blackjack Simulator", "React training simulator", "Designed in Figma and deployed"],
] as const;

export function ProfileSections() {
  return (
    <div className="page-sections">
      <section id="work" className="section-block featured-work">
        <div className="site-container">
          <SectionHeading
            label="Experience"
            title="Engineering, intelligence, and ownership."
            intro="Two internships inside complex operating environments, followed by a product built all the way to a clinic pilot."
          />

          <div className="experience-grid">
            <article id="matic" className="experience-card matic-card">
              <div className="experience-card-topline">
                <span className="proof-stamp proof-stamp-light">CURRENT</span>
                <span>2026</span>
              </div>
              <a className="experience-logo matic-logo" href="https://maticinside.ai/" target="_blank" rel="noopener noreferrer" aria-label="Visit Matic">
                <img src="/brand/matic-logo-white.svg" alt="Matic" />
              </a>
              <p className="role-label">Software Engineering Intern</p>
              <h3>Building software for clinical workflows where accuracy and speed both matter.</h3>
              <p className="experience-summary">Software engineering inside Matic&apos;s clinical intelligence platform, where healthcare context, product requirements, and software quality meet.</p>
              <div className="experience-signals" aria-label="Matic role scope">
                <span>Production software</span>
                <span>Clinical workflows</span>
                <span>Product quality</span>
              </div>
            </article>

            <article id="legends" className="experience-card legends-card">
              <div className="experience-card-topline">
                <span className="proof-stamp proof-stamp-dark">SUMMER 2026</span>
                <span>IN PROGRESS</span>
              </div>
              <a className="experience-logo legends-logo" href="https://legendsglobal.com/" target="_blank" rel="noopener noreferrer" aria-label="Visit Legends Global">
                <img src="/brand/legends-global-logo.svg" alt="Legends Global" />
              </a>
              <p className="role-label">Business Intelligence Intern</p>
              <h3>Turning venue intelligence into clearer operating decisions.</h3>
              <p className="experience-summary">Business intelligence at the world&apos;s largest venue consulting firm, connecting analysis to decisions behind venue, hospitality, and guest operations.</p>
              <div className="legends-signal" aria-label="Business intelligence from data to operating decision">
                <span>Data</span><i aria-hidden="true" /><span>Signal</span><i aria-hidden="true" /><span>Decision</span>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="clinicalhours" className="section-block clinical-section">
        <div className="site-container">
          <SectionHeading
            label="ClinicalHours"
            title="Built from idea to clinic pilot."
            intro="Product, users, operations, and recognition in one founder story."
          />

          <article className="clinical-case">
            <div className="clinical-story">
              <div className="clinical-brand">
                <a href="https://clinicalhours.org/" target="_blank" rel="noopener noreferrer" aria-label="Visit ClinicalHours">
                  <img src="/brand/clinicalhours-logo.png" alt="ClinicalHours logo" />
                  <strong>ClinicalHours</strong>
                </a>
                <span>Co-founder</span>
              </div>
              <h3>Built the operating layer between clinics and student volunteers.</h3>
              <p>Co-founded ClinicalHours and owned the product, onboarding, scheduling, go-to-market work, and pilot rollout from first build to first clinic partner and 500+ users.</p>
              <div className="clinical-stats" aria-label="ClinicalHours traction">
                <div><strong>500+</strong><span>users</span></div>
                <div><strong>01</strong><span>first clinic pilot partner</span></div>
                <div><strong>05</strong><span>ownership areas</span></div>
              </div>
            </div>

            <figure className="product-proof">
              <img src="/img/clinicalhours-product.png" alt="ClinicalHours opportunity map interface" width="1800" height="1039" />
              <figcaption><span>LIVE PRODUCT</span> Opportunity discovery and tracking across clinical sites.</figcaption>
            </figure>

            <div className="clinical-ownership" aria-label="ClinicalHours founder ownership">
              <span>Product</span><span>Onboarding</span><span>Scheduling</span><span>Go to market</span><span>Pilot rollout</span>
            </div>

            <div className="clinical-proof-row">
              <div className="milestone-rail" aria-label="ClinicalHours recognition">
                {clinicalMilestones.map((item) => (
                  <article key={item.name} className="milestone-card">
                    <span>{item.value}</span>
                    <h4>{item.name}</h4>
                    <p>{item.detail}</p>
                  </article>
                ))}
              </div>
              <figure className="pitch-proof">
                <img src="/img/clinicalhours-pitch.jpg" alt="Shivam presenting ClinicalHours to judges" loading="lazy" />
                <figcaption>Presenting the product and clinic workflow.</figcaption>
              </figure>
            </div>
          </article>
        </div>
      </section>

      <section id="research" className="section-block research-section">
        <div className="site-container">
          <SectionHeading
            label="Research"
            title="Models built for real decisions."
            intro="Forecasting, validation, and decision support with Dr. Karun Kaniyamattam."
          />
          <div className="research-grid">
            <article className="research-primary">
              <div className="research-copy">
                <p className="card-kicker">PRESENTED / STUDENT RESEARCH WEEK</p>
                <h3>Cattle futures forecasting for feedlot planning.</h3>
                <p>Built a 65-input forecasting dashboard and compared SARIMA, LSTM, and XGBoost through walk-forward validation for feedlot cattle futures planning.</p>
                <div className="research-metrics">
                  <span><strong>65</strong> inputs</span>
                  <span><strong>06</strong> cost categories</span>
                  <span><strong>03</strong> model families</span>
                </div>
              </div>
              <a href="/img/research-poster.jpg" target="_blank" rel="noopener noreferrer" className="poster-link">
                <img src="/img/research-poster.jpg" alt="Full cattle futures forecasting research poster" width="483" height="378" loading="lazy" />
                <span>View full poster <b aria-hidden="true">↗</b></span>
              </a>
            </article>
            <article className="research-secondary">
              <p className="card-kicker">RESEARCH IN PROGRESS</p>
              <h3>Dairy farm decision support.</h3>
              <p>Extending the research into systems models and economic decision tools for dairy management.</p>
            </article>
          </div>
        </div>
      </section>

      <section id="projects" className="section-block projects-section">
        <div className="site-container">
          <SectionHeading
            label="Projects"
            title="A wider build range."
            intro="Supporting proof across healthcare, machine learning, hardware, and consumer products."
          />
          <div className="featured-projects">
            {featuredProjects.map((project, index) => (
              <article key={project.name} className="project-card" tabIndex={0}>
                <div className="project-index">0{index + 1}</div>
                <p className="project-meta">{project.type}</p>
                <h3>{project.name}</h3>
                <p className="project-description">{project.description}</p>
                <p className="project-owned">{project.ownership}</p>
                <strong>{project.proof}</strong>
              </article>
            ))}
          </div>

          <div className="archive-heading"><p className="eyebrow">More builds</p><span>04 selected</span></div>
          <div className="project-archive">
            {archiveProjects.map(([name, type, proof], index) => (
              <article key={name} className="archive-row">
                <span>0{index + 1}</span><h3>{name}</h3><p>{type}</p><strong>{proof}</strong>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="recognition" className="section-block recognition-section">
        <div className="site-container">
          <SectionHeading
            label="Outside work"
            title="Strength outside the screen."
            intro="A compact personal proof point: consistent training, competition, and measurable progress."
          />
          <a className="personal-proof" href="https://www.openpowerlifting.org/u/shivamkanodia" target="_blank" rel="noopener noreferrer">
            <span className="proof-stamp proof-stamp-light">USAPL</span>
            <strong>Three first-place USAPL meet results.</strong>
            <p>152.5 kg competition bench.</p>
            <b aria-hidden="true">↗</b>
          </a>
        </div>
      </section>

      <section id="resume" className="resume-section">
        <div className="site-container resume-panel">
          <div>
            <p className="eyebrow">Contact</p>
            <h2>See the full record.</h2>
          </div>
          <div className="contact-actions">
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">Resume <span aria-hidden="true">↗</span></a>
            <a href="https://www.linkedin.com/in/shivamkanodia19/" target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
            <a href="mailto:shivamkanodia77@gmail.com">Email <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>
    </div>
  );
}
