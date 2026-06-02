import { useState } from "react";
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
      <div className="py-10">
        <h1 className="mb-8 text-4xl font-bold">Order History</h1>

        {orders.length === 0 ? (
          <p className="text-lg text-gray-500">You have not placed any orders yet.</p>
        ) : (
          <div className="flex flex-col gap-5">
            {orders.map((order) => (
              <article
                key={order.id}
                className="rounded-xl border border-gray-200 p-5"
              >
                <div className="mb-4 flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h2 className="text-lg font-semibold">{order.id}</h2>
                    <p className="text-sm text-gray-500">{formatDate(order.createdAt)}</p>
                  </div>
                  <p className="text-lg font-bold">${order.total.toFixed(2)}</p>
                </div>

                <div className="mb-4 grid gap-2 text-sm text-gray-700 sm:grid-cols-2">
                  <p>
                    <span className="font-medium">Name:</span> {order.shipping.fullName}
                  </p>
                  <p>
                    <span className="font-medium">City:</span> {order.shipping.city}
                  </p>
                  <p className="sm:col-span-2">
                    <span className="font-medium">Address:</span> {order.shipping.address}
                  </p>
                  <p>
                    <span className="font-medium">Payment:</span>{" "}
                    {formatPaymentMethod(order.paymentMethod)}
                  </p>
                </div>

                <ul className="space-y-2 border-t border-gray-200 pt-4 text-sm">
                  {order.items.map((item) => (
                    <li key={`${order.id}-${item.id}`} className="flex justify-between gap-4">
                      <span>
                        {item.title} x {item.quantity}
                      </span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
