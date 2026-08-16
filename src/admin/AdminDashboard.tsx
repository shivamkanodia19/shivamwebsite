import { useId, useState, type KeyboardEvent } from "react";
import { TrafficTrendChart } from "./AdminCharts";
import type { AdminAnalyticsResponse, AnalyticsReportAvailability, AnalyticsReportKey, MetricValue, RangeDays, RankedValue } from "./types";

type AdminDashboardProps = {
  report: AdminAnalyticsResponse;
  range: RangeDays;
  refreshing: boolean;
  staleMessage: string | null;
  onRangeChange: (range: RangeDays) => void | Promise<void>;
  onRefresh: () => void | Promise<void>;
  onLogout: () => void;
};

type AudienceKey = keyof AdminAnalyticsResponse["audience"];

const ranges: RangeDays[] = [7, 30, 90];
const audienceKeys: AudienceKey[] = ["countries", "devices", "browsers"];
const reportLabels: Record<AnalyticsReportKey, string> = {
  kpis: "KPIs",
  trend: "traffic trend",
  sections: "section attention",
  actions: "actions",
  acquisition: "acquisition",
  audience: "audience",
  funnel: "funnel",
};

const kpiDefinitions: Array<{
  key: keyof AdminAnalyticsResponse["kpis"];
  label: string;
  format: (value: number) => string;
}> = [
  { key: "visitors", label: "Visitors", format: formatCount },
  { key: "sessions", label: "Sessions", format: formatCount },
  { key: "activeTime", label: "Active time", format: formatDuration },
  { key: "bounceRate", label: "Bounce rate", format: formatPercent },
  { key: "resumeSessions", label: "Resume-converting sessions", format: formatCount },
];

const toolDefinitions: Array<{
  key: keyof AdminAnalyticsResponse["posthogLinks"];
  label: string;
  description: string;
}> = [
  { key: "sessions", label: "Session replay", description: "Review masked, anonymous visit recordings." },
  { key: "heatmaps", label: "Heatmaps", description: "Inspect aggregate interaction density." },
  { key: "paths", label: "Path analysis", description: "Trace common routes through the portfolio." },
  { key: "events", label: "Event explorer", description: "Query the stable event taxonomy." },
];

function formatCount(value: number) {
  return new Intl.NumberFormat().format(value);
}

function formatPercent(value: number) {
  return `${new Intl.NumberFormat(undefined, { maximumFractionDigits: 1 }).format(value)}%`;
}

