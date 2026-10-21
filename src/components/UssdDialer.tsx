"use client";

import { Fragment, useId, useRef, useState } from "react";
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
 * For USSD codes that include the amount: the visitor picks or types an amount
 * and gets the complete code plus a tap-to-dial link. Nothing is submitted
 * anywhere — the payment itself happens in the provider's own phone menu.
 */
export function UssdDialer({
  template,
  displayCode,
  currency,
  suggestedAmounts = [],
}: {
  template: string;
  displayCode: string;
  currency: string;
  suggestedAmounts?: ReadonlyArray<number>;
}) {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [amount, setAmount] = useState("");
  const [attempted, setAttempted] = useState(false);
  const filled = fillAmount(template, amount);
  const dialHref = filled ? buildDialHref(filled) : null;
  const empty = amount.trim() === "";
  const error = !empty && !filled ? "Please use a whole number, for example 5000." : attempted && empty ? "Please choose or type an amount first." : "";
  const [before, after] = displayCode.split("AMOUNT");

  return (
    <form
      noValidate
      className="mt-6 rounded-[1.25rem] border border-forest/12 bg-paper p-4 min-[360px]:p-5"
      onSubmit={(e) => {
        e.preventDefault();
        setAttempted(true);
        if (dialHref) window.location.href = dialHref;
        else inputRef.current?.focus();
      }}
    >
      {suggestedAmounts.length > 0 && (
        <fieldset>
          <legend className="text-[0.95rem] font-semibold text-forest">Choose an amount ({currency})</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {suggestedAmounts.map((value) => {
              const selected = amount.replace(/[\s,.']/g, "") === String(value);
              return (
                <button
                  key={value}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setAmount(String(value))}
                  className={`inline-flex h-11 min-w-[5.25rem] items-center justify-center rounded-full px-4 font-semibold tabular-nums transition-colors duration-150 ${
                    selected ? "bg-forest text-paper" : "bg-white text-forest shadow-[inset_0_0_0_1.5px_rgb(31_59_45/0.25)] hover:shadow-[inset_0_0_0_1.5px_rgb(31_59_45/0.6)]"
                  }`}
                >
                  {value.toLocaleString("en-US")}
                </button>
              );
            })}
          </div>
        </fieldset>
      )}

      <label htmlFor={`${id}-amount`} className={`block text-[0.95rem] font-semibold text-forest ${suggestedAmounts.length > 0 ? "mt-5" : ""}`}>
        {suggestedAmounts.length > 0 ? "Or type any amount" : `Amount (${currency})`}
      </label>
      <div className="relative mt-2">
        <input
          ref={inputRef}
          id={`${id}-amount`}
          name="amount"
          type="text"
          inputMode="numeric"
          autoComplete="off"
          placeholder="e.g. 5000"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={`${id}-error`}
          className="w-full rounded-[0.9rem] border border-forest/25 bg-white py-3 pr-16 pl-4 text-xl font-semibold text-forest tabular-nums placeholder:font-normal placeholder:text-ink-soft aria-[invalid=true]:border-[#b42318]"
        />
        <span aria-hidden="true" className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-sm font-semibold text-ink-soft">
          {currency}
        </span>
      </div>
      <p id={`${id}-error`} aria-live="polite" className="mt-1.5 min-h-[1.25rem] text-sm font-medium text-[#b42318]">
        {error}
      </p>

      <dl className="mt-3">
        <dt className="label text-ink-soft">Code to dial</dt>
        <dd className="mt-1.5 font-sans text-base font-semibold text-forest tabular-nums min-[360px]:text-lg sm:text-xl">
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

      <div className="mt-4 flex flex-col gap-2 sm:flex-row [&_.btn]:px-4 min-[360px]:[&_.btn]:px-[1.4rem]">
        {dialHref ? (
          <a href={dialHref} className="btn btn-primary">
            <Icon name="phone" className="h-5 w-5" />
            Dial on this phone
          </a>
        ) : (
          <button type="submit" className="btn btn-primary">
            <Icon name="phone" className="h-5 w-5" />
            Dial on this phone
          </button>
        )}
        <CopyButton text={filled ?? displayCode} label="Copy code" />
      </div>
    </form>
  );
}
