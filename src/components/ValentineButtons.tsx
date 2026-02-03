import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface ValentineButtonsProps {
  onYesClick: () => void;
}

const ValentineButtons = ({ onYesClick }: ValentineButtonsProps) => {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [isHoveringNo, setIsHoveringNo] = useState(false);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const moveNoButton = () => {
    if (!containerRef.current || !noButtonRef.current) return;

    const container = containerRef.current.getBoundingClientRect();
    const button = noButtonRef.current.getBoundingClientRect();
    
    // Calculate available space
    const maxX = container.width - button.width - 20;
    const maxY = 150; // Limit vertical movement

    // Generate random position within bounds
    const newX = (Math.random() - 0.5) * maxX;
    const newY = (Math.random() - 0.5) * maxY;

    setNoButtonPosition({ x: newX, y: newY });
  };

  const handleNoHover = () => {
    setIsHoveringNo(true);
    moveNoButton();
  };

  return (
    <div 
      ref={containerRef}
      className="flex flex-col sm:flex-row items-center justify-center gap-6 relative min-h-[200px] w-full max-w-md mx-auto"
    >
      {/* Yes Button */}
      <motion.button
        onClick={onYesClick}
        className="btn-yes min-w-[140px] relative overflow-hidden group"
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
        onMouseEnter={handleNoHover}
        onTouchStart={moveNoButton}
        className="btn-no min-w-[140px] cursor-pointer"
        animate={{
          x: noButtonPosition.x,
          y: noButtonPosition.y,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
        initial={{ opacity: 0, y: 20 }}
        whileHover={{ scale: isHoveringNo ? 1 : 1.05 }}
      >
        No 😢
      </motion.button>
    </div>
  );
};

export default ValentineButtons;
