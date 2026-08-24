import Image from "next/image";
import ProductCard3D from "@/components/ProductCard3D";
import CategoryCard3D from "@/components/CategoryCard3D";
import Hero3D from "@/components/Hero3D";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default async function Home() {
  const products = await prisma.product.findMany({
    take: 6,
    orderBy: { createdAt: 'desc' }
  });

  const moreProducts = await prisma.product.findMany({
    take: 6,
    skip: 6,
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="min-h-screen bg-[#0f141a] text-white pb-20 font-outfit">
      
      {/* 3D Hero Section */}
      <Hero3D />

      {/* Premium Categories Grid */}
      <div className="relative z-20 max-w-[1500px] mx-auto px-4 sm:px-6 -mt-20 md:-mt-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Category 1: Gaming */}
          <CategoryCard3D
            title="Pro Gaming"
            linkText="Explore Gear"
            linkHref="#"
            items={[
              { icon: <div className="w-8 h-8 bg-white/20 rounded-full" />, label: "Headsets" },
              { icon: <div className="w-8 h-8 bg-white/20 rounded-full" />, label: "Keyboards" },
              { icon: <div className="w-8 h-8 bg-white/20 rounded-full" />, label: "Mice" },
              { icon: <div className="w-8 h-8 bg-white/20 rounded-full" />, label: "Chairs" }
            ]}
          />

          {/* Category 2: Lifestyle & Gifts */}
          <CategoryCard3D
            title="Lifestyle & Gifts"
            linkText="Shop Lifestyle"
            linkHref="#"
            className="bg-gradient-to-br from-amazon-dark to-slate-900 border border-white/10 hover:border-amazon-orange/50"
            bgElement={
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-amazon-orange/20 blur-[50px] rounded-full pointer-events-none"></div>
            }
            items={[
              { icon: "🧸", label: "Soft Toys" },
              { icon: "✨", label: "Perfumes" },
              { icon: "📓", label: "Stationery" },
              { icon: "🎁", label: "Gifts" }
            ]}
          />

          {/* Category 3: Workspace */}
          <CategoryCard3D
            title="Workspace"
            linkText="Upgrade Setup"
            linkHref="#"
            items={[
              { icon: <div className="w-8 h-8 bg-white/20 rounded-full" />, label: "Monitors" },
              { icon: <div className="w-8 h-8 bg-white/20 rounded-full" />, label: "Desks" },
              { icon: <div className="w-8 h-8 bg-white/20 rounded-full" />, label: "Storage" },
              { icon: <div className="w-8 h-8 bg-white/20 rounded-full" />, label: "Lighting" }
            ]}
          />

          {/* Category 4: Wearables */}
          <CategoryCard3D
            title="Premium Wearables"
            linkText="See Collection"
            linkHref="#"
            comingSoon={true}
            bgElement={
              <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-blue-500/20 blur-[50px] rounded-full pointer-events-none"></div>
            }
          />

        </div>
      </div>

      {/* Trust & Guarantees Section */}
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 mt-16">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amazon-orange/10 blur-[80px] rounded-full pointer-events-none"></div>
          
          <h2 className="text-3xl md:text-4xl font-black text-white mb-10 text-center relative z-10">
            The <span className="text-amazon-orange">JontroGhor</span> Guarantee
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            <div className="flex flex-col items-center text-center p-6 bg-black/20 rounded-2xl border border-white/5 hover:border-amazon-orange/30 transition-colors group">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Premium Quality</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                We ensure 100% genuine products. Found a defect? We'll replace it. Say goodbye to broken flasks and poor quality.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-black/20 rounded-2xl border border-white/5 hover:border-amazon-orange/30 transition-colors group">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl">🎫</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Transparent Vouchers</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                No arbitrary rules or hidden item grouping. Use your gift vouchers fairly against your total bill with zero hassle.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-black/20 rounded-2xl border border-white/5 hover:border-amazon-orange/30 transition-colors group">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl">🔄</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Hassle-Free Returns</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Our customer care is always here to listen. We offer easy returns and full accountability for our products.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 mt-16">
        <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white tracking-tight">Featured Gadgets</h2>
            <Link href="#" className="text-amazon-orange text-sm font-bold flex items-center gap-1 hover:underline">View All <ChevronRight size={16} /></Link>
        </div>
        <div className="flex flex-wrap lg:flex-nowrap overflow-x-auto gap-6 pb-8 hide-scrollbar snap-x">
            {products.map(item => (
                <div key={item.id} className="w-[280px] flex-shrink-0 snap-start">
                    <ProductCard3D 
                      title={item.name} 
                      price={`$${item.price}`} 
                      slug={item.slug}
                      image={item.images[0]}
                    />
                </div>
            ))}
        </div>
      </div>

      {/* More Items */}
      {moreProducts.length > 0 && (
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 mt-12">
          <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-white tracking-tight">New Arrivals</h2>
              <Link href="#" className="text-amazon-orange text-sm font-bold flex items-center gap-1 hover:underline">Explore <ChevronRight size={16} /></Link>
          </div>
          <div className="flex flex-wrap lg:flex-nowrap overflow-x-auto gap-6 pb-8 hide-scrollbar snap-x">
              {moreProducts.map(item => (
                  <div key={item.id} className="w-[280px] flex-shrink-0 snap-start">
                      <ProductCard3D 
                        title={item.name} 
                        price={`$${item.price}`} 
                        slug={item.slug}
                        image={item.images[0]}
                      />
                  </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
