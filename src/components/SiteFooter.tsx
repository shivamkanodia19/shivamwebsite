import { contactLinks } from "@/data/slides";

export function SiteFooter() {
  return (
    <footer id="site-contact" className="site-footer">
      <div className="site-container footer-grid">
        <div>
          <p className="footer-name">Shivam Kanodia</p>
          <p className="footer-position">Systems engineering across software, business intelligence, and product ownership.</p>
        </div>
        <div className="footer-links">
          <a href={`mailto:${contactLinks.email}`}>Email <span aria-hidden="true">↗</span></a>
          <a href={contactLinks.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">Resume <span aria-hidden="true">↗</span></a>
          <a href="/pitch">Pitch <span aria-hidden="true">↗</span></a>
        </div>
      </div>
      <div className="site-container footer-meta">
        <span>Texas A&amp;M / Industrial &amp; Systems Engineering Honors</span>
        <span>Evidence checked / 2026</span>
      </div>
    </footer>
  );
}
