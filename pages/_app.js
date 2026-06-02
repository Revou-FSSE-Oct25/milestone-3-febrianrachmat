import "../styles/globals.css";
import { CartProvider } from "../context/cartcontext";
import { AuthProvider } from "../context/authcontext";
import { ToastProvider } from "../context/toastcontext";
import ErrorBoundary from "../components/errorboundary";

export default function App({ Component, pageProps }) {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <CartProvider>
          <ToastProvider>
            <Component {...pageProps} />
          </ToastProvider>
        </CartProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}
