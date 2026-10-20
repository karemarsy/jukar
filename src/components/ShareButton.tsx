"use client";

import { useEffect, useRef, useState } from "react";
import { organization } from "@/content/site";
import { copyText } from "./CopyButton";
import { Icon } from "./ui";

type Status = "idle" | "copied" | "failed";

/** Uses the Web Share API where available; otherwise copies the page link. */
export function ShareButton({
  text,
  label = "Share Jukar",
  className = "btn btn-ghost",
}: {
  text: string;
  label?: string;
  className?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function onClick() {
    const url = window.location.href.split("#")[0] ?? window.location.href;
    const data = { title: organization.name, text, url };

    if (typeof navigator.share === "function" && (!navigator.canShare || navigator.canShare(data))) {
      try {
        await navigator.share(data);
        return;
      } catch (error) {
        // The visitor closed the share sheet — nothing to report.
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    }

    const ok = await copyText(url);
    setStatus(ok ? "copied" : "failed");
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus("idle"), 2800);
  }

  return (
    <>
      <button type="button" onClick={onClick} className={className}>
        <Icon name={status === "copied" ? "check" : "share"} className="h-5 w-5 shrink-0" />
        <span>{status === "copied" ? "Link copied" : status === "failed" ? "Couldn't copy link" : label}</span>
      </button>
      <span role="status" className="sr-only">
        {status === "copied"
          ? "Link to this page copied to your clipboard."
          : status === "failed"
            ? "Couldn't copy the link. You can copy it from the address bar."
            : ""}
      </span>
    </>
  );
}
