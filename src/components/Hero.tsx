import { images } from "@/content/images";
import { activities, hero } from "@/content/site";
import { HandArrow, ScribbleUnderline, SuppliesStillLife } from "./Illustrations";
import { PhotoFrame } from "./PhotoFrame";
import { Icon } from "./ui";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative">
      <div className="shell grid items-center gap-x-12 gap-y-14 pt-8 pb-16 sm:pt-12 lg:grid-cols-12 lg:pt-14 lg:pb-24">
        <div className="lg:col-span-7">
          <p className="label flex items-center gap-2.5 text-forest">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-sun ring-4 ring-sun/25" />
            {hero.eyebrow}
          </p>

          <h1 id="hero-title" className="display mt-6 text-[clamp(2.9rem,8.2vw,7rem)] text-forest">
            {hero.headline.before}{" "}
            <span className="relative isolate inline-block whitespace-nowrap">
              <em>{hero.headline.emphasis}</em>
              <ScribbleUnderline className="absolute -bottom-[0.06em] left-[-0.04em] -z-10 h-[0.32em] w-[104%]" />
            </span>
          </h1>

          <p className="mt-8 max-w-[36rem] text-lg leading-relaxed text-ink-soft sm:text-xl">{hero.lede}</p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href="#support" className="btn btn-primary text-[1.05rem]">
              {hero.primaryCta}
              <Icon name="arrow" className="btn-arrow h-5 w-5" />
            </a>
            <a href="#activities" className="btn btn-ghost text-[1.05rem]">
              {hero.secondaryCta}
              <Icon name="arrow-down" className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="relative lg:col-span-5">
          <HandArrow className="absolute -top-2 -left-28 hidden w-28 -rotate-6 text-clay xl:block" />
          <figure className="relative mx-auto max-w-[28rem] rotate-[1.6deg]">
            <span aria-hidden="true" className="tape -top-3 left-6 z-10 -rotate-[8deg]" />
            <span aria-hidden="true" className="tape -right-5 bottom-20 z-10 rotate-[64deg]" />
            <div className="bg-sheet p-3 pb-16 shadow-[0_40px_70px_-40px_rgb(28_30_26/0.55)] sm:p-4 sm:pb-[4.5rem]">
              <PhotoFrame
                photo={images.hero}
                slot="hero"
                priority
                sizes="(min-width: 1024px) 28rem, 90vw"
                className="aspect-[4/5]"
                fallback={<SuppliesStillLife />}
              />
              <figcaption className="hand absolute right-5 bottom-4 left-5 text-[1.7rem] text-forest sm:bottom-5">
                {hero.annotation}
              </figcaption>
            </div>
          </figure>
        </div>
      </div>

      {/* Quick links into the two “What we do” chapters */}
      <div className="shell">
        <nav aria-label="How we help" className="grid border-y border-ink/15 sm:grid-cols-2">
          {[
            { href: "#school", letter: "A", kicker: activities.school.kicker, title: activities.school.title },
            { href: "#care", letter: "B", kicker: activities.care.kicker, title: activities.care.title },
          ].map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-5 py-6 transition-colors hover:bg-ink/[0.03] sm:px-6 ${
                i === 1 ? "border-t border-ink/15 sm:border-t-0 sm:border-l" : ""
              }`}
            >
              <span className="display text-5xl text-clay italic">{item.letter}</span>
              <span className="flex-1">
                <span className="label block text-ink-soft">{item.kicker}</span>
                <span className="mt-1 block font-display text-xl text-forest">{item.title}</span>
              </span>
              <Icon name="arrow-down" className="h-5 w-5 text-forest transition-transform group-hover:translate-y-1" />
            </a>
          ))}
        </nav>
      </div>
    </section>
  );
}
