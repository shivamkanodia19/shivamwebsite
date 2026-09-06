import { contactLinks } from "@/data/slides";
import { TrackedLink } from "@/analytics/TrackedLink";

export function SiteFooter() {
  return (
    <footer id="site-contact" className="site-footer">
      <div className="site-container footer-grid">
        <div>
          <p className="footer-name">Shivam Kanodia</p>
          <p className="footer-position">Systems engineering across software, business intelligence, and product ownership.</p>
        </div>
        <div className="footer-links">
          <TrackedLink href={`mailto:${contactLinks.email}`} tracking={{ eventName: "contact_clicked", properties: { channel: "email" } }}>Email <span aria-hidden="true">↗</span></TrackedLink>
          <TrackedLink href={contactLinks.linkedin} target="_blank" rel="noopener noreferrer" tracking={{ eventName: "contact_clicked", properties: { channel: "linkedin" } }}>LinkedIn <span aria-hidden="true">↗</span></TrackedLink>
          <TrackedLink href="/resume.pdf" target="_blank" rel="noopener noreferrer" tracking={{ eventName: "resume_viewed", properties: { placement: "footer" } }}>Resume <span aria-hidden="true">↗</span></TrackedLink>
          <TrackedLink href="/pitch" tracking={{ eventName: "pitch_opened", properties: {} }}>Pitch <span aria-hidden="true">↗</span></TrackedLink>
        </div>
      </div>
      <div className="site-container footer-meta">
        <span>Texas A&amp;M / Industrial &amp; Systems Engineering Honors, M.S. Finance</span>
        <span>Evidence checked / 2026</span>
      </div>
      <p className="site-container footer-privacy">Privacy: Anonymous analytics measure visits and interactions. Session replays mask page text and inputs, and analytics is disabled on private admin pages.</p>
    </footer>
  );
}
