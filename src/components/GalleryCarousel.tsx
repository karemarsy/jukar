"use client";

import Image from "next/image";
import { AnimatePresence, LazyMotion, MotionConfig, domAnimation, m, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { AiBadge, Icon } from "./ui";

export type CarouselItem = {
  src: string;
  alt: string;
  width: number;
  height: number;
  title: string;
  caption: string;
  meta?: string;
  aiGenerated?: boolean;
};

/** Time each picture stays in focus while the gallery plays by itself. */
const AUTO_MS = 3000;
/** Delay between single steps when jumping several pictures (keeps cards from flying across). */
const STEP_MS = 170;
/** Size of a card at 0, 1, 2 and 3 places from the centre. */
const SCALE = [1, 0.7, 0.54, 0.44];
/** Each card's own small resting tilt, so the set feels hand-placed. */
const TILT = [-1.6, 1.2, -0.8, 1.8, -1.2, 0.9];

const mod = (a: number, n: number) => ((a % n) + n) % n;
/** Signed distance of card i from the active card, on a loop (e.g. -3…2 for six cards). */
const offsetOf = (i: number, active: number, n: number) => {
  const half = Math.floor(n / 2);
  return mod(i - active + half, n) - half;
};
const pad = (v: number) => String(v).padStart(2, "0");

function geometry(width: number) {
  if (width >= 1024) return { cardH: 450, overlap: 0.12, maxW: Math.min(width * 0.4, 560) };
  if (width >= 640) return { cardH: 360, overlap: 0.08, maxW: width * 0.52 };
  return { cardH: Math.min(width * 0.95, 370), overlap: 0.05, maxW: width * 0.8 };
}

/**
 * A slow-moving “carousel of memories”: one picture in focus at a time, its
 * neighbours smaller, tilted and slightly overlapping. Plays by itself only on
 * larger screens, when visible, and never under reduced motion; pauses on hover,
 * keyboard focus, a hidden tab, the larger view, or the Pause button.
 */
export function GalleryCarousel({ items }: { items: CarouselItem[] }) {
  const n = items.length;
  const reduce = useReducedMotion() ?? false;

  // `prev` lets each card tell a normal one-step move from a wrap-around jump.
  const [pos, setPos] = useState({ active: 0, prev: 0 });
  const { active, prev } = pos;
  const [width, setWidth] = useState(1280);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [userPaused, setUserPaused] = useState(false);
  const [viewer, setViewer] = useState<number | null>(null);
  const [announce, setAnnounce] = useState("");
  // One-time entrance: "static" until hydrated (so the server HTML is never hidden),
  // "waiting" while off-screen, "entering" for the staggered arrival, then "done".
  const [phase, setPhase] = useState<"static" | "waiting" | "entering" | "done">("static");

  const regionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const viewerRef = useRef<number | null>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const stepTimer = useRef<ReturnType<typeof setInterval>>(undefined);
  const dragStart = useRef<number | null>(null);
  const dragged = useRef(false);
  const swipeStart = useRef<number | null>(null);

  const describe = useCallback((i: number) => `Picture ${i + 1} of ${n}: ${items[i]?.title ?? ""}`, [items, n]);
  const move = useCallback((dir: 1 | -1) => setPos((p) => ({ active: mod(p.active + dir, n), prev: p.active })), [n]);

  // Measure the stage, watch whether the gallery is on screen, follow the tab's visibility,
  // and settle the gallery on the picture last seen in the larger view.
  useEffect(() => {
    const stage = stageRef.current;
    const region = regionRef.current;
    const dialog = dialogRef.current;
    if (!stage || !region || !dialog) return;
    const ro = new ResizeObserver(([entry]) => entry && setWidth(entry.contentRect.width));
    ro.observe(stage);
    // The observer reports once immediately on load, then on every change. That first report
    // arms the one-time entrance if the gallery starts off-screen (and motion is welcome);
    // the next time it comes into view, the cards arrive and the entrance is spent.
    const prefersStill = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        setInView(entry.isIntersecting);
        setPhase((p) => {
          if (p === "static" && !entry.isIntersecting && !prefersStill && entry.boundingClientRect.top > 0) return "waiting";
          if (p === "waiting" && entry.isIntersecting) {
            setTimeout(() => setPhase("done"), 1300);
            return "entering";
          }
          return p === "static" ? "done" : p;
        });
      },
      { threshold: 0.35 },
    );
    io.observe(region);
    const onVisibility = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    const onClose = () => {
      document.documentElement.style.removeProperty("overflow");
      const v = viewerRef.current;
      viewerRef.current = null;
      setViewer(null);
      if (v === null) return;
      setPos((p) => (p.active === v ? p : { active: v, prev: v }));
      requestAnimationFrame(() => cardRefs.current[v]?.focus());
    };
    dialog.addEventListener("close", onClose);
    const timer = stepTimer;
    return () => {
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      dialog.removeEventListener("close", onClose);
      clearInterval(timer.current);
    };
  }, []);


  const small = width < 640;
  const canAutoplay = !reduce && !small && n > 1;
  const playing =
    canAutoplay && !userPaused && !hovered && !focused && inView && pageVisible && viewer === null && phase !== "waiting";

  // Autoplay is driven by the active progress bar: when it has filled up, the next picture
  // comes into focus. Pausing freezes the bar, so playing resumes exactly where it stopped.
  // Any manual move takes over: autoplay stops until the visitor presses Play again.

  const takeControl = () => {
    clearInterval(stepTimer.current);
    if (canAutoplay) setUserPaused(true);
  };

  const step = (dir: 1 | -1) => {
    takeControl();
    move(dir);
    setAnnounce(describe(mod(active + dir, n)));
  };

  /** Bring a picture into focus one step at a time, so cards never jump across the stage. */
  const goTo = (target: number) => {
    const d = offsetOf(target, active, n);
    if (d === 0) return;
    takeControl();
    setAnnounce(describe(target));
    if (reduce) {
      setPos({ active: target, prev: target });
      return;
    }
    const dir = d > 0 ? 1 : -1;
    let left = Math.abs(d) - 1;
    move(dir);
    if (left > 0) {
      stepTimer.current = setInterval(() => {
        move(dir);
        left -= 1;
        if (left <= 0) clearInterval(stepTimer.current);
      }, STEP_MS);
    }
  };

  // ── Larger view (native <dialog>: focus trap, Escape and focus return built in) ──
  const openViewer = (i: number) => {
    viewerRef.current = i;
    setViewer(i);
    // Keep the page behind the larger view still; restored in the dialog's close handler.
    document.documentElement.style.setProperty("overflow", "hidden");
    dialogRef.current?.showModal();
  };
  const closeViewer = () => dialogRef.current?.close();
  const viewerStep = (dir: 1 | -1) => {
    const v = viewerRef.current;
    if (v === null) return;
    const next = mod(v + dir, n);
    viewerRef.current = next;
    setViewer(next);
  };

  // ── Geometry: cards keep their real proportions; neighbours sit just beside each other ──
  const { cardH, overlap, maxW } = geometry(width);
  const sizeOf = (i: number) => {
    const item = items[i];
    const ratio = item ? item.width / item.height : 1;
    let w = cardH * ratio * 0.86;
    let h = cardH;
    if (w > maxW) {
      w = maxW;
      h = w / (ratio * 0.86);
    }
    return { w, h };
  };
  const offsets = items.map((_, i) => offsetOf(i, active, n));
  const indexAt = new Map(offsets.map((o, i) => [o, i]));
  const xAt: Record<number, number> = { 0: 0 };
  for (let k = 1; k <= 3; k++) {
    for (const s of [1, -1] as const) {
      const before = indexAt.get(s * (k - 1));
      const here = indexAt.get(s * k);
      const last = xAt[s * (k - 1)] ?? 0;
      if (before === undefined || here === undefined) {
        xAt[s * k] = last + s * cardH * 0.5;
        continue;
      }
      const a = sizeOf(before).w * (SCALE[k - 1] ?? 0.5);
      const b = sizeOf(here).w * (SCALE[k] ?? 0.5);
      xAt[s * k] = last + s * ((a + b) / 2 - overlap * b);
    }
  }

  const current = items[active];
  const viewed = viewer === null ? null : items[viewer];

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <div
          ref={regionRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="Gallery of learning moments"
          // Pause for keyboard users moving through the gallery, but not after a mouse click
          // (which also focuses a button), and never because the Play button itself has focus.
          onFocus={(e) => setFocused(e.target.matches(":focus-visible") && !e.target.hasAttribute("data-play-toggle"))}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") {
              e.preventDefault();
              step(1);
            } else if (e.key === "ArrowLeft") {
              e.preventDefault();
              step(-1);
            }
          }}
        >
          {/* The stage: a full-width strip of floating prints */}
          <div
            ref={stageRef}
            className="relative mt-14 h-[25rem] touch-pan-y overflow-x-clip select-none sm:h-[25.5rem] lg:mt-20 lg:h-[30.5rem]"
            onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
            onPointerLeave={(e) => {
              if (e.pointerType !== "mouse") return;
              setHovered(false);
              e.currentTarget.style.setProperty("--px", "0");
              e.currentTarget.style.setProperty("--py", "0");
            }}
            // Subtle parallax: CSS variables only (no React re-render on every mouse move).
            onPointerMove={(e) => {
              if (e.pointerType !== "mouse" || reduce || width < 1024) return;
              const r = e.currentTarget.getBoundingClientRect();
              e.currentTarget.style.setProperty("--px", (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
              e.currentTarget.style.setProperty("--py", (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
            }}
            onPointerDown={(e) => {
              dragStart.current = e.clientX;
              dragged.current = false;
            }}
            onPointerUp={(e) => {
              if (dragStart.current === null) return;
              const dx = e.clientX - dragStart.current;
              dragStart.current = null;
              if (Math.abs(dx) > 45) {
                dragged.current = true;
                step(dx < 0 ? 1 : -1);
              }
            }}
          >
            {items.map((item, i) => {
              const o = offsets[i] ?? 0;
              const abs = Math.abs(o);
              const shown = small ? abs <= 1 : abs <= 2;
              const isActive = o === 0;
              const { w, h } = sizeOf(i);
              const scale = SCALE[Math.min(abs, 3)] ?? 0.5;
              const rotZ = reduce ? 0 : isActive ? 0 : o * 2 + (TILT[i % TILT.length] ?? 0);
              const rotY = reduce || small ? 0 : -o * 9;
              // A card that wraps from one end of the loop to the other moves instantly (it is hidden).
              const wrapped = Math.abs(o - offsetOf(i, prev, n)) > 1;
              // Entrance: featured card first, then neighbours outward in a short stagger.
              const waiting = phase === "waiting";
              const enterDelay = phase === "entering" ? abs * 130 : 0;
              // Farther cards drift a little more with the pointer: a sense of depth.
              const depth = 8 + abs * 9;
              return (
                <div
                  key={item.src}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${n}`}
                  aria-hidden={!shown}
                  className="absolute top-1/2 left-1/2"
                  style={{
                    width: w,
                    height: h,
                    zIndex: 20 - abs,
                    opacity: shown && !waiting ? 1 : 0,
                    pointerEvents: shown ? "auto" : "none",
                    transform: `translate(-50%, -50%) translateX(${xAt[o] ?? 0}px) translateY(${waiting ? 48 : 0}px) perspective(1400px) rotateY(${rotY}deg) rotate(${rotZ}deg) scale(${waiting ? scale * 0.92 : scale})`,
                    transition: reduce
                      ? "opacity 200ms ease"
                      : wrapped
                        ? "none"
                        : `transform 900ms cubic-bezier(0.22,1,0.36,1) ${enterDelay}ms, opacity 700ms cubic-bezier(0.22,1,0.36,1) ${enterDelay}ms`,
                  }}
                >
                  {/* Parallax layer (pointer), then the hover layer. The labels sit over the button
                      (not inside it), so the button's visible text is just its title and matches its name. */}
                  <div
                    className="h-full w-full transition-transform duration-500 ease-out"
                    style={{ transform: `translate3d(calc(var(--px, 0) * ${depth}px), calc(var(--py, 0) * ${depth * 0.5}px), 0)` }}
                  >
                  <div className="group relative h-full w-full transition-transform duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-1.5 motion-reduce:transition-none">
                    <button
                      ref={(el) => {
                        cardRefs.current[i] = el;
                      }}
                      type="button"
                      tabIndex={shown ? 0 : -1}
                      aria-label={isActive ? `View larger: ${item.title}` : `Show ${item.title}`}
                      onClick={() => {
                        if (dragged.current) {
                          dragged.current = false;
                          return;
                        }
                        if (isActive) openViewer(i);
                        else goTo(i);
                      }}
                      className={`block h-full w-full rounded-[1.4rem] bg-white p-[3%] pb-12 text-left transition-shadow duration-300 ease-[var(--ease-out-soft)] ${
                        isActive
                          ? "shadow-[0_50px_80px_-40px_rgb(31_59_45/0.6)] ring-1 ring-forest/10"
                          : "shadow-[0_30px_60px_-40px_rgb(31_59_45/0.45)] group-hover:shadow-[0_44px_70px_-40px_rgb(31_59_45/0.55)]"
                      }`}
                    >
                      <span className="relative block h-full w-full overflow-hidden rounded-[1rem] bg-paper-deep">
                        <Image
                          src={item.src}
                          alt={item.alt}
                          fill
                          draggable={false}
                          sizes="(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 85vw"
                          className={`object-cover transition-[transform,filter] duration-[900ms] ease-[var(--ease-out-soft)] group-hover:scale-[1.05] motion-reduce:transition-none ${
                            isActive ? "" : "saturate-[.8] sepia-[.12]"
                          }`}
                        />
                      </span>
                      <span
                        className={`hand absolute right-[5%] bottom-2 left-[5%] truncate text-[1.45rem] text-clay-ink ${i % 2 ? "text-right" : ""}`}
                      >
                        {item.title}
                      </span>
                    </button>

                    {/* Overlays: same position as the picture inside the frame (3% padding, 3rem caption strip). */}
                    <span aria-hidden="true" className="pointer-events-none absolute inset-x-[3%] top-[3%] bottom-12">
                      {item.aiGenerated && <AiBadge compact className="bottom-2.5 left-2.5" />}
                      <span
                        className={`absolute top-2.5 right-2.5 inline-flex items-center gap-1.5 rounded-full bg-white/92 px-3 py-1.5 text-[0.78rem] font-semibold text-forest shadow-sm transition-opacity duration-200 ${
                          isActive ? "opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100" : "opacity-0"
                        }`}
                      >
                        <Icon name="expand" className="h-3.5 w-3.5" />
                        Explore this moment
                      </span>
                    </span>
                  </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Caption, editorial counter and controls */}
          <div
            className="shell mt-10 grid items-end gap-8 transition-[opacity,transform] duration-700 ease-[var(--ease-out-soft)] lg:mt-14 lg:grid-cols-12"
            style={
              phase === "waiting"
                ? { opacity: 0, transform: "translateY(16px)" }
                : phase === "entering"
                  ? { transitionDelay: "450ms" }
                  : undefined
            }
          >
            <div className="min-h-[9.5rem] lg:col-span-7">
              <p className="display text-[clamp(2.8rem,6vw,4.6rem)] leading-none text-clay italic" aria-hidden="true">
                {pad(active + 1)}
                <span className="ml-2 text-[0.4em] text-ink-soft not-italic">/ {pad(n)}</span>
              </p>
              <AnimatePresence mode="wait" initial={false}>
                {current && (
                  <m.div
                    key={current.src}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-3"
                  >
                    <h3 className="display text-[clamp(1.9rem,3.2vw,2.7rem)] leading-[1.05] text-forest">{current.title}</h3>
                    <p className="mt-2 text-lg text-ink-soft">
                      {current.caption}
                      {current.meta && <span className="label ml-3 text-ink-soft">{current.meta}</span>}
                    </p>
                    {current.aiGenerated && <p className="mt-1 text-sm text-ink-soft">AI-generated illustration</p>}
                  </m.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex flex-col gap-4 lg:col-span-5 lg:items-end">
              {/* Progress: one slim segment per picture */}
              <div className="flex items-center" role="group" aria-label="Choose a picture">
                {items.map((item, i) => (
                  <button
                    key={item.src}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Show picture ${i + 1}: ${item.title}`}
                    aria-current={i === active ? "true" : undefined}
                    className="group/seg flex h-11 w-9 items-center justify-center"
                  >
                    <span
                      className={`relative block h-[3px] overflow-hidden rounded-full transition-all duration-500 ease-[var(--ease-out-soft)] ${
                        i === active ? "w-8 bg-clay/30" : "w-5 bg-forest/25 group-hover/seg:bg-forest/50"
                      }`}
                    >
                      {i === active && (
                        // Fills up while the gallery is playing (time until the next picture); full when paused.
                        <span
                          key={`${active}-${canAutoplay && !userPaused}`}
                          className="absolute inset-0 origin-left bg-clay"
                          onAnimationEnd={() => move(1)}
                          style={
                            canAutoplay && !userPaused
                              ? { animation: `fill-x ${AUTO_MS}ms linear both`, animationPlayState: playing ? "running" : "paused" }
                              : undefined
                          }
                        />
                      )}
                    </span>
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous picture"
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full text-forest shadow-[inset_0_0_0_1.5px_rgb(31_59_45/0.35)] transition-colors hover:bg-forest hover:text-paper"
                >
                  <Icon name="chevron-left" className="h-5 w-5" />
                </button>
                {canAutoplay && (
                  <button
                    type="button"
                    data-play-toggle
                    onClick={() => setUserPaused((v) => !v)}
                    aria-label={userPaused ? "Play the gallery" : "Pause the gallery"}
                    className="inline-flex h-12 items-center gap-2 rounded-full px-4 text-sm font-semibold text-forest shadow-[inset_0_0_0_1.5px_rgb(31_59_45/0.35)] transition-colors hover:bg-forest hover:text-paper"
                  >
                    {userPaused ? (
                      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                        <path d="M8 5.5v13l10.5-6.5z" fill="currentColor" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                        <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" fill="currentColor" />
                      </svg>
                    )}
                    {userPaused ? "Play" : "Pause"}
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next picture"
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-forest text-paper transition-colors hover:bg-forest-deep"
                >
                  <Icon name="chevron-right" className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          <p className="sr-only" aria-live="polite">
            {announce}
          </p>
        </div>

        {/* The larger view. `on-dark` gives its buttons light colours and a yellow focus ring. */}
        <dialog
          ref={dialogRef}
          aria-label="Picture viewer"
          onClick={(e) => e.target === e.currentTarget && closeViewer()}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") viewerStep(1);
            if (e.key === "ArrowLeft") viewerStep(-1);
          }}
          onPointerDown={(e) => (swipeStart.current = e.clientX)}
          onPointerUp={(e) => {
            if (swipeStart.current === null) return;
            const dx = e.clientX - swipeStart.current;
            swipeStart.current = null;
            if (Math.abs(dx) > 60) viewerStep(dx < 0 ? 1 : -1);
          }}
          className="lightbox on-dark m-0 h-dvh max-h-none w-full max-w-none bg-ink/95 p-0 text-paper backdrop:bg-ink/70 open:flex open:flex-col"
        >
          {viewed && viewer !== null && (
            <>
              <div className="flex items-center justify-between px-4 py-3 sm:px-6">
                <p className="label text-paper/75" aria-live="polite">
                  {pad(viewer + 1)} / {pad(n)}
                </p>
                <button
                  type="button"
                  onClick={closeViewer}
                  autoFocus
                  aria-label="Close"
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full text-paper transition-colors hover:bg-white/10"
                >
                  <Icon name="close" className="h-6 w-6" />
                </button>
              </div>

              <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-20">
                <AnimatePresence mode="wait" initial={false}>
                  <m.figure
                    key={viewed.src}
                    initial={{ opacity: 0, scale: 0.985 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.985 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="flex max-h-full flex-col items-center"
                  >
                    <Image
                      src={viewed.src}
                      alt={viewed.alt}
                      width={viewed.width}
                      height={viewed.height}
                      sizes="90vw"
                      className="h-auto max-h-[66dvh] w-auto max-w-full rounded-[1rem] object-contain"
                    />
                    <figcaption className="mt-5 max-w-2xl text-center">
                      <span className="block font-display text-[1.8rem] leading-tight">{viewed.title}</span>
                      <span className="mt-1 block text-paper/80">{viewed.caption}</span>
                      {viewed.aiGenerated && <span className="mt-1 block text-sm text-paper/65">AI-generated illustration</span>}
                    </figcaption>
                  </m.figure>
                </AnimatePresence>

                {n > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => viewerStep(-1)}
                      aria-label="Previous picture"
                      className="absolute left-2 hidden h-12 w-12 items-center justify-center rounded-full bg-white/10 text-paper transition-colors hover:bg-white/20 sm:inline-flex"
                    >
                      <Icon name="chevron-left" className="h-6 w-6" />
                    </button>
                    <button
                      type="button"
                      onClick={() => viewerStep(1)}
                      aria-label="Next picture"
                      className="absolute right-2 hidden h-12 w-12 items-center justify-center rounded-full bg-white/10 text-paper transition-colors hover:bg-white/20 sm:inline-flex"
                    >
                      <Icon name="chevron-right" className="h-6 w-6" />
                    </button>
                  </>
                )}
              </div>

              {n > 1 && (
                <div className="flex justify-center gap-4 px-4 py-5 sm:hidden">
                  <button type="button" onClick={() => viewerStep(-1)} className="btn btn-ghost">
                    <Icon name="chevron-left" className="h-5 w-5" />
                    Previous
                  </button>
                  <button type="button" onClick={() => viewerStep(1)} className="btn btn-ghost">
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
