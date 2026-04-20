import type { ReactNode } from "react";
import { clsx } from "clsx";

type SlideWrapperProps = {
  children: ReactNode;
  label: string;
  className?: string;
  labelTone?: "dark" | "light";
  rootId?: string;
};

export function SlideWrapper({ children, label, className, labelTone = "dark", rootId }: SlideWrapperProps) {
  return (
    <div id={rootId} className={clsx("absolute inset-0 h-full w-full", className)}>
      <div className="flex h-full w-full items-center justify-start">
        <div className="mx-auto w-full max-w-[760px] px-[8vw]">{children}</div>
      </div>
      <p
        className="absolute bottom-8 left-[8vw] font-mono text-[10px] uppercase tracking-[0.22em]"
        style={{ color: labelTone === "dark" ? "#444" : "#BBB" }}
      >
        {label}
      </p>
    </div>
  );
}
