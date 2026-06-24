"use client";

import React, { useState, useEffect } from "react";
import { Product } from "@/data/products";
import { useStore } from "@/context/StoreContext";
import { X, Heart, ShoppingBag, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import React360Viewer from "react-360-view";
import ProductInteractiveViewer from "@/components/ProductInteractiveViewer";
import Fox3DLogo from "@/components/Fox3DLogo";

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();

  const [selectedSize, setSelectedSize] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedColor, setSelectedColor] = useState<any>(null);

  // Set default state when product changes
  // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/rules-of-hooks
  useEffect(() => {
    if (product) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedSize(product.sizes[0] || "");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedColor(product.colors[0] || null);
    }
  }, [product]);

  if (!product) return null;

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    addToCart(product, selectedSize, selectedColor);
    onClose();
  };

  const imageSrc = selectedColor?.image || product.image;
  const isLight = imageSrc.includes("aethelion_elite") || imageSrc.includes("limited_shoe");

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Overlay backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 cursor-pointer"
        />

        {/* Modal content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 30, stiffness: 180 }}
          className="relative w-full max-w-4xl bg-neutral-900 border border-neutral-800 overflow-hidden flex flex-col md:flex-row shadow-2xl z-10"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 text-neutral-400 hover:text-white p-2 hover:bg-neutral-900 transition-all cursor-pointer"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          {/* Left: Product Image Showcase with Smooth Click-to-Freeze Zoom */}
          <div className={`w-full md:w-1/2 flex items-center justify-center relative overflow-hidden ${isLight ? 'bg-white' : 'bg-neutral-950'}`}>
            {product.gallery360 && product.gallery360.length > 1 ? (
              <React360Viewer
                amount={product.gallery360.length}
                imagePath={(product.gallery360[0] || "").replace(/\.png$/, "").replace(/\.jpg$/, "")}
                autoplay={true}
                speed={0.3}
                className="w-full h-full"
              />
            ) : (
              <ProductInteractiveViewer
                imageSrc={selectedColor?.image || product.image}
                colorHex={selectedColor?.hex}
                isLimited={product.isLimited}
                stockLeft={product.stockLeft}
                zoomScale={1.8}
              />
            )}
          </div>

          {/* Right: Product details */}
          <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-between overflow-y-auto max-h-[90vh] md:max-h-none">
            <div className="space-y-6">
              <div>
                <span className="text-sm font-montserrat uppercase tracking-widest text-neutral-400 flex items-center gap-1.5 select-none">
                  <Fox3DLogo className="w-5 h-5" />
                  <span>{product.category} Footwear</span>
                </span>
                <h3 className="font-bebas text-4xl md:text-5xl tracking-wider text-white uppercase mt-1">
                  {product.name}
                </h3>
                <div className="flex items-center space-x-2 mt-2">
                  <div className="flex items-center text-neon-green">
                    <Star size={14} className="fill-neon-green" />
                    <span className="text-sm font-mono font-bold ml-1">{product.rating}</span>
                  </div>
                  <span className="text-sm text-neutral-500 font-montserrat">
                    ({product.reviewsCount} reviews)
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="text-3xl font-bebas text-white tracking-widest">
                ${product.price}
              </div>

              {/* Description */}
              <p className="text-base text-neutral-400 font-montserrat leading-relaxed">
                {product.description}
              </p>

              {/* Colors */}
              {product.colors.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-montserrat uppercase tracking-widest text-neutral-400">
                    SELECT COLOR: {selectedColor?.name}
                  </span>
                  <div className="flex items-center space-x-3">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c)}
                        className={`w-8 h-8 rounded-full border-2 transition-all cursor-pointer flex items-center justify-center ${
                          selectedColor?.name === c.name
                            ? "border-white scale-110"
                            : "border-transparent hover:scale-105"
                        }`}
                      >
                        <span
                          className="w-6 h-6 rounded-full block"
                          style={{ backgroundColor: c.hex }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes */}
              {product.sizes.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-montserrat uppercase tracking-widest text-neutral-400">
                    SELECT SIZE
                  </span>
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`py-2 text-sm font-mono border text-center transition-all cursor-pointer ${
                          selectedSize === s
                            ? "bg-white text-black border-white"
                            : "border-neutral-800 text-neutral-400 hover:border-neutral-500 hover:text-white"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* CTAs */}
            <div className="flex items-center space-x-4 mt-8 pt-6 border-t border-neutral-900">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-white hover:bg-neon-green text-black font-bebas text-xl py-3.5 tracking-widest flex items-center justify-center space-x-2 transition-all cursor-pointer"
              >
                <ShoppingBag size={18} />
                <span>ADD TO BAG</span>
              </button>

              <button
                onClick={() => toggleWishlist(product)}
                className={`p-3.5 border transition-all cursor-pointer ${
                  isInWishlist(product.id)
                    ? "border-neon-green text-neon-green hover:bg-neon-green hover:text-black"
                    : "border-neutral-800 text-neutral-400 hover:border-neutral-500 hover:text-white"
                }`}
                aria-label="Add to wishlist"
              >
                <Heart size={18} className={isInWishlist(product.id) ? "fill-current" : ""} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
