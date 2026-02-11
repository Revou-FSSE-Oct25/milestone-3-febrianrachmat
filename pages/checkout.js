import { useContext } from "react";
import { CartContext } from "../context/cartcontext";
import Layout from "../components/layout";

export default function Checkout() {
  const { cart } = useContext(CartContext);

  return (
    <Layout>
      <h1>Checkout</h1>
      {cart.map((item) => (
        <p key={item.id}>
          {item.title} x {item.quantity}
        </p>
      ))}
    </Layout>
  );
}
