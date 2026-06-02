import Layout from "../components/layout";
import ProductImage from "../components/productimage";
import { useCart } from "../context/cartcontext";
import { useRouter } from "next/router";

const primaryBtnClass =
  "cursor-pointer rounded-lg bg-black px-[30px] py-[15px] font-semibold text-white transition hover:opacity-90";

const secondaryBtnClass =
  "cursor-pointer rounded-lg bg-gray-500 px-5 py-2.5 font-semibold text-white transition hover:opacity-90";

export default function CartPage() {
  const { cart, increaseQty, decreaseQty, removeFromCart, clearCart, cartTotal } =
    useCart();

  const router = useRouter();

  if (cart.length === 0) {
    return (
      <Layout>
        <div className="py-10">
          <h1 className="mb-8 text-4xl font-bold">Shopping Cart</h1>
          <p className="text-lg text-gray-500">Your cart is empty</p>
          <button
            type="button"
            className={`${primaryBtnClass} mt-6`}
            onClick={() => router.push("/")}
          >
            Continue Shopping
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-10">
        <h1 className="mb-8 text-4xl font-bold">Shopping Cart</h1>

        <div className="flex flex-col gap-5">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-5 rounded-xl border border-gray-200 p-5"
            >
              <div className="flex flex-1 items-center gap-5">
                <div className="relative h-[100px] w-[100px] shrink-0">
                  <ProductImage
                    src={item.image}
                    alt={item.title}
                    productId={item.id}
                  />
                </div>

                <div className="flex flex-1 flex-col gap-1">
                  <h3 className="text-base font-semibold">{item.title}</h3>
                  <p className="font-semibold">${item.price}</p>

                  <div className="mt-2.5 flex items-center gap-2.5">
                    <button
                      type="button"
                      aria-label={`Decrease quantity for ${item.title}`}
                      className="h-[30px] w-[30px] cursor-pointer rounded-md bg-black text-white"
                      onClick={() => decreaseQty(item.id)}
                    >
                      -
                    </button>
                    <span className="text-base font-bold">{item.quantity}</span>
                    <button
                      type="button"
                      aria-label={`Increase quantity for ${item.title}`}
                      className="h-[30px] w-[30px] cursor-pointer rounded-md bg-black text-white"
                      onClick={() => increaseQty(item.id)}
                    >
                      +
                    </button>
                  </div>

                  <p className="mt-2.5 font-bold">
                    Subtotal: ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="shrink-0 cursor-pointer rounded-md bg-rose-600 px-4 py-2.5 text-white transition hover:bg-rose-700"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="mt-10 text-right">
          <h2 className="mb-4 text-[22px] font-bold">Total: ${cartTotal.toFixed(2)}</h2>

          <div className="flex flex-wrap justify-end gap-2.5">
            <button type="button" className={secondaryBtnClass} onClick={clearCart}>
              Clear Cart
            </button>

            <button
              type="button"
              className={primaryBtnClass}
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
