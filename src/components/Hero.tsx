import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function Hero() {
  const [showScroll, setShowScroll] = useState(true);

  useEffect(() => {
    const onScroll = () => setShowScroll(window.scrollY <= 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="hero" className="relative min-h-[100svh] overflow-hidden bg-[#F9F6F0]" aria-label="Hero">
      <div className="relative z-20 mx-auto flex min-h-[100svh] w-full max-w-6xl items-center px-6 pt-20 md:px-12">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.35 }}
            className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#666660]"
          >
            {"TEXAS A&M · ISE HONORS · CLASS OF 2029"}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.45 }}
            className="mt-4 font-playfair font-normal leading-[0.92] tracking-[-0.02em] text-[#1C1C1A]"
            style={{ fontSize: "clamp(50px, 8vw, 108px)" }}
          >
            Shivam
            <br />
            Kanodia
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.35 }}
            className="mt-6 max-w-xl font-mono text-[13px] leading-relaxed tracking-[0.06em] text-[#4A4845]"
          >
            Freshman at TAMU. Co-founder. Researcher. I build things that work.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.35 }}
            className="mt-2 font-mono text-[12px] leading-relaxed tracking-[0.06em] text-[#1B4332]"
          >
            Incoming BI Intern at Legends Global · Summer 2026.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.35 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <button
              type="button"
              onClick={() =>
                document.getElementById("about")?.scrollIntoView({ behavior: "smooth", block: "start" })
              }
              className="rounded border border-[#D8D0C4] bg-transparent px-7 py-3 font-mono text-[12px] tracking-[0.08em] text-[#5A5855] transition-colors duration-200 hover:border-[#1C1C1A] hover:text-[#1C1C1A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#888]"
              style={{ borderRadius: "4px" }}
            >
              About me
            </button>
            <Link
              to="/pitch"
              className="rounded border border-[#1B4332] bg-[#1B4332] px-7 py-3 font-mono text-[12px] tracking-[0.08em] text-white transition-colors duration-200 hover:bg-[#2D6A50] hover:border-[#2D6A50] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#888]"
              style={{ borderRadius: "4px" }}
            >
              View pitch
            </Link>
          </motion.div>
        </div>
      </div>

      {showScroll ? (
        <div className="pointer-events-none absolute bottom-4 left-1/2 z-30 -translate-x-1/2 text-center">
          <p className="font-mono text-[9px] tracking-[0.2em] text-[#B8B2AC]">SCROLL</p>
          <span className="hero-scroll-hint mt-1 block text-[#B8B2AC]">{"↓"}</span>
        </div>
      ) : null}
    </section>
  );
}
