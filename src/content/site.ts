/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  JUKAR — SITE CONTENT
 * ─────────────────────────────────────────────────────────────────────────────
 *  Almost all of the words on the website live in this file, so the family
 *  can update them without touching any components.
 *
 *  Ground rules (please keep them):
 *  • Only publish facts the family can stand behind. No estimated numbers,
 *    invented dates, partners, testimonials or registration claims.
 *  • Jukar is described as a family-led initiative. Do not call it a
 *    registered charity, NGO or foundation unless that is confirmed.
 *  • Leave a field empty ("" or []) when the information isn't confirmed —
 *    the site hides whatever is empty instead of showing a placeholder.
 *
 *  Related files:
 *  • src/content/payment.ts — Mobile Money / card contribution details
 *  • src/content/images.ts  — photographs for the main sections
 *  • src/content/gallery.ts — activity photographs and captions
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const organization = {
  name: "Jukar",
  /** Short descriptor used in metadata and the footer. Confirmed facts only. */
  descriptor: "A family-led initiative in Rwanda supporting children's education.",
  country: "Rwanda",
  /** Provisional brand line — replace freely. */
  tagline: "A little help. A lot of love.",
} as const;

export const hero = {
  eyebrow: "A family-led initiative · Rwanda",
  /** The headline is split so one word can carry the hand-drawn underline. */
  headline: { before: "Every child deserves a chance to", emphasis: "learn." },
  lede:
    "Jukar helps children from families facing hardship, and children who have lost their parents, go to school and keep learning — with practical help for whatever they need, and with a lot of love.",
  primaryCta: "Support Jukar",
  secondaryCta: "Discover our work",
  annotation: "a place in class, and love",
} as const;

export const mission = {
  label: "Our mission",
  statement: "A place in class is the beginning, not the whole story.",
  paragraphs: [
    "To learn, a child needs more than a seat in a classroom. They need to arrive ready for the school day — and to know that someone believes in them.",
    "Jukar helps children go to school and stay there. Every child's needs are different, so we help each one with whatever stands in their way, and we make sure they know they are cared for.",
  ],
  /** Who Jukar supports — confirmed by the family. */
  forWhom: {
    label: "Who we support",
    groups: [
      "Children from families facing financial hardship",
      "Children who have lost one or both parents",
    ],
    body: "Our aim is simple: that these children can sit in the same classrooms and learn alongside every other child — with what they need, and the care they deserve.",
  },
  /** Written on a notebook page beside the mission. */
  needsTitle: "What we want every child to feel",
  needs: [
    "Welcome in the classroom",
    "Ready for the school day",
    "Cared for, and never alone",
    "Equal to every other child",
  ],
} as const;

export const activities = {
  label: "What we do",
  title: "Whatever it takes to keep a child learning.",
  intro:
    "There is no fixed list. Every child's situation is different, so we look at what each one needs and help however we can.",
  school: {
    kicker: "Going to school",
    title: "Helping children get to school — and stay there.",
    paragraphs: [
      "For a family facing hardship, or a child without parents to rely on, many small things can stand between a child and the classroom.",
      "Jukar helps with what each child needs to start school, come back next term and keep going — just like their classmates.",
    ],
    note: "a place in class",
  },
  care: {
    kicker: "Care and love",
    title: "More than help: someone who cares.",
    paragraphs: [
      "Practical help matters. But a child also needs to feel seen, encouraged and loved.",
      "Jukar is a family, not a programme. We stay close to the children we help, and we want every one of them to know they are not alone.",
    ],
  },
} as const;

export const whyItMatters = {
  label: "Why it matters",
  title: "Why it matters.",
  intro:
    "Education opens doors, but life can put obstacles in the way. These are the ideas behind Jukar's work.",
  themes: [
    {
      title: "Circumstances shouldn't decide a child's future.",
      body: "A child's chance to learn shouldn't depend on their family's income, or on whether they still have parents to look after them.",
    },
    {
      title: "Children learn best when they belong.",
      body: "A child who arrives at school ready, like everyone else, can focus on learning instead of on what they are missing.",
    },
    {
      title: "Learning builds term on term.",
      body: "What a child learns this year is the foundation for next year. Help that keeps a child in school protects the progress already made.",
    },
    {
      title: "Love makes the difference.",
      body: "Knowing that someone cares — and keeps showing up — can change how a child sees their own future.",
    },
  ],
  /** Shown as a margin note — a promise about how results will be reported. */
  honestyNote: "We'll only ever share numbers we can stand behind.",
} as const;

