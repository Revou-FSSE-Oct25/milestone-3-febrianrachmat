import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "../../pages/index";
import { renderWithProviders } from "../../test-utils/renderWithProviders";
import { fetchCategories } from "../../lib/fetch-categories";

jest.mock("../../lib/fetch-categories", () => ({
  fetchCategories: jest.fn().mockResolvedValue([]),
}));

const mockProducts = [
  {
    id: 1,
    title: "Product 1",
    price: 100,
    category: "bags",
    image: "https://i.imgur.com/product-1.jpg",
  },
  {
    id: 2,
    title: "Product 2",
    price: 200,
    category: "clothing",
    image: "https://i.imgur.com/product-2.jpg",
  },
];

async function renderHome(ui) {
  renderWithProviders(ui);

  await waitFor(() => {
    expect(fetchCategories).toHaveBeenCalled();
  });
}

describe("Home Page", () => {
  beforeEach(() => {
    localStorage.clear();
    fetchCategories.mockClear();
    fetchCategories.mockResolvedValue([]);
  });

  it("renders with mock data", async () => {
    await renderHome(<Home products={mockProducts} usedFallback={false} />);

    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
  });

  it("does not require login to browse products", async () => {
    localStorage.clear();

    await renderHome(<Home products={mockProducts} usedFallback={false} />);

    expect(screen.getByText("RevoShop Products")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Login" })).toBeInTheDocument();
  });

  it("shows fallback banner when API data is unavailable", async () => {
    await renderHome(<Home products={mockProducts} usedFallback={true} />);

    expect(
      screen.getByText(/Product API is unavailable/i)
    ).toBeInTheDocument();
  });

  it("filters products by search query", async () => {
    const user = userEvent.setup();

    await renderHome(<Home products={mockProducts} usedFallback={false} />);

    await user.type(screen.getByPlaceholderText("Search by product name..."), "Product 2");

    expect(screen.queryByText("Product 1")).not.toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
  });

  it("renders empty state", async () => {
    await renderHome(<Home products={[]} usedFallback={false} />);

    expect(screen.queryByText("Product 1")).not.toBeInTheDocument();
  });

  it("renders layout with auth and cart providers", async () => {
    await renderHome(<Home products={mockProducts} usedFallback={false} />);

    expect(screen.getByText("RevoShop")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Cart" })).toHaveAttribute("href", "/cart");
    expect(screen.getByRole("link", { name: "Login" })).toHaveAttribute("href", "/login");
  });

  it("shows cart badge when cart has items in localStorage", async () => {
    localStorage.setItem(
      "cart",
      JSON.stringify([{ id: 1, price: 100, quantity: 2 }])
    );

    await renderHome(<Home products={mockProducts} usedFallback={false} />);

    expect(screen.getByText("2")).toBeInTheDocument();
  });
});

describe("getStaticProps", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("../../lib/products-data", () => ({
      bootstrapProducts: jest.fn().mockResolvedValue({ usedFallback: false }),
      getProducts: jest.fn(() => mockProducts),
      getUsedFallback: jest.fn(() => false),
    }));
  });

  afterEach(() => {
    jest.dontMock("../../lib/products-data");
    jest.resetModules();
  });

  it("returns products from shared product store", async () => {
    const { getStaticProps } = await import("../../pages/index");
    const result = await getStaticProps();

    expect(result).toEqual({
      props: { products: mockProducts, usedFallback: false },
      revalidate: 60,
    });
  });
});
