export default function EditorialStrip({ label, title, description, imageSeed = "etere-editorial" }) {
  const imageUrl = `https://picsum.photos/seed/${encodeURIComponent(imageSeed)}/2400/900`;

  return (
    <section className="editorial-bleed editorial-section reveal-up">
      <div className="relative min-h-[320px] overflow-hidden rounded-2xl md:min-h-[420px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt=""
          className="absolute inset-0 h-full w-full object-cover transition duration-[1.2s] ease-out hover:scale-[1.03]"
          loading="lazy"
          decoding="async"
        />
        <div className="overlay-editorial absolute inset-0" />
        <div className="relative flex h-full min-h-[320px] flex-col justify-end p-8 md:min-h-[420px] md:p-14">
          <p className="text-xs tracking-[0.22em] uppercase text-white/70">{label}</p>
          <h2 className="mt-3 max-w-xl font-serif text-4xl text-white md:text-6xl">{title}</h2>
          {description && (
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/85 md:text-base">
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
