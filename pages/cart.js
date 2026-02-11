import Layout from "../components/layout";
import { useContext } from "react";
import { CartContext } from "../context/cartcontext";

export default function CartPage() {
  const { cart, increaseQty, decreaseQty, removeFromCart } =
    useContext(CartContext);

  return (
    <Layout>
      <div className="cart-page">
        <h1>Your Cart</h1>

        {cart.length === 0 ? (
          <p className="empty-cart">Cart is empty</p>
        ) : (
          cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.title} />

              <div className="cart-info">
                <h3>{item.title}</h3>
                <p>${item.price}</p>

                <div className="qty-control">
                  <button onClick={() => decreaseQty(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQty(item.id)}>+</button>
                </div>
              </div>

              <button
                className="remove-btn"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </Layout>
  );
}
