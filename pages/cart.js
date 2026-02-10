import { useContext } from "react";
import Layout from "../components/layout";
import { CartContext } from "../context/cartcontext";

export default function CartPage() {
  const {
    cart,
    increaseQty,
    decreaseQty,
    removeItem,
  } = useContext(CartContext);

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <Layout>
      <h1>Your Cart</h1>

      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          <div className="cart-list">
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.title} />

                <div className="cart-info">
                  <h3>{item.title}</h3>
                  <p>${item.price}</p>

                  <div className="cart-qty">
                    <button onClick={() => decreaseQty(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQty(item.id)}>+</button>
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-total">
            Total: ${totalPrice.toFixed(2)}
          </div>
        </>
      )}
    </Layout>
  );
}
