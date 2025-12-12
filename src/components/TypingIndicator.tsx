"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const TypingIndicator = memo(() => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex gap-4 mb-6"
    >
      {/* Avatar */}
      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-bolivar-greenLight to-bolivar-green flex items-center justify-center glow-subtle">
        <Sparkles className="w-5 h-5 text-white" />
      </div>

      {/* Indicador de escritura */}
      <div className="glass-effect rounded-2xl rounded-tl-md px-5 py-4">
        <div className="flex items-center gap-1.5">
          <span className="typing-dot" />
          <span className="typing-dot" />
          <span className="typing-dot" />
        </div>
      </div>
    </motion.div>
  );
});

TypingIndicator.displayName = "TypingIndicator";

export default TypingIndicator;

