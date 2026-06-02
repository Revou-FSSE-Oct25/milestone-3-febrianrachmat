import { useEffect, useMemo, useState } from "react";
import ProductCard from "./productcard";
import { filterAndSortProducts, getProductCategories } from "../lib/filter-products";
import { fetchCategories } from "../lib/fetch-categories";

function ProductSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-black/8 bg-white p-5">
      <div className="mb-4 h-[260px] w-full rounded-2xl bg-black/8" />
      <div className="mb-2.5 h-4 rounded bg-black/8" />
      <div className="h-4 w-3/5 rounded bg-black/8" />
    </div>
  );
}

const inputClass = "form-input";

export default function ProductCatalog({ products, usedFallback = false }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");
  const [apiCategories, setApiCategories] = useState([]);

  useEffect(() => {
    fetchCategories().then(setApiCategories);
  }, []);

  const categories = useMemo(() => {
    const merged = new Set([...apiCategories, ...getProductCategories(products)]);
    return [...merged].sort();
  }, [apiCategories, products]);

  const filteredProducts = useMemo(
    () => filterAndSortProducts(products, { search, category, sort }),
    [products, search, category, sort]
  );

  if (products.length === 0) {
    return (
      <div data-testid="product-catalog" className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div data-testid="product-catalog">
      {usedFallback && (
        <div className="banner-editorial mb-8" role="status">
          Product API is unavailable. Showing cached sample products instead.
        </div>
      )}

      <div className="luxury-surface mb-10 flex flex-col gap-4 border border-black/7 p-5 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row">
          <label className="flex flex-1 flex-col gap-1 text-sm font-medium text-black/75">
            Search
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by product name..."
              className={inputClass}
            />
          </label>

          <label className="flex flex-col gap-1 text-sm font-medium text-black/75 sm:min-w-[180px]">
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

        <label className="flex flex-col gap-1 text-sm font-medium text-black/75 sm:min-w-[200px]">
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
        <p className="text-lg text-black/55">No products match your filters.</p>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
