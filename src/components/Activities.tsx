import { images } from "@/content/images";
import { activities } from "@/content/site";
import { ClassroomScene, SuppliesStillLife } from "./Illustrations";
import { PhotoFrame } from "./PhotoFrame";
import { SectionLabel } from "./ui";

export function Activities() {
  const { school, care } = activities;

  return (
    <section id="activities" aria-labelledby="activities-title">
      {/* Introduction */}
      <div className="shell grid gap-8 pb-16 lg:grid-cols-12 lg:items-end lg:pb-24">
        <div className="lg:col-span-7">
          <SectionLabel number="02">{activities.label}</SectionLabel>
          <h2 id="activities-title" className="display mt-7 text-[clamp(2.3rem,5.4vw,4.6rem)] text-forest">
            {activities.title}
          </h2>
        </div>
        <p className="max-w-md text-lg leading-relaxed text-ink-soft lg:col-span-5 lg:justify-self-end">
          {activities.intro}
        </p>
      </div>

      {/* A — Going to school */}
      <article id="school" aria-labelledby="school-title" className="on-dark relative bg-forest text-paper">
        <div className="shell grid items-center gap-12 py-20 sm:py-24 lg:grid-cols-12 lg:gap-16 lg:py-32">
          <div className="relative lg:col-span-7">
            <span
              aria-hidden="true"
              className="display pointer-events-none absolute -top-16 -left-2 z-10 text-[9rem] text-sun italic select-none sm:-top-20 sm:text-[12rem] lg:-left-10"
            >
              A
            </span>
            <PhotoFrame
              photo={images.fees}
              slot="fees"
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="aspect-[5/4] rounded-sm shadow-[0_40px_80px_-40px_rgb(0_0_0/0.6)]"
              fallback={<ClassroomScene />}
            />
          </div>
          <div className="lg:col-span-5">
            <p className="label text-sun-soft">{school.kicker}</p>
            <h3 id="school-title" className="display reveal mt-5 text-[clamp(2.1rem,4.4vw,3.6rem)]">
              {school.title}
            </h3>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-paper/85">
              {school.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <p aria-hidden="true" className="hand mt-10 inline-block -rotate-2 text-3xl text-sun-soft">
              {school.note}
            </p>
          </div>
        </div>
      </article>

      {/* B — Care and love */}
      <article id="care" aria-labelledby="care-title" className="relative">
        <div className="shell grid items-center gap-14 py-20 sm:py-24 lg:grid-cols-12 lg:gap-16 lg:py-32">
          <div className="relative lg:col-span-5">
            <span
              aria-hidden="true"
              className="display pointer-events-none absolute -top-20 right-0 text-[9rem] text-clay italic opacity-90 select-none sm:-top-24 sm:text-[12rem] lg:-top-28"
            >
              B
            </span>
            <p className="label text-clay-ink">{care.kicker}</p>
            <h3 id="care-title" className="display reveal mt-5 text-[clamp(2.1rem,4.4vw,3.6rem)] text-forest">
              {care.title}
            </h3>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink-soft">
              {care.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>

          <figure className="relative lg:col-span-7">
            <div className="-rotate-1 bg-sheet p-3 pb-14 shadow-[0_30px_60px_-36px_rgb(28_30_26/0.5)] sm:p-4 sm:pb-16">
              <span aria-hidden="true" className="tape -top-3 right-10 z-10 rotate-3" />
              <PhotoFrame
                photo={images.materials}
                slot="materials"
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="aspect-[3/2]"
                fallback={<SuppliesStillLife />}
              />
              <figcaption aria-hidden="true" className="hand absolute bottom-3 left-6 text-[1.8rem] text-clay-ink sm:bottom-4">
                you are not alone
              </figcaption>
            </div>
          </figure>
        </div>
      </article>
    </section>
  );
}
