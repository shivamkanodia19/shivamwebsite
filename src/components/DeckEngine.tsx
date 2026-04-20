import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { SLIDE_COUNT } from "@/data/slides";
import { Slide01Problem } from "@/components/slides/Slide01_Problem";
import { Slide02Founder } from "@/components/slides/Slide02_Founder";
import { Slide03Portfolio } from "@/components/slides/Slide03_Portfolio";
import { Slide04Traction } from "@/components/slides/Slide04_Traction";
import { Slide05Vision } from "@/components/slides/Slide05_Vision";
import { Slide06Ask } from "@/components/slides/Slide06_Ask";
import { Slide07Contact } from "@/components/slides/Slide07_Contact";
import type { NavDirection } from "@/types";

const EASE = [0.25, 0.1, 0.25, 1] as const;
const DURATION = 0.45;

const slideVariants = {
  enter: (direction: NavDirection) => ({
    x: direction > 0 ? "100vw" : "-100vw",
  }),
  center: { x: 0 },
  exit: (direction: NavDirection) => ({
    x: direction < 0 ? "100vw" : "-100vw",
  }),
};

const slides = [
  Slide01Problem,
  Slide02Founder,
  Slide03Portfolio,
  Slide04Traction,
  Slide05Vision,
  Slide06Ask,
  Slide07Contact,
] as const;

export function DeckEngine() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<NavDirection>(1);
  const [hasNavigated, setHasNavigated] = useState(false);

  const indexRef = useRef(index);
  indexRef.current = index;

  const goTo = useCallback((next: number, navDirection: NavDirection) => {
    const clamped = Math.max(0, Math.min(SLIDE_COUNT - 1, next));
    if (clamped !== indexRef.current) {
      setHasNavigated(true);
    }
    setDirection(navDirection);
    setIndex(clamped);
  }, []);

  const goNext = useCallback(() => {
    goTo(indexRef.current + 1, 1);
  }, [goTo]);

  const goPrev = useCallback(() => {
    goTo(indexRef.current - 1, -1);
  }, [goTo]);

  const restart = useCallback(() => {
    goTo(0, -1);
  }, [goTo]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "r" || e.key === "R") {
        e.preventDefault();
        restart();
      } else if (e.key >= "1" && e.key <= "7") {
        const n = Number(e.key) - 1;
        const dir: NavDirection = n > indexRef.current ? 1 : -1;
        goTo(n, dir);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goNext, goPrev, goTo, restart]);

  const touchStartX = useRef<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const endX = e.changedTouches[0].screenX;
    const delta = endX - touchStartX.current;
    touchStartX.current = null;
    const threshold = 48;
    if (delta < -threshold) goNext();
    else if (delta > threshold) goPrev();
  };

  const progressPct = ((index + 1) / SLIDE_COUNT) * 100;
  const ActiveSlide = slides[index];

  return (
    <div className="relative h-full min-h-0 w-full bg-deck-bg-light text-deck-primary">
      <div
        className="fixed left-0 right-0 top-0 z-50 h-px bg-deck-border"
        aria-hidden
      >
        <div
          className="h-full bg-deck-primary transition-[width] duration-300 ease-out"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      <div
        className="fixed inset-0 z-20"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        aria-hidden
      />

      <button
        type="button"
        aria-label="Previous slide"
        className="group fixed inset-y-0 left-0 z-30 flex w-[40%] cursor-w-resize items-center justify-start border-0 bg-transparent pl-6"
        onClick={goPrev}
      >
        <span className="pointer-events-none font-mono text-2xl text-[#999] opacity-0 transition-opacity duration-200 group-hover:opacity-30">
          ‹
        </span>
      </button>
      <button
        type="button"
        aria-label="Next slide"
        className="group fixed inset-y-0 right-0 z-30 flex w-[60%] cursor-e-resize items-center justify-end border-0 bg-transparent pr-6"
        onClick={goNext}
      >
        <span className="pointer-events-none font-mono text-2xl text-[#999] opacity-0 transition-opacity duration-200 group-hover:opacity-30">
          ›
        </span>
      </button>

      <div
        className="pointer-events-none fixed bottom-6 right-6 z-40 font-mono text-[11px] text-[#999]"
        aria-live="polite"
      >
        {String(index + 1).padStart(2, "0")} / {String(SLIDE_COUNT).padStart(2, "0")}
      </div>

      {index === 0 && !hasNavigated ? (
        <p
          className="pointer-events-none fixed bottom-6 left-1/2 z-40 -translate-x-1/2 font-mono text-[10px] tracking-[0.15em] text-deck-hint"
          aria-hidden
        >
          Press → to continue
        </p>
      ) : null}

      <div className="relative h-full min-h-0 w-full overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={index}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: DURATION, ease: EASE }}
            className="absolute inset-0 h-full min-h-0 w-full"
          >
            <ActiveSlide />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
