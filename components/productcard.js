import Link from "next/link";
import ProductImage from "./productimage";

export default function ProductCard({ product }) {
  const detailHref = `/products/${product.id}`;

  return (
    <Link
      href={detailHref}
      className="luxury-surface app-card group flex flex-col p-5 no-underline transition duration-500 hover:-translate-y-1 hover:shadow-[0_18px_34px_rgba(17,24,39,0.11)] hover:no-underline"
    >
      <div className="app-chip relative mb-5 h-[270px] w-full overflow-hidden rounded-2xl">
        <ProductImage
          src={product.image}
          alt={product.title}
          productId={product.id}
          className="object-contain transition duration-700 group-hover:scale-105"
        />
      </div>

      <p className="app-text-muted mb-2 text-[11px] tracking-[0.16em] uppercase">
        {product.category}
      </p>
      <h3 className="mb-2 line-clamp-2 font-serif text-xl font-medium">
        {product.title}
      </h3>
      <p className="mb-4 text-base font-semibold">${product.price}</p>

      <span className="link-editorial app-text-muted mt-auto text-xs font-medium tracking-[0.18em] uppercase">
        View Detail
      </span>
    </Link>
  );
}
