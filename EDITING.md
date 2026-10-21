# How to edit the Jukar website

You can change the website yourself from your web browser — no programs to install.
Every time you save a change, the website updates itself about one minute later.

---

## How to make a change (the same every time)

1. Go to the project on **GitHub** and open the file you want to change (see the list below).
2. Click the **pencil icon** (✏️ "Edit this file") at the top right of the file.
3. Make your change.
4. Click the green **"Commit changes…"** button, then **"Commit changes"** again.
5. Wait about one minute and refresh the website.

If something goes wrong, nothing is lost: every version is saved. Just ask for help to go back.

---

## Changing text — `src/content/site.ts`

Almost all the words on the website are in this one file.
Only change the words **between the quotation marks** `"like this"`.

| Where on the website | What to look for in the file |
| --- | --- |
| Big headline and intro at the top | `hero` |
| "Our mission" and "Who we support" | `mission` |
| "What we do" (Going to school / Care and love) | `activities` |
| Big closing message near the bottom | `closing` |
| The three Mobile Money steps | `support` → `steps` |
| "Why it matters" | `whyItMatters` |
| Gallery heading, intro and its closing message | `gallerySection` |
| Gallery pictures: order, short titles (`title`) and captions | `src/content/gallery.ts` |
| "Our story" | `story` — put your own words in `familyWords` |
| "Support Jukar" | `support` |
| Phone and email | `contact` |
| Slogan (handwritten in the book at the top, and in the footer) | `tagline` |

**Rules that keep the website working:**

- Keep the quotation marks `"` at the start and end of each text.
- Keep the comma `,` at the end of each line.
- If your text contains a quotation mark, use a curly one instead: “ ” or ’.
- Don't delete the words before the colon, like `title:` or `lede:`.

Example — changing the headline intro:

```
lede:
  "Jukar helps children ... with a lot of love.",
```

Only change the words between the two `"`.

---

## Changing colours — `src/app/globals.css`

Near the top of the file is a list of the website's colours:

```
--color-paper: #f6f0e4;      ← page background (ivory)
--color-paper-deep: #ece2cf; ← soft panels and alternate sections
--color-forest: #1f3b2d;     ← headlines, main text, buttons, dark sections
--color-clay: #b4502d;       ← terracotta accents (big numbers, lines)
--color-clay-ink: #943d1f;   ← terracotta text (labels, links)
--color-sun: #f2b33d;        ← yellow highlights and the closing section
--color-ink-soft: #4b4d45;   ← grey secondary text
--color-ink: #1c1e1a;        ← footer background
```

Replace a colour code (like `#1f3b2d`) with a new one. You can pick colours and get their codes at
**https://htmlcolorcodes.com**. Keep the `#` and the `;` at the end.

Tip: keep text dark on light backgrounds so it stays easy to read. Every current colour pair was
checked for readability (WCAG AA); if you change one, check it at **https://webaim.org/resources/contrastchecker/**
— normal text needs a ratio of at least 4.5.

---

## Changing photos

**Main photos** (top of page, "What we do", "Our story") — file `src/content/images.ts`
**Gallery photos** — file `src/content/gallery.ts`

1. Upload the new photo: open the folder `public/images` (or `public/images/gallery`), click
   **"Add file" → "Upload files"**, choose your photo, and click **"Commit changes"**.
   Use a simple name without spaces, e.g. `school-day.jpg`.
2. Open `images.ts` or `gallery.ts` and change the `src:` line to your new file name,
   e.g. `src: "/images/gallery/school-day.jpg",`
3. Write a short description of the photo in `alt:` (this helps blind visitors).
4. For a **real** photo, delete the line `aiGenerated: true,` — this removes the
   "AI-generated illustration" label.

Only publish photos of children when their families agree.

---

## Changing the Mobile Money details — `src/content/payment.ts`

⚠️ Be very careful here: a mistake could send someone's money to the wrong person.
After any change, make a small test payment yourself (e.g. 100 RWF) before telling anyone.

---

## Need help?

If a change breaks the website, it simply won't update — the old version stays online.
Ask for help and the last working version can be restored in a minute.
