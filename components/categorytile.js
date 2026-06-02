import Link from "next/link";

const CATEGORY_SEEDS = {
  Electronics: "etere-electronics",
  Fashion: "etere-fashion",
  Beauty: "etere-beauty",
  Home: "etere-home",
  Lifestyle: "etere-lifestyle",
  Accessories: "etere-accessories",
};

const BENTO_LAYOUT = {
  Fashion: "md:col-span-2 md:row-span-2 min-h-[280px] md:min-h-[360px]",
  Electronics: "md:col-span-2 min-h-[180px]",
  Beauty: "min-h-[180px]",
  Home: "min-h-[180px]",
  Lifestyle: "min-h-[180px]",
  Accessories: "min-h-[180px]",
};

export default function CategoryTile({ name, index }) {
  const seed = CATEGORY_SEEDS[name] ?? `etere-${name}`;
  const imageUrl = `https://picsum.photos/seed/${encodeURIComponent(seed)}/900/1100`;
  const layout = BENTO_LAYOUT[name] ?? "min-h-[180px]";

  return (
    <Link
      href="#shop-collection"
      className={`group relative overflow-hidden rounded-2xl border border-black/8 no-underline transition duration-500 hover:no-underline ${layout}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageUrl}
        alt=""
        className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
        loading="lazy"
        decoding="async"
      />
      <div className="overlay-category absolute inset-0" />
      <div className="relative flex h-full min-h-[inherit] flex-col justify-end p-5 md:p-6">
        <p className="text-[11px] tracking-[0.2em] uppercase text-white/65">{`0${index + 1}`}</p>
        <h3 className="mt-2 font-serif text-2xl text-white md:text-3xl">{name}</h3>
        <span className="link-editorial-light mt-3 inline-block text-[11px] tracking-[0.18em] uppercase text-white/80">
          Explore
        </span>
      </div>
    </Link>
  );
}
