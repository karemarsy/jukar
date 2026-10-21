/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  JUKAR — CONTRIBUTION / PAYMENT CONFIGURATION
 * ─────────────────────────────────────────────────────────────────────────────
 *  Everything in this file is PUBLIC: it is shipped to every visitor's
 *  browser. Never put API keys, secrets or private account credentials here.
 *
 *  A payment method only appears on the website when:
 *    1. `verified` is set to true by someone in the family who has checked
 *       every value against the real account, AND
 *    2. all of its required fields are filled in.
 *  Otherwise the site shows a calm “details are being confirmed” message.
 *
 *  DO NOT copy example codes from documentation or other websites.
 *  `*182*…#` patterns you may have seen are NOT Jukar's payment code.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type MobileMoneyConfig = {
  /** Set to true only after every field below has been checked against the real account. */
  verified: boolean;
  /** Provider name exactly as visitors know it, e.g. the mobile network's Mobile Money service. */
  provider: string;
  /** Human-readable description of the payment type, e.g. "Merchant payment" or "Send money". */
  paymentType: string;
  /** Currency visitors pay in, e.g. "RWF". */
  currency: string;
  /**
   * The exact USSD sequence a visitor dials. Leave empty if visitors should
   * follow another provider flow (then supply `steps`).
   * Write `{amount}` where the visitor's amount goes, e.g. "*182*1*1*07…*{amount}#":
   * the site then asks for an amount and builds the code (and a tap-to-dial
   * button) for them. A code with only digits, `*` and `#` is dialled as-is.
   */
  ussdCode: string;
  /** Label for the recipient identifier, e.g. "Merchant code" or "Phone number". */
  recipientIdLabel: string;
  /** The merchant code or phone number the payment goes to. */
  recipientId: string;
  /** The account name the provider shows before the visitor confirms. */
  recipientName: string;
  /** A payment reference visitors must enter, if any. Leave empty if none is needed. */
  reference: string;
  /**
   * Optional: replace the default instructions with provider-specific steps.
   * Leave empty to use the default sequence built from the fields above.
   */
  steps: ReadonlyArray<string>;
  /**
   * Optional quick-pick amounts shown as buttons above the amount box.
   * Visitors can still type any amount. Leave empty to hide the buttons.
   */
  suggestedAmounts?: ReadonlyArray<number>;
};

export type CardPaymentConfig = {
  /** Only enable when an approved provider's hosted checkout is live and tested. */
  enabled: boolean;
  /** Provider name shown to visitors, e.g. the payment company's name. */
  provider: string;
  /** HTTPS link to the provider's hosted checkout page. The site never collects card details itself. */
  checkoutUrl: string;
};

// Supplied by the account holder (Arsene) on 2026-10-20.
// Make a small test payment to confirm before launch.
export const mobileMoney: MobileMoneyConfig = {
  verified: true,
  provider: "MTN MoMo",
  paymentType: "Send money to a phone number",
  currency: "RWF",
  ussdCode: "*182*1*1*0784346538*{amount}#",
  recipientIdLabel: "Phone number",
  recipientId: "0784 346 538",
  recipientName: "Karema Arsene Johani",
  reference: "",
  steps: [],
  suggestedAmounts: [1000, 2000, 5000, 10000],
};

export const cardPayment: CardPaymentConfig = {
  enabled: false,
  provider: "",
  checkoutUrl: "",
};
