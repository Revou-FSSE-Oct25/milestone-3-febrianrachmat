import { createContext, useContext, useState, useCallback, useRef } from "react";

export const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);
  const timeoutRef = useRef(null);

  const dismissToast = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setToast(null);
  }, []);

  const showToast = useCallback(
    (message) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      setToast({ message, id: Date.now() });

      timeoutRef.current = setTimeout(() => {
        setToast(null);
        timeoutRef.current = null;
      }, 4000);
    },
    []
  );

  return (
    <ToastContext.Provider value={{ showToast, dismissToast }}>
      {children}
      {toast && (
        <div className="toast-luxury" role="status" key={toast.id}>
          <div className="min-w-0 flex-1">
            <p className="toast-luxury__eyebrow">ETERE</p>
            <p className="toast-luxury__message">{toast.message}</p>
          </div>
          <button
            type="button"
            className="toast-luxury__dismiss"
            aria-label="Dismiss notification"
            onClick={dismissToast}
          >
            ×
          </button>
        </div>
      )}
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
