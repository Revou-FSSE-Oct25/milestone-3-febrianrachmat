import "../styles/globals.css";
import { CartProvider } from "../context/cartcontext";
import { AuthProvider } from "../context/authcontext";
import { ToastProvider } from "../context/toastcontext";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <CartProvider>
        <ToastProvider>
          <Component {...pageProps} />
        </ToastProvider>
      </CartProvider>
    </AuthProvider>
  );
}
