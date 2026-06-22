"use client";

import React, { useState, useEffect } from "react";
import { useStore } from "@/context/StoreContext";
import Navbar from "@/components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ShoppingBag, X, CheckCircle, CreditCard, Landmark, Smartphone } from "lucide-react";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";

export default function CheckoutPage() {
  const { cart, clearCart, orderCount, incrementOrderCount } = useStore();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const taxes = subtotal * 0.08;
  const total = subtotal + taxes;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.zipCode) newErrors.zipCode = "Zip code is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
      }
      
      const newOrderNum = `FOX-${Math.floor(Math.random() * 900000) + 100000}`;
      setOrderNumber(newOrderNum);
      
      // Trigger success animation
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#39ff14", "#00e5ff", "#ff5e00", "#ffffff"],
        zIndex: 10000,
      });

      setShowSuccessModal(true);
      incrementOrderCount();
      clearCart();
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-white grain flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          
          <div className="mb-12 border-b border-neutral-100 pb-8">
            <h1 className="font-bebas text-5xl md:text-7xl tracking-tighter uppercase text-neutral-900 leading-none">
              Secure <br />
              <span className="text-bright-orange">Checkout.</span>
            </h1>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
            
            {/* Left side: Forms */}
            <div className="flex-1 space-y-12">
              
              {/* Shipping Address */}
              <section>
                <h2 className="font-bebas text-2xl tracking-widest text-neutral-900 mb-6 flex items-center gap-2">
                  <span className="bg-black text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
                  Shipping Information
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">First Name *</label>
                    <input 
                      type="text" name="firstName" value={formData.firstName} onChange={handleInputChange}
                      className={`w-full border p-3 font-mono text-sm focus:outline-none transition-colors ${errors.firstName ? 'border-red-500 bg-red-50' : 'border-neutral-200 focus:border-black'}`}
                    />
                    {errors.firstName && <p className="text-red-500 text-xs font-mono">{errors.firstName}</p>}
                  </div>
                  <div className="space-y-1">
                    <label className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">Last Name *</label>
                    <input 
                      type="text" name="lastName" value={formData.lastName} onChange={handleInputChange}
                      className={`w-full border p-3 font-mono text-sm focus:outline-none transition-colors ${errors.lastName ? 'border-red-500 bg-red-50' : 'border-neutral-200 focus:border-black'}`}
                    />
                    {errors.lastName && <p className="text-red-500 text-xs font-mono">{errors.lastName}</p>}
                  </div>
                  <div className="col-span-2 space-y-1">
                    <label className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">Email Address *</label>
                    <input 
                      type="email" name="email" value={formData.email} onChange={handleInputChange}
                      className={`w-full border p-3 font-mono text-sm focus:outline-none transition-colors ${errors.email ? 'border-red-500 bg-red-50' : 'border-neutral-200 focus:border-black'}`}
                    />
                    {errors.email && <p className="text-red-500 text-xs font-mono">{errors.email}</p>}
                  </div>
                  <div className="col-span-2 space-y-1">
                    <label className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">Street Address *</label>
                    <input 
                      type="text" name="address" value={formData.address} onChange={handleInputChange}
                      className={`w-full border p-3 font-mono text-sm focus:outline-none transition-colors ${errors.address ? 'border-red-500 bg-red-50' : 'border-neutral-200 focus:border-black'}`}
                    />
                    {errors.address && <p className="text-red-500 text-xs font-mono">{errors.address}</p>}
                  </div>
                  <div className="space-y-1">
                    <label className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">City *</label>
                    <input 
                      type="text" name="city" value={formData.city} onChange={handleInputChange}
                      className={`w-full border p-3 font-mono text-sm focus:outline-none transition-colors ${errors.city ? 'border-red-500 bg-red-50' : 'border-neutral-200 focus:border-black'}`}
                    />
                    {errors.city && <p className="text-red-500 text-xs font-mono">{errors.city}</p>}
                  </div>
                  <div className="space-y-1">
                    <label className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">State</label>
                    <input 
                      type="text" name="state" value={formData.state} onChange={handleInputChange}
                      className="w-full border border-neutral-200 p-3 font-mono text-sm focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">ZIP Code *</label>
                    <input 
                      type="text" name="zipCode" value={formData.zipCode} onChange={handleInputChange}
                      className={`w-full border p-3 font-mono text-sm focus:outline-none transition-colors ${errors.zipCode ? 'border-red-500 bg-red-50' : 'border-neutral-200 focus:border-black'}`}
                    />
                    {errors.zipCode && <p className="text-red-500 text-xs font-mono">{errors.zipCode}</p>}
                  </div>
                </div>
              </section>

              {/* Payment Info Removed Temporarily */}

            </div>

            {/* Right side: Order Summary */}
            <div className="lg:w-96">
              <div className="bg-neutral-50 border border-neutral-100 p-8 sticky top-32">
                <h3 className="font-bebas text-2xl tracking-widest text-neutral-900 mb-6 border-b border-neutral-200 pb-4">In Your Bag</h3>
                
                <div className="space-y-6 mb-8 max-h-[40vh] overflow-y-auto pr-2 no-scrollbar">
                  {cart.length === 0 ? (
                    <p className="font-mono text-xs text-neutral-400 uppercase tracking-widest text-center py-4">Bag is empty</p>
                  ) : (
                    cart.map((item) => (
                      <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor.name}`} className="flex gap-4">
                        <div className="w-16 h-16 bg-white border border-neutral-100 p-1 flex-shrink-0">
                          <img src={item.selectedColor.image || item.product.image} className="w-full h-full object-contain" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bebas tracking-wide text-neutral-900 leading-none">{item.product.name}</h4>
                          <p className="font-mono text-[9px] text-neutral-500 uppercase mt-1 tracking-wider">
                            Size: {item.selectedSize} | Qty: {item.quantity}
                          </p>
                          <p className="font-mono text-[10px] text-black font-bold mt-1">${item.product.price * item.quantity}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="space-y-3 mb-6 border-t border-neutral-200 pt-6">
                  <div className="flex justify-between font-mono text-xs tracking-wider">
                    <span className="text-neutral-500">Subtotal</span>
                    <span className="text-neutral-900">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-mono text-xs tracking-wider">
                    <span className="text-neutral-500">Taxes & Fees</span>
                    <span className="text-neutral-900">${taxes.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-mono text-xs tracking-wider">
                    <span className="text-neutral-500">Shipping</span>
                    <span className="text-neon-green font-bold">FREE</span>
                  </div>
                </div>

                <div className="border-t border-neutral-200 pt-6 mb-8 flex justify-between items-end">
                  <span className="font-bebas text-xl tracking-widest text-neutral-500">Total</span>
                  <span className="font-bebas text-4xl text-neutral-900">${total.toFixed(2)}</span>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  disabled={cart.length === 0}
                  className="w-full bg-black text-white hover:bg-bright-orange font-bebas text-xl py-5 tracking-[0.2em] uppercase flex items-center justify-center space-x-2 transition-colors duration-300 group cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>Place Order</span>
                  <ArrowRight size={20} className="transform group-hover:translate-x-1.5 transition-transform" />
                </button>
                
                <p className="text-center font-mono text-[9px] uppercase tracking-widest text-neutral-400 mt-4">
                  Fake checkout for demo purposes
                </p>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-neutral-950/80 backdrop-blur-sm"
              onClick={() => {}} // Prevent clicking outside to close for demo
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-neutral-900 border border-neutral-800 w-full max-w-xl p-10 md:p-12 shadow-2xl flex flex-col items-center text-center overflow-hidden rounded-sm"
            >
              <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
              
              <button 
                onClick={() => router.push('/')}
                className="absolute top-4 right-4 text-neutral-500 hover:text-white transition-colors cursor-pointer z-10"
              >
                <X size={24} />
              </button>

              <div className="w-16 h-16 rounded-full bg-neon-green/20 flex items-center justify-center mb-6 mt-4 z-10">
                <CheckCircle className="text-neon-green" size={32} />
              </div>

              <h2 className="font-bebas text-3xl md:text-4xl text-white tracking-widest uppercase mb-4 leading-tight z-10 px-4">
                {orderCount === 0 ? "Congratulations On Your First Order!" : "Congratulations, Order Placed!"}
              </h2>

              <p className="font-montserrat text-sm text-neutral-400 mb-8 z-10">
                Your gear is being prepped. We'll send shipping updates to <strong className="text-white font-mono">{formData.email}</strong>.
              </p>

              <div className="w-full bg-neutral-950 border border-neutral-800 p-6 mb-8 z-10">
                <p className="font-mono text-[10px] text-neutral-500 uppercase tracking-[0.2em] mb-1">Order Confirmation</p>
                <p className="font-mono text-3xl text-bright-orange font-bold tracking-widest mt-2">{orderNumber}</p>
                <div className="mt-4 pt-4 border-t border-neutral-800 flex justify-between font-mono text-xs text-white">
                  <span>Total Paid:</span>
                  <span className="font-bold">${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => router.push('/')}
                className="w-full bg-white text-black font-bebas py-5 text-xl tracking-[0.2em] uppercase hover:bg-neon-green hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl z-10 cursor-pointer"
              >
                Continue Shopping
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
