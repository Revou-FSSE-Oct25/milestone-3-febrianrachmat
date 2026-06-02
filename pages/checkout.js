import { useContext } from "react";
import { CartContext } from "../context/cartcontext";
import Layout from "../components/layout";
import { useRouter } from "next/router";

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useContext(CartContext);
  const router = useRouter();

  if (cart.length === 0) {
    return (
      <Layout>
        <div className="checkout-page">
          <h1>Checkout</h1>
          <p className="empty-cart">Your cart is empty.</p>
        </div>
      </Layout>
    );
  }

  const handlePlaceOrder = () => {
    alert("Order placed successfully!");
    clearCart();
    router.push("/");
  };

  return (
    <Layout>
      <div className="checkout-page">
        <h1>Checkout</h1>

        <div className="checkout-list">
          {cart.map((item) => (
            <div key={item.id} className="checkout-item">
              <p>
                <strong>{item.title}</strong>
              </p>
              <p>
                ${item.price} x {item.quantity}
              </p>
              <p>
                Subtotal: ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        <hr className="checkout-divider" />

        <h2 className="checkout-total">Total: ${cartTotal.toFixed(2)}</h2>

        <div className="checkout-actions">
          <button
            type="button"
            className="btn-primary"
            onClick={handlePlaceOrder}
          >
            Place Order
          </button>
        </div>
      </div>
    </Layout>
  );
}
