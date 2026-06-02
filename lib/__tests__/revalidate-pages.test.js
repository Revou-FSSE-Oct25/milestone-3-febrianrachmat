import { revalidateCatalogPages } from "../revalidate-pages";

describe("revalidateCatalogPages", () => {
  it("revalidates home and product detail paths", async () => {
    const revalidate = jest.fn().mockResolvedValue(undefined);
    const res = { revalidate };

    await revalidateCatalogPages(res, 7);

    expect(revalidate).toHaveBeenCalledWith("/");
    expect(revalidate).toHaveBeenCalledWith("/products/7");
  });

  it("ignores revalidation errors in local development", async () => {
    const res = {
      revalidate: jest.fn().mockRejectedValue(new Error("revalidate failed")),
    };

    await expect(revalidateCatalogPages(res, 3)).resolves.toBeUndefined();
  });
});
