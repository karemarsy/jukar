import { cardPayment, mobileMoney } from "@/content/payment";
import { activities, closing, support } from "@/content/site";
import { resolveCardPayment, resolveMobileMoney, type AvailableMobileMoney } from "@/lib/payment";
import { getContactChannels } from "@/lib/site";
import { CopyButton } from "./CopyButton";
import { ShareButton } from "./ShareButton";
import { UssdDialer } from "./UssdDialer";
import { Icon, SectionLabel } from "./ui";

/** One contribution → both kinds of support. No choice required. */
function WhereItGoes() {
  return (
    <figure className="max-w-md">
      <svg viewBox="0 0 445 130" className="w-full" role="img" aria-labelledby="where-title">
        <title id="where-title">One contribution helps children go to school and supports them with care.</title>
        <path
          d="M24 65h166c24 0 28-42 54-42h14M190 65c24 0 28 42 54 42h14"
          fill="none"
          stroke="var(--color-ivory)"
          strokeOpacity=".5"
          strokeWidth="1.8"
          strokeDasharray="4 6"
          strokeLinecap="round"
        />
        <circle cx="20" cy="65" r="10" fill="var(--color-sun)" />
        <circle cx="264" cy="23" r="6" fill="var(--color-ivory)" />
        <circle cx="264" cy="107" r="6" fill="var(--color-ivory)" />
        {/* Font sizes are in SVG units: the figure shrinks on phones, so they start generous. */}
        <g fill="var(--color-ivory)" fontSize="20" style={{ fontFamily: "var(--font-sans)" }}>
          <text x="277" y="30">{activities.school.kicker}</text>
          <text x="277" y="114">{activities.care.kicker}</text>
        </g>
        <text x="0" y="100" fill="var(--color-sun)" fontSize="14" fontWeight="600" letterSpacing="1.1" style={{ fontFamily: "var(--font-sans)" }}>
          YOUR CONTRIBUTION
        </text>
      </svg>
    </figure>
  );
}

