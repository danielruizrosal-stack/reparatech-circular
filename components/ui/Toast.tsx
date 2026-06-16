'use client';

import { useState, useCallback } from 'react';

interface Toast {
  id: number;
  message: string;
}

let toastId = 0;

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string) => {
    const id = ++toastId;
    setToasts(prev => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 2500);
  }, []);

  return { toasts, showToast };
}

export function ToastContainer({ toasts }: { toasts: Toast[] }) {
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none">
      {toasts.map(t => (
        <div
          key={t.id}
          className="px-5 py-3 rounded-xl bg-brand-green text-black text-sm font-bold shadow-xl shadow-brand-green/20 animate-fade-up pointer-events-auto"
        >
          {t.message}
        </div>
      ))}
    </div>
  );
}
