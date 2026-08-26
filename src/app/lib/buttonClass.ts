/**
 * Button styling, kept out of the `"use client"` UI module on purpose.
 *
 * Anything exported from a client module becomes a client reference, so a
 * server component cannot *call* it — only render it. Server pages that style a
 * plain <a> as a button need this helper, so it lives here where both sides can
 * import it.
 */

export type ButtonVariant = "primary" | "brand" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg font-semibold whitespace-nowrap " +
  "transition-[background-color,border-color,color,box-shadow,transform] duration-200 " +
  "active:translate-y-px disabled:opacity-50 disabled:active:translate-y-0";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-py-orange text-[#1a0d02] shadow-[0_1px_0_0_rgba(255,255,255,0.22)_inset] " +
    "hover:bg-py-orange-soft hover:shadow-[0_10px_28px_-12px_rgba(247,107,21,0.85)] " +
    "disabled:hover:bg-py-orange disabled:hover:shadow-none",
  brand:
    "bg-py-blue text-[#02121f] shadow-[0_1px_0_0_rgba(255,255,255,0.22)_inset] " +
    "hover:bg-py-blue-soft hover:shadow-[0_10px_28px_-12px_rgba(0,144,255,0.85)] " +
    "disabled:hover:bg-py-blue disabled:hover:shadow-none",
  secondary:
    "border border-py-blue-text/15 bg-py-blue-text/[0.05] text-py-text " +
    "hover:border-py-blue-text/35 hover:bg-py-blue-text/[0.1] " +
    "disabled:hover:border-py-blue-text/15 disabled:hover:bg-py-blue-text/[0.05]",
  ghost:
    "text-py-muted hover:text-white hover:bg-py-blue-text/[0.08] " +
    "disabled:hover:text-py-muted disabled:hover:bg-transparent",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

export function buttonClass(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  extra = "",
) {
  return [base, variants[variant], sizes[size], extra].filter(Boolean).join(" ");
}
