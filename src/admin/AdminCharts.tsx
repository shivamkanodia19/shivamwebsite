import { useId } from "react";
import type { TrendPoint } from "./types";

type TrafficTrendChartProps = {
  points: TrendPoint[];
};

const chartWidth = 720;
const chartHeight = 270;
const chartInset = { top: 24, right: 18, bottom: 34, left: 38 };

function plotPoint(value: number, index: number, length: number, maximum: number) {
  const plotWidth = chartWidth - chartInset.left - chartInset.right;
  const plotHeight = chartHeight - chartInset.top - chartInset.bottom;
  return {
    x: chartInset.left + (length === 1 ? plotWidth / 2 : index * plotWidth / (length - 1)),
    y: chartInset.top + plotHeight - value / maximum * plotHeight,
  };
}

function pathFor(points: TrendPoint[], key: keyof Pick<TrendPoint, "visitors" | "sessions" | "resumeViews">, maximum: number) {
  return points.map((point, index) => {
    const position = plotPoint(point[key], index, points.length, maximum);
    return `${index === 0 ? "M" : "L"}${position.x.toFixed(1)},${position.y.toFixed(1)}`;
  }).join(" ");
}

function shortDate(value: string) {
  return new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric", timeZone: "UTC" })
    .format(new Date(`${value}T12:00:00Z`));
}

export function TrafficTrendChart({ points }: TrafficTrendChartProps) {
  const titleId = useId();
  const descriptionId = useId();
  const maximum = Math.max(1, ...points.flatMap((point) => [point.visitors, point.sessions, point.resumeViews]));
  const peak = points.reduce((current, point) => point.visitors > current.visitors ? point : current, points[0]);
  const start = points[0];
  const end = points[points.length - 1];
  const summary = `Visitors peaked at ${peak.visitors} on ${shortDate(peak.date)}. The period moved from ${start.visitors} to ${end.visitors} visitors per day.`;
  const labelIndexes = new Set([0, Math.floor((points.length - 1) / 2), points.length - 1]);

  return (
    <figure className="admin-chart-figure">
      <p className="admin-chart-summary">{summary}</p>
      <svg
        aria-labelledby={`${titleId} ${descriptionId}`}
        className="admin-trend-chart"
        role="img"
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
      >
        <title id={titleId}>Traffic over time</title>
        <desc id={descriptionId}>{summary} Visitors use a solid line with circle markers, sessions use a dashed line with square markers, and resume actions use a dotted line with diamond markers.</desc>
        {[0, .25, .5, .75, 1].map((ratio) => {
          const y = chartInset.top + ratio * (chartHeight - chartInset.top - chartInset.bottom);
          return <line className="admin-chart-gridline" key={ratio} x1={chartInset.left} x2={chartWidth - chartInset.right} y1={y} y2={y} />;
        })}
        <path className="admin-chart-line admin-chart-visitors" d={pathFor(points, "visitors", maximum)} />
        <path className="admin-chart-line admin-chart-sessions" d={pathFor(points, "sessions", maximum)} />
        <path className="admin-chart-line admin-chart-resume" d={pathFor(points, "resumeViews", maximum)} />
        {points.map((point, index) => {
          const visitors = plotPoint(point.visitors, index, points.length, maximum);
          const sessions = plotPoint(point.sessions, index, points.length, maximum);
          const resumes = plotPoint(point.resumeViews, index, points.length, maximum);
          return (
            <g key={point.date}>
              <circle className="admin-chart-marker admin-chart-marker-visitors" cx={visitors.x} cy={visitors.y} r="3.5" />
              <rect className="admin-chart-marker admin-chart-marker-sessions" height="7" width="7" x={sessions.x - 3.5} y={sessions.y - 3.5} />
              <path className="admin-chart-marker admin-chart-marker-resume" d={`M${resumes.x},${resumes.y - 4} L${resumes.x + 4},${resumes.y} L${resumes.x},${resumes.y + 4} L${resumes.x - 4},${resumes.y} Z`} />
              {labelIndexes.has(index) ? <text className="admin-chart-axis-label" textAnchor={index === 0 ? "start" : index === points.length - 1 ? "end" : "middle"} x={visitors.x} y={chartHeight - 9}>{shortDate(point.date)}</text> : null}
            </g>
          );
        })}
      </svg>
      <div aria-label="Traffic chart legend" className="admin-chart-legend">
        <span><i className="admin-legend-line admin-legend-visitors" />Visitors</span>
        <span><i className="admin-legend-line admin-legend-sessions" />Sessions</span>
        <span><i className="admin-legend-line admin-legend-resume" />Resume actions</span>
      </div>
      <table className="admin-visually-hidden" aria-label="Traffic over time data">
        <caption>Daily aggregate traffic for the selected period</caption>
        <thead><tr><th>Date</th><th>Visitors</th><th>Sessions</th><th>Resume actions</th></tr></thead>
        <tbody>
          {points.map((point) => <tr key={point.date}><th scope="row">{point.date}</th><td>{point.visitors}</td><td>{point.sessions}</td><td>{point.resumeViews}</td></tr>)}
        </tbody>
      </table>
    </figure>
  );
}
