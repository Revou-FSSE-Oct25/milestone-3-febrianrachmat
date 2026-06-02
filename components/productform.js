import { useState } from "react";

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
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <label className="form-label">
        Product Title
        <input
          type="text"
          placeholder="e.g. Linen Overshirt"
          value={values.title}
          onChange={handleChange("title")}
          className="form-input"
          required
        />
      </label>

      <label className="form-label">
        Price (USD)
        <input
          type="number"
          placeholder="0.00"
          value={values.price}
          onChange={handleChange("price")}
          min="0"
          step="0.01"
          className="form-input"
          required
        />
      </label>

      <label className="form-label">
        Description
        <textarea
          placeholder="A concise product description..."
          value={values.description}
          onChange={handleChange("description")}
          rows={4}
          className="form-textarea"
          required
        />
      </label>

      <label className="form-label">
        Category
        <input
          type="text"
          placeholder="e.g. fashion, beauty, home"
          value={values.category}
          onChange={handleChange("category")}
          className="form-input"
          required
        />
      </label>

      <label className="form-label">
        Image URL
        <input
          type="url"
          placeholder="https://..."
          value={values.image}
          onChange={handleChange("image")}
          className="form-input"
          required
        />
      </label>

      {values.image.trim() && (
        <div className="overflow-hidden rounded-2xl border border-black/8 bg-[#f2ede5] p-4">
          <p className="mb-3 text-xs tracking-[0.14em] uppercase text-black/50">Image Preview</p>
          <div className="flex h-[220px] items-center justify-center">
            {!previewError ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={values.image.trim()}
                alt="Product preview"
                className="max-h-[220px] max-w-full rounded-xl object-contain"
                onError={() => setPreviewError(true)}
              />
            ) : (
              <p className="text-sm text-rose-700">Unable to load image preview.</p>
            )}
          </div>
        </div>
      )}

      {error && (
        <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
          {error}
        </p>
      )}

      <button type="submit" disabled={loading} className="btn-luxury w-full sm:w-auto">
        {loading ? loadingLabel : submitLabel}
      </button>
    </form>
  );
}
