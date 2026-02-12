import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "../context/cartcontext";
import { AuthContext } from "../context/authcontext";

export default function Layout({ children }) {
  const { cartCount } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);

  return (
    <>
      <nav>
        <div className="nav-left">
          <Link href="/">Home</Link>
          <Link href="/promo">Promo</Link>
          <Link href="/faq">FAQ</Link>

          <Link href="/cart" className="cart-link">
            Cart
            {cartCount > 0 && (
              <span className="cart-badge">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        <div className="nav-right">
          {user ? (
            <button onClick={logout} className="logout-btn">
              Logout
            </button>
          ) : (
            <Link href="/login">Login</Link>
          )}
        </div>
      </nav>

      <main>{children}</main>
    </>
  );
}
