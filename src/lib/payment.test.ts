import { describe, expect, it } from "vitest";
import { cardPayment, mobileMoney, type MobileMoneyConfig } from "@/content/payment";
import { buildDialHref, fillAmount, resolveCardPayment, resolveMobileMoney } from "./payment";

// Synthetic test values only — these are NOT real payment details.
const complete: MobileMoneyConfig = {
  verified: true,
  provider: "Test Provider",
  paymentType: "Merchant payment",
  currency: "RWF",
  ussdCode: "*000*1*2345#",
  recipientIdLabel: "Merchant code",
  recipientId: "2345",
  recipientName: "TEST RECIPIENT",
  reference: "",
  steps: [],
};

describe("resolveMobileMoney", () => {
  it("resolves the shipped configuration as an amount-template code", () => {
    const state = resolveMobileMoney(mobileMoney);
    expect(state.available).toBe(true);
    if (!state.available) return;
    // The real code needs an amount, so there is no fixed dial link…
    expect(state.dialHref).toBeNull();
    expect(state.ussdTemplate).toContain("{amount}");
    expect(state.ussdCode).not.toContain("{amount}");
    // …but filling an amount yields a dialable sequence.
    const filled = fillAmount(state.ussdTemplate ?? "", "5000");
    expect(filled).not.toBeNull();
    expect(buildDialHref(filled ?? "")).toMatch(/^tel:\*182\*[0-9*]+\*5000%23$/);
  });

  it("supports an {amount} placeholder in synthetic configs", () => {
    const state = resolveMobileMoney({ ...complete, ussdCode: "*000*1*{amount}#" });
    expect(state.available).toBe(true);
    if (!state.available) return;
    expect(state.ussdCode).toBe("*000*1*AMOUNT#");
    expect(state.steps[0]).toContain("*000*1*AMOUNT#");
    expect(state.copyText).toContain("Replace AMOUNT");
  });

  it("rejects a template with characters a dialler can't use", () => {
    expect(resolveMobileMoney({ ...complete, ussdCode: "*000*x*{amount}#" }).available).toBe(false);
  });

  it("is unavailable when complete but not marked verified", () => {
    const state = resolveMobileMoney({ ...complete, verified: false });
    expect(state).toEqual({ available: false, missing: ["verified"] });
  });

  it("is unavailable when verified but incomplete", () => {
    const state = resolveMobileMoney({ ...complete, recipientName: "  " });
    expect(state.available).toBe(false);
    if (!state.available) expect(state.missing).toContain("recipientName");
  });

  it("requires explicit steps when there is no USSD code", () => {
    const state = resolveMobileMoney({ ...complete, ussdCode: "" });
    expect(state.available).toBe(false);
    const withSteps = resolveMobileMoney({ ...complete, ussdCode: "", steps: ["Do the thing."] });
    expect(withSteps.available).toBe(true);
    if (withSteps.available) {
      expect(withSteps.steps).toEqual(["Do the thing."]);
      expect(withSteps.dialHref).toBeNull();
    }
  });

  it("builds instructions, details and copy text from a verified configuration", () => {
    const state = resolveMobileMoney({ ...complete, reference: "SCHOOL" });
    expect(state.available).toBe(true);
    if (!state.available) return;
    expect(state.dialHref).toBe("tel:*000*1*2345%23");
    expect(state.steps).toHaveLength(4);
    expect(state.steps[1]).toContain("TEST RECIPIENT");
    expect(state.steps[2]).toContain("SCHOOL");
    expect(state.details.map((d) => d.label)).toEqual(["Dial", "Merchant code", "Recipient name", "Reference"]);
    expect(state.copyText).toContain("Recipient name: TEST RECIPIENT");
  });
});

describe("buildDialHref", () => {
  it("only offers a dial link for pure USSD sequences", () => {
    expect(buildDialHref("*000#")).toBe("tel:*000%23");
    expect(buildDialHref("*000*AMOUNT#")).toBeNull();
    expect(buildDialHref("")).toBeNull();
  });
});

describe("fillAmount", () => {
  it("accepts whole amounts, ignoring spaces and separators", () => {
    expect(fillAmount("*1*{amount}#", "5000")).toBe("*1*5000#");
    expect(fillAmount("*1*{amount}#", " 10,000 ")).toBe("*1*10000#");
    expect(fillAmount("*1*{amount}#", "10 000")).toBe("*1*10000#");
  });

  it("rejects empty, zero, negative, decimal-looking or non-numeric amounts", () => {
    for (const bad of ["", "0", "-500", "abc", "50a", "0100", "1234567890"]) {
      expect(fillAmount("*1*{amount}#", bad)).toBeNull();
    }
  });
});

describe("resolveCardPayment", () => {
  it("is unavailable with the shipped configuration", () => {
    expect(resolveCardPayment(cardPayment).available).toBe(false);
  });

  it("requires an https checkout URL", () => {
    expect(resolveCardPayment({ enabled: true, provider: "P", checkoutUrl: "http://x.test" }).available).toBe(false);
    expect(resolveCardPayment({ enabled: true, provider: "P", checkoutUrl: "https://x.test/pay" }).available).toBe(true);
  });
});
