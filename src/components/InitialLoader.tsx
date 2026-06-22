"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function InitialLoader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 2800); // Wait 2.8 seconds before triggering the exit animation
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }} // Smooth slide-up fade out
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] bg-neutral-950 flex flex-col items-center justify-center pointer-events-none"
        >
          {/* Main Logo Text */}
          <div className="overflow-hidden mb-2 flex items-baseline">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
              className="font-bebas text-[25vw] md:text-[15vw] leading-none text-white tracking-tighter"
            >
              FOX
            </motion.h1>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "backOut", delay: 1 }}
              className="w-4 h-4 md:w-8 md:h-8 bg-bright-orange rounded-full ml-2 md:ml-4"
            />
          </div>
          
          {/* Subtitle */}
          <div className="overflow-hidden">
            <motion.p
              initial={{ y: "-100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 1.2 }}
              className="font-mono text-[10px] md:text-sm tracking-[0.8em] text-white/50 uppercase ml-2"
            >
              Athletics
            </motion.p>
          </div>

          {/* Loading Progress Bar */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "200px", opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut", delay: 1.5 }}
            className="h-[1px] bg-white/20 mt-12 relative overflow-hidden"
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "200%" }}
              transition={{ duration: 1.2, ease: "easeInOut", delay: 1.5, repeat: Infinity }}
              className="absolute top-0 left-0 h-full w-1/2 bg-bright-orange"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
