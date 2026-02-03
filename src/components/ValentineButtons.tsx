import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface ValentineButtonsProps {
  onYesClick: () => void;
}

const ValentineButtons = ({ onYesClick }: ValentineButtonsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const noBtnRef = useRef<HTMLButtonElement>(null);

  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [showMsg, setShowMsg] = useState(false);

  const repelButton = (e: React.MouseEvent) => {
    if (!containerRef.current || !noBtnRef.current) return;

    const container = containerRef.current.getBoundingClientRect();
    const btn = noBtnRef.current.getBoundingClientRect();

    const btnCX = btn.left + btn.width / 2;
    const btnCY = btn.top + btn.height / 2;

    const dx = e.clientX - btnCX;
    const dy = e.clientY - btnCY;
    const distance = Math.hypot(dx, dy);

    const dangerRadius = 200; // ⬅️ BIGGER
    const panicRadius = 90;

    const maxX = container.width / 2 - btn.width / 2 - 20;
    const maxY = container.height / 2 - btn.height / 2 - 20;

    // 🚨 PANIC TELEPORT
    if (distance < panicRadius) {
      setPos({
        x: (Math.random() - 0.5) * 2 * maxX,
        y: (Math.random() - 0.5) * 2 * maxY,
      });
      return;
    }

    if (distance < dangerRadius) {
      const strength = (dangerRadius - distance) / dangerRadius; // 0 → 1
      const angle = Math.atan2(dy, dx);

      const moveX = -Math.cos(angle) * 260 * strength;
      const moveY = -Math.sin(angle) * 160 * strength;

      setPos((prev) => ({
        x: Math.max(-maxX, Math.min(maxX, prev.x + moveX)),
        y: Math.max(-maxY, Math.min(maxY, prev.y + moveY)),
      }));
    }
  };

  // ❌ IF USER SOMEHOW CLICKS
  const handleNoClick = () => {
    setShowMsg(true);

    setTimeout(() => setShowMsg(false), 1500);

    // Teleport away instantly
    setPos({
      x: (Math.random() - 0.5) * 200,
      y: (Math.random() - 0.5) * 100,
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={repelButton}
      className="relative flex justify-center items-center gap-8 min-h-[200px] w-full"
    >
      {/* YES */}
      <motion.button
        onClick={onYesClick}
        className="btn-yes min-w-[140px] z-10"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Yes 💕
      </motion.button>

      {/* NO */}
      <motion.button
        ref={noBtnRef}
        onMouseDown={handleNoClick} // ⬅️ intercept
        className="btn-no min-w-[140px] z-10 select-none"
        animate={{ x: pos.x, y: pos.y }}
        transition={{ type: "spring", stiffness: 700, damping: 30 }}
        style={{ pointerEvents: "auto" }} // needed for message trigger
      >
        No 😢
      </motion.button>

      {/* MESSAGE */}
      {showMsg && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-full mt-3 text-sm text-rose-500 font-medium"
        >
          ❌ No is not an option
        </motion.div>
      )}
    </div>
  );
};

export default ValentineButtons;
