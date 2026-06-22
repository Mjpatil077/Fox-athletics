"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useStore } from "@/context/StoreContext";
import { products, Product } from "@/data/products";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import Fox3DLogo from "@/components/Fox3DLogo";
import {
  Heart,
  ShoppingBag,
  Star,
  ArrowLeft,
  Truck,
  RotateCcw,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { motion } from "framer-motion";
import ProductInteractiveViewer from "@/components/ProductInteractiveViewer";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  
  const { addToCart, toggleWishlist, isInWishlist } = useStore();

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState<any>(null);
  const [activeImage, setActiveImage] = useState("");

  // Accordion toggle states
  const [activeAccordion, setActiveAccordion] = useState<string | null>("description");

  useEffect(() => {
    const foundProduct = products.find((p) => p.id === id);
    if (foundProduct) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProduct(foundProduct);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedSize(foundProduct.sizes[0] || "");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedColor(foundProduct.colors[0] || null);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveImage(foundProduct.colors[0]?.image || foundProduct.image);
    }
  }, [id]);

  useEffect(() => {
    if (selectedColor) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveImage(selectedColor.image);
    }
  }, [selectedColor]);

  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center space-y-4">
        <h2 className="font-bebas text-4xl text-neutral-500 tracking-wider">PRODUCT NOT FOUND</h2>
        <p className="text-neutral-600 text-sm font-montserrat max-w-xs">
          The athletic gear you are looking for does not exist or has been discontinued.
        </p>
        <button
          onClick={() => router.push("/")}
          className="bg-white text-black font-bebas px-6 py-3 tracking-widest text-sm hover:bg-neon-green transition-all"
        >
          BACK TO HOME
        </button>
      </div>
    );
  }

  // Related products (from same category, excluding current)
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    addToCart(product, selectedSize, selectedColor);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    addToCart(product, selectedSize, selectedColor);
    // Instant trigger checkout
    router.push("/");
    setTimeout(() => {
      // Small trigger delay to let cart drawer mount on homepage
      const cartOpenTrigger = localStorage.getItem("fox_cart");
      if (cartOpenTrigger) {
        alert("Buy Now triggered! Redirecting to checkout.");
      }
    }, 200);
  };

  const toggleAccordion = (section: string) => {
    setActiveAccordion(activeAccordion === section ? null : section);
  };

  return (
    <>
      <Navbar />
      <CartDrawer />

      <main className="min-h-screen bg-black pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Back button */}
          <button
            onClick={() => router.push("/")}
            className="flex items-center space-x-2 text-neutral-400 hover:text-white font-bebas tracking-widest text-sm mb-8 transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span>BACK TO GALLERY</span>
          </button>

          {/* Product Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left side: Premium Image Showcase & Magnifier with Damping Zoom */}
            <div className="lg:col-span-7 space-y-6">
              <div className="relative bg-neutral-900 border border-neutral-800 aspect-square w-full flex items-center justify-center overflow-hidden">
                <ProductInteractiveViewer 
                  imageSrc={activeImage}
                  colorHex={selectedColor?.hex}
                  isLimited={product.isLimited}
                  stockLeft={product.stockLeft}
                />
              </div>

              {/* Angles Thumbnails list */}
              <div className="flex gap-4">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => {
                      setSelectedColor(c);
                      setActiveImage(c.image);
                    }}
                    className={`w-24 h-24 bg-neutral-900 border flex items-center justify-center p-2 cursor-pointer transition-all hover:border-neutral-500 ${
                      activeImage === c.image ? "border-white" : "border-neutral-800"
                    }`}
                  >
                    <img src={c.image} alt={c.name} className="max-h-full max-w-full object-contain" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right side: Detailed descriptions & Purchasing options */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
              <div className="space-y-6">
                
                {/* Titles */}
                <div>
                  <span className="text-xs font-montserrat uppercase tracking-widest text-neutral-400 flex items-center gap-1.5 select-none">
                    <Fox3DLogo className="w-5 h-5" />
                    <span>{product.category} Footwear</span>
                  </span>
                  
                  <h1 className="font-bebas text-5xl md:text-6xl tracking-wider text-white uppercase mt-1 leading-none">
                    {product.name}
                  </h1>

                  <div className="flex items-center space-x-3 mt-3">
                    <div className="flex items-center text-neon-green">
                      <Star size={16} className="fill-neon-green" />
                      <span className="text-sm font-mono font-bold ml-1">{product.rating}</span>
                    </div>
                    <span className="text-xs text-neutral-500 font-montserrat">
                      ({product.reviewsCount} Verified Buyer Reviews)
                    </span>
                  </div>
                </div>

                {/* Price tag */}
                <div className="font-bebas text-3xl text-white tracking-widest">
                  ${product.price}
                </div>

                <hr className="border-neutral-900" />

                {/* Colors Picker */}
                {product.colors.length > 1 && (
                  <div className="space-y-3">
                    <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest block">
                      COLOR EDITION: <span className="text-white">{selectedColor?.name}</span>
                    </span>
                    <div className="flex items-center space-x-3">
                      {product.colors.map((c) => (
                        <button
                          key={c.name}
                          onClick={() => setSelectedColor(c)}
                          className={`w-10 h-10 rounded-full border-2 transition-all cursor-pointer flex items-center justify-center ${
                            selectedColor?.name === c.name
                              ? "border-white scale-110"
                              : "border-transparent hover:scale-105"
                          }`}
                        >
                          <span
                            className="w-7 h-7 rounded-full block"
                            style={{ backgroundColor: c.hex }}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sizing Picker */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs font-mono text-neutral-400 uppercase tracking-widest">
                    <span>SELECT SIZE (US)</span>
                    <span className="text-neutral-500 font-montserrat text-[10px]">True to size fit</span>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`py-3 text-sm font-mono border text-center transition-all cursor-pointer ${
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

                {/* CTAs */}
                <div className="flex flex-col space-y-3 pt-4">
                  <div className="flex space-x-3">
                    <button
                      onClick={handleAddToCart}
                      className="flex-1 bg-white hover:bg-neon-green text-black font-bebas text-lg py-4 tracking-widest flex items-center justify-center space-x-2 transition-all cursor-pointer"
                    >
                      <ShoppingBag size={18} />
                      <span>ADD TO BAG</span>
                    </button>
                    
                    <button
                      onClick={() => toggleWishlist(product)}
                      className={`p-4 border transition-all cursor-pointer ${
                        isInWishlist(product.id)
                          ? "border-neon-green text-neon-green hover:bg-neon-green hover:text-black"
                          : "border-neutral-800 text-neutral-400 hover:border-neutral-500 hover:text-white"
                      }`}
                      aria-label="Add to wishlist"
                    >
                      <Heart size={20} className={isInWishlist(product.id) ? "fill-current" : ""} />
                    </button>
                  </div>

                  <button
                    onClick={handleBuyNow}
                    className="w-full bg-neutral-900 hover:bg-neutral-800 text-white font-bebas text-lg py-4 tracking-widest transition-all cursor-pointer border border-neutral-800"
                  >
                    BUY IT NOW
                  </button>
                </div>

                {/* Shipping & Returns Quick details */}
                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-neutral-900 font-mono text-[10px] text-neutral-500">
                  <div className="flex items-center space-x-2">
                    <Truck size={14} className="text-neon-green" />
                    <span>FREE EXPEDITED SHIPPING</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RotateCcw size={14} className="text-neon-green" />
                    <span>30-DAY RISK-FREE RETURNS</span>
                  </div>
                </div>

              </div>

              {/* Specifications & Details Accordion panels */}
              <div className="border border-neutral-900 bg-neutral-950 p-4 space-y-4">
                
                {/* Accordion 1: Description */}
                <div className="border-b border-neutral-900 pb-4">
                  <button
                    onClick={() => toggleAccordion("description")}
                    className="w-full flex justify-between items-center text-left font-bebas text-lg text-white tracking-wider cursor-pointer"
                  >
                    <span>PRODUCT SYNOPSIS</span>
                    {activeAccordion === "description" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  {activeAccordion === "description" && (
                    <p className="text-xs text-neutral-400 font-montserrat leading-relaxed mt-3">
                      {product.description}
                    </p>
                  )}
                </div>

                {/* Accordion 2: Tech Specs */}
                <div className="border-b border-neutral-900 pb-4 last:border-0 last:pb-0">
                  <button
                    onClick={() => toggleAccordion("specs")}
                    className="w-full flex justify-between items-center text-left font-bebas text-lg text-white tracking-wider cursor-pointer"
                  >
                    <span>TECHNICAL SPECIFICATIONS</span>
                    {activeAccordion === "specs" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  {activeAccordion === "specs" && (
                    <div className="grid grid-cols-2 gap-3 mt-3 font-montserrat text-xs">
                      {product.techSpecs.map((spec) => (
                        <div key={spec.label} className="border-b border-neutral-900 pb-1">
                          <span className="text-neutral-500 uppercase text-[9px] block tracking-wide">{spec.label}</span>
                          <span className="text-neutral-300 font-semibold">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>

            </div>

          </div>

          {/* Related items section */}
          {relatedProducts.length > 0 && (
            <section className="mt-24 pt-12 border-t border-neutral-900">
              <span className="text-neon-green font-mono text-xs tracking-widest font-semibold block mb-2">
                COMPLETE YOUR SET
              </span>
              <h2 className="font-bebas text-3xl md:text-4xl text-white uppercase tracking-wider mb-8">
                RELATED EQUIPMENT
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => router.push(`/product/${p.id}`)}
                    className="bg-neutral-950 border border-neutral-900 group p-4 flex flex-col justify-between overflow-hidden shadow-lg transition-all duration-300 cursor-pointer hover:border-neutral-500"
                  >
                    <div className="h-48 bg-neutral-900/40 p-4 flex items-center justify-center overflow-hidden relative">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="max-h-full max-w-full object-contain transform group-hover:scale-110 transition-transform duration-500 p-2"
                      />
                    </div>
                    <div className="mt-4 space-y-1">
                      <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest">{p.category}</span>
                      <h4 className="font-bebas text-lg text-white tracking-wide uppercase line-clamp-1">{p.name}</h4>
                      <div className="flex justify-between items-center mt-1">
                        <span className="font-bebas text-md text-white">${p.price}</span>
                        <span className="text-xs text-neon-green font-bold flex items-center">
                          <Star size={10} className="fill-current mr-0.5" /> {p.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>
      </main>
    </>
  );
}
