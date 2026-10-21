import type { CardPaymentConfig, MobileMoneyConfig } from "@/content/payment";

/**
 * Turns raw payment configuration into what the website may safely show.
 * A method is “available” only when it is explicitly verified AND complete —
 * anything less is reported as unavailable, with the reasons, so a
 * half-filled configuration can never be published as real instructions.
 */

export type MobileMoneyDetail = { label: string; value: string };

export type AvailableMobileMoney = {
  available: true;
  provider: string;
  paymentType: string;
  currency: string;
  /** The code as shown to visitors (an `{amount}` placeholder reads “AMOUNT”). */
  ussdCode: string;
  /** The raw code containing `{amount}`, when the visitor must supply an amount; otherwise null. */
  ussdTemplate: string | null;
  /** `tel:` link for a fixed, pure USSD sequence, otherwise null. */
  dialHref: string | null;
  recipientName: string;
  details: MobileMoneyDetail[];
  steps: string[];
  copyText: string;
};

export type UnavailableMethod = { available: false; missing: string[] };

export type MobileMoneyState = AvailableMobileMoney | UnavailableMethod;

const DIALABLE = /^[*#0-9]+$/;

/** Placeholder in `ussdCode` for the amount the visitor chooses. */
export const AMOUNT_TOKEN = "{amount}";

export function buildDialHref(code: string): string | null {
  const trimmed = code.replace(/\s+/g, "");
  if (!trimmed || !DIALABLE.test(trimmed)) return null;
  // `#` must be percent-encoded or the dialler treats it as a URL fragment.
  return `tel:${trimmed.replace(/#/g, "%23")}`;
}

/**
 * Puts a visitor-typed amount into a USSD template. Accepts whole numbers
 * only (spaces and thousands separators are ignored); returns null otherwise.
 */
export function fillAmount(template: string, amount: string): string | null {
  const digits = amount.replace(/[\s,.']/g, "");
  if (!/^[1-9]\d{0,8}$/.test(digits)) return null;
  return template.replace(AMOUNT_TOKEN, digits);
}

export function resolveMobileMoney(config: MobileMoneyConfig): MobileMoneyState {
  const cfg = {
    provider: config.provider.trim(),
    paymentType: config.paymentType.trim(),
    currency: config.currency.trim(),
    ussdCode: config.ussdCode.replace(/\s+/g, ""),
    recipientIdLabel: config.recipientIdLabel.trim(),
    recipientId: config.recipientId.trim(),
    recipientName: config.recipientName.trim(),
    reference: config.reference.trim(),
    steps: config.steps.map((s) => s.trim()).filter(Boolean),
  };

  const missing: string[] = [];
  if (!config.verified) missing.push("verified");
  if (!cfg.provider) missing.push("provider");
  if (!cfg.paymentType) missing.push("paymentType");
  if (!cfg.currency) missing.push("currency");
  if (!cfg.recipientName) missing.push("recipientName");
  if (!cfg.ussdCode && !cfg.recipientId) missing.push("ussdCode or recipientId");
  if (cfg.recipientId && !cfg.recipientIdLabel) missing.push("recipientIdLabel");
  // Without a USSD code there is no safe default sequence to describe.
  if (!cfg.ussdCode && cfg.steps.length === 0) missing.push("steps (required when there is no ussdCode)");

  const isTemplate = cfg.ussdCode.includes(AMOUNT_TOKEN);
  if (isTemplate && !DIALABLE.test(cfg.ussdCode.replace(AMOUNT_TOKEN, "1"))) missing.push("ussdCode (invalid characters)");

  if (missing.length > 0) return { available: false, missing };

  const displayCode = cfg.ussdCode.replace(AMOUNT_TOKEN, "AMOUNT");

  const details: MobileMoneyDetail[] = [];
  if (cfg.ussdCode) details.push({ label: "Dial", value: displayCode });
  if (cfg.recipientId) details.push({ label: cfg.recipientIdLabel, value: cfg.recipientId });
  details.push({ label: "Recipient name", value: cfg.recipientName });
  if (cfg.reference) details.push({ label: "Reference", value: cfg.reference });

  const steps = cfg.steps.length > 0 ? cfg.steps : defaultSteps({ ...cfg, displayCode, isTemplate });

  const copyText = [
    `Jukar: ${cfg.provider} (${cfg.paymentType})`,
    ...details.map((d) => `${d.label}: ${d.value}`),
    ...(isTemplate ? [`(Replace AMOUNT with the amount in ${cfg.currency})`] : []),
  ].join("\n");

  return {
    available: true,
    provider: cfg.provider,
    paymentType: cfg.paymentType,
    currency: cfg.currency,
    ussdCode: displayCode,
    ussdTemplate: isTemplate ? cfg.ussdCode : null,
    dialHref: isTemplate ? null : buildDialHref(cfg.ussdCode),
    recipientName: cfg.recipientName,
    details,
    steps,
    copyText,
  };
}

function defaultSteps(cfg: {
  provider: string;
  currency: string;
  ussdCode: string;
  displayCode: string;
  isTemplate: boolean;
  recipientName: string;
  reference: string;
}): string[] {
  if (cfg.isTemplate) {
    return [
      `Type the amount you'd like to give above and tap “Dial on this phone”, or dial ${cfg.displayCode} yourself, replacing AMOUNT with the amount in ${cfg.currency}.`,
      `Before confirming, check that the name ${cfg.provider} shows is ${cfg.recipientName}.`,
      ...(cfg.reference ? [`Enter the reference ${cfg.reference} if asked.`] : []),
      `Confirm with your ${cfg.provider} PIN.`,
    ];
  }
  return [
    `Open your phone's dialler and enter ${cfg.ussdCode}, then follow the ${cfg.provider} menu.`,
    `Before confirming, check that the recipient shown is ${cfg.recipientName}.`,
    cfg.reference
      ? `Enter the amount you'd like to give, and the reference ${cfg.reference} when asked.`
      : "Enter the amount you'd like to give.",
    `Confirm the payment through ${cfg.provider}'s own confirmation step.`,
  ];
}

export type AvailableCard = { available: true; provider: string; checkoutUrl: string };
export type CardState = AvailableCard | UnavailableMethod;

export function resolveCardPayment(config: CardPaymentConfig): CardState {
  const missing: string[] = [];
  if (!config.enabled) missing.push("enabled");
  if (!config.provider.trim()) missing.push("provider");
  if (!isHttpsUrl(config.checkoutUrl.trim())) missing.push("checkoutUrl (https)");
  if (missing.length > 0) return { available: false, missing };
  return { available: true, provider: config.provider.trim(), checkoutUrl: config.checkoutUrl.trim() };
}

function isHttpsUrl(value: string): boolean {
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}
