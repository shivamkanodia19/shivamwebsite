export function MaticFrame() {
  return (
    <figure className="frame frame-matic">
      <div className="frame-chrome">
        <span className="frame-url">PulseMatic inside Provider AI</span>
        <span className="frame-tag">Workflow diagram</span>
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
            <span className="draft-pass">About 90% first-pass</span>
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
          <small>64% lower latency · 82% lower tokens</small>
        </section>
      </div>
      <figcaption>How the inbox was structured. Not a screenshot of Matic's internal tools.</figcaption>
    </figure>
  );
}

export function LegendsProjects() {
  return (
    <figure className="legends-arc" aria-label="How the Legends internship moved from one stadium to the venue portfolio">
      <ol>
        <li>
          <strong>Stadium</strong>
          <span>Food and beverage recommendations for AT&amp;T Stadium and the Cowboys</span>
        </li>
        <li>
          <strong>Pricing</strong>
          <span>1,400+ SKUs modeled for elasticity, heatmaps, and an A/B stand pilot</span>
        </li>
        <li>
          <strong>Portfolio</strong>
          <span>Menu rules and merchandising strategies meant to scale across 400+ venues</span>
        </li>
        <li>
          <strong>Tracking</strong>
          <span>A dashboard for KPIs and OKRs once the rest of the work was rolling</span>
        </li>
      </ol>
      <figcaption>$3.6M annual uplift is a projection versus current pricing, not a booked result.</figcaption>
    </figure>
  );
}

export function ClinicalFrames() {
  return (
    <div className="clinical-gallery">
      <figure className="frame frame-clinical">
        <div className="frame-chrome">
          <span className="frame-url">clinicalhours.org · opportunities</span>
          <span className="frame-tag">Live product</span>
        </div>
        <img src="/img/clinicalhours-opportunities.jpg" alt="ClinicalHours opportunity list, sorted by distance" width="1600" height="517" />
        <figcaption>Student side. Find a clinic, save it, track it.</figcaption>
      </figure>
      <figure className="frame frame-clinical">
        <div className="frame-chrome">
          <span className="frame-url">clinicalhours.org · map</span>
          <span className="frame-tag">Live product</span>
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
      <ul className="recognition-list" aria-label="ClinicalHours recognition">
        <li>Top 10% of Y Combinator applicants</li>
        <li>Ideas Challenge finalist</li>
        <li>Meloy Bullet Pitch, 3 of 60</li>
        <li>Meloy Launch, 1 of 3 teams selected from 11</li>
      </ul>
    </div>
  );
}
