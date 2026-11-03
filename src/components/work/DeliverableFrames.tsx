import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

/* ---------- Shared: animated flow rail ---------- */

type FlowStep = { title: string; text: string; visual: ReactNode };

function FlowRail({ steps, label, note }: { steps: FlowStep[]; label: string; note?: ReactNode }) {
  return (
    <div className="flow" role="group" aria-label={label}>
      <div className="flow-track" aria-hidden="true">
        <span className="flow-dot" />
      </div>
      <ol className="flow-steps">
        {steps.map((step, i) => (
          <li key={step.title} className="flow-step" style={{ ["--i" as string]: i }}>
            <span className="flow-index">0{i + 1}</span>
            <div className="flow-visual" aria-hidden="true">{step.visual}</div>
            <strong>{step.title}</strong>
            <span>{step.text}</span>
          </li>
        ))}
      </ol>
      {note ? <p className="flow-note">{note}</p> : null}
    </div>
  );
}

const lines = (n: number) => (
  <span className="v-lines">
    {Array.from({ length: n }, (_, i) => <i key={i} style={{ ["--n" as string]: i }} />)}
  </span>
);

/* ---------- Matic: PulseMatic workflow ---------- */

const maticSteps: FlowStep[] = [
  {
    title: "Task",
    text: "A refill, lab, or chart request arrives.",
    visual: (
      <span className="v-inbox">
        <i /><i className="on" /><i />
      </span>
    ),
  },
  {
    title: "Retrieve",
    text: "Only the relevant chart sections are pulled.",
    visual: (
      <span className="v-chart">
        <i className="on">Meds</i><i className="on">Labs</i><i>Notes</i><i>Imaging</i><i>History</i>
      </span>
    ),
  },
  { title: "Draft", text: "A reply is written from those sections.", visual: lines(3) },
  {
    title: "Review",
    text: "A physician approves. Unsupported drafts escalate.",
    visual: (
      <span className="v-check">
        <svg viewBox="0 0 24 24" width="26" height="26"><circle cx="12" cy="12" r="10" /><path d="M7 12.5l3.2 3.2L17 9" /></svg>
      </span>
    ),
  },
];

export function MaticWorkflowMini() {
  return (
    <figure className="feature-artifact">
      <p className="artifact-label">PulseMatic workflow · illustration</p>
      <FlowRail steps={maticSteps} label="PulseMatic workflow: task, retrieve, draft, review" />
    </figure>
  );
}

export function MaticFrame() {
  return (
    <figure className="feature-artifact feature-artifact-wide">
      <p className="artifact-label">PulseMatic workflow · illustration</p>
      <FlowRail
        steps={maticSteps}
        label="PulseMatic workflow: task, retrieve, draft, review"
        note="Retrieving relevant sections instead of full-chart prompts cut latency 64% and token cost 82%. 90% of drafts pass physician review on the first try."
      />
    </figure>
  );
}

/* ---------- Legends: price elasticity curve ---------- */

const W = 420;
const H = 220;
const PAD = { l: 36, r: 16, t: 14, b: 34 };
const demand = (t: number) => {
  // t in [0,1] along price axis; units fall convexly as price rises
  const x = PAD.l + t * (W - PAD.l - PAD.r);
  const y = PAD.t + (1 - 0.92 * Math.pow(1 - t, 1.7)) * (H - PAD.t - PAD.b) * 0.92 + 4;
  return [x, y] as const;
};
const curvePoints = Array.from({ length: 41 }, (_, i) => demand(i / 40));
const curvePath = curvePoints.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
const T_CURRENT = 0.3;
const T_PILOT = 0.52;
const travel = Array.from({ length: 12 }, (_, i) => demand(T_CURRENT + ((T_PILOT - T_CURRENT) * i) / 11));
const [cx0, cy0] = demand(T_CURRENT);
const [cx1, cy1] = demand(T_PILOT);

