import type { ReactNode } from "react";
import { clsx } from "clsx";

type SlideWrapperProps = {
  children: ReactNode;
  label: string;
  /** Light background slides use muted #999; dark bg slides use #444 for label */
  labelTone?: "light" | "dark";
  className?: string;
  contentClassName?: string;
};

export function SlideWrapper({
  children,
  label,
  labelTone = "light",
  className,
  contentClassName,
}: SlideWrapperProps) {
  return (
    <div
      className={clsx(
        "relative h-full min-h-0 w-full overflow-y-auto overflow-x-hidden",
        className,
      )}
    >
      <div
        className={clsx(
          "relative z-[1] mx-auto box-border w-full max-w-[720px] px-6 pb-24 pt-[10vh]",
          contentClassName,
        )}
      >
        {children}
      </div>
      <span
        className={clsx(
          "pointer-events-none absolute bottom-6 left-6 z-[2] font-mono text-[10px] uppercase tracking-[0.2em]",
          labelTone === "light" ? "text-deck-muted" : "text-[#444]",
        )}
      >
        {label}
      </span>
    </div>
  );
}
