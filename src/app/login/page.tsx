"use client";

import { useState } from "react";
import { signIn, signUp } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUIStore } from "@/lib/store";
import { ShieldCheck, UserCheck, ArrowLeft } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { openModal, addToast } = useUIStore();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFillDemo = () => {
    setEmail("rana@jontroghor.com");
    setPassword("password123");
    if (!isLogin) setName("Rana Bhai");
    addToast({ message: "Demo credentials filled in! Click continue.", type: "info" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isLogin) {
        const { data, error } = await signIn.email({
          email,
          password,
        });
        if (error) throw new Error(error.message);
        if (data) {
          addToast({ message: "Signed in successfully! Welcome back.", type: "success" });
          router.push("/");
          router.refresh();
        }
      } else {
        const { data, error } = await signUp.email({
          email,
          password,
          name,
        });
        if (error) throw new Error(error.message);
        if (data) {
          addToast({ message: "Account created successfully! Welcome to JontroGhor.", type: "success" });
          router.push("/");
          router.refresh();
        }
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during authentication.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f141a] text-white flex flex-col items-center justify-center p-4 font-outfit relative">
      {/* Back to Home */}
      <Link 
        href="/" 
        className="absolute top-6 left-6 flex items-center gap-2 text-sm text-gray-400 hover:text-amazon-orange transition-colors"
      >
        <ArrowLeft size={16} /> Back to Store
      </Link>

      {/* Logo */}
      <div className="mb-6">
        <Link href="/" className="font-outfit font-black text-3xl tracking-tighter">
          <span className="text-white">Jontro</span>
          <span className="text-amazon-orange">Ghor</span>
        </Link>
      </div>

      {/* Auth Card */}
      <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl w-full max-w-[400px] shadow-2xl">
        <h2 className="text-2xl font-bold mb-6">
          {isLogin ? "Sign In" : "Create Account"}
        </h2>

        {error && (
          <div className="text-red-400 text-xs mb-4 border border-red-500/30 bg-red-500/10 p-3 rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {!isLogin && (
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-300">Your Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={!isLogin}
                placeholder="Rana Bhai"
                className="bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amazon-orange transition-colors"
              />
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-300">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amazon-orange transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amazon-orange transition-colors"
            />
            {!isLogin && (
              <span className="text-[11px] text-gray-400">Must be at least 8 characters.</span>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amazon-orange hover:bg-amazon-orange-hover text-black font-bold py-3 rounded-xl text-sm transition-all shadow-[0_0_20px_rgba(254,189,105,0.2)] mt-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? "Please wait..." : isLogin ? "Sign In" : "Continue"}
          </button>

          {/* Quick Demo Button */}
          <button
            type="button"
            onClick={handleFillDemo}
            className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 font-semibold py-2.5 rounded-xl text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <UserCheck size={14} className="text-amazon-orange" /> Autofill Demo Account
          </button>
        </form>

        <div className="mt-6 text-xs text-gray-400 text-center leading-relaxed">
          By continuing, you agree to JontroGhor's{" "}
          <button 
            type="button" 
            onClick={() => openModal("terms")} 
            className="text-amazon-orange hover:underline cursor-pointer"
          >
            Conditions of Use
          </button>{" "}
          and{" "}
          <button 
            type="button" 
            onClick={() => openModal("privacy")} 
            className="text-amazon-orange hover:underline cursor-pointer"
          >
            Privacy Notice
          </button>.
        </div>
      </div>

      {/* Toggle mode */}
      <div className="w-full max-w-[400px] mt-4">
        {isLogin ? (
          <button
            type="button"
            onClick={() => setIsLogin(false)}
            className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold py-3 rounded-2xl text-xs transition-colors cursor-pointer"
          >
            New to JontroGhor? Create Account
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setIsLogin(true)}
            className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold py-3 rounded-2xl text-xs transition-colors cursor-pointer"
          >
            Already have an account? Sign In
          </button>
        )}
      </div>
    </div>
  );
}
