import CategoryCard3D from "@/components/CategoryCard3D";
import Hero3D from "@/components/Hero3D";
import ProductCatalog from "@/components/ProductCatalog";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const products = await prisma.product.findMany({
    take: 6,
    orderBy: { createdAt: 'desc' },
    include: { category: true }
  });

  const moreProducts = await prisma.product.findMany({
    take: 6,
    skip: 6,
    orderBy: { createdAt: 'desc' },
    include: { category: true }
  });

  return (
    <div className="min-h-screen bg-[#0f141a] text-white pb-20 font-outfit">
      
      {/* 3D Hero Section */}
      <Hero3D />

      {/* Premium Categories Grid */}
      <div id="categories" className="relative z-20 max-w-[1500px] mx-auto px-4 sm:px-6 -mt-20 md:-mt-32 scroll-mt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Category 1: Gaming */}
          <CategoryCard3D
            title="Pro Gaming"
            linkText="Explore Gear"
            categoryKey="gaming"
            items={[
              { icon: "🎧", label: "Headsets" },
              { icon: "⌨️", label: "Keyboards" },
              { icon: "🖱️", label: "Mice" },
              { icon: "🎮", label: "Chairs" }
            ]}
          />

          {/* Category 2: Lifestyle & Gifts */}
          <CategoryCard3D
            title="Lifestyle & Gifts"
            linkText="Shop Lifestyle"
            categoryKey="lifestyle"
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
            categoryKey="workspace"
            items={[
              { icon: "🖥️", label: "Monitors" },
              { icon: "🪑", label: "Desks" },
              { icon: "📦", label: "Storage" },
              { icon: "💡", label: "Lighting" }
            ]}
          />

          {/* Category 4: Wearables */}
          <CategoryCard3D
            title="Premium Wearables"
            linkText="See Collection"
            categoryKey="wearables"
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
              <h3 className="text-xl font-bold text-white mb-3">100% Genuine Tech</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                We only source official products directly from verified manufacturers. 7-day replacement warranty included.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-black/20 rounded-2xl border border-white/5 hover:border-amazon-orange/30 transition-colors group">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl">🎫</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Instant Vouchers</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Apply discount codes directly on checkout with zero restrictions. Transparent pricing and instant discounts.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-black/20 rounded-2xl border border-white/5 hover:border-amazon-orange/30 transition-colors group">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl">🔄</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Hassle-Free Returns</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Enjoy 7 days no-hassle return and door-to-door replacement service across all 64 districts in Bangladesh.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Products Catalog */}
      <ProductCatalog
        initialProducts={products as any}
        initialMoreProducts={moreProducts as any}
      />

    </div>
  );
}
