export async function revalidateCatalogPages(res, productId = null) {
  try {
    await res.revalidate("/");

    if (productId !== null && productId !== undefined) {
      await res.revalidate(`/products/${productId}`);
    }
  } catch {
    // ISR revalidation is best-effort in local dev.
  }
}
