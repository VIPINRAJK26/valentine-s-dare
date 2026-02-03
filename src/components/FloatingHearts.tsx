import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const FloatingHearts = () => {
  const hearts = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 5 + Math.random() * 5,
    size: 12 + Math.random() * 24,
    opacity: 0.1 + Math.random() * 0.3,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-rose"
          style={{
            left: `${heart.x}%`,
            opacity: heart.opacity,
          }}
          initial={{ y: "110vh", rotate: 0 }}
          animate={{
            y: "-10vh",
            rotate: [0, 15, -15, 0],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Heart
            size={heart.size}
            fill="currentColor"
            className="drop-shadow-lg"
          />
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingHearts;
