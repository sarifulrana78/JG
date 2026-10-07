"use client";

import Link from "next/link";
import { ChevronUp, Mail, Send, MapPin, Phone, CreditCard, Smartphone, ShieldCheck, Truck, HeadphonesIcon, Check } from "lucide-react";
import { useState } from "react";
import { useUIStore } from "@/lib/store";

// Inline social icons
const FacebookIcon = ({ size = 16, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const TwitterIcon = ({ size = 16, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const InstagramIcon = ({ size = 16, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
  </svg>
);
const YoutubeIcon = ({ size = 16, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon fill="#000" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
  </svg>
);

export default function Footer() {
  const { openModal, addToast } = useUIStore();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes("@")) {
      addToast({ message: "Please enter a valid email address.", type: "warning" });
      return;
    }
    setIsSubscribed(true);
    addToast({ 
      message: "🎉 Thank you for subscribing! Use code JONTRO10 for 10% off.", 
      type: "success" 
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full flex flex-col mt-20 relative font-outfit">
      {/* Features/Guarantee Strip - Interactive Cards */}
      <div className="bg-amazon-dark border-b border-white/10 relative z-20">
        <div className="max-w-[1200px] mx-auto py-6 px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <button 
            type="button"
            onClick={() => openModal("customer-service")}
            className="flex items-center gap-4 group cursor-pointer text-left p-2 rounded-xl hover:bg-white/5 transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-amazon-orange/10 flex items-center justify-center group-hover:bg-amazon-orange/20 transition-colors">
              <Truck className="text-amazon-orange group-hover:scale-110 transition-transform" size={24} />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm group-hover:text-amazon-orange transition-colors">Fast Delivery</h4>
              <p className="text-gray-400 text-xs">24-48h all across BD</p>
            </div>
          </button>

          <button 
            type="button"
            onClick={() => openModal("customer-service")}
            className="flex items-center gap-4 group cursor-pointer text-left p-2 rounded-xl hover:bg-white/5 transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-amazon-orange/10 flex items-center justify-center group-hover:bg-amazon-orange/20 transition-colors">
              <ShieldCheck className="text-amazon-orange group-hover:scale-110 transition-transform" size={24} />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm group-hover:text-amazon-orange transition-colors">Secure Payment</h4>
              <p className="text-gray-400 text-xs">bKash, Nagad, Cards & COD</p>
            </div>
          </button>

          <button 
            type="button"
            onClick={() => openModal("track-order")}
            className="flex items-center gap-4 group cursor-pointer text-left p-2 rounded-xl hover:bg-white/5 transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-amazon-orange/10 flex items-center justify-center group-hover:bg-amazon-orange/20 transition-colors">
              <CreditCard className="text-amazon-orange group-hover:scale-110 transition-transform" size={24} />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm group-hover:text-amazon-orange transition-colors">Easy Returns</h4>
              <p className="text-gray-400 text-xs">7 Days replacement policy</p>
            </div>
          </button>

          <button 
            type="button"
            onClick={() => openModal("customer-service")}
            className="flex items-center gap-4 group cursor-pointer text-left p-2 rounded-xl hover:bg-white/5 transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-amazon-orange/10 flex items-center justify-center group-hover:bg-amazon-orange/20 transition-colors">
              <HeadphonesIcon className="text-amazon-orange group-hover:scale-110 transition-transform" size={24} />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm group-hover:text-amazon-orange transition-colors">24/7 Support</h4>
              <p className="text-gray-400 text-xs">Direct Hotline & Chat</p>
            </div>
          </button>
        </div>
      </div>

      {/* Decorative Top Gradient Border */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-amazon-orange to-transparent opacity-50 relative z-20"></div>
      
      {/* Back to top - Premium Interactive Button */}
      <div className="bg-amazon-light/95 backdrop-blur-sm relative z-10 border-b border-white/5">
        <button 
          type="button"
          onClick={scrollToTop} 
          className="flex flex-col items-center justify-center text-white text-center py-4 hover:bg-amazon-light-hover w-full transition-colors group cursor-pointer"
          title="Scroll back to top"
        >
          <ChevronUp size={20} className="text-amazon-orange group-hover:-translate-y-1 transition-transform" />
          <span className="text-xs font-semibold tracking-wider uppercase mt-1">Back to top</span>
        </button>
      </div>

      {/* Main Footer Links - Modern Grid */}
      <div className="bg-amazon-dark text-white py-16 px-6 md:px-12 relative overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-amazon-orange/5 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 relative z-10">
          
          {/* Column 1: About & Contact */}
          <div className="flex flex-col gap-5">
            <Link href="/" className="font-outfit font-black text-3xl tracking-tighter inline-block mb-2">
              <span className="text-white">Jontro</span>
              <span className="text-amazon-orange">Ghor</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-2">
              Your trusted destination for premium electronics, gadgets, and tech accessories in Bangladesh. Experience shopping like never before.
            </p>
            <div className="flex flex-col gap-3 mt-2 text-sm">
              <button
                type="button"
                onClick={() => openModal("store-locator")}
                className="flex items-start gap-3 group text-left cursor-pointer hover:text-white"
              >
                <MapPin className="text-amazon-orange mt-0.5 group-hover:scale-110 transition-transform shrink-0" size={18} />
                <span className="text-gray-300 group-hover:text-amazon-orange transition-colors">
                  House 72, Road No. 11, Banani, Dhaka 1213
                </span>
              </button>

              <a href="tel:01335069851" className="flex items-center gap-3 group">
                <Phone className="text-amazon-orange group-hover:scale-110 transition-transform shrink-0" size={18} />
                <span className="text-gray-300 group-hover:text-amazon-orange transition-colors">01335-069851 (9:30 AM - 9:00 PM)</span>
              </a>

              <a href="mailto:support@jontroghor.com" className="flex items-center gap-3 group">
                <Mail className="text-amazon-orange group-hover:scale-110 transition-transform shrink-0" size={18} />
                <span className="text-gray-300 group-hover:text-amazon-orange transition-colors">support@jontroghor.com</span>
              </a>
            </div>
          </div>

          {/* Column 2: Customer Care */}
          <div className="flex flex-col gap-4">
            <h3 className="font-outfit font-bold text-lg mb-2 relative inline-block after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-10 after:h-[2px] after:bg-amazon-orange">
              Customer Care
            </h3>
            
            <button 
              type="button" 
              onClick={() => openModal("customer-service")} 
              className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2 group text-left"
            >
              <span className="w-0 h-[1px] bg-amazon-orange group-hover:w-3 transition-all"></span>Help Center
            </button>

            <button 
              type="button" 
              onClick={() => openModal("customer-service")} 
              className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2 group text-left"
            >
              <span className="w-0 h-[1px] bg-amazon-orange group-hover:w-3 transition-all"></span>How to Buy
            </button>

            <button 
              type="button" 
              onClick={() => openModal("track-order")} 
              className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2 group text-left"
            >
              <span className="w-0 h-[1px] bg-amazon-orange group-hover:w-3 transition-all"></span>Returns & Refunds
            </button>

            <button 
              type="button" 
              onClick={() => openModal("track-order")} 
              className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2 group text-left"
            >
              <span className="w-0 h-[1px] bg-amazon-orange group-hover:w-3 transition-all"></span>Track Your Order
            </button>

            <button 
              type="button" 
              onClick={() => openModal("customer-service")} 
              className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2 group text-left"
            >
              <span className="w-0 h-[1px] bg-amazon-orange group-hover:w-3 transition-all"></span>Corporate & Bulk Purchasing
            </button>
          </div>

          {/* Column 3: Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="font-outfit font-bold text-lg mb-2 relative inline-block after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-10 after:h-[2px] after:bg-amazon-orange">
              Quick Links
            </h3>

            <button 
              type="button" 
              onClick={() => openModal("terms")} 
              className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2 group text-left"
            >
              <span className="w-0 h-[1px] bg-amazon-orange group-hover:w-3 transition-all"></span>About JontroGhor
            </button>

            <button 
              type="button" 
              onClick={() => openModal("terms")} 
              className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2 group text-left"
            >
              <span className="w-0 h-[1px] bg-amazon-orange group-hover:w-3 transition-all"></span>Terms & Conditions
            </button>

            <button 
              type="button" 
              onClick={() => openModal("privacy")} 
              className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2 group text-left"
            >
              <span className="w-0 h-[1px] bg-amazon-orange group-hover:w-3 transition-all"></span>Privacy Policy
            </button>

            <button 
              type="button" 
              onClick={() => openModal("sell")} 
              className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2 group text-left"
            >
              <span className="w-0 h-[1px] bg-amazon-orange group-hover:w-3 transition-all"></span>Sell on JontroGhor
            </button>

            <button 
              type="button" 
              onClick={() => openModal("store-locator")} 
              className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2 group text-left"
            >
              <span className="w-0 h-[1px] bg-amazon-orange group-hover:w-3 transition-all"></span>Store Locator
            </button>
          </div>

          {/* Column 4: Newsletter & Apps */}
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="font-outfit font-bold text-lg mb-4 relative inline-block after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-10 after:h-[2px] after:bg-amazon-orange">
                Newsletter
              </h3>
              <p className="text-xs text-gray-400 mb-3">
                Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
              </p>
              
              {isSubscribed ? (
                <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-xl text-green-300 text-xs flex items-center gap-2">
                  <Check size={16} /> Subscribed! Use code <strong className="text-amazon-orange">JONTRO10</strong>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex items-center gap-2">
                  <input 
                    type="email" 
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Your email address" 
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-3 pr-3 text-white placeholder-gray-500 focus:outline-none focus:border-amazon-orange focus:bg-white/10 transition-all text-sm"
                  />
                  <button 
                    type="submit" 
                    className="bg-amazon-orange text-black rounded-lg p-2 hover:bg-[#e89115] transition-all flex-shrink-0 group/btn h-[38px] w-[38px] flex items-center justify-center cursor-pointer"
                    title="Subscribe"
                  >
                    <Send size={16} className="group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>
                </form>
              )}
            </div>
            
            <div>
              <h3 className="font-outfit font-bold text-sm mb-3">Download Our App</h3>
              <div className="flex gap-3">
                <button 
                  type="button"
                  onClick={() => openModal("app-download")} 
                  className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 hover:bg-white/10 transition-colors text-left"
                >
                  <div className="w-6 h-6 flex items-center justify-center"><Smartphone size={18} className="text-white" /></div>
                  <div className="flex flex-col">
                    <span className="text-[9px] text-gray-400 uppercase tracking-wider leading-none">Get it on</span>
                    <span className="text-xs font-semibold text-white leading-tight">Google Play</span>
                  </div>
                </button>

                <button 
                  type="button"
                  onClick={() => openModal("app-download")} 
                  className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 hover:bg-white/10 transition-colors text-left"
                >
                   <div className="w-6 h-6 flex items-center justify-center"><Smartphone size={18} className="text-white" /></div>
                  <div className="flex flex-col">
                    <span className="text-[9px] text-gray-400 uppercase tracking-wider leading-none">Download on the</span>
                    <span className="text-xs font-semibold text-white leading-tight">App Store</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods & Socials */}
        <div className="max-w-[1200px] mx-auto mt-16 pt-8 border-t border-white/10 flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <span className="text-sm font-semibold text-white">Payment Methods:</span>
            <div className="flex items-center gap-3 flex-wrap justify-center">
               <button onClick={() => openModal("customer-service")} className="h-8 px-3 bg-white flex items-center justify-center rounded text-xs font-black text-blue-800 italic hover:scale-105 transition-transform">VISA</button>
               <button onClick={() => openModal("customer-service")} className="h-8 px-3 bg-white flex items-center justify-center rounded text-xs font-bold text-red-600 hover:scale-105 transition-transform">MasterCard</button>
               <button onClick={() => openModal("customer-service")} className="h-8 px-3 bg-[#E2136E] flex items-center justify-center rounded text-xs font-bold text-white hover:scale-105 transition-transform">bKash</button>
               <button onClick={() => openModal("customer-service")} className="h-8 px-3 bg-[#EC1C24] flex items-center justify-center rounded text-xs font-bold text-white hover:scale-105 transition-transform">Nagad</button>
               <button onClick={() => openModal("customer-service")} className="h-8 px-3 bg-gray-200 flex items-center justify-center rounded text-xs font-bold text-black border border-gray-300 hover:scale-105 transition-transform">COD</button>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-white mr-2">Follow Us:</span>
            <button 
              type="button" 
              onClick={() => { window.open("https://facebook.com", "_blank"); }} 
              className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-amazon-orange hover:text-black transition-colors group/social cursor-pointer"
              title="Facebook"
            >
              <FacebookIcon size={16} className="group-hover/social:scale-110 transition-transform" />
            </button>
            <button 
              type="button" 
              onClick={() => { window.open("https://twitter.com", "_blank"); }} 
              className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-amazon-orange hover:text-black transition-colors group/social cursor-pointer"
              title="Twitter / X"
            >
              <TwitterIcon size={16} className="group-hover/social:scale-110 transition-transform" />
            </button>
            <button 
              type="button" 
              onClick={() => { window.open("https://instagram.com", "_blank"); }} 
              className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-amazon-orange hover:text-black transition-colors group/social cursor-pointer"
              title="Instagram"
            >
              <InstagramIcon size={16} className="group-hover/social:scale-110 transition-transform" />
            </button>
            <button 
              type="button" 
              onClick={() => { window.open("https://youtube.com", "_blank"); }} 
              className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-amazon-orange hover:text-black transition-colors group/social cursor-pointer"
              title="YouTube"
            >
              <YoutubeIcon size={16} className="group-hover/social:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Footer - Minimalist Copyright */}
      <div className="bg-[#0b0f14] text-gray-500 py-6 px-4 flex flex-col md:flex-row items-center justify-between">
        <div className="max-w-[1200px] mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-xs">© 2026 JontroGhor.com. All Rights Reserved.</span>
          <div className="flex gap-4 text-xs">
            <button type="button" onClick={() => openModal("privacy")} className="hover:text-white transition-colors cursor-pointer">
              Privacy Policy
            </button>
            <span className="text-gray-700">|</span>
            <button type="button" onClick={() => openModal("terms")} className="hover:text-white transition-colors cursor-pointer">
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
