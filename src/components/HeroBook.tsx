"use client";

import Image from "next/image";
import { LazyMotion, domAnimation, m, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useEffect, useRef, type CSSProperties } from "react";
import type { Photo } from "@/content/images";
import { AiBadge } from "./ui";

/**
 * The hero's focal point: an open schoolbook in CSS 3D (no WebGL).
 * Left page: the brand line written by hand. Right page: the hero picture,
 * taped in like a print. The pages open once on load (CSS, skipped with
 * reduced motion) and the book tilts gently toward a mouse pointer.
 */
export function HeroBook({ photo, tagline }: { photo: Photo | null; tagline: string }) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useSpring(tiltX, { stiffness: 90, damping: 18, mass: 0.6 });
  const rotateY = useSpring(tiltY, { stiffness: 90, damping: 18, mass: 0.6 });

  useEffect(() => {
    // Only for a precise pointer (mouse/trackpad), never on touch, never with reduced motion.
    if (reduceMotion || !window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      const el = sceneRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (r.width * 1.5)));
      const y = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (r.height * 1.5)));
      tiltY.set(x * 7);
      tiltX.set(-y * 5);
    };
    const onLeave = () => {
      tiltX.set(0);
      tiltY.set(0);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [reduceMotion, tiltX, tiltY]);

  const [line1, line2] = splitTagline(tagline);

  return (
    <LazyMotion features={domAnimation} strict>
      <div ref={sceneRef} className="book-scene relative mx-auto w-full max-w-[38rem] [container-type:inline-size]">
        <m.div style={{ rotateX, rotateY }} className="relative aspect-[1.42/1]">
          <div className="book absolute inset-0">
            {/* Cover and page block, slightly behind the pages */}
            <div
              aria-hidden="true"
              className="absolute -inset-[3%] rounded-[16px] bg-navy shadow-[0_60px_90px_-45px_rgb(20_43_74/0.7)]"
              style={{ transform: "translateZ(-8px)" }}
            />
            <div
              aria-hidden="true"
              className="absolute -inset-x-[1.4%] -inset-y-[1.6%] rounded-[12px] bg-[#e9e4d8]"
              style={{ transform: "translateZ(-4px)" }}
            />

            {/* Left page — the brand line, handwritten */}
            <div
              className="book-page book-page-left book-open-left ruled margin-rule overflow-hidden"
              style={{ "--line": "6.4cqw" } as CSSProperties}
            >
              <div className="absolute inset-0 [&::before]:left-[16%]" />
              <div className="relative flex h-full flex-col justify-center pr-[10%] pl-[22%]">
                <p className="hand text-[6.2cqw] leading-[6.4cqw] text-blue-deep">
                  <span className="block">{line1}</span>
                  <span className="block">{line2}</span>
                </p>
                <svg viewBox="0 0 120 40" aria-hidden="true" className="mt-[4cqw] w-[44%] text-blue">
                  <path
                    className="draw-in"
                    style={{ ["--len" as string]: 160 }}
                    d="M4 26c14-12 26-12 34 0 8 12 18 10 26-2 8-12 20-14 30-2 6 7 12 8 22 2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            {/* Right page — the picture, taped in like a print */}
            <div className="book-page book-page-right book-open-right p-[6%]">
              <figure className="relative h-full rotate-[1.5deg] bg-white p-[3.5%] pb-[3.5%] shadow-[0_12px_24px_-14px_rgb(20_43_74/0.45)]">
                <span aria-hidden="true" className="tape -top-[4%] left-[30%] z-10 h-[7%] w-[38%] -rotate-3" />
                <div className="relative h-full overflow-hidden bg-sage">
                  {photo && (
                    <>
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        loading="eager"
                        fetchPriority="high"
                        sizes="(min-width: 1024px) 17rem, 44vw"
                        className="object-cover"
                        style={photo.focus ? { objectPosition: photo.focus } : undefined}
                      />
                      {photo.aiGenerated && <AiBadge compact className="bottom-[4%] left-[4%]" />}
                    </>
                  )}
                </div>
              </figure>
            </div>

            {/* The spine */}
            <div
              aria-hidden="true"
              className="absolute inset-y-0 left-1/2 w-[3%] -translate-x-1/2 bg-[linear-gradient(90deg,transparent,rgb(20_43_74/0.18),transparent)]"
            />
          </div>
        </m.div>

        {/* A pencil resting beside the book */}
        <svg
          viewBox="0 0 300 26"
          aria-hidden="true"
          className="absolute -right-[2%] -bottom-[9%] w-[54%] rotate-[-9deg] drop-shadow-[0_10px_8px_rgb(20_43_74/0.25)]"
        >
          <rect x="0" y="2" width="26" height="22" rx="5" fill="#eaa292" />
          <rect x="24" y="2" width="22" height="22" fill="#c9c6bf" />
          <rect x="46" y="2" width="206" height="22" fill="var(--color-sun)" />
          <path d="M46 9.5h206M46 16.5h206" stroke="#d9a63b" strokeWidth="1.5" />
          <path d="M252 2l40 11-40 11z" fill="#efd3a9" />
          <path d="M279 9.5l13 3.5-13 3.5z" fill="var(--color-navy)" />
        </svg>
      </div>
    </LazyMotion>
  );
}

/** Splits "A little help. A lot of love." into two handwritten lines. */
function splitTagline(tagline: string): [string, string] {
  const i = tagline.indexOf(". ");
  return i === -1 ? [tagline, ""] : [tagline.slice(0, i + 1), tagline.slice(i + 2)];
}
