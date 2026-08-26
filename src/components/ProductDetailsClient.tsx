"use client";

import { useState } from "react";
import Image from "next/image";
import { useCartStore } from "@/lib/store";
import { MapPin, Lock, ShoppingCart, CreditCard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  comparePrice: number | null;
  inStock: boolean;
  images: string[];
}

export default function ProductDetailsClient({ product }: { product: Product }) {
  const [activeImage, setActiveImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);
  const addToCart = useCartStore((state) => state.addToCart);
  const router = useRouter();

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.images[0],
      slug: product.slug
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push('/checkout');
  };

  return (
    <div className="flex flex-col md:flex-row gap-12 mt-8">
      {/* LEFT COLUMN: Images */}
      <div className="md:w-[50%] flex gap-6">
        {/* Thumbnails */}
        <div className="flex flex-col gap-3 w-20 shrink-0">
          {product.images.map((img, idx) => (
            <button 
              key={idx} 
              onClick={() => setActiveImage(img)}
              className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${activeImage === img ? 'border-amazon-orange scale-105 shadow-[0_0_15px_rgba(254,189,105,0.4)]' : 'border-white/10 hover:border-white/30 opacity-60 hover:opacity-100'}`}
            >
               <div className="relative w-full h-full bg-white/5">
                 <Image src={img} alt="Thumbnail" fill className="object-cover p-2" />
               </div>
            </button>
          ))}
        </div>
        {/* Main Image */}
        <div className="flex-1 relative h-[600px] flex items-center justify-center bg-white/5 rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none"></div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeImage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-full"
            >
              <Image src={activeImage} alt={product.name} fill className="object-contain p-10 drop-shadow-2xl" />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* RIGHT COLUMN: Details & Actions */}
      <div className="md:w-[50%] flex flex-col">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight font-outfit">{product.name}</h1>
          <div className="flex items-center gap-4 mt-4 pb-6 border-b border-white/10">
            <div className="flex text-amazon-orange text-lg">★★★★<span className="text-gray-600">★</span></div>
            <span className="text-gray-400 text-sm hover:text-white transition-colors cursor-pointer">1,245 reviews</span>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="mt-6 flex flex-col pb-6 border-b border-white/10">
          <div className="flex items-end gap-4">
            <span className="text-5xl font-bold text-white tracking-tighter">${product.price.toFixed(2)}</span>
            {product.comparePrice && (
              <div className="text-lg text-gray-500 line-through mb-1">
                ${product.comparePrice.toFixed(2)}
              </div>
            )}
          </div>
          <div className="text-sm text-gray-400 mt-2">Inclusive of all taxes. Free shipping available.</div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="mt-6">
          <h3 className="font-bold text-white mb-3 text-lg">Description</h3>
          <p className="text-gray-400 leading-relaxed">
            {product.description}
          </p>
        </motion.div>

        {/* Action Box */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
          <div className="flex items-center justify-between mb-6">
            <div className={`text-lg font-bold ${product.inStock ? "text-green-400" : "text-red-400"}`}>
              {product.inStock ? "● In Stock" : "● Out of Stock"}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <MapPin size={16} /> Delivery by <strong className="text-white">Tomorrow</strong>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-6">
             <span className="text-gray-300 font-medium">Quantity</span>
             <div className="flex items-center bg-black/40 rounded-lg border border-white/10 overflow-hidden">
               <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2 hover:bg-white/10 text-white transition-colors">-</button>
               <span className="w-10 text-center font-bold">{quantity}</span>
               <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 hover:bg-white/10 text-white transition-colors">+</button>
             </div>
          </div>

          <div className="flex flex-col gap-3">
            <button 
              onClick={handleAddToCart}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
            >
              <ShoppingCart size={20} /> Add to Cart
            </button>
            <button 
              onClick={handleBuyNow}
              className="bg-amazon-orange hover:bg-amazon-orange-hover text-black w-full py-4 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(254,189,105,0.3)] hover:shadow-[0_0_30px_rgba(254,189,105,0.5)] flex items-center justify-center gap-2"
            >
              <CreditCard size={20} /> Buy Now
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 text-gray-500 text-xs mt-6">
            <Lock size={14} /> Secure transaction processing
          </div>
        </motion.div>
      </div>
    </div>
  );
}
