import type { ReactNode } from "react";
import { clsx } from "clsx";

type SlideWrapperProps = {
  children: ReactNode;
  /** Shown in deck chrome + `aria-label` for the slide surface. */
  label: string;
  className?: string;
  rootId?: string;
};

/** Full-bleed slide area with internal vertical scroll so tall slides (e.g. portfolio) remain readable. */
export function SlideWrapper({ children, label, className, rootId }: SlideWrapperProps) {
  return (
    <div id={rootId} className={clsx("absolute inset-0 flex min-h-0 flex-col", className)} aria-label={label}>
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain">
        <div className="flex min-h-full w-full items-start justify-start">
          <div className="mx-auto w-full max-w-[760px] px-[8vw] pb-28 pt-16 md:pb-32 md:pt-20">{children}</div>
        </div>
      </div>
    </div>
  );
}
