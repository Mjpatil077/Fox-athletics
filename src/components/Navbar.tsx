"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useStore } from "@/context/StoreContext";
import { products } from "@/data/products";
import { Search, Heart, ShoppingBag, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Fox3DLogo from "@/components/Fox3DLogo";

export default function Navbar() {
  const { cart, wishlist, setIsCartOpen, searchQuery, setSearchQuery, selectedCategory, setSelectedCategory } = useStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const useDarkText = isScrolled || pathname === "/wishlist" || pathname === "/cart";

  const lastScrollY = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (isMobileMenuOpen) {
        setIsVisible(true);
        return;
      }

      const currentScrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(currentScrollY > 60);

      const diff = currentScrollY - lastScrollY.current;

      if (currentScrollY <= 60) {
        setIsVisible(true);
      } else {
        if (diff > 0) {
          setIsVisible(false);
          setIsSearchOpen(false);
        } else if (diff < -3) {
          setIsVisible(true);
        }
      }

      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => setIsVisible(true), 300);

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, [isMobileMenuOpen]);

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { name: "HOME", href: "/#products" },
    { name: "BRAND", href: "/brand" },
    { name: "INNOVATION", href: "/innovation" },
    { name: "LIMITED", href: "/limited" },
  ];

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    if (href === "/#products") {
      setSelectedCategory("All"); // Reset category if navigating to collection
      if (pathname === "/") {
        document.getElementById("products")?.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        router.push("/");
        // Note: Let's assume user scrolls naturally when routed back, or we can add a robust scroll handler.
      }
    } else {
      router.push(href);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled
            ? "py-3 bg-white/95 backdrop-blur-md border-b border-neutral-100 shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
            : "py-5 bg-transparent"
        }`}
        style={{
          transform: isVisible ? "translateY(0)" : "translateY(-100%)",
          opacity: isVisible ? 1 : 0,
          pointerEvents: isVisible ? "auto" : "none",
          transition: "transform 0.35s ease, opacity 0.35s ease, background-color 0.3s ease, padding 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
        }}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex items-center justify-between">

          {/* LEFT: Brand */}
          <div className="flex items-center gap-6">
            <Link
              href="/"
              onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}
              className="flex items-center gap-3 group cursor-pointer"
            >
              <Fox3DLogo className="w-8 h-8 transition-transform duration-500 group-hover:scale-110" />
              <span className={`font-bebas text-lg md:text-xl tracking-[0.2em] leading-none transition-colors duration-300 ${useDarkText ? "text-neutral-900" : "text-white"} group-hover:text-bright-orange`}>
                FOX ATHLETICS
              </span>
            </Link>
          </div>

          {/* RIGHT: Nav + Controls */}
          <div className="flex items-center gap-8">

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link, idx) => {
                // For matching active state
                const isActive = link.href === "/#products" ? (pathname === "/" && selectedCategory === "All") : pathname === link.href;

                return (
                  <button
                    key={link.name}
                    onClick={() => handleNavClick(link.href)}
                    className={`font-bebas text-xs tracking-[0.25em] transition-all duration-200 cursor-pointer relative py-1.5 uppercase flex items-baseline gap-1 ${
                      isActive
                        ? useDarkText ? "text-neutral-900" : "text-white"
                        : useDarkText ? "text-neutral-400 hover:text-neutral-900" : "text-white/50 hover:text-white"
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-bright-orange"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Controls */}
            <div className={`flex items-center gap-4 pl-6 border-l transition-colors duration-300 ${useDarkText ? "border-neutral-100" : "border-white/10"}`}>

              {/* Search */}
              <div className="relative flex items-center">
                <AnimatePresence>
                  {isSearchOpen && (
                    <motion.div
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 200, opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="relative flex items-center mr-2"
                    >
                      <input
                        type="text"
                        placeholder="Search gear..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            const match = products.find(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
                            if (match) {
                              router.push(`/product/${match.id}`);
                              setSearchQuery('');
                              setIsSearchOpen(false);
                            } else {
                              // If no specific match, just close and let homepage handle the filter or navigate to home
                              if (pathname !== '/') router.push('/#products');
                              setIsSearchOpen(false);
                            }
                          }
                        }}
                        className={`w-full border-b bg-transparent px-2 py-1.5 text-sm focus:outline-none font-mono tracking-widest ${useDarkText ? 'border-neutral-900 text-neutral-900 placeholder:text-neutral-500' : 'border-white text-white placeholder:text-white/50'}`}
                      />

                      {/* Dropdown Results */}
                      {searchQuery && (
                        <div className="absolute top-full right-0 mt-4 w-72 bg-white border border-neutral-100 shadow-2xl flex flex-col z-50 overflow-hidden">
                          {products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5).map(p => (
                            <button
                              key={p.id}
                              onClick={() => {
                                router.push(`/product/${p.id}`);
                                setSearchQuery('');
                                setIsSearchOpen(false);
                              }}
                              className="flex items-center gap-3 p-3 text-left hover:bg-neutral-50 transition-colors border-b border-neutral-100 last:border-0 cursor-pointer"
                            >
                              <img src={p.image} alt={p.name} className="w-12 h-12 object-contain bg-neutral-100 p-1" />
                              <div className="flex flex-col">
                                <span className="font-bebas text-lg tracking-wide text-neutral-900 leading-none">{p.name}</span>
                                <span className="font-mono text-[9px] text-neutral-500 tracking-widest uppercase mt-1">{p.category} - ${p.price}</span>
                              </div>
                            </button>
                          ))}
                          {products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                            <div className="p-4 text-center font-mono text-xs text-neutral-500 uppercase tracking-widest">
                              No matches found
                            </div>
                          )}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className={`transition-colors cursor-pointer p-1.5 ${useDarkText ? "text-neutral-400 hover:text-neutral-900" : "text-white/50 hover:text-white"}`}
                  aria-label="Search"
                >
                  <Search size={16} strokeWidth={1.5} />
                </button>
              </div>

              {/* Wishlist */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  router.push('/wishlist');
                }}
                className={`relative transition-colors p-1.5 cursor-pointer ${useDarkText ? "text-neutral-400 hover:text-neutral-900" : "text-white/50 hover:text-white"}`}
                aria-label="Wishlist"
              >
                <Heart size={16} strokeWidth={1.5} className={wishlist.length > 0 ? "fill-bright-orange text-bright-orange" : ""} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-bright-orange text-white text-[7px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center font-mono">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Cart */}
              <button
                onClick={() => router.push('/cart')}
                className={`relative transition-colors p-1.5 cursor-pointer ${useDarkText ? "text-neutral-400 hover:text-neutral-900" : "text-white/50 hover:text-white"}`}
                aria-label="Cart"
              >
                <ShoppingBag size={16} strokeWidth={1.5} />
                {totalCartItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-neutral-900 text-white text-[7px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center font-mono">
                    {totalCartItems}
                  </span>
                )}
              </button>

              {/* Mobile menu */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`md:hidden transition-colors cursor-pointer p-1.5 ${useDarkText ? "text-neutral-400 hover:text-neutral-900" : "text-white/50 hover:text-white"}`}
                aria-label="Menu"
              >
                {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 pt-24 bg-white flex flex-col items-center justify-start gap-4 md:hidden"
          >
            {navLinks.map((link, i) => {
              const isActive = link.href === "/#products" ? (pathname === "/" && selectedCategory === "All") : pathname === link.href;

              return (
                <motion.button
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleNavClick(link.href)}
                  className={`font-bebas text-4xl tracking-[0.2em] transition-all ${
                    isActive ? "text-bright-orange" : "text-neutral-900"
                  }`}
                >
                  {link.name}
                </motion.button>
              );
            })}
            <div className="mt-8 flex gap-6">
              <button onClick={() => { setIsMobileMenuOpen(false); router.push('/cart'); }} className="flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-neutral-500 uppercase">
                <ShoppingBag size={14} /> Cart ({totalCartItems})
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
