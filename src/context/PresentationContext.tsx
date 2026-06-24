import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type PresentationContextValue = {
  isOpen: boolean;
  /** 1-based slide index */
  startSlide: number;
  openPresentation: (slide?: number) => void;
  closePresentation: () => void;
};

const PresentationContext = createContext<PresentationContextValue | null>(null);

export function PresentationProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [startSlide, setStartSlide] = useState(1);

  const openPresentation = useCallback((slide = 1) => {
    setStartSlide(Math.max(1, Math.min(7, slide)));
    setIsOpen(true);
  }, []);

  const closePresentation = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    const onDeckNavigate = (e: Event) => {
      const slide = (e as CustomEvent<{ slide?: number }>).detail?.slide;
      if (slide == null || slide < 1 || slide > 7) return;
      if (!isOpen) openPresentation(slide);
    };
    window.addEventListener("deck:navigate", onDeckNavigate as EventListener);
    return () => window.removeEventListener("deck:navigate", onDeckNavigate as EventListener);
  }, [isOpen, openPresentation]);

  const value = useMemo(
    () => ({
      isOpen,
      startSlide,
      openPresentation,
      closePresentation,
    }),
    [isOpen, startSlide, openPresentation, closePresentation],
  );

  return <PresentationContext.Provider value={value}>{children}</PresentationContext.Provider>;
}

/** @see https://react.dev/learn/splitting-context. Hook is intentionally co-located with provider. */
// eslint-disable-next-line react-refresh/only-export-components -- hook must live next to context
export function usePresentation() {
  const ctx = useContext(PresentationContext);
  if (!ctx) throw new Error("usePresentation must be used within PresentationProvider");
  return ctx;
}
