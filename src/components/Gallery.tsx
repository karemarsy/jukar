import { gallery } from "@/content/gallery";
import { gallerySection, hero } from "@/content/site";
import { GalleryCarousel, type CarouselItem } from "./GalleryCarousel";
import { Icon, LogoMark, SectionLabel } from "./ui";

/** “A journey of hope”. Renders nothing until at least one picture is published. */
export function Gallery({ number = "04" }: { number?: string }) {
  const published = gallery.filter((item) => item.published);
  if (published.length === 0) return null;

  // While every picture is an AI illustration, say so plainly and don't claim real Jukar moments.
  const illustrative = published.every((item) => item.aiGenerated);
  const label = illustrative ? gallerySection.illustrativeLabel : gallerySection.label;

  const items: CarouselItem[] = published.map((item) => ({
    src: item.src,
    alt: item.alt,
    width: item.width,
    height: item.height,
    title: item.title ?? item.caption.replace(/[.,].*$/, ""),
    caption: item.caption,
    meta: [item.date, item.place].filter(Boolean).join(" · ") || undefined,
    aiGenerated: item.aiGenerated,
  }));

  return (
    <section id="stories" aria-labelledby="gallery-title" className="relative overflow-x-clip pt-24 sm:pt-32 lg:pt-40">
      {/* A soft paper shape behind the heading */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 -left-48 h-[34rem] w-[34rem] rounded-full bg-paper-deep/80 blur-2xl"
      />

      <div className="shell relative">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <SectionLabel number={number}>{label}</SectionLabel>
            <h2 id="gallery-title" className="display reveal mt-8 text-[clamp(2.9rem,8.2vw,7.2rem)] text-forest">
              <span className="block">{gallerySection.title.first}</span>
              <em className="block pl-[6%] text-clay-ink">{gallerySection.title.second}</em>
            </h2>
          </div>
          <div className="lg:col-span-4 lg:pb-4">
            <p className="type-lede max-w-md text-ink-soft">{gallerySection.intro}</p>
            {illustrative && (
              <p className="mt-4 flex max-w-md items-start gap-2.5 text-[0.95rem] text-ink-soft">
                <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full bg-sun" />
                {gallerySection.illustrativeNote}
              </p>
            )}
          </div>
        </div>
      </div>

      <GalleryCarousel items={items} />

      {/* Second, quieter motion: a dashed path that draws itself as you scroll */}
      <div className="shell relative mt-14" aria-hidden="true">
        <svg viewBox="0 0 1200 90" preserveAspectRatio="none" className="scroll-reveal-x h-14 w-full text-clay sm:h-16">
          <path
            d="M10 62C200 12 380 86 600 46s400-26 580 10"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeDasharray="2 11"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          <circle cx="1182" cy="56" r="7" fill="var(--color-sun)" />
        </svg>
        <p className="hand reveal absolute -top-8 right-[6%] left-[6%] -rotate-2 text-right text-[1.6rem] leading-tight text-clay-ink sm:-top-6 sm:left-auto sm:text-[2.1rem]">
          {gallerySection.journeyNote}
        </p>
        {/* A small paper airplane, heading out along the path */}
        <svg viewBox="0 0 64 48" className="scroll-drift absolute -top-16 left-[14%] hidden w-14 text-forest sm:block">
          <path d="M2 22 62 2 40 46 30 30z" fill="var(--color-white)" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M30 30 62 2M30 30l-4 12 10-7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Closing transition: paper fades into the next section */}
      <div className="relative mt-14 bg-gradient-to-b from-paper to-paper-deep pt-16 pb-28 sm:pb-36">
        <LogoMark
          aria-hidden="true"
          className="pointer-events-none absolute right-[3%] bottom-8 h-56 w-56 text-forest opacity-[0.06] sm:h-80 sm:w-80"
        />
        <div className="shell relative grid gap-8 lg:grid-cols-12 lg:items-end">
          <h3 className="display reveal text-[clamp(2.4rem,5.6vw,4.8rem)] leading-[1] text-forest lg:col-span-7">
            {gallerySection.closingTitle}
          </h3>
          <div className="lg:col-span-5">
            <p className="type-lede max-w-md text-ink-soft">{gallerySection.closingBody}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href="#support" className="btn btn-primary text-[1.05rem]">
                {hero.primaryCta}
                <Icon name="arrow" className="btn-arrow h-5 w-5" />
              </a>
              <a href="#mission" className="btn btn-ghost text-[1.05rem]">
                {gallerySection.closingSecondary}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
