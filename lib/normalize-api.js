export function normalizeProductFromApi(product) {
  if (!product) return null;

  if (typeof product.category === "string" && product.image) {
    return { ...product, id: Number(product.id) };
  }

  const image = product.images?.[0] ?? product.image ?? "";

  return {
    id: Number(product.id),
    title: product.title,
    price: product.price,
    description: product.description,
    category:
      typeof product.category === "string"
        ? product.category
        : product.category?.name ?? "Uncategorized",
    image,
    images: product.images ?? (image ? [image] : []),
  };
}

export function normalizeProductsFromApi(products) {
  if (!Array.isArray(products)) return [];

  return products.map(normalizeProductFromApi).filter(Boolean);
}

export function normalizeUserFromApi(user) {
  if (!user) return null;

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    avatar: user.avatar,
    username: user.email,
  };
}

export function normalizeUsersFromApi(users) {
  if (!Array.isArray(users)) return [];

  return users.map(normalizeUserFromApi).filter(Boolean);
}

export function normalizeCategoriesFromApi(categories) {
  if (!Array.isArray(categories)) return [];

  return categories.map((category) => category.name).filter(Boolean).sort();
}
