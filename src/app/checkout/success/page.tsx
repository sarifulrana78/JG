"use client";

import Link from "next/link";
import { CheckCircle2, Package, ArrowRight, Truck } from "lucide-react";
import { motion } from "framer-motion";
import { useUIStore } from "@/lib/store";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || `JG-${Math.floor(100000 + Math.random() * 900000)}`;
  const { openModal } = useUIStore();

  return (
    <div className="min-h-[80vh] bg-[#0f141a] text-white flex items-center justify-center p-4 font-outfit">
      <div className="max-w-md w-full bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 text-center backdrop-blur-md relative overflow-hidden">
        {/* Confetti / Glow effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-green-500/20 blur-[100px] rounded-full pointer-events-none"></div>
        
        <motion.div 
          initial={{ scale: 0 }} 
          animate={{ scale: 1 }} 
          transition={{ type: "spring", damping: 12, stiffness: 100 }}
          className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10"
        >
          <CheckCircle2 size={48} className="text-green-500" />
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.2 }}
          className="text-3xl font-black mb-4 relative z-10"
        >
          Order Confirmed!
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.3 }}
          className="text-gray-400 mb-8 relative z-10 text-sm leading-relaxed"
        >
          Thank you for your purchase. Your premium gear is being prepared for shipping and will be delivered across Bangladesh shortly.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.4 }}
          className="flex items-center justify-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/10 mb-6 relative z-10 text-sm"
        >
          <Package className="text-amazon-orange" size={20} />
          <span>Order Number: <strong className="text-amazon-orange font-mono">#{orderId}</strong></span>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.5 }}
          className="relative z-10 flex flex-col gap-3"
        >
          <button 
            type="button"
            onClick={() => openModal("track-order")}
            className="w-full bg-white/10 hover:bg-white/15 text-white py-3.5 rounded-xl font-bold transition-all border border-white/10 flex items-center justify-center gap-2 cursor-pointer text-sm"
          >
            <Truck size={18} className="text-amazon-orange" /> Track This Order
          </button>

          <Link 
            href="/#products"
            className="w-full bg-amazon-orange hover:bg-amazon-orange-hover text-black py-4 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(254,189,105,0.2)] flex items-center justify-center gap-2 group cursor-pointer text-sm"
          >
            Continue Shopping <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0f141a] text-white flex items-center justify-center">Loading confirmation...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
