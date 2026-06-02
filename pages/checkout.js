import { useState } from "react";
import Link from "next/link";
import { useCart } from "../context/cartcontext";
import { useToast } from "../context/toastcontext";
import Layout from "../components/layout";
import { useRouter } from "next/router";
import {
  createOrderPayload,
  saveOrder,
  validateCheckoutForm,
} from "../lib/order-storage";

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();
  const { showToast } = useToast();
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  if (cart.length === 0) {
    return (
      <Layout>
        <div className="luxury-surface app-panel mx-auto max-w-xl p-10 text-center md:p-14">
          <p className="page-eyebrow">Checkout</p>
          <h1 className="page-title mt-3">Nothing to checkout</h1>
          <p className="app-text-muted mt-4 text-sm">Your bag is empty. Add pieces from the collection first.</p>
          <Link href="/#shop-collection" className="btn-luxury mt-8 inline-flex no-underline hover:no-underline">
            Shop Collection
          </Link>
        </div>
      </Layout>
    );
  }

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setError(null);

    const validationError = validateCheckoutForm({
      fullName,
      address,
      city,
      paymentMethod,
    });

    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    const order = createOrderPayload({
      cart,
      cartTotal,
      fullName,
      address,
      city,
      paymentMethod,
    });

    saveOrder(order);
    clearCart();
    showToast("Order placed successfully");
    router.push("/orders");
  };

  return (
    <Layout>
      <header className="mb-10">
        <p className="page-eyebrow">Secure Checkout</p>
        <h1 className="page-title mt-2">Complete Your Order</h1>
      </header>

      <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <form
          onSubmit={handlePlaceOrder}
          className="luxury-surface app-panel flex flex-col gap-5 p-6 md:p-8"
        >
          <h2 className="font-serif text-2xl">Shipping Details</h2>

          <label className="form-label">
            Full Name
            <input
              type="text"
              placeholder="Your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="form-input"
              required
            />
          </label>

          <label className="form-label">
            Address
            <input
              type="text"
              placeholder="Street address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-input"
              required
            />
          </label>

          <label className="form-label">
            City
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="form-input"
              required
            />
          </label>

          <label className="form-label">
            Payment Method
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="form-input"
            >
              <option value="credit_card">Credit Card</option>
              <option value="bank_transfer">Bank Transfer</option>
            </select>
          </label>

          {error && (
            <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
              {error}
            </p>
          )}

          <button type="submit" className="btn-luxury mt-2 w-full sm:w-auto" disabled={loading}>
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </form>

        <aside className="luxury-surface app-panel h-fit p-6 md:p-8 lg:sticky lg:top-28">
          <p className="page-eyebrow">Order Summary</p>
          <h2 className="mt-2 font-serif text-2xl">Your Selection</h2>

          <div className="mt-6 flex flex-col gap-4">
            {cart.map((item) => (
              <div key={item.id} className="border-b border-[var(--line)] pb-4 last:border-0 last:pb-0">
                <p className="font-medium">{item.title}</p>
                <p className="app-text-muted mt-1 text-sm">
                  ${item.price} x {item.quantity}
                </p>
                <p className="mt-1 text-sm font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="soft-divider my-6" />

          <p className="app-text-muted text-sm">
            {cart.length} {cart.length === 1 ? "item" : "items"}
          </p>
          <p className="mt-2 font-serif text-3xl font-medium">${cartTotal.toFixed(2)}</p>
        </aside>
      </div>
    </Layout>
  );
}
