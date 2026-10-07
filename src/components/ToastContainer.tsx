"use client";

import { useUIStore } from "@/lib/store";
import { X, CheckCircle2, AlertCircle, Info, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function ToastContainer() {
  const { toasts, removeToast } = useUIStore();

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => {
          const isSuccess = toast.type === "success" || !toast.type;
          const isError = toast.type === "error";
          const isWarning = toast.type === "warning";

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className={`pointer-events-auto p-4 rounded-2xl shadow-2xl backdrop-blur-xl border flex items-start gap-3 text-white ${
                isError
                  ? "bg-red-950/90 border-red-500/40 text-red-100"
                  : isWarning
                  ? "bg-amber-950/90 border-amber-500/40 text-amber-100"
                  : "bg-slate-900/95 border-amazon-orange/40 text-slate-100 shadow-[0_10px_35px_rgba(254,189,105,0.15)]"
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {isError ? (
                  <AlertCircle size={20} className="text-red-400" />
                ) : isWarning ? (
                  <AlertCircle size={20} className="text-amber-400" />
                ) : (
                  <CheckCircle2 size={20} className="text-amazon-orange" />
                )}
              </div>

              <div className="flex-1 text-sm">
                <p className="font-medium leading-snug">{toast.message}</p>
                {toast.actionHref && toast.actionLabel && (
                  <Link
                    href={toast.actionHref}
                    onClick={() => removeToast(toast.id)}
                    className="inline-flex items-center gap-1.5 mt-2 text-xs font-bold text-amazon-orange hover:text-yellow-300 underline underline-offset-2"
                  >
                    <ShoppingCart size={14} />
                    {toast.actionLabel}
                  </Link>
                )}
              </div>

              <button
                onClick={() => removeToast(toast.id)}
                className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors shrink-0"
                aria-label="Close notification"
              >
                <X size={16} />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
