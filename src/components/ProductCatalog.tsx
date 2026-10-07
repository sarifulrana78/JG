"use client";

import { useUIStore } from "@/lib/store";
import ProductCard3D from "./ProductCard3D";
import { ChevronRight, Filter, X, Sparkles } from "lucide-react";

interface ProductItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  comparePrice: number | null;
  images: string[];
  category?: {
    slug: string;
    name: string;
  };
}

export default function ProductCatalog({
  initialProducts,
  initialMoreProducts,
}: {
  initialProducts: ProductItem[];
  initialMoreProducts: ProductItem[];
}) {
  const { activeCategory, setActiveCategory, searchQuery, setSearchQuery } = useUIStore();

  const allProducts = [...initialProducts, ...initialMoreProducts];

  // Filter products based on activeCategory and searchQuery
  const filteredProducts = allProducts.filter((p) => {
    // Category match
    const categoryMatches =
      activeCategory === "all" ||
      (p.category && p.category.slug.toLowerCase().includes(activeCategory.toLowerCase())) ||
      p.name.toLowerCase().includes(activeCategory.toLowerCase()) ||
      p.description.toLowerCase().includes(activeCategory.toLowerCase());

    // Search query match
    const searchMatches =
      !searchQuery.trim() ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());

    return categoryMatches && searchMatches;
  });

  const categories = [
    { label: "All Items", key: "all" },
    { label: "Gaming", key: "gaming" },
    { label: "Gadgets", key: "gadgets" },
    { label: "Audio & Headphones", key: "headphones" },
    { label: "Cameras", key: "camera" },
  ];

  const clearFilters = () => {
    setActiveCategory("all");
    setSearchQuery("");
  };

  return (
    <div id="products" className="max-w-[1500px] mx-auto px-4 sm:px-6 mt-20 scroll-mt-24 font-outfit">
      {/* Category Pills & Active Search Status */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight flex items-center gap-2">
            <Sparkles className="text-amazon-orange" size={28} /> Premium Gear & Gadgets
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Top tier electronics, gaming peripherals, and genuine lifestyle accessories.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer shrink-0 border ${
                activeCategory === cat.key
                  ? "bg-amazon-orange text-black border-amazon-orange shadow-[0_0_15px_rgba(254,189,105,0.4)]"
                  : "bg-white/5 text-gray-300 border-white/10 hover:bg-white/10 hover:border-white/20"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Active Filter Bar (if searching or categorized) */}
      {(searchQuery || activeCategory !== "all") && (
        <div className="mb-6 p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <Filter size={16} className="text-amazon-orange" />
            <span className="text-gray-300">
              Showing results for:{" "}
              {searchQuery && <strong className="text-white">"{searchQuery}"</strong>}
              {searchQuery && activeCategory !== "all" && " in "}
              {activeCategory !== "all" && <strong className="text-amazon-orange uppercase">{activeCategory}</strong>}
              {" "}({filteredProducts.length} items found)
            </span>
          </div>

          <button
            type="button"
            onClick={clearFilters}
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X size={14} /> Clear Filter
          </button>
        </div>
      )}

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white/5 border border-white/10 flex flex-col items-center">
          <p className="text-lg font-bold text-gray-300 mb-2">No products matched your filter</p>
          <p className="text-sm text-gray-400 mb-6">Try searching for other gadgets or clear filters to see all gear.</p>
          <button
            type="button"
            onClick={clearFilters}
            className="px-6 py-2.5 rounded-full bg-amazon-orange hover:bg-amazon-orange-hover text-black font-bold text-xs transition-colors"
          >
            Show All Products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((item) => (
            <div key={item.id} className="w-full">
              <ProductCard3D
                title={item.name}
                price={`$${item.price.toFixed(2)}`}
                slug={item.slug}
                image={item.images[0] || "/placeholder.png"}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
