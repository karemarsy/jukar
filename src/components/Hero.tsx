import type { CSSProperties } from "react";
import { images } from "@/content/images";
import { hero, organization } from "@/content/site";
import { HeroBook } from "./HeroBook";
import { ScribbleUnderline } from "./Illustrations";
import { Icon } from "./ui";

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-x-clip">
      {/* A paper-deep “page” behind the book */}
      <div
        aria-hidden="true"
        className="absolute top-6 right-[-12rem] bottom-16 hidden w-[58%] rounded-l-[4rem] bg-paper-deep lg:block"
      />
      <div className="shell relative grid items-center gap-x-10 gap-y-16 pt-8 pb-16 sm:pt-12 lg:grid-cols-12 lg:pt-16 lg:pb-20">
        <div className="lg:col-span-7">
          <p className="label enter-fade flex items-center gap-2.5 text-clay-ink" style={delay(0)}>
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-sun ring-4 ring-sun/30" />
            {hero.eyebrow}
          </p>

          <h1 id="hero-title" className="display type-hero enter-rise mt-6 text-forest lg:text-[clamp(4rem,7.2vw,7.6rem)]">
            {hero.headline.before}{" "}
            <span className="relative isolate inline-block whitespace-nowrap">
              <em>{hero.headline.emphasis}</em>
              <ScribbleUnderline className="absolute -bottom-[0.04em] left-[-0.04em] -z-10 h-[0.28em] w-[104%]" />
            </span>
          </h1>

          {/* Moves but never fades: on phones this paragraph is the largest element, so it must be visible at first paint. */}
          <p className="type-lede enter-rise mt-8 max-w-[34rem] text-ink-soft" style={delay(80)}>
            {hero.lede}
          </p>

          <div className="enter-fade mt-10 flex flex-col gap-3 sm:flex-row sm:items-center" style={delay(220)}>
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

        {/* No fade on the book: it holds the hero picture, which must paint immediately. */}
        <div className="relative pb-8 lg:col-span-5 lg:pb-0">
          <HeroBook photo={images.hero} tagline={organization.tagline} />
        </div>
      </div>
    </section>
  );
}
