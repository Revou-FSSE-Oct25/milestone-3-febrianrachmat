import { useState } from "react";

const inputClass =
  "rounded-md border border-gray-300 px-3 py-3 text-sm focus:border-black focus:outline-none";
const emptyForm = {
  title: "",
  price: "",
  description: "",
  category: "",
  image: "",
};

export function getEmptyProductForm() {
  return { ...emptyForm };
}

export function productToFormValues(product) {
  return {
    title: product.title ?? "",
    price: String(product.price ?? ""),
    description: product.description ?? "",
    category: product.category ?? "",
    image: product.image ?? "",
  };
}

export default function ProductForm({
  initialValues = emptyForm,
  submitLabel,
  loadingLabel,
  loading = false,
  error = null,
  onSubmit,
}) {
  const [values, setValues] = useState(initialValues);
  const [previewError, setPreviewError] = useState(false);

  function handleChange(field) {
    return (e) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }));
      if (field === "image") {
        setPreviewError(false);
      }
    };
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(values);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        type="text"
        placeholder="Product Title"
        value={values.title}
        onChange={handleChange("title")}
        className={inputClass}
        required
      />

      <input
        type="number"
        placeholder="Price"
        value={values.price}
        onChange={handleChange("price")}
        min="0"
        step="0.01"
        className={inputClass}
        required
      />

      <textarea
        placeholder="Description"
        value={values.description}
        onChange={handleChange("description")}
        rows={4}
        className={inputClass}
        required
      />

      <input
        type="text"
        placeholder="Category"
        value={values.category}
        onChange={handleChange("category")}
        className={inputClass}
        required
      />

      <input
        type="url"
        placeholder="Image URL (https://...)"
        value={values.image}
        onChange={handleChange("image")}
        className={inputClass}
        required
      />

      {values.image.trim() && (
        <div className="rounded-md border border-gray-200 p-3">
          <p className="mb-2 text-sm font-medium text-gray-700">Image preview</p>
          <div className="flex h-[200px] items-center justify-center">
            {!previewError ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={values.image.trim()}
                alt="Product preview"
                className="max-h-[200px] max-w-full object-contain"
                onError={() => setPreviewError(true)}
              />
            ) : (
              <p className="text-sm text-red-600">Unable to load image preview.</p>
            )}
          </div>
        </div>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="cursor-pointer rounded-md bg-black px-3 py-3 text-white disabled:opacity-50"
      >
        {loading ? loadingLabel : submitLabel}
      </button>
    </form>
  );
}
