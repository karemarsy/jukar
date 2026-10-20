import Image from "next/image";
import { gallery, type GalleryItem } from "@/content/gallery";
import { gallerySection } from "@/content/site";
import { AiBadge, SectionLabel } from "./ui";

function Caption({ item }: { item: GalleryItem }) {
  const meta = [item.date, item.place].filter(Boolean).join(" · ");
  return (
    <figcaption className="mt-4 flex gap-4 border-t border-ink/15 pt-3">
      <span className="flex-1 font-display text-[1.15rem] leading-snug text-ink">{item.caption}</span>
      {meta && <span className="label shrink-0 pt-0.5 text-ink-soft">{meta}</span>}
    </figcaption>
  );
}

/** Renders nothing until at least one item is published. */
export function Gallery({ number = "04" }: { number?: string }) {
  const items = gallery.filter((item) => item.published);
  const [featured, ...rest] = items;
  if (!featured) return null;

  // While every image is an AI illustration, don't claim these are real Jukar moments.
  const illustrative = items.every((item) => item.aiGenerated);
  const label = illustrative ? gallerySection.illustrativeLabel : gallerySection.label;
  const intro = illustrative ? gallerySection.illustrativeIntro : gallerySection.intro;

  return (
    <section id="field-notes" aria-labelledby="gallery-title" className="py-24 sm:py-32 lg:py-40">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionLabel number={number}>{label}</SectionLabel>
            <h2 id="gallery-title" className="display mt-7 text-[clamp(2.3rem,5.4vw,4.6rem)] text-forest">
              {gallerySection.title}
            </h2>
          </div>
          <p className="max-w-md text-lg leading-relaxed text-ink-soft lg:col-span-5 lg:justify-self-end">{intro}</p>
        </div>

        {/* Featured: a wide, cinematic crop */}
        <figure className="reveal mt-16">
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm sm:aspect-[16/9] lg:aspect-[21/9]">
            <Image
              src={featured.src}
              alt={featured.alt}
              fill
              sizes="(min-width: 1312px) 1232px, 100vw"
              className="object-cover"
              style={{ objectPosition: "50% 62%" }}
            />
            {featured.aiGenerated && <AiBadge className="bottom-3 left-3" />}
          </div>
          <Caption item={featured} />
        </figure>

        {/* The rest: a staggered editorial sequence that keeps each image's own shape */}
        {rest.length > 0 && (
          <div className="mt-14 gap-10 sm:columns-2 lg:columns-3">
            {rest.map((item) => (
              <figure key={item.src} className="reveal mb-12 break-inside-avoid">
                <div className="relative overflow-hidden rounded-sm">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    sizes="(min-width: 1024px) 26rem, (min-width: 640px) 45vw, 100vw"
                    className="h-auto w-full"
                  />
                  {item.aiGenerated && <AiBadge className="bottom-2.5 left-2.5" />}
                </div>
                <Caption item={item} />
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
