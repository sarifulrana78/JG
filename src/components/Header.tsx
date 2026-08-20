"use client";

import Link from "next/link";
import { Search, MapPin, ShoppingCart, Menu, ChevronDown, User } from "lucide-react";
import { useSession, signOut } from "@/lib/auth-client";
import { useState, useEffect } from "react";

export default function Header() {
  const { data: session } = useSession();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`w-full flex flex-col sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-xl' : ''}`}>
      {/* Top Nav - Premium Glassmorphism */}
      <div className={`flex items-center px-4 md:px-6 py-3 gap-6 h-18 transition-colors duration-300 ${scrolled ? 'bg-amazon-dark/95 backdrop-blur-md' : 'bg-amazon-dark'}`}>
        
        {/* Logo */}
        <Link href="/" className="font-outfit font-black text-3xl tracking-tighter flex items-center group relative">
          <span className="text-white transition-colors group-hover:text-gray-200">Jontro</span>
          <span className="text-amazon-orange bg-clip-text text-transparent bg-gradient-to-r from-amazon-orange to-yellow-400 group-hover:from-yellow-400 group-hover:to-amazon-orange transition-all">Ghor</span>
          {/* Subtle glow effect on hover */}
          <div className="absolute -inset-2 bg-amazon-orange/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </Link>
        
        {/* Deliver to - Modernized */}
        <div className="hidden lg:flex flex-col cursor-pointer group px-2 py-1 rounded-lg hover:bg-white/10 transition-colors">
          <span className="text-[11px] text-gray-400 ml-5 uppercase tracking-wider font-semibold">Deliver to</span>
          <div className="flex items-center font-bold text-sm text-white group-hover:text-amazon-orange transition-colors">
            <MapPin size={16} className="mr-1 opacity-80" /> Bangladesh
          </div>
        </div>

        {/* Search Bar - Premium Pill Design */}
        <div className="flex-1 hidden md:flex h-12 rounded-full overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 focus-within:bg-white focus-within:border-amazon-orange transition-all duration-300 shadow-inner group">
          <select className="bg-transparent text-gray-300 group-focus-within:text-black text-sm px-4 outline-none border-r border-white/20 group-focus-within:border-gray-200 cursor-pointer transition-colors font-medium">
            <option className="text-black">All</option>
            <option className="text-black">Gadgets</option>
            <option className="text-black">Fashion</option>
          </select>
          <input 
            type="text" 
            placeholder="Search premium products..." 
            className="flex-1 px-5 bg-transparent text-white group-focus-within:text-black outline-none placeholder-gray-400 group-focus-within:placeholder-gray-500 transition-colors" 
          />
          <button className="bg-amazon-orange hover:bg-amazon-orange-hover px-6 flex items-center justify-center text-black transition-colors">
            <Search size={22} className="opacity-80" />
          </button>
        </div>

        {/* Auth / Account - Interactive Dropdown */}
        {session ? (
          <div className="flex flex-col cursor-pointer group relative px-3 py-1 rounded-lg hover:bg-white/10 transition-colors">
            <span className="text-[11px] text-gray-400">Hello, <span className="font-semibold text-amazon-orange">{session.user.name?.split(' ')[0]}</span></span>
            <span className="text-sm font-bold text-white flex items-center gap-1">
              Account & Lists <ChevronDown size={14} className="opacity-60 group-hover:rotate-180 transition-transform duration-300" />
            </span>
            {/* Animated Dropdown Menu */}
            <div className="absolute top-[120%] right-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:top-full transition-all duration-300 ease-out bg-white text-black p-4 rounded-xl shadow-2xl border border-gray-100 z-50 w-56 transform origin-top-right scale-95 group-hover:scale-100">
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amazon-orange to-yellow-400 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                  {session.user.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-bold text-sm">{session.user.name}</p>
                  <p className="text-xs text-gray-500 truncate">{session.user.email}</p>
                </div>
              </div>
              <button className="text-sm font-medium text-gray-700 hover:text-amazon-orange hover:bg-orange-50 w-full text-left px-3 py-2 rounded-md transition-colors flex items-center gap-2">
                <User size={16} /> Your Profile
              </button>
              <button 
                onClick={() => signOut()}
                className="text-sm font-medium text-red-600 hover:bg-red-50 w-full text-left px-3 py-2 rounded-md transition-colors mt-1"
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

        {/* Returns & Orders */}
        <div className="hidden xl:flex flex-col cursor-pointer px-3 py-1 rounded-lg hover:bg-white/10 transition-colors">
          <span className="text-[11px] text-gray-400">Returns</span>
          <span className="text-sm font-bold text-white">& Orders</span>
        </div>

        {/* Cart - Modern Badge */}
        <div className="flex items-center cursor-pointer px-3 py-2 rounded-lg hover:bg-white/10 transition-colors group relative">
          <div className="relative flex items-center justify-center">
            <ShoppingCart size={28} className="text-white group-hover:text-amazon-orange transition-colors" />
            <span className="absolute -top-2 -right-2 bg-amazon-orange text-black font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
              0
            </span>
          </div>
          <span className="text-sm font-bold text-white hidden sm:block ml-2 group-hover:text-amazon-orange transition-colors">Cart</span>
        </div>

      </div>

      {/* Sub Nav - Elegant Bottom Bar */}
      <div className={`bg-amazon-light text-white flex items-center px-4 md:px-6 h-10 text-sm font-medium gap-6 overflow-x-auto whitespace-nowrap hide-scrollbar border-t border-white/5 shadow-sm transition-colors duration-300 ${scrolled ? 'bg-amazon-light/95 backdrop-blur-md' : ''}`}>
        <button className="flex items-center gap-2 hover:text-amazon-orange transition-colors tracking-wide">
          <Menu size={18} /> <span className="font-bold">All</span>
        </button>
        <div className="w-[1px] h-4 bg-white/20"></div> {/* Separator */}
        <Link href="#" className="hover:text-amazon-orange transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-amazon-orange hover:after:w-full after:transition-all after:duration-300 py-2">Today's Deals</Link>
        <Link href="#" className="hover:text-amazon-orange transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-amazon-orange hover:after:w-full after:transition-all after:duration-300 py-2">Customer Service</Link>
        <Link href="#" className="hover:text-amazon-orange transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-amazon-orange hover:after:w-full after:transition-all after:duration-300 py-2">Registry</Link>
        <Link href="#" className="hover:text-amazon-orange transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-amazon-orange hover:after:w-full after:transition-all after:duration-300 py-2">Gift Cards</Link>
        <Link href="#" className="hover:text-amazon-orange transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-amazon-orange hover:after:w-full after:transition-all after:duration-300 py-2">Sell</Link>
      </div>
    </header>
  );
}
