import { contactLinks } from "@/data/slides";

export function SiteFooter() {
  return (
    <footer id="site-contact" className="site-footer">
      <div className="site-container footer-grid">
        <div>
          <p className="footer-name">Shivam Kanodia</p>
          <p className="footer-position">Product thinking. Technical execution. Operational impact.</p>
        </div>
        <div className="footer-links">
          <a href={`mailto:${contactLinks.email}`}>Email <span>↗</span></a>
          <a href={contactLinks.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <span>↗</span></a>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">Résumé <span>↗</span></a>
        </div>
      </div>
      <div className="site-container footer-meta">
        <span>Texas A&amp;M · Industrial &amp; Systems Engineering Honors</span>
        <span>Built with intent · 2026</span>
      </div>
    </footer>
  );
}
