import {
  createOrderPayload,
  getOrders,
  saveOrder,
  validateCheckoutForm,
} from "../order-storage";

describe("order storage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("validates checkout form fields", () => {
    expect(
      validateCheckoutForm({
        fullName: "",
        address: "Street 1",
        city: "Jakarta",
        paymentMethod: "credit_card",
      })
    ).toBe("Full name is required");
  });

  it("saves and reads orders from localStorage", () => {
    const order = {
      id: "ORD-1",
      createdAt: "2026-01-01T00:00:00.000Z",
      items: [],
      total: 10,
      shipping: {
        fullName: "John",
        address: "Street",
        city: "Jakarta",
      },
      paymentMethod: "credit_card",
    };

    saveOrder(order);

    expect(getOrders()).toEqual([order]);
  });

  it("creates an order payload from cart data", () => {
    const order = createOrderPayload({
      cart: [{ id: 1, title: "Bag", price: 20, quantity: 2, image: "img.jpg" }],
      cartTotal: 40,
      fullName: "Jane",
      address: "Main St",
      city: "Bandung",
      paymentMethod: "bank_transfer",
    });

    expect(order.total).toBe(40);
    expect(order.shipping.fullName).toBe("Jane");
    expect(order.paymentMethod).toBe("bank_transfer");
    expect(order.items).toHaveLength(1);
  });
});
