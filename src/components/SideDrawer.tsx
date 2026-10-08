"use client";

import { X, ChevronRight, User, Flame, Sparkles, HelpCircle, Heart, Store, Truck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSession, signOut } from "@/lib/auth-client";
import { useUIStore } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";

interface SideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SideDrawer({ isOpen, onClose }: SideDrawerProps) {
  const { data: session } = useSession();
  const { openModal, setActiveCategory, setSearchQuery } = useUIStore();
  const router = useRouter();

  // Listen to Escape key to close drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleCategoryClick = (cat: string) => {
    setActiveCategory(cat.toLowerCase());
    setSearchQuery("");
    onClose();

    // Scroll to products if on homepage, else route to homepage
    const el = document.getElementById("products");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push("/#products");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
          />

          {/* Drawer Content */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="relative z-10 w-full max-w-[360px] bg-[#131921] text-white h-full shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header User Banner */}
            <div className="bg-[#232f3e] px-6 py-5 flex items-center justify-between border-b border-white/10">
              {session ? (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    openModal("profile");
                  }}
                  className="flex items-center gap-3 text-left group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-full bg-amazon-orange text-black font-black flex items-center justify-center text-lg shadow-md group-hover:scale-105 transition-transform">
                    {session.user?.name ? session.user.name.charAt(0).toUpperCase() : <User size={20} />}
                  </div>
                  <div>
                    <h4 className="font-bold text-base font-outfit group-hover:text-amazon-orange transition-colors">
                      Hello, {session.user?.name ? session.user.name.split(" ")[0] : "User"}
                    </h4>
                    <p className="text-xs text-gray-400">View your profile</p>
                  </div>
                </button>
              ) : (
                <Link
                  href="/login"
                  onClick={onClose}
                  className="flex items-center gap-3 text-left group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-full bg-white/10 text-white font-black flex items-center justify-center text-lg group-hover:bg-amazon-orange group-hover:text-black transition-colors">
                    <User size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-base font-outfit group-hover:text-amazon-orange transition-colors">
                      Hello, Sign in
                    </h4>
                    <p className="text-xs text-gray-400">Welcome to JontroGhor</p>
                  </div>
                </Link>
              )}

              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>

            {/* Scrollable Menu Items */}
            <div className="flex-1 overflow-y-auto py-4 px-4 space-y-6 custom-scrollbar text-sm">
              {/* Section: Trending */}
              <div>
                <h5 className="text-xs font-bold text-gray-400 uppercase tracking-wider px-3 mb-2">Trending Deals</h5>
                <div className="space-y-1">
                  <button
                    type="button"
                    onClick={() => handleCategoryClick("all")}
                    className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-white/10 text-gray-200 hover:text-amazon-orange font-medium flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2.5">
                      <Flame size={16} className="text-amazon-orange" /> Best Sellers
                    </span>
                    <ChevronRight size={14} className="text-gray-500" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleCategoryClick("all")}
                    className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-white/10 text-gray-200 hover:text-amazon-orange font-medium flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2.5">
                      <Sparkles size={16} className="text-yellow-400" /> New Arrivals
                    </span>
                    <ChevronRight size={14} className="text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Section: Shop by Department */}
              <div className="pt-2 border-t border-white/5">
                <h5 className="text-xs font-bold text-gray-400 uppercase tracking-wider px-3 mb-2">Shop by Category</h5>
                <div className="space-y-1">
                  {[
                    { name: "Gaming Accessories", cat: "gaming", icon: "🎮" },
                    { name: "Electronics & Gadgets", cat: "gadgets", icon: "⚡" },
                    { name: "Workspace & Desk", cat: "workspace", icon: "💻" },
                    { name: "Lifestyle & Gifts", cat: "lifestyle", icon: "🎁" },
                    { name: "Wearables & Watches", cat: "wearables", icon: "⌚" },
                  ].map((dept) => (
                    <button
                      key={dept.cat}
                      type="button"
                      onClick={() => handleCategoryClick(dept.cat)}
                      className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-white/10 text-gray-200 hover:text-amazon-orange font-medium flex items-center justify-between transition-colors cursor-pointer"
                    >
                      <span className="flex items-center gap-2.5">
                        <span>{dept.icon}</span> {dept.name}
                      </span>
                      <ChevronRight size={14} className="text-gray-500" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Section: Features & Services */}
              <div className="pt-2 border-t border-white/5">
                <h5 className="text-xs font-bold text-gray-400 uppercase tracking-wider px-3 mb-2">Services & Rewards</h5>
                <div className="space-y-1">
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      openModal("gift-cards");
                    }}
                    className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-white/10 text-gray-200 hover:text-amazon-orange font-medium flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2.5">
                      <Sparkles size={16} className="text-amazon-orange" /> Gift Cards & Promo Codes
                    </span>
                    <ChevronRight size={14} className="text-gray-500" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      openModal("registry");
                    }}
                    className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-white/10 text-gray-200 hover:text-amazon-orange font-medium flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2.5">
                      <Heart size={16} className="text-red-400" /> Wishlist & Registry
                    </span>
                    <ChevronRight size={14} className="text-gray-500" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      openModal("sell");
                    }}
                    className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-white/10 text-gray-200 hover:text-amazon-orange font-medium flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2.5">
                      <Store size={16} className="text-blue-400" /> Sell on JontroGhor
                    </span>
                    <ChevronRight size={14} className="text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Section: Help & Account */}
              <div className="pt-2 border-t border-white/5">
                <h5 className="text-xs font-bold text-gray-400 uppercase tracking-wider px-3 mb-2">Help & Settings</h5>
                <div className="space-y-1">
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      openModal("track-order");
                    }}
                    className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-white/10 text-gray-200 hover:text-amazon-orange font-medium flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2.5">
                      <Truck size={16} className="text-amazon-orange" /> Track Orders & Returns
                    </span>
                    <ChevronRight size={14} className="text-gray-500" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      openModal("customer-service");
                    }}
                    className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-white/10 text-gray-200 hover:text-amazon-orange font-medium flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2.5">
                      <HelpCircle size={16} className="text-gray-400" /> Customer Service
                    </span>
                    <ChevronRight size={14} className="text-gray-500" />
                  </button>

                  {session ? (
                    <button
                      type="button"
                      onClick={() => {
                        signOut();
                        onClose();
                      }}
                      className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-red-500/10 text-red-400 font-medium flex items-center gap-2.5 transition-colors cursor-pointer"
                    >
                      Sign Out
                    </button>
                  ) : (
                    <Link
                      href="/login"
                      onClick={onClose}
                      className="w-full text-left px-3 py-2.5 rounded-xl bg-amazon-orange hover:bg-amazon-orange-hover text-black font-bold flex items-center justify-center transition-colors mt-2 cursor-pointer shadow-md"
                    >
                      Sign In to Account
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
