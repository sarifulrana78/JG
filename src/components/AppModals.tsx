"use client";

import { useUIStore, useCartStore, useWishlistStore } from "@/lib/store";
import { 
  X, MapPin, Package, HelpCircle, Gift, Heart, Store, 
  Smartphone, ShieldCheck, Check, Copy, ExternalLink, Send, ArrowRight,
  Truck, Star, RefreshCw, ShoppingCart, User
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useSession, signOut } from "@/lib/auth-client";

export default function AppModals() {
  const { activeModal, modalData, closeModal, deliveryLocation, setDeliveryLocation, addToast, recentOrders, setActiveCategory } = useUIStore();
  const { wishlistItems, toggleWishlist } = useWishlistStore();
  const { addToCart } = useCartStore();
  const { data: session } = useSession();

  // Local state for specific modals
  const [selectedCity, setSelectedCity] = useState(deliveryLocation);
  const [customArea, setCustomArea] = useState("");
  const [orderQuery, setOrderQuery] = useState("");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [sellerName, setSellerName] = useState("");
  const [sellerPhone, setSellerPhone] = useState("");
  const [sellerSubmitted, setSellerSubmitted] = useState(false);
  const [newReviewText, setNewReviewText] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [appEmail, setAppEmail] = useState("");
  const [appSubscribed, setAppSubscribed] = useState(false);

  if (!activeModal) return null;

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    addToast({ message: `Copied ${code} to clipboard!`, type: "success" });
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleSaveLocation = () => {
    const loc = customArea.trim() ? `${customArea.trim()}, ${selectedCity}` : selectedCity;
    setDeliveryLocation(loc);
    addToast({ message: `Delivery location updated to ${loc} 📍`, type: "success" });
    closeModal();
  };

  const bangladeshCities = [
    "Dhaka", "Chittagong", "Sylhet", "Rajshahi", "Khulna", 
    "Barishal", "Rangpur", "Mymensingh", "Gazipur", "Narayanganj", "Cumilla"
  ];

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closeModal}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
      />

      {/* Modal Wrapper */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", duration: 0.35, bounce: 0.1 }}
        className="relative z-10 w-full max-w-xl max-h-[90vh] overflow-y-auto bg-[#131921] border border-white/10 rounded-3xl shadow-2xl text-white p-6 md:p-8 custom-scrollbar"
      >
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white flex items-center justify-center transition-colors"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* 1. LOCATION MODAL */}
        {activeModal === "location" && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-amazon-orange/10 flex items-center justify-center text-amazon-orange">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold font-outfit">Choose Your Delivery Location</h3>
                <p className="text-xs text-gray-400">Select your district or area for accurate delivery options.</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-2 uppercase tracking-wider">
                  Select Division / City
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {bangladeshCities.map((city) => (
                    <button
                      key={city}
                      onClick={() => setSelectedCity(city)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold transition-all text-left flex items-center justify-between border ${
                        selectedCity === city
                          ? "bg-amazon-orange text-black border-amazon-orange shadow-md"
                          : "bg-white/5 text-gray-300 border-white/5 hover:bg-white/10 hover:border-white/20"
                      }`}
                    >
                      <span>{city}</span>
                      {selectedCity === city && <Check size={14} className="stroke-[3]" />}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-2 uppercase tracking-wider">
                  Area or Street (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Banani, Road 11, House 24"
                  value={customArea}
                  onChange={(e) => setCustomArea(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amazon-orange"
                />
              </div>

              <div className="p-3 rounded-xl bg-amazon-orange/5 border border-amazon-orange/20 text-xs text-amazon-orange flex items-center gap-2">
                <Truck size={16} /> Express delivery available across Bangladesh within 24-48 hours.
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  onClick={handleSaveLocation}
                  className="flex-1 bg-amazon-orange hover:bg-amazon-orange-hover text-black font-bold py-3 rounded-xl text-sm transition-all shadow-md"
                >
                  Save Delivery Location
                </button>
                <button
                  onClick={closeModal}
                  className="px-5 bg-white/10 hover:bg-white/15 text-white font-medium py-3 rounded-xl text-sm transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 2. TRACK ORDERS & RETURNS */}
        {activeModal === "track-order" && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-amazon-orange/10 flex items-center justify-center text-amazon-orange">
                <Package size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold font-outfit">Orders & Tracking</h3>
                <p className="text-xs text-gray-400">Track shipments or initiate returns for recent purchases.</p>
              </div>
            </div>

            <div className="space-y-5">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter Order ID (e.g. JG-849201)"
                  value={orderQuery}
                  onChange={(e) => setOrderQuery(e.target.value)}
                  className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amazon-orange font-mono"
                />
                <button
                  onClick={() => {
                    if (orderQuery) {
                      addToast({ message: `Tracking order #${orderQuery}: Package is currently in transit! 🚚`, type: "info" });
                    }
                  }}
                  className="bg-amazon-orange hover:bg-amazon-orange-hover text-black px-5 py-2.5 rounded-xl font-bold text-sm transition-colors"
                >
                  Track
                </button>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Recent Orders</h4>
                <div className="space-y-3">
                  {recentOrders.map((ord) => (
                    <div key={ord.orderId} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-mono text-sm font-bold text-amazon-orange">#{ord.orderId}</span>
                          <p className="text-xs text-gray-400">{ord.date}</p>
                        </div>
                        <span className="text-xs font-bold px-3 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                          {ord.status}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-xs text-gray-300 pt-2 border-t border-white/5">
                        <span>Total: <strong className="text-white">${ord.total.toFixed(2)}</strong> ({ord.paymentMethod})</span>
                        <button
                          onClick={() => {
                            addToast({ message: `Return request initiated for Order #${ord.orderId}. Support will contact you shortly.`, type: "success" });
                          }}
                          className="text-amazon-orange hover:underline font-bold flex items-center gap-1"
                        >
                          <RefreshCw size={12} /> Request Return
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. CUSTOMER SERVICE & HELP */}
        {activeModal === "customer-service" && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-amazon-orange/10 flex items-center justify-center text-amazon-orange">
                <HelpCircle size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold font-outfit">Customer Care & Support</h3>
                <p className="text-xs text-gray-400">We are here 24/7 to help you with orders, returns, and inquiries.</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href="tel:01335069851"
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-amazon-orange/40 hover:bg-white/10 transition-all flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-amazon-orange/10 flex items-center justify-center text-amazon-orange group-hover:scale-110 transition-transform">
                    📞
                  </div>
                  <div>
                    <h5 className="font-bold text-sm">Direct Hotline</h5>
                    <p className="text-xs text-gray-400">01335-069851</p>
                  </div>
                </a>

                <a
                  href="mailto:support@jontroghor.com"
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-amazon-orange/40 hover:bg-white/10 transition-all flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-amazon-orange/10 flex items-center justify-center text-amazon-orange group-hover:scale-110 transition-transform">
                    ✉️
                  </div>
                  <div>
                    <h5 className="font-bold text-sm">Email Support</h5>
                    <p className="text-xs text-gray-400">support@jontroghor.com</p>
                  </div>
                </a>
              </div>

              <div className="pt-2">
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Frequently Asked Questions</h4>
                <div className="space-y-2">
                  <details className="bg-white/5 rounded-xl p-3 border border-white/5 text-sm cursor-pointer group">
                    <summary className="font-bold text-gray-200 group-hover:text-amazon-orange transition-colors">
                      How long does delivery take inside Dhaka?
                    </summary>
                    <p className="text-xs text-gray-400 mt-2 pl-2 border-l border-amazon-orange">
                      Inside Dhaka deliveries take 24 to 48 hours. Express same-day delivery is available for orders placed before 12 PM.
                    </p>
                  </details>
                  <details className="bg-white/5 rounded-xl p-3 border border-white/5 text-sm cursor-pointer group">
                    <summary className="font-bold text-gray-200 group-hover:text-amazon-orange transition-colors">
                      What is the 7-day return policy?
                    </summary>
                    <p className="text-xs text-gray-400 mt-2 pl-2 border-l border-amazon-orange">
                      You can return any undamaged item in its original packaging within 7 days for a 100% full refund or free replacement.
                    </p>
                  </details>
                  <details className="bg-white/5 rounded-xl p-3 border border-white/5 text-sm cursor-pointer group">
                    <summary className="font-bold text-gray-200 group-hover:text-amazon-orange transition-colors">
                      Do you accept Cash on Delivery (COD)?
                    </summary>
                    <p className="text-xs text-gray-400 mt-2 pl-2 border-l border-amazon-orange">
                      Yes! We offer 100% Cash on Delivery across all 64 districts in Bangladesh with no advance payment required for verified orders.
                    </p>
                  </details>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    addToast({ message: "Live Chat agent connected! An agent will message you momentarily.", type: "success" });
                    closeModal();
                  }}
                  className="w-full bg-amazon-orange hover:bg-amazon-orange-hover text-black font-bold py-3 rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Send size={16} /> Start Live Chat Now
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 4. GIFT CARDS & PROMO CODES */}
        {activeModal === "gift-cards" && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-amazon-orange/10 flex items-center justify-center text-amazon-orange">
                <Gift size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold font-outfit">Exclusive Promo Codes & Gift Cards</h3>
                <p className="text-xs text-gray-400">Copy active vouchers to apply discounts at checkout.</p>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { code: "JONTRO10", disc: "10% OFF Site-wide", desc: "No minimum spend required." },
                { code: "SAVE20", disc: "20% OFF Premium Gadgets", desc: "Valid on all gaming & audio equipment." },
                { code: "WELCOME15", disc: "15% OFF First Purchase", desc: "Special welcome reward for new users." },
              ].map((promo) => (
                <div key={promo.code} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="font-mono text-base font-black text-amazon-orange tracking-wider">{promo.code}</span>
                    <h5 className="font-bold text-xs text-white mt-0.5">{promo.disc}</h5>
                    <p className="text-[11px] text-gray-400">{promo.desc}</p>
                  </div>
                  <button
                    onClick={() => handleCopyCode(promo.code)}
                    className="px-4 py-2 bg-white/10 hover:bg-amazon-orange hover:text-black rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                  >
                    {copiedCode === promo.code ? <Check size={14} /> : <Copy size={14} />}
                    {copiedCode === promo.code ? "Copied!" : "Copy"}
                  </button>
                </div>
              ))}

              <div className="pt-3">
                <Link
                  href="/#products"
                  onClick={closeModal}
                  className="w-full bg-amazon-orange hover:bg-amazon-orange-hover text-black font-bold py-3 rounded-xl text-sm transition-all flex items-center justify-center gap-2"
                >
                  Shop Now with Discount <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* 5. REGISTRY & WISHLIST */}
        {activeModal === "registry" && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-400">
                <Heart size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold font-outfit">Your Wishlist & Registry</h3>
                <p className="text-xs text-gray-400">{wishlistItems.length} items saved for later purchase.</p>
              </div>
            </div>

            {wishlistItems.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-400 text-sm mb-4">You have not saved any items to your wishlist yet.</p>
                <Link
                  href="/#products"
                  onClick={closeModal}
                  className="inline-block bg-amazon-orange hover:bg-amazon-orange-hover text-black px-6 py-2.5 rounded-xl font-bold text-xs"
                >
                  Explore Products
                </Link>
              </div>
            ) : (
              <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                {wishlistItems.map((item) => (
                  <div key={item.id} className="p-3 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-3">
                    <div className="w-16 h-16 bg-white/10 rounded-xl relative overflow-hidden shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-contain p-1" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-sm truncate">{item.name}</h4>
                      <p className="text-amazon-orange font-bold text-sm">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => {
                          addToCart({
                            id: item.id,
                            name: item.name,
                            price: item.price,
                            quantity: 1,
                            image: item.image,
                            slug: item.slug
                          });
                          addToast({ message: `Moved ${item.name} to cart! 🛒`, type: "success", actionLabel: "View Cart", actionHref: "/cart" });
                        }}
                        className="p-2 bg-amazon-orange hover:bg-amazon-orange-hover text-black rounded-xl transition-colors font-bold text-xs flex items-center gap-1"
                        title="Add to Cart"
                      >
                        <ShoppingCart size={15} /> Add
                      </button>
                      <button
                        onClick={() => {
                          toggleWishlist(item);
                          addToast({ message: `Removed from wishlist`, type: "info" });
                        }}
                        className="p-2 bg-white/10 hover:bg-red-500/20 text-gray-400 hover:text-red-400 rounded-xl transition-colors"
                        title="Remove"
                      >
                        <X size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 6. SELL ON JONTROGHor */}
        {activeModal === "sell" && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-amazon-orange/10 flex items-center justify-center text-amazon-orange">
                <Store size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold font-outfit">Sell on JontroGhor</h3>
                <p className="text-xs text-gray-400">Reach millions of tech & lifestyle customers across Bangladesh.</p>
              </div>
            </div>

            {sellerSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check size={32} />
                </div>
                <h4 className="text-lg font-bold">Application Received!</h4>
                <p className="text-xs text-gray-400 mt-2 max-w-sm mx-auto">
                  Our merchant verification team will review your application and reach out to you within 24 business hours.
                </p>
                <button
                  onClick={closeModal}
                  className="mt-6 bg-amazon-orange text-black font-bold px-6 py-2.5 rounded-xl text-xs"
                >
                  Done
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSellerSubmitted(true);
                  addToast({ message: "Merchant application submitted successfully! 🚀", type: "success" });
                }}
                className="space-y-4"
              >
                <div>
                  <label className="text-xs font-semibold text-gray-300 block mb-1.5">Business / Store Name</label>
                  <input
                    required
                    type="text"
                    value={sellerName}
                    onChange={(e) => setSellerName(e.target.value)}
                    placeholder="e.g. Apex Tech BD"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amazon-orange"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-300 block mb-1.5">Phone Number (bKash/Merchant)</label>
                  <input
                    required
                    type="tel"
                    value={sellerPhone}
                    onChange={(e) => setSellerPhone(e.target.value)}
                    placeholder="+880 1..."
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amazon-orange"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-300 block mb-1.5">Primary Category</label>
                  <select className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amazon-orange text-white">
                    <option className="bg-slate-900">Electronics & Gadgets</option>
                    <option className="bg-slate-900">Gaming Gear</option>
                    <option className="bg-slate-900">Lifestyle & Accessories</option>
                    <option className="bg-slate-900">Workspace & Office</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full bg-amazon-orange hover:bg-amazon-orange-hover text-black font-bold py-3 rounded-xl text-sm transition-all shadow-md mt-2"
                >
                  Submit Merchant Application
                </button>
              </form>
            )}
          </div>
        )}

        {/* 7. APP DOWNLOAD */}
        {activeModal === "app-download" && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-amazon-orange/10 flex items-center justify-center text-amazon-orange">
                <Smartphone size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold font-outfit">Download JontroGhor App</h3>
                <p className="text-xs text-gray-400">Experience faster 3D gadget browsing on iOS and Android.</p>
              </div>
            </div>

            {appSubscribed ? (
              <div className="text-center py-6">
                <div className="w-14 h-14 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Check size={28} />
                </div>
                <h4 className="font-bold text-base">You're on the early access list!</h4>
                <p className="text-xs text-gray-400 mt-1">We'll send your download invite to {appEmail}.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      addToast({ message: "Android APK download starting... 📲", type: "success" });
                    }}
                    className="p-4 bg-white/5 border border-white/10 hover:border-amazon-orange/40 rounded-2xl flex flex-col items-center gap-2 group transition-all"
                  >
                    <span className="text-3xl group-hover:scale-110 transition-transform">🤖</span>
                    <span className="font-bold text-xs">Google Play (APK)</span>
                    <span className="text-[10px] text-green-400 font-semibold">Download v1.2</span>
                  </button>
                  <button
                    onClick={() => {
                      addToast({ message: "iOS TestFlight invite requested! 🍏", type: "success" });
                    }}
                    className="p-4 bg-white/5 border border-white/10 hover:border-amazon-orange/40 rounded-2xl flex flex-col items-center gap-2 group transition-all"
                  >
                    <span className="text-3xl group-hover:scale-110 transition-transform">🍎</span>
                    <span className="font-bold text-xs">Apple App Store</span>
                    <span className="text-[10px] text-blue-400 font-semibold">TestFlight Beta</span>
                  </button>
                </div>

                <div className="pt-2">
                  <label className="text-xs font-semibold text-gray-300 block mb-1.5">Get notification on official launch:</label>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={appEmail}
                      onChange={(e) => setAppEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amazon-orange"
                    />
                    <button
                      onClick={() => {
                        if (appEmail) {
                          setAppSubscribed(true);
                          addToast({ message: "Subscribed to app release alerts! 🎉", type: "success" });
                        }
                      }}
                      className="bg-amazon-orange hover:bg-amazon-orange-hover text-black px-4 py-2.5 rounded-xl font-bold text-xs transition-colors"
                    >
                      Notify Me
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 8. CUSTOMER REVIEWS */}
        {activeModal === "reviews" && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-400">
                <Star size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold font-outfit">Verified Customer Reviews</h3>
                <p className="text-xs text-gray-400">4.9 out of 5 stars based on 1,245 customer ratings.</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-3 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                {[
                  { name: "Tanvir Ahmed", rating: 5, date: "3 days ago", comment: "Outstanding build quality and authentic product. Delivered in Dhaka within 24 hours via Cash on Delivery!" },
                  { name: "Nabila Rahman", rating: 5, date: "1 week ago", comment: "Packaging was premium and bKash payment was seamless. Highly recommend JontroGhor." },
                  { name: "Shakil Hossain", rating: 4, date: "2 weeks ago", comment: "Smooth performance, zero latency. 7 days replacement guarantee gave me total peace of mind." },
                ].map((rev, i) => (
                  <div key={i} className="p-3.5 bg-white/5 border border-white/10 rounded-2xl text-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">{rev.name}</span>
                      <span className="text-gray-400">{rev.date}</span>
                    </div>
                    <div className="flex text-amazon-orange text-xs">
                      {"★".repeat(rev.rating)}
                    </div>
                    <p className="text-gray-300 leading-relaxed">{rev.comment}</p>
                  </div>
                ))}
              </div>

              {reviewSubmitted ? (
                <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-2xl text-center text-xs text-green-300">
                  ✓ Thank you! Your review has been submitted and is pending verification.
                </div>
              ) : (
                <div className="pt-2 border-t border-white/10 space-y-3">
                  <h4 className="text-xs font-semibold text-gray-300">Write Your Review</h4>
                  <div className="flex gap-2 text-xl text-amber-400 cursor-pointer">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReviewRating(star)}
                        className={`transition-transform hover:scale-125 ${star <= newReviewRating ? "text-amazon-orange" : "text-gray-600"}`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                  <textarea
                    rows={2}
                    value={newReviewText}
                    onChange={(e) => setNewReviewText(e.target.value)}
                    placeholder="Share your experience with this gadget..."
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amazon-orange"
                  />
                  <button
                    onClick={() => {
                      if (newReviewText) {
                        setReviewSubmitted(true);
                        addToast({ message: "Review posted successfully! ⭐", type: "success" });
                      }
                    }}
                    className="w-full bg-amazon-orange hover:bg-amazon-orange-hover text-black font-bold py-2.5 rounded-xl text-xs transition-colors"
                  >
                    Submit Review
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 9. STORE LOCATOR */}
        {activeModal === "store-locator" && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-amazon-orange/10 flex items-center justify-center text-amazon-orange">
                <Store size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold font-outfit">JontroGhor Experience Hub</h3>
                <p className="text-xs text-gray-400">Visit our flagship store in Dhaka for live demonstrations.</p>
              </div>
            </div>

            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-3 text-xs">
              <div>
                <span className="font-bold text-white text-sm">Flagship Banani Experience Store</span>
                <p className="text-gray-400 mt-1">House 72, Road No. 11, South Breeze Housing Limited, Banani, Dhaka 1213</p>
              </div>
              <div className="pt-2 border-t border-white/5 text-gray-300">
                <p>⏰ Open Every Day: <strong>9:30 AM – 9:00 PM</strong></p>
                <p className="mt-1">📞 Store Phone: <strong>01335-069851</strong></p>
              </div>
            </div>

            <button
              onClick={() => {
                window.open("https://maps.google.com/?q=Banani+Dhaka", "_blank");
              }}
              className="mt-4 w-full bg-amazon-orange hover:bg-amazon-orange-hover text-black font-bold py-3 rounded-xl text-sm transition-all flex items-center justify-center gap-2"
            >
              Open in Google Maps <ExternalLink size={16} />
            </button>
          </div>
        )}

        {/* 10. TERMS & PRIVACY */}
        {(activeModal === "terms" || activeModal === "privacy") && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-amazon-orange/10 flex items-center justify-center text-amazon-orange">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold font-outfit">
                  {activeModal === "terms" ? "Terms of Service" : "Privacy Policy"}
                </h3>
                <p className="text-xs text-gray-400">Last updated: October 2026</p>
              </div>
            </div>

            <div className="max-h-[300px] overflow-y-auto pr-2 space-y-3 text-xs text-gray-300 leading-relaxed custom-scrollbar">
              <p>
                Welcome to JontroGhor. By accessing and purchasing from our store, you agree to comply with all applicable Bangladesh trade and commerce guidelines.
              </p>
              <h5 className="font-bold text-white">Genuine Product Guarantee</h5>
              <p>
                All items shipped are 100% authentic with manufacturer warranty. Any defective item reported within 7 days is eligible for immediate exchange.
              </p>
              <h5 className="font-bold text-white">Data Privacy & Security</h5>
              <p>
                Your personal details, phone numbers, and delivery addresses are encrypted. We never share customer data with third parties.
              </p>
            </div>

            <button
              onClick={closeModal}
              className="mt-6 w-full bg-white/10 hover:bg-white/15 text-white font-bold py-3 rounded-xl text-xs transition-colors"
            >
              Close
            </button>
          </div>
        )}

        {/* 11. USER PROFILE */}
        {activeModal === "profile" && (
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amazon-orange to-yellow-400 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                {session?.user?.name ? session.user.name.charAt(0).toUpperCase() : "U"}
              </div>
              <div>
                <h3 className="text-xl font-bold font-outfit">{session?.user?.name || "JontroGhor Member"}</h3>
                <p className="text-xs text-gray-400">{session?.user?.email || "guest@jontroghor.com"}</p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-gray-400">Wishlist Items</span>
                  <p className="text-xl font-bold text-white mt-1">{wishlistItems.length}</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-gray-400">Saved Orders</span>
                  <p className="text-xl font-bold text-white mt-1">{recentOrders.length}</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-gray-400">Default Delivery Address</span>
                  <p className="font-bold text-white mt-0.5">{deliveryLocation}</p>
                </div>
                <button
                  onClick={() => useUIStore.getState().openModal("location")}
                  className="text-amazon-orange hover:underline font-bold"
                >
                  Edit
                </button>
              </div>

              <div className="pt-2">
                {session ? (
                  <button
                    onClick={() => {
                      signOut();
                      closeModal();
                      addToast({ message: "Signed out successfully", type: "info" });
                    }}
                    className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-300 font-bold py-3 rounded-xl transition-colors"
                  >
                    Sign Out
                  </button>
                ) : (
                  <Link
                    href="/login"
                    onClick={closeModal}
                    className="w-full bg-amazon-orange hover:bg-amazon-orange-hover text-black font-bold py-3 rounded-xl flex items-center justify-center transition-colors text-sm"
                  >
                    Sign In / Register
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
