"use client";

import Image from "next/image";
import { AnimatePresence, LazyMotion, MotionConfig, domAnimation, m } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { AiBadge, Icon } from "./ui";

export type LightboxItem = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
  meta?: string;
  aiGenerated?: boolean;
};

const zoom =
  "transition-transform duration-[900ms] ease-[var(--ease-out-soft)] group-hover:scale-[1.04] group-focus-visible:scale-[1.04] motion-reduce:transition-none";

/**
 * The gallery grid plus a lightbox built on the native <dialog> element:
 * focus is trapped and restored by the browser, Escape closes it, arrow keys
 * and swipes move between pictures.
 */
export function GalleryLightbox({ items }: { items: LightboxItem[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);
  const [index, setIndex] = useState<number | null>(null);
  const swipeStart = useRef<number | null>(null);

  const open = (i: number) => {
    setIndex(i);
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();
  const step = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i === null ? i : (i + dir + items.length) % items.length)),
    [items.length],
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => {
      setIndex((i) => {
        if (i !== null) triggers.current[i]?.focus();
        return null;
      });
    };
    dialog.addEventListener("close", onClose);
    return () => dialog.removeEventListener("close", onClose);
  }, []);

  const [featured, ...rest] = items;
  const current = index === null ? null : items[index];

  const tile = (item: LightboxItem, i: number, fill: boolean) => (
    <button
      ref={(el) => {
        triggers.current[i] = el;
      }}
      type="button"
      onClick={() => open(i)}
      className={`group relative block w-full overflow-hidden rounded-[1.25rem] text-left ${fill ? "h-full" : ""}`}
    >
      {fill ? (
        <Image src={item.src} alt={item.alt} fill sizes="(min-width: 1344px) 1248px, 100vw" className={`object-cover ${zoom}`} style={{ objectPosition: "50% 62%" }} />
      ) : (
        <Image
          src={item.src}
          alt={item.alt}
          width={item.width}
          height={item.height}
          sizes="(min-width: 1024px) 26rem, (min-width: 640px) 45vw, 100vw"
          className={`h-auto w-full ${zoom}`}
        />
      )}
      {item.aiGenerated && <AiBadge className="bottom-3 left-3" />}
      <span className="absolute top-3 right-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-forest opacity-0 shadow-sm transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
        <Icon name="expand" className="h-[1.1rem] w-[1.1rem]" />
      </span>
      <span className="sr-only">View larger</span>
    </button>
  );

  const caption = (item: LightboxItem) => (
    <figcaption className="mt-4 flex gap-4 border-t border-forest/15 pt-3">
      <span className="flex-1 font-display text-[1.25rem] leading-snug text-forest">{item.caption}</span>
      {item.meta && <span className="label shrink-0 pt-1 text-ink-soft">{item.meta}</span>}
    </figcaption>
  );

  if (!featured) return null;

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        {/* Featured picture: a wide, cinematic crop */}
        <figure className="reveal mt-16">
          <div className="aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]">{tile(featured, 0, true)}</div>
          {caption(featured)}
        </figure>

        {/* The rest: a staggered sequence that keeps each picture's own shape */}
        {rest.length > 0 && (
          <div className="mt-14 gap-10 sm:columns-2 lg:columns-3">
            {rest.map((item, i) => (
              <figure key={item.src} className="reveal mb-12 break-inside-avoid">
                {tile(item, i + 1, false)}
                {caption(item)}
              </figure>
            ))}
          </div>
        )}

        <dialog
          ref={dialogRef}
          aria-label="Picture viewer"
          onClick={(e) => e.target === e.currentTarget && close()}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") step(1);
            if (e.key === "ArrowLeft") step(-1);
          }}
          onPointerDown={(e) => (swipeStart.current = e.clientX)}
          onPointerUp={(e) => {
            if (swipeStart.current === null) return;
            const dx = e.clientX - swipeStart.current;
            swipeStart.current = null;
            if (Math.abs(dx) > 60) step(dx < 0 ? 1 : -1);
          }}
          className="m-0 h-dvh max-h-none w-full max-w-none bg-ink/95 p-0 text-paper backdrop:bg-ink/70 open:flex open:flex-col"
        >
          {current && index !== null && (
            <>
              <div className="flex items-center justify-between px-4 py-3 sm:px-6">
                <p className="label text-paper/75" aria-live="polite">
                  {index + 1} / {items.length}
                </p>
                <button
                  type="button"
                  onClick={close}
                  autoFocus
                  aria-label="Close"
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full text-paper transition-colors hover:bg-white/10 focus-visible:outline-sun"
                >
                  <Icon name="close" className="h-6 w-6" />
                </button>
              </div>

              <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-20">
                <AnimatePresence mode="wait" initial={false}>
                  <m.figure
                    key={current.src}
                    initial={{ opacity: 0, scale: 0.985 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.985 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="flex max-h-full flex-col items-center"
                  >
                    <Image
                      src={current.src}
                      alt={current.alt}
                      width={current.width}
                      height={current.height}
                      sizes="90vw"
                      className="h-auto max-h-[70dvh] w-auto max-w-full rounded-[1rem] object-contain"
                    />
                    <figcaption className="mt-5 max-w-2xl text-center">
                      <span className="block font-display text-[1.5rem] leading-snug">{current.caption}</span>
                      {current.aiGenerated && <span className="mt-1 block text-sm text-paper/70">AI-generated illustration</span>}
                    </figcaption>
                  </m.figure>
                </AnimatePresence>

                {items.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => step(-1)}
                      aria-label="Previous picture"
                      className="absolute left-2 hidden h-12 w-12 items-center justify-center rounded-full bg-white/10 text-paper transition-colors hover:bg-white/20 focus-visible:outline-sun sm:inline-flex"
                    >
                      <Icon name="chevron-left" className="h-6 w-6" />
                    </button>
                    <button
                      type="button"
                      onClick={() => step(1)}
                      aria-label="Next picture"
                      className="absolute right-2 hidden h-12 w-12 items-center justify-center rounded-full bg-white/10 text-paper transition-colors hover:bg-white/20 focus-visible:outline-sun sm:inline-flex"
                    >
                      <Icon name="chevron-right" className="h-6 w-6" />
                    </button>
                  </>
                )}
              </div>

              {/* Phone controls: big targets at the bottom, plus swipe */}
              {items.length > 1 && (
                <div className="flex justify-center gap-4 px-4 py-5 sm:hidden">
                  <button type="button" onClick={() => step(-1)} className="btn btn-ghost">
                    <Icon name="chevron-left" className="h-5 w-5" />
                    Previous
                  </button>
                  <button type="button" onClick={() => step(1)} className="btn btn-ghost">
                    Next
                    <Icon name="chevron-right" className="h-5 w-5" />
                  </button>
                </div>
              )}
            </>
          )}
        </dialog>
      </MotionConfig>
    </LazyMotion>
  );
}
