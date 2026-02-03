import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, X } from "lucide-react";
import Confetti from "./Confetti";

interface CelebrationPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const CelebrationPopup = ({ isOpen, onClose }: CelebrationPopupProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <Confetti />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 10 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
              className="bg-popover rounded-3xl p-8 md:p-12 max-w-lg w-full shadow-2xl relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Decorative background */}
              <div className="absolute inset-0 bg-gradient-romantic opacity-10" />
              
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={24} />
              </button>

              {/* Content */}
              <div className="relative z-10 text-center">
                {/* Animated hearts */}
                <motion.div
                  className="flex justify-center gap-2 mb-6"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {[1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ y: [0, -10, 0] }}
                      transition={{
                        duration: 0.6,
                        delay: i * 0.1,
                        repeat: Infinity,
                        repeatDelay: 0.5,
                      }}
                    >
                      <Heart
                        size={32}
                        className="text-rose fill-rose"
                      />
                    </motion.div>
                  ))}
                </motion.div>

                {/* Main text */}
                <motion.h2
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="font-display text-4xl md:text-5xl font-bold text-gradient-romantic mb-4"
                >
                  Yaaay! 🎉
                </motion.h2>

                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl md:text-2xl text-foreground mb-6"
                >
                  You just made My heart flutter! 💕
                </motion.p>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center justify-center gap-2 text-muted-foreground"
                >
                  <Sparkles size={20} className="text-gold" />
                  <span className="text-lg">Happy Valentine's Day!</span>
                  <Sparkles size={20} className="text-gold" />
                </motion.div>

                {/* Animated heart ring */}
                <motion.div
                  className="absolute -top-4 -left-4 text-rose-light opacity-20"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Heart size={100} />
                </motion.div>
                <motion.div
                  className="absolute -bottom-4 -right-4 text-rose-light opacity-20"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                >
                  <Heart size={80} />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CelebrationPopup;