/**
 * Verified impact figures. Leave EMPTY until the family has confirmed each one.
 * When filled, a figures strip appears in the “Why it matters” section.
 * Example shape (do NOT publish unverified values):
 *   { value: "—", label: "children helped to go to school in 2026", source: "Jukar records" }
 */
export const verifiedFigures: ReadonlyArray<{
  value: string;
  label: string;
  source: string;
}> = [];

export const gallerySection = {
  label: "From our activities",
  title: "Notes from the field.",
  intro: "Moments from Jukar's work, shared with the consent of the families involved.",
  /** Used instead of `label`/`intro` while the gallery shows only AI-generated illustrations. */
  illustrativeLabel: "Moments that matter",
  illustrativeIntro: "The everyday moments Jukar works for — shown here as illustrations.",
  emptyTitle: "Photographs are on their way.",
  emptyBody:
    "We're gathering images from Jukar's activities and will only publish them with the permission of the children's families. They will appear here as soon as they are ready.",
} as const;

export const story = {
  label: "Our story",
  title: "A family, and a shared conviction.",
  /**
   * The family's own words. Each string is one paragraph.
   * While this is empty, the site shows the short provisional introduction
   * below, which is based only on Jukar's confirmed mission.
   */
  familyWords: [] as ReadonlyArray<string>,
  /** Optional sign-off under the family's words, e.g. "— The ___ family". */
  signature: "",
  provisional: [
    "Jukar is a family-led initiative in Rwanda. It exists to make one thing a little easier: a child's path through school.",
    "There is no large organisation behind it — just a family committed to helping children learn, and the people who choose to stand with them.",
  ],
} as const;

export const support = {
  label: "Support Jukar",
  title: "Help a child keep learning.",
  lede:
    "There's nothing to choose and nothing to sign up for. Every contribution supports Jukar's work as a whole — helping children get to school, and giving them what they need along the way.",
  thanks: "Murakoze",
  thanksTranslation: "Thank you",
  unavailableTitle: "Contribution details are being confirmed.",
  unavailableBody:
    "We'll publish verified payment instructions here as soon as they're ready. We'd rather wait than risk a contribution reaching the wrong place.",
  unavailableMeanwhile: "In the meantime, sharing Jukar with someone who cares about education helps too.",
} as const;

export const involvement = {
  label: "Ways to help",
  title: "Other ways to stand with Jukar.",
  share: {
    title: "Share Jukar",
    body: "Send this page to a friend, a colleague or a family group. Every new reader is someone who might help.",
    shareText: "Jukar helps children in Rwanda go to school — with practical help and a lot of love.",
  },
  contribute: {
    title: "Contribute",
    body: "Support Jukar's work as a whole — every contribution helps a child keep learning.",
  },
  contact: {
    title: "Get in touch",
    body: "Have a question, or an idea for how you could help? The family would be glad to hear from you.",
  },
} as const;

/**
 * Contact details. Leave a field empty if it isn't confirmed — empty fields
 * are never shown. Use international format for phone numbers, e.g. "+250…".
 */
export const contact = {
  email: "karemarsy@gmail.com",
  phone: "+250 784 346 538",
  /** WhatsApp number in international format without spaces, e.g. "+2507…". */
  whatsapp: "",
} as const;

/** Real social profiles only. Example: { label: "Instagram", href: "https://instagram.com/…" } */
export const socialLinks: ReadonlyArray<{ label: string; href: string }> = [];

export const navigation = [
  { href: "#mission", label: "Our mission" },
  { href: "#activities", label: "Our activities" },
  { href: "#field-notes", label: "Gallery" },
  { href: "#story", label: "Our story" },
] as const;
