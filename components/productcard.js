import Link from "next/link";
import ProductImage from "./productimage";

export default function ProductCard({ product }) {
  const detailHref = `/products/${product.id}`;

  return (
    <Link
      href={detailHref}
      className="flex flex-col border border-gray-200 bg-white p-5 no-underline transition hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:no-underline"
    >
      <div className="relative mb-4 h-[260px] w-full">
        <ProductImage
          src={product.image}
          alt={product.title}
          productId={product.id}
        />
      </div>

      <h3 className="mb-2 line-clamp-2 text-base font-semibold text-black">
        {product.title}
      </h3>
      <p className="mb-3 font-semibold text-black">${product.price}</p>

      <span className="mt-auto text-sm text-black hover:underline">View Detail</span>
    </Link>
  );
}
