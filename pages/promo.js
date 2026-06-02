import Link from "next/link";
import Layout from "../components/layout";

export default function Promo() {
  return (
    <Layout>
      <header className="mb-10">
        <p className="page-eyebrow">The Journal</p>
        <h1 className="page-title mt-2">Seasonal Promotions</h1>
        <p className="app-text-muted mt-4 max-w-xl text-sm leading-relaxed">
          Curated offers presented with the same editorial restraint as our collection — meaningful
          value, never loud discounting.
        </p>
      </header>

      <article className="editorial-bleed editorial-section reveal-up">
        <div className="relative min-h-[280px] overflow-hidden rounded-2xl md:min-h-[360px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://picsum.photos/seed/etere-promo/2400/900"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          <div className="overlay-promo absolute inset-0" />
          <div className="relative flex min-h-[280px] flex-col justify-end p-8 md:min-h-[360px] md:p-12">
            <p className="text-xs tracking-[0.2em] uppercase text-white/80">Limited Edit</p>
            <h2 className="mt-3 max-w-lg font-serif text-4xl text-white md:text-5xl">
              Quiet Luxury Sale — up to 30% on selected pieces
            </h2>
            <Link
              href="/#shop-collection"
              className="btn-luxury mt-6 inline-flex w-fit no-underline hover:no-underline"
            >
              Shop Offer
            </Link>
          </div>
        </div>
      </article>
    </Layout>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
