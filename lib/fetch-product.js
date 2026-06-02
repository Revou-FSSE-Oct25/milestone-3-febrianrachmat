import { API_URLS, fetchWithTimeout } from "./api-config";
import { normalizeProductFromApi } from "./normalize-api";

async function fetchProductFromApi(productId) {
  try {
    const response = await fetchWithTimeout(API_URLS.productById(productId), {
      cache: "no-store",
    });



    if (!response.ok) return null;



    const product = await response.json();

    return normalizeProductFromApi(product);

  } catch {

    return null;

  }

}



export async function fetchProductForDetail(id) {

  const { bootstrapProducts, getProductById, isProductDeleted } = await import(

    "./products-data"

  );



  const productId = Number(id);

  if (Number.isNaN(productId)) return null;



  await bootstrapProducts();



  if (isProductDeleted(productId)) {

    return null;

  }



  const catalogProduct = getProductById(productId);

  if (catalogProduct) {

    return catalogProduct;

  }



  return fetchProductFromApi(productId);

}



export { fetchProductFromApi };

