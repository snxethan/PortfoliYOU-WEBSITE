"use client";

import { useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { status } from "../../lib/site";
import { useSessionFlag } from "../../lib/hooks";

const DISMISS_KEY = "py-notice-dismissed";

/**
 * Work-in-progress strip. One line, dismissible, landing page only — the FAQ
 * answers the same question properly, so repeating it on every route would
 * just be noise.
 */
export default function Notice({ className = "" }: { className?: string }) {
  // Read once, in a single render. Returns true on the server so a visitor who
  // already dismissed this never sees it flash back on navigation.
  const dismissedEarlier = useSessionFlag(DISMISS_KEY, status.updatedISO);
  const [dismissedNow, setDismissedNow] = useState(false);

  if (dismissedEarlier || dismissedNow) return null;

  const dismiss = () => {
    setDismissedNow(true);
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
        // Slow orange glow plus a tilt on hover — the treatment the live site
        // uses on its "Coming Soon" box, applied to the status pill that
        // replaced it.
        "animate-fade-in animate-pulse-glow py-tilt py-accent-hover",
        "flex items-center gap-3 rounded-full border border-py-orange/30",
        "bg-py-orange/[0.07] py-1.5 pl-4 pr-1.5 text-xs backdrop-blur-sm",
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
          href="/faqs"
          className="text-py-blue-text underline underline-offset-2"
        >
          what that means
        </Link>
      </p>

      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss notice"
        className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-py-subtle transition-colors hover:bg-py-orange/10 hover:text-py-text"
      >
        <X size={12} />
      </button>
    </div>
  );
}