function ElasticityCurve() {
  const reduce = useReducedMotion();
  return (
    <svg className="curve" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Illustrative price elasticity curve: raising price lowers units sold, with a pilot price marked past the current price">
      <line className="curve-axis" x1={PAD.l} y1={H - PAD.b} x2={W - PAD.r} y2={H - PAD.b} />
      <line className="curve-axis" x1={PAD.l} y1={PAD.t} x2={PAD.l} y2={H - PAD.b} />
      <text className="curve-label" x={W - PAD.r} y={H - 10} textAnchor="end">Price →</text>
      <text className="curve-label" x={PAD.l} y={10}>Units sold</text>
      <line className="curve-drop" x1={cx0} y1={cy0} x2={cx0} y2={H - PAD.b} />
      <line className="curve-drop pilot" x1={cx1} y1={cy1} x2={cx1} y2={H - PAD.b} />
      <text className="curve-tick" x={cx0} y={H - 18} textAnchor="middle">Current</text>
      <text className="curve-tick pilot" x={cx1} y={H - 18} textAnchor="middle">Pilot</text>
      <motion.path
        className="curve-line"
        d={curvePath}
        fill="none"
        initial={reduce ? false : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.4, ease: "easeOut" }}
      />
      <circle className="curve-ring" cx={cx1} cy={cy1} r="9" />
      <motion.circle
        className="curve-marker"
        r="5"
        cx={cx0}
        cy={cy0}
        animate={reduce ? { cx: cx1, cy: cy1 } : { cx: travel.map((p) => p[0]), cy: travel.map((p) => p[1]) }}
        transition={reduce ? { duration: 0 } : { duration: 3.2, ease: "linear", repeat: Infinity, repeatType: "reverse", repeatDelay: 1.2 }}
      />
    </svg>
  );
}

export function LegendsDecisionArtifact() {
  return (
    <figure className="feature-artifact curve-figure">
      <p className="artifact-label">Pricing model · illustration</p>
      <ElasticityCurve />
      <dl className="curve-notes">
        <div><dt>Question</dt><dd>How far can stadium food and beverage prices move before demand drops?</dd></div>
        <div><dt>Method</dt><dd>Elasticity and sales-heatmap models across 1,400+ SKUs, then an A/B pilot on targeted SKUs and stands.</dd></div>
        <div><dt>Result</dt><dd>Projected $3.6M annual revenue uplift over current pricing.</dd></div>
      </dl>
    </figure>
  );
}

/* ---------- ClinicalHours: clinic workflow ---------- */

const clinicSteps: FlowStep[] = [
  { title: "Apply", text: "Students submit a role-based application.", visual: lines(3) },
  {
    title: "Review",
    text: "The clinic team reviews it.",
    visual: <span className="v-check"><svg viewBox="0 0 24 24" width="26" height="26"><circle cx="12" cy="12" r="10" /><path d="M7 12.5l3.2 3.2L17 9" /></svg></span>,
  },
  {
    title: "Onboard",
    text: "Accepted volunteers join the team.",
    visual: <span className="v-dots"><i /><i /><i /><i /><i /><i /></span>,
  },
  {
    title: "Schedule",
    text: "Shifts and hours are tracked in one place.",
    visual: <span className="v-grid">{Array.from({ length: 12 }, (_, i) => <i key={i} className={i % 5 === 1 ? "on" : ""} />)}</span>,
  },
];

export function ClinicalClinicArtifact() {
  return (
    <figure className="feature-artifact">
      <p className="artifact-label">Clinic workflow · illustration</p>
      <FlowRail steps={clinicSteps} label="Clinic volunteer workflow: apply, review, onboard, schedule" />
    </figure>
  );
}

export function ClinicalLeadFrame() {
  return (
    <figure className="feature-artifact feature-artifact-wide">
      <p className="artifact-label">Clinic workflow · illustration</p>
      <FlowRail steps={clinicSteps} label="Clinic volunteer workflow: apply, review, onboard, schedule" />
    </figure>
  );
}

export function ClinicalSupportingFrames() {
  return (
    <div className="clinical-gallery">
      <figure className="frame frame-clinical">
        <div className="frame-chrome">
          <span className="frame-url">clinicalhours.org · opportunities</span>
          <span className="frame-tag">Live product</span>
        </div>
        <img src="/img/clinicalhours-opportunities.jpg" alt="ClinicalHours opportunity list, sorted by distance" width="1600" height="517" />
        <figcaption>Students find a clinic, save it, and track it.</figcaption>
      </figure>
      <figure className="frame frame-clinical">
        <div className="frame-chrome">
          <span className="frame-url">clinicalhours.org · map</span>
          <span className="frame-tag">Live product</span>
        </div>
        <img src="/img/clinicalhours-product.png" alt="ClinicalHours opportunity map interface" width="1800" height="1039" />
        <figcaption>The same search on a map: clinics, hospitals, saved sites.</figcaption>
      </figure>
      <div className="clinical-photos">
        <figure>
          <img src="/img/clinicalhours-pitch.jpg" alt="Shivam Kanodia pitching ClinicalHours to judges" />
          <figcaption>Pitching ClinicalHours.</figcaption>
        </figure>
        <figure>
          <img src="/img/clinicalhours-win.jpg" alt="ClinicalHours team with the Good Bull Pitch award check" />
          <figcaption>Good Bull Pitch, 3rd place, $200.</figcaption>
        </figure>
      </div>
    </div>
  );
}
