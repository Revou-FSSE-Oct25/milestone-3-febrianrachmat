function isValidUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function validateProductInput({ title, price, description, category, image }) {
  if (!title || typeof title !== "string" || !title.trim()) {
    return "Title is required";
  }

  const numericPrice = Number(price);

  if (Number.isNaN(numericPrice) || numericPrice <= 0) {
    return "Price must be greater than 0";
  }

  if (!description || typeof description !== "string" || !description.trim()) {
    return "Description is required";
  }

  if (!category || typeof category !== "string" || !category.trim()) {
    return "Category is required";
  }

  if (!image || typeof image !== "string" || !image.trim()) {
    return "Image URL is required";
  }

  if (!isValidUrl(image.trim())) {
    return "Image URL must be a valid http or https URL";
  }

  return null;
}

export function normalizeProductFields(body) {
  return {
    title: body.title.trim(),
    price: Number(body.price),
    description: body.description.trim(),
    category: body.category.trim(),
    image: body.image.trim(),
  };
}
