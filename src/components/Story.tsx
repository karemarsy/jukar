import type { CSSProperties } from "react";
import { images } from "@/content/images";
import { organization, story } from "@/content/site";
import { PhotoFrame } from "./PhotoFrame";
import { LogoMark, SectionLabel } from "./ui";

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
      <svg x="70" y="66" width="60" height="60" viewBox="0 0 40 40" className="text-forest">
        <LogoMark />
      </svg>
    </svg>
  );
}

export function Story({ number = "05" }: { number?: string }) {
  const hasFamilyWords = story.familyWords.length > 0;
  const paragraphs = hasFamilyWords ? story.familyWords : story.provisional;

  return (
    <section id="story" aria-labelledby="story-title" className="bg-paper-deep py-24 sm:py-32 lg:py-40">
      <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionLabel number={number}>{story.label}</SectionLabel>
          <h2 id="story-title" className="display mt-7 text-[clamp(2.3rem,5vw,4.2rem)] text-forest">
            {story.title}
          </h2>
          {images.story ? (
            <PhotoFrame
              photo={images.story}
              slot="story"
              sizes="(min-width: 1024px) 35vw, 100vw"
              className="mt-12 aspect-[4/3] rounded-sm"
              fallback={null}
            />
          ) : (
            <FamilyStamp className="mt-14 hidden w-44 -rotate-12 text-clay/80 lg:block" />
          )}
        </div>

        <div className="lg:col-span-7">
          <div
            className="ruled margin-rule relative bg-sheet pt-[4.8rem] pr-6 pb-[2.4rem] pl-10 shadow-[0_30px_60px_-36px_rgb(28_30_26/0.5)] sm:pr-12 sm:pl-16 [&::before]:left-6 sm:[&::before]:left-10"
            style={{ "--line": "2.4rem" } as CSSProperties}
          >
            {/* Each line of text sits on a ruled line: top padding and spacing are whole multiples of --line. */}
            <div className="-translate-y-[0.35rem] space-y-[2.4rem] font-display text-[1.2rem] leading-[2.4rem] text-ink sm:text-[1.35rem]">
              {paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            {hasFamilyWords && story.signature && (
              <p className="hand mt-8 text-[2rem] leading-[2.4rem] text-forest">{story.signature}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
