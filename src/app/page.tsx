import Image from "next/image";
import ProductCard3D from "@/components/ProductCard3D";
import { prisma } from "@/lib/prisma";

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
    <div className="min-h-screen bg-[#e3e6e6] pb-10">
      {/* Amazon Hero Carousel (Static for now) */}
      <div className="relative w-full h-[300px] md:h-[600px] bg-gradient-to-b from-amazon-dark to-[#e3e6e6] flex justify-center overflow-hidden">
        <div className="absolute top-0 w-full max-w-[1500px] h-full bg-gradient-to-t from-[#e3e6e6] to-transparent z-10 bottom-0 pointer-events-none"></div>
        {/* Placeholder for Carousel Image */}
        <div className="w-full h-full max-w-[1500px] object-cover bg-amazon-blue relative z-0 flex items-center justify-center">
            <h1 className="text-white text-6xl font-bold opacity-50">Hero Carousel</h1>
        </div>
      </div>

      {/* Grid of Categories (Overlapping the Hero) */}
      <div className="relative z-20 max-w-[1500px] mx-auto px-4 sm:px-6 -mt-32 md:-mt-80">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Grid Item 1: Gaming */}
          <div className="bg-white p-5 flex flex-col h-[420px]">
            <h2 className="text-xl font-bold mb-3">Gaming accessories</h2>
            <div className="grid grid-cols-2 gap-4 flex-1">
              <div className="flex flex-col"><div className="bg-gray-100 flex-1 mb-1"></div><span className="text-xs">Headsets</span></div>
              <div className="flex flex-col"><div className="bg-gray-100 flex-1 mb-1"></div><span className="text-xs">Keyboards</span></div>
              <div className="flex flex-col"><div className="bg-gray-100 flex-1 mb-1"></div><span className="text-xs">Mice</span></div>
              <div className="flex flex-col"><div className="bg-gray-100 flex-1 mb-1"></div><span className="text-xs">Chairs</span></div>
            </div>
            <a href="#" className="text-amazon-link text-sm mt-4 hover:underline hover:text-red-600">See more</a>
          </div>

          {/* Grid Item 2: Deals */}
          <div className="bg-white p-5 flex flex-col h-[420px]">
            <h2 className="text-xl font-bold mb-3">Deals in PCs</h2>
            <div className="bg-gray-100 flex-1 mb-3"></div>
            <a href="#" className="text-amazon-link text-sm hover:underline hover:text-red-600">Shop now</a>
          </div>

          {/* Grid Item 3: Refresh space */}
          <div className="bg-white p-5 flex flex-col h-[420px]">
            <h2 className="text-xl font-bold mb-3">Refresh your space</h2>
            <div className="grid grid-cols-2 gap-4 flex-1">
              <div className="flex flex-col"><div className="bg-gray-100 flex-1 mb-1"></div><span className="text-xs">Dining</span></div>
              <div className="flex flex-col"><div className="bg-gray-100 flex-1 mb-1"></div><span className="text-xs">Home</span></div>
              <div className="flex flex-col"><div className="bg-gray-100 flex-1 mb-1"></div><span className="text-xs">Kitchen</span></div>
              <div className="flex flex-col"><div className="bg-gray-100 flex-1 mb-1"></div><span className="text-xs">Health</span></div>
            </div>
            <a href="#" className="text-amazon-link text-sm mt-4 hover:underline hover:text-red-600">See more</a>
          </div>

          {/* Grid Item 4: Electronics */}
          <div className="bg-white p-5 flex flex-col h-[420px]">
            <h2 className="text-xl font-bold mb-3">Electronics</h2>
            <div className="bg-gray-100 flex-1 mb-3"></div>
            <a href="#" className="text-amazon-link text-sm hover:underline hover:text-red-600">See more</a>
          </div>

        </div>
      </div>

      {/* Product Scroller 1 */}
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 mt-6">
        <div className="bg-white p-5">
            <h2 className="text-xl font-bold mb-4">Top Sellers in Gadgets <a href="#" className="text-amazon-link text-sm font-normal ml-3 hover:underline">Shop now</a></h2>
            <div className="flex overflow-x-auto gap-4 pb-4 hide-scrollbar">
                {products.map(item => (
                    <div key={item.id} className="w-[200px] flex-shrink-0">
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
      </div>

      {/* Product Scroller 2 */}
      {moreProducts.length > 0 && (
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 mt-6">
          <div className="bg-white p-5">
              <h2 className="text-xl font-bold mb-4">More items to explore <a href="#" className="text-amazon-link text-sm font-normal ml-3 hover:underline">Explore all</a></h2>
              <div className="flex overflow-x-auto gap-4 pb-4 hide-scrollbar">
                  {moreProducts.map(item => (
                      <div key={item.id} className="w-[200px] flex-shrink-0">
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
        </div>
      )}
    </div>
  );
}

