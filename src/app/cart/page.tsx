"use client";

import { useCartStore } from "@/lib/store";
import Image from "next/image";
import Link from "next/link";
import { Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice } = useCartStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="min-h-screen bg-[#0f141a] pt-20 text-center text-white">Loading cart...</div>;
  }

  return (
    <div className="min-h-screen bg-[#0f141a] text-white py-12 px-4 sm:px-6">
      <div className="max-w-[1200px] mx-auto">
        <h1 className="text-4xl font-outfit font-black mb-8 flex items-center gap-3">
          <ShoppingBag className="text-amazon-orange" size={36} /> Your Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="bg-white/5 border border-white/10 rounded-3xl p-12 text-center flex flex-col items-center justify-center">
             <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6">
               <ShoppingBag size={48} className="text-gray-500" />
             </div>
             <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
             <p className="text-gray-400 mb-8 max-w-md">Looks like you haven't added any premium gear to your cart yet. Discover our latest gadgets and fashion.</p>
             <Link href="/" className="bg-amazon-orange hover:bg-amazon-orange-hover text-black px-8 py-3 rounded-full font-bold transition-all shadow-[0_0_20px_rgba(254,189,105,0.2)]">
               Start Shopping
             </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items List */}
            <div className="flex-1 flex flex-col gap-4">
              {cartItems.map((item, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ delay: idx * 0.1 }}
                  key={item.id} 
                  className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row gap-6 relative"
                >
                  <Link href={`/product/${item.slug}`} className="w-full sm:w-32 h-32 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center relative overflow-hidden group shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-contain p-2 group-hover:scale-110 transition-transform duration-500" />
                  </Link>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <Link href={`/product/${item.slug}`} className="text-xl font-bold hover:text-amazon-orange transition-colors line-clamp-2">
                        {item.name}
                      </Link>
                      <div className="text-2xl font-black text-white mt-2">${item.price.toFixed(2)}</div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-6">
                      <div className="flex items-center bg-black/40 rounded-lg border border-white/10 overflow-hidden">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-1.5 hover:bg-white/10 text-white transition-colors">-</button>
                        <span className="w-10 text-center font-bold text-sm">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1.5 hover:bg-white/10 text-white transition-colors">+</button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1 text-sm font-medium"
                      >
                        <Trash2 size={16} /> Remove
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="w-full lg:w-[400px]">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sticky top-24 backdrop-blur-md">
                <h2 className="text-xl font-bold mb-6 pb-4 border-b border-white/10">Order Summary</h2>
                
                <div className="flex flex-col gap-4 mb-6 text-gray-300">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-white font-medium">${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-green-400 font-medium">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Tax</span>
                    <span className="text-white font-medium">$0.00</span>
                  </div>
                </div>

                <div className="flex justify-between items-end pt-6 border-t border-white/10 mb-8">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-4xl font-black text-amazon-orange">${getTotalPrice().toFixed(2)}</span>
                </div>

                <Link 
                  href="/checkout"
                  className="w-full bg-amazon-orange hover:bg-amazon-orange-hover text-black py-4 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(254,189,105,0.3)] hover:shadow-[0_0_30px_rgba(254,189,105,0.5)] flex items-center justify-center gap-2 group"
                >
                  Proceed to Checkout <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
