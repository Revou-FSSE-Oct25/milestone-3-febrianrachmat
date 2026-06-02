import { useState } from "react";
import { useCart } from "../context/cartcontext";
import { useToast } from "../context/toastcontext";
import Layout from "../components/layout";
import { useRouter } from "next/router";
import {
  createOrderPayload,
  saveOrder,
  validateCheckoutForm,
} from "../lib/order-storage";

const primaryBtnClass =
  "cursor-pointer rounded-lg bg-black px-[30px] py-[15px] font-semibold text-white transition hover:opacity-90 disabled:opacity-50";

const inputClass =
  "rounded-md border border-gray-300 px-3 py-3 text-sm focus:border-black focus:outline-none";

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
        <div className="py-10">
          <h1 className="mb-8 text-4xl font-bold">Checkout</h1>
          <p className="text-lg text-gray-500">Your cart is empty.</p>
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
    showToast("Order placed successfully!");
    router.push("/orders");
  };

  return (
    <Layout>
      <div className="py-10">
        <h1 className="mb-8 text-4xl font-bold">Checkout</h1>

        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <form onSubmit={handlePlaceOrder} className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold">Shipping Details</h2>

            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={inputClass}
              required
            />

            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={inputClass}
              required
            />

            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className={inputClass}
              required
            />

            <label className="flex flex-col gap-1 text-sm font-medium">
              Payment Method
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className={inputClass}
              >
                <option value="credit_card">Credit Card</option>
                <option value="bank_transfer">Bank Transfer</option>
              </select>
            </label>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button type="submit" className={primaryBtnClass} disabled={loading}>
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </form>

          <aside className="rounded-xl border border-gray-200 p-6">
            <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>

            <div className="flex flex-col gap-4">
              {cart.map((item) => (
                <div key={item.id} className="border-b border-gray-200 pb-4">
                  <p className="mb-1 font-medium">{item.title}</p>
                  <p className="text-sm text-gray-600">
                    ${item.price} x {item.quantity}
                  </p>
                  <p className="text-sm font-semibold">
                    Subtotal: ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-gray-200 pt-4">
              <p className="text-sm text-gray-600">Items: {cart.length}</p>
              <p className="mt-2 text-[22px] font-bold">Total: ${cartTotal.toFixed(2)}</p>
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
}
