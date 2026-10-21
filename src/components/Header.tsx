"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { hero, organization } from "@/content/site";
import { getNavigation } from "@/lib/site";
import { Icon, Logo } from "./ui";

const navigation = getNavigation();
const tracked = [...navigation.map((n) => n.href), "#support"];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently being read.
  useEffect(() => {
    const sections = tracked
      .map((href) => document.querySelector<HTMLElement>(href))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(`#${entry.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const close = useCallback((restoreFocus: boolean) => {
    setOpen(false);
    if (restoreFocus) toggleRef.current?.focus();
  }, []);

  // While the menu is open: lock scroll, move focus in, trap Tab, close on Escape.
  useEffect(() => {
    if (!open) return;
    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close(true);
        return;
      }
      if (event.key !== "Tab" || !headerRef.current) return;
      const focusables = Array.from(
        headerRef.current.querySelectorAll<HTMLElement>("[data-menu-focus] a, [data-menu-focus] button, button[aria-controls]"),
      );
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const desktop = window.matchMedia("(min-width: 64rem)");
    const onDesktop = (e: MediaQueryListEvent) => e.matches && close(false);

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onDesktop);
    return () => {
      body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [open, close]);

  return (
    <header ref={headerRef} className="enter-fade sticky top-0 z-50">
      {/* The blur lives on its own layer: backdrop-filter on <header> itself would
          become the containing block for the fixed mobile menu and collapse it. */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 transition-[opacity,box-shadow] duration-300 ${
          scrolled || open
            ? "bg-paper/85 opacity-100 shadow-[0_1px_0_rgb(31_59_45/0.08)] backdrop-blur-md"
            : "opacity-0"
        }`}
      />
      <div className="shell relative flex h-[4.25rem] items-center justify-between gap-6">
        <a href="#top" className="-m-1 rounded-md p-1" aria-label="Jukar — back to top">
          <Logo />
        </a>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navigation.map((item) => {
              const isActive = active === item.href;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={isActive ? "true" : undefined}
                    className={`group relative block rounded-full px-4 py-2 text-[0.95rem] font-medium transition-colors duration-200 ${
                      isActive ? "text-forest" : "text-ink-soft hover:text-forest"
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-4 -bottom-0.5 h-[2px] origin-left rounded-full bg-clay transition-transform duration-300 ease-[var(--ease-out-soft)] ${
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-50"
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a href="#support" className="btn btn-primary hidden min-h-11 px-5 py-2 text-[0.95rem] sm:inline-flex">
            {hero.primaryCta}
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-forest transition-colors hover:bg-forest/8 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => (open ? close(true) : setOpen(true))}
          >
            <Icon name={open ? "close" : "menu"} className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Always in the page (so aria-controls resolves); invisible and unreachable when closed. */}
      <div
        id="mobile-menu"
        ref={panelRef}
        data-menu-focus
        inert={!open}
        className={`fixed inset-x-0 top-[4.25rem] bottom-0 overflow-y-auto bg-paper transition-[opacity,transform,visibility] duration-300 ease-[var(--ease-out-soft)] motion-reduce:transition-none lg:hidden ${
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-3 opacity-0"
        }`}
      >
        <nav aria-label="Main" className="shell flex min-h-full flex-col pt-6 pb-10">
          <ol className="divide-y divide-forest/10 border-y border-forest/10">
            {navigation.map((item, i) => (
              <li key={item.href}>
                <a href={item.href} onClick={() => close(false)} className="flex items-baseline gap-4 py-5 text-forest">
                  <span className="font-display text-lg text-clay-ink italic">0{i + 1}</span>
                  <span className="display text-[2.4rem]">{item.label}</span>
                </a>
              </li>
            ))}
          </ol>
          <a href="#support" onClick={() => close(false)} className="btn btn-primary mt-8 w-full text-lg">
            {hero.primaryCta}
            <Icon name="arrow" className="btn-arrow h-5 w-5" />
          </a>
          <p className="hand mt-auto pt-10 text-center text-2xl text-forest/70">{organization.tagline}</p>
        </nav>
      </div>
    </header>
  );
}
