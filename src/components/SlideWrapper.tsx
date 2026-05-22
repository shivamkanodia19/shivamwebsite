import type { ReactNode } from "react";
import { clsx } from "clsx";

type SlideWrapperProps = {
  children: ReactNode;
  label: string;
  className?: string;
  rootId?: string;
};

/** Full-bleed slide — vertically centered, no internal scroll. Content must fit viewport. */
export function SlideWrapper({ children, label, className, rootId }: SlideWrapperProps) {
  return (
    <div
      id={rootId}
      className={clsx("absolute inset-0 flex flex-col overflow-hidden", className)}
      aria-label={label}
    >
      <div className="flex min-h-0 flex-1 items-center justify-center px-[7vw] pb-20 pt-10">
        <div className="w-full max-w-[920px]">{children}</div>
      </div>
    </div>
  );
}
