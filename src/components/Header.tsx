"use client";

import Link from "next/link";
import { Search, MapPin, ShoppingCart, Menu, ChevronDown, User, X } from "lucide-react";
import { useSession, signOut } from "@/lib/auth-client";
import { useState, useEffect, useRef } from "react";
import { useCartStore, useUIStore } from "@/lib/store";
import SideDrawer from "./SideDrawer";
import { useRouter } from "next/navigation";

export default function Header() {
  const { data: session } = useSession();
  const [scrolled, setScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const cartItems = useCartStore((state) => state.cartItems);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const { 
    deliveryLocation, 
    openModal, 
    setSearchQuery, 
    setActiveCategory, 
    addToast 
  } = useUIStore();

  const sampleSuggestions = [
    { name: "Pro Wireless Gaming Mouse", cat: "gaming" },
    { name: "Mechanical Gaming Keyboard", cat: "gaming" },
    { name: "Noise Cancelling Headphones", cat: "gadgets" },
    { name: "4K Action Camera", cat: "gadgets" },
  ];

  const filteredSuggestions = sampleSuggestions.filter((item) =>
    item.name.toLowerCase().includes(localSearch.toLowerCase())
  );

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);

    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setShowSearchSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setShowSearchSuggestions(false);

    if (selectedDept !== "All") {
      setActiveCategory(selectedDept.toLowerCase());
    }
    setSearchQuery(localSearch.trim());

    // If on homepage, smooth scroll to products
    const productEl = document.getElementById("products");
    if (productEl) {
      productEl.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(`/#products`);
    }

    if (localSearch.trim()) {
      addToast({ message: `Searching for "${localSearch.trim()}"... 🔍`, type: "info" });
    }
  };

  const handleSuggestionSelect = (item: { name: string; cat: string }) => {
    setLocalSearch(item.name);
    setSearchQuery(item.name);
    setActiveCategory(item.cat);
    setShowSearchSuggestions(false);

    const productEl = document.getElementById("products");
    if (productEl) {
      productEl.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(`/#products`);
    }
  };

  return (
    <>
      <header className={`w-full flex flex-col sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-xl' : ''}`}>
        {/* Top Nav - Premium Glassmorphism */}
        <div className={`flex items-center px-4 md:px-6 py-3 gap-6 h-18 transition-colors duration-300 ${scrolled ? 'bg-amazon-dark/95 backdrop-blur-md' : 'bg-amazon-dark'}`}>
          
          {/* Logo */}
          <Link href="/" className="font-outfit font-black text-3xl tracking-tighter flex items-center group relative shrink-0">
            <span className="text-white transition-colors group-hover:text-gray-200">Jontro</span>
            <span className="text-amazon-orange bg-clip-text text-transparent bg-gradient-to-r from-amazon-orange to-yellow-400 group-hover:from-yellow-400 group-hover:to-amazon-orange transition-all">Ghor</span>
            {/* Subtle glow effect on hover */}
            <div className="absolute -inset-2 bg-amazon-orange/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
          </Link>
          
          {/* Deliver to - Interactive Location Picker Button */}
          <button 
            type="button"
            onClick={() => openModal("location")}
            className="hidden lg:flex flex-col text-left group px-3 py-1.5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer border border-transparent hover:border-white/10"
            title="Change Delivery Location"
          >
            <span className="text-[11px] text-gray-400 ml-5 uppercase tracking-wider font-semibold">Deliver to</span>
            <div className="flex items-center font-bold text-sm text-white group-hover:text-amazon-orange transition-colors">
              <MapPin size={16} className="mr-1 text-amazon-orange" />
              <span className="max-w-[130px] truncate">{isMounted ? deliveryLocation : "Bangladesh"}</span>
            </div>
          </button>

          {/* Search Bar - Premium Pill Design with Live Suggestions */}
          <div ref={searchContainerRef} className="flex-1 hidden md:flex relative">
            <form 
              onSubmit={handleSearchSubmit}
              className="w-full flex h-12 rounded-full overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 focus-within:bg-white focus-within:border-amazon-orange transition-all duration-300 shadow-inner group"
            >
              <select 
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="bg-transparent text-gray-300 group-focus-within:text-black text-sm px-4 outline-none border-r border-white/20 group-focus-within:border-gray-200 cursor-pointer transition-colors font-medium"
              >
                <option className="text-black" value="All">All Categories</option>
                <option className="text-black" value="gaming">Gaming</option>
                <option className="text-black" value="gadgets">Gadgets</option>
                <option className="text-black" value="workspace">Workspace</option>
                <option className="text-black" value="lifestyle">Lifestyle</option>
                <option className="text-black" value="wearables">Wearables</option>
              </select>

              <input 
                type="text" 
                value={localSearch}
                onChange={(e) => {
                  setLocalSearch(e.target.value);
                  setShowSearchSuggestions(true);
                }}
                onFocus={() => setShowSearchSuggestions(true)}
                placeholder="Search premium products..." 
                className="flex-1 px-5 bg-transparent text-white group-focus-within:text-black outline-none placeholder-gray-400 group-focus-within:placeholder-gray-500 transition-colors text-sm" 
              />

              {localSearch && (
                <button
                  type="button"
                  onClick={() => {
                    setLocalSearch("");
                    setSearchQuery("");
                  }}
                  className="px-2 text-gray-400 hover:text-gray-600 transition-colors group-focus-within:text-gray-400"
                >
                  <X size={16} />
                </button>
              )}

              <button 
                type="submit"
                className="bg-amazon-orange hover:bg-amazon-orange-hover px-6 flex items-center justify-center text-black transition-colors cursor-pointer group-hover:scale-105"
                title="Search Products"
              >
                <Search size={20} className="opacity-90 stroke-[2.5]" />
              </button>
            </form>

            {/* Suggestions Dropdown */}
            {showSearchSuggestions && localSearch.trim() && (
              <div className="absolute top-[110%] left-0 right-0 bg-[#1a222d] border border-white/10 rounded-2xl shadow-2xl p-2 z-50 text-white backdrop-blur-xl">
                <p className="text-[11px] uppercase tracking-wider text-gray-400 font-bold px-3 py-1.5">
                  Suggested Products
                </p>
                {filteredSuggestions.length > 0 ? (
                  filteredSuggestions.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSuggestionSelect(item)}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-white/10 flex items-center justify-between text-gray-200 hover:text-amazon-orange transition-colors"
                    >
                      <span>{item.name}</span>
                      <span className="text-[10px] text-gray-400 uppercase font-semibold">{item.cat}</span>
                    </button>
                  ))
                ) : (
                  <button
                    type="button"
                    onClick={() => handleSearchSubmit()}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-white/10 text-amazon-orange"
                  >
                    Search for "{localSearch}" in all categories
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Auth / Account - Interactive Dropdown */}
          {session ? (
            <div className="flex flex-col cursor-pointer group relative px-3 py-1 rounded-lg hover:bg-white/10 transition-colors">
              <span className="text-[11px] text-gray-400">Hello, <span className="font-semibold text-amazon-orange">{session.user.name?.split(' ')[0]}</span></span>
              <span className="text-sm font-bold text-white flex items-center gap-1">
                Account & Lists <ChevronDown size={14} className="opacity-60 group-hover:rotate-180 transition-transform duration-300" />
              </span>
              {/* Animated Dropdown Menu */}
              <div className="absolute top-[120%] right-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:top-full transition-all duration-300 ease-out bg-[#1a222d] text-white p-4 rounded-xl shadow-2xl border border-white/10 z-50 w-56 transform origin-top-right scale-95 group-hover:scale-100">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amazon-orange to-yellow-400 flex items-center justify-center text-black font-bold text-lg shadow-sm">
                    {session.user.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-sm truncate">{session.user.name}</p>
                    <p className="text-xs text-gray-400 truncate">{session.user.email}</p>
                  </div>
                </div>
                <button 
                  onClick={() => openModal("profile")}
                  className="text-sm font-medium text-gray-200 hover:text-amazon-orange hover:bg-white/5 w-full text-left px-3 py-2 rounded-md transition-colors flex items-center gap-2"
                >
                  <User size={16} /> Your Profile
                </button>
                <button 
                  onClick={() => openModal("registry")}
                  className="text-sm font-medium text-gray-200 hover:text-amazon-orange hover:bg-white/5 w-full text-left px-3 py-2 rounded-md transition-colors flex items-center gap-2"
                >
                  Your Wishlist
                </button>
                <button 
                  onClick={() => openModal("track-order")}
                  className="text-sm font-medium text-gray-200 hover:text-amazon-orange hover:bg-white/5 w-full text-left px-3 py-2 rounded-md transition-colors flex items-center gap-2"
                >
                  Your Orders
                </button>
                <button 
                  onClick={() => {
                    signOut();
                    addToast({ message: "Signed out successfully", type: "info" });
                  }}
                  className="text-sm font-medium text-red-400 hover:bg-red-500/10 w-full text-left px-3 py-2 rounded-md transition-colors mt-1"
                >
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <Link href="/login" className="flex flex-col cursor-pointer px-3 py-1 rounded-lg hover:bg-white/10 transition-colors group">
              <span className="text-[11px] text-gray-400">Hello, sign in</span>
              <span className="text-sm font-bold text-white flex items-center gap-1 group-hover:text-amazon-orange transition-colors">
                Account & Lists
              </span>
            </Link>
          )}

          {/* Returns & Orders - Opens Orders Modal */}
          <button 
            type="button"
            onClick={() => openModal("track-order")}
            className="hidden xl:flex flex-col text-left px-3 py-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer group"
          >
            <span className="text-[11px] text-gray-400 group-hover:text-amazon-orange transition-colors">Returns</span>
            <span className="text-sm font-bold text-white group-hover:text-amazon-orange transition-colors">& Orders</span>
          </button>

          {/* Cart - Modern Badge */}
          <Link href="/cart" className="flex items-center cursor-pointer px-3 py-2 rounded-lg hover:bg-white/10 transition-colors group relative">
            <div className="relative flex items-center justify-center">
              <ShoppingCart size={28} className="text-white group-hover:text-amazon-orange transition-colors" />
              <span className="absolute -top-2 -right-2 bg-amazon-orange text-black font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                {isMounted ? totalItems : 0}
              </span>
            </div>
            <span className="text-sm font-bold text-white hidden sm:block ml-2 group-hover:text-amazon-orange transition-colors">Cart</span>
          </Link>

        </div>

        {/* Sub Nav - Interactive Bottom Bar */}
        <div className={`bg-amazon-light text-white flex items-center px-4 md:px-6 h-10 text-sm font-medium gap-6 overflow-x-auto whitespace-nowrap hide-scrollbar border-t border-white/5 shadow-sm transition-colors duration-300 ${scrolled ? 'bg-amazon-light/95 backdrop-blur-md' : ''}`}>
          {/* Hamburger "All" Button */}
          <button 
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            className="flex items-center gap-2 hover:text-amazon-orange transition-colors tracking-wide cursor-pointer py-1 px-2 rounded-lg hover:bg-white/10"
            title="Open All Menu"
          >
            <Menu size={18} /> <span className="font-bold">All</span>
          </button>

          <div className="w-[1px] h-4 bg-white/20"></div> {/* Separator */}

          <button
            type="button"
            onClick={() => {
              setActiveCategory("all");
              const el = document.getElementById("products");
              if (el) el.scrollIntoView({ behavior: "smooth" });
              addToast({ message: "Viewing Today's Deals! ⚡", type: "info" });
            }}
            className="hover:text-amazon-orange transition-colors py-2 cursor-pointer"
          >
            Today's Deals
          </button>

          <button
            type="button"
            onClick={() => openModal("customer-service")}
            className="hover:text-amazon-orange transition-colors py-2 cursor-pointer"
          >
            Customer Service
          </button>

          <button
            type="button"
            onClick={() => openModal("registry")}
            className="hover:text-amazon-orange transition-colors py-2 cursor-pointer"
          >
            Registry
          </button>

          <button
            type="button"
            onClick={() => openModal("gift-cards")}
            className="hover:text-amazon-orange transition-colors py-2 cursor-pointer"
          >
            Gift Cards
          </button>

          <button
            type="button"
            onClick={() => openModal("sell")}
            className="hover:text-amazon-orange transition-colors py-2 cursor-pointer"
          >
            Sell
          </button>
        </div>
      </header>

      {/* Side Navigation Drawer */}
      <SideDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  );
}
