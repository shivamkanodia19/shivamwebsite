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
            <span className="draft-pass">90% first-pass approval</span>
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
        <li className="workflow-review">
          <strong>Review</strong>
          <span>Physician confirms supported drafts.</span>
          <em className="workflow-branch">Unsupported → physician handles exception</em>
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
        <span>Pricing analysis</span>
      </div>
      <div className="decision-board" aria-label="Stadium pricing analysis and evaluation process">
        <div className="decision-stage">
          <p className="decision-kicker">Question</p>
          <p>Where can AT&amp;T Stadium food and beverage pricing move without losing fan-friendly positioning?</p>
        </div>
        <div className="decision-stage">
          <p className="decision-kicker">Inputs</p>
          <p>Price elasticity · sales heatmaps · peer NFL venue comps · DFW fan demographics</p>
        </div>
        <div className="decision-stage decision-work">
          <p className="decision-kicker">Work delivered</p>
          <p>Modeled price elasticity and sales heatmaps for 1,400+ SKUs and designed an A/B pilot for targeted SKUs and stands.</p>
        </div>
        <div className="decision-result">
          <p className="decision-kicker">Projected annual revenue opportunity</p>
          <p><strong>$3.6M</strong> projected annual revenue uplift over current pricing.</p>
        </div>
        <div className="decision-scope">
          <p className="decision-kicker">Separate scope</p>
          <p>A separate menu optimization platform is intended for 400+ venues.</p>
        </div>
      </div>
      <figcaption>Reconstructed analysis and evaluation process from the Legends internship.</figcaption>
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
          <span>Clinic team reviews the application.</span>
        </div>
        <div>
          <strong>03 Onboard</strong>
          <span>Accepted volunteers move into scheduling and team management.</span>
        </div>
        <div>
          <strong>04 Operate</strong>
          <span>Scheduling and team management stay in one place.</span>
        </div>
      </div>
      <figcaption>Labeled reconstruction of the clinic workflow described in the case.</figcaption>
    </figure>
  );
}

export function ClinicalLeadFrame() {
  return <ClinicalClinicArtifact />;
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
        <figcaption>Student discovery interface. Find a clinic, save it, track it.</figcaption>
      </figure>
      <figure className="frame frame-clinical">
        <div className="frame-chrome">
          <span className="frame-url">clinicalhours.org · map</span>
          <span className="frame-tag">Live product</span>
        </div>
        <img src="/img/clinicalhours-product.png" alt="ClinicalHours opportunity map interface" width="1800" height="1039" />
        <figcaption>Student discovery interface on a map. Clinics, hospitals, and saved sites.</figcaption>
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
