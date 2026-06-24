"use client";

import React from "react";
import { useStore } from "@/context/StoreContext";
import { X, Plus, Minus, Trash2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cart, updateCartQuantity, removeFromCart } = useStore();
  const router = useRouter();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black z-50 cursor-pointer"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-neutral-950 border-l border-neutral-950 z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="p-6 border-b border-neutral-900 flex items-center justify-between">
              <h2 className="font-bebas text-2xl tracking-widest text-white">
                YOUR BAG ({cart.reduce((sum, item) => sum + item.quantity, 0)})
              </h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-neutral-400 hover:text-white p-1 hover:bg-neutral-900 transition-all cursor-pointer"
              >
                <X size={24} />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <h3 className="font-bebas text-3xl tracking-widest text-neutral-500">
                    YOUR BAG IS EMPTY.
                  </h3>
                  <p className="text-neutral-400 text-base max-w-xs font-montserrat">
                    Break limits. Fuel your training with the latest high-performance gear.
                  </p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="bg-white text-black font-bebas px-6 py-3 tracking-widest text-base hover:bg-neon-green hover:text-black transition-all cursor-pointer"
                  >
                    START SHOPPING
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedSize}-${item.selectedColor.name}`}
                    className="flex space-x-4 border-b border-neutral-900 pb-6 last:border-0"
                  >
                    {/* Image */}
                    <div className="w-24 h-24 bg-neutral-900 flex-shrink-0 border border-neutral-800 relative group overflow-hidden">
                      <img
                        src={item.selectedColor.image || item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-contain p-2 transform group-hover:scale-110 transition-transform duration-350"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-bebas text-lg tracking-wider text-white">
                            {item.product.name}
                          </h4>
                          <span className="font-bebas text-lg text-white ml-2">
                            ${item.product.price * item.quantity}
                          </span>
                        </div>
                        <p className="text-sm text-neutral-400 font-montserrat uppercase tracking-wider mt-0.5">
                          Size: {item.selectedSize} | Color: {item.selectedColor.name}
                        </p>
                      </div>

                      {/* Controls */}
                      <div className="flex items-center justify-between mt-4">
                        {/* Qty selectors */}
                        <div className="flex items-center border border-neutral-800 bg-neutral-900">
                          <button
                            onClick={() =>
                              updateCartQuantity(
                                item.product.id,
                                item.selectedSize,
                                item.selectedColor.name,
                                item.quantity - 1
                              )
                            }
                            className="p-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="px-3 text-sm font-semibold font-mono text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateCartQuantity(
                                item.product.id,
                                item.selectedSize,
                                item.selectedColor.name,
                                item.quantity + 1
                              )
                            }
                            className="p-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() =>
                            removeFromCart(
                              item.product.id,
                              item.selectedSize,
                              item.selectedColor.name
                            )
                          }
                          className="text-neutral-500 hover:text-red-500 transition-colors p-1.5 cursor-pointer"
                          aria-label="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary */}
            {cart.length > 0 && (
              <div className="p-6 bg-neutral-950 border-t border-neutral-900 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400 font-montserrat text-base tracking-wider uppercase">
                    Subtotal
                  </span>
                  <span className="font-bebas text-2xl text-white tracking-wider">
                    ${subtotal}
                  </span>
                </div>
                <p className="text-neutral-500 text-xs uppercase font-montserrat tracking-widest">
                  Shipping and taxes calculated at checkout.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    router.push('/checkout');
                  }}
                  className="w-full bg-white hover:bg-neon-green text-black font-bebas text-lg py-4 tracking-widest flex items-center justify-center space-x-2 transition-all group cursor-pointer"
                >
                  <span>SECURE CHECKOUT</span>
                  <ArrowRight size={18} className="transform group-hover:translate-x-1.5 transition-transform" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
