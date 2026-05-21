import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

type ActiveZone = "hero" | "contact";

function computeActiveZone(): ActiveZone {
  const vh = window.innerHeight;
  const contact = document.getElementById("site-contact");
  if (contact) {
    const cr = contact.getBoundingClientRect();
    if (cr.top < vh * 0.52 && cr.bottom > vh * 0.18) return "contact";
  }
  return "hero";
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

const navBtn =
  "rounded-sm border-0 bg-transparent px-2 py-2 font-mono text-[11px] uppercase tracking-[0.15em] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#888]";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [zone, setZone] = useState<ActiveZone>("hero");
  const raf = useRef<number | null>(null);
  const location = useLocation();
  const isHome = location.pathname === "/";

  const onScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
    if (raf.current !== null) return;
    raf.current = requestAnimationFrame(() => {
      raf.current = null;
      setZone(computeActiveZone());
    });
  }, []);

  useEffect(() => {
    if (!isHome) return;
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf.current !== null) cancelAnimationFrame(raf.current);
    };
  }, [onScroll, isHome]);

  const contactActive = isHome && zone === "contact";
  const homeActive = isHome && zone === "hero";

  return (
    <header
      className="fixed left-0 right-0 top-0 z-50 transition-all duration-200"
      style={{
        backgroundColor: scrolled ? "rgba(13,13,13,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      }}
    >
      <div className="flex items-center justify-between px-6 py-4 md:px-12 md:py-5">
        {isHome ? (
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={`border-0 bg-transparent p-0 font-playfair text-[20px] font-normal tracking-[0.05em] transition-colors duration-200 ${
              homeActive ? "text-[#FAFAF8]" : "text-[#8A8A8A] hover:text-[#E0E0E0]"
            }`}
            aria-label="Back to top"
          >
            SK
          </button>
        ) : (
          <Link
            to="/"
            className="font-playfair text-[20px] font-normal tracking-[0.05em] text-[#8A8A8A] transition-colors duration-200 hover:text-[#E0E0E0]"
            aria-label="Home"
          >
            SK
          </Link>
        )}

        <nav className="flex items-center gap-1 md:gap-4" aria-label="Primary">
          {isHome ? (
            <button
              type="button"
              onClick={() => scrollTo("portfolio")}
              className={`${navBtn} text-[#666] hover:text-[#C0C0C0]`}
            >
              Portfolio
            </button>
          ) : null}

          <Link
            to="/pitch"
            className={`${navBtn} ${location.pathname === "/pitch" ? "text-[#E8E0D0]" : "text-[#666] hover:text-[#C0C0C0]"}`}
            aria-current={location.pathname === "/pitch" ? "page" : undefined}
          >
            Pitch
          </Link>

          {isHome ? (
            <button
              type="button"
              onClick={() => scrollTo("site-contact")}
              className={`${navBtn} ${contactActive ? "text-[#E8E0D0]" : "text-[#666] hover:text-[#C0C0C0]"}`}
              aria-current={contactActive ? "page" : undefined}
            >
              Contact
            </button>
          ) : null}
        </nav>
      </div>
    </header>
  );
}
