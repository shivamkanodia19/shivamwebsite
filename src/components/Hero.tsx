import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { usePresentation } from "@/context/PresentationContext";

export function Hero() {
  const { openPresentation } = usePresentation();
  const [showScroll, setShowScroll] = useState(true);

  useEffect(() => {
    const onScroll = () => setShowScroll(window.scrollY <= 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onAbout = () => {
    openPresentation(1);
  };

  return (
    <section id="hero" className="relative min-h-[100svh] overflow-hidden bg-[#0D0D0D]" aria-label="Hero">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(250,250,248,0.08),transparent_42%),radial-gradient(circle_at_78%_62%,rgba(250,250,248,0.05),transparent_48%)]" aria-hidden />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "96px 96px",
        }}
        aria-hidden
      />

      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-[#0D0D0D]" aria-hidden />

      <div className="relative z-20 mx-auto flex min-h-[100svh] w-full max-w-6xl items-center px-6 pt-20 md:px-12">
        <div className="grid w-full items-center gap-12 md:grid-cols-[minmax(0,1fr)_320px] md:gap-10">
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.35 }}
              className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#575757]"
            >
              {"TEXAS A&M \u00B7 ISE HONORS \u00B7 CLASS OF 2029"}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.45 }}
              className="mt-4 font-playfair font-normal leading-[0.92] tracking-[-0.02em] text-[#FAFAF8]"
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
              className="mt-6 max-w-xl font-mono text-[12px] leading-relaxed tracking-[0.08em] text-[#8A8A8A]"
            >
              Building disciplined systems across research, product, and performance.
            </motion.p>

            <motion.button
              type="button"
              onClick={onAbout}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.35 }}
              className="mt-9 rounded border border-[#3A3A3A] bg-transparent px-7 py-3 font-mono text-[12px] tracking-[0.08em] text-[#A0A0A0] transition-colors duration-200 hover:border-[#FAFAF8] hover:text-[#FAFAF8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#888]"
              style={{ borderRadius: "4px" }}
            >
              About me
            </motion.button>
          </div>

          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35, duration: 0.55 }}
            className="hidden border border-[#242424] bg-[rgba(250,250,248,0.02)] p-6 md:block"
            style={{ borderRadius: "8px" }}
            aria-label="Hero highlights"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#666]">Focus Areas</p>
            <ul className="mt-6 space-y-5">
              <li className="border-l border-[#333] pl-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#6F6F6F]">Research</p>
                <p className="mt-2 font-mono text-[12px] leading-relaxed tracking-[0.06em] text-[#9A9A9A]">
                  Applied systems and decision frameworks.
                </p>
              </li>
              <li className="border-l border-[#333] pl-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#6F6F6F]">Build</p>
                <p className="mt-2 font-mono text-[12px] leading-relaxed tracking-[0.06em] text-[#9A9A9A]">
                  Product execution from idea to iteration.
                </p>
              </li>
              <li className="border-l border-[#333] pl-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#6F6F6F]">Compete</p>
                <p className="mt-2 font-mono text-[12px] leading-relaxed tracking-[0.06em] text-[#9A9A9A]">
                  Powerlifting mindset applied to long-term outcomes.
                </p>
              </li>
            </ul>
          </motion.aside>
        </div>
      </div>

      {showScroll ? (
        <div className="pointer-events-none absolute bottom-4 left-1/2 z-30 -translate-x-1/2 text-center">
          <p className="font-mono text-[9px] tracking-[0.2em] text-[#5a5a5a]">SCROLL</p>
          <span className="hero-scroll-hint mt-1 block text-[#5a5a5a]">{"\u2193"}</span>
        </div>
      ) : null}
    </section>
  );
}
