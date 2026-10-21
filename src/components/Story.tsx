import type { CSSProperties } from "react";
import { images } from "@/content/images";
import { organization, story } from "@/content/site";
import { PhotoFrame } from "./PhotoFrame";
import { LogoMark, PageEdge, SectionLabel } from "./ui";

/** A circular “stamp”: family-led · Rwanda. */
function FamilyStamp({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true" focusable="false">
      <defs>
        <path id="stamp-circle" d="M100 100m-72 0a72 72 0 1 1 144 0a72 72 0 1 1-144 0" />
      </defs>
      <circle cx="100" cy="100" r="94" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="100" cy="100" r="54" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <text fill="currentColor" fontSize="15" letterSpacing="4.2" fontWeight="600" style={{ fontFamily: "var(--font-sans)" }}>
        <textPath href="#stamp-circle">A FAMILY-LED INITIATIVE · {organization.country.toUpperCase()} ·</textPath>
      </text>
      <svg x="70" y="66" width="60" height="60" viewBox="0 0 40 40" className="text-navy">
        <LogoMark />
      </svg>
    </svg>
  );
}

export function Story({ number = "05" }: { number?: string }) {
  const hasFamilyWords = story.familyWords.length > 0;
  const paragraphs = hasFamilyWords ? story.familyWords : story.provisional;

  return (
    <section id="story" aria-labelledby="story-title" className="relative bg-ivory-deep">
      <PageEdge fill="var(--color-ivory-deep)" className="absolute inset-x-0 bottom-full" />
      <div className="shell py-24 sm:py-32 lg:py-40">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-9">
            <SectionLabel number={number}>{story.label}</SectionLabel>
            <h2 id="story-title" className="display type-section reveal mt-8 text-navy">
              {story.title}
            </h2>
          </div>
          <FamilyStamp className="hidden w-36 -rotate-12 justify-self-end text-blue-deep/70 lg:col-span-3 lg:block" />
        </div>

        <div className="mt-16 grid items-start gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-0">
          {images.story && (
            <figure className="relative lg:col-span-5 lg:mt-10">
              <div className="rotate-[-2deg] bg-white p-3 pb-12 shadow-[0_40px_70px_-40px_rgb(20_43_74/0.55)] sm:p-4 sm:pb-14">
                <span aria-hidden="true" className="tape -top-3 left-10 z-10 -rotate-6" />
                <PhotoFrame photo={images.story} slot="story" sizes="(min-width: 1024px) 34vw, 100vw" className="aspect-[4/3]" fallback={null} />
              </div>
            </figure>
          )}

          <div className={`relative z-10 ${images.story ? "lg:col-span-7 lg:-ml-10" : "lg:col-span-8"}`}>
            <div
              className="ruled margin-rule relative rounded-[4px] bg-white pt-[2.4rem] pr-5 pb-[2.4rem] pl-10 shadow-[0_40px_70px_-40px_rgb(20_43_74/0.5)] sm:pt-[4.8rem] sm:pr-12 sm:pl-16 [&::before]:left-6 sm:[&::before]:left-10"
              style={{ "--line": "2.4rem" } as CSSProperties}
            >
              {/* Each line of text sits on a ruled line: top padding and spacing are whole multiples of --line. */}
              <div className="translate-y-[0.32rem] space-y-[2.4rem] font-display text-[1.3rem] leading-[2.4rem] text-navy sm:text-[1.5rem]">
                {paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              {hasFamilyWords && story.signature && (
                <p className="hand mt-8 text-[2rem] leading-[2.4rem] text-blue-deep">{story.signature}</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <PageEdge fill="var(--color-navy)" className="absolute inset-x-0 top-full" />
    </section>
  );
}
