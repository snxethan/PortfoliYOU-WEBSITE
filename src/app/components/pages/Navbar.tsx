"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { authEnabled, nav, site } from "../../lib/site";
import { Button, ButtonLink } from "../ui";

const AUTH_SOON = "Accounts open once the builder is ready";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Transparent over the hero, gaining a surface once the page moves.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", open);
    return () => document.body.classList.remove("overflow-hidden");
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-40 h-[var(--nav-h)]",
        "transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled
          ? "border-b border-py-blue-text/10 bg-py-bg/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      ].join(" ")}
    >
      <nav
        aria-label="Primary"
        className="py-container flex h-full items-center justify-between gap-4"
      >
        {/* Brand */}
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-2.5"
          aria-label={`${site.name} home`}
        >
          <span className="relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg bg-white ring-1 ring-py-blue-text/15 transition-shadow duration-200 group-hover:ring-py-orange/60 md:h-10 md:w-10">
            <Image
              src="/images/icon/portfoliyou.png"
              alt=""
              width={80}
              height={80}
              className="h-full w-full object-cover"
              priority
            />
          </span>
          <span className="text-[15px] font-bold tracking-tight text-white md:text-base">
            Portfoli<span className="text-py-orange-text">-YOU</span>
          </span>
        </Link>

        {/* Tabs */}
        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full border border-py-blue-text/10 bg-py-blue-text/[0.04] p-1 backdrop-blur-md md:flex">
          {nav.map((item) => {
            const active = isActive(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={[
                    "relative inline-flex h-9 items-center rounded-full px-4 text-sm font-medium transition-colors duration-200",
                    active
                      ? "bg-py-blue/18 text-white"
                      : "text-py-muted hover:text-py-orange-text hover:bg-py-orange/[0.08]",
                  ].join(" ")}
                >
                  {item.label}
                  {active ? (
                    <span
                      aria-hidden
                      className="absolute inset-x-4 -bottom-px h-px bg-gradient-to-r from-transparent via-py-blue to-transparent"
                    />
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Auth — frozen until there is something to sign in to. */}
        <div className="hidden shrink-0 items-center gap-2 md:flex">
          {authEnabled ? (
            <>
              <ButtonLink href="/login" variant="ghost" size="sm">
                Sign in
              </ButtonLink>
              <ButtonLink href="/signup" variant="primary" size="sm">
                Get started
              </ButtonLink>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" disabled title={AUTH_SOON}>
                Sign in
              </Button>
              <Button variant="primary" size="sm" disabled title={AUTH_SOON}>
                Get started
              </Button>
              <span className="sr-only">{AUTH_SOON}</span>
            </>
          )}
        </div>

        {/* Mobile trigger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="py-mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-py-blue-text/10 bg-py-blue-text/[0.04] text-py-muted transition-colors hover:border-py-orange/50 hover:text-py-orange-text md:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {/* Mobile sheet */}
      <div id="py-mobile-nav" hidden={!open} className="md:hidden">
        <div className="animate-fade-in border-b border-py-blue-text/10 bg-py-bg/95 backdrop-blur-xl">
          <div className="py-container flex flex-col gap-1 py-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={[
                  "rounded-lg px-3 py-3 text-base font-medium transition-colors",
                  isActive(item.href)
                    ? "bg-py-blue/18 text-white"
                    : "text-py-muted hover:bg-py-orange/[0.08] hover:text-py-orange-text",
                ].join(" ")}
              >
                {item.label}
              </Link>
            ))}
            <div className="py-rule my-2" />
            {authEnabled ? (
              <div className="grid grid-cols-2 gap-2">
                <ButtonLink href="/login" variant="secondary" size="md">
                  Sign in
                </ButtonLink>
                <ButtonLink href="/signup" variant="primary" size="md">
                  Get started
                </ButtonLink>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Button variant="secondary" size="md" disabled>
                  Sign in
                </Button>
                <Button variant="primary" size="md" disabled>
                  Get started
                </Button>
                <p className="col-span-2 mt-1 text-center text-xs text-py-subtle">
                  {AUTH_SOON}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