function formatDuration(value: number) {
  if (value < 60) return `${Math.round(value)}s`;
  const minutes = Math.floor(value / 60);
  const seconds = Math.round(value % 60);
  return `${minutes}m ${String(seconds).padStart(2, "0")}s`;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat(undefined, { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" })
    .format(new Date(/^\d{4}-\d{2}-\d{2}$/.test(value) ? `${value}T12:00:00Z` : value));
}

function formatTimestamp(value: string) {
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(new Date(value));
}

function MetricDelta({ metric }: { metric: MetricValue }) {
  if (metric.deltaPercent === null) return <span className="admin-kpi-delta admin-kpi-delta-neutral">No prior comparison</span>;
  const direction = metric.deltaPercent > 0 ? "up" : metric.deltaPercent < 0 ? "down" : "unchanged";
  const sign = metric.deltaPercent > 0 ? "+" : "";
  return <span className={`admin-kpi-delta admin-kpi-delta-${direction}`}>{sign}{formatPercent(metric.deltaPercent)} vs previous</span>;
}

function ModuleEmpty({ availability, label }: { availability: AnalyticsReportAvailability; label: string }) {
  return (
    <div className={`admin-module-empty admin-module-${availability}`}>
      <span aria-hidden="true">—</span>
      <p>{availability === "unavailable" ? `${label} report is unavailable.` : `No ${label.toLowerCase()} recorded in this period.`}</p>
    </div>
  );
}

function RankedList({ availability, values, emptyLabel }: { availability: AnalyticsReportAvailability; values: RankedValue[]; emptyLabel: string }) {
  if (!values.length) return <ModuleEmpty availability={availability} label={emptyLabel} />;
  return (
    <ol className="admin-ranked-list">
      {values.map((value, index) => (
        <li key={`${value.label}-${index}`}>
          <span className="admin-rank">{String(index + 1).padStart(2, "0")}</span>
          <span className="admin-rank-label">{value.label}</span>
          <span className="admin-rank-count">{formatCount(value.visitors)} visitors</span>
          <strong>{formatPercent(value.share)}</strong>
        </li>
      ))}
    </ol>
  );
}

export function AdminDashboard({ report, range, refreshing, staleMessage, onRangeChange, onRefresh, onLogout }: AdminDashboardProps) {
  const [audienceKey, setAudienceKey] = useState<AudienceKey>("countries");
  const audienceTabId = useId();
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "Browser local time";
  const peakAction = report.actions[0];
  const finalFunnelStage = [...report.funnel].reverse().find((stage) => stage.sessions > 0);
  const resumeRate = report.kpis.sessions.value && report.kpis.resumeSessions.value !== null
    ? report.kpis.resumeSessions.value / report.kpis.sessions.value * 100
    : null;
  const isNewInstallation = report.reportStatus.kpis.availability === "available"
    && report.reportStatus.trend.availability === "available"
    && Object.values(report.kpis).every((metric) => metric.value === null)
    && report.trend.length === 0;
  const reportEntries = Object.entries(report.reportStatus) as Array<[AnalyticsReportKey, AdminAnalyticsResponse["reportStatus"][AnalyticsReportKey]]>;
  const unavailableReportLabels = reportEntries
    .filter(([, status]) => status.availability === "unavailable")
    .map(([key]) => reportLabels[key]);
  const coverageStarts = new Map<string, string[]>();
  reportEntries.forEach(([key, status]) => {
    const startDate = status.availableFrom?.slice(0, 10);
    if (startDate && startDate > report.coverage.requestedFrom) {
      coverageStarts.set(startDate, [...(coverageStarts.get(startDate) ?? []), reportLabels[key]]);
    }
  });
  const coverageMessages = [...coverageStarts].map(([date, labels]) => `Tracking began ${formatDate(date)} for ${labels.join(", ")}`);

  function handleAudienceKeyDown(event: KeyboardEvent<HTMLButtonElement>, key: AudienceKey) {
    const currentIndex = audienceKeys.indexOf(key);
    let nextIndex: number | null = null;
    if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % audienceKeys.length;
    if (event.key === "ArrowLeft") nextIndex = (currentIndex - 1 + audienceKeys.length) % audienceKeys.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = audienceKeys.length - 1;
    if (nextIndex === null) return;
    event.preventDefault();
    const nextKey = audienceKeys[nextIndex];
    setAudienceKey(nextKey);
    document.getElementById(`${audienceTabId}-${nextKey}`)?.focus();
  }

  return (
    <div className="admin-shell">
      <header className="admin-header">
        <div className="admin-header-inner">
          <a className="admin-wordmark" href="/" aria-label="SK portfolio">SK<span>.</span></a>
          <span className="admin-private-label">ANALYTICS / PRIVATE</span>
          <nav aria-label="Private analytics links" className="admin-header-nav">
            <a href="/">Portfolio <span aria-hidden="true">↗</span></a>
            {report.posthogLinks.sessions
              ? <a href={report.posthogLinks.sessions} rel="noreferrer" target="_blank">PostHog <span aria-hidden="true">↗</span></a>
              : <span aria-disabled="true">PostHog not configured</span>}
            <button type="button" onClick={onLogout}>Log out</button>
          </nav>
        </div>
      </header>

      <main aria-busy={refreshing} className="admin-main">
        <section className="admin-intro" aria-labelledby="admin-dashboard-title">
          <div>
            <p className="admin-eyebrow">OWNER VIEW / ANONYMOUS AGGREGATES</p>
            <h1 id="admin-dashboard-title">Portfolio analytics</h1>
            <p>What visitors notice, explore, and act on—without identifying who they are.</p>
          </div>
          <div className="admin-health-panel">
            <div className="admin-health-copy">
              <span className={`admin-status-dot admin-status-${report.trackingHealth}`} aria-hidden="true" />
              <p><strong>Tracking {report.trackingHealth}</strong><small>{report.trackingHealth === "healthy" ? "All aggregate reports available" : unavailableReportLabels.length ? `${unavailableReportLabels.length} aggregate report${unavailableReportLabels.length === 1 ? "" : "s"} unavailable` : "Aggregate health check degraded"} · Last refreshed <time dateTime={report.generatedAt}>{formatTimestamp(report.generatedAt)}</time></small></p>
            </div>
            <button className="admin-refresh" disabled={refreshing} onClick={onRefresh} type="button">
              <span aria-hidden="true">↻</span> {refreshing ? "Refreshing…" : "Refresh"}
            </button>
          </div>
        </section>

        <div className="admin-controls-row">
          <div aria-label="Report date range" className="admin-range-controls" role="group">
            {ranges.map((option) => (
              <button
                aria-pressed={range === option}
                aria-disabled={refreshing || undefined}
                key={option}
                onClick={() => { if (!refreshing) void onRangeChange(option); }}
                type="button"
              >
                {option} days
              </button>
            ))}
          </div>
          <p aria-live="polite" className="admin-range-status" role="status">Showing {range} days · aggregate data</p>
        </div>

        {staleMessage ? (
          <div className="admin-banner admin-banner-stale" role="alert">
            <strong>Refresh unavailable.</strong> Showing the report last updated {formatTimestamp(report.generatedAt)}. {staleMessage}
          </div>
        ) : null}
        {report.coverage.partial ? (
          <div className="admin-banner admin-banner-partial" role="alert">
            <strong>Partial coverage.</strong> {coverageMessages.length ? `${coverageMessages.join(". ")}. Earlier dates are excluded. ` : ""}{unavailableReportLabels.length ? `Unavailable: ${unavailableReportLabels.join(", ")}.` : ""}
          </div>
        ) : null}
        {isNewInstallation ? (
          <div className="admin-banner admin-banner-new">
            <strong>{report.trackingHealth === "healthy" ? "Aggregate reports are healthy." : "Early aggregate data."}</strong> There is not enough aggregate activity yet to draw a useful chart. New data will appear here as visits arrive.
          </div>
        ) : null}

        <div className="admin-dashboard-grid">
          <section aria-labelledby="snapshot-title" className="admin-kpi-section admin-grid-full">
            <div className="admin-section-heading">
              <p className="admin-module-index">01 / SNAPSHOT</p>
              <h2 id="snapshot-title">Period snapshot</h2>
            </div>
            <div className="admin-kpi-grid">
              {kpiDefinitions.map(({ key, label, format }) => {
                const metric = report.kpis[key];
                return (
                  <article className={`admin-kpi-card admin-kpi-${report.reportStatus.kpis.availability}`} key={key}>
                    <p className="admin-kpi-label">{label}</p>
                    {report.reportStatus.kpis.availability === "unavailable" ? (
                      <><strong className="admin-kpi-value admin-kpi-value-unavailable">Unavailable</strong><span className="admin-kpi-delta admin-kpi-delta-neutral">KPI report unavailable</span></>
                    ) : (
                      <><strong className="admin-kpi-value">{metric.value === null ? "—" : format(metric.value)}</strong><MetricDelta metric={metric} /></>
                    )}
                  </article>
                );
              })}
            </div>
          </section>

          <section aria-labelledby="trend-title" className="admin-module admin-trend-module">
            <div className="admin-section-heading admin-section-heading-inline">
              <div><p className="admin-module-index">02 / TRAFFIC</p><h2 id="trend-title">Traffic over time</h2></div>
              <span>Daily</span>
            </div>
            {report.trend.length ? <TrafficTrendChart points={report.trend} /> : <ModuleEmpty availability={report.reportStatus.trend.availability} label="Traffic trends" />}
          </section>

          <section aria-labelledby="journey-title" className="admin-module admin-journey-module">
            <div className="admin-section-heading"><p className="admin-module-index">03 / JOURNEY</p><h2 id="journey-title">Journey signals</h2></div>
            <dl className="admin-signal-list">
              <div><dt>Most-used action</dt><dd>{report.reportStatus.actions.availability === "unavailable" ? "Action report unavailable" : peakAction?.label ?? "No actions yet"}</dd><small>{report.reportStatus.actions.availability === "unavailable" ? "No action aggregate available" : peakAction ? `${formatPercent(peakAction.share)} of measured action visitors` : "Waiting for aggregate activity"}</small></div>
              <div><dt>Resume conversion rate</dt><dd>{report.reportStatus.kpis.availability === "unavailable" ? "KPI report unavailable" : resumeRate === null ? "—" : formatPercent(resumeRate)}</dd><small>Distinct sessions with a resume action</small></div>
              <div><dt>Deepest journey stage</dt><dd>{report.reportStatus.funnel.availability === "unavailable" ? "Funnel report unavailable" : finalFunnelStage?.label ?? "No completed journeys yet"}</dd><small>{report.reportStatus.funnel.availability === "unavailable" ? "No funnel aggregate available" : finalFunnelStage ? `${formatCount(finalFunnelStage.sessions)} sessions · ${formatPercent(finalFunnelStage.share)}` : "Waiting for aggregate activity"}</small></div>
            </dl>
          </section>

          <section aria-labelledby="sections-title" className="admin-module admin-sections-module">
            <div className="admin-section-heading"><p className="admin-module-index">04 / ATTENTION</p><h2 id="sections-title">Section attention</h2></div>
            <p className="admin-module-note">Estimated from meaningful section visibility; not exact reading time.</p>
            {report.sections.length ? (
              <ol className="admin-bar-list">
                {report.sections.map((section) => (
                  <li key={section.label}>
                    <div><span>{section.label}</span><strong>{formatPercent(section.share)}</strong></div>
                    <div className="admin-bar-track" aria-hidden="true"><span style={{ width: `${Math.min(100, section.share)}%` }} /></div>
                    <small>{formatCount(section.sessions)} sessions</small>
                  </li>
                ))}
              </ol>
            ) : <ModuleEmpty availability={report.reportStatus.sections.availability} label="Section attention" />}
          </section>

          <section aria-labelledby="actions-title" className="admin-module admin-actions-module">
            <div className="admin-section-heading"><p className="admin-module-index">05 / ACTIONS</p><h2 id="actions-title">Ranked actions</h2></div>
            <RankedList availability={report.reportStatus.actions.availability} emptyLabel="Ranked actions" values={report.actions} />
          </section>

          <section aria-labelledby="acquisition-title" className="admin-module admin-acquisition-module">
            <div className="admin-section-heading"><p className="admin-module-index">06 / ORIGIN</p><h2 id="acquisition-title">Acquisition</h2></div>
            {report.acquisition.length ? (
              <div className="admin-table-scroll">
                <table className="admin-data-table" aria-label="Acquisition sources">
                  <thead><tr><th scope="col">Source</th><th scope="col">Visitors</th><th scope="col">Share</th></tr></thead>
                  <tbody>{report.acquisition.map((source) => (
                    <tr key={source.label}>
                      <th data-label="Source" scope="row">{source.label}</th>
                      <td data-label="Visitors">{formatCount(source.visitors)}</td>
                      <td data-label="Share"><strong>{formatPercent(source.share)}</strong></td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
            ) : <ModuleEmpty availability={report.reportStatus.acquisition.availability} label="Acquisition sources" />}
          </section>

          <section aria-labelledby="audience-title" className="admin-module admin-audience-module">
            <div className="admin-section-heading"><p className="admin-module-index">07 / CONTEXT</p><h2 id="audience-title">Audience</h2></div>
            <div aria-label="Audience breakdown" className="admin-tabs" role="tablist">
              {audienceKeys.map((key) => (
                <button
                  aria-controls={`${audienceTabId}-panel`}
                  aria-selected={audienceKey === key}
                  id={`${audienceTabId}-${key}`}
                  key={key}
                  onClick={() => setAudienceKey(key)}
                  onKeyDown={(event) => handleAudienceKeyDown(event, key)}
                  role="tab"
                  tabIndex={audienceKey === key ? 0 : -1}
                  type="button"
                >
                  {key === "countries" ? "Country" : key === "devices" ? "Device" : "Browser"}
                </button>
              ))}
            </div>
            <div aria-labelledby={`${audienceTabId}-${audienceKey}`} id={`${audienceTabId}-panel`} role="tabpanel">
              <RankedList availability={report.reportStatus.audience.availability} emptyLabel={`${audienceKey.slice(0, -1)} data`} values={report.audience[audienceKey]} />
            </div>
          </section>

          <section aria-labelledby="funnel-title" className="admin-module admin-funnel-module admin-grid-full">
            <div className="admin-section-heading"><p className="admin-module-index">08 / CONVERSION</p><h2 id="funnel-title">Conversion funnel</h2></div>
            {report.funnel.length ? (
              <ol className="admin-funnel-list">
                {report.funnel.map((stage, index) => (
                  <li className="admin-funnel-stage" key={stage.label}>
                    <span className="admin-funnel-index">{String(index + 1).padStart(2, "0")}</span>
                    <div className="admin-funnel-block" style={{ width: `${Math.max(stage.share, 18)}%` }}>
                      <strong>{stage.label}</strong>
                      <span>{formatCount(stage.sessions)} sessions</span>
                      <b>{formatPercent(stage.share)}</b>
                    </div>
                  </li>
                ))}
              </ol>
            ) : <ModuleEmpty availability={report.reportStatus.funnel.availability} label="Funnel data" />}
          </section>

          <section aria-labelledby="tools-title" className="admin-module admin-tools-module admin-grid-full">
            <div className="admin-section-heading"><p className="admin-module-index">09 / DEEP DIVE</p><h2 id="tools-title">Deeper analysis</h2></div>
            <div className="admin-tool-grid">
              {toolDefinitions.map((tool) => {
                const href = report.posthogLinks[tool.key];
                return href ? (
                  <a href={href} key={tool.key} rel="noreferrer" target="_blank">
                    <span>{tool.label}</span><p>{tool.description}</p><b aria-hidden="true">↗</b>
                  </a>
                ) : (
                  <div aria-disabled="true" className="admin-tool-disabled" key={tool.key}>
                    <span>{tool.label}</span><p>Protected PostHog link not configured.</p><b aria-hidden="true">—</b>
                  </div>
                );
              })}
            </div>
          </section>

          <section aria-labelledby="privacy-title" className="admin-module admin-meta-module admin-grid-full">
            <div className="admin-section-heading"><p className="admin-module-index">10 / NOTES</p><h2 id="privacy-title">Privacy &amp; provenance</h2></div>
            <dl className="admin-meta-grid">
              <div><dt>Privacy</dt><dd>Anonymous, aggregate behavior only. No account identification or typed content.</dd></div>
              <div><dt>Data source</dt><dd>PostHog events via the protected analytics function.</dd></div>
              <div><dt>Coverage</dt><dd>{report.coverage.availableFrom ? `Measured since ${formatDate(report.coverage.availableFrom)}` : "Begins with the first tracked visit."}</dd></div>
              <div><dt>Display timezone</dt><dd>{timezone}</dd></div>
            </dl>
          </section>
        </div>
      </main>
    </div>
  );
}

export function AdminDashboardSkeleton() {
  return (
    <main aria-busy="true" aria-live="polite" className="admin-main admin-skeleton-shell">
      <p className="admin-visually-hidden">Checking private access and loading analytics…</p>
      <div className="admin-skeleton-title admin-skeleton-block" />
      <div className="admin-skeleton-kpis">{Array.from({ length: 5 }, (_, index) => <div className="admin-skeleton-card admin-skeleton-block" key={index} />)}</div>
      <div className="admin-skeleton-modules"><div className="admin-skeleton-module admin-skeleton-block" /><div className="admin-skeleton-module admin-skeleton-block" /></div>
    </main>
  );
}
