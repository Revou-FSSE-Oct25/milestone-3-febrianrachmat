import { useMemo, useState } from "react";
import ProductCard from "./productcard";
import { filterAndSortProducts, getProductCategories } from "../lib/filter-products";

function ProductSkeleton() {
  return (
    <div className="animate-pulse border border-gray-200 p-5">
      <div className="mb-4 h-[260px] w-full bg-gray-200" />
      <div className="mb-2.5 h-4 bg-gray-200" />
      <div className="h-4 w-3/5 bg-gray-200" />
    </div>
  );
}

const inputClass =
  "rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none";

export default function ProductCatalog({ products, usedFallback = false }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");

  const categories = useMemo(() => getProductCategories(products), [products]);

  const filteredProducts = useMemo(
    () => filterAndSortProducts(products, { search, category, sort }),
    [products, search, category, sort]
  );

  if (products.length === 0) {
    return (
      <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <>
      {usedFallback && (
        <div
          className="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"
          role="status"
        >
          Product API is unavailable. Showing cached sample products instead.
        </div>
      )}

      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row">
          <label className="flex flex-1 flex-col gap-1 text-sm font-medium">
            Search
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by product name..."
              className={inputClass}
            />
          </label>

          <label className="flex flex-col gap-1 text-sm font-medium sm:min-w-[180px]">
            Category
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={inputClass}
            >
              <option value="all">All categories</option>
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="flex flex-col gap-1 text-sm font-medium sm:min-w-[200px]">
          Sort by
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className={inputClass}
          >
            <option value="default">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="title-asc">Name: A to Z</option>
          </select>
        </label>
      </div>

      {filteredProducts.length === 0 ? (
        <p className="text-lg text-gray-500">No products match your filters.</p>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </>
  );
}
