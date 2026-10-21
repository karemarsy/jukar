import { gallery } from "@/content/gallery";
import { gallerySection } from "@/content/site";
import { GalleryLightbox, type LightboxItem } from "./GalleryLightbox";
import { SectionLabel } from "./ui";

/** Renders nothing until at least one item is published. */
export function Gallery({ number = "04" }: { number?: string }) {
  const published = gallery.filter((item) => item.published);
  if (published.length === 0) return null;

  // While every picture is an AI illustration, don't claim these are real Jukar moments.
  const illustrative = published.every((item) => item.aiGenerated);
  const label = illustrative ? gallerySection.illustrativeLabel : gallerySection.label;
  const intro = illustrative ? gallerySection.illustrativeIntro : gallerySection.intro;

  const items: LightboxItem[] = published.map((item) => ({
    src: item.src,
    alt: item.alt,
    width: item.width,
    height: item.height,
    caption: item.caption,
    meta: [item.date, item.place].filter(Boolean).join(" · ") || undefined,
    aiGenerated: item.aiGenerated,
  }));

  return (
    <section id="stories" aria-labelledby="gallery-title" className="py-24 sm:py-32 lg:py-40">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <SectionLabel number={number}>{label}</SectionLabel>
            <h2 id="gallery-title" className="display type-section reveal mt-8 text-forest">
              {gallerySection.title}
            </h2>
          </div>
          <p className="type-lede max-w-md text-ink-soft lg:col-span-4 lg:justify-self-end">{intro}</p>
        </div>

        <GalleryLightbox items={items} />
      </div>
    </section>
  );
}
