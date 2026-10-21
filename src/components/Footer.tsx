import { hero, organization, socialLinks } from "@/content/site";
import { getContactChannels, getNavigation } from "@/lib/site";
import { Icon, Logo } from "./ui";

export function Footer() {
  const contacts = getContactChannels();
  const navigation = getNavigation();
  const year = new Date().getFullYear();

  return (
    <footer className="on-dark bg-ink text-paper">
      <div className="shell grid gap-14 pt-20 pb-12 lg:grid-cols-12 lg:pt-28">
        <div className="lg:col-span-6">
          <Logo tone="paper" />
          <p className="display mt-8 max-w-lg text-[clamp(2.2rem,4.4vw,3.6rem)] leading-[1.02]">
            <em>{organization.tagline}</em>
          </p>
          <p className="mt-5 max-w-md text-paper/75">{organization.descriptor}</p>
          <a href="#support" className="btn btn-sun mt-9">
            {hero.primaryCta}
            <Icon name="arrow" className="btn-arrow h-5 w-5" />
          </a>
        </div>

        <nav aria-label="Footer" className="lg:col-span-3">
          <h2 className="label font-sans text-sun">Explore</h2>
          <ul className="mt-5 space-y-3">
            {navigation.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="link text-paper/85 hover:text-paper">
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#support" className="link text-paper/85 hover:text-paper">
                Support Jukar
              </a>
            </li>
          </ul>
        </nav>

        {(contacts.length > 0 || socialLinks.length > 0) && (
          <div className="lg:col-span-3">
            {contacts.length > 0 && (
              <>
                <h2 className="label font-sans text-sun">Contact</h2>
                <ul className="mt-5 space-y-3">
                  {contacts.map((c) => (
                    <li key={c.kind}>
                      <a href={c.href} className="link break-all text-paper/85 hover:text-paper">
                        <span className="sr-only">{c.label}: </span>
                        {c.value}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}
            {socialLinks.length > 0 && (
              <>
                <h2 className="label mt-10 font-sans text-sun">Follow</h2>
                <ul className="mt-5 space-y-3">
                  {socialLinks.map((s) => (
                    <li key={s.href}>
                      <a href={s.href} target="_blank" rel="noopener noreferrer" className="link text-paper/85 hover:text-paper">
                        {s.label}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}
      </div>

      <div className="shell">
        <div className="flex flex-col gap-4 border-t border-paper/15 py-8 text-sm text-paper/65 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {organization.name} · A family-led initiative in {organization.country}.
          </p>
          <a href="#top" className="link inline-flex items-center gap-2 self-start text-paper/80 hover:text-paper">
            Back to top
            <Icon name="arrow" className="h-4 w-4 -rotate-90" />
          </a>
        </div>
      </div>
    </footer>
  );
}
