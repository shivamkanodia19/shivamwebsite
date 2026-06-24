import { motion } from "framer-motion";
import { VoxelAudienceRow, VoxelPresenter } from "@/components/pitch/VoxelPitchScene";

const spring = { type: "spring" as const, stiffness: 120, damping: 18, mass: 0.8 };
const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Full-bleed theatrics: spotlight, presenter enters, audience rises, beam to pitch. all monochrome.
 */
export function PresentationPitchIntro() {
  return (
    <div className="relative flex h-full min-h-[200px] w-full flex-col items-center justify-end overflow-hidden rounded-lg bg-[#060606] md:min-h-[240px]">
      {/* Spotlight pools */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 72% 42%, rgba(140,135,128,0.14) 0%, transparent 55%), radial-gradient(ellipse 50% 40% at 50% 88%, rgba(80,78,74,0.2) 0%, transparent 50%)",
        }}
      />
      <motion.div
        className="pointer-events-none absolute left-1/2 top-[-20%] h-[85%] w-[75%] -translate-x-1/2 rounded-full blur-3xl"
        initial={{ scale: 0.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.9, ease }}
        style={{
          background: "radial-gradient(closest-side, rgba(200,196,188,0.12), transparent 72%)",
        }}
      />

      {/* Light beam: presenter toward pitch (center-right) */}
      <motion.div
        className="pointer-events-none absolute left-[8%] top-[22%] h-[8px] w-[55%] origin-left rounded-full blur-md"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 0.65, duration: 0.7, ease }}
        style={{
          background: "linear-gradient(90deg, rgba(210,208,200,0.45), rgba(210,208,200,0.08), transparent)",
          transform: "rotate(-8deg)",
        }}
      />

      {/* Presenter. left */}
      <motion.div
        className="pointer-events-none absolute bottom-[18%] left-[-2%] w-[min(42%,200px)] md:bottom-[20%]"
        initial={{ x: -120, opacity: 0, rotate: -4 }}
        animate={{ x: 0, opacity: 1, rotate: 0 }}
        transition={{ ...spring, delay: 0.12 }}
      >
        <VoxelPresenter className="h-auto w-full drop-shadow-[0_20px_50px_rgba(0,0,0,0.85)]" />
      </motion.div>

      {/* Pitch frame (empty “screen” the deck will replace) */}
      <motion.div
        className="pointer-events-none absolute right-[6%] top-[14%] aspect-video w-[min(48%,320px)] rounded-md border border-white/[0.14] shadow-[0_0_0_1px_rgba(0,0,0,0.5),inset_0_0_40px_rgba(255,255,255,0.04)] md:right-[10%] md:top-[18%]"
        initial={{ scale: 0.65, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.45, duration: 0.65, ease }}
      >
        <motion.div
          className="absolute inset-0 rounded-md"
          animate={{ opacity: [0.4, 0.75, 0.4] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%, rgba(255,255,255,0.04) 100%)",
          }}
        />
      </motion.div>

      {/* Label. subtle */}
      <motion.p
        className="pointer-events-none absolute right-[8%] top-[6%] font-mono text-[8px] uppercase tracking-[0.35em] text-[#4a4a4a] md:right-[12%]"
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.45 }}
      >
        The pitch
      </motion.p>

      {/* Audience. bottom, facing the pitch */}
      <motion.div
        className="relative w-full px-4 pb-2 pt-6"
        style={{ perspective: "900px" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div
          initial={{ y: 72, opacity: 0, rotateX: 22 }}
          animate={{ y: 0, opacity: 1, rotateX: 12 }}
          transition={{ ...spring, delay: 0.28 }}
          style={{ transformOrigin: "50% 100%" }}
        >
          <VoxelAudienceRow className="mx-auto h-auto w-full max-w-[520px] opacity-[0.88] drop-shadow-[0_-8px_30px_rgba(0,0,0,0.6)]" />
        </motion.div>
      </motion.div>
    </div>
  );
}
