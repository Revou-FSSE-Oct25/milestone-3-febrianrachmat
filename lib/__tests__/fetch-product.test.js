import {
  addProduct,
  getProductById,
  isLocallyManaged,
  isProductDeleted,
  removeProduct,
  resetProductCatalogState,
  updateProduct,
} from "../products-data";
import { fetchProductForDetail } from "../fetch-product";
import { API_URLS } from "../api-config";

const apiProduct = {
  id: 29,
  title: "Fresh API Product",
  price: 99.99,
  description: "From Escuela JS API",
  category: { id: 3, name: "Furniture", slug: "furniture" },
  images: ["https://i.imgur.com/DMQHGA0.jpeg"],
};

const localProduct = {
  title: "Updated Local Product",
  price: 49.99,
  description: "Updated by admin",
  category: "Furniture",
  image: "https://i.imgur.com/NWIJKUj.jpeg",
};

describe("fetchProductForDetail", () => {
  beforeEach(() => {
    resetProductCatalogState({ bootstrapped: true });
    global.fetch = jest.fn();
  });

  it("fetches fresh product data from Escuela JS API", async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(apiProduct),
    });

    const product = await fetchProductForDetail("29");

    expect(global.fetch).toHaveBeenCalledWith(
      API_URLS.productById(29),
      expect.objectContaining({ cache: "no-store" })
    );
    expect(product).toEqual({
      id: 29,
      title: "Fresh API Product",
      price: 99.99,
      description: "From Escuela JS API",
      category: "Furniture",
      image: "https://i.imgur.com/DMQHGA0.jpeg",
      images: ["https://i.imgur.com/DMQHGA0.jpeg"],
    });
  });

  it("returns locally managed product without calling Escuela JS API", async () => {
    updateProduct(1, localProduct);

    const product = await fetchProductForDetail("1");

    expect(global.fetch).not.toHaveBeenCalled();
    expect(product.title).toBe("Updated Local Product");
    expect(isLocallyManaged(1)).toBe(true);
  });

  it("returns catalog product without calling Escuela JS API when already loaded", async () => {
    global.fetch.mockRejectedValue(new Error("Network error"));

    const product = await fetchProductForDetail("1");

    expect(global.fetch).not.toHaveBeenCalled();
    expect(product.title).toBe("Classic Leather Jacket");
  });

  it("returns admin-created product from local catalog", async () => {
    addProduct({
      id: 999001,
      title: "Admin Product",
      price: 10,
      description: "Only in local store",
      category: "test",
      image: "https://i.imgur.com/DMQHGA0.jpeg",
    });

    const product = await fetchProductForDetail("999001");

    expect(global.fetch).not.toHaveBeenCalled();
    expect(product.title).toBe("Admin Product");
  });

  it("returns null for deleted products", async () => {
    addProduct({
      id: 888002,
      title: "Temporary Product",
      price: 10,
      description: "Will be deleted",
      category: "test",
      image: "https://i.imgur.com/DMQHGA0.jpeg",
    });

    removeProduct(888002);

    const product = await fetchProductForDetail("888002");

    expect(product).toBeNull();
    expect(isProductDeleted(888002)).toBe(true);
    expect(getProductById(888002)).toBeNull();
  });
});
