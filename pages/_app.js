import "../styles/globals.css";
import { CartProvider } from "../context/cartcontext";
import { AuthProvider } from "../context/authcontext";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </AuthProvider>
  );
}
