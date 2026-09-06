import { TrackedLink } from "@/analytics/TrackedLink";
import { captureAnalyticsEvent } from "@/analytics/client";
import { useSectionTracking } from "@/analytics/useSectionTracking";

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
  { value: "$500", name: "Meloy Launch Accelerator", detail: "Program award" },
] as const;

const featuredProjects = [
  {
    id: "clara",
    name: "Clara",
    type: "Healthcare workflow",
    description: "AI voice intake concept for clinical pre-visit workflows.",
    ownership: "Designed the flow from conversation to structured clinical information.",
    proof: "Working workflow prototype",
  },
  {
    id: "finseek",
    name: "FinSeek",
    type: "Fraud detection",
    description: "Full-stack fraud detection platform built for TAMUHack.",
    ownership: "Built the model ensemble, API, risk dashboard, and containerized delivery.",
    proof: "95%+ precision on PaySim, self-reported",
  },
  {
    id: "celvio",
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

type Build = {
  kicker: string;
  title: string;
  line: string;
  chips: [string, string, string];
  shot?: { src: string; alt: string };
  diagram?: boolean;
  href?: string;
  linkLabel?: string;
};

const builds: Build[] = [
  {
    kicker: "Autonomous trading",
    title: "Agents propose. Rails decide.",
    line: "A stock and options trader where a deterministic risk engine has the final call on every order.",
    chips: ["Stocks + options", "Risk-gated", "294 tests"],
    diagram: true,
  },
  {
    kicker: "Multiplayer game",
    title: "Retro Bowl, but better.",
    line: "A two-player online football game running on a real-time physics engine.",
    chips: ["2-player online", "Real-time sim", "120 FPS"],
    shot: { src: "/img/sideline-saturday-catch.png", alt: "Sideline Saturday gameplay" },
  },
  {
    kicker: "Social trading",
    title: "Strava for paper trading.",
    line: "A social paper-trading app with a live feed and a verified-only leaderboard.",
    chips: ["$100k accounts", "Verified leaderboard", "Risk-adjusted"],
    shot: { src: "/img/alphaforge-leaderboard.png", alt: "AlphaForge leaderboard" },
  },
  {
    kicker: "Multiplayer card game",
    title: "Poker and blackjack, coached.",
    line: "Multiplayer Hold'em with an AI opponent, plus blackjack with live strategy hints.",
    chips: ["Realtime multiplayer", "Poker AI", "56 engine tests"],
    shot: { src: "/img/felt-blackjack.png", alt: "Felt blackjack table" },
    href: "https://felt.bet",
    linkLabel: "Play",
  },
];

type Tool = { name: string; blurb: string; mark: string; href?: string; linkLabel?: string };

const tools: Tool[] = [
  {
    name: "Sticky Markdown Notes",
    blurb: "Desktop notes wired into my agent system, so each note becomes context my agents can act on.",
    mark: "≡",
    href: "https://github.com/shivamkanodia19/sticky-markdown-note",
    linkLabel: "GitHub",
  },
  {
    name: "Google Tasks Sync",
    blurb: "Syncs Google Tasks with my cloud agents, so a tagged task kicks off an autonomous run.",
    mark: "✓",
  },
];

const trackedSections = [
  { id: "work", label: "Experience" },
  { id: "clinicalhours", label: "ClinicalHours" },
  { id: "options-bots", label: "Options bots" },
  { id: "research", label: "Research" },
  { id: "projects", label: "Hackathon projects" },
  { id: "builds", label: "Personal builds" },
  { id: "recognition", label: "Outside work" },
  { id: "resume", label: "Resume" },
] as const;

function TradingDiagram() {
  return (
    <svg
      className="build-diagram"
      viewBox="0 0 440 240"
      role="img"
      aria-label="An agent proposes a trade, a risk engine decides, and it becomes an order or a no-trade"
    >
      <defs>
        <marker id="ah" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0 0 L7 4 L0 8 z" fill="#625e57" />
        </marker>
        <marker id="ahp" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0 0 L7 4 L0 8 z" fill="#185d43" />
        </marker>
        <marker id="ahb" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0 0 L7 4 L0 8 z" fill="#8a8379" />
        </marker>
      </defs>
      <path className="edge" d="M110 120 H154" markerEnd="url(#ah)" />
      <path className="edge edge-pass" d="M288 112 C312 98 320 78 330 70" markerEnd="url(#ahp)" />
      <path className="edge edge-block" d="M288 128 C312 142 320 162 330 170" markerEnd="url(#ahb)" />
      <text className="edge-tag t-pass" x="305" y="88">PASS</text>
      <text className="edge-tag t-faint" x="303" y="158">BLOCK</text>
      <rect className="node" x="10" y="98" width="100" height="44" rx="9" />
      <text x="60" y="124">AGENT</text>
      <rect className="node node-gate" x="158" y="88" width="130" height="64" rx="9" />
      <text x="223" y="124">RISK ENGINE</text>
      <rect className="node" x="332" y="46" width="98" height="42" rx="9" />
      <text x="381" y="72">ORDER</text>
      <rect className="node node-faint" x="332" y="152" width="98" height="42" rx="9" />
      <text className="t-faint" x="381" y="178">NO-TRADE</text>
    </svg>
  );
}

export function ProfileSections() {
  useSectionTracking(trackedSections);

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
                <span className="proof-stamp proof-stamp-light">SUMMER 2026</span>
                <span>JUN – AUG</span>
              </div>
              <TrackedLink className="experience-logo matic-logo" href="https://maticinside.ai/" target="_blank" rel="noopener noreferrer" aria-label="Visit Matic" tracking={{ eventName: "project_opened", properties: { project_id: "matic", project_name: "Matic" } }}>
                <img src="/brand/matic-logo-white.svg" alt="Matic" />
              </TrackedLink>
              <p className="role-label">Software Engineering Intern</p>
              <h3>Shipped the AI inbox that gives doctors their time back.</h3>
              <p className="experience-summary">Built and shipped PulseMatic, an AI agent that saves physicians 90 minutes a day on their inbox — now being built into Matic&apos;s flagship AI product for doctors.</p>
              <div className="experience-signals" aria-label="Matic role scope">
                <span>90 min/day saved</span>
                <span>95% first-draft approval</span>
                <span>75% faster generation</span>
              </div>
            </article>

            <article id="legends" className="experience-card legends-card">
              <div className="experience-card-topline">
                <span className="proof-stamp proof-stamp-dark">SUMMER 2026</span>
                <span>JUN – AUG</span>
              </div>
              <TrackedLink className="experience-logo legends-logo" href="https://legendsglobal.com/" target="_blank" rel="noopener noreferrer" aria-label="Visit Legends Global" tracking={{ eventName: "project_opened", properties: { project_id: "legends", project_name: "Legends Global" } }}>
                <img src="/brand/legends-global-logo.svg" alt="Legends Global" />
              </TrackedLink>
              <p className="role-label">Business Insights Intern</p>
              <h3>Menu and pricing strategy for 400+ venues.</h3>
              <p className="experience-summary">Led a menu gap analysis for AT&amp;T Stadium, then built a pricing model that scaled into a menu optimization platform across a 400+ venue portfolio.</p>
              <div className="legends-signal" aria-label="From sales data to a venue-wide pricing decision">
                <span>Sales data</span><i aria-hidden="true" /><span>Pricing model</span><i aria-hidden="true" /><span>400+ venues</span>
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
                <TrackedLink href="https://clinicalhours.org/" target="_blank" rel="noopener noreferrer" aria-label="Visit ClinicalHours" tracking={{ eventName: "project_opened", properties: { project_id: "clinicalhours", project_name: "ClinicalHours" } }}>
                  <img src="/brand/clinicalhours-logo.png" alt="ClinicalHours logo" />
                  <strong>ClinicalHours</strong>
                </TrackedLink>
                <span className="proof-stamp proof-stamp-green">CO-FOUNDED</span>
              </div>
              <h3>The operating layer between clinics and student volunteers.</h3>
              <p>Co-founded ClinicalHours and own clinic partnerships, pricing, and go-to-market strategy. 700+ student users, with a partner clinic running its full volunteer program on the platform — from application to team management.</p>
              <div className="clinical-stats" aria-label="ClinicalHours traction">
                <div><strong>700+</strong><span>student users</span></div>
                <div><strong>01</strong><span>partner clinic live on the platform</span></div>
                <div><strong>+325%</strong><span>application volume growth</span></div>
              </div>
            </div>

            <figure className="product-proof">
              <img src="/img/clinicalhours-product.png" alt="ClinicalHours opportunity map interface" width="1800" height="1039" />
              <figcaption><span>LIVE PRODUCT</span> Opportunity discovery and tracking across clinical sites.</figcaption>
            </figure>

            <div className="clinical-ownership" aria-label="ClinicalHours founder ownership">
              <span>Product</span><span>Onboarding</span><span>Scheduling</span><span>Go-to-market</span><span>Pilot rollout</span>
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

      <section id="options-bots" className="section-block bots-section">
        <div className="site-container">
          <SectionHeading
            label="AlphaForge"
            title="See how my options trading bots are doing."
            intro="Three autonomous agents trading options against live market data in a shared paper account. The preview below is the live dashboard, not a screenshot, so it updates as they trade."
          />
          <div className="bots-frame">
            <div className="bots-chrome">
              <div className="bots-dots" aria-hidden="true"><span /><span /><span /></div>
              <span className="bots-url">alphaforge-rho.vercel.app</span>
              <span className="bots-live"><i aria-hidden="true" />Live</span>
            </div>
            <iframe
              className="bots-iframe"
              src="https://alphaforge-rho.vercel.app"
              title="AlphaForge — live options trading bot portfolios"
              loading="lazy"
              referrerPolicy="no-referrer"
              sandbox="allow-scripts allow-same-origin allow-popups"
            />
          </div>
          <TrackedLink
            className="bots-link"
            href="https://alphaforge-rho.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            tracking={{ eventName: "element_clicked", properties: { element_id: "alphaforge-bots", label: "AlphaForge", section_id: "options-bots", destination_type: "external" } }}
          >
            Open the full dashboard <b aria-hidden="true">↗</b>
          </TrackedLink>
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
                <p>Built a 65-input forecasting dashboard and compared three model families through walk-forward validation.</p>
                <div className="research-metrics">
                  <span><strong>65</strong> inputs</span>
                  <span><strong>06</strong> cost categories</span>
                  <span><strong>03</strong> model families</span>
                </div>
              </div>
              <TrackedLink href="/img/research-poster.jpg" target="_blank" rel="noopener noreferrer" className="poster-link" tracking={{ eventName: "element_clicked", properties: { element_id: "research-poster", label: "Research poster", section_id: "research", destination_type: "project" } }}>
                <img src="/img/research-poster.jpg" alt="Full cattle futures forecasting research poster" width="483" height="378" loading="lazy" />
                <span>View full poster <b aria-hidden="true">↗</b></span>
              </TrackedLink>
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
            label="Hackathon projects"
            title="A wider build range."
            intro="Competition and hackathon builds across healthcare, machine learning, hardware, and consumer products."
          />
          <div className="featured-projects">
            {featuredProjects.map((project, index) => (
              <article key={project.name} className="project-card" tabIndex={0} onClick={() => captureAnalyticsEvent("project_opened", { project_id: project.id, project_name: project.name })}>
                <div className="project-index">0{index + 1}</div>
                <p className="project-meta">{project.type}</p>
                <h3>{project.name}</h3>
                <p className="project-description">{project.description}</p>
                <p className="project-owned">{project.ownership}</p>
                <strong>{project.proof}</strong>
              </article>
            ))}
          </div>

          <div className="archive-heading"><p className="eyebrow">More projects</p><span>04 selected</span></div>
          <div className="project-archive">
            {archiveProjects.map(([name, type, proof], index) => (
              <article key={name} className="archive-row">
                <span>0{index + 1}</span><h3>{name}</h3><p>{type}</p><strong>{proof}</strong>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="builds" className="section-block builds-section">
        <div className="site-container">
          <SectionHeading
            label="Personal builds"
            title="Things I build for myself."
            intro="Software I design and ship on my own time."
          />
          <div className="builds-grid">
            {builds.map((build) => (
              <article key={build.title} className="build" tabIndex={0}>
                <div className="build-visual">
                  {build.diagram ? (
                    <TradingDiagram />
                  ) : (
                    <img src={build.shot!.src} alt={build.shot!.alt} loading="lazy" />
                  )}
                </div>
                <p className="card-kicker">{build.kicker}</p>
                <h3>{build.title}</h3>
                <p className="build-line">{build.line}</p>
                <div className="build-foot">
                  <div className="chips">
                    {build.chips.map((chip) => <span key={chip}>{chip}</span>)}
                  </div>
                  {build.href ? (
                    <TrackedLink className="build-link" href={build.href} target="_blank" rel="noopener noreferrer" tracking={{ eventName: "element_clicked", properties: { element_id: "build-felt", label: "Felt", section_id: "builds", destination_type: "external" } }}>
                      {build.linkLabel} →
                    </TrackedLink>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
          <p className="tools-kicker card-kicker">Small tools</p>
          <div className="tools-strip">
            {tools.map((tool) => {
              const inner = (
                <>
                  <span className="tool-mark" aria-hidden="true">{tool.mark}</span>
                  <div className="tool-body">
                    <h4>{tool.name}</h4>
                    <p>{tool.blurb}</p>
                  </div>
                  {tool.href ? <span className="tool-link">{tool.linkLabel} ↗</span> : null}
                </>
              );
              return tool.href ? (
                <TrackedLink key={tool.name} className="tool" href={tool.href} target="_blank" rel="noopener noreferrer" tracking={{ eventName: "element_clicked", properties: { element_id: "build-sticky-markdown-notes", label: "Sticky Markdown Notes", section_id: "builds", destination_type: "external" } }}>
                  {inner}
                </TrackedLink>
              ) : (
                <article key={tool.name} className="tool" tabIndex={0}>
                  {inner}
                </article>
              );
            })}
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
          <TrackedLink className="personal-proof" href="https://www.openpowerlifting.org/u/shivamkanodia" target="_blank" rel="noopener noreferrer" tracking={{ eventName: "element_clicked", properties: { element_id: "powerlifting", label: "Powerlifting", section_id: "recognition", destination_type: "external" } }}>
            <span className="proof-stamp proof-stamp-light">USAPL</span>
            <strong>Three first-place USAPL meet results.</strong>
            <p>152.5 kg competition bench.</p>
            <b aria-hidden="true">↗</b>
          </TrackedLink>
        </div>
      </section>

      <section id="resume" className="resume-section">
        <div className="site-container resume-panel">
          <div>
            <p className="eyebrow">Contact</p>
            <h2>See the full record.</h2>
          </div>
          <div className="contact-actions">
            <TrackedLink href="/resume.pdf" target="_blank" rel="noopener noreferrer" tracking={{ eventName: "resume_viewed", properties: { placement: "resume-section" } }}>Resume <span aria-hidden="true">↗</span></TrackedLink>
            <TrackedLink href="https://www.linkedin.com/in/shivamkanodia19/" target="_blank" rel="noopener noreferrer" tracking={{ eventName: "contact_clicked", properties: { channel: "linkedin" } }}>LinkedIn <span aria-hidden="true">↗</span></TrackedLink>
            <TrackedLink href="mailto:shivamkanodia77@gmail.com" tracking={{ eventName: "contact_clicked", properties: { channel: "email" } }}>Email <span aria-hidden="true">↗</span></TrackedLink>
          </div>
        </div>
      </section>
    </div>
  );
}
