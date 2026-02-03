import { useState, useRef } from "react";
import { motion } from "framer-motion";

interface ValentineButtonsProps {
  onYesClick: () => void;
}

const ValentineButtons = ({ onYesClick }: ValentineButtonsProps) => {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const noButtonRef = useRef<HTMLButtonElement>(null);

  const moveNoButton = () => {
    if (!containerRef.current || !noButtonRef.current) return;

    const container = containerRef.current.getBoundingClientRect();
    const button = noButtonRef.current.getBoundingClientRect();
    
    // Calculate available space for movement
    const maxX = (container.width / 2) - (button.width / 2) - 20;
    const maxY = 80;

    // Generate random position, ensuring it moves away
    const newX = (Math.random() - 0.5) * 2 * maxX;
    const newY = (Math.random() - 0.5) * 2 * maxY;

    setNoButtonPosition({ x: newX, y: newY });
  };

  return (
    <div 
      ref={containerRef}
      className="relative flex flex-row items-center justify-center gap-8 min-h-[180px] w-full"
    >
      {/* Yes Button */}
      <motion.button
        onClick={onYesClick}
        className="btn-yes min-w-[140px] relative overflow-hidden group z-10"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <span className="relative z-10">Yes! 💕</span>
        <motion.div
          className="absolute inset-0 bg-rose-dark opacity-0 group-hover:opacity-20 transition-opacity"
        />
      </motion.button>

      {/* No Button - Escapes cursor */}
      <motion.button
        ref={noButtonRef}
        onMouseEnter={moveNoButton}
        onTouchStart={moveNoButton}
        className="btn-no min-w-[140px] cursor-pointer z-10"
        animate={{
          x: noButtonPosition.x,
          y: noButtonPosition.y,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
        }}
        initial={{ opacity: 0, y: 20 }}
        whileHover={{ scale: 1.05 }}
      >
        No 😢
      </motion.button>
    </div>
  );
};

export default ValentineButtons;
