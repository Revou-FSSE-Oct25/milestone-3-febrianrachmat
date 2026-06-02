import Link from "next/link";
import Image from "next/image";

export default function ProductCard({ product }) {
  return (
    <div className="flex flex-col border border-gray-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
      <div className="relative mb-4 h-[260px] w-full">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 240px"
        />
      </div>

      <h3 className="mb-2 line-clamp-2 text-base font-semibold">{product.title}</h3>
      <p className="mb-3 font-semibold">${product.price}</p>

      <Link
        href={`/products/${product.id}`}
        className="mt-auto text-sm no-underline hover:underline"
      >
        View Detail
      </Link>
    </div>
  );
}
