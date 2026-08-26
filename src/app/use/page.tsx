import type { Metadata } from "next";
import { FaCheck } from "react-icons/fa";
import PageShell from "../components/pages/PageShell";
import FlowDemo from "../components/product/FlowDemo";
import { Badge, ButtonLink, Card, Eyebrow } from "../components/ui";
import { deployTargets, included, targets } from "../lib/site";

export const metadata: Metadata = {
  title: "Use",
  description:
    "How Portfoli-YOU works: create a project, lay out pages, drop in widgets, edit the generated code, and ship to the host of your choice — in the framework of your choice.",
};

const stateTone = {
  building: "action",
  planned: "brand",
  exploring: "neutral",
} as const;

const stateLabel = {
  building: "Building",
  planned: "Planned",
  exploring: "Exploring",
} as const;

/**
 * Three sections, not six. The old page also carried a "capabilities" grid and
 * a "three depths of editing" row, but both restated the 01–05 walkthrough
 * immediately above them — stage 04 already *is* the three editing depths.
 */
export default function ProductPage() {
  return (
    <PageShell>
      {/* Header + walkthrough --------------------------------------------- */}
      <section className="py-container pb-20 pt-12 md:pb-28 md:pt-16">
        <div className="mb-12 max-w-2xl">
          <Eyebrow>The product</Eyebrow>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-5xl">
            From empty project to live site
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-py-muted md:text-base">
            Five stages, and you can drop to real code at any of them.
          </p>
        </div>

        <FlowDemo />
      </section>

      {/* Framework targets ------------------------------------------------- */}
      <section className="py-container pb-20 md:pb-28">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center lg:gap-16">
          <div>
            <Eyebrow>Framework targets</Eyebrow>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-white md:text-3xl">
              Your project, your stack
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-py-muted md:text-base">
              A project is stored as data, not as code — so the same site can be
              emitted as plain HTML and CSS, as a typed React app, or as
              something else entirely. Pick a target when you create the
              project, and change it later if you outgrow it.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-py-muted md:text-base">
              Converting copies the project rather than overwriting it, and
              tells you up front exactly what carries across — everything the
              builder generated does; code you hand-edited does not.
            </p>
          </div>

          <ul className="space-y-3">
            {targets.map((target) => (
              <li key={target.id}>
                <Card className="flex flex-wrap items-center gap-x-4 gap-y-2 p-4">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-mono text-sm font-semibold text-white">
                      {target.label}
                    </h3>
                    <p className="mt-0.5 text-sm text-py-muted">
                      {target.detail}
                    </p>
                  </div>
                  <Badge tone={stateTone[target.state]}>
                    {stateLabel[target.state]}
                  </Badge>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Shipping + pricing ------------------------------------------------ */}
      <section className="py-container pb-20 md:pb-28">
        <Card className="p-6 md:p-10">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <Eyebrow>Shipping</Eyebrow>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-white md:text-3xl">
                Ship it wherever
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-py-muted">
                Export costs nothing and needs no account. Hosted options exist
                because they are convenient, not because you are stuck with
                them.
              </p>
              <ul className="mt-6 space-y-2.5">
                {deployTargets.map((d) => (
                  <li
                    key={d.label}
                    className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm"
                  >
                    <span className="font-medium text-white">{d.label}</span>
                    <span className="text-py-subtle">{d.detail}</span>
                    <Badge tone={stateTone[d.state]} className="ml-auto">
                      {stateLabel[d.state]}
                    </Badge>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-py-blue-text/10 pt-10 lg:border-l lg:border-t-0 lg:pl-16 lg:pt-0">
              <Badge tone="action">Free tier</Badge>
              <h2 className="mt-4 text-2xl font-bold tracking-tight text-white md:text-3xl">
                Free is the whole product
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-py-muted">
                Not a trial, not a crippled tier. If paid plans arrive they will
                cover things carrying a real per-user bill — several published
                sites, large storage, team seats — and nothing below.
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {included.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm">
                    <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-py-orange/15 text-[9px] text-py-orange-text">
                      <FaCheck aria-hidden />
                    </span>
                    <span className="text-py-muted">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-wrap gap-3">
                <ButtonLink href="/faqs#involved">Help build it</ButtonLink>
                <ButtonLink href="/faqs" variant="secondary">
                  Read the FAQ
                </ButtonLink>
              </div>
            </div>
          </div>
        </Card>
      </section>
    </PageShell>
  );
}
