"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Unlock, Flame } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { products } from "@/data/products";
import { useRouter } from "next/navigation";

// Glitch Text Component
const GlitchText = ({ text, className }: { text: string; className?: string }) => {
  return (
    <div className={`relative inline-block ${className}`}>
      <motion.span
        className="absolute top-0 left-0 -ml-[2px] text-bright-orange opacity-70 mix-blend-screen"
        animate={{
          x: [-2, 2, -1, 3, -2],
          y: [1, -1, 2, -2, 1],
          opacity: [0.7, 0.2, 0.8, 0.1, 0.9],
        }}
        transition={{ duration: 0.2, repeat: Infinity, repeatType: "mirror" }}
      >
        {text}
      </motion.span>
      <motion.span
        className="absolute top-0 left-0 ml-[2px] text-blue-500 opacity-70 mix-blend-screen"
        animate={{
          x: [2, -2, 1, -3, 2],
          y: [-1, 1, -2, 2, -1],
          opacity: [0.5, 0.9, 0.2, 0.8, 0.3],
        }}
        transition={{ duration: 0.2, repeat: Infinity, repeatType: "mirror", delay: 0.1 }}
      >
        {text}
      </motion.span>
      <span className="relative z-10">{text}</span>
    </div>
  );
};

const shoeImages = [
  "/images/football_boot.png",
  "/images/fox_trainer.png",
  "/images/fox_urban.png",
  "/images/lifestyle_sneaker.png"
];

