import { useEffect } from "react";
import { Link } from "react-router-dom";
import { captureAnalyticsEvent } from "@/analytics/client";
import { TrackedLink } from "@/analytics/TrackedLink";
import { Navbar } from "@/components/Navbar";
import { SiteFooter } from "@/components/SiteFooter";
import { ClinicalFrames, LegendsFrame, MaticFrame } from "@/components/work/DeliverableFrames";
import { caseStudies, type CaseStudy } from "@/data/caseStudies";

const frames = {
  matic: MaticFrame,
  legends: LegendsFrame,
  clinicalhours: ClinicalFrames,
} as const;

function Study({ study }: { study: CaseStudy }) {
  const Frame = frames[study.slug];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [study.slug]);

  return (
    <>
      <a className="skip-link" href="#case-main">Skip to content</a>
      <Navbar />
      <main id="case-main" className={`case-page tone-${study.tone}`}>
        <div className="site-container">
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

          <header className="case-hero">
            <div>
              <p className="eyebrow">{study.company}</p>
              <h1>{study.title}</h1>
              <p className="case-lede">{study.lede}</p>
              <p className="case-meta">{study.role} · {study.when} · {study.where}</p>
            </div>
            <TrackedLink
              className="case-brand"
              href={study.site}
              target="_blank"
              rel="noopener noreferrer"
              tracking={{
                eventName: "element_clicked",
                properties: {
                  element_id: study.slug === "clinicalhours" ? "case-clinical-site" : study.slug === "legends" ? "case-legends-site" : "case-matic-site",
                  label: study.slug === "clinicalhours" ? "ClinicalHours site" : study.slug === "legends" ? "Legends site" : "Matic site",
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
          </header>

          <dl className="case-metrics">
            {study.metrics.map((metric) => (
              <div key={metric.label}>
                <dt>{metric.label}</dt>
                <dd>
                  <strong>{metric.value}</strong>
                  {metric.note ? <span>{metric.note}</span> : null}
                </dd>
              </div>
            ))}
          </dl>

          <section className="case-block" aria-labelledby="case-line-title">
            <div className="case-block-head">
              <p className="eyebrow">Operating line</p>
              <h2 id="case-line-title">How it moved</h2>
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

          <section className="case-block" aria-labelledby="case-ship-title">
            <div className="case-block-head">
              <p className="eyebrow">Deliverable</p>
              <h2 id="case-ship-title">{study.slug === "clinicalhours" ? "What is live" : "What I built"}</h2>
            </div>
            <Frame />
          </section>

          <section className="case-block" aria-labelledby="case-ops-title">
            <div className="case-block-head">
              <p className="eyebrow">Role</p>
              <h2 id="case-ops-title">How I operated</h2>
            </div>
            <div className="case-ops">
              {study.ops.map((op) => (
                <article key={op.title}>
                  <h3>{op.title}</h3>
                  <ul>
                    {op.lines.map((line) => <li key={line}>{line}</li>)}
                  </ul>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

export function MaticCasePage() {
  return <Study study={caseStudies.matic} />;
}

export function LegendsCasePage() {
  return <Study study={caseStudies.legends} />;
}

export function ClinicalHoursCasePage() {
  return <Study study={caseStudies.clinicalhours} />;
}
