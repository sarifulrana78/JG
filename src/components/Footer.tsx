import Link from "next/link";
import { ChevronUp } from "lucide-react";

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
        
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 relative z-10">
          
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
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-amazon-orange hover:text-black transition-colors font-bold text-xs">FB</a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-amazon-orange hover:text-black transition-colors font-bold text-xs">X</a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-amazon-orange hover:text-black transition-colors font-bold text-xs">IG</a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-amazon-orange hover:text-black transition-colors font-bold text-xs">YT</a>
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
