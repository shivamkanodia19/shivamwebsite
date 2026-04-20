import { useCallback, useEffect, useRef, useState } from "react";

function emitDeckNavigate(slide: number) {
  window.dispatchEvent(new CustomEvent("deck:navigate", { detail: { slide } }));
}

function scrollToDeck(slide: number) {
  emitDeckNavigate(slide);
  document.getElementById("deck")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

type ActiveZone = "hero" | "deck" | "contact";

function computeActiveZone(): ActiveZone {
  const vh = window.innerHeight;
  const contact = document.getElementById("contact");
  if (contact) {
    const cr = contact.getBoundingClientRect();
    if (cr.top < vh * 0.42 && cr.bottom > vh * 0.18) return "contact";
  }
  const deck = document.getElementById("deck");
  if (deck) {
    const dr = deck.getBoundingClientRect();
    if (dr.top < vh * 0.52 && dr.bottom > vh * 0.28) return "deck";
  }
  return "hero";
}

const navBtn =
  "rounded-sm border-0 bg-transparent px-2 py-2 font-mono text-[11px] uppercase tracking-[0.15em] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#888]";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [zone, setZone] = useState<ActiveZone>("hero");
  const raf = useRef<number | null>(null);

  const onScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
    if (raf.current !== null) return;
    raf.current = requestAnimationFrame(() => {
      raf.current = null;
      setZone(computeActiveZone());
    });
  }, []);

  useEffect(() => {
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf.current !== null) cancelAnimationFrame(raf.current);
    };
  }, [onScroll]);

  const deckNav = zone === "deck";
  const contactNav = zone === "contact";
  const homeNav = zone === "hero";

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
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={`border-0 bg-transparent p-0 font-playfair text-[20px] font-normal tracking-[0.05em] transition-colors duration-200 ${
            homeNav ? "text-[#FAFAF8]" : "text-[#8A8A8A] hover:text-[#E0E0E0]"
          }`}
          aria-label="Back to top"
          aria-current={homeNav ? "true" : undefined}
        >
          SK
        </button>

        <nav className="flex items-center gap-1 md:gap-4" aria-label="Primary">
          <button
            type="button"
            onClick={() => scrollToDeck(3)}
            title="Open portfolio slide in the deck"
            className={`${navBtn} ${deckNav ? "text-[#E8E0D0]" : "text-[#666] hover:text-[#C0C0C0]"}`}
          >
            Portfolio
          </button>
          <button
            type="button"
            onClick={() => scrollToDeck(1)}
            title="Start the pitch deck"
            className={`${navBtn} ${deckNav ? "text-[#E8E0D0]" : "text-[#666] hover:text-[#C0C0C0]"}`}
            aria-current={deckNav ? "page" : undefined}
          >
            Pitch
          </button>
          <button
            type="button"
            onClick={() => {
              emitDeckNavigate(7);
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            title="Jump to contact"
            className={`${navBtn} ${contactNav ? "text-[#E8E0D0]" : "text-[#666] hover:text-[#C0C0C0]"}`}
            aria-current={contactNav ? "page" : undefined}
          >
            Contact
          </button>
        </nav>
      </div>
    </header>
  );
}
