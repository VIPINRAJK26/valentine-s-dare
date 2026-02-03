import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const Confetti = () => {
  const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: 2 + Math.random() * 2,
    size: 8 + Math.random() * 16,
    type: Math.random() > 0.5 ? "heart" : "circle",
    color: ["text-rose", "text-rose-light", "text-gold", "text-champagne"][
      Math.floor(Math.random() * 4)
    ],
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden">
      {confettiPieces.map((piece) => (
        <motion.div
          key={piece.id}
          className={`absolute ${piece.color}`}
          style={{
            left: `${piece.x}%`,
            top: -20,
          }}
          initial={{ y: -20, rotate: 0, opacity: 1 }}
          animate={{
            y: "100vh",
            rotate: 720,
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            ease: "easeIn",
          }}
        >
          {piece.type === "heart" ? (
            <Heart size={piece.size} fill="currentColor" />
          ) : (
            <div
              className="rounded-full bg-current"
              style={{ width: piece.size, height: piece.size }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default Confetti;
