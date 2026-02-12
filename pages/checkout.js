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
        <h1>Checkout</h1>
        <p>Your cart is empty.</p>
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
      <h1>Checkout</h1>

      {cart.map((item) => (
        <div
          key={item.id}
          style={{
            borderBottom: "1px solid #ddd",
            padding: "10px 0",
          }}
        >
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

      <hr />

      <h2>Total: ${cartTotal.toFixed(2)}</h2>

      <button
        onClick={handlePlaceOrder}
        style={{
          marginTop: "15px",
          padding: "10px 20px",
          background: "black",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Place Order
      </button>
    </Layout>
  );
}
