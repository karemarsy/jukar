import type { CSSProperties } from "react";
import { mission } from "@/content/site";
import { HandCheck } from "./Illustrations";
import { SectionLabel } from "./ui";

export function Mission() {
  return (
    <section id="mission" aria-labelledby="mission-title" className="py-24 sm:py-32 lg:py-40">
      <div className="shell grid gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="margin-rule pl-6 sm:pl-10 lg:col-span-7">
          <SectionLabel number="01">{mission.label}</SectionLabel>
          <h2 id="mission-title" className="display reveal mt-7 text-[clamp(2.3rem,5.4vw,4.6rem)] text-forest">
            {mission.statement}
          </h2>
          <div className="mt-10 max-w-2xl space-y-5 text-lg leading-relaxed text-ink-soft sm:text-[1.2rem]">
            {mission.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <div className="reveal mt-12 max-w-2xl border-t border-ink/15 pt-8">
            <h3 className="label font-sans text-clay-ink">{mission.forWhom.label}</h3>
            <ul className="mt-5 space-y-3">
              {mission.forWhom.groups.map((group) => (
                <li key={group} className="flex gap-4 font-display text-[clamp(1.3rem,2.4vw,1.65rem)] leading-snug text-forest">
                  <span aria-hidden="true" className="mt-[0.55em] h-2.5 w-2.5 shrink-0 rounded-full bg-sun" />
                  {group}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-lg leading-relaxed text-ink-soft sm:text-[1.2rem]">{mission.forWhom.body}</p>
          </div>
        </div>

        <aside aria-labelledby="needs-title" className="reveal lg:col-span-5 lg:pt-28">
          <div
            className="ruled relative -rotate-1 bg-sheet px-4 pt-6 pb-4 shadow-[0_24px_50px_-30px_rgb(28_30_26/0.45)] min-[360px]:px-6 sm:px-8"
            style={{ "--line": "3rem" } as CSSProperties}
          >
            <span aria-hidden="true" className="tape -top-3 left-1/2 -translate-x-1/2 rotate-2" />
            <h3 id="needs-title" className="hand text-[1.65rem] leading-[3rem] text-clay-ink min-[360px]:text-[1.85rem] sm:text-[2rem]">
              {mission.needsTitle}
            </h3>
            <ul className="mt-0">
              {mission.needs.map((need) => (
                <li
                  key={need}
                  className="flex items-center gap-2.5 font-display text-[0.98rem] leading-[3rem] whitespace-nowrap text-ink min-[360px]:text-[1.08rem] sm:gap-3 sm:text-xl"
                >
                  <HandCheck className="h-5 w-5 shrink-0 text-ink sm:h-6 sm:w-6" />
                  {need}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}
