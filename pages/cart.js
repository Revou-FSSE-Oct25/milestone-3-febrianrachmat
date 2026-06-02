import Layout from "../components/layout";
import Image from "next/image";
import { useCart } from "../context/cartcontext";
import { useRouter } from "next/router";

export default function CartPage() {
  const { cart, increaseQty, decreaseQty, removeFromCart, clearCart, cartTotal } =
    useCart();

  const router = useRouter();

  if (cart.length === 0) {
    return (
      <Layout>
        <div className="cart-page">
          <h1>Shopping Cart</h1>
          <p className="empty-cart">Your cart is empty</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="cart-page">
        <h1>Shopping Cart</h1>

        <div className="cart-list">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-content">
                <div className="relative h-[100px] w-[100px] shrink-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain"
                    sizes="100px"
                  />
                </div>

                <div className="cart-info">
                  <h3>{item.title}</h3>
                  <p>${item.price}</p>

                  <div className="qty-control">
                    <button type="button" onClick={() => decreaseQty(item.id)}>
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button type="button" onClick={() => increaseQty(item.id)}>
                      +
                    </button>
                  </div>

                  <p className="cart-subtotal">
                    Subtotal: ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="remove-btn"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="cart-footer">
          <h2 className="cart-total">Total: ${cartTotal.toFixed(2)}</h2>

          <div className="cart-actions">
            <button type="button" className="btn-secondary" onClick={clearCart}>
              Clear Cart
            </button>

            <button
              type="button"
              className="btn-primary"
              onClick={() => router.push("/checkout")}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
