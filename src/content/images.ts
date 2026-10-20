/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  JUKAR — SECTION PHOTOGRAPHS
 * ─────────────────────────────────────────────────────────────────────────────
 *  Each slot is either a photograph or `null`.
 *  While a slot is `null`, the site shows an original illustration of school
 *  supplies instead (never a stock photo presented as Jukar's work).
 *
 *  To add a photograph:
 *    1. Put the file in /public/images/ (JPG or WebP, ideally 2000px wide).
 *    2. Fill in the slot, e.g.
 *         hero: {
 *           src: "/images/hero.jpg",
 *           alt: "Describe what the photo shows, plainly.",
 *           width: 2000,
 *           height: 2500,
 *         },
 *
 *  Only use photographs taken during Jukar's activities, and only publish
 *  identifiable children with their parent or guardian's permission.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Optional focal point for cropping, as CSS object-position, e.g. "50% 30%". */
  focus?: string;
  /**
   * Set to true for AI-generated images. The site then shows a visible
   * “AI-generated illustration” label so visitors never mistake it for a
   * photo of a child Jukar has supported. Remove once replaced by a real photo.
   */
  aiGenerated?: boolean;
};

export const images: {
  hero: Photo | null;
  fees: Photo | null;
  materials: Photo | null;
  story: Photo | null;
} = {
  hero: {
    src: "/images/hero-ai.jpg",
    alt: "AI-generated illustration: a smiling schoolgirl in a green uniform writes in an exercise book at a wooden desk, with classmates behind her.",
    width: 928,
    height: 1152,
    focus: "50% 40%",
    aiGenerated: true,
  },
  fees: {
    src: "/images/fees-ai.jpg",
    alt: "AI-generated illustration: children in green uniforms raise their hands eagerly during a lesson in a bright classroom.",
    width: 1152,
    height: 928,
    aiGenerated: true,
  },
  materials: {
    src: "/images/materials-ai.jpg",
    alt: "AI-generated illustration: two smiling schoolchildren look through new exercise books, pencils, pens, a ruler and a school bag on a table outdoors.",
    width: 1264,
    height: 848,
    aiGenerated: true,
  },
  story: {
    src: "/images/story-ai.jpg",
    alt: "AI-generated illustration: an adult's hand points to a line in an exercise book while a child's hand writes with a yellow pencil.",
    width: 820,
    height: 615,
    aiGenerated: true,
  },
};
