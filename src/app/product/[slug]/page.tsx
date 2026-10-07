import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import ProductDetailsClient from "@/components/ProductDetailsClient";
import type { Metadata } from "next";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
    select: { name: true, description: true, images: true },
  });

  if (!product) return { title: "Product Not Found" };

  return {
    title: product.name,
    description: product.description ?? `Buy ${product.name} at the best price on JontroGhor.`,
    openGraph: {
      title: `${product.name} | JontroGhor`,
      description: product.description ?? `Buy ${product.name} at JontroGhor.`,
      images: product.images[0] ? [{ url: product.images[0] }] : [],
    },
  };
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true }
  });

  if (!product) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-[#0f141a] text-white">
      {/* Premium Breadcrumb */}
      <div className="bg-white/5 border-b border-white/10 text-sm py-4 px-6 flex items-center gap-2 text-gray-400 backdrop-blur-md">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <ChevronRight size={14} className="opacity-50" />
        <Link href="/#products" className="hover:text-amazon-orange transition-colors">{product.category.name}</Link>
        <ChevronRight size={14} className="opacity-50" />
        <span className="text-white truncate font-medium">{product.name}</span>
      </div>

      <div className="max-w-[1500px] mx-auto p-4 sm:p-6 pb-20">
        <ProductDetailsClient product={product as any} />
      </div>
    </div>
  );
}
