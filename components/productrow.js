import Link from "next/link";
import ProductImage from "./productimage";

export default function ProductRow({ product }) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="app-card group flex items-center gap-4 rounded-2xl p-4 no-underline transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(17,24,39,0.08)] hover:no-underline"
    >
      <div className="app-chip relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
        <ProductImage
          src={product.image}
          alt={product.title}
          productId={product.id}
          className="object-cover"
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="app-text-muted text-[10px] tracking-[0.16em] uppercase">{product.category}</p>
        <p className="truncate font-serif text-lg">{product.title}</p>
      </div>
      <p className="shrink-0 text-sm font-semibold">${product.price}</p>
    </Link>
  );
}
