import { closing, hero } from "@/content/site";
import { getContactChannels } from "@/lib/site";
import { ShareButton } from "./ShareButton";
import { Icon, LogoMark } from "./ui";

/** The end of the journey: the core message, once more, with a way to act. */
export function Closing() {
  const contacts = getContactChannels();
  const words = closing.title.trim().split(" ");
  const last = words.pop();

  return (
    // Named by its call to action: its heading repeats the hero's, and two regions with the same name confuse screen-reader navigation.
    <section id="closing" aria-label={closing.body} className="relative overflow-hidden bg-sun text-navy">
      <LogoMark
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -bottom-24 h-[26rem] w-[26rem] text-navy opacity-[0.07] sm:h-[34rem] sm:w-[34rem]"
      />
      <div className="shell relative py-24 sm:py-32 lg:py-40">
        <h2 id="closing-title" className="display reveal max-w-[14ch] text-[clamp(3rem,10vw,8.8rem)]">
          {words.join(" ")} <em>{last}</em>
        </h2>
        <p className="type-lede mt-8 max-w-xl font-medium">{closing.body}</p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a href="#support" className="btn btn-primary text-[1.05rem]">
            {hero.primaryCta}
            <Icon name="arrow" className="btn-arrow h-5 w-5" />
          </a>
          <ShareButton text={closing.shareText} className="btn btn-ghost text-[1.05rem]" />
        </div>

        {contacts.length > 0 && (
          <div id="contact" className="mt-16 border-t border-navy/20 pt-8">
            <h3 className="label font-sans">{closing.contactTitle}</h3>
            <ul className="mt-4 flex flex-col gap-3 sm:flex-row sm:gap-8">
              {contacts.map((c) => (
                <li key={c.kind}>
                  <a
                    href={c.href}
                    className="link inline-flex items-center gap-2 text-lg font-medium"
                    {...(c.kind === "whatsapp" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    <Icon name={c.kind === "email" ? "mail" : c.kind === "phone" ? "phone" : "chat"} className="h-5 w-5" />
                    <span className="sr-only">{c.label}: </span>
                    {c.value}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
