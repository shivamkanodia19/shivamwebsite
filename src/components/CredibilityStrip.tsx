const signals = [
  ["Build", "Software & automation"],
  ["Analyze", "Data & operations"],
  ["Decide", "Product & strategy"],
];

export function CredibilityStrip() {
  return (
    <div className="signal-strip" aria-label="Core capabilities">
      <div className="site-container signal-grid">
        <p className="signal-lead">One operating thread</p>
        {signals.map(([verb, detail]) => (
          <div key={verb} className="signal-item">
            <span>{verb}</span>
            <small>{detail}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
