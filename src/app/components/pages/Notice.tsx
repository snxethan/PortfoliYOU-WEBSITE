"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { status } from "../../lib/site";

const DISMISS_KEY = "py-notice-dismissed";

/**
 * Work-in-progress strip. One line, dismissible, landing page only — the FAQ
 * answers the same question properly, so repeating it on every route would
 * just be noise.
 */
export default function Notice({ className = "" }: { className?: string }) {
  const [dismissed, setDismissed] = useState(true);

  // Start hidden and reveal after checking storage, so a visitor who already
  // dismissed it never sees the banner flash on navigation.
  useEffect(() => {
    try {
      setDismissed(sessionStorage.getItem(DISMISS_KEY) === status.updatedISO);
    } catch {
      setDismissed(false);
    }
  }, []);

  if (dismissed) return null;

  const dismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem(DISMISS_KEY, status.updatedISO);
    } catch {
      /* storage unavailable — dismissal is simply not persisted */
    }
  };

  return (
    <div
      role="status"
      className={[
        "animate-fade-in flex items-center gap-3 rounded-full border border-py-blue-text/12",
        "bg-py-blue-text/[0.05] py-1.5 pl-4 pr-1.5 text-xs backdrop-blur-sm",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span aria-hidden className="relative flex h-1.5 w-1.5 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-py-orange opacity-70" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-py-orange" />
      </span>

      <p className="min-w-0 flex-1 truncate text-py-muted">
        <span className="font-medium text-py-text">{status.phase}</span>
        <span className="mx-2 text-py-subtle">·</span>
        Not available yet —{" "}
        <Link
          href="/about"
          className="text-py-blue-text underline underline-offset-2"
        >
          what that means
        </Link>
      </p>

      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss notice"
        className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-py-subtle transition-colors hover:bg-py-blue-text/10 hover:text-py-text"
      >
        <X size={12} />
      </button>
    </div>
  );
}
