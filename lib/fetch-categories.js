import { API_URLS } from "./api-config";
import { normalizeCategoriesFromApi } from "./normalize-api";

export async function fetchCategories() {
  try {
    const response = await fetch(API_URLS.categories, { cache: "no-store" });

    if (!response.ok) {
      return [];
    }

    const categories = await response.json();
    return normalizeCategoriesFromApi(categories);
  } catch {
    return [];
  }
}
