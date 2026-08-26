"use client";

import { useState } from "react";
import { signIn, signUp } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
          router.push("/");
          router.refresh();
        }
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#e3e6e6] flex flex-col items-center pt-8">
      {/* Logo */}
      <div className="mb-6">
        <h1 className="font-outfit font-black text-3xl tracking-tighter">
          Jontro<span className="text-amazon-orange">Ghor</span>
        </h1>
      </div>

      {/* Auth Card */}
      <div className="bg-white p-6 rounded-md shadow-sm w-full max-w-[350px] border border-gray-300">
        <h2 className="text-2xl font-normal mb-4">
          {isLogin ? "Sign in" : "Create account"}
        </h2>

        {error && (
          <div className="text-red-600 text-sm mb-4 border border-red-200 bg-red-50 p-2 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {!isLogin && (
            <div className="flex flex-col gap-1">
              <label className="text-sm font-bold">Your name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={!isLogin}
                className="border border-gray-400 rounded px-3 py-1 focus:ring-1 focus:ring-amazon-orange focus:border-amazon-orange outline-none"
              />
            </div>
          )}

          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border border-gray-400 rounded px-3 py-1 focus:ring-1 focus:ring-amazon-orange focus:border-amazon-orange outline-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border border-gray-400 rounded px-3 py-1 focus:ring-1 focus:ring-amazon-orange focus:border-amazon-orange outline-none"
            />
            {!isLogin && (
              <span className="text-xs text-gray-600">Passwords must be at least 8 characters.</span>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amazon-light-orange hover:bg-amazon-orange border border-[#a88734] mt-2 py-1.5 rounded-sm shadow-sm text-sm"
          >
            {loading ? "Please wait..." : isLogin ? "Sign in" : "Continue"}
          </button>
        </form>

        <div className="mt-6 text-xs text-gray-800">
          By continuing, you agree to JontroGhor's <a href="#" className="text-blue-600 hover:underline hover:text-red-600">Conditions of Use</a> and <a href="#" className="text-blue-600 hover:underline hover:text-red-600">Privacy Notice</a>.
        </div>
      </div>

      {/* Toggle mode */}
      <div className="w-full max-w-[350px] mt-4">
        {isLogin ? (
          <>
            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="flex-shrink-0 mx-4 text-xs text-gray-500">New to JontroGhor?</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            <button
              onClick={() => setIsLogin(false)}
              className="w-full bg-gray-100 hover:bg-gray-200 border border-gray-300 shadow-sm py-1.5 rounded-sm text-sm mt-2"
            >
              Create your JontroGhor account
            </button>
          </>
        ) : (
          <div className="mt-4 text-sm bg-gray-50 p-4 border border-gray-200 shadow-inner rounded">
            Already have an account?{" "}
            <button onClick={() => setIsLogin(true)} className="text-blue-600 hover:underline hover:text-red-600">
              Sign in
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
