import "../styles/globals.css";
import { Inter, Playfair_Display } from "next/font/google";
import { CartProvider } from "../context/cartcontext";
import { AuthProvider } from "../context/authcontext";
import { ToastProvider } from "../context/toastcontext";
import { ThemeProvider } from "../context/themecontext";
import ErrorBoundary from "../components/errorboundary";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export default function App({ Component, pageProps }) {
  return (
    <div className={`${inter.variable} ${playfair.variable}`}>
      <ErrorBoundary>
        <ThemeProvider>
          <AuthProvider>
            <CartProvider>
              <ToastProvider>
                <Component {...pageProps} />
              </ToastProvider>
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </div>
  );
}
