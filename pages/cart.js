import { useContext } from "react";
import Layout from "../components/layout";
import { CartContext } from "../context/cartcontext";

export default function CartPage() {
  const { cart } = useContext(CartContext);

  return (
    <Layout>
      <h1>Your Cart</h1>

      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <ul>
          {cart.map((item, index) => (
            <li key={`${item.id}-${index}`}>
              {item.title} - ${item.price}
            </li>
          ))}
        </ul>
      )}
    </Layout>
  );
}
