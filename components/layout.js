import Link from "next/link";
import { useContext, useState, useRef, useEffect } from "react";
import { CartContext } from "../context/cartcontext";
import { AuthContext } from "../context/authcontext";

export default function Layout({ children }) {
  const { cartCount } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav className="navbar">
  <div className="nav-container">

    <div className="nav-left">
      <Link href="/" className="logo">RevoShop</Link>

      <div className="nav-links">
        <Link href="/">Home</Link>
        <Link href="/promo">Promo</Link>
        <Link href="/faq">FAQ</Link>
      </div>
    </div>

    <div className="nav-right">
      <Link href="/cart" className="cart-icon">
        🛒
        {cartCount > 0 && (
          <span className="cart-badge">{cartCount}</span>
        )}
      </Link>

      {user && (
        <div className="profile-wrapper" ref={dropdownRef}>
          <div
            className="avatar"
            onClick={() => setOpen(!open)}
          >
            {user.username?.charAt(0).toUpperCase()}
          </div>

          {open && (
            <div className="dropdown">
              <div className="dropdown-header">
                👤 {user.username}
              </div>

              <Link href="/checkout" className="dropdown-item">
                Checkout
              </Link>

              <div className="dropdown-divider"></div>

              <button
                className="dropdown-item logout"
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </div>

  </div>
</nav>
      <main>{children}</main>
    </>
  );
}
