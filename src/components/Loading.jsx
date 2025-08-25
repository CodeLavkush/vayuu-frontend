import React from "react";
import { motion } from "framer-motion";

export default function Loading({ message = "Loading" }) {
  const dotVariants = {
    initial: { y: 0, opacity: 0.6 },
    animate: (i) => ({
      y: [0, -8, 0],
      opacity: [0.6, 1, 0.6],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        ease: "easeInOut",
        delay: i * 0.12,
      },
    }),
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-gray-200 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-sm sm:max-w-md">
        <div className="relative rounded-2xl border border-gray-800/80 bg-gray-900/50 backdrop-blur-sm shadow-2xl p-6 sm:p-8">
      
          <div className="flex justify-center">
            <motion.svg
              className="w-16 h-16 sm:w-24 sm:h-24"
              viewBox="0 0 100 100"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
              aria-hidden
            >
              <defs>
                <linearGradient id="purpleGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#a78bfa" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#7c3aed" />
                </linearGradient>
                <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#27272a"
                strokeWidth="10"
                fill="none"
                strokeLinecap="round"
              />

              <motion.circle
                cx="50"
                cy="50"
                r="40"
                stroke="url(#purpleGlow)"
                strokeWidth="10"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="62.8 188.4"
                filter="url(#softGlow)"
                initial={{ strokeDashoffset: 0 }}
                animate={{ strokeDashoffset: -251 }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
              />
            </motion.svg>
          </div>

          <div className="mt-6 text-center">
            <div className="text-base sm:text-lg font-medium tracking-wide">
              {message}
              <span className="sr-only">, please wait</span>
            </div>

            <div className="mt-2 flex items-end justify-center gap-2" aria-hidden>
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={dotVariants}
                  initial="initial"
                  animate="animate"
                  className="block w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-purple-500/80 shadow-[0_0_12px_rgba(124,58,237,0.55)]"
                />
              ))}
            </div>
          </div>

          <div className="mt-8">
            <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-800">
              <motion.div
                className="absolute left-0 top-0 h-full w-1/3 bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700"
                initial={{ x: "-33%" }}
                animate={{ x: ["-33%", "400%"] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
              />
            </div>
            <div className="mt-3 text-xs sm:text-sm text-gray-400 text-center">This won’t take long</div>
          </div>

          <motion.div
            className="pointer-events-none absolute -top-8 -right-8 w-16 h-16 sm:w-24 sm:h-24 rounded-full"
            style={{ background: "radial-gradient(closest-side, rgba(139,92,246,0.35), rgba(139,92,246,0))" }}
            initial={{ opacity: 0.3, scale: 0.9 }}
            animate={{ opacity: [0.2, 0.5, 0.2], scale: [0.95, 1.05, 0.95] }}
            transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
            aria-hidden
          />
        </div>
      </div>
    </div>
  );
}
