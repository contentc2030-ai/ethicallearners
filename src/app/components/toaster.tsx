"use client";

import { useToast } from "@/hooks/use-toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`p-3 rounded-md shadow-lg transition-all duration-300 ${
            toast.className || "bg-gray-900 text-white"
          }`}
        >
          {toast.title && <strong className="block mb-1">{toast.title}</strong>}
          {toast.description && <p>{toast.description}</p>}
          {toast.action && <div className="mt-2">{toast.action}</div>}
        </div>
      ))}
    </div>
  );
}
