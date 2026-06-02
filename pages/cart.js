import Link from "next/link";
import Layout from "../components/layout";
import ProductImage from "../components/productimage";
import { useCart } from "../context/cartcontext";
import { useRouter } from "next/router";

export default function CartPage() {
  const { cart, increaseQty, decreaseQty, removeFromCart, clearCart, cartTotal, cartCount } =
    useCart();

  const router = useRouter();

  if (cart.length === 0) {
    return (
      <Layout>
        <div className="luxury-surface app-panel mx-auto max-w-xl p-10 text-center md:p-14">
          <p className="page-eyebrow">Your Bag</p>
          <h1 className="page-title mt-3">The cart is empty</h1>
          <p className="app-text-muted mt-4 text-sm">
            Discover our curated collection — objects chosen with editorial intention.
          </p>
          <button type="button" className="btn-luxury mt-8" onClick={() => router.push("/")}>
            Continue Shopping
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <header className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="page-eyebrow">Your Bag</p>
          <h1 className="page-title mt-2">Shopping Cart</h1>
        </div>
        <p className="app-text-muted text-sm">
          {cartCount} {cartCount === 1 ? "piece" : "pieces"} selected
        </p>
      </header>

      <div className="grid gap-10 lg:grid-cols-[1.4fr_0.6fr]">
        <div className="flex flex-col gap-4">
          {cart.map((item) => (
            <article
              key={item.id}
              className="luxury-surface app-panel flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex flex-1 items-center gap-5">
                <div className="app-chip relative h-[110px] w-[110px] shrink-0 overflow-hidden rounded-2xl">
                  <ProductImage
                    src={item.image}
                    alt={item.title}
                    productId={item.id}
                    className="object-cover"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <Link
                    href={`/products/${item.id}`}
                    className="font-serif text-xl no-underline hover:no-underline"
                  >
                    {item.title}
                  </Link>
                  <p className="mt-1 text-sm font-semibold">${item.price}</p>

                  <div className="qty-control mt-4">
                    <button
                      type="button"
                      aria-label={`Decrease quantity for ${item.title}`}
                      className="qty-btn"
                      onClick={() => decreaseQty(item.id)}
                    >
                      -
                    </button>
                    <span className="min-w-[1.5rem] text-center text-sm font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      aria-label={`Increase quantity for ${item.title}`}
                      className="qty-btn"
                      onClick={() => increaseQty(item.id)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                <p className="app-text-muted text-sm font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  type="button"
                  className="app-text-muted text-xs tracking-[0.14em] uppercase underline-offset-4 transition hover:text-rose-700 hover:underline"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </article>
          ))}
        </div>

        <aside className="luxury-surface app-panel h-fit p-6 md:p-8 lg:sticky lg:top-28">
          <p className="page-eyebrow">Summary</p>
          <h2 className="mt-2 font-serif text-2xl">Order Total</h2>

          <div className="soft-divider my-6" />

          <div className="app-text-muted space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
          </div>

          <p className="mt-6 font-serif text-3xl font-medium">${cartTotal.toFixed(2)}</p>

          <div className="mt-8 flex flex-col gap-3">
            <button type="button" className="btn-luxury w-full" onClick={() => router.push("/checkout")}>
              Proceed to Checkout
            </button>
            <button type="button" className="btn-luxury-muted w-full" onClick={clearCart}>
              Clear Cart
            </button>
            <Link
              href="/#shop-collection"
              className="link-editorial mt-2 text-center text-xs tracking-[0.16em] uppercase no-underline"
            >
              Continue Shopping
            </Link>
          </div>
        </aside>
      </div>
    </Layout>
  );
}
