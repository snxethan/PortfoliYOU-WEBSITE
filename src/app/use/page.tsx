"use client";

import Navbar from "../components/pages/Navbar";
import Notice from "../components/pages/Notice";
import SkeletonLoader from "../components/SkeletonLoader";
import { useLoadingDelay } from "../components/hooks/useLoadingDelay";
import {
  FaSignInAlt,
  FaDownload,
  FaFileAlt,
  FaCheckCircle,
  FaChevronDown,
} from "react-icons/fa";
import { useRef, useState, useCallback } from "react";
import Footer from "../components/pages/Footer";
import Link from "next/link";

const SITE_NAVBAR_OFFSET = 96;

const sectionIcons: { [key: string]: typeof FaSignInAlt } = {
  online: FaSignInAlt,
  offline: FaDownload,
  changelog: FaFileAlt,
};

const sections = [
  { id: "online", title: "Use Online" },
  { id: "offline", title: "Use Offline" },
  { id: "changelog", title: "Changelog" },
];

export default function UsePage() {
  // Default expand the first section
  const [expanded, setExpanded] = useState<string | null>(sections[0].id);

  // map of refs for precise scroll w/ offset
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>(
    sections.reduce((acc: { [key: string]: HTMLElement | null }, s) => {
      acc[s.id] = null;
      return acc;
    }, {})
  );

  const scrollToSection = useCallback((id: string) => {
    const el = sectionRefs.current[id];
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const absoluteTop = rect.top + window.scrollY;
    const y = Math.max(absoluteTop - SITE_NAVBAR_OFFSET - 16, 0); // 16px extra breathing room
    window.scrollTo({ top: y, behavior: "smooth" });
  }, []);

  const handleExpand = useCallback(
    (id: string) => {
      setExpanded(id);
      // Delay scrolling to allow expansion animation to complete (300ms duration + small buffer)
      setTimeout(() => {
        scrollToSection(id);
      }, 350);
    },
    [scrollToSection]
  );

  const handleNavClick = (id: string) => handleExpand(id);

  const loading = useLoadingDelay();

  if (loading) {
    return <SkeletonLoader />;
  }

  return (
    <div>
      <div
        className="flex flex-col min-h-screen font-sans transition-all duration-300"
        style={{
          background: 'linear-gradient(to bottom, var(--bg), var(--muted), var(--surface))',
          color: 'var(--fg)',
        }}
      >
        <Navbar />

        <main className="flex-grow w-full flex">
          {/* Left-side Navigator (centered vertically) */}

          <aside
            className="hidden lg:flex sticky top-0 h-screen min-w-[260px] max-w-[300px] border-r pl-2 pt-[64px]"
            style={{
              borderColor: 'var(--border)',
              backgroundColor: 'color-mix(in oklab, var(--surface) 70%, transparent)',
            }}
          >
            <nav className="m-auto flex w-full max-w-[260px] flex-col items-stretch gap-3 px-4 py-4">
              {sections.map((s) => {
                const Icon = sectionIcons[s.id];
                const isActive = expanded === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => handleNavClick(s.id)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-left font-semibold transition-all duration-200 outline-none ring-0 focus-visible:ring-2`}
                    style={{
                      backgroundColor: isActive ? 'color-mix(in oklab, var(--accent) 20%, transparent)' : 'transparent',
                      color: isActive ? 'var(--accent)' : 'var(--fg-muted)',
                      boxShadow: isActive ? '0 0 0 2px var(--accent)' : 'none',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = 'color-mix(in oklab, var(--accent) 15%, transparent)'
                        e.currentTarget.style.color = 'var(--accent)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = 'transparent'
                        e.currentTarget.style.color = 'var(--fg-muted)'
                      }
                    }}
                    aria-current={isActive ? "true" : undefined}
                  >
                    <Icon style={{ color: 'var(--accent)' }} className="shrink-0" />
                    <span className="truncate">{s.title}</span>
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Content column */}
          <div className="flex-1 min-w-0">
            <div className="mx-auto max-w-4xl px-4 md:px-24 pt-24 pb-16">
              <div className="text-center mb-12 animate-fade-in-up">
                <h1
                  className="text-4xl md:text-5xl lg:text-6xl font-bold"
                  style={{
                    color: 'var(--fg)',
                    fontFamily: 'var(--heading-font)',
                  }}
                >
                  Use Portfoli-<span style={{ color: 'var(--accent)' }}>YOU</span>
                </h1>
              </div>
              <Notice />

              {/* Sections */}
              <div className="space-y-10">
                {sections.map((section) => (
                  <article
                    key={section.id}
                    ref={(el) => {
                      sectionRefs.current[section.id] = el;
                    }}
                    // ensure native anchor scrolls stop under fixed navbar
                    className="scroll-mt-28 md:scroll-mt-24"
                  >
                    {/* Section Header (click anywhere to expand) */}
                    <header>
                      <button
                        className="group w-full flex items-center justify-between gap-3 text-left transition-all duration-200"
                        onClick={() => handleExpand(section.id)}
                        aria-expanded={expanded === section.id}
                        aria-controls={`${section.id}-panel`}
                      >
                        <div className="flex items-center gap-3">
                          {(() => {
                            const Icon = sectionIcons[section.id];
                            return (
                              <span
                                className="inline-flex h-10 w-10 items-center justify-center rounded-lg transition-transform duration-200 hover:scale-110"
                                style={{
                                  backgroundColor: 'var(--accent)',
                                }}
                              >
                                <Icon className="text-white" />
                              </span>
                            );
                          })()}
                          <h2
                            className="text-xl md:text-2xl font-bold"
                            style={{
                              color: 'var(--fg)',
                              fontFamily: 'var(--heading-font)',
                            }}
                          >
                            {section.title}
                          </h2>
                        </div>
                        <FaChevronDown
                          className={`transition-transform duration-200 ${
                            expanded === section.id ? "rotate-180" : "rotate-0"
                          }`}
                          style={{ color: 'var(--accent)' }}
                          aria-hidden="true"
                        />
                      </button>

                      {/* Always-visible preview line under header */}
                      <p className="mt-2 text-sm md:text-base" style={{ color: 'var(--fg-muted)' }}>
                        {section.id === "online" && <>Sign up and use Portfoli-YOU in the cloud</>}
                        {section.id === "offline" && <>Download the installer for offline use</>}
                        {section.id === "changelog" && <>Track updates and new features</>}
                      </p>
                    </header>

                    {/* Expandable body */}
                    <div
                      id={`${section.id}-panel`}
                      className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${
                        expanded === section.id
                          ? "max-h-[3000px] opacity-100"
                          : "max-h-0 opacity-70"
                      }`}
                    >
                      <div className="pt-4">
                        {section.id === "online" && (
                          <>
                            <div className="mb-6 flex justify-center">
                              <div
                                className="block max-w-fit rounded-xl px-4 lg:px-8 py-3 lg:py-4 shadow-lg transition-all duration-300 ease-out hover:scale-105 active:scale-95 animate-pulse-glow border"
                                style={{
                                  backgroundColor: 'var(--surface)',
                                  borderColor: 'var(--accent)',
                                }}
                              >
                                <p
                                  className="text-xl lg:text-2xl font-semibold text-center mb-1 lg:mb-2"
                                  style={{ color: 'var(--accent)' }}
                                >
                                  Coming Soon
                                </p>
                                <p
                                  className="text-sm lg:text-base"
                                  style={{ color: 'var(--fg-muted)' }}
                                >
                                  View the progress anytime in the GitHub Repositories! <br />
                                  <i>Check out the <Link href="/faqs" className="link-accent hover:underline">FAQs</Link> for more information</i>
                                </p>
                              </div>
                            </div>

                            <div className="mt-8">
                              <h3
                                className="text-lg md:text-xl font-semibold mb-4"
                                style={{
                                  color: 'var(--fg)',
                                  fontFamily: 'var(--heading-font)',
                                }}
                              >
                                Online Features
                              </h3>
                              <ul className="space-y-4 text-sm md:text-base ml-4 md:ml-8" style={{ color: 'var(--fg-muted)' }}>
                                <li className="flex items-start gap-3 transition-all duration-200 hover:scale-105">
                                  <FaCheckCircle style={{ color: 'var(--accent)' }} className="mt-1 shrink-0" /> 
                                  Create and edit your portfolio directly in your browser
                                </li>
                                <li className="flex items-start gap-3 transition-all duration-200 hover:scale-105">
                                  <FaCheckCircle style={{ color: 'var(--accent)' }} className="mt-1 shrink-0" /> 
                                  Sync across all your devices automatically
                                </li>
                                <li className="flex items-start gap-3 transition-all duration-200 hover:scale-105">
                                  <FaCheckCircle style={{ color: 'var(--accent)' }} className="mt-1 shrink-0" /> 
                                  Access your portfolio from anywhere with an internet connection
                                </li>
                                <li className="flex items-start gap-3 transition-all duration-200 hover:scale-105">
                                  <FaCheckCircle style={{ color: 'var(--accent)' }} className="mt-1 shrink-0" /> 
                                  Share your portfolio with a simple link
                                </li>
                              </ul>
                            </div>
                          </>
                        )}

                        {section.id === "offline" && (
                          <>
                            <p className="leading-relaxed mb-6" style={{ color: 'var(--fg)' }}>
                              Download the <b>Portfoli-YOU</b> installer to use the application offline. Build your portfolio on your device with full privacy and control.
                            </p>

                            <div className="mt-8">
                              <h3
                                className="text-lg md:text-xl font-semibold mb-4"
                                style={{
                                  color: 'var(--fg)',
                                  fontFamily: 'var(--heading-font)',
                                }}
                              >
                                Why Use Offline?
                              </h3>
                              <ul className="space-y-4 text-sm md:text-base ml-4 md:ml-8" style={{ color: 'var(--fg-muted)' }}>
                                <li className="flex items-start gap-3 transition-all duration-200 hover:scale-105">
                                  <FaCheckCircle style={{ color: 'var(--accent)' }} className="mt-1 shrink-0" /> 
                                  Privacy-first: Your data stays on your device
                                </li>
                                <li className="flex items-start gap-3 transition-all duration-200 hover:scale-105">
                                  <FaCheckCircle style={{ color: 'var(--accent)' }} className="mt-1 shrink-0" /> 
                                  No internet connection required to build and edit
                                </li>
                                <li className="flex items-start gap-3 transition-all duration-200 hover:scale-105">
                                  <FaCheckCircle style={{ color: 'var(--accent)' }} className="mt-1 shrink-0" /> 
                                  Full-featured desktop application with drag-and-drop interface
                                </li>
                                <li className="flex items-start gap-3 transition-all duration-200 hover:scale-105">
                                  <FaCheckCircle style={{ color: 'var(--accent)' }} className="mt-1 shrink-0" /> 
                                  Optional cloud sync when you need it
                                </li>
                              </ul>
                            </div>

                            <div className="mt-8 p-6 rounded-lg border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                              <h4 className="text-lg font-semibold mb-3" style={{ color: 'var(--accent)' }}>
                                Download Installer
                              </h4>
                              <p className="mb-4" style={{ color: 'var(--fg-muted)' }}>
                                Get started with <b>Portfoli-YOU</b> by downloading the installer for your platform.
                              </p>
                              <div className="flex flex-col gap-3">
                                <button
                                  disabled
                                  className="px-6 py-3 rounded-lg font-semibold transition-all duration-200 cursor-not-allowed opacity-50"
                                  style={{ backgroundColor: 'var(--accent)', color: '#000' }}
                                >
                                  Download for Windows (Coming Soon)
                                </button>
                                <button
                                  disabled
                                  className="px-6 py-3 rounded-lg font-semibold transition-all duration-200 cursor-not-allowed opacity-50"
                                  style={{ backgroundColor: 'var(--accent)', color: '#000' }}
                                >
                                  Download for macOS (Coming Soon)
                                </button>
                                <button
                                  disabled
                                  className="px-6 py-3 rounded-lg font-semibold transition-all duration-200 cursor-not-allowed opacity-50"
                                  style={{ backgroundColor: 'var(--accent)', color: '#000' }}
                                >
                                  Download for Linux (Coming Soon)
                                </button>
                              </div>
                              <p className="mt-4 text-sm" style={{ color: 'var(--fg-muted)' }}>
                                <i>Check out the <Link href="/faqs" className="link-accent hover:underline">FAQs</Link> for more information about the development progress</i>
                              </p>
                            </div>
                          </>
                        )}

                        {section.id === "changelog" && (
                          <>
                            <div className="mb-6 flex justify-center">
                              <div
                                className="block max-w-fit rounded-xl px-4 lg:px-8 py-3 lg:py-4 shadow-lg transition-all duration-300 ease-out hover:scale-105 active:scale-95 animate-pulse-glow border"
                                style={{
                                  backgroundColor: 'var(--surface)',
                                  borderColor: 'var(--accent)',
                                }}
                              >
                                <p
                                  className="text-xl lg:text-2xl font-semibold text-center mb-1 lg:mb-2"
                                  style={{ color: 'var(--accent)' }}
                                >
                                  Coming Soon
                                </p>
                                <p
                                  className="text-sm lg:text-base"
                                  style={{ color: 'var(--fg-muted)' }}
                                >
                                  View the progress anytime in the GitHub Repositories! <br />
                                  <i>Check out the <Link href="/faqs" className="link-accent hover:underline">FAQs</Link> for more information</i>
                                </p>
                              </div>
                            </div>

                            <p className="leading-relaxed mb-6" style={{ color: 'var(--fg)' }}>
                              Stay up to date with the latest features, improvements, and bug fixes for <b>Portfoli-YOU</b>.
                            </p>

                            <div className="mt-8">
                              <h3
                                className="text-lg md:text-xl font-semibold mb-4"
                                style={{
                                  color: 'var(--fg)',
                                  fontFamily: 'var(--heading-font)',
                                }}
                              >
                                What to Expect
                              </h3>
                              <ul className="space-y-4 text-sm md:text-base ml-4 md:ml-8" style={{ color: 'var(--fg-muted)' }}>
                                <li className="flex items-start gap-3 transition-all duration-200 hover:scale-105">
                                  <FaCheckCircle style={{ color: 'var(--accent)' }} className="mt-1 shrink-0" /> 
                                  Detailed release notes for every version
                                </li>
                                <li className="flex items-start gap-3 transition-all duration-200 hover:scale-105">
                                  <FaCheckCircle style={{ color: 'var(--accent)' }} className="mt-1 shrink-0" /> 
                                  New feature announcements and improvements
                                </li>
                                <li className="flex items-start gap-3 transition-all duration-200 hover:scale-105">
                                  <FaCheckCircle style={{ color: 'var(--accent)' }} className="mt-1 shrink-0" /> 
                                  Bug fixes and performance enhancements
                                </li>
                                <li className="flex items-start gap-3 transition-all duration-200 hover:scale-105">
                                  <FaCheckCircle style={{ color: 'var(--accent)' }} className="mt-1 shrink-0" /> 
                                  Breaking changes and migration guides
                                </li>
                              </ul>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
