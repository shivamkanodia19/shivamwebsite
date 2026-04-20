import { useEffect, useState } from "react";

function emitDeckNavigate(slide: number) {
  window.dispatchEvent(new CustomEvent("deck:navigate", { detail: { slide } }));
}

function scrollToDeck(slide: number) {
  emitDeckNavigate(slide);
  document.getElementById("deck")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed left-0 right-0 top-0 z-50 transition-all duration-200"
      style={{
        backgroundColor: scrolled ? "rgba(13,13,13,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
      }}
    >
      <div className="flex items-center justify-between px-6 py-4 md:px-12 md:py-5">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="border-0 bg-transparent p-0 font-playfair text-[20px] font-normal tracking-[0.05em] text-[#FAFAF8]"
          aria-label="Scroll to top"
        >
          SK
        </button>

        <nav className="flex items-center gap-5 md:gap-8">
          <button
            type="button"
            onClick={() => scrollToDeck(3)}
            className="border-0 bg-transparent p-0 font-mono text-[11px] uppercase tracking-[0.15em] text-[#666] transition-colors duration-150 hover:text-[#FAFAF8]"
          >
            Work
          </button>
          <button
            type="button"
            onClick={() => scrollToDeck(1)}
            className="border-0 bg-transparent p-0 font-mono text-[11px] uppercase tracking-[0.15em] text-[#666] transition-colors duration-150 hover:text-[#FAFAF8]"
          >
            Pitch
          </button>
          <button
            type="button"
            onClick={() => {
              emitDeckNavigate(7);
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="border-0 bg-transparent p-0 font-mono text-[11px] uppercase tracking-[0.15em] text-[#666] transition-colors duration-150 hover:text-[#FAFAF8]"
          >
            Contact
          </button>
        </nav>
      </div>
    </header>
  );
}