export default function LimitedPage() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);
  const [countdown, setCountdown] = useState({ h: 12, m: 45, s: 30 });
  const { addToCart } = useStore();
  const router = useRouter();

  useEffect(() => {
    if (!isUnlocked) return;
    const timer = setInterval(() => {
      setCountdown((prev) => {
        let { h, m, s } = prev;
        if (s > 0) s--;
        else {
          s = 59;
          if (m > 0) m--;
          else {
            m = 59;
            if (h > 0) h--;
          }
        }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isUnlocked]);

  return (
    <div className="h-[100svh] w-screen overflow-hidden bg-neutral-950 grain text-white selection:bg-bright-orange selection:text-white relative">
      <Navbar />
      <CartDrawer />

      {/* Rotating Orbit Background */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-30">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 60, ease: "linear", repeat: Infinity }}
          className="relative w-[150vw] h-[150vw] md:w-[80vw] md:h-[80vw] border border-white/5 rounded-full flex items-center justify-center"
        >
          {/* Inner rings */}
          <div className="absolute w-[80%] h-[80%] border border-white/5 rounded-full border-dashed" />
          <div className="absolute w-[60%] h-[60%] border border-bright-orange/10 rounded-full" />
          
          {shoeImages.map((src, i) => {
            const angle = (i * 360) / shoeImages.length;
            return (
              <div 
                key={i}
                className="absolute top-1/2 left-1/2 w-32 h-32 md:w-56 md:h-56"
                style={{
                  transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-250%)`, // 250% pushes it out to the ring
                }}
              >
                {/* Counter-rotate to keep shoes upright */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 60, ease: "linear", repeat: Infinity }}
                  className="w-full h-full"
                >
                  <img src={src} alt="Orbital Shoe" className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] opacity-70 mix-blend-luminosity" />
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Center Content Wrapper */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-auto px-6 pt-28 pb-8 overflow-y-auto no-scrollbar">
        <div className="relative w-full max-w-2xl bg-black/40 backdrop-blur-xl border border-white/10 p-8 md:p-12 text-center shadow-[0_0_50px_rgba(0,0,0,0.8)] rounded-3xl overflow-hidden my-auto shrink-0">
          
          {/* Subtle glow behind center content */}
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] aspect-square bg-bright-orange/20 blur-[100px] rounded-full pointer-events-none" 
          />

          <AnimatePresence mode="wait">
            {!isUnlocked ? (
              // LOCKED STATE
              <motion.div
                key="locked"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 flex flex-col items-center"
              >
                <motion.div 
                  animate={{ rotateY: [0, 360] }}
                  transition={{ duration: 4, ease: "linear", repeat: Infinity }}
                  className="w-20 h-20 rounded-full border border-bright-orange/30 flex items-center justify-center mb-8 bg-black shadow-[0_0_20px_rgba(255,85,0,0.2)]"
                >
                  <Lock size={28} className="text-bright-orange" />
                </motion.div>
                
                <p className="font-mono text-lg tracking-[0.4em] text-white/50 uppercase mb-4">
                  Classified Drop / Subject 001
                </p>
                
                <GlitchText text="RESTRICTED ACCESS" className="font-bebas text-5xl md:text-7xl tracking-tighter uppercase mb-10" />
                
                <p className="font-montserrat text-lg text-white/40 mb-10 max-w-sm mx-auto leading-relaxed">
                  Only 100 serialized pairs of the Carbon Volt exist. Level 4 clearance is required to view full specifications and secure your pair.
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setIsRequesting(true);
                    setTimeout(() => setIsUnlocked(true), 3500);
                  }}
                  disabled={isRequesting}
                  className="group relative px-12 py-5 font-mono text-sm tracking-[0.3em] uppercase overflow-hidden border border-bright-orange bg-black text-bright-orange w-full sm:w-auto cursor-pointer disabled:opacity-70 disabled:cursor-wait"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    <Unlock size={14} className="group-hover:text-black transition-colors duration-300" /> 
                    <span className="group-hover:text-black transition-colors duration-300 font-bold">
                      {isRequesting ? "AUTHENTICATING CLEARANCE..." : "Request Entry"}
                    </span>
                  </span>
                  <div className="absolute inset-0 bg-bright-orange translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                </motion.button>
              </motion.div>
            ) : (
              // UNLOCKED STATE
              <motion.div
                key="unlocked"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="relative z-10 flex flex-col items-center"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Flame className="text-bright-orange" size={24} />
                  <span className="font-mono text-xs tracking-[0.4em] text-white/50 uppercase border-b border-bright-orange/30 pb-1">Carbon Volt Protocol</span>
                </div>
                
                <div className="flex gap-4 mb-8 font-bebas text-5xl md:text-6xl tracking-wider text-bright-orange">
                  <span className="w-20 bg-black/50 rounded shadow-[0_0_15px_rgba(255,85,0,0.1)] border border-white/5">{String(countdown.h).padStart(2, '0')}</span>
                  <span className="text-white/30">:</span>
                  <span className="w-20 bg-black/50 rounded shadow-[0_0_15px_rgba(255,85,0,0.1)] border border-white/5">{String(countdown.m).padStart(2, '0')}</span>
                  <span className="text-white/30">:</span>
                  <span className="w-20 bg-black/50 rounded shadow-[0_0_15px_rgba(255,85,0,0.1)] border border-bright-orange/20">{String(countdown.s).padStart(2, '0')}</span>
                </div>

                <div className="relative w-40 h-40 md:w-56 md:h-56 mb-6">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border border-dashed border-white/20 rounded-full pointer-events-none" 
                  />
                  <img 
                    src="/images/fox_carbon_volt.png" 
                    alt="Autoclave Carbon 001" 
                    className="w-full h-full object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)] rounded-xl scale-110"
                  />
                </div>
                
                <h2 className="font-bebas text-4xl tracking-wide uppercase mb-4">
                  Autoclave Carbon <span className="text-bright-orange">001</span>
                </h2>
                
                <p className="text-white/50 font-montserrat text-lg leading-relaxed mb-8 max-w-sm mx-auto">
                  Direct autoclave raw carbon fiber panels. Individually serialized. Only 7 pairs remain available in the vault.
                </p>

                <div className="flex flex-col w-full gap-4 sm:flex-row">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      const carbonDrop = products.find(p => p.id === "carbon-drop");
                      if (carbonDrop) {
                        addToCart(carbonDrop, carbonDrop.sizes[0], carbonDrop.colors?.[0], 1, false);
                        router.push('/cart');
                      }
                    }}
                    className="w-full bg-bright-orange text-black font-bebas px-8 py-4 text-xl tracking-[0.2em] uppercase hover:bg-white transition-colors duration-300 shadow-[0_0_20px_rgba(255,85,0,0.4)] cursor-pointer"
                  >
                    Secure Pair - $350
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
