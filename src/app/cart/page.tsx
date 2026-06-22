"use client";

import React from "react";
import { useStore } from "@/context/StoreContext";
import Navbar from "@/components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { cart, updateCartQuantity, removeFromCart } = useStore();
  const router = useRouter();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-white grain flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          {/* Header */}
          <div className="mb-12 border-b border-neutral-100 pb-8">
            <h1 className="font-bebas text-5xl md:text-7xl tracking-tighter uppercase text-neutral-900 leading-none">
              Your <br />
              <span className="text-bright-orange">Bag.</span>
            </h1>
            <p className="mt-4 font-mono text-[10px] tracking-[0.2em] text-neutral-400 uppercase">
              {cart.reduce((sum, item) => sum + item.quantity, 0)} Items
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
            {/* Cart Items List */}
            <div className="flex-1">
              <AnimatePresence mode="wait">
                {cart.length > 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-8"
                  >
                    {cart.map((item, i) => (
                      <motion.div
                        key={`${item.product.id}-${item.selectedSize}-${item.selectedColor.name}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex flex-col sm:flex-row gap-6 border border-neutral-100 bg-white p-4"
                      >
                        {/* Image */}
                        <div className="w-full sm:w-48 aspect-square bg-neutral-50 relative group overflow-hidden">
                          <img
                            src={item.selectedColor.image || item.product.image}
                            alt={item.product.name}
                            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>

                        {/* Info */}
                        <div className="flex-1 flex flex-col">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="font-mono text-[10px] text-neutral-400 tracking-[0.2em] uppercase mb-1">
                                {item.product.category}
                              </p>
                              <h3 className="font-bebas text-2xl tracking-wide text-neutral-900">
                                {item.product.name}
                              </h3>
                            </div>
                            <span className="font-bebas text-xl text-neutral-900">
                              ${item.product.price * item.quantity}
                            </span>
                          </div>

                          <div className="mt-4 space-y-2">
                            <p className="text-sm font-mono text-neutral-500 tracking-wider">
                              Size: <span className="text-black font-bold">{item.selectedSize}</span>
                            </p>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-mono text-neutral-500 tracking-wider">Color:</span>
                              <span className="w-4 h-4 rounded-full border border-neutral-200" style={{ backgroundColor: item.selectedColor.hex }} />
                              <span className="text-sm font-mono text-neutral-900">{item.selectedColor.name}</span>
                            </div>
                          </div>

                          {/* Controls */}
                          <div className="mt-auto pt-6 flex items-center justify-between">
                            <div className="flex items-center border border-neutral-200">
                              <button
                                onClick={() => updateCartQuantity(item.product.id, item.selectedSize, item.selectedColor.name, item.quantity - 1)}
                                className="p-2 text-neutral-400 hover:text-black hover:bg-neutral-50 transition-colors"
                              >
                                <Minus size={16} />
                              </button>
                              <span className="w-12 text-center font-mono text-sm font-bold">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateCartQuantity(item.product.id, item.selectedSize, item.selectedColor.name, item.quantity + 1)}
                                className="p-2 text-neutral-400 hover:text-black hover:bg-neutral-50 transition-colors"
                              >
                                <Plus size={16} />
                              </button>
                            </div>

                            <button
                              onClick={() => removeFromCart(item.product.id, item.selectedSize, item.selectedColor.name)}
                              className="text-neutral-400 hover:text-red-500 flex items-center gap-2 font-mono text-xs uppercase tracking-widest transition-colors"
                            >
                              <Trash2 size={14} /> Remove
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty-cart"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="py-24 text-center flex flex-col items-center justify-center border border-neutral-100 bg-neutral-50/50"
                  >
                    <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mb-6">
                      <ShoppingBag className="text-neutral-400" size={24} />
                    </div>
                    <h2 className="font-bebas text-3xl tracking-wide text-neutral-900 mb-4">
                      Your Bag is Empty
                    </h2>
                    <p className="font-montserrat text-sm text-neutral-500 max-w-md mx-auto mb-8">
                      Break limits. Fuel your training with the latest high-performance gear.
                    </p>
                    <Link
                      href="/#products"
                      className="bg-black text-white font-bebas px-8 py-4 text-lg tracking-[0.2em] uppercase hover:bg-bright-orange transition-colors duration-300 flex items-center gap-2"
                    >
                      Start Shopping <ArrowRight size={16} />
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Order Summary */}
            {cart.length > 0 && (
              <div className="lg:w-96">
                <div className="bg-neutral-50 border border-neutral-100 p-8 sticky top-32">
                  <h3 className="font-bebas text-2xl tracking-widest text-neutral-900 mb-6">Order Summary</h3>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between font-mono text-sm tracking-wider">
                      <span className="text-neutral-500">Subtotal</span>
                      <span className="text-neutral-900">${subtotal}</span>
                    </div>
                    <div className="flex justify-between font-mono text-sm tracking-wider">
                      <span className="text-neutral-500">Shipping</span>
                      <span className="text-neutral-900">Calculated at checkout</span>
                    </div>
                    <div className="flex justify-between font-mono text-sm tracking-wider">
                      <span className="text-neutral-500">Taxes</span>
                      <span className="text-neutral-900">Calculated at checkout</span>
                    </div>
                  </div>

                  <div className="border-t border-neutral-200 pt-6 mb-8 flex justify-between items-end">
                    <span className="font-bebas text-xl tracking-widest text-neutral-500">Total</span>
                    <span className="font-bebas text-4xl text-neutral-900">${subtotal}</span>
                  </div>

                  <button
                    onClick={() => router.push('/checkout')}
                    className="w-full bg-black text-white hover:bg-bright-orange font-bebas text-xl py-5 tracking-[0.2em] uppercase flex items-center justify-center space-x-2 transition-colors duration-300 group cursor-pointer"
                  >
                    <span>Secure Checkout</span>
                    <ArrowRight size={20} className="transform group-hover:translate-x-1.5 transition-transform" />
                  </button>
                  
                  <div className="mt-6 flex items-center justify-center gap-4 text-neutral-300">
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em]">Secure Encryption</span>
                    <span className="w-1 h-1 bg-neutral-300 rounded-full" />
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em]">Free Returns</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
