import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { clsx } from "clsx";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SLIDE_COUNT, slides as slideMeta } from "@/data/slides";
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

export type DeckMode = "scroll" | "presentation";

export type DeckEngineProps = {
  mode?: DeckMode;
  /** Zero-based initial slide when the engine mounts */
  initialSlideIndex?: number;
  /** Called when user exits at first/last slide (presentation) or Esc */
  onRequestClose?: () => void;
};

function formatSlideTitle(label: string) {
  return label
    .toLowerCase()
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function makeVariants(travel: string) {
  return {
    enter: (dir: NavDirection) => ({ x: dir > 0 ? travel : `-${travel}` }),
    center: { x: 0 },
    exit: (dir: NavDirection) => ({ x: dir > 0 ? `-${travel}` : travel }),
  };
}

const slides = [
  Slide01Problem,
  Slide02Founder,
  Slide03Portfolio,
  Slide04Traction,
  Slide05Vision,
  Slide06Ask,
  Slide07Contact,
] as const;

function findScrollableAncestor(start: Element | null, stopAt: HTMLElement | null): HTMLElement | null {
  let el: HTMLElement | null = start instanceof HTMLElement ? start : null;
  while (el && el !== stopAt) {
    const { overflowY } = window.getComputedStyle(el);
    const canScrollY =
      (overflowY === "auto" || overflowY === "scroll" || overflowY === "overlay") &&
      el.scrollHeight > el.clientHeight + 2;
    if (canScrollY) return el;
    el = el.parentElement;
  }
  return null;
}

export function DeckEngine({
  mode = "scroll",
  initialSlideIndex = 0,
  onRequestClose,
}: DeckEngineProps) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(() =>
    Math.max(0, Math.min(SLIDE_COUNT - 1, initialSlideIndex)),
  );
  const [direction, setDirection] = useState<NavDirection>(1);
  const [inView, setInView] = useState(mode === "presentation");
  const [paused, setPaused] = useState(false);
  const [hasNavigated, setHasNavigated] = useState(false);

  const deckRef = useRef<HTMLElement | null>(null);
  const indexRef = useRef(index);
  const inViewRef = useRef(inView);
  const pausedRef = useRef(paused);
  const modeRef = useRef(mode);
  const onCloseRef = useRef(onRequestClose);
  const wheelAccum = useRef(0);
  const releaseTimer = useRef<number | null>(null);
  const touchStart = useRef<number | null>(null);

  indexRef.current = index;
  inViewRef.current = inView;
  pausedRef.current = paused;
  modeRef.current = mode;
  onCloseRef.current = onRequestClose;

  const engaged = inView && !paused;
  const pos = mode === "presentation" ? "absolute" : "fixed";
  const travel = mode === "presentation" ? "100%" : "100vw";
  const variants = useMemo(() => makeVariants(travel), [travel]);

  const setSlide = useCallback((target: number, dir: NavDirection) => {
    const clamped = Math.max(0, Math.min(SLIDE_COUNT - 1, target));
    if (clamped !== indexRef.current) {
      setHasNavigated(true);
      setDirection(dir);
      setIndex(clamped);
    }
  }, []);

  const releaseLock = useCallback((dir: NavDirection) => {
    if (modeRef.current === "presentation") {
      onCloseRef.current?.();
      return;
    }
    if (releaseTimer.current !== null) return;
    releaseTimer.current = window.setTimeout(() => {
      setPaused(true);
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

  const resumeAndStep = useCallback(
    (dir: NavDirection) => {
      setPaused(false);
      step(dir);
    },
    [step],
  );

  useEffect(() => {
    if (mode === "presentation") {
      setInView(true);
      setPaused(false);
      return;
    }
    const deck = deckRef.current;
    if (!deck) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting && entry.intersectionRatio >= 0.6;
        setInView(visible);
        if (!visible) setPaused(false);
      },
      { threshold: [0, 0.6, 1] },
    );
    observer.observe(deck);
    return () => observer.disconnect();
  }, [mode]);

  useEffect(() => {
    const deck = deckRef.current;
    if (!deck) return;

    const onWheel = (e: WheelEvent) => {
      if (!inViewRef.current || pausedRef.current) return;

      const scrollEl = findScrollableAncestor(e.target as Element | null, deck);
      if (scrollEl) {
        const delta = e.deltaY;
        const atTop = scrollEl.scrollTop <= 0;
        const atBottom =
          scrollEl.scrollTop + scrollEl.clientHeight >= scrollEl.scrollHeight - 2;
        if ((delta < 0 && !atTop) || (delta > 0 && !atBottom)) {
          return;
        }
      }

      e.preventDefault();
      wheelAccum.current += e.deltaY;
      if (Math.abs(wheelAccum.current) < 50) return;
      const dir: NavDirection = wheelAccum.current > 0 ? 1 : -1;
      wheelAccum.current = 0;
      step(dir);
    };

    deck.addEventListener("wheel", onWheel, { passive: false });
    return () => deck.removeEventListener("wheel", onWheel);
  }, [step]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (modeRef.current === "presentation") {
          e.preventDefault();
          onCloseRef.current?.();
          return;
        }
        if (inViewRef.current) {
          e.preventDefault();
          setPaused(true);
        }
        return;
      }

      if (e.key === "Enter" && inViewRef.current && pausedRef.current && modeRef.current === "scroll") {
        e.preventDefault();
        setPaused(false);
        return;
      }

      const key = e.key;
      const digit = key >= "1" && key <= "7";
      if (!inViewRef.current || pausedRef.current) {
        if (digit) {
          setPaused(false);
          const n = Number(key) - 1;
          setSlide(n, n >= indexRef.current ? 1 : -1);
        }
        return;
      }

      if (
        ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"].includes(key) ||
        digit ||
        key === "r" ||
        key === "R"
      ) {
        e.preventDefault();
      }

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
      setPaused(false);
      if (slide === 7 && modeRef.current === "scroll") {
        document.getElementById("site-contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    window.addEventListener("keydown", onKey, { passive: false });
    window.addEventListener("deck:navigate", onNavigate as EventListener);
    return () => {
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
    if (!engaged) return;
    const touch = e.changedTouches[0];
    if (!touch) return;
    touchStart.current = touch.screenX;
  };

  const onTouchEnd = (e: React.TouchEvent<HTMLElement>) => {
    if (!engaged || touchStart.current === null) return;
    const touch = e.changedTouches[0];
    if (!touch) return;
    const delta = touch.screenX - touchStart.current;
    touchStart.current = null;
    if (delta < -50) step(1);
    else if (delta > 50) step(-1);
  };

  const Slide = slides[index];
  const progress = ((index + 1) / SLIDE_COUNT) * 100;
  const slideTitle = formatSlideTitle(slideMeta[index]?.label ?? "");
  const motionDuration = reduceMotion ? 0 : DURATION;

  const hintPresentation =
    "ARROWS \u00B7 SWIPE \u00B7 KEYS 1\u20137 \u00B7 ESC TO CLOSE";
  const hintScrollDesktop =
    "WHEEL OR ARROWS \u00B7 SWIPE \u00B7 KEYS 1\u20137 \u00B7 ESC FOR PAGE SCROLL";
  const hintScrollMobile = "SWIPE OR TAP EDGES \u00B7 ESC TO SCROLL";

  return (
    <section
      id="deck"
      ref={deckRef}
      tabIndex={-1}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className={clsx(
        "relative w-full overflow-x-hidden bg-[#0D0D0D]",
        mode === "presentation" ? "h-full min-h-0" : "h-[100svh]",
      )}
      aria-label={mode === "presentation" ? "About me presentation" : "Pitch deck"}
    >
      <div
        className={clsx(pos, "left-0 right-0 top-0 z-50 h-[2px] bg-[#1a1a1a]")}
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={SLIDE_COUNT}
        aria-valuenow={index + 1}
        aria-label={`Slide ${index + 1} of ${SLIDE_COUNT}`}
      >
        <div
          className="h-full bg-[#E8E0D0] transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {engaged ? (
        <>
          <p
            className={clsx(
              pos,
              "bottom-[4.5rem] left-1/2 z-40 hidden max-w-[92vw] -translate-x-1/2 text-center font-mono text-[9px] leading-relaxed tracking-[0.12em] text-[#666] sm:bottom-24 sm:block md:bottom-28",
            )}
          >
            {mode === "presentation" ? hintPresentation : hintScrollDesktop}
          </p>
          <p
            className={clsx(
              pos,
              "bottom-[4.5rem] left-1/2 z-40 max-w-[92vw] -translate-x-1/2 text-center font-mono text-[9px] tracking-[0.08em] text-[#666] sm:hidden",
            )}
          >
            {mode === "presentation" ? "SWIPE \u00B7 ESC TO CLOSE" : hintScrollMobile}
          </p>
        </>
      ) : null}

      {mode === "scroll" && inView && paused ? (
        <div
          className={clsx(
            pos,
            "bottom-0 left-0 right-0 z-40 flex items-center justify-center gap-4 border-t border-[#2a2a2a] bg-[#0D0D0D]/95 px-4 py-3 backdrop-blur-md md:py-3.5",
          )}
          role="status"
        >
          <p className="max-w-[min(100%,28rem)] text-center font-mono text-[10px] leading-snug tracking-[0.06em] text-[#888] md:text-[11px]">
            Page scroll unlocked. Scroll normally, or resume the deck to continue.
          </p>
          <button
            type="button"
            onClick={() => setPaused(false)}
            className="shrink-0 rounded border border-[#3A3A3A] bg-[#161616] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-[#E8E0D0] transition-colors hover:border-[#E8E0D0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#888]"
          >
            Resume
          </button>
        </div>
      ) : null}

      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => resumeAndStep(-1)}
        className={clsx(
          pos,
          "left-3 top-1/2 z-40 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#2a2a2a] bg-[#0D0D0D]/80 font-mono text-[20px] text-[#B0B0B0] shadow-sm backdrop-blur-sm transition-colors hover:border-[#444] hover:bg-[#141414] hover:text-[#FAFAF8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#888] md:left-6",
        )}
      >
        {"\u2039"}
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={() => resumeAndStep(1)}
        className={clsx(
          pos,
          "right-3 top-1/2 z-40 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#2a2a2a] bg-[#0D0D0D]/80 font-mono text-[20px] text-[#B0B0B0] shadow-sm backdrop-blur-sm transition-colors hover:border-[#444] hover:bg-[#141414] hover:text-[#FAFAF8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#888] md:right-6",
        )}
      >
        {"\u203A"}
      </button>

      <div
        className={clsx(
          pos,
          "left-6 z-40 md:left-10",
          mode === "scroll" && inView && paused ? "bottom-24 md:bottom-28" : "bottom-6 md:bottom-8",
        )}
      >
        <p className="pointer-events-none font-mono text-[10px] uppercase tracking-[0.2em] text-[#666]">
          {slideTitle}
        </p>
        <p className="pointer-events-none mt-1 font-mono text-[11px] tabular-nums text-[#8A8A8A]">
          {String(index + 1).padStart(2, "0")} / {String(SLIDE_COUNT).padStart(2, "0")}
        </p>
      </div>

      <div className="relative h-full min-h-0 overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: motionDuration, ease: EASE }}
            className="absolute inset-0 min-h-0"
          >
            <Slide isActive={inView} showHint={index === 0 && !hasNavigated} />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
