"use client";

import React, { useRef, useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import { motion, useInView, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { ArrowRight, Wind, Zap, Activity, Layers } from "lucide-react";
import Link from "next/link";

function RevealSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 48 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

// Staggered text reveal component
const StaggeredText = ({ text, className }: { text: string; className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  
  const words = text.split(" ");
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 12, stiffness: 100 } },
    hidden: { opacity: 0, y: 20, transition: { type: "spring", damping: 12, stiffness: 100 } },
  };

  return (
    <motion.h2
      ref={ref}
      className={className}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {words.map((word, index) => (
        <motion.span variants={child} key={index} className="inline-block mr-[0.25em]">
          {word}
        </motion.span>
      ))}
    </motion.h2>
  );
};

// 3D Tilt Card
const TiltCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-xl transition-all ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default function InnovationPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="min-h-screen bg-neutral-950 grain text-white selection:bg-bright-orange selection:text-white">
      <Navbar />
      <CartDrawer />

      {/* Advanced Hero Section */}
      <section ref={heroRef} className="relative min-h-[100svh] flex items-center pt-20 border-b border-neutral-900 perspective-1000">
        {/* Parallax Grid Background */}
        <motion.div style={{ y: bgY }} className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-950/80 to-neutral-950 z-10" />
        
        <motion.div style={{ opacity: opacityHero }} className="relative z-20 w-full max-w-[1400px] mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <RevealSection>
              <div className="flex items-center gap-4 mb-6">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: 48 }}
                  transition={{ duration: 1, ease: "circOut" }}
                  className="h-px bg-bright-orange" 
                />
                <motion.p 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="font-mono text-[10px] tracking-[0.4em] text-bright-orange uppercase"
                >
                  Fox R&D Lab
                </motion.p>
              </div>
              <div className="overflow-hidden mb-6">
                <motion.h1 
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="font-bebas text-[14vw] md:text-[9vw] leading-[0.8] tracking-tighter uppercase"
                >
                  Science of <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-bright-orange via-orange-400 to-white/40">
                    Speed.
                  </span>
                </motion.h1>
              </div>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="text-white/60 font-montserrat text-sm leading-relaxed max-w-md mb-10"
              >
                Welcome to the edge of athletic performance. Our innovation lab is where materials science meets biomechanics, resulting in gear that rewrites the rules of what's possible.
              </motion.p>
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                onClick={() => document.getElementById("technologies")?.scrollIntoView({ behavior: "smooth" })}
                className="group relative border border-white/20 text-white font-mono text-xs tracking-[0.2em] uppercase px-8 py-4 hover:border-bright-orange hover:text-bright-orange transition-colors duration-300 overflow-hidden"
              >
                <span className="relative z-10">Explore Tech Stack</span>
                <div className="absolute inset-0 bg-bright-orange/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
              </motion.button>
            </RevealSection>
          </div>

          <div className="relative h-full min-h-[500px] hidden md:block">
            {/* Holographic Glowing Schematics */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 60, ease: "linear", repeat: Infinity }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] aspect-square border border-bright-orange/10 rounded-full" 
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 40, ease: "linear", repeat: Infinity }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] aspect-square border border-white/5 rounded-full border-dashed" 
            />
            
            <TiltCard className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full max-w-md aspect-square" style={{ transform: "translateZ(50px)" }}>
                <motion.div 
                  animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 bg-bright-orange/20 blur-[100px] rounded-full" 
                />
                <img 
                  src="/images/fox_carbon_volt.png" 
                  alt="Shoe Schematic" 
                  className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_0_30px_rgba(255,85,0,0.3)]"
                />
                
                {/* 3D Floating Elements */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.5, duration: 1 }}
                  className="absolute top-[20%] -left-10 z-20 flex items-center gap-2"
                  style={{ transform: "translateZ(80px)" }}
                >
                  <div className="w-1.5 h-1.5 bg-bright-orange rounded-full animate-ping" />
                  <div className="font-mono text-[8px] tracking-[0.2em] uppercase text-white/70 bg-black/50 backdrop-blur border border-white/10 px-3 py-1.5">
                    AeroKnit Mesh Matrix
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.8, duration: 1 }}
                  className="absolute bottom-[30%] -right-10 z-20 flex items-center gap-2"
                  style={{ transform: "translateZ(100px)" }}
                >
                  <div className="font-mono text-[8px] tracking-[0.2em] uppercase text-bright-orange bg-black/50 backdrop-blur border border-bright-orange/30 px-3 py-1.5">
                    Carbon Propulsion Plate
                  </div>
                  <div className="w-1.5 h-1.5 bg-bright-orange rounded-full animate-ping" />
                </motion.div>
              </div>
            </TiltCard>
          </div>
        </motion.div>
      </section>

      {/* Technologies Section */}
      <section id="technologies" className="py-40 relative">
        {/* Decorative running grid line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-bright-orange/20 to-transparent hidden lg:block" />

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 space-y-40">
          
          {/* Tech 1 */}
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <RevealSection className="order-2 lg:order-1 relative">
              <TiltCard>
                <div className="aspect-[4/3] bg-neutral-900 border border-neutral-800 p-10 relative overflow-hidden group rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-bright-orange/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" 
                  />
                  <div className="absolute top-6 left-6 font-mono text-[10px] tracking-[0.3em] text-white/30 uppercase">Fig. 01</div>
                  <Zap size={200} className="absolute -bottom-10 -right-10 text-neutral-800/30 group-hover:text-neutral-700 transition-colors duration-700 mix-blend-screen" strokeWidth={0.2} />
                  
                  <div className="relative z-10 h-full flex flex-col justify-center" style={{ transform: "translateZ(30px)" }}>
                    <h3 className="font-bebas text-5xl md:text-6xl tracking-wide uppercase mb-2 text-white/50">Carbon</h3>
                    <h3 className="font-bebas text-5xl md:text-6xl tracking-wide uppercase text-bright-orange mb-10 drop-shadow-[0_0_15px_rgba(255,85,0,0.4)]">Propulsion Plate</h3>
                    <div className="grid grid-cols-2 gap-8 mt-auto">
                      <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="border-t border-neutral-800 pt-4"
                      >
                        <p className="font-mono text-[9px] text-white/50 tracking-[0.2em] uppercase mb-2">Energy Return</p>
                        <p className="font-bebas text-4xl text-white">340%</p>
                      </motion.div>
                      <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="border-t border-neutral-800 pt-4"
                      >
                        <p className="font-mono text-[9px] text-white/50 tracking-[0.2em] uppercase mb-2">Thickness</p>
                        <p className="font-bebas text-4xl text-white">1.2mm</p>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </RevealSection>
            
            <RevealSection delay={0.2} className="order-1 lg:order-2 lg:pl-10">
              <div className="flex items-center gap-3 mb-8">
                <motion.span 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="w-10 h-10 rounded-full border border-bright-orange/30 flex items-center justify-center text-bright-orange"
                >
                  <Zap size={16} />
                </motion.span>
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/60">Core Technology</span>
              </div>
              <StaggeredText 
                text="Explosive Forward Momentum."
                className="font-bebas text-6xl md:text-7xl tracking-tighter uppercase leading-none mb-8"
              />
              <p className="text-white/60 font-montserrat text-sm leading-relaxed mb-10 text-justify">
                A full-length, hyper-curved carbon fiber plate lies at the heart of our performance models. Cured in aerospace autoclaves, it stores kinetic energy upon impact and releases it with a violent, propulsive snap during toe-off.
              </p>
              <ul className="space-y-6 font-mono text-[10px] tracking-[0.1em] text-white/70">
                {[
                  "Reduces ankle joint workload by up to 18%",
                  "Custom layup design for varying stiffness zones",
                  "Prevents hyper-flexion under extreme loads"
                ].map((item, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + (i * 0.1) }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-2 h-2 bg-bright-orange shadow-[0_0_10px_#ff5500]" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </RevealSection>
          </div>

          {/* Tech 2 */}
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <RevealSection className="relative lg:pr-10">
              <div className="flex items-center gap-3 mb-8">
                <motion.span 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="w-10 h-10 rounded-full border border-bright-orange/30 flex items-center justify-center text-bright-orange"
                >
                  <Layers size={16} />
                </motion.span>
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/60">Midsole Innovation</span>
              </div>
              <StaggeredText 
                text="Kinetic Foam Array."
                className="font-bebas text-6xl md:text-7xl tracking-tighter uppercase leading-none mb-8"
              />
              <p className="text-white/60 font-montserrat text-sm leading-relaxed mb-10 text-justify">
                Traditional EVA foam is dead. Kinetic Foam is a nitrogen-infused, supercritical compound that delivers extreme cushioning while maintaining razor-sharp responsiveness. 
              </p>
              <ul className="space-y-6 font-mono text-[10px] tracking-[0.1em] text-white/70">
                {[
                  "40% lighter than standard industry foams",
                  "Zero compression set after 500 miles",
                  "Micro-cellular nitrogen structure for bounce"
                ].map((item, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + (i * 0.1) }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-2 h-2 bg-bright-orange shadow-[0_0_10px_#ff5500]" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </RevealSection>
            
            <RevealSection delay={0.2} className="relative">
              <TiltCard>
                <div className="aspect-[4/3] bg-neutral-900 border border-neutral-800 p-10 relative overflow-hidden group rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-bright-orange/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" 
                  />
                  <div className="absolute top-6 left-6 font-mono text-[10px] tracking-[0.3em] text-white/30 uppercase">Fig. 02</div>
                  <Activity size={200} className="absolute -bottom-10 -left-10 text-neutral-800/30 group-hover:text-neutral-700 transition-colors duration-700 mix-blend-screen" strokeWidth={0.2} />
                  
                  <div className="relative z-10 h-full flex flex-col justify-center text-right items-end" style={{ transform: "translateZ(30px)" }}>
                    <h3 className="font-bebas text-5xl md:text-6xl tracking-wide uppercase mb-2 text-white/50">Kinetic</h3>
                    <h3 className="font-bebas text-5xl md:text-6xl tracking-wide uppercase text-bright-orange mb-10 drop-shadow-[0_0_15px_rgba(255,85,0,0.4)]">Nitrogen Foam</h3>
                    <div className="grid grid-cols-2 gap-8 mt-auto text-left w-full border-t border-neutral-800 pt-4">
                      <motion.div whileHover={{ scale: 1.05 }}>
                        <p className="font-mono text-[9px] text-white/50 tracking-[0.2em] uppercase mb-2">Density</p>
                        <p className="font-bebas text-4xl text-white">0.11g/cm³</p>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.05 }}>
                        <p className="font-mono text-[9px] text-white/50 tracking-[0.2em] uppercase mb-2">Impact Absorb</p>
                        <p className="font-bebas text-4xl text-white">88%</p>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </RevealSection>
          </div>
          
        </div>
      </section>

      {/* Futuristic Marquee */}
      <div className="bg-neutral-900 py-4 overflow-hidden border-y border-neutral-800 z-20 relative">
        <motion.div 
          animate={{ x: ["-50%", "0%"] }}
          transition={{ duration: 25, ease: "linear", repeat: Infinity }}
          className="whitespace-nowrap flex text-white/20"
        >
          {[...Array(10)].map((_, i) => (
             <span key={i} className="font-bebas text-3xl tracking-[0.2em] uppercase px-8">
               THE FUTURE OF MOVEMENT <span className="text-bright-orange mx-6">/</span> 
             </span>
          ))}
        </motion.div>
      </div>

      {/* Advanced CTA */}
      <section className="py-40 bg-black border-t border-neutral-900 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-bright-orange to-transparent opacity-50" />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-bright-orange/20 blur-[150px] rounded-full pointer-events-none" 
        />
        
        <RevealSection className="relative z-10">
          <h2 className="font-bebas text-6xl md:text-[8rem] tracking-tighter uppercase text-white mb-12 leading-none">
            Stop reading. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-bright-orange to-white/50">Start running.</span>
          </h2>
          <Link href="/">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-black font-bebas px-16 py-6 text-2xl tracking-[0.2em] uppercase hover:bg-bright-orange hover:text-white transition-all duration-500 inline-flex items-center gap-4 relative overflow-hidden group shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_50px_rgba(255,85,0,0.4)] cursor-pointer"
            >
              <span className="relative z-10">Shop The Tech</span>
              <motion.div 
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="relative z-10"
              >
                <ArrowRight size={24} />
              </motion.div>
            </motion.button>
          </Link>
        </RevealSection>
      </section>
    </div>
  );
}
