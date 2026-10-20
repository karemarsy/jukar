"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "./ui";

type Status = "idle" | "copied" | "failed";

export async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // fall through to the legacy path
  }
  try {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand("copy");
    area.remove();
    return ok;
  } catch {
    return false;
  }
}

export function CopyButton({
  text,
  label,
  className = "btn btn-ghost",
  compact = false,
}: {
  text: string;
  /** Accessible, visible label, e.g. "Copy code". */
  label: string;
  className?: string;
  /** Icon-only presentation (label stays available to assistive tech). */
  compact?: boolean;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function onClick() {
    const ok = await copyText(text);
    setStatus(ok ? "copied" : "failed");
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus("idle"), 2400);
  }

  const visible = status === "copied" ? "Copied" : status === "failed" ? "Couldn't copy" : label;

  return (
    <>
      <button type="button" onClick={onClick} className={className} aria-label={compact ? label : undefined}>
        <Icon name={status === "copied" ? "check" : "copy"} className="h-5 w-5 shrink-0" />
        {compact ? null : <span>{visible}</span>}
      </button>
      <span role="status" className="sr-only">
        {status === "copied" ? "Copied to clipboard." : status === "failed" ? "Copying failed. Please select the text and copy it manually." : ""}
      </span>
    </>
  );
}
