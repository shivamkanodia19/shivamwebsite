import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });
  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />;
}

const tools = ["Python", "SQL", "Databricks", "Power BI", "GCP", "Claude", "Postgres", "Tableau", "Jira", "Excel"];

export function ToolStrip() {
  const doubled = [...tools, ...tools];
  return (
    <div className="tool-strip" aria-label="Tools: Python, SQL, Databricks, Power BI, GCP, Claude, Postgres, Tableau, Jira, Excel">
      <div className="tool-strip-inner" aria-hidden="true">
        {doubled.map((tool, i) => <span key={`${tool}-${i}`}>{tool}</span>)}
      </div>
    </div>
  );
}

export function ForecastSketch() {
  const reduce = useReducedMotion();
  const hist = "M0 70 L20 62 L40 66 L60 48 L80 54 L100 38 L120 44 L140 30";
  const pred = "M140 30 L170 26 L200 20 L230 16";
  return (
    <svg className="forecast" viewBox="0 0 240 90" role="img" aria-label="Illustrative forecast: historical prices, then a dashed forecast with a widening confidence band">
      <polygon className="forecast-band" points="140,30 170,18 200,6 230,-2 230,38 200,36 170,36" />
      <line className="forecast-split" x1="140" y1="0" x2="140" y2="82" />
      <motion.path
        className="forecast-hist" d={hist}
        initial={reduce ? false : { pathLength: 0 }} whileInView={{ pathLength: 1 }}
        viewport={{ once: true }} transition={{ duration: 1.2, ease: "easeOut" }}
      />
      <motion.path
        className="forecast-pred" d={pred}
        initial={reduce ? false : { pathLength: 0 }} whileInView={{ pathLength: 1 }}
        viewport={{ once: true }} transition={{ duration: 0.9, delay: 1.1, ease: "easeOut" }}
      />
      <text className="forecast-label" x="0" y="88">History</text>
      <text className="forecast-label" x="146" y="88">Forecast</text>
    </svg>
  );
}
