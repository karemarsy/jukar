import { cardPayment, mobileMoney } from "@/content/payment";
import { activities, involvement, support } from "@/content/site";
import { resolveCardPayment, resolveMobileMoney, type AvailableMobileMoney } from "@/lib/payment";
import { getContactChannels } from "@/lib/site";
import { CopyButton } from "./CopyButton";
import { ShareButton } from "./ShareButton";
import { UssdDialer } from "./UssdDialer";
import { Icon, SectionLabel } from "./ui";

/** One contribution → both kinds of support. No choice required. */
function WhereItGoes() {
  return (
    <figure className="max-w-md lg:mt-12">
      <svg viewBox="0 0 445 130" className="w-full" role="img" aria-labelledby="where-title">
        <title id="where-title">One contribution helps children go to school and supports them with care.</title>
        <path
          d="M24 65h166c24 0 28-42 54-42h14M190 65c24 0 28 42 54 42h14"
          fill="none"
          stroke="var(--color-paper)"
          strokeOpacity=".55"
          strokeWidth="1.8"
          strokeDasharray="4 6"
          strokeLinecap="round"
        />
        <circle cx="20" cy="65" r="10" fill="var(--color-sun)" />
        <circle cx="264" cy="23" r="6" fill="var(--color-paper)" />
        <circle cx="264" cy="107" r="6" fill="var(--color-paper)" />
        {/* Font sizes are in SVG units: the figure shrinks on phones, so they start generous. */}
        <g fill="var(--color-paper)" fontSize="20" style={{ fontFamily: "var(--font-sans)" }}>
          <text x="277" y="30">{activities.school.kicker}</text>
          <text x="277" y="114">{activities.care.kicker}</text>
        </g>
        <text x="0" y="100" fill="var(--color-sun-soft)" fontSize="14" fontWeight="600" letterSpacing="1.1" style={{ fontFamily: "var(--font-sans)" }}>
          YOUR CONTRIBUTION
        </text>
      </svg>
    </figure>
  );
}

function MobileMoneyInstructions({ method }: { method: AvailableMobileMoney }) {
  const recipientId = method.details.find((d) => d.label !== "Dial" && d.label !== "Recipient name" && d.label !== "Reference")?.value;
  const reference = method.details.find((d) => d.label === "Reference")?.value;

  return (
    <div>
      <p className="label text-clay-ink">Mobile Money</p>
      <h3 className="display mt-2 text-[2rem] text-forest">{method.provider}</h3>
      <p className="mt-1 text-ink-soft">
        To <strong className="font-semibold text-ink">{method.recipientName}</strong>
        {recipientId && (
          <>
            {" "}· <span className="whitespace-nowrap">{recipientId}</span>
          </>
        )}
        {reference && <> · Reference: <strong className="font-semibold text-ink">{reference}</strong></>}
      </p>

      {method.ussdTemplate && (
        <UssdDialer template={method.ussdTemplate} displayCode={method.ussdCode} currency={method.currency} />
      )}

      {method.ussdCode && !method.ussdTemplate && (
        <div className="mt-7 rounded-md border border-ink/15 bg-paper/60 p-5">
          <p className="label text-ink-soft" id="ussd-label">
            Dial this code
          </p>
          <p
            aria-labelledby="ussd-label"
            className="mt-2 font-sans text-[clamp(1.7rem,7vw,2.4rem)] font-semibold tracking-wider break-all text-ink tabular-nums select-all"
          >
            {method.ussdCode}
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            {method.dialHref && (
              <a href={method.dialHref} className="btn btn-primary">
                <Icon name="phone" className="h-5 w-5" />
                Dial on this phone
              </a>
            )}
            <CopyButton text={method.ussdCode} label="Copy code" />
          </div>
        </div>
      )}

      <p role="note" className="mt-5 flex gap-2.5 text-[0.95rem] leading-relaxed text-ink-soft">
        <Icon name="alert" className="mt-0.5 h-5 w-5 shrink-0 text-clay-ink" />
        <span>
          Before you confirm with your PIN, check the name shows <strong className="text-ink">{method.recipientName}</strong>.{" "}
          {method.provider} sends you an SMS when it&apos;s done.
        </span>
      </p>
    </div>
  );
}

export function Support({ number = "06" }: { number?: string }) {
  const mm = resolveMobileMoney(mobileMoney);
  const card = resolveCardPayment(cardPayment);
  const contacts = getContactChannels();
  const anyAvailable = mm.available || card.available;

  return (
    <section id="support" aria-labelledby="support-title" className="on-dark relative overflow-hidden bg-forest text-paper">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-40 h-[34rem] w-[34rem] rounded-full bg-sun/10 blur-3xl"
      />
      {/* On phones the payment card follows the intro directly; on desktop it spans both left-hand blocks. */}
      <div className="shell relative grid gap-12 py-24 sm:py-32 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-0 lg:py-40">
        <div className="lg:col-span-5">
          <SectionLabel number={number} tone="paper">
            {support.label}
          </SectionLabel>
          <h2 id="support-title" className="display mt-7 text-[clamp(2.6rem,6vw,5rem)]">
            {support.title}
          </h2>
          <p className="mt-7 max-w-md text-lg leading-relaxed text-paper/85">{support.lede}</p>
        </div>

        <div className="lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1">
          <div className="on-light relative rounded-sm bg-sheet p-5 text-ink shadow-[0_50px_90px_-40px_rgb(0_0_0/0.65)] min-[360px]:p-6 sm:p-10">
            {mm.available ? (
              <MobileMoneyInstructions method={mm} />
            ) : (
              !card.available && (
                <div>
                  <p className="label text-clay-ink">Contributions</p>
                  <h3 className="display mt-3 text-[clamp(1.8rem,4vw,2.5rem)] text-forest">{support.unavailableTitle}</h3>
                  <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">{support.unavailableBody}</p>
                  <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-soft">{support.unavailableMeanwhile}</p>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <ShareButton text={involvement.share.shareText} className="btn btn-primary" />
                    {contacts.slice(0, 1).map((c) => (
                      <a key={c.kind} href={c.href} className="btn btn-ghost">
                        <Icon name={c.kind === "email" ? "mail" : c.kind === "phone" ? "phone" : "chat"} className="h-5 w-5" />
                        Ask the family
                      </a>
                    ))}
                  </div>
                </div>
              )
            )}

            {card.available && (
              <div className={mm.available ? "mt-10 border-t border-ink/15 pt-8" : ""}>
                <p className="label text-clay-ink">{mm.available ? "Or pay by card" : "Pay by card"}</p>
                <a href={card.checkoutUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-4">
                  Pay by card with {card.provider}
                  <Icon name="external" className="h-5 w-5" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
                <p className="mt-3 text-[0.95rem] text-ink-soft">
                  You&apos;ll complete your payment on {card.provider}&apos;s secure checkout page. Jukar never sees your
                  card details.
                </p>
              </div>
            )}
          </div>
          {anyAvailable && (
            <p className="mt-6 max-w-xl text-[0.95rem] text-paper/70">
              Jukar is a family-led initiative. Contributions are gifts to its education work.
            </p>
          )}
        </div>

        <div className="lg:col-span-5 lg:col-start-1 lg:row-start-2">
          <WhereItGoes />
          <p className="mt-12 flex items-baseline gap-3">
            <span className="hand text-5xl text-sun" lang="rw">
              {support.thanks}
            </span>
            <span className="text-paper/70">— {support.thanksTranslation.toLowerCase()}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
