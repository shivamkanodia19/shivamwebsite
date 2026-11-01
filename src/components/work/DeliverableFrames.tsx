export function MaticFrame() {
  return (
    <figure className="frame frame-matic">
      <div className="frame-chrome">
        <span className="frame-dots" aria-hidden="true"><i /><i /><i /></span>
        <span className="frame-url">pulsematic · inside provider ai</span>
        <span className="frame-tag">System frame</span>
      </div>
      <div className="inbox" aria-label="PulseMatic workflow: a task queue, a draft, retrieved chart sections, and a physician review gate">
        <section className="inbox-col">
          <p>Queue</p>
          <ul>
            <li><span>Refill request</span><b>24</b></li>
            <li><span>Lab result</span><b>18</b></li>
            <li className="is-active"><span>Chart update</span><b>11</b></li>
          </ul>
          <small>50 to 100 tasks a day</small>
        </section>
        <section className="inbox-col inbox-draft">
          <p>Draft</p>
          <div className="draft-card">
            <strong>Reply ready for review</strong>
            <span>Uses the retrieved chart sections. Does not send itself.</span>
            <span className="draft-pass">90% first-pass</span>
          </div>
          <div className="gate">Unsupported draft → physician</div>
        </section>
        <section className="inbox-col">
          <p>Retrieved</p>
          <ul>
            <li><span>Active meds</span><b>in</b></li>
            <li><span>Last refill</span><b>in</b></li>
            <li><span>Recent lab</span><b>in</b></li>
            <li className="is-out"><span>Rest of chart</span><b>out</b></li>
          </ul>
          <small>-64% latency · -82% tokens</small>
        </section>
      </div>
      <figcaption>How the inbox was structured. Not a screenshot of Matic's internal tools.</figcaption>
    </figure>
  );
}

export function LegendsFrame() {
  const rows = [
    { name: "Stand combo", elasticity: "High", width: "86%" },
    { name: "Premium pour", elasticity: "Mid", width: "58%" },
    { name: "Family bundle", elasticity: "Low", width: "34%" },
  ];

  return (
    <figure className="frame frame-legends">
      <div className="frame-chrome">
        <span className="frame-dots" aria-hidden="true"><i /><i /><i /></span>
        <span className="frame-url">menu model · att stadium to the portfolio</span>
        <span className="frame-tag">System frame</span>
      </div>
      <div className="venue" aria-label="Legends workflow: stadium whitespace, then SKU pricing, then venue rules">
        <section className="venue-gap">
          <p>Whitespace</p>
          <strong>AT&T Stadium</strong>
          <span>Dallas Cowboys · peer NFL sales · DFW fans</span>
          <div className="concept-row">
            <b>Add</b><b>Cut</b><b>Reprice</b>
          </div>
        </section>
        <section className="venue-sheet">
          <p>Pricing sheet</p>
          <div className="sheet-head"><span>SKU</span><span>Elasticity</span><span>Signal</span></div>
          {rows.map((row) => (
            <div className="sheet-row" key={row.name}>
              <span>{row.name}</span>
              <span>{row.elasticity}</span>
              <span><i style={{ width: row.width }} /></span>
            </div>
          ))}
          <small>1,400+ SKUs · Databricks SQL · A/B stands</small>
        </section>
        <section className="venue-scale">
          <p>Portfolio</p>
          <strong>400+</strong>
          <span>venues on the same menu rules</span>
          <ol>
            <li>10 merchandising strategies</li>
            <li>Graph workflow + hard rules</li>
            <li>KPI / OKR dashboard</li>
          </ol>
        </section>
      </div>
      <figcaption>How the pricing work was structured. Not a screenshot of Legends' internal tools. $3.6M is a projection.</figcaption>
    </figure>
  );
}

export function ClinicalFrames() {
  return (
    <div className="clinical-gallery">
      <figure className="frame frame-clinical">
        <div className="frame-chrome">
          <span className="frame-dots" aria-hidden="true"><i /><i /><i /></span>
          <span className="frame-url">clinicalhours.org · opportunities</span>
          <span className="frame-tag">Shipped</span>
        </div>
        <img src="/img/clinicalhours-opportunities.jpg" alt="ClinicalHours opportunity list, sorted by distance" width="1600" height="517" />
        <figcaption>Student side. Find a clinic, save it, track it.</figcaption>
      </figure>
      <figure className="frame frame-clinical">
        <div className="frame-chrome">
          <span className="frame-dots" aria-hidden="true"><i /><i /><i /></span>
          <span className="frame-url">clinicalhours.org · map</span>
          <span className="frame-tag">Shipped</span>
        </div>
        <img src="/img/clinicalhours-product.png" alt="ClinicalHours opportunity map interface" width="1800" height="1039" />
        <figcaption>The same directory on a map. Clinics, hospitals, and saved sites.</figcaption>
      </figure>
      <div className="clinical-photos">
        <figure>
          <img src="/img/clinicalhours-pitch.jpg" alt="Shivam presenting ClinicalHours to judges" />
          <figcaption>Pitching the clinic workflow.</figcaption>
        </figure>
        <figure>
          <img src="/img/clinicalhours-win.jpg" alt="ClinicalHours team with the Good Bull Pitch award check" />
          <figcaption>Good Bull Pitch, 3rd, $200.</figcaption>
        </figure>
      </div>
      <ul className="recognition-pills" aria-label="ClinicalHours recognition">
        <li><b>Top 10%</b><span>Y Combinator applicants</span></li>
        <li><b>Finalist</b><span>Ideas Challenge</span></li>
        <li><b>3 of 60</b><span>Meloy Bullet Pitch</span></li>
        <li><b>1 of 3</b><span>Meloy Launch, from 11 teams</span></li>
      </ul>
    </div>
  );
}
