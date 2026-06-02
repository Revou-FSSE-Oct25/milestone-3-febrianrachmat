import {
  normalizeCategoriesFromApi,
  normalizeProductFromApi,
  normalizeProductsFromApi,
  normalizeUserFromApi,
} from "../normalize-api";

describe("normalize-api", () => {
  it("normalizes Escuela JS product shape", () => {
    expect(
      normalizeProductFromApi({
        id: 10,
        title: "Sample",
        price: 20,
        description: "Desc",
        category: { id: 1, name: "Electronics", slug: "electronics" },
        images: ["https://i.imgur.com/sample.jpeg"],
      })
    ).toEqual({
      id: 10,
      title: "Sample",
      price: 20,
      description: "Desc",
      category: "Electronics",
      image: "https://i.imgur.com/sample.jpeg",
      images: ["https://i.imgur.com/sample.jpeg"],
    });
  });

  it("normalizes product arrays", () => {
    expect(
      normalizeProductsFromApi([
        {
          id: 1,
          title: "One",
          price: 1,
          description: "A",
          category: { name: "Shoes" },
          images: ["https://i.imgur.com/one.jpeg"],
        },
      ])
    ).toHaveLength(1);
  });

  it("normalizes Escuela JS user shape", () => {
    expect(
      normalizeUserFromApi({
        id: 3,
        email: "admin@mail.com",
        password: "admin123",
        name: "Admin",
        role: "admin",
        avatar: "https://i.imgur.com/admin.jpeg",
      })
    ).toEqual({
      id: 3,
      email: "admin@mail.com",
      name: "Admin",
      role: "admin",
      avatar: "https://i.imgur.com/admin.jpeg",
      username: "admin@mail.com",
    });
  });

  it("normalizes category names", () => {
    expect(
      normalizeCategoriesFromApi([
        { id: 2, name: "Electronics" },
        { id: 1, name: "Clothes" },
      ])
    ).toEqual(["Clothes", "Electronics"]);
  });
});
