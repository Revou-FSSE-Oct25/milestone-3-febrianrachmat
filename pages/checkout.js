import { useCart } from "../context/cartcontext";
import { useToast } from "../context/toastcontext";
import Layout from "../components/layout";
import { useRouter } from "next/router";

const primaryBtnClass =
  "cursor-pointer rounded-lg bg-black px-[30px] py-[15px] font-semibold text-white transition hover:opacity-90";

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();
  const { showToast } = useToast();
  const router = useRouter();

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

  const handlePlaceOrder = () => {
    showToast("Order placed successfully!");
    clearCart();
    router.push("/");
  };

  return (
    <Layout>
      <div className="py-10">
        <h1 className="mb-8 text-4xl font-bold">Checkout</h1>

        <div className="flex flex-col gap-5">
          {cart.map((item) => (
            <div key={item.id} className="border-b border-gray-300 py-2.5">
              <p className="mb-1">
                <strong>{item.title}</strong>
              </p>
              <p className="mb-1">
                ${item.price} x {item.quantity}
              </p>
              <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>

        <hr className="my-6 border-gray-200" />

        <h2 className="mb-4 text-[22px] font-bold">Total: ${cartTotal.toFixed(2)}</h2>

        <div className="flex flex-wrap justify-end gap-2.5">
          <button type="button" className={primaryBtnClass} onClick={handlePlaceOrder}>
            Place Order
          </button>
        </div>
      </div>
    </Layout>
  );
}
