import type { ReactNode } from "react";
import { involvement } from "@/content/site";
import { getContactChannels } from "@/lib/site";
import { ShareButton } from "./ShareButton";
import { Icon, SectionLabel } from "./ui";

export function Involvement({ number = "07" }: { number?: string }) {
  const contacts = getContactChannels();

  const rows: { key: string; title: string; body: string; action: ReactNode; id?: string }[] = [
    {
      key: "contribute",
      title: involvement.contribute.title,
      body: involvement.contribute.body,
      action: (
        <a href="#support" className="btn btn-primary">
          Support Jukar
          <Icon name="arrow" className="btn-arrow h-5 w-5" />
        </a>
      ),
    },
    {
      key: "share",
      title: involvement.share.title,
      body: involvement.share.body,
      action: <ShareButton text={involvement.share.shareText} />,
    },
  ];

  if (contacts.length > 0) {
    rows.push({
      key: "contact",
      id: "contact",
      title: involvement.contact.title,
      body: involvement.contact.body,
      action: (
        <ul className="flex flex-col gap-2">
          {contacts.map((c) => (
            <li key={c.kind}>
              <a
                href={c.href}
                className="link inline-flex items-center gap-2 text-lg text-forest"
                {...(c.kind === "whatsapp" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                <Icon name={c.kind === "email" ? "mail" : c.kind === "phone" ? "phone" : "chat"} className="h-5 w-5" />
                <span className="sr-only">{c.label}: </span>
                {c.value}
              </a>
            </li>
          ))}
        </ul>
      ),
    });
  }

  return (
    <section id="get-involved" aria-labelledby="involved-title" className="py-24 sm:py-32 lg:py-36">
      <div className="shell">
        <SectionLabel number={number}>{involvement.label}</SectionLabel>
        <h2 id="involved-title" className="display mt-7 max-w-3xl text-[clamp(2.3rem,5vw,4.2rem)] text-forest">
          {involvement.title}
        </h2>

        <ol className="mt-14 border-b border-ink/15">
          {rows.map((row, i) => (
            <li
              key={row.key}
              id={row.id}
              className="grid gap-5 border-t border-ink/15 py-9 sm:grid-cols-[4rem_1fr] lg:grid-cols-[4rem_1fr_1fr_auto] lg:items-center lg:gap-10"
            >
              <span aria-hidden="true" className="display text-4xl text-clay italic">
                0{i + 1}
              </span>
              <h3 className="text-[1.9rem] leading-tight text-forest">{row.title}</h3>
              <p className="max-w-md text-lg leading-relaxed text-ink-soft sm:col-start-2 lg:col-start-auto">{row.body}</p>
              <div className="sm:col-start-2 lg:col-start-auto lg:justify-self-end">{row.action}</div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
