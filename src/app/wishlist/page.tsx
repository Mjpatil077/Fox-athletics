"use client";

import React from "react";
import { useStore } from "@/context/StoreContext";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function WishlistPage() {
  const { wishlist } = useStore();

  return (
    <div className="min-h-screen bg-white grain flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          {/* Header */}
          <div className="mb-12 border-b border-neutral-100 pb-8">
            <h1 className="font-bebas text-5xl md:text-7xl tracking-tighter uppercase text-neutral-900 leading-none">
              Your <br />
              <span className="text-bright-orange">Wishlist.</span>
            </h1>
            <p className="mt-4 font-mono text-[10px] tracking-[0.2em] text-neutral-400 uppercase">
              {wishlist.length} {wishlist.length === 1 ? "Item" : "Items"} Saved
            </p>
          </div>

          {/* Grid */}
          <AnimatePresence mode="wait">
            {wishlist.length > 0 ? (
              <motion.div
                key="wishlist-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-neutral-100"
              >
                {wishlist.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty-state"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-24 text-center flex flex-col items-center justify-center border border-neutral-100 bg-neutral-50/50"
              >
                <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mb-6">
                  <span className="text-2xl">🖤</span>
                </div>
                <h2 className="font-bebas text-3xl tracking-wide text-neutral-900 mb-4">
                  Your Wishlist is Empty
                </h2>
                <p className="font-montserrat text-sm text-neutral-500 max-w-md mx-auto mb-8">
                  Save your favorite gear and limited drops here to keep track of them for later.
                </p>
                <Link
                  href="/#products"
                  className="bg-black text-white font-bebas px-8 py-4 text-lg tracking-[0.2em] uppercase hover:bg-bright-orange transition-colors duration-300 flex items-center gap-2"
                >
                  Explore Collection <ArrowRight size={16} />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
