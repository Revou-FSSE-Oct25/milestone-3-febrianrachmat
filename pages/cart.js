import Layout from "../components/layout";
import { useCart } from "../context/cartcontext";
import { useRouter } from "next/router";

export default function CartPage() {
  const {
    cart,
    increaseQty,
    decreaseQty,
    removeFromCart,
    clearCart,
    cartTotal,
  } = useCart();

  const router = useRouter();

  if (cart.length === 0) {
    return (
      <Layout>
        <h2>Your cart is empty</h2>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1>Shopping Cart</h1>

      {cart.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
            padding: "20px",
            border: "1px solid #eee",
            borderRadius: "10px",
          }}
        >
          <div style={{ display: "flex", gap: "20px" }}>
            <img src={item.image} width="80" />

            <div>
              <h3>{item.title}</h3>
              <p>${item.price}</p>

              <div style={{ display: "flex", gap: "10px" }}>
                <button onClick={() => decreaseQty(item.id)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => increaseQty(item.id)}>+</button>
              </div>

              {/* Subtotal */}
              <p style={{ marginTop: "10px", fontWeight: "bold" }}>
                Subtotal: $
                {(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>

          <button
            style={{
              background: "crimson",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
            onClick={() => removeFromCart(item.id)}
          >
            Remove
          </button>
        </div>
      ))}

      <div style={{ textAlign: "right", marginTop: "40px" }}>
        <h2>Total: ${cartTotal.toFixed(2)}</h2>

        <button
          style={{
            marginRight: "10px",
            background: "gray",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "6px",
          }}
          onClick={clearCart}
        >
          Clear Cart
        </button>

        <button
          style={{
            background: "black",
            color: "white",
            padding: "15px 30px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
          onClick={() => router.push("/checkout")}
        >
          Checkout
        </button>
      </div>
    </Layout>
  );
}
