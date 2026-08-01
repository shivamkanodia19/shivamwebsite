import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const links = [
  ["Work", "matic"],
  ["Research", "research"],
  ["Hackathons", "projects"],
  ["Builds", "builds"],
  ["Outside work", "recognition"],
] as const;

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstMobileLinkRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 16);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    firstMobileLinkRef.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      window.requestAnimationFrame(() => toggleRef.current?.focus());
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

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
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="nav-resume">Resume ↗</a>
              <button
                ref={toggleRef}
                className="menu-toggle"
                onClick={() => setMenuOpen((value) => !value)}
                aria-expanded={menuOpen}
                aria-controls="mobile-navigation"
                aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              >
                <span /><span />
              </button>
            </div>
          </>
        ) : (
          <Link to="/" className="nav-resume">Back to portfolio</Link>
        )}
      </div>
      {isHome && menuOpen ? (
        <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">
          {links.map(([label, id], index) => (
            <button ref={index === 0 ? firstMobileLinkRef : undefined} key={id} onClick={() => navigate(id)}>{label}<span aria-hidden="true">↘</span></button>
          ))}
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">Resume <span aria-hidden="true">↗</span></a>
        </nav>
      ) : null}
    </header>
  );
}
