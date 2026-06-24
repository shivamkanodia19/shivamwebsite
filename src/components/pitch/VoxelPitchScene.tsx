/**
 * Monochrome voxel-style figures (no faces, no hue). rects only, inspired by low-poly block characters.
 * Presenter points toward +X (the pitch). Audience faces the pitch (toward top / center).
 */

const F = {
  main: "#d4d2ce",
  side: "#9e9c99",
  deep: "#6e6d6a",
  stroke: "rgba(255,255,255,0.12)",
};

type BoxProps = { x: number; y: number; w: number; h: number; tone?: keyof typeof F };

function Box({ x, y, w, h, tone = "main" }: BoxProps) {
  return <rect x={x} y={y} width={w} height={h} fill={F[tone]} stroke={F.stroke} strokeWidth={0.4} />;
}

/** Side-view presenter facing right, arm extended toward the pitch (stage right). */
export function VoxelPresenter({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 140 175"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {/* Head. blank cube, no face */}
      <Box x={32} y={8} w={34} h={32} />
      <Box x={36} y={12} w={10} h={8} tone="side" />
      {/* Neck */}
      <Box x={44} y={40} w={12} h={8} />
      {/* Torso */}
      <Box x={34} y={48} w={44} h={46} />
      <Box x={38} y={52} w={8} h={32} tone="side" />
      {/* Left arm (relaxed, down) */}
      <Box x={22} y={52} w={12} h={22} />
      <Box x={20} y={74} w={11} h={20} tone="side" />
      <Box x={22} y={94} w={9} h={9} />
      {/* Right arm. upper + forearm + hand pointing right */}
      <Box x={78} y={52} w={14} h={20} />
      <g transform="translate(88 58) rotate(-28)">
        <rect x={0} y={0} width={44} height={11} fill={F.main} stroke={F.stroke} strokeWidth={0.4} rx={0.5} />
        <rect x={36} y={-1} width={12} height={13} fill={F.side} stroke={F.stroke} strokeWidth={0.4} rx={0.5} />
      </g>
      {/* Legs */}
      <Box x={38} y={94} w={14} h={38} />
      <Box x={58} y={94} w={14} h={38} />
      <Box x={37} y={130} w={16} h={8} tone="deep" />
      <Box x={57} y={130} w={16} h={8} tone="deep" />
    </svg>
  );
}

/** Smaller block figure facing “up” (toward the pitch), simplified. */
function VoxelAudienceMember({ x, scale = 1 }: { x: number; scale?: number }) {
  const s = scale;
  return (
    <g transform={`translate(${x} 0) scale(${s})`}>
      <Box x={0} y={0} w={18} h={18} />
      <Box x={4} y={4} w={5} h={6} tone="side" />
      <Box x={1} y={18} w={22} h={28} />
      <Box x={3} y={22} w={6} h={20} tone="side" />
      <Box x={5} y={46} w={8} h={26} />
      <Box x={13} y={46} w={8} h={26} />
      <Box x={4} y={70} w={10} h={6} tone="deep" />
      <Box x={12} y={70} w={10} h={6} tone="deep" />
    </g>
  );
}

export function VoxelAudienceRow({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 248 95"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {/* Perspective: slight scale down toward edges */}
      <g opacity={0.9}>
        <VoxelAudienceMember x={8} scale={0.82} />
        <VoxelAudienceMember x={44} scale={0.88} />
        <VoxelAudienceMember x={84} scale={0.95} />
        <VoxelAudienceMember x={128} scale={0.95} />
        <VoxelAudienceMember x={172} scale={0.88} />
        <VoxelAudienceMember x={214} scale={0.82} />
      </g>
    </svg>
  );
}
