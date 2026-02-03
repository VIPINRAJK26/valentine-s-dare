import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import FloatingHearts from "@/components/FloatingHearts";
import SparklesComponent from "@/components/Sparkles";
import ValentineButtons from "@/components/ValentineButtons";
import CelebrationPopup from "@/components/CelebrationPopup";

const Index = () => {
  const [showCelebration, setShowCelebration] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-blush relative overflow-hidden">
      {/* Background decorations */}
      <FloatingHearts />
      <SparklesComponent />

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        {/* Decorative top hearts */}
        <motion.div
          className="absolute top-8 left-1/2 transform -translate-x-1/2 flex gap-4"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Heart className="text-rose-light w-8 h-8 floating-heart" style={{ animationDelay: "0s" }} />
          <Heart className="text-rose w-12 h-12 fill-rose floating-heart" style={{ animationDelay: "0.5s" }} />
          <Heart className="text-rose-light w-8 h-8 floating-heart" style={{ animationDelay: "1s" }} />
        </motion.div>

        {/* Main card */}
        <motion.div
          className="bg-card/80 backdrop-blur-lg rounded-3xl p-8 md:p-12 max-w-2xl w-full shadow-2xl border border-rose-light/30"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          {/* Sparkle decoration */}
          <motion.div
            className="flex justify-center mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Sparkles className="text-gold w-8 h-8 sparkle" />
          </motion.div>

          {/* Main heading */}
          <motion.h1
            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-center mb-4 leading-tight"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-gradient-romantic">Will You Be</span>
            <br />
            <span className="text-gradient-romantic">My Valentine?</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-center text-muted-foreground text-lg md:text-xl mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Every love story is beautiful, but ours could be my favorite 💝
          </motion.p>

          {/* Animated heart divider */}
          <motion.div
            className="flex justify-center items-center gap-3 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-rose-light" />
            <Heart className="text-rose w-6 h-6 fill-rose animate-heartbeat" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-rose-light" />
          </motion.div>

          {/* Buttons */}
          <ValentineButtons onYesClick={() => setShowCelebration(true)} />

          {/* Footer text */}
          <motion.p
            className="text-center text-sm text-muted-foreground mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            ✨ Go ahead, try clicking "No" ✨
          </motion.p>
        </motion.div>

        {/* Bottom decorative elements */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-6"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Heart className="text-rose-light w-6 h-6 floating-heart" style={{ animationDelay: "0.3s" }} />
          <Heart className="text-rose w-8 h-8 fill-rose floating-heart" style={{ animationDelay: "0.8s" }} />
          <Heart className="text-rose-light w-6 h-6 floating-heart" style={{ animationDelay: "1.3s" }} />
        </motion.div>
      </div>

      {/* Celebration popup */}
      <CelebrationPopup
        isOpen={showCelebration}
        onClose={() => setShowCelebration(false)}
      />
    </div>
  );
};

export default Index;
