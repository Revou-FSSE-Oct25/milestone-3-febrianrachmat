import Link from "next/link";
import Layout from "../components/layout";
import ProductCatalog from "../components/productcatalog";
import EditorialStrip from "../components/editorialstrip";
import FeaturedCard from "../components/featuredcard";
import CategoryTile from "../components/categorytile";
import ProductRow from "../components/productrow";
import { useState } from "react";
import { useToast } from "../context/toastcontext";

const CURATED_CATEGORIES = [
  "Fashion",
  "Electronics",
  "Beauty",
  "Home",
  "Lifestyle",
  "Accessories",
];

export default function Home({ products, usedFallback }) {
  const heroProduct = products[0];
  const topProducts = products.slice(0, 3);
  const newArrivals = products.slice(3, 7);
  const bestSellers = [...products]
    .sort((a, b) => Number(b.price) - Number(a.price))
    .slice(0, 4);

  const heroImageSeed = heroProduct ? `etere-hero-${heroProduct.id}` : "etere-hero";

  const { showToast } = useToast();
  const [newsletterEmail, setNewsletterEmail] = useState("");

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim());
  }

  function handleNewsletterSubmit(e) {
    e.preventDefault();

    if (!isValidEmail(newsletterEmail)) {
      showToast("Please enter a valid email address.");
      return;
    }

    setNewsletterEmail("");
    showToast("Subscribed to The Editorial Letter.");
  }

  return (
    <Layout>
      <section className="app-panel reveal-up overflow-hidden rounded-2xl">
        <div className="grid md:grid-cols-[1.05fr_0.95fr]">
          <div className="flex flex-col justify-between p-7 md:p-12 lg:p-14">
            <p className="app-text-muted text-xs tracking-[0.22em] uppercase">Issue No. 03 — Spring</p>
            <div className="mt-16 md:mt-24">
              <h1 className="max-w-xl text-5xl font-medium leading-[1.05] md:text-6xl lg:text-7xl">
                Luxury essentials for modern, curated living.
              </h1>
              <p className="app-text-muted mt-6 max-w-md text-base leading-relaxed">
                A quiet edit of electronics, fashion, beauty, home, lifestyle, and accessories —
                composed like a design journal, not a catalog.
              </p>
              <a
                href="#shop-collection"
                className="btn-luxury mt-8 inline-flex items-center justify-center"
              >
                Shop Collection
              </a>
            </div>
            <p className="app-text-muted mt-12 hidden text-xs tracking-[0.16em] uppercase md:block">
              Jakarta — Curated Worldwide
            </p>
          </div>

          <div className="relative min-h-[340px] border-t border-[var(--line)] md:min-h-[520px] md:border-t-0 md:border-l">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://picsum.photos/seed/${encodeURIComponent(heroImageSeed)}/1200/1600`}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              loading="eager"
              decoding="async"
            />
            <div className="overlay-hero absolute inset-0 md:bg-gradient-to-l md:from-transparent md:to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <div className="luxury-surface app-panel p-5 backdrop-blur-sm md:max-w-[280px]">
                <p className="app-text-muted text-[11px] tracking-[0.18em] uppercase">Seasonal Selection</p>
                <p className="mt-2 font-serif text-xl">The Quiet Luxury Edit</p>
                <p className="app-text-muted mt-2 text-sm">
                  Understated pieces for refined rituals and elevated interiors.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="editorial-section reveal-up">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="app-text-muted text-xs tracking-[0.2em] uppercase">Departments</p>
            <h2 className="mt-2 text-4xl md:text-5xl">Curated Categories</h2>
          </div>
          <p className="app-text-muted max-w-xs text-sm">
            Six worlds of craft — arranged in an asymmetric magazine grid.
          </p>
        </div>
        <div className="magazine-bento">
          {CURATED_CATEGORIES.map((item, index) => (
            <CategoryTile key={item} name={item} index={index} />
          ))}
        </div>
      </section>

      <EditorialStrip
        label="The Atelier Journal"
        title="Design that whispers, never shouts."
        description="Objects selected for proportion, material honesty, and longevity — the same principles found in the houses we admire."
        imageSeed="etere-journal-strip"
      />

      <section className="editorial-section reveal-up">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="app-text-muted text-xs tracking-[0.2em] uppercase">Editor&apos;s Pick</p>
            <h2 className="mt-2 text-4xl md:text-5xl">Featured Products</h2>
          </div>
          <Link href="#shop-collection" className="link-editorial text-xs tracking-[0.18em] uppercase">
            View all pieces
          </Link>
        </div>

        {topProducts.length > 0 ? (
          <div className="magazine-featured-grid">
            <FeaturedCard product={topProducts[0]} variant="hero" />
            {topProducts.slice(1).map((product) => (
              <FeaturedCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="app-text-muted">Featured pieces will appear when products are available.</p>
        )}
      </section>

      <section className="editorial-section reveal-up grid gap-12 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <p className="app-text-muted text-xs tracking-[0.2em] uppercase">Just In</p>
          <h2 className="mt-2 mb-6 text-4xl md:text-5xl">New Arrivals</h2>
          <div className="space-y-3">
            {newArrivals.length > 0 ? (
              newArrivals.map((item) => <ProductRow key={item.id} product={item} />)
            ) : (
              <p className="app-text-muted text-sm">No new arrivals yet.</p>
            )}
          </div>
        </div>
        <div>
          <p className="app-text-muted text-xs tracking-[0.2em] uppercase">Most Coveted</p>
          <h2 className="mt-2 mb-6 text-4xl md:text-5xl">Best Sellers</h2>
          <div className="space-y-3">
            {bestSellers.length > 0 ? (
              bestSellers.map((item) => <ProductRow key={item.id} product={item} />)
            ) : (
              <p className="app-text-muted text-sm">No best sellers yet.</p>
            )}
          </div>
        </div>
      </section>

      <div className="editorial-section soft-divider" />

      <section className="editorial-section reveal-up grid gap-8 lg:grid-cols-2">
        <article className="luxury-surface app-panel p-8 md:p-10">
          <p className="app-text-muted text-xs tracking-[0.16em] uppercase">Testimonial</p>
          <p className="mt-4 font-serif text-3xl leading-snug md:text-4xl">
            &ldquo;Every detail feels intentional. Shopping here feels like reading a carefully
            edited design journal.&rdquo;
          </p>
          <p className="app-text-muted mt-5 text-sm">— Nadia Pratama, Interior Stylist</p>
        </article>
        <article className="luxury-surface app-panel app-chip p-8 md:p-10">
          <p className="app-text-muted text-xs tracking-[0.16em] uppercase">Newsletter</p>
          <h2 className="mt-4 text-4xl md:text-5xl">Join The Editorial Letter</h2>
          <p className="app-text-muted mt-4 max-w-md text-sm">
            Curated drops, design stories, and private previews — delivered with restraint.
          </p>
          <form
            className="mt-6 flex flex-col gap-3 sm:flex-row"
            onSubmit={handleNewsletterSubmit}
            noValidate
          >
            <input
              type="email"
              placeholder="Your email address"
              aria-label="Email for newsletter"
              className="w-full form-input"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
            />
            <button type="submit" className="btn-luxury shrink-0">
              Subscribe
            </button>
          </form>
        </article>
      </section>

      <section id="shop-collection" className="editorial-section scroll-mt-28 reveal-up">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="app-text-muted text-xs tracking-[0.2em] uppercase">The Collection</p>
            <h2 className="mt-2 text-4xl md:text-5xl">Shop The Collection</h2>
          </div>
          <p className="app-text-muted max-w-sm text-sm">
            Filter by category, search by name, and sort by price — all within the same editorial
            frame.
          </p>
        </div>
        <ProductCatalog products={products} usedFallback={usedFallback} />
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const { bootstrapProducts, getProducts, getUsedFallback } = await import(
    "../lib/products-data"
  );

  await bootstrapProducts();

  return {
    props: {
      products: getProducts(),
      usedFallback: getUsedFallback(),
    },
    revalidate: 60,
  };
}
