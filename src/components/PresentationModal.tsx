import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { usePresentation } from "@/context/PresentationContext";
import { DeckEngine } from "@/components/DeckEngine";
import { PresentationPitchIntro } from "@/components/pitch/PresentationPitchIntro";
import { VoxelAudienceRow, VoxelPresenter } from "@/components/pitch/VoxelPitchScene";

const INTRO_MS = 2600;

export function PresentationModal() {
  const { isOpen, closePresentation, startSlide } = usePresentation();
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();
  const [showDeck, setShowDeck] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setShowDeck(false);
      return;
    }
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => closeBtnRef.current?.focus(), 100);
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    if (reduceMotion) {
      setShowDeck(true);
      return;
    }
    setShowDeck(false);
    const id = window.setTimeout(() => setShowDeck(true), INTRO_MS);
    return () => window.clearTimeout(id);
  }, [isOpen, reduceMotion]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="presentation-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center p-3 sm:p-6"
          onClick={closePresentation}
        >
          {/* Theater: vignette + deep field */}
          <div
            className="pointer-events-none absolute inset-0 bg-[#030303]"
            style={{
              backgroundImage:
                "radial-gradient(ellipse 85% 65% at 50% 38%, rgba(55,52,48,0.45) 0%, transparent 55%), radial-gradient(ellipse 100% 90% at 50% 100%, rgba(0,0,0,0.85) 0%, #030303 45%)",
            }}
          />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,transparent_0%,rgba(0,0,0,0.55)_100%)]" />

          <button
            ref={closeBtnRef}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              closePresentation();
            }}
            className="absolute right-4 top-4 z-[210] rounded border border-[#3a3a3a] bg-[#0d0d0d]/90 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[#b0b0b0] backdrop-blur-sm transition-colors hover:border-[#888] hover:text-[#fafaf8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#888] sm:right-6 sm:top-6"
          >
            Close
          </button>

          <p id="presentation-title" className="sr-only">
            About me — presentation
          </p>

          {/* Letterboxed stage */}
          <div
            className="relative z-[205] flex h-[min(96dvh,980px)] w-full max-w-[min(99vw,1500px)] flex-col"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
          >
            <p className="mb-1 text-center font-mono text-[9px] uppercase tracking-[0.28em] text-[#555]">
              {"\u2014 About me \u2014"}
            </p>
            <div className="relative min-h-0 flex-1 overflow-hidden rounded-lg shadow-[0_0_0_1px_rgba(255,255,255,0.07),0_25px_80px_-20px_rgba(0,0,0,0.9)] ring-1 ring-white/10">
              <motion.div
                className="absolute inset-0"
                initial={false}
                animate={{
                  opacity: showDeck ? 1 : 0,
                  scale: showDeck ? 1 : 0.94,
                }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                style={{ pointerEvents: showDeck ? "auto" : "none" }}
              >
                <DeckEngine
                  key={startSlide}
                  mode="presentation"
                  initialSlideIndex={startSlide - 1}
                  onRequestClose={closePresentation}
                />
              </motion.div>

              <motion.div
                className="absolute inset-0 z-10"
                aria-hidden={showDeck}
                initial={false}
                animate={{
                  opacity: showDeck ? 0 : 1,
                  scale: showDeck ? 1.04 : 1,
                }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                style={{ pointerEvents: "none" }}
              >
                <PresentationPitchIntro />
              </motion.div>

              <motion.div
                className="pointer-events-none absolute inset-0 z-20"
                initial={false}
                animate={{ opacity: showDeck ? 1 : 0 }}
                transition={{ duration: 0.45 }}
              >
                <div className="absolute bottom-[6%] left-[0.8%] w-[min(16%,230px)]">
                  <VoxelPresenter className="h-auto w-full opacity-90 drop-shadow-[0_22px_50px_rgba(0,0,0,0.95)]" />
                </div>
                <div className="absolute bottom-[1%] left-1/2 w-[min(56%,760px)] -translate-x-1/2">
                  <VoxelAudienceRow className="h-auto w-full opacity-90 drop-shadow-[0_-8px_30px_rgba(0,0,0,0.75)]" />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
