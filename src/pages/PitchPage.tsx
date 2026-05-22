import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { DeckEngine } from "@/components/DeckEngine";
import { VoxelAudienceRow, VoxelPresenter } from "@/components/pitch/VoxelPitchScene";

export function PitchPage() {
  const reduceMotion = useReducedMotion();
  const [ready, setReady] = useState(false);
  const closeBtnRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => {
      setReady(true);
      closeBtnRef.current?.focus();
    }, 80);
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-0 flex flex-col items-center justify-center bg-[#030303] p-3 sm:p-6"
      style={{
        backgroundImage:
          "radial-gradient(ellipse 85% 65% at 50% 38%, rgba(55,52,48,0.45) 0%, transparent 55%), radial-gradient(ellipse 100% 90% at 50% 100%, rgba(0,0,0,0.85) 0%, #030303 45%)",
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,transparent_0%,rgba(0,0,0,0.55)_100%)]" />

      <Link
        ref={closeBtnRef}
        to="/"
        className="absolute left-4 top-4 z-[210] rounded border border-[#3a3a3a] bg-[#0d0d0d]/90 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[#b0b0b0] backdrop-blur-sm transition-colors hover:border-[#888] hover:text-[#fafaf8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#888] sm:left-6 sm:top-6"
      >
        ← Home
      </Link>

      <p className="absolute right-4 top-4 z-[210] hidden font-mono text-[9px] uppercase tracking-[0.2em] text-[#444] sm:right-6 sm:top-[1.4rem] sm:block">
        shivamkanodia.com/pitch
      </p>

      <div className="relative z-[205] flex h-[min(96dvh,980px)] w-full max-w-[min(99vw,1500px)] flex-col">
        <p className="mb-1 text-center font-mono text-[9px] uppercase tracking-[0.28em] text-[#555]">
          {"— Pitch —"}
        </p>

        {/* Combined screen + theater floor — single rounded frame */}
        <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg shadow-[0_0_0_1px_rgba(255,255,255,0.07),0_25px_80px_-20px_rgba(0,0,0,0.9)] ring-1 ring-white/10">

          {/* Slide screen — fills all remaining space */}
          <motion.div
            className="relative min-h-0 flex-1"
            initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.96 }}
            animate={{ opacity: ready ? 1 : 0, scale: 1 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="absolute inset-0">
              <DeckEngine
                mode="presentation"
                initialSlideIndex={0}
                onRequestClose={() => {
                  window.location.href = "/";
                }}
              />
            </div>
          </motion.div>

          {/* Theater floor — presenter stage-left, audience centered, zero overlap with slides */}
          <div
            className="relative shrink-0 overflow-hidden"
            style={{
              height: "clamp(68px, 9%, 104px)",
              background: "linear-gradient(to bottom, #0c0c0c 0%, #030303 85%)",
              borderTop: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            {/* Subtle stage-light upward glow */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_90%_at_50%_0%,rgba(255,255,255,0.025),transparent)]" />

            {/* Presenter — stage left, bottom-anchored */}
            <div className="absolute bottom-0 left-[2.5%] z-10 w-[clamp(34px,5%,68px)]">
              <VoxelPresenter className="h-auto w-full opacity-80 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]" />
            </div>

            {/* Audience row — centered, bottom-anchored */}
            <div className="absolute bottom-0 left-1/2 w-[min(68%,800px)] -translate-x-1/2">
              <VoxelAudienceRow className="h-auto w-full opacity-72 drop-shadow-[0_-2px_10px_rgba(0,0,0,0.85)]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
