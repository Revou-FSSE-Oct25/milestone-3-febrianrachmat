import Link from "next/link";
import ProductImage from "./productimage";

export default function FeaturedCard({ product, variant = "default" }) {
  const detailHref = `/products/${product.id}`;
  const isHero = variant === "hero";

  return (
    <Link
      href={detailHref}
      className={`app-card group relative overflow-hidden rounded-2xl no-underline transition duration-500 hover:no-underline ${
        isHero
          ? "col-span-1 row-span-2 min-h-[420px] md:col-span-2"
          : "min-h-[280px]"
      }`}
    >
      <div className={`app-chip relative w-full overflow-hidden ${isHero ? "h-[62%] md:h-[68%]" : "h-[58%]"}`}>
        <ProductImage
          src={product.image}
          alt={product.title}
          productId={product.id}
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="overlay-featured-hover absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100" />
      </div>

      <div className={`p-5 ${isHero ? "md:p-7" : ""}`}>
        <p className="app-text-muted text-[11px] tracking-[0.18em] uppercase">{product.category}</p>
        <h3
          className={`mt-2 font-serif font-medium ${
            isHero ? "text-2xl md:text-3xl" : "text-xl"
          }`}
        >
          {product.title}
        </h3>
        <p className="mt-2 text-sm font-semibold">${product.price}</p>
        <span className="link-editorial mt-4 inline-block text-xs tracking-[0.18em] uppercase">
          Discover
        </span>
      </div>
    </Link>
  );
}
