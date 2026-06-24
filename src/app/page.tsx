"use client";

import React, { useState, useEffect, useRef } from "react";
import { useStore } from "@/context/StoreContext";
import { products, Product } from "@/data/products";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import Fox3DLogo from "@/components/Fox3DLogo";
import Link from "next/link";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const QuickViewModal = dynamic(() => import("@/components/QuickViewModal"), { ssr: false });
import {
  Heart,
  ShoppingBag,
  Eye,
  Star,
  ArrowRight,
  Clock,
  Flame,
  Zap,
  Shield,
  Wind,
  ChevronDown,
  Play,
  Award,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  motion,
  AnimatePresence,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";

/* ─── Reviews data ─── */
const reviews = [
  {
    name: "Marcus V.",
    role: "Marathon Runner",
    text: "The Phantom Alpha has completely changed my race days. That carbon propulsive snap is unreal — shaved 45 seconds off my PB.",
    rating: 5,
    verified: true,
  },
  {
    name: "Elena S.",
    role: "Athletic Trainer",
    text: "Fox strikes the perfect balance between raw performance and editorial design. The Strike Cleat traction is absolutely lethal.",
    rating: 5,
    verified: true,
  },
  {
    name: "Devon K.",
    role: "Sneaker Architect",
    text: "The exposed autoclave carbon fiber feels more like hypercar engineering than athletic footwear. Absolutely jaw-dropping.",
    rating: 5,
    verified: true,
  },
];

/* ─── Tech specs data ─── */
const techSpecs = [
  {
    icon: <Zap size={28} className="text-bright-orange" />,
    title: "Carbon Propulsion",
    desc: "Full-length curved carbon fiber plate delivers explosive forward energy return with every stride.",
    stat: "340%",
    statLabel: "Energy Return",
  },
  {
    icon: <Wind size={28} className="text-bright-orange" />,
    title: "AeroKnit Upper",
    desc: "Precision-engineered mesh channels airflow to cool feet under max-effort conditions.",
    stat: "6.8oz",
    statLabel: "Total Weight",
  },
  {
    icon: <Shield size={28} className="text-bright-orange" />,
    title: "Kinetic Foam",
    desc: "Dual-density nitrogen-infused midsole absorbs impact while storing and releasing energy.",
    stat: "40mm",
    statLabel: "Stack Height",
  },
];

/* ─── Stats data ─── */
const statsData = [
  { value: "100K+", label: "Athletes Equipped" },
  { value: "48", label: "Countries Reached" },
  { value: "3.2s", label: "Avg. Speed Gain" },
  { value: "99%", label: "5-Star Reviews" },
];

/* ─── Reveal animation wrapper ─── */
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

import ProductCard from "@/components/ProductCard";

/* ─── Main Page ─── */
export default function Home() {
  const { cart, wishlist, setIsCartOpen, searchQuery, setSearchQuery, selectedCategory, setSelectedCategory } = useStore();
  const router = useRouter();
  const [isCartOpenLocal, setIsCartOpenLocal] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [activeReview, setActiveReview] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Mute / unmute video
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = !soundEnabled;
    }
  }, [soundEnabled]);

  // Auto-advance review
  useEffect(() => {
    const id = setInterval(() => {
      setActiveReview((v) => (v + 1) % reviews.length);
    }, 4500);
    return () => clearInterval(id);
  }, []);

  /* Filter products */
  const filtered = products.filter((p) => {
    if (p.isLimited) return false;
    const matchCategory =
      selectedCategory === "All" || p.category === selectedCategory;
    const matchSearch =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <div className="min-h-screen bg-white grain overflow-x-hidden">
        <Navbar />
        <CartDrawer />

      {/* ═══════════════════════════════════════ HERO ═══════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative h-[100svh] flex items-end overflow-hidden bg-neutral-950"
      >
        {/* Video background — GPU composited, no JS scroll overhead */}
        <div className="absolute inset-0 pointer-events-none">
          <video
            ref={videoRef}
            src="/FOX_compressed.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover opacity-70 scale-110"
            style={{ willChange: "transform" }}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        </div>

        {/* Hero content */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 pb-16 md:pb-24"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-mono text-sm tracking-[0.4em] text-white/40 uppercase mb-4"
          >
            SS26 — Performance Redefined
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-bebas text-[8vw] md:text-[6vw] leading-none tracking-tighter text-white uppercase mb-6"
          >
            Built to
            <br />
            <span className="text-bright-orange">Break</span> Limits.
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap items-center gap-4"
          >
            <button
              onClick={() => {
                setSelectedCategory("All");
                document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-white text-black font-bebas px-8 py-4 text-lg tracking-[0.2em] uppercase hover:bg-bright-orange hover:text-white transition-colors duration-300 flex items-center gap-2 cursor-pointer"
            >
              Shop Now <ArrowRight size={16} />
            </button>
            <button
              onClick={() => document.getElementById("tech")?.scrollIntoView({ behavior: "smooth" })}
              className="border border-white/30 text-white font-mono text-sm tracking-[0.2em] uppercase px-8 py-4 hover:border-white transition-colors duration-300 cursor-pointer"
            >
              Our Technology
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/40"
        >
          <ChevronDown size={18} />
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════ MARQUEE ═══════════════════════════════════════ */}
      <div className="bg-black py-4 overflow-hidden border-y border-neutral-800">
        <div className="marquee-track">
          {[
            "Carbon Propulsion",
            "AeroKnit Technology",
            "Kinetic Foam",
            "Fox Athletics",
            "SS26 Collection",
            "Built to Break Limits",
            "Carbon Propulsion",
            "AeroKnit Technology",
            "Kinetic Foam",
            "Fox Athletics",
            "SS26 Collection",
            "Built to Break Limits",
          ].map((text, i) => (
            <span
              key={i}
              className="font-bebas text-sm tracking-[0.3em] text-white/40 uppercase px-10"
            >
              {text} <span className="text-bright-orange mx-2">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════ STATS ═══════════════════════════════════════ */}
      <section className="bg-white py-20 border-b border-neutral-100">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-neutral-100">
            {statsData.map((stat, i) => (
              <RevealSection key={i} delay={i * 0.1} className="text-center py-6 px-4">
                <p className="font-bebas text-5xl md:text-6xl text-neutral-900 leading-none">
                  {stat.value}
                </p>
                <p className="font-mono text-sm tracking-[0.25em] text-neutral-400 uppercase mt-2">
                  {stat.label}
                </p>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ TECHNOLOGY ═══════════════════════════════════════ */}
      <section id="tech" className="bg-white py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <RevealSection className="max-w-2xl mb-20">
            <h2 className="font-bebas text-6xl md:text-8xl tracking-tighter uppercase text-neutral-900 leading-none">
              Engineered
              <br />
              <span className="text-bright-orange">Differently.</span>
            </h2>
            <p className="text-neutral-500 font-montserrat text-lg leading-relaxed mt-6 max-w-lg">
              Every component of Fox footwear is designed with a singular obsession — to make you faster, stronger, and more explosive than ever before.
            </p>
          </RevealSection>

          <div className="grid md:grid-cols-3 gap-px bg-neutral-100">
            {techSpecs.map((spec, i) => (
              <RevealSection key={i} delay={i * 0.12} className="bg-white p-10 group hover:bg-neutral-950 transition-colors duration-500">
                <div className="mb-6 group-hover:[&>*]:text-white transition-colors duration-500">{spec.icon}</div>
                <div className="mb-4">
                  <p className="font-bebas text-4xl text-neutral-900 group-hover:text-white transition-colors duration-500">
                    {spec.stat}
                  </p>
                  <p className="font-mono text-xs tracking-[0.25em] text-neutral-400 uppercase">
                    {spec.statLabel}
                  </p>
                </div>
                <h3 className="font-bebas text-2xl tracking-wide text-neutral-900 group-hover:text-white transition-colors duration-500 mb-2">
                  {spec.title}
                </h3>
                <p className="text-neutral-500 font-montserrat text-base leading-relaxed group-hover:text-white/60 transition-colors duration-500">
                  {spec.desc}
                </p>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ FEATURED DROP ═══════════════════════════════════════ */}
      <section className="bg-neutral-950 py-32 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <RevealSection>
              <h2 className="font-bebas text-6xl md:text-8xl leading-none tracking-tighter text-white uppercase mb-6">
                Autoclave<br />
                <span className="text-bright-orange">Carbon 001</span>
              </h2>
              <p className="text-white/60 font-montserrat text-lg leading-relaxed mb-8 max-w-md">
                Built with direct autoclave raw carbon fiber panels, individually serialized laser engravings, and a custom neon-orange glow outsole. The most exclusive Fox drop ever made.
              </p>
              <div className="flex flex-wrap gap-3 mb-10">
                {["Serialized Edition", "Carbon Fiber", "Glow Outsole"].map((tag) => (
                  <span key={tag} className="border border-white/20 text-white/60 font-mono text-xs tracking-[0.2em] uppercase px-3 py-1.5">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-6">
                <button
                  onClick={() => router.push('/limited')}
                  className="bg-bright-orange text-white font-bebas px-10 py-4 text-lg tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-colors duration-300 flex items-center gap-2 cursor-pointer"
                >
                  <Flame size={16} /> Secure Yours
                </button>
                <div className="text-white/40 font-mono text-sm">
                  <p className="text-2xl font-bebas text-white tracking-widest text-bright-orange">LIMITED</p>
                  <p className="text-sm tracking-[0.2em] uppercase">Only 7 remaining</p>
                </div>
              </div>
            </RevealSection>

            <RevealSection delay={0.2} className="relative">
              <div className="relative aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 bg-bright-orange/10 rounded-full blur-3xl animate-pulse-glow" />
                <img
                  src="/images/fox_carbon_volt.png"
                  alt="Autoclave Carbon 001"
                  className="relative w-full h-full object-contain drop-shadow-2xl scale-125"
                />
                {/* Floating badge */}
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                  className="absolute top-4 right-4 w-20 h-20 border border-white/20 rounded-full flex items-center justify-center"
                >
                  <div className="text-center">
                    <p className="font-bebas text-white text-lg leading-none">100</p>
                    <p className="font-mono text-[7px] text-white/40 tracking-widest">PAIRS</p>
                  </div>
                </motion.div>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ PRODUCTS ═══════════════════════════════════════ */}
      <section id="products" className="bg-white py-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <RevealSection className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="font-bebas text-5xl md:text-7xl tracking-tighter uppercase text-neutral-900 leading-none">
                Latest
                <br />
                <span className="text-bright-orange">Experiments.</span>
              </h2>
            </div>
            {/* Category filters */}
            <div className="flex flex-wrap gap-2">
              {["All", "Running", "Football", "Basketball", "Apparel"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`font-mono text-sm tracking-[0.2em] uppercase px-4 py-2 border transition-all duration-200 ${
                    selectedCategory === cat
                      ? "bg-black text-white border-black"
                      : "border-neutral-200 text-neutral-500 hover:border-neutral-900 hover:text-neutral-900"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </RevealSection>

          {/* Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory + searchQuery}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-neutral-100"
            >
              {filtered.length > 0 ? (
                filtered.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))
              ) : (
                <div className="col-span-full py-24 text-center bg-white">
                  <p className="font-bebas text-4xl text-neutral-300 tracking-widest">
                    No products found
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory("All");
                      setSearchQuery("");
                    }}
                    className="mt-4 font-mono text-xs tracking-[0.2em] uppercase text-bright-orange hover:underline"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ═══════════════════════════════════════ LIFESTYLE ═══════════════════════════════════════ */}
      <section className="relative py-40 bg-neutral-950 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/fox_athlete.png"
            alt="Fox Athlete"
            className="w-full h-full object-cover opacity-65 object-center brightness-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-black/10" />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
          <RevealSection className="max-w-xl">
            <h2 className="font-bebas text-6xl md:text-8xl leading-none tracking-tighter text-white uppercase mb-6">
              Wear the
              <br />
              <span className="text-bright-orange">Obsession.</span>
            </h2>
            <p className="text-white/60 font-montserrat text-lg leading-relaxed mb-8">
              Fox Athletics isn't just footwear — it's an identity. Every stitch, every material, every sole is a statement about what you're capable of achieving.
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setSelectedCategory("Apparel");
                document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="border border-white text-white font-bebas px-10 py-4 text-lg tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-colors duration-300 flex items-center gap-2 cursor-pointer"
            >
              Explore Apparel <ArrowRight size={16} />
            </motion.button>
          </RevealSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════ REVIEWS ═══════════════════════════════════════ */}
      <section className="bg-white py-28">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <RevealSection className="text-center mb-16">
            <h2 className="font-bebas text-5xl md:text-7xl tracking-tighter uppercase text-neutral-900 leading-none">
              The Verdict.
            </h2>
          </RevealSection>

          <div className="grid md:grid-cols-3 gap-px bg-neutral-100">
            {reviews.map((review, i) => (
              <RevealSection
                key={i}
                delay={i * 0.1}
                className={`bg-white p-10 flex flex-col gap-4 transition-all duration-300 ${
                  activeReview === i ? "border-t-2 border-bright-orange" : "border-t-2 border-transparent"
                }`}
              >
                <div className="flex items-center gap-1">
                  {[...Array(review.rating)].map((_, j) => (
                    <Star key={j} size={12} className="fill-neutral-900 text-neutral-900" />
                  ))}
                </div>
                <p className="font-montserrat text-lg text-neutral-600 leading-relaxed italic flex-1">
                  "{review.text}"
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-neutral-100">
                  <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center font-bebas text-sm text-neutral-900">
                    {review.name[0]}
                  </div>
                  <div>
                    <p className="font-bebas text-base tracking-wide text-neutral-900 leading-none">
                      {review.name}
                    </p>
                    <p className="font-mono text-[11px] tracking-[0.2em] text-neutral-400 uppercase">
                      {review.role}
                    </p>
                  </div>
                  {review.verified && (
                    <Award size={12} className="ml-auto text-bright-orange" />
                  )}
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ COMMUNITY ═══════════════════════════════════════ */}
      <section className="bg-neutral-50 py-28">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <RevealSection className="text-center max-w-xl mx-auto mb-16">
            <h2 className="font-bebas text-5xl md:text-7xl tracking-tighter uppercase text-neutral-900 leading-none">
              The Collective.
            </h2>
            <p className="text-neutral-500 font-montserrat text-lg leading-relaxed mt-4">
              Join thousands of athletes who have chosen to push beyond average.
            </p>
          </RevealSection>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <TrendingUp size={24} className="text-bright-orange" />,
                title: "Performance Tracking",
                desc: "Connect with the Fox app to track your speed gains, training loads, and personal bests.",
              },
              {
                icon: <Users size={24} className="text-bright-orange" />,
                title: "Athlete Community",
                desc: "Join our global network of runners, footballers, and ballers. Share achievements and inspire others.",
              },
              {
                icon: <Play size={24} className="text-bright-orange" />,
                title: "Training Programs",
                desc: "Access coach-designed training programs built around Fox footwear technology.",
              },
            ].map((item, i) => (
              <RevealSection key={i} delay={i * 0.1} className="bg-white border border-neutral-100 p-8 group hover:border-neutral-900 transition-colors duration-300">
                <div className="mb-4">{item.icon}</div>
                <h3 className="font-bebas text-2xl text-neutral-900 mb-2">{item.title}</h3>
                <p className="text-neutral-500 font-montserrat text-lg leading-relaxed">{item.desc}</p>
                <div className="mt-6 flex items-center gap-2 font-mono text-xs tracking-[0.2em] uppercase text-neutral-400 group-hover:text-bright-orange transition-colors duration-300">
                  Learn More <ArrowRight size={12} />
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ CTA ═══════════════════════════════════════ */}
      <section className="bg-black py-32 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 text-center">
          <RevealSection>
            <h2 className="font-bebas text-7xl md:text-[10rem] tracking-tighter uppercase text-white leading-none mb-6">
              The Future of <br />
              <span className="text-bright-orange stroke-text">Movement</span>
            </h2>
            <p className="text-white/50 font-montserrat text-lg max-w-xl mx-auto mb-10">
              Join the revolution. The first drop is extremely limited. Be ready.
            </p>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-white text-black font-bebas px-14 py-5 text-2xl uppercase tracking-widest hover:bg-bright-orange hover:text-white transition-colors duration-300 cursor-pointer"
            >
              Join the Waitlist
            </motion.button>
          </RevealSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════ FOOTER ═══════════════════════════════════════ */}
      <footer className="bg-neutral-950 py-16 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-12">
            {/* Brand */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <Fox3DLogo className="w-10 h-10" />
                <span className="font-bebas text-3xl tracking-[0.2em] text-white">Fox Athletics</span>
              </div>
              <p className="font-montserrat text-base text-white/40 max-w-sm leading-relaxed">
                Premium performance footwear and apparel engineered for the obsessed athlete.
              </p>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
              {[
                {
                  heading: "Shop",
                  links: ["Running", "Football", "Basketball", "Apparel"],
                },
                {
                  heading: "Company",
                  links: ["About", "Careers", "Press", "Sustainability"],
                },
                {
                  heading: "Support",
                  links: ["FAQ", "Returns", "Size Guide", "Contact"],
                },
              ].map((col) => (
                <div key={col.heading}>
                  <p className="font-mono text-xs tracking-[0.3em] text-white/40 uppercase mb-4">
                    {col.heading}
                  </p>
                  <ul className="space-y-2">
                    {col.links.map((link) => (
                      <li key={link}>
                        <a
                          href="#"
                          className="font-montserrat text-base text-white/60 hover:text-white transition-colors duration-200"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/5">
            <p className="font-mono text-sm tracking-[0.2em] text-white/30 uppercase">
              © 2026 Fox Athletics. All rights reserved.
            </p>
            <div className="flex gap-6">
              {["Terms", "Privacy", "Cookies"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="font-mono text-sm tracking-[0.2em] text-white/30 hover:text-white/70 uppercase transition-colors duration-200"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}
