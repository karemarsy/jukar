/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  JUKAR — ACTIVITY GALLERY
 * ─────────────────────────────────────────────────────────────────────────────
 *  Photographs and short updates from Jukar's real activities.
 *  Put image files in /public/images/gallery/ and add an entry below.
 *
 *  An entry is only shown when `published` is true. Set it to true only when:
 *    • the photo is from a genuine Jukar activity, and
 *    • permission has been given for any identifiable child in it.
 *
 *  The first published entry is featured large; the rest follow in an
 *  editorial sequence. Keep captions short and factual. Dates and places are
 *  optional — leave them out rather than guessing.
 *
 *  Example:
 *    {
 *      src: "/images/gallery/supplies-2026.jpg",
 *      alt: "Exercise books and pencils arranged on a table, ready to hand out.",
 *      width: 1600,
 *      height: 1200,
 *      caption: "Packing exercise books and pencils before the new term.",
 *      date: "January 2026",
 *      place: "",
 *      published: true,
 *    },
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type GalleryItem = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** A short title shown in the carousel and the larger view, e.g. "Back to class". */
  title?: string;
  caption: string;
  date?: string;
  place?: string;
  published: boolean;
  /**
   * True for AI-generated images: the site labels them visibly and words the
   * gallery so it doesn't claim they show real Jukar activities. Never add a
   * date or place to an AI image.
   */
  aiGenerated?: boolean;
};

// AI-generated illustrations, used until real photos of Jukar's activities replace them.
// Ordered as a journey through a school day — the gallery shows them in this order.
export const gallery: ReadonlyArray<GalleryItem> = [
  {
    src: "/images/gallery/ai-02.jpg",
    alt: "AI-generated illustration: a woman in a colourful wrap kneels to help a smiling schoolgirl put on her backpack outside a home.",
    width: 928,
    height: 1152,
    title: "Ready for the day",
    caption: "Ready for a new school day.",
    published: true,
    aiGenerated: true,
  },
  {
    src: "/images/gallery/ai-03.jpg",
    alt: "AI-generated illustration: a boy in a green uniform sits on a doorstep, grinning as he ties the laces of new black school shoes.",
    width: 1024,
    height: 1024,
    title: "New shoes, new steps",
    caption: "New shoes, and somewhere to go in them.",
    published: true,
    aiGenerated: true,
  },
  {
    src: "/images/gallery/ai-01.jpg",
    alt: "AI-generated illustration: a group of schoolchildren in green uniforms laugh together as they walk a red-earth path through green hills at sunrise.",
    width: 1264,
    height: 848,
    title: "The walk to school",
    caption: "The walk to school, together.",
    published: true,
    aiGenerated: true,
  },
  {
    src: "/images/gallery/ai-05.jpg",
    alt: "AI-generated illustration: a smiling boy in a green uniform and backpack stands proudly in a classroom doorway.",
    width: 928,
    height: 1152,
    title: "Back to class",
    caption: "Back in class, and proud of it.",
    published: true,
    aiGenerated: true,
  },
  {
    src: "/images/gallery/ai-04.jpg",
    alt: "AI-generated illustration: two schoolgirls share a book on a bench in the shade of a big tree in a school yard.",
    width: 1264,
    height: 848,
    title: "Reading together",
    caption: "Reading together under the trees.",
    published: true,
    aiGenerated: true,
  },
  {
    src: "/images/gallery/ai-06.jpg",
    alt: "AI-generated illustration: in the warm light of a lamp, an older sister helps her smiling younger brother with homework at a wooden table.",
    width: 1264,
    height: 848,
    title: "Homework by lamplight",
    caption: "Homework by lamplight, with a little help.",
    published: true,
    aiGenerated: true,
  },
];
