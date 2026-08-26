"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FaCheck } from "react-icons/fa";
import PageShell from "../components/pages/PageShell";
import ContactFormModal from "../components/ContactFormModal";
import { Badge, Button, Card, Eyebrow } from "../components/ui";
import TeamSection from "../components/about/TeamSection";
import InvolvedSection from "../components/about/InvolvedSection";
import { faqs, repos, roadmap, security, site } from "../lib/site";

/** Rail entries: every question, then the long-form blocks. */
const extras = [
  { id: "roadmap", label: "Roadmap" },
  { id: "security", label: "Security & privacy" },
  { id: "team", label: "Who makes this" },
  { id: "involved", label: "Get involved" },
] as const;

const stateTone = { active: "action", next: "brand", planned: "neutral" } as const;
const stateLabel = {
  active: "In progress",
  next: "Up next",
  planned: "Planned",
} as const;

/** Reads --nav-h (in rem) as pixels, with a sane fallback. */
function navOffset() {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(
    "--nav-h",
  );
  return parseFloat(raw) * 16 || 72;
}

export default function FaqsPage() {
  const [showContact, setShowContact] = useState(false);

  const entries = useMemo(
    () => [
      ...faqs.map((f) => ({ id: f.id as string, label: f.q })),
      ...extras.map((e) => ({ id: e.id as string, label: e.label })),
    ],
    [],
  );

  const [active, setActive] = useState<string>(entries[0].id);
  const refs = useRef<Record<string, HTMLElement | null>>({});

  /* Scroll-spy: whichever heading last crossed under the navbar wins. A plain
     scroll listener beats IntersectionObserver here because the blocks differ
     wildly in height — the tall ones would otherwise always win. */
  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const line = navOffset() + 48;

      let current = entries[0].id;
      for (const entry of entries) {
        const el = refs.current[entry.id];
        if (el && el.getBoundingClientRect().top <= line) current = entry.id;
      }

      // Snap to the last entry at the bottom of the page, so a short final
      // block still registers.
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 80) {
        current = entries[entries.length - 1].id;
      }

      setActive(current);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [entries]);

  const scrollTo = useCallback((id: string) => {
    const el = refs.current[id];
    if (!el) return;
    window.scrollTo({
      top: Math.max(
        el.getBoundingClientRect().top + window.scrollY - navOffset() - 24,
        0,
      ),
      behavior: "smooth",
    });
  }, []);

  return (
    <PageShell>
      <div className="py-container">
        <div className="flex gap-10 lg:gap-16">
          {/* Rail --------------------------------------------------------- */}
          <aside className="sticky top-[var(--nav-h)] hidden h-[calc(100dvh-var(--nav-h))] w-[248px] shrink-0 flex-col justify-center lg:flex">
            <nav aria-label="On this page" className="py-10">
              <p className="px-3 pb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-py-subtle">
                On this page
              </p>
              <ul className="space-y-0.5 border-l border-py-blue-text/10">
                {entries.map((entry) => {
                  const isActive = active === entry.id;
                  return (
                    <li key={entry.id} className="relative">
                      {isActive ? (
                        <span
                          aria-hidden
                          className="absolute -left-px top-1 h-[calc(100%-0.5rem)] w-px bg-py-blue"
                        />
                      ) : null}
                      <button
                        type="button"
                        onClick={() => scrollTo(entry.id)}
                        aria-current={isActive ? "true" : undefined}
                        className={[
                          "w-full rounded-r-lg px-3 py-2 text-left text-sm transition-colors duration-200",
                          isActive
                            ? "bg-py-blue-text/[0.06] font-medium text-white"
                            : "text-py-muted hover:bg-py-orange/[0.07] hover:text-py-orange-text",
                        ].join(" ")}
                      >
                        {entry.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>

          {/* Content ------------------------------------------------------ */}
          <div className="min-w-0 flex-1 pb-24 pt-12 md:pt-16">
            <header className="max-w-2xl">
              <Eyebrow>FAQ</Eyebrow>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-5xl">
                Questions, answered
              </h1>
            </header>

            {/* Questions */}
            <div className="mt-12 max-w-2xl space-y-10">
              {faqs.map((faq) => (
                <section
                  key={faq.id}
                  id={faq.id}
                  ref={(el) => {
                    refs.current[faq.id] = el;
                  }}
                  className="scroll-mt-28"
                >
                  <h2 className="text-lg font-semibold text-white">{faq.q}</h2>
                  <p className="mt-2.5 text-sm leading-relaxed text-py-muted md:text-[15px]">
                    {faq.a}
                  </p>
                </section>
              ))}
            </div>

            {/* Roadmap */}
            <section
              id="roadmap"
              ref={(el) => {
                refs.current.roadmap = el;
              }}
              className="mt-20 max-w-2xl scroll-mt-28"
            >
              <h2 className="text-lg font-semibold text-white">Roadmap</h2>
              <p className="mt-2.5 text-sm leading-relaxed text-py-muted">
                Built in the open. Each phase tracks real milestones in the
                public repositories, not marketing dates. For what has already
                landed, see the{" "}
                <Link
                  href="/changelog"
                  className="text-py-blue-text underline underline-offset-2"
                >
                  changelog
                </Link>
                .
              </p>

              <ol className="mt-6 space-y-3">
                {roadmap.map((phase) => (
                  <li key={phase.step}>
                    <Card className="flex flex-wrap items-center gap-x-4 gap-y-2 p-4">
                      <span
                        className={[
                          "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-mono text-xs font-bold",
                          phase.state === "active"
                            ? "bg-py-orange text-[#1a0d02]"
                            : "border border-py-blue-text/12 bg-py-blue-text/[0.05] text-py-muted",
                        ].join(" ")}
                      >
                        {phase.step}
                      </span>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-semibold text-white">
                          {phase.title}
                        </h3>
                        <p className="mt-0.5 text-sm text-py-muted">
                          {phase.detail}
                        </p>
                      </div>
                      <Badge tone={stateTone[phase.state]}>
                        {stateLabel[phase.state]}
                      </Badge>
                    </Card>
                  </li>
                ))}
              </ol>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={repos.app}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-py-blue-text underline underline-offset-2"
                >
                  Builder repository
                </a>
                <span aria-hidden className="text-py-subtle">
                  ·
                </span>
                <a
                  href={repos.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-py-blue-text underline underline-offset-2"
                >
                  Website repository
                </a>
              </div>
            </section>

            {/* Security & privacy */}
            <section
              id="security"
              ref={(el) => {
                refs.current.security = el;
              }}
              className="mt-20 max-w-2xl scroll-mt-28"
            >
              <h2 className="text-lg font-semibold text-white">
                Security &amp; privacy
              </h2>
              <p className="mt-2.5 text-sm leading-relaxed text-py-muted">
                {security.summary}
              </p>

              <ul className="mt-5 space-y-2.5">
                {security.points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-sm">
                    <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-py-blue/15 text-[9px] text-py-blue-text">
                      <FaCheck aria-hidden />
                    </span>
                    <span className="text-py-muted">{point}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setShowContact(true)}
                >
                  Report a security issue
                </Button>
              </div>
            </section>

            {/* Who makes this */}
            <section
              id="team"
              ref={(el) => {
                refs.current.team = el;
              }}
              className="mt-20 max-w-2xl scroll-mt-28"
            >
              <h2 className="text-lg font-semibold text-white">
                Who makes this
              </h2>
              <div className="mt-2.5">
                <TeamSection />
              </div>
            </section>

            {/* Get involved */}
            <section
              id="involved"
              ref={(el) => {
                refs.current.involved = el;
              }}
              className="mt-20 max-w-2xl scroll-mt-28"
            >
              <h2 className="text-lg font-semibold text-white">Get involved</h2>
              <div className="mt-2.5">
                <InvolvedSection />
              </div>
            </section>

            {/* Close */}
            <Card className="mt-20 max-w-2xl p-6 md:p-8">
              <h2 className="text-lg font-semibold text-white">
                Something still unclear?
              </h2>
              <p className="mt-2.5 text-sm leading-relaxed text-py-muted">
                Feedback, feature requests and portfolios built with{" "}
                {site.name} are all welcome at{" "}
                <a
                  href={`mailto:${site.author.email}`}
                  className="text-py-blue-text underline underline-offset-2"
                >
                  {site.author.email}
                </a>
                .
              </p>
            </Card>
          </div>
        </div>
      </div>

      {showContact && (
        <ContactFormModal onClose={() => setShowContact(false)} />
      )}
    </PageShell>
  );
}
