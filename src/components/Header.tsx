"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { hero, organization } from "@/content/site";
import { getNavigation } from "@/lib/site";

const navigation = getNavigation();
import { Icon, Logo } from "./ui";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
    <header ref={headerRef} className="sticky top-0 z-50">
      {/* The blur lives on its own layer: backdrop-filter on <header> itself would
          become the containing block for the fixed mobile menu and collapse it. */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 transition-[background-color,box-shadow,opacity] duration-300 ${
          scrolled || open
            ? "bg-paper/90 opacity-100 shadow-[0_1px_0_rgb(28_30_26/0.1)] backdrop-blur-md supports-[backdrop-filter]:bg-paper/80"
            : "opacity-0"
        }`}
      />
      <div className="shell relative flex h-[4.5rem] items-center justify-between gap-6">
        <a href="#top" className="-m-1 rounded-sm p-1" aria-label="Jukar — back to top">
          <Logo />
        </a>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navigation.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="relative rounded-full px-4 py-2 text-[0.95rem] font-medium text-ink-soft transition-colors hover:text-forest"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a href="#support" className="btn btn-primary hidden min-h-11 px-5 py-2 text-[0.95rem] sm:inline-flex">
            {hero.primaryCta}
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-forest transition-colors hover:bg-forest/10 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => (open ? close(true) : setOpen(true))}
          >
            <Icon name={open ? "close" : "menu"} className="h-6 w-6" />
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        ref={panelRef}
        data-menu-focus
        hidden={!open}
        className="fixed inset-x-0 top-[4.5rem] bottom-0 overflow-y-auto bg-paper lg:hidden"
      >
        <nav aria-label="Main" className="shell flex min-h-full flex-col pt-6 pb-10">
          <ol className="divide-y divide-ink/10 border-y border-ink/10">
            {navigation.map((item, i) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => close(false)}
                  className="flex items-baseline gap-4 py-5 text-forest"
                >
                  <span className="font-display text-sm italic text-clay-ink">0{i + 1}</span>
                  <span className="display text-[2rem]">{item.label}</span>
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
