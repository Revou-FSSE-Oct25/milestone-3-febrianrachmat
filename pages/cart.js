import { useContext } from "react";
import Layout from "../components/layout";
import { CartContext } from "../context/cartcontext";

export default function CartPage() {
  const { cart } = useContext(CartContext);

  const totalPrice = cart.reduce(
    (total, item) => total + item.price,
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
            {cart.map((item, index) => (
              <div className="cart-item" key={`${item.id}-${index}`}>
                <img src={item.image} alt={item.title} />
                <div>
                  <h3>{item.title}</h3>
                  <p>${item.price}</p>
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
