import Layout from "../components/layout";
import { useCart } from "../context/cartcontext";
import { useContext } from "react";

export default function CartPage() {
  const {
    cart,
    increaseQty,
    decreaseQty,
    removeFromCart,
    cartTotal,
  } = useCart();

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
            <img
              src={item.image}
              alt={item.title}
              width="80"
            />
            <div>
              <h3>{item.title}</h3>
              <p>${item.price}</p>

              <div style={{ display: "flex", gap: "10px" }}>
                <button onClick={() => decreaseQty(item.id)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => increaseQty(item.id)}>+</button>
              </div>
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

      <div
        style={{
          marginTop: "40px",
          textAlign: "right",
        }}
      >
        <h2>Total: ${cartTotal.toFixed(2)}</h2>

        <button
          style={{
            background: "black",
            color: "white",
            padding: "15px 30px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          Checkout
        </button>
      </div>
    </Layout>
  );
}
