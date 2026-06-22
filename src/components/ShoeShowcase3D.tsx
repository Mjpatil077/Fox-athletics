"use client";
 
import React, { useState, useRef, useEffect, MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
 
interface ShoeShowcase3DProps {
  imageSrc: string;
  accentColor: string; // e.g. '#39ff14' (Neon Green)
  accentGlowClass?: string; // Optional background glow styling
}
 
export default function ShoeShowcase3D({
  imageSrc = "/images/hero_shoe.png",
  accentColor = "#39ff14",
}: ShoeShowcase3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Continuous slow rotation state (angle in degrees)
  const autoAngle = useMotionValue(0);
 
  // Mouse coordinates mapped to -0.5 to 0.5 range
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
 
  // Smoothed spring coordinates for mouse tilt (very slow, high damping for luxury feel)
  const springX = useSpring(mouseX, { stiffness: 45, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 45, damping: 25 });
 
  // Map mouse spring position to rotation overrides
  const tiltX = useTransform(springY, [-0.5, 0.5], [20, -20]);
  const tiltY = useTransform(springX, [-0.5, 0.5], [-25, 25]);
  const shadowX = useTransform(springX, [-0.5, 0.5], [-35, 35]);
  const shadowY = useTransform(springY, [-0.5, 0.5], [-15, 15]);
 
  // 1. Slow Auto-rotation loop
  useEffect(() => {
    let frameId: number;
    const animateRotation = () => {
      autoAngle.set((autoAngle.get() + 0.15) % 360);
      frameId = requestAnimationFrame(animateRotation);
    };
    frameId = requestAnimationFrame(animateRotation);
    return () => cancelAnimationFrame(frameId);
  }, [autoAngle]);
 
  // 2. High-performance Canvas Particles Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
 
    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);
 
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);
 
    // Particles setup
    const particleCount = 45;
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      maxOpacity: number;
    }> = [];
 
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.8 + 0.5,
        speedY: -(Math.random() * 0.4 + 0.1),
        speedX: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.5,
        maxOpacity: Math.random() * 0.4 + 0.1,
      });
    }
 
    const drawParticles = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = accentColor;
 
      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];
        p.y += p.speedY;
        p.x += p.speedX;
 
        // Mouse inertia influence
        const mx = mouseX.get();
        const my = mouseY.get();
        p.x += mx * 0.2;
        p.y += my * 0.1;
 
        // Fade in/out logic
        if (p.opacity < p.maxOpacity) p.opacity += 0.005;
 
        // Reset boundaries
        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
          p.opacity = 0;
        }
        if (p.x < 0 || p.x > width) {
          p.x = Math.random() * width;
        }
 
        ctx.beginPath();
        ctx.globalAlpha = p.opacity;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
 
      animationFrameId = requestAnimationFrame(drawParticles);
    };
 
    drawParticles();
 
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [accentColor]);
 
  const handleMouseMove = (e: MouseEvent) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };
 
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };
 
  const transformStyle = useMotionTemplate`translateZ(60px) rotateY(${autoAngle}deg)`;
 
  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[450px] md:h-[550px] flex items-center justify-center select-none perspective-[1200px] overflow-visible"
    >
      {/* HTML Canvas Particle Overlay */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-60"
      />
 
      {/* Background Volumetric Lighting / Ambient Glow */}
      <div
        className="absolute w-[280px] h-[280px] md:w-[400px] md:h-[400px] rounded-full opacity-30 mix-blend-screen filter blur-[90px] md:blur-[140px] transition-all duration-1000 pointer-events-none z-0"
        style={{
          backgroundColor: accentColor,
          boxShadow: `0 0 120px ${accentColor}`,
        }}
      />
 
      {/* Floating 3D Shoe Container */}
      <motion.div
        style={{
          rotateX: tiltX,
          rotateY: tiltY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full max-w-lg aspect-square flex items-center justify-center pointer-events-none z-10"
      >
        {/* Dynamic Shadow responding to mouse position */}
        <motion.div
          style={{
            x: shadowX,
            y: shadowY,
            scale: 1,
            background: `radial-gradient(ellipse at center, ${accentColor} 0%, rgba(0,0,0,0) 70%)`,
          }}
          className="absolute bottom-4 left-[20%] right-[20%] h-8 rounded-full pointer-events-none opacity-40 filter blur-xl transition-all"
        />
 
        {/* Futuristic Tech HUD Circular Track */}
        <div
          className="absolute w-[320px] h-[320px] md:w-[420px] md:h-[420px] rounded-full border border-dashed opacity-5 animate-[spin_60s_linear_infinite]"
          style={{ borderColor: accentColor }}
        />
 
        {/* Hybrid Animated Shoe Image */}
        <motion.div
          animate={{
            y: [0, -12, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            // Slow continuous y-rotation layered with mouse responsive z-translation
            transform: transformStyle,
            transformStyle: "preserve-3d",
          }}
          className="w-[85%] md:w-[95%] h-auto flex items-center justify-center"
        >
          <img
            src={`${imageSrc}?v=2`}
            alt="Cinematic Fox Performance Shoe"
            className="w-full h-auto object-contain z-10 select-none pointer-events-none drop-shadow-[0_30px_60px_rgba(0,0,0,0.95)]"
          />
        </motion.div>
      </motion.div>
     </div>
  );
}
