import {
  filterAndSortProducts,
  getProductCategories,
} from "../filter-products";

const products = [
  {
    id: 1,
    title: "Alpha Backpack",
    price: 100,
    category: "bags",
  },
  {
    id: 2,
    title: "Beta Jacket",
    price: 50,
    category: "clothing",
  },
  {
    id: 3,
    title: "Gamma Shirt",
    price: 25,
    category: "clothing",
  },
];

describe("filterAndSortProducts", () => {
  it("filters products by search query", () => {
    const result = filterAndSortProducts(products, { search: "jacket" });

    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Beta Jacket");
  });

  it("filters products by category", () => {
    const result = filterAndSortProducts(products, { category: "clothing" });

    expect(result).toHaveLength(2);
  });

  it("sorts products by price ascending", () => {
    const result = filterAndSortProducts(products, { sort: "price-asc" });

    expect(result.map((product) => product.id)).toEqual([3, 2, 1]);
  });

  it("sorts products by title ascending", () => {
    const result = filterAndSortProducts(products, { sort: "title-asc" });

    expect(result[0].title).toBe("Alpha Backpack");
    expect(result[2].title).toBe("Gamma Shirt");
  });
});

describe("getProductCategories", () => {
  it("returns unique sorted categories", () => {
    expect(getProductCategories(products)).toEqual(["bags", "clothing"]);
  });
});
