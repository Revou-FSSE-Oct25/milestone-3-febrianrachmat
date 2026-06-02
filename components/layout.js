import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useCart } from "../context/cartcontext";
import { useAuth } from "../context/authcontext";

export default function Layout({ children }) {
  const { cartCount } = useCart();
  const { user, logout, isAdmin } = useAuth();

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
      <nav className="sticky top-0 z-[1000] h-[70px] border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-full max-w-[1200px] items-center justify-between px-6 md:px-10">
          <div className="flex items-center gap-8 md:gap-12">
            <Link href="/" className="text-xl font-bold tracking-wide no-underline hover:no-underline">
              RevoShop
            </Link>

            <div className="hidden items-center gap-7 sm:flex">
              <Link
                href="/"
                className="text-[15px] font-medium no-underline transition hover:opacity-60 hover:no-underline"
              >
                Home
              </Link>
              <Link
                href="/promo"
                className="text-[15px] font-medium no-underline transition hover:opacity-60 hover:no-underline"
              >
                Promo
              </Link>
              <Link
                href="/faq"
                className="text-[15px] font-medium no-underline transition hover:opacity-60 hover:no-underline"
              >
                FAQ
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <Link
              href="/cart"
              className="relative flex items-center justify-center text-xl no-underline hover:no-underline"
              aria-label="Cart"
            >
              🛒
              {cartCount > 0 && (
                <span className="absolute -right-2.5 -top-1.5 rounded-full bg-black px-1.5 py-0.5 text-[11px] text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  className="flex h-[38px] w-[38px] cursor-pointer items-center justify-center rounded-full bg-black font-semibold text-white transition hover:scale-105"
                  onClick={() => setOpen(!open)}
                  aria-expanded={open}
                  aria-haspopup="true"
                  aria-label="User menu"
                >
                  {user.username?.charAt(0).toUpperCase()}
                </button>

                {open && (
                  <div
                    className="absolute right-0 top-[50px] w-[200px] animate-[fadeIn_0.2s_ease] rounded-[10px] bg-white p-3 shadow-[0_8px_24px_rgba(0,0,0,0.1)]"
                    role="menu"
                  >
                    <div className="mb-2 border-b border-gray-200 p-2 font-semibold">
                      👤 {user.username}
                    </div>

                    <Link
                      href="/checkout"
                      className="block cursor-pointer rounded-md p-2 text-sm no-underline transition hover:bg-gray-100 hover:no-underline"
                      role="menuitem"
                    >
                      Checkout
                    </Link>

                    {isAdmin && (
                      <Link
                        href="/admin"
                        className="block cursor-pointer rounded-md p-2 text-sm no-underline transition hover:bg-gray-100 hover:no-underline"
                        role="menuitem"
                      >
                        Admin
                      </Link>
                    )}

                    <div className="my-2 h-px bg-gray-200" />

                    <button
                      type="button"
                      className="w-full cursor-pointer rounded-md border-none bg-transparent p-2 text-left text-sm text-red-600 transition hover:bg-gray-100"
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
                className="rounded-md border border-black px-4 py-2 text-sm font-semibold no-underline transition hover:bg-black hover:text-white hover:no-underline"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
      <main className="mx-auto max-w-[1200px] px-5 py-10">{children}</main>
    </>
  );
}
