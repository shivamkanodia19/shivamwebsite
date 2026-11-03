import { contactLinks } from "@/data/contact";
import { useEffect, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { captureAnalyticsEvent } from "@/analytics/client";
import { TrackedLink } from "@/analytics/TrackedLink";
import { Navbar } from "@/components/Navbar";
import { SiteFooter } from "@/components/SiteFooter";
import { ClinicalLeadFrame, ClinicalSupportingFrames, LegendsDecisionArtifact, MaticFrame } from "@/components/work/DeliverableFrames";
import {
  caseStudies,
  type CaseStudy,
  type MultiProjectCase,
  type SingleProjectCase,
} from "@/data/caseStudies";

function CaseBrand({ study }: { study: CaseStudy }) {
  const siteId =
    study.slug === "clinicalhours"
      ? "case-clinical-site"
      : study.slug === "legends"
        ? "case-legends-site"
        : "case-matic-site";
  const siteLabel =
    study.slug === "clinicalhours"
      ? "ClinicalHours site"
      : study.slug === "legends"
        ? "Legends site"
        : "Matic site";

  return (
    <TrackedLink
      className="case-brand"
      href={study.site}
      target="_blank"
      rel="noopener noreferrer"
      tracking={{
        eventName: "element_clicked",
        properties: {
          element_id: siteId,
          label: siteLabel,
          section_id: "work",
          destination_type: "external",
        },
      }}
    >
      <span className={`case-logo-box ${study.logoClass}`}>
        <img src={study.logo} alt="" />
      </span>
      <span>
        <strong>{study.company}</strong>
        <small>{study.siteLabel}</small>
      </span>
    </TrackedLink>
  );
}

function CaseShell({
  study,
  children,
}: {
  study: CaseStudy;
  children: ReactNode;
}) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [study.slug]);

  return (
    <>
      <a className="skip-link" href="#case-main">Skip to content</a>
      <Navbar />
      <main id="case-main" className={`case-page tone-${study.tone}`}>
        <div className="site-container">
          <div className="case-topbar">
            <Link
              className="case-back"
              to={`/#${study.slug === "clinicalhours" ? "clinicalhours" : study.slug}`}
              onClick={() => captureAnalyticsEvent("element_clicked", {
                element_id: "case-back",
                label: "Back to work",
                section_id: "work",
                destination_type: "project",
              })}
            >
              Back to work
            </Link>
            <div className="case-top-actions">
              <TrackedLink href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="case-utility" tracking={{ eventName: "resume_viewed", properties: { placement: "case" } }}>Resume ↗</TrackedLink>
              <TrackedLink href={`mailto:${contactLinks.email}`} className="case-utility" tracking={{ eventName: "contact_clicked", properties: { channel: "email" } }}>Email ↗</TrackedLink>
            </div>
          </div>

          <header className="case-hero">
            <div>
              <p className="case-meta">{study.company} · {study.role} · {study.when} · {study.where}</p>
              <h1>{study.title}</h1>
              <p className="case-lede">{study.lede}</p>
            </div>
            <CaseBrand study={study} />
          </header>

          {children}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

function SingleStudy({ study }: { study: SingleProjectCase }) {
  const isClinical = study.slug === "clinicalhours";

  return (
    <CaseShell study={study}>
      <section className="case-block case-block-first" aria-labelledby="case-ship-title">
        <div className="case-block-head">
          <p className="eyebrow">Workflow</p>
          <h2 id="case-ship-title">{isClinical ? "Clinic workflow" : study.deliverableTitle}</h2>
        </div>
        {isClinical ? <ClinicalLeadFrame /> : <MaticFrame />}
      </section>

      <p className="case-outcome">{study.outcome}</p>

      <dl className="case-ledger">
        {study.results.map((row) => (
          <div key={row.label}>
            <dt>{row.label}</dt>
            <dd>{row.value}</dd>
          </div>
        ))}
      </dl>

      {isClinical ? (
        <section className="case-block" aria-labelledby="case-gallery-title">
          <div className="case-block-head">
            <p className="eyebrow">Evidence</p>
            <h2 id="case-gallery-title">Product and recognition</h2>
          </div>
          <ClinicalSupportingFrames />
        </section>
      ) : null}

      <section className="case-block" aria-labelledby="case-line-title">
        <div className="case-block-head">
          <p className="eyebrow">{study.processLabel}</p>
          <h2 id="case-line-title">{study.processTitle}</h2>
        </div>
        <ol className="zip-line">
          {study.steps.map((step, index) => (
            <li key={step.title}>
              <span>0{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.detail}</p>
            </li>
          ))}
        </ol>
      </section>
    </CaseShell>
  );
}

function MultiStudy({ study }: { study: MultiProjectCase }) {
  return (
    <CaseShell study={study}>
      <section className="case-block case-block-first" aria-labelledby="case-decision-title">
        <div className="case-block-head">
          <p className="eyebrow">Pricing analysis</p>
          <h2 id="case-decision-title">Food and beverage pricing model</h2>
        </div>
        <LegendsDecisionArtifact />
      </section>

      <section className="case-block" aria-labelledby="case-projects-title">
        <div className="case-block-head">
          <p className="eyebrow">Projects</p>
          <h2 id="case-projects-title">Four projects</h2>
        </div>
        <div className="project-chapters">
          {study.projects.map((project) => (
            <article key={project.number} className="project-chapter">
              <p className="chapter-index">{project.number}</p>
              <h3>{project.title}</h3>
              <p className="chapter-what">{project.what}</p>
              <p className="chapter-result">{project.result}</p>
            </article>
          ))}
        </div>
      </section>
    </CaseShell>
  );
}

export function MaticCasePage() {
  const study = caseStudies.matic;
  if (study.kind !== "single") return null;
  return <SingleStudy study={study} />;
}

export function LegendsCasePage() {
  const study = caseStudies.legends;
  if (study.kind !== "multi") return null;
  return <MultiStudy study={study} />;
}

export function ClinicalHoursCasePage() {
  const study = caseStudies.clinicalhours;
  if (study.kind !== "single") return null;
  return <SingleStudy study={study} />;
}
