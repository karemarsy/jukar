import { verifiedFigures, whyItMatters } from "@/content/site";
import { HandArrow } from "./Illustrations";
import { SectionLabel } from "./ui";

const numerals = ["i", "ii", "iii", "iv", "v", "vi"];

export function WhyItMatters() {
  return (
    <section id="why" aria-labelledby="why-title" className="bg-paper-deep py-24 sm:py-32 lg:py-40">
      <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionLabel number="03">{whyItMatters.label}</SectionLabel>
            <h2 id="why-title" className="display mt-7 text-[clamp(2.3rem,5vw,4.2rem)] text-forest">
              {whyItMatters.title}
            </h2>
            <p className="mt-7 max-w-md text-lg leading-relaxed text-ink-soft">{whyItMatters.intro}</p>
            <p className="mt-12 flex max-w-xs items-start gap-2 text-clay-ink">
              <HandArrow className="mt-1 h-10 w-14 shrink-0 -scale-y-100 rotate-[200deg]" />
              <span className="hand -rotate-2 text-[1.75rem]">{whyItMatters.honestyNote}</span>
            </p>
          </div>
        </div>

        <div className="lg:col-span-7">
          <ol>
            {whyItMatters.themes.map((theme, i) => (
              <li key={theme.title} className="reveal grid gap-4 border-t border-ink/15 py-10 sm:grid-cols-[4.5rem_1fr] sm:py-12">
                <span aria-hidden="true" className="display text-4xl text-clay italic">
                  {numerals[i]}.
                </span>
                <div>
                  <h3 className="text-[clamp(1.6rem,2.8vw,2.25rem)] leading-tight text-forest">{theme.title}</h3>
                  <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-soft">{theme.body}</p>
                </div>
              </li>
            ))}
          </ol>

          {verifiedFigures.length > 0 && (
            <dl className="mt-6 grid gap-px overflow-hidden border border-ink/15 bg-ink/15 sm:grid-cols-2">
              {verifiedFigures.map((figure) => (
                <div key={figure.label} className="bg-sheet p-6">
                  <dt className="text-ink-soft">{figure.label}</dt>
                  <dd className="display mt-2 text-5xl text-forest">{figure.value}</dd>
                  <dd className="label mt-3 text-ink-soft">Source: {figure.source}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </div>
    </section>
  );
}
