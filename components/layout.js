import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useCart } from "../context/cartcontext";
import { useAuth } from "../context/authcontext";
import { useTheme } from "../context/themecontext";

export default function Layout({ children }) {
  const { cartCount } = useCart();
  const { user, logout, isAdmin } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

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
      <nav className="app-nav sticky top-0 z-[1000] border-b border-black/8 backdrop-blur-sm">
        <div className="mx-auto flex h-[78px] max-w-[1280px] items-center justify-between px-6 md:px-10">
          <div className="flex items-center gap-8 md:gap-12">
            <Link
              href="/"
              className="font-serif text-2xl font-semibold tracking-[0.06em] no-underline hover:no-underline"
            >
              ETERE
            </Link>

            <div className="hidden items-center gap-7 sm:flex">
              <Link
                href="/"
                className="text-[13px] font-medium tracking-[0.18em] uppercase no-underline transition duration-300 hover:opacity-60 hover:no-underline"
              >
                Home
              </Link>
              <Link
                href="/promo"
                className="text-[13px] font-medium tracking-[0.18em] uppercase no-underline transition duration-300 hover:opacity-60 hover:no-underline"
              >
                Journal
              </Link>
              <Link
                href="/faq"
                className="text-[13px] font-medium tracking-[0.18em] uppercase no-underline transition duration-300 hover:opacity-60 hover:no-underline"
              >
                Atelier
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              className="theme-toggle-btn"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? "Light" : "Dark"}
            </button>
            <Link
              href="/cart"
              className="app-panel relative flex h-10 w-10 items-center justify-center rounded-full no-underline transition duration-300 hover:no-underline"
              aria-label="Cart"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path d="M6 6h15l-1.5 9h-12z" />
                <circle cx="9" cy="20" r="1" />
                <circle cx="18" cy="20" r="1" />
                <path d="M6 6L5 3H2" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -right-3 -top-2 rounded-full bg-[var(--text)] px-1.5 py-0.5 text-[11px] text-[var(--surface)]">
                  {cartCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full bg-[var(--text)] font-semibold text-[var(--surface)] transition duration-300 hover:scale-105"
                  onClick={() => setOpen(!open)}
                  aria-expanded={open}
                  aria-haspopup="true"
                  aria-label="User menu"
                >
                  {user.name?.charAt(0).toUpperCase() || user.username?.charAt(0).toUpperCase()}
                </button>

                {open && (
                  <div
                    className="app-panel absolute right-0 top-[52px] w-[220px] animate-[fadeIn_0.2s_ease] rounded-2xl p-3 shadow-[0_14px_30px_rgba(0,0,0,0.09)]"
                    role="menu"
                  >
                    <div className="mb-2 border-b border-[var(--line)] p-2 font-semibold">
                      User: {user.name || user.username}
                    </div>

                    <Link
                      href="/checkout"
                      className="block cursor-pointer rounded-xl p-2 text-sm no-underline transition duration-300 hover:bg-[var(--line-soft)] hover:no-underline"
                      role="menuitem"
                    >
                      Checkout
                    </Link>

                    <Link
                      href="/orders"
                      className="block cursor-pointer rounded-xl p-2 text-sm no-underline transition duration-300 hover:bg-[var(--line-soft)] hover:no-underline"
                      role="menuitem"
                    >
                      Orders
                    </Link>

                    {isAdmin && (
                      <Link
                        href="/admin"
                        className="block cursor-pointer rounded-xl p-2 text-sm no-underline transition duration-300 hover:bg-[var(--line-soft)] hover:no-underline"
                        role="menuitem"
                      >
                        Admin
                      </Link>
                    )}

                    <div className="my-2 h-px bg-[var(--line)]" />

                    <button
                      type="button"
                      className="w-full cursor-pointer rounded-xl border-none bg-transparent p-2 text-left text-sm text-red-600 transition duration-300 hover:bg-[var(--line-soft)]"
                      role="menuitem"
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
            ) : (
              <Link
                href="/login"
                className="btn-luxury-outline inline-flex items-center justify-center px-5 py-2 text-xs no-underline hover:no-underline"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
      <main className="mx-auto max-w-[1280px] px-5 py-10">{children}</main>
      <footer className="mt-20 border-t border-[var(--line)]">
        <div className="mx-auto grid max-w-[1280px] gap-8 px-5 py-12 md:grid-cols-4">
          <div>
            <p className="font-serif text-2xl tracking-[0.06em]">ETERE</p>
            <p className="app-text-muted mt-3 max-w-xs text-sm">
              Curated objects for modern living, shaped by editorial taste and timeless design.
            </p>
          </div>
          <div>
            <p className="app-text-muted mb-3 text-xs tracking-[0.18em] uppercase">Shop</p>
            <Link href="/#shop-collection" className="footer-link">
              Collection
            </Link>
            <Link href="/promo" className="footer-link">
              Promotions
            </Link>
            <Link href="/cart" className="footer-link">
              Your Bag
            </Link>
          </div>
          <div>
            <p className="app-text-muted mb-3 text-xs tracking-[0.18em] uppercase">About</p>
            <Link href="/promo" className="footer-link">
              Journal
            </Link>
            <Link href="/faq" className="footer-link">
              Atelier FAQ
            </Link>
            <Link href="/orders" className="footer-link">
              Orders
            </Link>
          </div>
          <div>
            <p className="app-text-muted mb-3 text-xs tracking-[0.18em] uppercase">Contact</p>
            <p className="app-text-muted text-sm">clientcare@etere.com</p>
            <p className="app-text-muted text-sm">+62 21 7788 9800</p>
            <p className="app-text-muted text-sm">Jakarta, Indonesia</p>
          </div>
        </div>
      </footer>
    </>
  );
}
