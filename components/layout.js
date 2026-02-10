import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "../context/cartcontext";

export default function Layout({ children }) {
  const { cartCount } = useContext(CartContext);

  return (
    <>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/promo">Promo</Link>
        <Link href="/faq">FAQ</Link>
        <Link href="/cart">
          Cart {cartCount > 0 && `(${cartCount})`}
        </Link>
      </nav>

      <main>{children}</main>
    </>
  );
}
