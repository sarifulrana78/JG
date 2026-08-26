"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface CategoryCardProps {
  title: string;
  items?: { icon: React.ReactNode; label: string }[];
  linkText: string;
  linkHref: string;
  comingSoon?: boolean;
  className?: string;
  bgElement?: React.ReactNode;
}

export default function CategoryCard3D({
  title,
  items,
  linkText,
  linkHref,
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

  return (
    <div className="perspective-1000 w-full">
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
              className="bg-black/30 flex-1 rounded-xl flex items-center justify-center border border-white/5 z-10 pointer-events-auto"
            >
              <span className="text-gray-500 font-medium">Coming Soon</span>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 flex-1 z-10 pointer-events-auto">
              {items?.map((item, idx) => (
                <div 
                  key={idx} 
                  className="flex flex-col items-center justify-center bg-black/20 rounded-xl hover:bg-amazon-orange/20 transition-colors cursor-pointer p-2 shadow-inner"
                  style={{
                    transform: `translateZ(${15 + (idx * 5)}px)`
                  }}
                >
                  <div className="w-12 h-12 bg-white/5 rounded-full mb-2 flex items-center justify-center text-xl">
                      {item.icon}
                  </div>
                  <span className="text-xs font-semibold text-gray-300">{item.label}</span>
                </div>
              ))}
            </div>
          )}
          
          <div className="mt-6 pointer-events-auto w-max" style={{ transform: "translateZ(30px)" }}>
            <Link 
              href={linkHref} 
              className="flex items-center gap-1 text-amazon-orange text-sm font-bold hover:gap-2 transition-all z-10"
            >
              {linkText} <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
