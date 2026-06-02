export function filterAndSortProducts(products, { search = "", category = "all", sort = "default" }) {
  let result = [...products];

  const query = search.trim().toLowerCase();
  if (query) {
    result = result.filter((product) => product.title.toLowerCase().includes(query));
  }

  if (category !== "all") {
    result = result.filter((product) => product.category === category);
  }

  switch (sort) {
    case "price-asc":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result.sort((a, b) => b.price - a.price);
      break;
    case "title-asc":
      result.sort((a, b) => a.title.localeCompare(b.title));
      break;
    default:
      break;
  }

  return result;
}

export function getProductCategories(products) {
  return [...new Set(products.map((product) => product.category).filter(Boolean))].sort();
}
