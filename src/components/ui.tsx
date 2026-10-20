import type { ReactNode, SVGProps } from "react";

/* ── Brand ─────────────────────────────────────────────────── */

/** Jukar mark: a sun rising from an open book. */
export function LogoMark({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" focusable="false" className={className} {...props}>
      <circle cx="20" cy="18" r="7.5" fill="var(--color-sun)" />
      <path d="M3.5 21.5c6-2.6 11.4-2 16.5 1.6V35c-5-3.2-10.4-3.8-16.5-1.4z" fill="currentColor" />
      <path d="M36.5 21.5c-6-2.6-11.4-2-16.5 1.6V35c5-3.2 10.4-3.8 16.5-1.4z" fill="currentColor" />
    </svg>
  );
}

export function Logo({ className = "", tone = "ink" }: { className?: string; tone?: "ink" | "paper" }) {
  return (
    <span
      className={`inline-flex items-center gap-2 ${tone === "paper" ? "text-paper" : "text-forest"} ${className}`}
    >
      <LogoMark className="h-8 w-8 shrink-0" />
      <span
        className="font-display text-[1.65rem] font-medium italic leading-none tracking-tight"
        style={{ fontVariationSettings: '"SOFT" 100, "WONK" 1' }}
      >
        jukar
      </span>
    </span>
  );
}

/* ── Section label: “№ 01 — Our mission” ──────────────────── */

export function SectionLabel({
  number,
  children,
  tone = "ink",
  className = "",
}: {
  number: string;
  children: ReactNode;
  tone?: "ink" | "paper";
  className?: string;
}) {
  return (
    <p
      className={`label flex items-center gap-3 ${tone === "paper" ? "text-sun-soft" : "text-clay-ink"} ${className}`}
    >
      <span className="font-display text-base font-normal italic normal-case tracking-normal">№ {number}</span>
      <span aria-hidden="true" className="h-px w-8 bg-current opacity-60" />
      <span>{children}</span>
    </p>
  );
}

/* ── AI image label ───────────────────────────────────────── */

/**
 * Visible label for AI-generated images. The image's alt text already says
 * so for screen readers, so this copy is hidden from them to avoid repetition.
 */
export function AiBadge({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full bg-ink/70 px-2.5 py-1 font-sans text-[0.7rem] font-medium tracking-wide text-paper backdrop-blur-sm ${className}`}
    >
      AI-generated illustration
    </span>
  );
}

/* ── Icons (inline, stroke-based) ─────────────────────────── */

type IconName = "arrow" | "arrow-down" | "copy" | "check" | "share" | "phone" | "mail" | "chat" | "menu" | "close" | "alert" | "external";

const paths: Record<IconName, ReactNode> = {
  arrow: <path d="M5 12h13M13 6l6 6-6 6" />,
  "arrow-down": <path d="M12 5v13M6 13l6 6 6-6" />,
  copy: (
    <>
      <rect x="8.5" y="8.5" width="11" height="11" rx="2" />
      <path d="M15.5 8.5V6a1.5 1.5 0 0 0-1.5-1.5H6A1.5 1.5 0 0 0 4.5 6v8A1.5 1.5 0 0 0 6 15.5h2.5" />
    </>
  ),
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  share: (
    <>
      <path d="M12 3.5v11M7.5 8 12 3.5 16.5 8" />
      <path d="M5 12.5V18a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5.5" />
    </>
  ),
  phone: <path d="M6.5 3.5h3l1.5 4-2 1.5a11 11 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2 2A16 16 0 0 1 4.5 5.5a2 2 0 0 1 2-2z" />,
  mail: (
    <>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  chat: <path d="M4.5 19.5l1.2-3.6A8 8 0 1 1 8.4 18.5z" />,
  menu: <path d="M4 7h16M4 12h16M4 17h10" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  alert: (
    <>
      <path d="M12 4 21 19.5H3z" />
      <path d="M12 10v4.5M12 17.2v.3" />
    </>
  ),
  external: <path d="M14 4.5h5.5V10M19.5 4.5 11 13M17.5 14v4a1.5 1.5 0 0 1-1.5 1.5H6A1.5 1.5 0 0 1 4.5 18V8A1.5 1.5 0 0 1 6 6.5h4" />,
};

export function Icon({ name, className = "h-5 w-5" }: { name: IconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {paths[name]}
    </svg>
  );
}
