"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import TooltipWrapper from "../ToolTipWrapper";
import { iconMap } from "../../lib/icons";
import { domains, site, socialLinks } from "../../lib/site";

/**
 * Mirrors the footer on the personal portfolio: social links left, avatar and
 * copyright centred, domain links right, same hover treatment and `order-*`
 * reflow at the lg breakpoint.
 *
 * Two deliberate omissions: the avatar is a plain image rather than a button
 * that opens an API health modal, and there is no Security Policy link. The
 * policy now lives on the FAQ and in page metadata.
 */
const Footer = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const linkClass =
    "inline-flex items-center transition-all duration-200 ease-out hover:text-py-orange-soft hover:scale-105 " +
    "active:scale-100 focus-visible:outline-none focus-visible:text-py-orange-soft focus-visible:scale-105";

  if (loading) {
    return (
      <footer className="w-full border-t border-py-blue-text/10 bg-py-surface px-6 py-6 text-py-muted">
        <div className="mx-auto flex max-w-8xl flex-col items-center gap-6">
          <div className="flex w-full flex-col items-center justify-between gap-4 text-sm lg:flex-row">
            {/* Left: social links skeleton */}
            <div className="order-3 mt-2 lg:order-1 lg:mt-0">
              <div className="flex items-center gap-4">
                <div className="py-skeleton h-5 w-5 rounded-full" />
                <div className="py-skeleton h-5 w-5 rounded-full" />
              </div>
            </div>

            {/* Center: logo & name skeleton */}
            <div className="order-1 flex items-center gap-2 lg:order-2">
              <div className="py-skeleton h-8 w-8 rounded-full" />
              <div className="py-skeleton h-5 w-40" />
            </div>

            {/* Right: domain links skeleton */}
            <div className="order-2 lg:order-3">
              <div className="footer-links flex flex-col items-center gap-2 sm:flex-row">
                <div className="flex gap-4">
                  <div className="py-skeleton h-5 w-16" />
                  <div className="py-skeleton h-5 w-24" />
                  <div className="py-skeleton h-5 w-32" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="w-full border-t border-py-blue-text/10 bg-py-surface px-6 py-6 text-py-muted">
      <div className="mx-auto flex max-w-8xl flex-col items-center gap-6">
        <div className="flex w-full flex-col items-center justify-between gap-4 text-sm lg:flex-row">
          {/* Left: social links */}
          <div className="order-3 mt-2 lg:order-1 lg:mt-0">
            <div className="flex items-center gap-4">
              {socialLinks.professional.map(({ label, icon, url, tooltip }) => {
                const Icon = iconMap[icon];
                const isLinkedIn = label === "LinkedIn";
                return (
                  <TooltipWrapper key={label} label={tooltip}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={label}
                      className={`inline-flex items-center justify-center ${
                        isLinkedIn ? "rounded-none" : "rounded-full"
                      } p-1 text-xl text-py-muted transition-all duration-200 ease-out hover:scale-125 hover:text-py-orange-soft hover:drop-shadow-[0_0_10px_rgba(255,128,31,0.5)] active:scale-100 focus-visible:text-py-orange-soft focus-visible:outline-none focus-visible:drop-shadow-[0_0_10px_rgba(255,128,31,0.5)]`}
                    >
                      <Icon />
                    </a>
                  </TooltipWrapper>
                );
              })}
            </div>
          </div>

          {/* Center: logo & name */}
          <div className="order-1 flex items-center gap-2 lg:order-2">
            <Image
              src="/images/author/snxethan.png"
              alt={site.author.name}
              width={32}
              height={32}
              className="rounded-full transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:scale-105"
            />
            <TooltipWrapper label="My Portfolio">
              <a
                href={site.author.site}
                className={`text-sm text-py-muted ${linkClass}`}
              >
                {site.author.name} &copy; {new Date().getFullYear()}
              </a>
            </TooltipWrapper>
          </div>

          {/* Right: domain links */}
          <div className="order-2 lg:order-3">
            <div className="footer-links flex flex-col items-center gap-2 sm:flex-row">
              <div className="flex gap-4">
                {domains.map(({ label, href }) => (
                  <Link key={label} href={href} className={linkClass}>
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
