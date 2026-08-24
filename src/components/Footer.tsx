import Link from "next/link";
import { ChevronUp, Facebook, Twitter, Instagram, Youtube, Mail, Send } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full flex flex-col mt-20 relative">
      {/* Decorative Top Gradient Border */}
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-amazon-orange to-transparent opacity-70"></div>
      
      {/* Back to top - Premium Button */}
      <div className="bg-amazon-light/95 backdrop-blur-sm relative z-10">
        <a href="#" className="flex flex-col items-center justify-center text-white text-center py-5 hover:bg-amazon-light-hover w-full transition-colors group">
          <ChevronUp size={20} className="text-amazon-orange group-hover:-translate-y-1 transition-transform" />
          <span className="text-sm font-semibold tracking-wide uppercase mt-1">Back to top</span>
        </a>
      </div>

      {/* Main Footer Links - Modern Grid */}
      <div className="bg-amazon-dark text-white py-16 px-6 md:px-12 relative overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-amazon-orange/5 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 relative z-10">
          
          <div className="flex flex-col gap-4">
            <h3 className="font-outfit font-bold text-lg mb-2 relative inline-block after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-8 after:h-[2px] after:bg-amazon-orange">Get to Know Us</h3>
            <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"><span className="w-0 h-[1px] bg-amazon-orange group-hover:w-3 transition-all"></span>Careers</Link>
            <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"><span className="w-0 h-[1px] bg-amazon-orange group-hover:w-3 transition-all"></span>Blog</Link>
            <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"><span className="w-0 h-[1px] bg-amazon-orange group-hover:w-3 transition-all"></span>About JontroGhor</Link>
            <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"><span className="w-0 h-[1px] bg-amazon-orange group-hover:w-3 transition-all"></span>Investor Relations</Link>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-outfit font-bold text-lg mb-2 relative inline-block after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-8 after:h-[2px] after:bg-amazon-orange">Make Money with Us</h3>
            <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"><span className="w-0 h-[1px] bg-amazon-orange group-hover:w-3 transition-all"></span>Sell products</Link>
            <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"><span className="w-0 h-[1px] bg-amazon-orange group-hover:w-3 transition-all"></span>Sell on Business</Link>
            <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"><span className="w-0 h-[1px] bg-amazon-orange group-hover:w-3 transition-all"></span>Sell apps</Link>
            <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"><span className="w-0 h-[1px] bg-amazon-orange group-hover:w-3 transition-all"></span>Become an Affiliate</Link>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-outfit font-bold text-lg mb-2 relative inline-block after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-8 after:h-[2px] after:bg-amazon-orange">Payment Products</h3>
            <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"><span className="w-0 h-[1px] bg-amazon-orange group-hover:w-3 transition-all"></span>Business Card</Link>
            <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"><span className="w-0 h-[1px] bg-amazon-orange group-hover:w-3 transition-all"></span>Shop with Points</Link>
            <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"><span className="w-0 h-[1px] bg-amazon-orange group-hover:w-3 transition-all"></span>Reload Balance</Link>
            <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"><span className="w-0 h-[1px] bg-amazon-orange group-hover:w-3 transition-all"></span>Currency Converter</Link>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-outfit font-bold text-lg mb-2 relative inline-block after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-8 after:h-[2px] after:bg-amazon-orange">Let Us Help You</h3>
            <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"><span className="w-0 h-[1px] bg-amazon-orange group-hover:w-3 transition-all"></span>Your Account</Link>
            <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"><span className="w-0 h-[1px] bg-amazon-orange group-hover:w-3 transition-all"></span>Your Orders</Link>
            <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"><span className="w-0 h-[1px] bg-amazon-orange group-hover:w-3 transition-all"></span>Shipping Rates</Link>
            <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"><span className="w-0 h-[1px] bg-amazon-orange group-hover:w-3 transition-all"></span>Returns & Replacements</Link>
            <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"><span className="w-0 h-[1px] bg-amazon-orange group-hover:w-3 transition-all"></span>Help</Link>
          </div>

          <div className="flex flex-col gap-4 col-span-2 lg:col-span-1">
            <h3 className="font-outfit font-bold text-lg mb-2 relative inline-block after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-8 after:h-[2px] after:bg-amazon-orange">Our Stores</h3>
            <div className="text-sm text-gray-400">
              <strong className="text-white block mb-1">JontroGhor Banani</strong>
              House 72, Road No. 11<br/>
              South Breeze Housing Limited<br/>
              Dhaka 1213
            </div>
            <div className="text-sm text-gray-400 mt-2">
              <strong className="text-white">Phone:</strong> 01335-069851<br/>
              <strong className="text-white">Hours:</strong> 9:30 AM - 9:00 PM
            </div>
          </div>

        </div>

        {/* Unique Newsletter Section */}
        <div className="max-w-[900px] mx-auto mt-16 p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md relative overflow-hidden group">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-amazon-orange/20 rounded-full blur-3xl transition-transform group-hover:scale-150 duration-700"></div>
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl transition-transform group-hover:scale-150 duration-700"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-outfit font-bold text-white mb-2 flex items-center justify-center md:justify-start gap-2">
                <Mail className="text-amazon-orange" size={24} />
                Join the JontroGhor Insider
              </h3>
              <p className="text-sm text-gray-400">Get the latest tech news, exclusive offers, and early access to new gadgets.</p>
            </div>
            <div className="w-full md:w-auto flex items-center gap-2">
              <div className="relative w-full md:w-64">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full bg-white/10 border border-white/20 rounded-full py-2.5 pl-4 pr-10 text-white placeholder-gray-500 focus:outline-none focus:border-amazon-orange focus:ring-1 focus:ring-amazon-orange transition-all text-sm"
                />
              </div>
              <button className="bg-amazon-orange text-black rounded-full p-2.5 hover:bg-[#e89115] hover:scale-105 transition-all flex-shrink-0 group/btn">
                <Send size={18} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Social Links & Branding */}
        <div className="max-w-[1200px] mx-auto mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-2">
             <Link href="/" className="font-outfit font-black text-2xl tracking-tighter">
              <span className="text-white">Jontro</span>
              <span className="text-amazon-orange">Ghor</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-amazon-orange hover:text-black transition-colors group/social"><Facebook size={18} className="group-hover/social:scale-110 transition-transform" /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-amazon-orange hover:text-black transition-colors group/social"><Twitter size={18} className="group-hover/social:scale-110 transition-transform" /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-amazon-orange hover:text-black transition-colors group/social"><Instagram size={18} className="group-hover/social:scale-110 transition-transform" /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-amazon-orange hover:text-black transition-colors group/social"><Youtube size={18} className="group-hover/social:scale-110 transition-transform" /></a>
          </div>
        </div>
      </div>

      {/* Bottom Footer - Minimalist */}
      <div className="bg-[#0f141a] text-gray-400 flex flex-col items-center py-8 px-4">
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-4 text-xs font-medium">
          <Link href="#" className="hover:text-white hover:underline transition-colors">Conditions of Use</Link>
          <Link href="#" className="hover:text-white hover:underline transition-colors">Privacy Notice</Link>
          <Link href="#" className="hover:text-white hover:underline transition-colors">Consumer Health Data</Link>
          <Link href="#" className="hover:text-white hover:underline transition-colors">Your Ads Privacy Choices</Link>
        </div>
        <span className="text-xs">© 2026, JontroGhor.com, Inc. or its affiliates. All rights reserved.</span>
      </div>
    </footer>
  );
}
