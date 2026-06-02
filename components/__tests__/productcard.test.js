import { render, screen } from "@testing-library/react";
import ProductCard from "../productcard";

jest.mock("next/link", () => {
  return ({ children, href }) => {
    return <a href={href}>{children}</a>;
  };
});

describe("ProductCard Component", () => {
  const mockProduct = {
    id: 1,
    title: "Test Product",
    price: 100,
    image: "https://i.imgur.com/sample.jpg",
  };

  it("renders product title", () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText("Test Product")).toBeInTheDocument();
  });

  it("renders product price", () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText("$100")).toBeInTheDocument();
  });

  it("renders product image with correct alt", () => {
    render(<ProductCard product={mockProduct} />);
    const image = screen.getByAltText("Test Product");
    expect(image).toBeInTheDocument();
  });

  it("renders correct product link", () => {
    render(<ProductCard product={mockProduct} />);
    const link = screen.getByRole("link", { name: /view detail/i });
    expect(link).toHaveAttribute("href", "/products/1");
  });

  it("matches snapshot", () => {
    const { asFragment } = render(<ProductCard product={mockProduct} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
