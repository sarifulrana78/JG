"use client";

import { useCartStore } from "@/lib/store";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, Truck, ShieldCheck, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function CheckoutPage() {
  const { cartItems, getTotalPrice, clearCart } = useCartStore();
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (cartItems.length === 0) {
      router.push('/cart');
    }
  }, [cartItems, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call for checkout
    setTimeout(() => {
      clearCart();
      router.push('/checkout/success');
    }, 2000);
  };

  if (!isMounted || cartItems.length === 0) return null;

  return (
    <div className="min-h-screen bg-[#0f141a] text-white py-12 px-4 sm:px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8 font-medium">
          <span>Cart</span> <ChevronRight size={14} /> <span className="text-white">Checkout</span>
        </div>
        
        <h1 className="text-3xl font-outfit font-black mb-8">Secure Checkout</h1>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left Column: Form */}
          <div className="flex-1">
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              
              {/* Shipping Address */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2 border-b border-white/10 pb-4">
                  <Truck className="text-amazon-orange" /> Shipping Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-gray-300">First Name</label>
                    <input required type="text" className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-amazon-orange transition-colors" placeholder="John" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-gray-300">Last Name</label>
                    <input required type="text" className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-amazon-orange transition-colors" placeholder="Doe" />
                  </div>
                  <div className="flex flex-col gap-1.5 md:col-span-2">
                    <label className="text-sm font-semibold text-gray-300">Address</label>
                    <input required type="text" className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-amazon-orange transition-colors" placeholder="123 Main St" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-gray-300">City</label>
                    <input required type="text" className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-amazon-orange transition-colors" placeholder="Dhaka" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-gray-300">Phone</label>
                    <input required type="tel" className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-amazon-orange transition-colors" placeholder="+880 1..." />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2 border-b border-white/10 pb-4">
                  <CreditCard className="text-amazon-orange" /> Payment Method
                </h2>
                
                <div className="flex flex-col gap-4">
                  <label className="flex items-center gap-4 p-4 border border-amazon-orange bg-amazon-orange/5 rounded-xl cursor-pointer">
                    <input type="radio" name="payment" defaultChecked className="w-5 h-5 accent-amazon-orange" />
                    <span className="font-semibold">Credit / Debit Card</span>
                  </label>
                  <label className="flex items-center gap-4 p-4 border border-white/10 hover:border-white/30 bg-black/20 rounded-xl cursor-pointer transition-colors">
                    <input type="radio" name="payment" className="w-5 h-5 accent-amazon-orange" />
                    <span className="font-semibold">bKash / Mobile Banking</span>
                  </label>
                  <label className="flex items-center gap-4 p-4 border border-white/10 hover:border-white/30 bg-black/20 rounded-xl cursor-pointer transition-colors">
                    <input type="radio" name="payment" className="w-5 h-5 accent-amazon-orange" />
                    <span className="font-semibold">Cash on Delivery</span>
                  </label>
                </div>
                
                {/* Simulated Card Input */}
                <div className="mt-6 flex flex-col gap-4 pt-6 border-t border-white/10">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-gray-300">Card Number</label>
                    <input required type="text" className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-amazon-orange transition-colors font-mono" placeholder="0000 0000 0000 0000" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-semibold text-gray-300">Expiry</label>
                      <input required type="text" className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-amazon-orange transition-colors font-mono" placeholder="MM/YY" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-semibold text-gray-300">CVC</label>
                      <input required type="text" className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-amazon-orange transition-colors font-mono" placeholder="123" />
                    </div>
                  </div>
                </div>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-amazon-orange hover:bg-amazon-orange-hover text-black py-4 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(254,189,105,0.3)] hover:shadow-[0_0_30px_rgba(254,189,105,0.5)] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed text-lg"
              >
                {isSubmitting ? (
                   <span className="animate-pulse">Processing Order...</span>
                ) : (
                   <><ShieldCheck size={24} /> Place Order - ${getTotalPrice().toFixed(2)}</>
                )}
              </button>
            </form>
          </div>

          {/* Right Column: Order Summary */}
          <div className="w-full lg:w-[400px]">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sticky top-24 backdrop-blur-md">
              <h2 className="text-xl font-bold mb-6 pb-4 border-b border-white/10">Order Summary</h2>
              
              <div className="flex flex-col gap-4 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-lg relative overflow-hidden shrink-0 flex items-center justify-center">
                      <Image src={item.image} alt={item.name} fill className="object-contain p-1" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold line-clamp-2">{item.name}</div>
                      <div className="text-xs text-gray-400 mt-1">Qty: {item.quantity}</div>
                      <div className="text-sm font-bold text-amazon-orange mt-1">${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-3 pt-6 border-t border-white/10 text-sm text-gray-300">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white font-medium">${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-400 font-medium">Free</span>
                </div>
              </div>

              <div className="flex justify-between items-end pt-6 mt-4 border-t border-white/10">
                <span className="text-lg font-bold">Total</span>
                <span className="text-3xl font-black text-white">${getTotalPrice().toFixed(2)}</span>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
