import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function emitDeckNavigate(slide: number) {
  window.dispatchEvent(new CustomEvent("deck:navigate", { detail: { slide } }));
}

export function Hero() {
  const [showScroll, setShowScroll] = useState(true);

  useEffect(() => {
    const onScroll = () => setShowScroll(window.scrollY <= 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onCta = () => {
    emitDeckNavigate(1);
    document.getElementById("deck")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative h-[100svh] overflow-hidden bg-[#0D0D0D]" aria-label="Hero">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
        aria-hidden
      />

      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-[#0D0D0D]" aria-hidden />

      <div className="absolute left-[8vw] top-1/2 z-20 w-[min(480px,84vw)] -translate-y-1/2">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.35 }}
          className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#444]"
        >
          TEXAS A&M · ISE HONORS · CLASS OF 2029
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.45 }}
          className="mt-4 font-playfair font-normal leading-[0.95] tracking-[-0.02em] text-[#FAFAF8]"
          style={{ fontSize: "clamp(56px, 8vw, 112px)" }}
        >
          Shivam
        </motion.h1>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.45 }}
          className="font-playfair font-normal leading-[0.95] tracking-[-0.02em] text-[#FAFAF8]"
          style={{ fontSize: "clamp(56px, 8vw, 112px)" }}
        >
          Kanodia
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.35 }}
          className="mt-6 font-mono text-[13px] tracking-[0.1em] text-[#444]"
        >
          Founder · Researcher · Powerlifter
        </motion.p>

        <motion.button
          type="button"
          onClick={onCta}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65, duration: 0.35 }}
          className="mt-10 border border-[#333] bg-transparent px-7 py-3 font-mono text-[12px] text-[#666] transition-colors duration-200 hover:border-[#FAFAF8] hover:text-[#FAFAF8]"
          style={{ borderRadius: "4px" }}
        >
          See the pitch ?
        </motion.button>
      </div>

      <motion.img
        src="/shivam.png"
        alt="Shivam Kanodia standing with microphone"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="absolute bottom-0 right-[-5%] z-10 h-[70svh] w-auto object-contain opacity-[0.12] md:bottom-[-1%] md:right-[-2%] md:h-[88svh] md:opacity-100"
        style={{ filter: "drop-shadow(0 0 60px rgba(0,0,0,0.9))" }}
      />

      {showScroll ? (
        <div className="pointer-events-none absolute bottom-4 left-1/2 z-30 -translate-x-1/2 text-center">
          <p className="font-mono text-[9px] tracking-[0.2em] text-[#333]">SCROLL</p>
          <span className="mt-1 block animate-[heroChevron_1.3s_ease-in-out_infinite] text-[#333]">?</span>
        </div>
      ) : null}

      <style>{"@keyframes heroChevron{0%,100%{transform:translateY(0)}50%{transform:translateY(4px)}}"}</style>
    </section>
  );
}
