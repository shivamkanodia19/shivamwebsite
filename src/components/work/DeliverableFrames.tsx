export function MaticFrame() {
  return (
    <figure className="frame frame-matic">
      <div className="frame-chrome">
        <span className="frame-url">PulseMatic workflow · reconstruction</span>
        <span className="frame-tag">Labeled diagram</span>
      </div>
      <div
        className="inbox inbox-flow"
        aria-label="PulseMatic workflow: task arrives, relevant chart sections are retrieved, a draft is written, then a physician reviews or an unsupported case is escalated"
      >
        <section className="inbox-col">
          <p>01 Task</p>
          <ul>
            <li className="is-active"><span>Refill, lab, or chart update</span></li>
          </ul>
          <small>Typical day: 50 to 100 tasks</small>
        </section>
        <section className="inbox-col">
          <p>02 Retrieve</p>
          <ul>
            <li><span>Active meds</span><b>in</b></li>
            <li><span>Last refill / recent lab</span><b>in</b></li>
            <li className="is-out"><span>Rest of chart</span><b>out</b></li>
          </ul>
          <small>Section retrieval, not full-chart dump</small>
        </section>
        <section className="inbox-col inbox-draft">
          <p>03 Draft</p>
          <div className="draft-card">
            <strong>Reply prepared from retrieved sections</strong>
            <span>Does not send itself. Accuracy checks run before release.</span>
          </div>
        </section>
        <section className="inbox-col">
          <p>04 Review</p>
          <div className="draft-card">
            <strong>Physician confirms supported drafts</strong>
            <span className="draft-pass">About 90% first-pass approval</span>
          </div>
          <div className="gate">Unsupported → physician handles exception</div>
        </section>
      </div>
      <figcaption>
        How the workflow works. Reconstruction, not a screenshot of Matic&apos;s internal tools. After section retrieval: 64% lower latency, 82% lower token cost.
      </figcaption>
    </figure>
  );
}

export function MaticWorkflowMini() {
  return (
    <figure className="feature-artifact">
      <div className="feature-artifact-head">
        <span>Fig. 01</span>
        <span>Reconstruction</span>
      </div>
      <ol className="workflow-rail" aria-label="PulseMatic causal workflow">
        <li>
          <strong>Task</strong>
          <span>Refill, lab, or chart update enters the inbox.</span>
        </li>
        <li>
          <strong>Retrieve</strong>
          <span>Only the chart sections that matter are pulled in.</span>
        </li>
        <li>
          <strong>Draft</strong>
          <span>A reply is written from those sections. It does not send itself.</span>
        </li>
        <li>
          <strong>Review</strong>
          <span>Physician confirms supported drafts; unsupported cases escalate.</span>
        </li>
      </ol>
      <figcaption>Causal order for PulseMatic. Not a product screenshot.</figcaption>
    </figure>
  );
}

export function LegendsDecisionArtifact() {
  return (
    <figure className="feature-artifact">
      <div className="feature-artifact-head">
        <span>Fig. 02</span>
        <span>Pricing decision</span>
      </div>
      <div className="decision-board" aria-label="Stadium pricing decision excerpt">
        <div>
          <p className="decision-kicker">Question</p>
          <p>Where can AT&amp;T Stadium food and beverage pricing move without losing fan-friendly positioning?</p>
        </div>
        <div>
          <p className="decision-kicker">Inputs</p>
          <p>Price elasticity · sales heatmaps · peer NFL venue comps · DFW fan demographics</p>
        </div>
        <div>
          <p className="decision-kicker">Observation</p>
          <p>Modeled fan-friendly repricing across 1,400+ SKUs and designed an A/B pilot for targeted stands.</p>
        </div>
        <div className="decision-result">
          <p className="decision-kicker">Projected opportunity</p>
          <p><strong>$3.6M</strong> annual uplift versus current pricing. Projection, not realized revenue. Intended scope later included 400+ venues.</p>
        </div>
      </div>
      <figcaption>One analytical decision from the Legends internship. Stadium context is setting, not proof of impact.</figcaption>
    </figure>
  );
}

export function ClinicalClinicArtifact() {
  return (
    <figure className="feature-artifact">
      <div className="feature-artifact-head">
        <span>Fig. 03</span>
        <span>Clinic-side reconstruction</span>
      </div>
      <div className="clinic-flow" aria-label="Clinic volunteer application and onboarding workflow">
        <div>
          <strong>01 Apply</strong>
          <span>Student submits a role-based application.</span>
        </div>
        <div>
          <strong>02 Review</strong>
          <span>Clinic admin reviews against open shifts and requirements.</span>
        </div>
        <div>
          <strong>03 Onboard</strong>
          <span>Accepted volunteers move into scheduling and team management.</span>
        </div>
        <div>
          <strong>04 Run</strong>
          <span>BCS Free Health Clinic ran the full volunteer program on the platform.</span>
        </div>
      </div>
      <figcaption>Labeled reconstruction of the clinic workflow described in the case. Student discovery screens remain separate live product evidence.</figcaption>
    </figure>
  );
}

export function ClinicalFrames() {
  return (
    <div className="clinical-gallery">
      <ClinicalClinicArtifact />
      <figure className="frame frame-clinical">
        <div className="frame-chrome">
          <span className="frame-url">clinicalhours.org · opportunities</span>
          <span className="frame-tag">Live product</span>
        </div>
        <img src="/img/clinicalhours-opportunities.jpg" alt="ClinicalHours opportunity list, sorted by distance" width="1600" height="517" />
        <figcaption>Student discovery. Find a clinic, save it, track it. Supports recruiting intake, not the full clinic admin workflow alone.</figcaption>
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
          <figcaption>Supporting context. Pitching the clinic workflow.</figcaption>
        </figure>
        <figure>
          <img src="/img/clinicalhours-win.jpg" alt="ClinicalHours team with the Good Bull Pitch award check" />
          <figcaption>Good Bull Pitch, 3rd, $200.</figcaption>
        </figure>
      </div>
      <ul className="recognition-list" aria-label="ClinicalHours recognition">
        <li>Ideas Challenge finalist</li>
        <li>Meloy Bullet Pitch, 3 of 60</li>
        <li>Meloy Launch, 1 of 3 teams selected from 11</li>
        <li>Good Bull Pitch, 3rd place</li>
      </ul>
    </div>
  );
}
