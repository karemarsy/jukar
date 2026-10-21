"use client";

import { Fragment, useId, useState } from "react";
import { buildDialHref, fillAmount } from "@/lib/payment";
import { CopyButton } from "./CopyButton";
import { Icon } from "./ui";

/** Lets a long code wrap only after a `*`, so numbers and words are never split. */
function breakAfterStars(code: string) {
  return code.split("*").map((part, i, parts) => (
    <Fragment key={i}>
      {part}
      {i < parts.length - 1 && (
        <>
          *<wbr />
        </>
      )}
    </Fragment>
  ));
}

/**
 * For USSD codes that include the amount: the visitor types an amount and gets
 * the complete code plus a tap-to-dial link. Nothing is submitted anywhere —
 * the payment itself still happens in the provider's own phone menu.
 */
export function UssdDialer({
  template,
  displayCode,
  currency,
}: {
  template: string;
  displayCode: string;
  currency: string;
}) {
  const id = useId();
  const [amount, setAmount] = useState("");
  const filled = fillAmount(template, amount);
  const dialHref = filled ? buildDialHref(filled) : null;
  const invalid = amount.trim() !== "" && !filled;
  const [before, after] = displayCode.split("AMOUNT");

  return (
    <div className="mt-6 rounded-md border border-ink/15 bg-paper/60 p-4 min-[360px]:p-5">
      <label htmlFor={`${id}-amount`} className="label block text-ink-soft">
        Amount ({currency})
      </label>
      <input
        id={`${id}-amount`}
        type="text"
        inputMode="numeric"
        autoComplete="off"
        placeholder="e.g. 5000"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        aria-invalid={invalid}
        aria-describedby={`${id}-hint`}
        className="mt-2 w-full rounded-md border border-ink/25 bg-sheet px-4 py-3 text-xl font-semibold text-ink tabular-nums placeholder:font-normal placeholder:text-ink-soft/70 aria-[invalid=true]:border-clay"
      />
      <p id={`${id}-hint`} aria-live="polite" className="mt-1.5 min-h-[1.25rem] text-sm text-clay-ink">
        {invalid ? "Please enter a whole number, for example 5000." : ""}
      </p>

      <dl className="mt-3">
        <dt className="label text-ink-soft">Code to dial</dt>
        <dd className="mt-1.5 font-sans text-base font-semibold text-ink tabular-nums min-[360px]:text-lg sm:text-xl">
          {filled ? (
            breakAfterStars(filled)
          ) : (
            <>
              {breakAfterStars(before ?? "")}
              <span className="whitespace-nowrap text-clay-ink italic">AMOUNT</span>
              {after}
            </>
          )}
        </dd>
      </dl>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row [&_.btn]:px-4 [&_.btn]:whitespace-nowrap min-[360px]:[&_.btn]:px-[1.4rem]">
        {dialHref ? (
          <a href={dialHref} className="btn btn-primary">
            <Icon name="phone" className="h-5 w-5" />
            Dial on this phone
          </a>
        ) : (
          <button type="button" disabled className="btn btn-primary cursor-not-allowed opacity-45">
            <Icon name="phone" className="h-5 w-5" />
            Dial on this phone
          </button>
        )}
        <CopyButton text={filled ?? displayCode} label="Copy code" />
      </div>
    </div>
  );
}
