import { verifiedFigures, whyItMatters } from "@/content/site";
import { HandArrow } from "./Illustrations";
import { PageEdge, SectionLabel } from "./ui";

const numerals = ["i", "ii", "iii", "iv", "v", "vi"];

export function WhyItMatters({ number = "03" }: { number?: string }) {
  const themes = whyItMatters.themes;
  const closingThought = themes[themes.length - 1];
  const ideas = themes.slice(0, -1);

  return (
    <section id="why" aria-labelledby="why-title" className="relative bg-sage">
      <PageEdge fill="var(--color-sage)" className="absolute inset-x-0 bottom-full" />
      <div className="shell py-24 sm:py-32 lg:py-40">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionLabel number={number}>{whyItMatters.label}</SectionLabel>
            <h2 id="why-title" className="display type-section reveal mt-8 text-navy">
              {whyItMatters.title}
            </h2>
            <p className="type-lede mt-7 max-w-md text-muted">{whyItMatters.intro}</p>
            <p className="mt-12 flex max-w-xs items-start gap-2 text-blue-deep">
              <HandArrow className="mt-1 h-10 w-14 shrink-0 -scale-y-100 rotate-[200deg]" />
              <span className="hand -rotate-2 text-[1.8rem]">{whyItMatters.honestyNote}</span>
            </p>
          </div>

          <ol className="lg:col-span-7">
            {ideas.map((theme, i) => (
              <li key={theme.title} className="reveal grid gap-4 border-t border-navy/15 py-9 sm:grid-cols-[4.5rem_1fr] sm:py-11">
                <span aria-hidden="true" className="display text-4xl text-blue-deep italic">
                  {numerals[i]}.
                </span>
                <div>
                  <h3 className="display text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.08] text-navy">{theme.title}</h3>
                  <p className="mt-3 max-w-xl text-lg leading-relaxed text-muted">{theme.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* The closing thought, set large */}
        {closingThought && (
          <figure className="reveal mt-20 border-t border-navy/15 pt-16 lg:mt-28 lg:pt-20">
            <blockquote>
              <p className="display text-[clamp(3rem,9.5vw,8.5rem)] leading-[0.95] text-navy">
                <span aria-hidden="true" className="mr-3 align-top text-[0.5em] text-blue-deep italic">
                  {numerals[themes.length - 1]}.
                </span>
                <em>{closingThought.title}</em>
              </p>
            </blockquote>
            <figcaption className="type-lede mt-8 max-w-xl text-muted lg:ml-auto lg:text-right">{closingThought.body}</figcaption>
          </figure>
        )}

        {verifiedFigures.length > 0 && (
          <dl className="mt-16 grid gap-px overflow-hidden rounded-[1.5rem] border border-navy/15 bg-navy/15 sm:grid-cols-2">
            {verifiedFigures.map((figure) => (
              <div key={figure.label} className="bg-white p-6">
                <dt className="text-muted">{figure.label}</dt>
                <dd className="display mt-2 text-5xl text-navy">{figure.value}</dd>
                <dd className="label mt-3 text-muted">Source: {figure.source}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
      <PageEdge fill="var(--color-ivory)" className="absolute inset-x-0 top-full rotate-180" />
    </section>
  );
}
