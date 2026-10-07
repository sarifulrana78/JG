"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useUIStore } from "@/lib/store";

export interface CategoryCardProps {
  title: string;
  items?: { icon: React.ReactNode; label: string }[];
  linkText: string;
  linkHref?: string;
  categoryKey?: string;
  comingSoon?: boolean;
  className?: string;
  bgElement?: React.ReactNode;
}

export default function CategoryCard3D({
  title,
  items,
  linkText,
  linkHref,
  categoryKey,
  comingSoon,
  className = "bg-white/10 backdrop-blur-xl border border-white/10 hover:bg-white/15",
  bgElement,
}: CategoryCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const { setActiveCategory, setSearchQuery, addToast, openModal } = useUIStore();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleCategoryAction = () => {
    if (comingSoon) {
      addToast({ message: "Wearables & Smartwatches collection launching soon! ⌚", type: "info" });
      openModal("app-download");
      return;
    }

    if (categoryKey) {
      setActiveCategory(categoryKey.toLowerCase());
    } else {
      setActiveCategory("all");
    }

    const el = document.getElementById("products");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleItemClick = (label: string) => {
    setSearchQuery(label);
    const el = document.getElementById("products");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    addToast({ message: `Filtering products for "${label}"`, type: "info" });
  };

  return (
    <div className="perspective-1000 w-full select-none font-outfit">
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateY,
          rotateX,
          transformStyle: "preserve-3d",
        }}
        className={`relative rounded-2xl p-6 flex flex-col h-[400px] transition-all duration-300 group shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden ${className}`}
      >
        {bgElement}
        
        <div
          style={{
            transform: "translateZ(30px)",
            transformStyle: "preserve-3d",
          }}
          className="flex flex-col flex-1 z-10 w-full h-full pointer-events-none"
        >
          <h2 
            style={{ transform: "translateZ(40px)" }}
            className="text-2xl font-bold mb-4 text-white group-hover:text-amazon-orange transition-colors"
          >
            {title}
          </h2>
          
          {comingSoon ? (
            <div 
              style={{ transform: "translateZ(20px)" }}
              onClick={handleCategoryAction}
              className="bg-black/30 flex-1 rounded-xl flex flex-col items-center justify-center border border-white/5 z-10 pointer-events-auto cursor-pointer hover:bg-black/40 transition-colors"
            >
              <span className="text-3xl mb-2">⌚</span>
              <span className="text-amazon-orange font-bold text-sm">Coming Soon</span>
              <span className="text-xs text-gray-400 mt-1">Tap to notify me</span>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 flex-1 z-10 pointer-events-auto">
              {items?.map((item, idx) => (
                <button
                  type="button" 
                  key={idx} 
                  onClick={() => handleItemClick(item.label)}
                  className="flex flex-col items-center justify-center bg-black/20 rounded-xl hover:bg-amazon-orange/20 transition-all cursor-pointer p-2 shadow-inner border border-transparent hover:border-amazon-orange/30 group/item"
                  style={{
                    transform: `translateZ(${15 + (idx * 5)}px)`
                  }}
                  title={`Filter by ${item.label}`}
                >
                  <div className="w-12 h-12 bg-white/5 rounded-full mb-2 flex items-center justify-center text-xl group-hover/item:scale-110 transition-transform">
                      {item.icon}
                  </div>
                  <span className="text-xs font-semibold text-gray-300 group-hover/item:text-amazon-orange transition-colors">{item.label}</span>
                </button>
              ))}
            </div>
          )}
          
          <div className="mt-6 pointer-events-auto w-max" style={{ transform: "translateZ(30px)" }}>
            <button 
              type="button"
              onClick={handleCategoryAction}
              className="flex items-center gap-1 text-amazon-orange text-sm font-bold hover:gap-2 transition-all z-10 cursor-pointer"
            >
              {linkText} <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
