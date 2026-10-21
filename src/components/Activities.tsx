import { images } from "@/content/images";
import { activities } from "@/content/site";
import { ClassroomScene, SuppliesStillLife } from "./Illustrations";
import { PhotoFrame } from "./PhotoFrame";
import { PageEdge, SectionLabel } from "./ui";

const zoom = "transition-transform duration-[900ms] ease-[var(--ease-out-soft)] group-hover:scale-[1.04] motion-reduce:transition-none";

export function Activities({ number = "02" }: { number?: string }) {
  const { school, care } = activities;

  return (
    <section id="activities" aria-labelledby="activities-title">
      {/* Introduction */}
      <div className="shell grid gap-8 pb-20 lg:grid-cols-12 lg:items-end lg:pb-28">
        <div className="lg:col-span-8">
          <SectionLabel number={number}>{activities.label}</SectionLabel>
          <h2 id="activities-title" className="display type-section reveal mt-8 text-forest">
            {activities.title}
          </h2>
        </div>
        <p className="type-lede max-w-md text-ink-soft lg:col-span-4 lg:justify-self-end">{activities.intro}</p>
      </div>

      {/* 01 — Going to school: a full-bleed forest chapter */}
      <article id="school" aria-labelledby="school-title" className="on-dark relative bg-forest text-paper">
        <PageEdge fill="var(--color-forest)" className="absolute inset-x-0 bottom-full" />
        <div className="shell grid items-center gap-12 py-20 sm:py-24 lg:grid-cols-12 lg:gap-16 lg:py-32">
          <div className="group relative lg:col-span-7">
            <PhotoFrame
              photo={images.fees}
              slot="fees"
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="aspect-[5/4] rounded-[2rem] shadow-[0_50px_90px_-50px_rgb(0_0_0/0.7)]"
              imgClassName={zoom}
              fallback={<ClassroomScene />}
            />
          </div>
          <div className="lg:col-span-5">
            <p aria-hidden="true" className="display text-[clamp(4.5rem,9vw,7.5rem)] leading-none text-sun italic">
              01
            </p>
            <p className="label mt-4 text-sun">{school.kicker}</p>
            <h3 id="school-title" className="display type-title reveal mt-4">
              {school.title}
            </h3>
            <div className="mt-7 space-y-5 text-lg leading-relaxed text-paper/80">
              {school.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <p aria-hidden="true" className="hand mt-9 inline-block -rotate-2 text-3xl text-sun">
              {school.note}
            </p>
          </div>
        </div>
        <PageEdge fill="var(--color-paper)" className="absolute inset-x-0 top-full rotate-180" />
      </article>

      {/* 02 — Care and love: a print taped into the page */}
      <article id="care" aria-labelledby="care-title" className="relative">
        <div className="shell grid items-center gap-14 py-24 sm:py-28 lg:grid-cols-12 lg:gap-16 lg:py-36">
          <div className="lg:order-2 lg:col-span-7">
            <figure className="group relative">
              <div className="rotate-[-1.2deg] rounded-[6px] bg-white p-3 pb-16 shadow-[0_40px_70px_-40px_rgb(31_59_45/0.55)] sm:p-4 sm:pb-[4.5rem]">
                <span aria-hidden="true" className="tape -top-3 right-12 z-10 rotate-3" />
                <PhotoFrame
                  photo={images.materials}
                  slot="materials"
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="aspect-[3/2]"
                  imgClassName={zoom}
                  fallback={<SuppliesStillLife />}
                />
                <figcaption aria-hidden="true" className="hand absolute bottom-3 left-6 text-[1.9rem] text-clay-ink sm:bottom-4">
                  {care.note}
                </figcaption>
              </div>
            </figure>
          </div>
          <div className="lg:order-1 lg:col-span-5">
            <p aria-hidden="true" className="display text-[clamp(4.5rem,9vw,7.5rem)] leading-none text-clay italic">
              02
            </p>
            <p className="label mt-4 text-clay-ink">{care.kicker}</p>
            <h3 id="care-title" className="display type-title reveal mt-4 text-forest">
              {care.title}
            </h3>
            <div className="mt-7 space-y-5 text-lg leading-relaxed text-ink-soft">
              {care.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
