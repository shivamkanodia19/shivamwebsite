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
const DURATION = 0.4;

const variants = {
  enter: (dir: NavDirection) => ({ x: dir > 0 ? "100vw" : "-100vw" }),
  center: { x: 0 },
  exit: (dir: NavDirection) => ({ x: dir > 0 ? "-100vw" : "100vw" }),
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
  const [active, setActive] = useState(false);
  const [hasNavigated, setHasNavigated] = useState(false);

  const deckRef = useRef<HTMLElement | null>(null);
  const indexRef = useRef(index);
  const activeRef = useRef(active);
  const touchStart = useRef<number | null>(null);
  const wheelAccum = useRef(0);
  const releaseTimer = useRef<number | null>(null);

  indexRef.current = index;
  activeRef.current = active;

  const setSlide = useCallback((target: number, dir: NavDirection) => {
    const clamped = Math.max(0, Math.min(SLIDE_COUNT - 1, target));
    if (clamped !== indexRef.current) {
      setHasNavigated(true);
      setDirection(dir);
      setIndex(clamped);
    }
  }, []);

  const releaseLock = useCallback((dir: NavDirection) => {
    if (releaseTimer.current !== null) return;
    releaseTimer.current = window.setTimeout(() => {
      setActive(false);
      const deck = deckRef.current;
      if (deck) {
        if (dir > 0) {
          window.scrollTo({ top: deck.offsetTop + deck.offsetHeight + 8, behavior: "smooth" });
        } else {
          window.scrollTo({ top: Math.max(0, deck.offsetTop - window.innerHeight + 8), behavior: "smooth" });
        }
      }
      releaseTimer.current = null;
    }, 300);
  }, []);

  const step = useCallback(
    (dir: NavDirection) => {
      const current = indexRef.current;
      if (dir > 0 && current >= SLIDE_COUNT - 1) {
        releaseLock(1);
        return;
      }
      if (dir < 0 && current <= 0) {
        releaseLock(-1);
        return;
      }
      setSlide(current + dir, dir);
    },
    [releaseLock, setSlide],
  );

  useEffect(() => {
    const deck = deckRef.current;
    if (!deck) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const on = entry.isIntersecting && entry.intersectionRatio >= 0.6;
        setActive(on);
      },
      { threshold: [0, 0.6, 1] },
    );
    observer.observe(deck);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = active ? "hidden" : "";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [active]);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (!activeRef.current) return;
      e.preventDefault();
      wheelAccum.current += e.deltaY;
      if (Math.abs(wheelAccum.current) < 50) return;
      const dir: NavDirection = wheelAccum.current > 0 ? 1 : -1;
      wheelAccum.current = 0;
      step(dir);
    };

    const onKey = (e: KeyboardEvent) => {
      const key = e.key;
      const arrow = ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"].includes(key);
      const digit = key >= "1" && key <= "7";
      if (!activeRef.current && !digit) return;

      if (arrow || digit || key === "r" || key === "R") e.preventDefault();

      if (key === "ArrowRight" || key === "ArrowDown") step(1);
      else if (key === "ArrowLeft" || key === "ArrowUp") step(-1);
      else if (digit) {
        const n = Number(key) - 1;
        setSlide(n, n >= indexRef.current ? 1 : -1);
      } else if (key === "r" || key === "R") {
        setSlide(0, -1);
      }
    };

    const onNavigate = (event: Event) => {
      const custom = event as CustomEvent<{ slide?: number }>;
      const slide = custom.detail?.slide;
      if (!slide) return;
      const idx = Math.max(0, Math.min(SLIDE_COUNT - 1, slide - 1));
      setSlide(idx, idx >= indexRef.current ? 1 : -1);
      if (slide === 7) {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey, { passive: false });
    window.addEventListener("deck:navigate", onNavigate as EventListener);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("deck:navigate", onNavigate as EventListener);
    };
  }, [setSlide, step]);

  useEffect(() => {
    return () => {
      if (releaseTimer.current !== null) {
        window.clearTimeout(releaseTimer.current);
      }
    };
  }, []);

  const onTouchStart = (e: React.TouchEvent<HTMLElement>) => {
    if (!active) return;
    touchStart.current = e.changedTouches[0].screenX;
  };

  const onTouchEnd = (e: React.TouchEvent<HTMLElement>) => {
    if (!active || touchStart.current === null) return;
    const delta = e.changedTouches[0].screenX - touchStart.current;
    touchStart.current = null;
    if (delta < -50) step(1);
    else if (delta > 50) step(-1);
  };

  const Slide = slides[index];
  const progress = ((index + 1) / SLIDE_COUNT) * 100;

  return (
    <section
      id="deck"
      ref={deckRef}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className="relative h-[100svh] w-full bg-[#0D0D0D]"
      aria-label="Pitch deck"
    >
      <div className="fixed left-0 right-0 top-0 z-50 h-px bg-[#1a1a1a]">
        <div className="h-full bg-[#E8E0D0] transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>

      <button
        type="button"
        aria-label="Previous"
        onClick={() => step(-1)}
        className="group fixed left-5 top-1/2 z-40 -translate-y-1/2 border-0 bg-transparent p-0 font-mono text-[20px] text-[#444]"
      >
        <span className="opacity-0 transition-opacity group-hover:opacity-25">‹</span>
      </button>
      <button
        type="button"
        aria-label="Next"
        onClick={() => step(1)}
        className="group fixed right-5 top-1/2 z-40 -translate-y-1/2 border-0 bg-transparent p-0 font-mono text-[20px] text-[#444]"
      >
        <span className="opacity-0 transition-opacity group-hover:opacity-25">›</span>
      </button>

      <p className="pointer-events-none fixed bottom-6 right-8 z-40 font-mono text-[11px] text-[#333]">
        {String(index + 1).padStart(2, "0")} / 07
      </p>

      <div className="relative h-full overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: DURATION, ease: EASE }}
            className="absolute inset-0"
          >
            <Slide isActive={true} showHint={index === 0 && !hasNavigated} />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
