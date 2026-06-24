"use client";

import React, { useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, Shield, Zap, Target } from "lucide-react";
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
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };

  const child: import("framer-motion").Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 40,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
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

export default function BrandPage() {
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  
  const yBg = useTransform(heroScroll, [0, 1], ["0%", "40%"]);
  const opacityHero = useTransform(heroScroll, [0, 0.8], [1, 0]);
  const scaleHero = useTransform(heroScroll, [0, 1], [1, 0.9]);

  const [hoveredAthlete, setHoveredAthlete] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white grain selection:bg-black selection:text-white">
      <Navbar />
      <CartDrawer />

      {/* Advanced Hero Section with Parallax */}
      <section ref={heroRef} className="relative h-[100svh] flex items-center justify-center overflow-hidden bg-neutral-950">
        <motion.div style={{ y: yBg, opacity: opacityHero, scale: scaleHero }} className="absolute inset-0">
          <img
            src="/images/fox_athlete.png"
            alt="Fox Athlete"
            className="w-full h-full object-cover opacity-30 grayscale mix-blend-screen"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-950/80 to-neutral-950" />
        </motion.div>
        
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 text-center mt-20">
          <RevealSection>
            <motion.p 
              initial={{ opacity: 0, letterSpacing: "0em" }}
              animate={{ opacity: 1, letterSpacing: "0.4em" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="font-mono text-xl md:text-2xl text-bright-orange uppercase mb-6"
            >
              The Fox Identity
            </motion.p>
            <div className="overflow-hidden">
              <motion.h1 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="font-bebas text-[12vw] md:text-[10vw] leading-none tracking-tighter text-white uppercase"
              >
                Engineered
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                className="font-bebas text-[12vw] md:text-[10vw] leading-none tracking-tighter text-white/40 uppercase"
              >
                Not Crafted.
              </motion.h1>
            </div>
          </RevealSection>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center opacity-50"
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white to-transparent" />
        </motion.div>
      </section>

      {/* Infinite Marquee */}
      <div className="bg-bright-orange py-3 overflow-hidden border-y border-neutral-900 z-20 relative">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity }}
          className="whitespace-nowrap flex"
        >
          {[...Array(10)].map((_, i) => (
             <span key={i} className="font-mono text-lg tracking-[0.3em] text-black uppercase px-8">
               Data Driven Performance <span className="mx-6">✦</span> Absolute Energy Return <span className="mx-6">✦</span> Synthetic Evolution
             </span>
          ))}
        </motion.div>
      </div>

      {/* Manifesto Section */}
      <section className="py-40 bg-white relative">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className="max-w-xl">
              <StaggeredText 
                text="The Anatomy of Domination" 
                className="font-bebas text-6xl md:text-8xl tracking-tighter uppercase text-neutral-900 leading-none mb-10" 
              />
              <RevealSection delay={0.4} className="space-y-6 text-neutral-500 font-montserrat text-lg leading-relaxed relative">
                <div className="absolute -left-6 top-0 bottom-0 w-px bg-neutral-200" />
                <p>
                  We don't do heritage. We don't do hand-stitched nostalgia. FOX is born from raw data, biomechanical engineering, and an obsessive pursuit of marginal gains. 
                </p>
                <p>
                  Our laboratories operate on the edge of what's physically possible, forging synthetic compounds and aerospace-grade carbon fiber into weaponry for the modern athlete.
                </p>
                <p className="text-neutral-900 font-bold text-lg">
                  Every gram removed is a millisecond gained.
                </p>
              </RevealSection>
            </div>
            
            <RevealSection delay={0.2} className="relative aspect-[4/5] bg-neutral-100 overflow-hidden group">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <div className="absolute inset-0 bg-neutral-900/5 mix-blend-multiply z-10" />
                <img 
                  src="/images/fox_carbon_volt.png" 
                  alt="Carbon Fiber Detail" 
                  className="w-full h-full object-cover scale-150 grayscale contrast-125 mix-blend-luminosity opacity-80"
                />
              </motion.div>
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20 bg-gradient-to-t from-black/20 to-transparent">
                <div className="font-mono text-[11px] tracking-[0.25em] text-white bg-black/80 backdrop-blur-md px-4 py-2 uppercase inline-block">
                  Subject: Alpha-01 Carbon Plate
                </div>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* The Pillars */}
      <section className="py-32 bg-neutral-100">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <RevealSection className="text-center mb-24">
            <h2 className="font-bebas text-5xl md:text-7xl tracking-tighter uppercase text-neutral-900 leading-none">
              The Paradigm.
            </h2>
          </RevealSection>

          <div className="grid md:grid-cols-3 gap-px bg-neutral-200">
            {[
              {
                icon: <Zap size={28} strokeWidth={1.5} />,
                title: "Absolute Energy",
                desc: "Harnessing kinetic transfer with zero loss. Our foam geometries return more energy than they absorb."
              },
              {
                icon: <Target size={28} strokeWidth={1.5} />,
                title: "Precision Fit",
                desc: "AeroKnit tension mapping secures the foot with mathematical precision, eliminating micro-slippage."
              },
              {
                icon: <Shield size={28} strokeWidth={1.5} />,
                title: "Structural Integrity",
                desc: "Autoclave carbon-fiber infused chassis provides hypercar-level rigidity at a fraction of the weight."
              }
            ].map((pillar, i) => (
              <RevealSection key={i} delay={i * 0.15} className="bg-white p-14 hover:bg-neutral-950 transition-colors duration-700 group cursor-default">
                <motion.div 
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="mb-8 text-bright-orange group-hover:text-white transition-colors duration-500 w-fit"
                >
                  {pillar.icon}
                </motion.div>
                <h3 className="font-bebas text-4xl tracking-wide text-neutral-900 group-hover:text-white transition-colors duration-500 mb-4">
                  {pillar.title}
                </h3>
                <p className="text-neutral-500 font-montserrat text-lg leading-relaxed group-hover:text-white/60 transition-colors duration-500">
                  {pillar.desc}
                </p>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Roster / Athletes */}
      <section className="py-40 bg-neutral-950 text-white overflow-hidden relative">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
          <RevealSection className="mb-20">
            <h2 className="font-bebas text-7xl md:text-[9rem] tracking-tighter uppercase leading-none">
              The <span className="text-bright-orange">Roster.</span>
            </h2>
            <p className="text-white/50 font-montserrat text-lg max-w-xl mt-8">
              We don't sponsor. We arm the elite. The athletes who demand more from their gear than anyone else on the planet.
            </p>
          </RevealSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Marcus V.", sport: "Marathon", img: "/images/athlete_marathon.png" },
              { name: "Elena S.", sport: "Track & Field", img: "/images/athlete_track.png" },
              { name: "David K.", sport: "Basketball", img: "/images/athlete_basketball.png" },
              { name: "Sarah T.", sport: "Cross Training", img: "/images/athlete_cross_training.png" }
            ].map((athlete, i) => (
              <RevealSection key={i} delay={i * 0.1} className="group relative aspect-[3/4] bg-neutral-900 overflow-hidden cursor-pointer">
                <motion.div 
                  className="absolute inset-0"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  onHoverStart={() => setHoveredAthlete(i)}
                  onHoverEnd={() => setHoveredAthlete(null)}
                >
                  <img 
                    src={athlete.img} 
                    alt={athlete.name} 
                    className={`w-full h-full object-cover transition-all duration-700 ${hoveredAthlete === i ? 'grayscale-0 opacity-100' : 'grayscale opacity-60'}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
                </motion.div>
                
                <div className="absolute bottom-8 left-8 right-8 z-20">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={hoveredAthlete === i ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="font-mono text-[11px] tracking-[0.2em] text-bright-orange uppercase mb-2"
                  >
                    {athlete.sport}
                  </motion.div>
                  <h3 className="font-bebas text-4xl tracking-wide uppercase transition-colors duration-300">
                    {athlete.name}
                  </h3>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced CTA */}
      <section className="py-40 bg-white text-center relative overflow-hidden">
        <RevealSection className="relative z-10">
          <StaggeredText 
            text="Experience the Evolution" 
            className="font-bebas text-5xl md:text-8xl tracking-tighter uppercase text-neutral-900 mb-10" 
          />
          <Link href="/">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-black text-white font-bebas px-14 py-6 text-2xl tracking-[0.2em] uppercase hover:bg-bright-orange transition-colors duration-500 inline-flex items-center gap-4 relative overflow-hidden group cursor-pointer"
            >
              <span className="relative z-10">View the Collection</span>
              <motion.div 
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="relative z-10"
              >
                <ArrowRight size={24} />
              </motion.div>
              {/* Button hover effect sweep */}
              <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
            </motion.button>
          </Link>
        </RevealSection>
      </section>
    </div>
  );
}
