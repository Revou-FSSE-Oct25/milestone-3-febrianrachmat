import { useState } from "react";
import Link from "next/link";
import Layout from "../components/layout";
import { getOrders } from "../lib/order-storage";

function formatDate(value) {
  return new Date(value).toLocaleString();
}

function formatPaymentMethod(method) {
  return method === "bank_transfer" ? "Bank Transfer" : "Credit Card";
}

export default function OrdersPage() {
  const [orders] = useState(getOrders);

  return (
    <Layout>
      <header className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="page-eyebrow">Account</p>
          <h1 className="page-title mt-2">Order History</h1>
        </div>
        <Link
          href="/#shop-collection"
          className="link-editorial text-xs tracking-[0.16em] uppercase no-underline"
        >
          Shop again
        </Link>
      </header>

      {orders.length === 0 ? (
        <div className="luxury-surface app-panel p-10 text-center md:p-14">
          <p className="font-serif text-2xl">No orders yet</p>
          <p className="app-text-muted mt-3 text-sm">
            When you place an order, it will appear here with full details.
          </p>
          <Link href="/" className="btn-luxury mt-8 inline-flex no-underline hover:no-underline">
            Explore Collection
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {orders.map((order) => (
            <article key={order.id} className="luxury-surface app-panel p-6 md:p-8">
              <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="page-eyebrow">Order</p>
                  <h2 className="mt-1 font-serif text-xl">{order.id}</h2>
                  <p className="app-text-muted mt-1 text-sm">{formatDate(order.createdAt)}</p>
                </div>
                <p className="font-serif text-2xl font-medium">${order.total.toFixed(2)}</p>
              </div>

              <div className="app-text-muted mb-6 grid gap-3 text-sm sm:grid-cols-2">
                <p>
                  <span className="text-xs tracking-[0.12em] uppercase">Name</span>
                  <br />
                  {order.shipping.fullName}
                </p>
                <p>
                  <span className="text-xs tracking-[0.12em] uppercase">City</span>
                  <br />
                  {order.shipping.city}
                </p>
                <p className="sm:col-span-2">
                  <span className="text-xs tracking-[0.12em] uppercase">Address</span>
                  <br />
                  {order.shipping.address}
                </p>
                <p>
                  <span className="text-xs tracking-[0.12em] uppercase">Payment</span>
                  <br />
                  {formatPaymentMethod(order.paymentMethod)}
                </p>
              </div>

              <ul className="space-y-2 border-t border-[var(--line)] pt-5 text-sm">
                {order.items.map((item) => (
                  <li key={`${order.id}-${item.id}`} className="flex justify-between gap-4">
                    <span className="app-text-muted">
                      {item.title} x {item.quantity}
                    </span>
                    <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      )}
    </Layout>
  );
}
