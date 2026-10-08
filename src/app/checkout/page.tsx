"use client";

import { useCartStore, useUIStore } from "@/lib/store";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CreditCard, Truck, ShieldCheck, ChevronRight, Tag, X, Check, Smartphone, Banknote } from "lucide-react";
import Image from "next/image";

// Demo promo codes
const PROMO_CODES: Record<string, number> = {
  JONTRO10: 0.10,
  SAVE20: 0.20,
  WELCOME15: 0.15,
};

export default function CheckoutPage() {
  const { cartItems, getTotalPrice, clearCart } = useCartStore();
  const { deliveryLocation, addToast, addOrder } = useUIStore();
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bkash' | 'cod'>('card');
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>(null);
  const [promoError, setPromoError] = useState("");

  // Form Fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState(deliveryLocation.split(",")[0] || "Dhaka");
  const [phone, setPhone] = useState("");
  
  // Card Fields
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");

  // bKash Fields
  const [bkashNumber, setBkashNumber] = useState("");
  const [bkashTrxId, setBkashTrxId] = useState("");

  const applyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    const disc = PROMO_CODES[code];
    if (disc) {
      setAppliedPromo({ code, discount: disc });
      setPromoError("");
      addToast({ message: `Promo code ${code} applied! Saved ${(disc * 100)}% 🎉`, type: "success" });
    } else {
      setPromoError("Invalid code. Try JONTRO10 or SAVE20.");
      setAppliedPromo(null);
    }
  };

  const subtotal = getTotalPrice();
  const discountAmount = appliedPromo ? subtotal * appliedPromo.discount : 0;
  const finalTotal = Math.max(0, subtotal - discountAmount);

  useEffect(() => {
    setIsMounted(true);
    if (cartItems.length === 0) {
      router.push('/cart');
    }
  }, [cartItems, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const generatedOrderId = `JG-${Math.floor(100000 + Math.random() * 900000)}`;

    setTimeout(() => {
      // Save order to store
      addOrder({
        orderId: generatedOrderId,
        date: "Just now",
        total: finalTotal,
        status: "Processing",
        paymentMethod: paymentMethod === 'card' ? 'Credit Card' : paymentMethod === 'bkash' ? 'bKash' : 'Cash on Delivery',
        shippingAddress: `${address}, ${city} (Phone: ${phone})`,
        items: [...cartItems],
      });

      clearCart();
      router.push(`/checkout/success?orderId=${generatedOrderId}`);
    }, 1500);
  };

  if (!isMounted || cartItems.length === 0) return null;

  return (
    <div className="min-h-screen bg-[#0f141a] text-white py-12 px-4 sm:px-6 font-outfit">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-8 font-medium">
          <Link href="/cart" className="hover:text-amazon-orange transition-colors cursor-pointer">
            Cart
          </Link>{" "}
          <ChevronRight size={14} /> <span className="text-white font-bold">Checkout</span>
        </div>
        
        <h1 className="text-3xl font-black mb-8">Secure Checkout</h1>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left Column: Form */}
          <div className="flex-1">
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              
              {/* Shipping Address */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <Truck className="text-amazon-orange" /> Shipping Information
                  </h2>
                  <button
                    type="button"
                    onClick={() => {
                      setFirstName("Rana");
                      setLastName("Bhai");
                      setAddress("House 72, Road 11, Banani");
                      setCity("Dhaka");
                      setPhone("01711000000");
                      if (paymentMethod === "card") {
                        setCardNumber("4242 4242 4242 4242");
                        setCardExpiry("12/28");
                        setCardCvc("789");
                      } else if (paymentMethod === "bkash") {
                        setBkashNumber("01711000000");
                        setBkashTrxId("BL92KJ7P");
                      }
                      addToast({ message: "Sample address & details filled in! ⚡", type: "info" });
                    }}
                    className="text-xs text-amazon-orange hover:underline font-bold cursor-pointer"
                  >
                    ⚡ Autofill Sample Info
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-gray-300">First Name</label>
                    <input 
                      required 
                      type="text" 
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-amazon-orange transition-colors" 
                      placeholder="e.g. Tanvir" 
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-gray-300">Last Name</label>
                    <input 
                      required 
                      type="text" 
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-amazon-orange transition-colors" 
                      placeholder="e.g. Ahmed" 
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 md:col-span-2">
                    <label className="text-sm font-semibold text-gray-300">Address</label>
                    <input 
                      required 
                      type="text" 
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-amazon-orange transition-colors" 
                      placeholder="House, Road, Area (e.g. Banani, Road 11)" 
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-gray-300">City / District</label>
                    <input 
                      required 
                      type="text" 
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-amazon-orange transition-colors" 
                      placeholder="Dhaka" 
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-gray-300">Phone</label>
                    <input 
                      required 
                      type="tel" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-amazon-orange transition-colors" 
                      placeholder="+880 17..." 
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2 border-b border-white/10 pb-4">
                  <CreditCard className="text-amazon-orange" /> Payment Method
                </h2>
                
                <div className="flex flex-col gap-3">
                  {/* Card Option */}
                  <label 
                    onClick={() => setPaymentMethod('card')}
                    className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all ${
                      paymentMethod === 'card' 
                        ? 'border-amazon-orange bg-amazon-orange/10 shadow-md' 
                        : 'border-white/10 bg-black/20 hover:border-white/20'
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="payment" 
                      checked={paymentMethod === 'card'} 
                      onChange={() => setPaymentMethod('card')}
                      className="w-5 h-5 accent-amazon-orange" 
                    />
                    <div className="flex items-center justify-between flex-1">
                      <span className="font-semibold flex items-center gap-2">
                        <CreditCard size={18} className="text-amazon-orange" /> Credit / Debit Card (VISA, MasterCard)
                      </span>
                      <span className="text-xs text-gray-400">Instant</span>
                    </div>
                  </label>

                  {/* bKash Option */}
                  <label 
                    onClick={() => setPaymentMethod('bkash')}
                    className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all ${
                      paymentMethod === 'bkash' 
                        ? 'border-amazon-orange bg-amazon-orange/10 shadow-md' 
                        : 'border-white/10 bg-black/20 hover:border-white/20'
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="payment" 
                      checked={paymentMethod === 'bkash'} 
                      onChange={() => setPaymentMethod('bkash')}
                      className="w-5 h-5 accent-amazon-orange" 
                    />
                    <div className="flex items-center justify-between flex-1">
                      <span className="font-semibold flex items-center gap-2">
                        <Smartphone size={18} className="text-pink-500" /> bKash / Nagad Mobile Banking
                      </span>
                      <span className="text-xs bg-pink-500/20 text-pink-300 px-2 py-0.5 rounded-full font-bold">Fast</span>
                    </div>
                  </label>

                  {/* COD Option */}
                  <label 
                    onClick={() => setPaymentMethod('cod')}
                    className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all ${
                      paymentMethod === 'cod' 
                        ? 'border-amazon-orange bg-amazon-orange/10 shadow-md' 
                        : 'border-white/10 bg-black/20 hover:border-white/20'
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="payment" 
                      checked={paymentMethod === 'cod'} 
                      onChange={() => setPaymentMethod('cod')}
                      className="w-5 h-5 accent-amazon-orange" 
                    />
                    <div className="flex items-center justify-between flex-1">
                      <span className="font-semibold flex items-center gap-2">
                        <Banknote size={18} className="text-green-400" /> Cash on Delivery (COD)
                      </span>
                      <span className="text-xs text-green-400 font-bold">Pay at Doorstep</span>
                    </div>
                  </label>
                </div>
                
                {/* Method Specific Inputs */}
                {paymentMethod === 'card' && (
                  <div className="mt-6 flex flex-col gap-4 pt-6 border-t border-white/10">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-semibold text-gray-300">Card Number</label>
                      <input 
                        required={paymentMethod === 'card'} 
                        type="text" 
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-amazon-orange transition-colors font-mono" 
                        placeholder="4111 2222 3333 4444" 
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-gray-300">Expiry</label>
                        <input 
                          required={paymentMethod === 'card'} 
                          type="text" 
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-amazon-orange transition-colors font-mono" 
                          placeholder="MM/YY" 
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-gray-300">CVC</label>
                        <input 
                          required={paymentMethod === 'card'} 
                          type="text" 
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-amazon-orange transition-colors font-mono" 
                          placeholder="123" 
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'bkash' && (
                  <div className="mt-6 p-4 rounded-xl bg-pink-950/20 border border-pink-500/30 flex flex-col gap-4 text-xs">
                    <div className="space-y-1">
                      <h4 className="font-bold text-pink-300 text-sm">bKash Payment Guide:</h4>
                      <p className="text-gray-300">1. Open bKash App & tap <strong>Make Payment</strong></p>
                      <p className="text-gray-300">2. Merchant Number: <strong className="text-amazon-orange font-mono text-sm">01335-069851</strong></p>
                      <p className="text-gray-300">3. Amount: <strong className="text-white">${finalTotal.toFixed(2)}</strong></p>
                      <p className="text-gray-300">4. Enter your bKash phone and the Transaction ID below:</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                      <div className="flex flex-col gap-1">
                        <label className="font-semibold text-gray-300">Your bKash Number</label>
                        <input 
                          required={paymentMethod === 'bkash'}
                          type="tel"
                          value={bkashNumber}
                          onChange={(e) => setBkashNumber(e.target.value)}
                          placeholder="01XXXXXXXXX"
                          className="bg-black/50 border border-white/10 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-pink-500"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="font-semibold text-gray-300">Transaction ID (TrxID)</label>
                        <input 
                          required={paymentMethod === 'bkash'}
                          type="text"
                          value={bkashTrxId}
                          onChange={(e) => setBkashTrxId(e.target.value)}
                          placeholder="e.g. BL92KJ7P"
                          className="bg-black/50 border border-white/10 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-pink-500 uppercase font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'cod' && (
                  <div className="mt-6 p-4 rounded-xl bg-green-950/20 border border-green-500/30 text-xs text-gray-300 space-y-1">
                    <h4 className="font-bold text-green-400 text-sm flex items-center gap-1.5">
                      <Check size={16} /> Cash on Delivery Confirmed
                    </h4>
                    <p>You can pay in cash directly to our delivery courier when your order arrives at your address.</p>
                    <p className="text-gray-400">Total payable on delivery: <strong className="text-white font-mono text-sm">${finalTotal.toFixed(2)}</strong></p>
                  </div>
                )}
              </div>

              {/* Submit Order Button */}
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-amazon-orange hover:bg-amazon-orange-hover text-black py-4 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(254,189,105,0.3)] hover:shadow-[0_0_30px_rgba(254,189,105,0.5)] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed text-lg cursor-pointer"
              >
                {isSubmitting ? (
                   <span className="flex items-center gap-2">
                     <span className="w-5 h-5 rounded-full border-2 border-black border-t-transparent animate-spin" />
                     Processing Order...
                   </span>
                ) : (
                   <><ShieldCheck size={24} /> Place Order - ${finalTotal.toFixed(2)}</>
                )}
              </button>
            </form>
          </div>

          {/* Right Column: Order Summary */}
          <div className="w-full lg:w-[400px]">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sticky top-24 backdrop-blur-md">
              <h2 className="text-xl font-bold mb-6 pb-4 border-b border-white/10">Order Summary</h2>
              
              <div className="flex flex-col gap-4 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-lg relative overflow-hidden shrink-0 flex items-center justify-center">
                      <Image src={item.image} alt={item.name} fill className="object-contain p-1" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold line-clamp-2">{item.name}</div>
                      <div className="text-xs text-gray-400 mt-1">Qty: {item.quantity}</div>
                      <div className="text-sm font-bold text-amazon-orange mt-1">${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo Code */}
              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-sm font-semibold text-gray-300 mb-2 flex items-center gap-1">
                  <Tag size={14} className="text-amazon-orange" /> Promo Code
                </p>
                {appliedPromo ? (
                  <div className="flex items-center justify-between bg-green-500/10 border border-green-500/30 rounded-xl px-3 py-2">
                    <span className="text-green-400 text-sm font-bold">
                      {appliedPromo.code} — {(appliedPromo.discount * 100).toFixed(0)}% off
                    </span>
                    <button 
                      type="button"
                      onClick={() => setAppliedPromo(null)} 
                      className="text-gray-400 hover:text-red-400 transition-colors p-1"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      value={promoCode}
                      onChange={(e) => { setPromoCode(e.target.value); setPromoError(""); }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          applyPromo();
                        }
                      }}
                      placeholder="e.g. JONTRO10"
                      className="flex-1 bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-amazon-orange transition-colors font-mono uppercase"
                    />
                    <button 
                      type="button"
                      onClick={applyPromo} 
                      className="px-4 py-2 bg-amazon-orange hover:bg-amazon-orange-hover text-black text-sm font-bold rounded-xl transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                )}
                {promoError && <p className="text-red-400 text-xs mt-1.5">{promoError}</p>}
              </div>

              <div className="flex flex-col gap-3 pt-4 border-t border-white/10 mt-4 text-sm text-gray-300">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white font-medium">${subtotal.toFixed(2)}</span>
                </div>
                {appliedPromo && (
                  <div className="flex justify-between text-green-400">
                    <span>Discount ({(appliedPromo.discount * 100).toFixed(0)}%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-400 font-medium">Free</span>
                </div>
              </div>

              <div className="flex justify-between items-end pt-6 mt-4 border-t border-white/10">
                <span className="text-lg font-bold">Total</span>
                <span className="text-3xl font-black text-amazon-orange">${finalTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
