"use client";

import Link from "next/link";
import React from "react";
import {
  buttonClass,
  type ButtonSize,
  type ButtonVariant,
} from "../../lib/buttonClass";

/* ---------------------------------------------------------------------------
   Shared primitives. These are the only approved button and card variants —
   pages should not hand-roll their own.

   `primary` is orange and is the single strongest thing on any screen, so use
   at most one per view. `brand` is the blue equivalent for secondary actions
   that still need weight.

   The class builder itself lives in lib/buttonClass so server components can
   call it; re-exported here for convenience.
--------------------------------------------------------------------------- */

export { buttonClass } from "../../lib/buttonClass";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  ...rest
}: ButtonProps) {
  return <button className={buttonClass(variant, size, className)} {...rest} />;
}

interface ButtonLinkProps
  extends Omit<React.ComponentProps<typeof Link>, "className"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className = "",
  ...rest
}: ButtonLinkProps) {
  return <Link className={buttonClass(variant, size, className)} {...rest} />;
}

/* --------------------------------------------------------------------- */

export function Card({
  interactive = false,
  className = "",
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement> & { interactive?: boolean }) {
  return (
    <div
      className={["py-card", interactive ? "py-card-interactive" : "", className]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {children}
    </div>
  );
}

/* --------------------------------------------------------------------- */

export function Eyebrow({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={`py-eyebrow ${className}`}>
      <span aria-hidden className="h-px w-6 bg-current opacity-60" />
      {children}
    </span>
  );
}

/* --------------------------------------------------------------------- */

type BadgeTone = "brand" | "action" | "neutral";

const badgeTones: Record<BadgeTone, string> = {
  brand: "border-py-blue/35 bg-py-blue/10 text-py-blue-text",
  action: "border-py-orange/35 bg-py-orange/10 text-py-orange-text",
  neutral: "border-py-blue-text/12 bg-py-blue-text/[0.05] text-py-muted",
};

export function Badge({
  tone = "neutral",
  className = "",
  children,
}: {
  tone?: BadgeTone;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={[
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1",
        "font-mono text-[11px] tracking-wide",
        badgeTones[tone],
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );
}

/* --------------------------------------------------------------------- */

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  className = "",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={[
        align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl",
        className,
      ].join(" ")}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="mt-3 text-2xl font-bold text-white md:text-3xl">{title}</h2>
      {lead ? (
        <p className="mt-3 text-sm leading-relaxed text-py-muted md:text-base">
          {lead}
        </p>
      ) : null}
    </div>
  );
}

/* --------------------------------------------------------------------- */

/** Shimmering placeholder block. */
export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`py-skeleton ${className}`} />;
}
