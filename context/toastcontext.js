import { createContext, useContext, useState, useCallback, useRef } from "react";

export const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);
  const timeoutRef = useRef(null);

  const showToast = useCallback((message) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setToast({ message, id: Date.now() });

    timeoutRef.current = setTimeout(() => {
      setToast(null);
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div
          className="fixed bottom-6 right-6 z-[2000] animate-[toast-in_0.25s_ease] rounded-lg bg-black px-5 py-3.5 text-sm font-medium text-white shadow-[0_8px_24px_rgba(0,0,0,0.15)]"
          role="status"
          key={toast.id}
        >
          {toast.message}
        </div>
      )}
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