function MobileMoneyCard({ method }: { method: AvailableMobileMoney }) {
  const recipientId = method.details.find((d) => d.label !== "Dial" && d.label !== "Recipient name" && d.label !== "Reference")?.value;
  const reference = method.details.find((d) => d.label === "Reference")?.value;
  const contacts = getContactChannels();

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="label text-blue-deep">Mobile Money</p>
          <h3 className="display mt-2 text-[2.4rem] leading-none text-navy">{method.provider}</h3>
        </div>
        <span aria-hidden="true" className="mt-1 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sun text-navy">
          <Icon name="phone" className="h-6 w-6" />
        </span>
      </div>

      {/* Who receives it — always visible, with a copy button for the number */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-[1rem] bg-sage px-4 py-3">
        <p className="text-navy">
          <span className="block text-sm text-muted">Send to</span>
          <strong className="block font-semibold">{method.recipientName}</strong>
          {recipientId && <span className="block text-lg font-semibold tabular-nums">{recipientId}</span>}
          {reference && (
            <span className="block text-sm">
              Reference: <strong>{reference}</strong>
            </span>
          )}
        </p>
        {recipientId && (
          <CopyButton
            text={recipientId.replace(/\s+/g, "")}
            label="Copy number"
            className="btn btn-ghost min-h-11 shrink-0 px-4 py-2 text-[0.95rem]"
          />
        )}
      </div>

      {method.ussdTemplate && (
        <UssdDialer
          template={method.ussdTemplate}
          displayCode={method.ussdCode}
          currency={method.currency}
          suggestedAmounts={mobileMoney.suggestedAmounts}
        />
      )}

      {method.ussdCode && !method.ussdTemplate && (
        <div className="mt-6 rounded-[1.25rem] border border-navy/12 bg-ivory p-5">
          <p className="label text-muted">Dial this code</p>
          <p className="mt-2 text-xl font-semibold break-all text-navy tabular-nums">{method.ussdCode}</p>
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

      {/* Three short steps */}
      <ol className="mt-7 space-y-3">
        {support.steps.map((step, i) => (
          <li key={step} className="grid grid-cols-[2rem_1fr] items-baseline gap-2">
            <span aria-hidden="true" className="display text-[1.6rem] leading-none text-blue-deep italic">
              {i + 1}
            </span>
            <span className="text-[1.02rem] leading-relaxed text-navy">
              {step.includes("{name}") ? (
                <>
                  {step.split("{name}")[0]}
                  <strong>{method.recipientName}</strong>
                  {step.split("{name}")[1]}
                </>
              ) : (
                step
              )}
            </span>
          </li>
        ))}
      </ol>

      {contacts.length > 0 && (
        <p className="mt-7 border-t border-navy/10 pt-5 text-[0.95rem] text-muted">
          {support.questions}{" "}
          {contacts.map((c, i) => (
            <span key={c.kind}>
              {i > 0 && " · "}
              <a href={c.href} className="link font-medium whitespace-nowrap text-blue-deep">
                {c.value}
              </a>
            </span>
          ))}
        </p>
      )}
    </div>
  );
}

export function Support({ number = "06" }: { number?: string }) {
  const mm = resolveMobileMoney(mobileMoney);
  const card = resolveCardPayment(cardPayment);
  const contacts = getContactChannels();
  const anyAvailable = mm.available || card.available;

  return (
    <section id="support" aria-labelledby="support-title" className="on-dark relative overflow-hidden bg-navy text-ivory">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-40 h-[36rem] w-[36rem] rounded-full bg-blue/25 blur-3xl"
      />
      {/* On phones the payment card follows the intro directly; on desktop it spans both left-hand blocks. */}
      <div className="shell relative grid gap-12 py-24 sm:py-32 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-0 lg:py-40 [&>*]:min-w-0">
        <div className="lg:col-span-5">
          <SectionLabel number={number} tone="ivory">
            {support.label}
          </SectionLabel>
          <h2 id="support-title" className="display type-section mt-8">
            {support.title}
          </h2>
          <p className="type-lede mt-7 max-w-md text-ivory/80">{support.lede}</p>
        </div>

        <div className="lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1">
          <div className="on-light relative rounded-[2rem] bg-white p-5 text-navy shadow-[0_60px_100px_-50px_rgb(0_0_0/0.7)] min-[360px]:p-6 sm:p-10">
            {mm.available ? (
              <MobileMoneyCard method={mm} />
            ) : (
              !card.available && (
                <div>
                  <p className="label text-blue-deep">Contributions</p>
                  <h3 className="display mt-3 text-[clamp(2rem,4vw,2.8rem)] leading-tight text-navy">{support.unavailableTitle}</h3>
                  <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">{support.unavailableBody}</p>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <ShareButton text={closing.shareText} className="btn btn-primary" />
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
              <div className={mm.available ? "mt-8 border-t border-navy/12 pt-7" : ""}>
                <p className="label text-blue-deep">{mm.available ? "Or pay by card" : "Pay by card"}</p>
                <a href={card.checkoutUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-4">
                  Pay by card with {card.provider}
                  <Icon name="external" className="h-5 w-5" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
                <p className="mt-3 text-[0.95rem] text-muted">
                  You&apos;ll complete your payment on {card.provider}&apos;s secure checkout page. Jukar never sees your card
                  details.
                </p>
              </div>
            )}
          </div>
          {anyAvailable && (
            <p className="mt-6 max-w-xl text-[0.95rem] text-ivory/70">
              Jukar is a family-led initiative. Contributions are gifts to its education work. This website never sees or
              confirms your payment — MTN&apos;s SMS is your confirmation.
            </p>
          )}
        </div>

        <div className="lg:col-span-5 lg:col-start-1 lg:row-start-2 lg:mt-14">
          <WhereItGoes />
          <p className="mt-12 flex items-baseline gap-3">
            <span className="hand text-5xl text-sun" lang="rw">
              {support.thanks}
            </span>
            <span className="text-ivory/70">— {support.thanksTranslation.toLowerCase()}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
