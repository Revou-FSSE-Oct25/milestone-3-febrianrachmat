import "../styles/globals.css";
import { CartProvider } from "../context/cartcontext";


export default function App({ Component, pageProps }) {
return (
<CartProvider>
<Component {...pageProps} />
</CartProvider>
);
}