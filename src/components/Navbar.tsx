import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const links = [
  ["Work", "work"],
  ["Approach", "approach"],
  ["Research", "research"],
  ["Projects", "projects"],
] as const;

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 16);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  function navigate(id: string) {
    setMenuOpen(false);
    scrollToSection(id);
  }

  return (
    <header className={`site-header ${scrolled || menuOpen ? "site-header-solid" : ""}`}>
      <div className="nav-inner">
        {isHome ? (
          <button className="wordmark" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top">
            SK<span>.</span>
          </button>
        ) : (
          <Link to="/" className="wordmark" aria-label="Home">SK<span>.</span></Link>
        )}

        {isHome ? (
          <>
            <nav className="desktop-nav" aria-label="Primary navigation">
              {links.map(([label, id]) => <button key={id} onClick={() => navigate(id)}>{label}</button>)}
            </nav>
            <div className="nav-actions">
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="nav-resume">Résumé ↗</a>
              <button className="menu-toggle" onClick={() => setMenuOpen((value) => !value)} aria-expanded={menuOpen} aria-label="Toggle navigation">
                <span /><span />
              </button>
            </div>
          </>
        ) : (
          <Link to="/" className="nav-resume">Back to portfolio</Link>
        )}
      </div>
      {isHome && menuOpen ? (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {links.map(([label, id]) => <button key={id} onClick={() => navigate(id)}>{label}<span>↘</span></button>)}
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">Résumé <span>↗</span></a>
        </nav>
      ) : null}
    </header>
  );
}
