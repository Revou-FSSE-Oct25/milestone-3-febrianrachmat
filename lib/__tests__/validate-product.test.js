import {
  normalizeProductFields,
  validateProductInput,
} from "../validate-product";

const validProduct = {
  title: "Test Product",
  price: 99.5,
  description: "A useful product",
  category: "electronics",
  image: "https://i.imgur.com/sample.jpg",
};

describe("validateProductInput", () => {
  it("returns null for valid product input", () => {
    expect(validateProductInput(validProduct)).toBeNull();
  });

  it("requires title", () => {
    expect(
      validateProductInput({ ...validProduct, title: "   " })
    ).toBe("Title is required");
  });

  it("requires positive price", () => {
    expect(
      validateProductInput({ ...validProduct, price: 0 })
    ).toBe("Price must be greater than 0");
  });

  it("requires description and category", () => {
    expect(
      validateProductInput({ ...validProduct, description: "" })
    ).toBe("Description is required");

    expect(
      validateProductInput({ ...validProduct, category: "" })
    ).toBe("Category is required");
  });

  it("requires a valid image URL", () => {
    expect(
      validateProductInput({ ...validProduct, image: "not-a-url" })
    ).toBe("Image URL must be a valid http or https URL");
  });

  it("rejects placeholder image services", () => {
    expect(
      validateProductInput({ ...validProduct, image: "https://placehold.co/600x400" })
    ).toBe(
      "Use a real product photo URL, not a placeholder service (e.g. placehold.co)"
    );
  });
});

describe("normalizeProductFields", () => {
  it("trims string fields and converts price to number", () => {
    expect(
      normalizeProductFields({
        title: "  Sample  ",
        price: "19.99",
        description: "  Details  ",
        category: "  books  ",
        image: "  https://example.com/a.jpg  ",
      })
    ).toEqual({
      title: "Sample",
      price: 19.99,
      description: "Details",
      category: "books",
      image: "https://example.com/a.jpg",
    });
  });
});
