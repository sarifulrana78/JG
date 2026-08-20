"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard3D({
  title,
  price,
  slug,
  image = "/placeholder.png",
}: {
  title: string;
  price: string;
  slug: string;
  image?: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

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
    <Link href={`/product/${slug}`} passHref className="block">
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateY,
          rotateX,
          transformStyle: "preserve-3d",
        }}
        className="relative h-96 w-full rounded-2xl bg-white shadow-xl border border-slate-100 p-6 flex flex-col justify-between cursor-pointer group"
      >
        <div
          style={{
            transform: "translateZ(50px)",
            transformStyle: "preserve-3d",
          }}
          className="w-full h-48 bg-slate-100 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden"
        >
          {image ? (
            <Image src={image} alt={title} fill className="object-cover" />
          ) : (
            <div className="text-slate-400 font-medium">3D Tilt Image</div>
          )}
        </div>
        
        <div
          style={{
            transform: "translateZ(30px)",
          }}
          className="flex flex-col gap-2"
        >
          <h3 className="font-inter font-bold text-lg text-slate-900 group-hover:text-amazon-orange transition-colors line-clamp-2">
            {title}
          </h3>
          <p className="text-slate-900 font-bold text-xl">{price}</p>
        </div>

        <motion.button
          style={{
            transform: "translateZ(40px)",
          }}
          className="mt-4 w-full bg-amazon-orange hover:bg-amazon-orange-hover text-black font-semibold py-3 rounded-full transition-colors shadow-md text-sm"
        >
          Add to Cart
        </motion.button>
      </motion.div>
    </Link>
  );
}
