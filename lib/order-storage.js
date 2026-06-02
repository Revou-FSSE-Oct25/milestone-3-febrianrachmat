const ORDERS_STORAGE_KEY = "orders";

function readOrdersFromStorage() {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(ORDERS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function getOrders() {
  return readOrdersFromStorage();
}

export function saveOrder(order) {
  const orders = readOrdersFromStorage();
  orders.unshift(order);
  localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  return order;
}

export function validateCheckoutForm({ fullName, address, city, paymentMethod }) {
  if (!fullName?.trim()) return "Full name is required";
  if (!address?.trim()) return "Address is required";
  if (!city?.trim()) return "City is required";
  if (!paymentMethod) return "Payment method is required";
  return null;
}

export function createOrderPayload({ cart, cartTotal, fullName, address, city, paymentMethod }) {
  return {
    id: `ORD-${Date.now()}`,
    createdAt: new Date().toISOString(),
    items: cart.map((item) => ({
      id: item.id,
      title: item.title,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
    })),
    total: cartTotal,
    shipping: {
      fullName: fullName.trim(),
      address: address.trim(),
      city: city.trim(),
    },
    paymentMethod,
  };
}
