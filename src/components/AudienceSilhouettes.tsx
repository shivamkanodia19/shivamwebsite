/**
 * Lightweight “audience” row: abstract human outlines (head + torso) with CSS 3D tilt.
 * Inspired by theater seating — no WebGL (council: fast SVG + perspective beats Spline for this surface).
 */
export function AudienceSilhouettes() {
  return (
    <div
      className="pointer-events-none flex w-full select-none justify-center overflow-hidden"
      style={{ perspective: "900px" }}
      aria-hidden
    >
      <div
        className="flex max-w-3xl items-end justify-center gap-[clamp(8px,2.5vw,18px)] opacity-[0.22]"
        style={{ transform: "rotateX(14deg) translateZ(-40px)", transformOrigin: "50% 100%" }}
      >
        <Person w={22} h={52} />
        <Person w={26} h={60} />
        <Person w={30} h={68} />
        <Person w={34} h={74} tall />
        <Person w={30} h={68} />
        <Person w={26} h={60} />
        <Person w={22} h={52} />
      </div>
    </div>
  );
}

function Person({ w, h, tall }: { w: number; h: number; tall?: boolean }) {
  const headR = tall ? 5.5 : 5;
  return (
    <svg width={w} height={h} viewBox="0 0 40 90" className="shrink-0 text-[#8a8580]">
      <ellipse cx="20" cy={12} rx={headR} ry={headR * 0.95} fill="currentColor" opacity={0.95} />
      <path
        d="M8 26 Q20 22 32 26 L36 52 Q38 62 34 72 L28 88 L22 88 L20 58 L18 88 L12 88 L6 72 Q2 62 4 52 Z"
        fill="currentColor"
        opacity={0.85}
      />
    </svg>
  );
}
