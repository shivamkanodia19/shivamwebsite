import { motion } from "framer-motion";
import { SlideWrapper } from "@/components/SlideWrapper";

type Props = { isActive?: boolean; showHint?: boolean };

const ease = [0.16, 1, 0.3, 1] as const;

type Status = "ACTIVE" | "IN PROGRESS" | "COMPLETE";

const projects: {
  name: string;
  one: string;
  metric: string;
  status: Status;
}[] = [
  {
    name: "ClinicalHours",
    one: "Volunteer scheduling infra for free clinics",
    metric: "BCS Free Health Clinic pilot",
    status: "ACTIVE",
  },
  {
    name: "FEDVT Research",
    one: "ML forecasting for feedlot cattle futures",
    metric: "SARIMA · TAMU Research Week",
    status: "IN PROGRESS",
  },
  {
    name: "FinSeek",
    one: "3-model fraud detection ensemble",
    metric: "PaySim benchmark",
    status: "COMPLETE",
  },
  {
    name: "Clara",
    one: "AI voice intake for clinical pre-visits",
    metric: "Workflow prototype",
    status: "COMPLETE",
  },
  {
    name: "Celvio",
    one: "Wearable NMES rehab device",
    metric: "$382M market",
    status: "COMPLETE",
  },
  {
    name: "Persona",
    one: "Universal verified digital identity layer",
    metric: "Ideathon 2nd place",
    status: "COMPLETE",
  },
];

const statusDot: Record<Status, string> = {
  ACTIVE: "bg-[#2D6A50]",
  "IN PROGRESS": "bg-[#C8A84B]",
  COMPLETE: "bg-[#555]",
};

const statusText: Record<Status, string> = {
  ACTIVE: "text-[#2D6A50]",
  "IN PROGRESS": "text-[#C8A84B]",
  COMPLETE: "text-[#888]",
};

export function Slide03Portfolio(_props: Props) {
  return (
    <SlideWrapper label="PORTFOLIO" className="bg-[#080808]">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="mb-4 font-mono text-[10px] uppercase tracking-[0.35em] text-[#333]"
      >
        03 — Portfolio
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18, duration: 0.55, ease }}
        className="mb-7 font-playfair font-normal leading-tight tracking-[-0.02em] text-[#F5F2EE]"
        style={{ fontSize: "clamp(30px, 3.8vw, 52px)" }}
      >
        The work.
      </motion.h2>

      {/* 3-column × 2-row grid */}
      <div className="grid grid-cols-2 gap-[10px] md:grid-cols-3">
        {projects.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28 + i * 0.07, duration: 0.45, ease }}
            className="flex flex-col justify-between rounded-xl border border-[#1a1a1a] bg-[#0e0e0e] px-5 py-4 min-h-[110px] transition-colors hover:border-[#2a2a2a] hover:bg-[#111]"
          >
            {/* ClinicalHours pitch photo */}
            {p.name === "ClinicalHours" && (
              <div className="mb-2 overflow-hidden rounded">
                <img src="/img/clinicalhours-pitch.jpg" alt="ClinicalHours pitch" className="h-[60px] w-full object-cover object-[center_25%] opacity-60" />
              </div>
            )}
            {/* Persona win photo */}
            {p.name === "Persona" && (
              <div className="mb-2 overflow-hidden rounded">
                <img src="/img/persona-win.jpg" alt="Persona competition win" className="h-[60px] w-full object-cover object-center opacity-60" />
              </div>
            )}

            {/* Top row: name + status dot */}
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-playfair text-[clamp(13px,1.4vw,17px)] font-normal text-[#F5F2EE]">
                {p.name}
              </h3>
              <span
                className={`mt-1 h-[7px] w-[7px] shrink-0 rounded-full ${statusDot[p.status]}`}
                title={p.status}
                aria-label={p.status}
              />
            </div>

            {/* One-liner */}
            <p className="mt-2 font-mono text-[10px] leading-[1.6] text-[#555]">
              {p.one}
            </p>

            {/* Metric */}
            <p className={`mt-3 font-mono text-[10px] font-medium ${statusText[p.status]}`}>
              {p.metric}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.4 }}
        className="mt-5 flex gap-6"
      >
        {(["ACTIVE", "IN PROGRESS", "COMPLETE"] as Status[]).map((s) => (
          <span key={s} className="flex items-center gap-1.5">
            <span className={`h-[6px] w-[6px] rounded-full ${statusDot[s]}`} aria-hidden />
            <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#3a3a3a]">
              {s}
            </span>
          </span>
        ))}
      </motion.div>
    </SlideWrapper>
  );
}
