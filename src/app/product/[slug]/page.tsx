import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Lock, ChevronLeft } from "lucide-react";

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true }
  });

  if (!product) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 text-sm py-2 px-4 flex items-center gap-2 text-gray-500">
        <Link href="/" className="hover:underline">Home</Link>
        <span>›</span>
        <Link href="#" className="hover:underline">{product.category.name}</Link>
        <span>›</span>
        <span className="text-gray-900 truncate">{product.name}</span>
      </div>

      <div className="max-w-[1500px] mx-auto p-4 flex flex-col md:flex-row gap-8 mt-4">
        
        {/* LEFT COLUMN: Images */}
        <div className="md:w-[40%] flex gap-4">
          <div className="flex flex-col gap-2 w-16">
            {product.images.map((img, idx) => (
              <div key={idx} className="w-12 h-12 border border-amazon-orange rounded cursor-pointer relative">
                 <Image src={img} alt="Thumbnail" fill className="object-cover p-1" />
              </div>
            ))}
          </div>
          <div className="flex-1 relative h-[500px] flex items-center justify-center">
            <Image src={product.images[0]} alt={product.name} fill className="object-contain" />
          </div>
        </div>

        {/* MIDDLE COLUMN: Details */}
        <div className="md:w-[40%] flex flex-col">
          <h1 className="text-2xl font-bold text-gray-900 leading-tight">{product.name}</h1>
          <a href="#" className="text-amazon-link text-sm hover:underline mt-1">Visit the JontroGhor Store</a>
          
          <div className="flex items-center gap-4 mt-2 border-b border-gray-200 pb-2">
            <span className="text-yellow-500 text-lg">★★★★☆</span>
            <span className="text-amazon-link text-sm hover:underline">1,245 ratings</span>
          </div>

          <div className="mt-4 flex flex-col border-b border-gray-200 pb-4">
            <div className="flex items-start gap-2">
               <span className="text-sm font-semibold mt-1">Price:</span>
               <div>
                  <span className="text-3xl font-medium text-gray-900">${product.price.toFixed(2)}</span>
                  {product.comparePrice && (
                    <div className="text-sm text-gray-500">
                      List Price: <span className="line-through">${product.comparePrice.toFixed(2)}</span>
                    </div>
                  )}
               </div>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="font-bold text-gray-900 mb-2">About this item</h3>
            <ul className="list-disc pl-5 text-sm text-gray-800 space-y-1">
              <li>{product.description}</li>
              <li>High quality product directly shipped to you.</li>
              <li>Eligible for Return, Refund or Replacement within 30 days of receipt.</li>
            </ul>
          </div>
        </div>

        {/* RIGHT COLUMN: Buy Box */}
        <div className="md:w-[20%]">
          <div className="border border-gray-300 rounded-lg p-4 flex flex-col gap-3 shadow-sm">
            <span className="text-2xl font-medium text-gray-900">${product.price.toFixed(2)}</span>
            
            <div className="text-sm text-gray-600">
              <span className="text-amazon-link hover:underline">FREE delivery</span> <strong>Wednesday, October 25</strong>. 
            </div>

            <div className="flex items-center gap-1 text-sm text-amazon-link hover:underline cursor-pointer">
              <MapPin size={16} /> Deliver to Bangladesh
            </div>

            <div className="text-green-700 text-lg font-medium mt-2">
              {product.inStock ? "In Stock" : "Out of Stock"}
            </div>

            <div className="flex items-center gap-2">
               <span className="text-sm">Qty:</span>
               <select className="border border-gray-300 rounded-md p-1 shadow-sm bg-gray-100 outline-none">
                 <option>1</option>
                 <option>2</option>
                 <option>3</option>
               </select>
            </div>

            <button className="bg-amazon-orange hover:bg-amazon-orange-hover text-black w-full py-2 rounded-full font-medium shadow-sm transition-colors mt-2 text-sm">
              Add to Cart
            </button>
            <button className="bg-[#ffa41c] hover:bg-[#fa8900] text-black w-full py-2 rounded-full font-medium shadow-sm transition-colors text-sm">
              Buy Now
            </button>

            <div className="flex items-center gap-2 text-gray-500 text-xs mt-2">
              <Lock size={14} /> Secure transaction
            </div>

            <div className="text-xs text-gray-500 mt-2 flex flex-col gap-1">
              <div className="flex justify-between"><span>Ships from</span> <span className="text-gray-800">JontroGhor</span></div>
              <div className="flex justify-between"><span>Sold by</span> <span className="text-gray-800">JontroGhor</span></div>
              <div className="flex justify-between"><span>Returns</span> <span className="text-amazon-link hover:underline">Eligible for Return</span></div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
