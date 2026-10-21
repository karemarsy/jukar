import type { CSSProperties } from "react";
import { mission } from "@/content/site";
import { HandCheck } from "./Illustrations";
import { SectionLabel } from "./ui";

export function Mission({ number = "01" }: { number?: string }) {
  const { statement, forWhom } = mission;

  return (
    <section id="mission" aria-labelledby="mission-title" className="relative py-24 sm:py-32 lg:py-40">
      <div className="shell">
        <SectionLabel number={number}>{mission.label}</SectionLabel>
        <h2 id="mission-title" className="display type-section reveal mt-8 max-w-[17ch] text-forest">
          {statement.before} <em className="text-clay-ink">{statement.emphasis}</em> {statement.after}
        </h2>

        <div className="mt-16 grid gap-16 lg:mt-24 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <div className="type-lede max-w-2xl space-y-5 text-ink-soft">
              {mission.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            <div className="reveal mt-14 border-t border-forest/12 pt-10">
              <h3 className="label font-sans text-clay-ink">{forWhom.label}</h3>
              <ul className="mt-6 space-y-4">
                {forWhom.groups.map((group) => (
                  <li key={group} className="flex gap-4 font-display text-[clamp(1.6rem,2.8vw,2.2rem)] leading-[1.15] text-forest">
                    <span aria-hidden="true" className="mt-[0.45em] h-3 w-3 shrink-0 rounded-full bg-sun" />
                    {group}
                  </li>
                ))}
              </ul>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-soft">{forWhom.body}</p>
            </div>
          </div>

          {/* A notebook page pinned to a paper-deep board */}
          <aside aria-labelledby="needs-title" className="reveal lg:col-span-5 lg:col-start-8 lg:self-start">
            <div className="rounded-[2rem] bg-paper-deep px-4 py-10 min-[360px]:px-6 sm:px-10 sm:py-14">
              <div
                className="ruled relative -rotate-[1.2deg] bg-white px-4 pt-6 pb-4 shadow-[0_24px_50px_-28px_rgb(31_59_45/0.45)] min-[360px]:px-6 sm:px-8"
                style={{ "--line": "3rem" } as CSSProperties}
              >
                <span aria-hidden="true" className="tape -top-3 left-1/2 -translate-x-1/2 rotate-2" />
                <h3
                  id="needs-title"
                  className="hand text-[1.65rem] leading-[3rem] text-clay-ink min-[360px]:text-[1.85rem] sm:text-[2rem]"
                >
                  {mission.needsTitle}
                </h3>
                <ul>
                  {mission.needs.map((need) => (
                    <li
                      key={need}
                      className="flex items-center gap-2.5 font-display text-[1.1rem] leading-[3rem] whitespace-nowrap text-forest min-[360px]:text-[1.2rem] sm:gap-3 sm:text-[1.4rem]"
                    >
                      <HandCheck className="h-5 w-5 shrink-0 text-forest sm:h-6 sm:w-6" />
                      {need}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
