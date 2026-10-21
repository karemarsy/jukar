# Jukar website

The website for **Jukar**, a family-led initiative in Rwanda that helps children from families facing hardship, and children who have lost their parents, go to school — with practical help for whatever they need, and with love.

> **Not a developer?** See **[EDITING.md](EDITING.md)** for how to change text, colours and photos from your browser.

A single, fully static page built with Next.js (App Router), React, TypeScript (strict) and Tailwind CSS. There is no database, no accounts, no CMS and no payment backend.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000 — shows yellow “Dev note” boxes for missing content
npm run build      # production build (dev notes are never included)
npm start          # serve the production build
npm run check      # typecheck + lint + tests + build
```

Requires Node.js 20.9 or newer.

## Where to edit content

Everything the family is likely to change lives in `src/content/`. You shouldn't need to touch components.

| File | What it controls |
| --- | --- |
| `src/content/site.ts` | All page text: hero, mission, activities, “why it matters”, story, support copy, contact details, social links, verified figures |
| `src/content/payment.ts` | Mobile Money and card payment details (public information only) |
| `src/content/images.ts` | Photographs for the hero, the two “What we do” chapters (`fees` = Going to school, `materials` = Care and love) and the story |
| `src/content/gallery.ts` | Activity photos and captions for the gallery |

Rules that keep the site honest:

- **Empty means hidden.** Contact details, social links, figures and gallery items that are left empty simply don't appear.
- **Payment methods appear only when `verified: true` and every required field is filled in.** Until then, visitors see a calm “Contribution details are being confirmed” message with a share button.
- **Photos.** Until a photo slot is filled, it shows an original illustration of school supplies (objects only — never invented children or events).
- **AI-generated images** (currently the hero and both “What we do” images) are marked `aiGenerated: true` in `images.ts`. The site then shows a visible “AI-generated illustration” label and the alt text says so. Never use AI images in the gallery or the story, and replace them with real photos when possible.
- **Gallery items** appear only when `published: true`. Set that only for genuine Jukar photos with consent for any identifiable child.
- **Story.** Until `story.familyWords` is filled, a short provisional introduction based only on the confirmed mission is shown.

Run `npm run dev` after editing: any remaining gap is flagged by a dashed “Dev note” box on the page.

## Before public launch — information the family must provide

### Payment (required to accept contributions)

In `src/content/payment.ts`, confirm each value against the real account, then set `verified: true`:

1. **Provider** — the Mobile Money service visitors will use.
2. **Payment type** — e.g. merchant payment or send money.
3. **The exact USSD sequence** visitors dial (if applicable). Do not copy example codes; `*182*…#` patterns seen elsewhere are *not* Jukar's code. If the sequence includes the amount or other variable parts, provide the visitor-facing steps in `steps` instead.
4. **Merchant code or recipient phone number**, and what to call it (`recipientIdLabel`).
5. **Registered recipient/account name** exactly as the provider displays it before confirmation — visitors are told to check it.
6. **Payment reference**, only if one is required.
7. **Provider-specific steps**, if the default four steps don't match the real flow.

Test a real transaction yourself before publishing.

**Card payments** stay hidden until an approved provider's *hosted checkout page* is live: set `cardPayment.enabled`, `provider` and an `https://` `checkoutUrl`. The site never collects card details itself and must not.

**Payment confirmation:** Mobile Money payments are completed on the visitor's phone. The website cannot see them and never shows a “payment successful” screen.

### Content

- [ ] **Contact details** (`contact` in `site.ts`): email, phone and/or WhatsApp. The “Get in touch” option and the footer contact column appear automatically once at least one is set.
- [ ] **The family's own story** (`story.familyWords`, optional `signature`).
- [ ] **Photographs** for `images.ts` slots and the gallery — with consent for every identifiable child.
- [ ] **Social media links**, if any (`socialLinks`).
- [ ] **Verified figures**, only if the family wants to publish them and can stand behind them (`verifiedFigures`). Leave empty otherwise.
- [ ] Review all wording in `site.ts` — the tagline “A little help. A lot of love.” is provisional. The site deliberately doesn't list specific items Jukar gives; keep it that way unless the family decides otherwise.

### Deployment

- [ ] Set `NEXT_PUBLIC_SITE_URL` (see `.env.example`) once the real domain is known. This enables the canonical URL, the sitemap, and absolute social-preview URLs. Until it is set, `next build` prints a harmless `metadataBase` warning.
- [ ] Do not describe Jukar as a registered charity, NGO or tax-deductible organisation unless that is confirmed.

The site deploys to any Node host or static-capable platform that supports Next.js (e.g. Vercel, Netlify).

## Project structure

```
src/
  app/
    layout.tsx            fonts, metadata
    page.tsx              the page: section order
    globals.css           design tokens (colours, type, buttons, textures, motion)
    icon.svg, opengraph-image.tsx, robots.ts, sitemap.ts
  components/
    Header.tsx            sticky header + accessible mobile menu (client)
    Hero, Mission, Activities, WhyItMatters, Gallery, Story, Support, Closing, Footer
    HeroBook.tsx          CSS-3D open book in the hero (client: pointer tilt)
    GalleryLightbox.tsx   gallery grid + accessible <dialog> lightbox (client)
    UssdDialer.tsx        amount picker, dial code and Dial/Copy buttons (client)
    PhotoFrame.tsx        photo slot with illustration fallback
    Illustrations.tsx     original SVG illustrations and hand-drawn marks
    CopyButton.tsx, ShareButton.tsx   clipboard / Web Share (client)
    ui.tsx                logo, icons, section labels, dev notes
  content/                editable content (see above)
  lib/
    payment.ts            decides what payment info is safe to show (+ tests)
    site.ts               site URL, contact links, dev flag
```

## Design notes

“The Open Book”, in the original Jukar colours: paper-ivory pages, forest-green ink, a sunshine-yellow highlighter and terracotta accents. Instrument Serif (display), Instrument Sans (body) and Caveat (short handwritten notes), all self-hosted via `next/font`. Every text/background colour pair is checked for WCAG AA.

The hero's open book is pure CSS 3D (no WebGL). Motion: CSS for entrances and scroll reveals (content is never hidden if JavaScript fails); [Motion](https://motion.dev) only for the hero's pointer tilt and the gallery lightbox. Everything respects `prefers-reduced-motion`.
