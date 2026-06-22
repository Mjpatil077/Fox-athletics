"use client";

import React, { useState, useRef } from "react";
import { useStore } from "@/context/StoreContext";
import { Product } from "@/data/products";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Heart, ShoppingBag, Eye, Star } from "lucide-react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const QuickViewModal = dynamic(() => import("@/components/QuickViewModal"), { ssr: false });

export default function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [hoveredSize, setHoveredSize] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const router = useRouter();

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.07 }}
        className="group relative bg-white border border-neutral-100 flex flex-col overflow-hidden"
      >
        {/* Image */}
        <div 
          className="relative aspect-square bg-neutral-50 overflow-hidden cursor-pointer"
          onClick={() => {
            if (product.isLimited) {
              router.push('/limited');
            }
          }}
        >
          {product.isLimited && (
            <div className="absolute top-3 left-3 z-10 bg-black text-white font-mono text-[9px] tracking-[0.2em] px-2 py-1 uppercase">
              Limited
            </div>
          )}
          {product.stockLeft && (
            <div className="absolute top-3 right-3 z-10 bg-bright-orange text-white font-mono text-[9px] tracking-[0.15em] px-2 py-1 uppercase">
              {product.stockLeft} left
            </div>
          )}
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-700"
          />
          {/* Quick view overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100">
            <button
              onClick={() => setQuickViewProduct(product)}
              className="bg-black text-white font-mono text-[10px] tracking-[0.2em] uppercase px-5 py-2.5 flex items-center gap-2 hover:bg-bright-orange transition-colors duration-200 cursor-pointer"
            >
              <Eye size={12} /> Quick View
            </button>
          </div>
          {/* Wishlist */}
          <button
            onClick={() => toggleWishlist(product)}
            className="absolute bottom-3 right-3 w-8 h-8 flex items-center justify-center bg-white border border-neutral-200 opacity-0 group-hover:opacity-100 transition-opacity hover:border-neutral-900"
            aria-label="Add to wishlist"
          >
            <Heart
              size={14}
              className={isInWishlist(product.id) ? "fill-bright-orange text-bright-orange" : "text-neutral-400"}
            />
          </button>
        </div>

        {/* Info */}
        <div className="p-4 flex flex-col gap-2 flex-1">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-mono text-[9px] text-neutral-400 tracking-[0.25em] uppercase mb-1">
                {product.category}
              </p>
              <h3 className="font-bebas text-lg leading-none tracking-wide text-neutral-900">
                {product.name}
              </h3>
            </div>
            <div className="text-right">
              <p className="font-bebas text-xl text-neutral-900">
                {product.isLimited ? "LIMITED" : `$${product.price}`}
              </p>
            </div>
          </div>

          {/* Stars */}
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={10}
                className={i < Math.floor(product.rating) ? "fill-neutral-900 text-neutral-900" : "text-neutral-200"}
              />
            ))}
            <span className="font-mono text-[9px] text-neutral-400 ml-1">
              ({product.reviewsCount})
            </span>
          </div>

          {/* Sizes quick-select */}
          <div className="flex flex-wrap gap-1 mt-auto pt-2">
            {product.sizes.slice(0, 5).map((size) => (
              <button
                key={size}
                onMouseEnter={() => setHoveredSize(size)}
                onMouseLeave={() => setHoveredSize(null)}
                onClick={() => addToCart(product, size)}
                className={`font-mono text-[9px] px-2 py-1 border transition-colors duration-150 ${
                  hoveredSize === size
                    ? "bg-black text-white border-black"
                    : "border-neutral-200 text-neutral-500 hover:border-neutral-900"
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          {/* Add to Cart */}
          <button
            onClick={() => addToCart(product, product.sizes[0])}
            className="mt-2 w-full bg-neutral-900 text-white font-bebas tracking-[0.2em] text-sm py-3 hover:bg-bright-orange transition-colors duration-300 flex items-center justify-center gap-2 cursor-pointer"
          >
            <ShoppingBag size={14} /> Add to Cart
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {quickViewProduct && (
          <QuickViewModal
            product={quickViewProduct}
            onClose={() => setQuickViewProduct(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
