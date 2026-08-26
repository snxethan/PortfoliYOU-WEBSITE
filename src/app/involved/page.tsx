import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import PageShell from "../components/pages/PageShell";
import { iconMap } from "../lib/icons";
import { Card, Eyebrow, SectionHeading } from "../components/ui";
import { buttonClass } from "../lib/buttonClass";
import { involve, repos, site, supportTiers } from "../lib/site";

export const metadata: Metadata = {
  title: "Get involved",
  description:
    "Portfoli-YOU is built in the open by one person. Read the plan, contribute code, partner with the project, or sponsor the work.",
};

export default function InvolvedPage() {
  return (
    <PageShell>
      {/* Header ------------------------------------------------------------ */}
      <section className="py-container pb-14 pt-12 md:pt-16">
        <div className="max-w-2xl">
          <Eyebrow>Get involved</Eyebrow>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-5xl">
            One person is building this
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-py-muted md:text-base">
            {site.name} is open source, unfunded, and further along than it
            looks. If any of the following is you, there is a way in.
          </p>
        </div>

        {/* Four asks */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 md:gap-6">
          {involve.map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <Card key={item.id} interactive className="flex flex-col p-6">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-py-blue/25 bg-py-blue/10 text-py-blue-text">
                  <Icon aria-hidden />
                </span>
                <h2 className="mt-4 text-base font-semibold text-white">
                  {item.title}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-py-muted">
                  {item.body}
                </p>
                <div className="mt-5 flex h-11 items-center">
                  {item.id === "support" ? (
                    /* GitHub's own Sponsors button. Kept at its native 114×32
                       inside an h-11 row so this card's footer lines up with
                       the buttons in the other three. Needs `frame-src
                       https://github.com` in the CSP — see next.config.ts. */
                    <iframe
                      src="https://github.com/sponsors/snxethan/button"
                      title="Sponsor snxethan on GitHub"
                      height={32}
                      width={114}
                      loading="lazy"
                      className="rounded-md border-0"
                    />
                  ) : (
                    <a
                      href={item.href}
                      {...(item.external
                        ? { target: "_blank", rel: "noreferrer" }
                        : {})}
                      className={buttonClass("secondary", "md")}
                    >
                      {item.cta}
                      {item.external ? (
                        <ArrowUpRight aria-hidden size={15} />
                      ) : null}
                    </a>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Where support goes ------------------------------------------------ */}
      <section className="py-container pb-20 md:pb-28">
        <SectionHeading
          eyebrow="Where support goes"
          title="What funding actually pays for"
          lead="No thermometer and no stretch goals — just the four things that cost money."
        />

        <dl className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {supportTiers.map((tier) => (
            <div key={tier.label}>
              <dt className="text-sm font-semibold text-white">{tier.label}</dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-py-muted">
                {tier.body}
              </dd>
            </div>
          ))}
        </dl>

      </section>

      {/* Contributing ------------------------------------------------------ */}
      <section className="py-container pb-20 md:pb-28">
        <Card className="p-6 md:p-10">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-white md:text-2xl">
                Good places to start
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-py-muted">
                The widget contract is documented and deliberately small, so a
                new widget is a self-contained pull request rather than a tour
                of the whole codebase.
              </p>
              <ul className="mt-6 space-y-2.5">
                {[
                  "Write a widget — one schema, one emit function",
                  "Add a framework target for a stack you know",
                  "Accessibility audits on generated output",
                  "Documentation, examples and starter themes",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-py-muted"
                  >
                    <span
                      aria-hidden
                      className="mt-[7px] inline-block h-1 w-1 shrink-0 rounded-full bg-py-orange"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-py-blue-text/10 pt-10 lg:border-l lg:border-t-0 lg:pl-16 lg:pt-0">
              <h2 className="text-xl font-bold tracking-tight text-white md:text-2xl">
                Read before you write
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-py-muted">
                The architecture plan explains the one decision everything else
                hangs off: widgets emit a normalised node tree, and each
                framework target renders that tree once. It is why adding a
                widget does not cost you every target.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={`${repos.app}/blob/main/PLAN.md`}
                  target="_blank"
                  rel="noreferrer"
                  className={buttonClass("secondary", "md")}
                >
                  Architecture plan <ArrowUpRight aria-hidden size={15} />
                </a>
                <a
                  href={repos.app}
                  target="_blank"
                  rel="noreferrer"
                  className={buttonClass("secondary", "md")}
                >
                  Builder repo <ArrowUpRight aria-hidden size={15} />
                </a>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Close ------------------------------------------------------------- */}
      <section className="py-container pb-20 text-center md:pb-28">
        <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
          Or just say hello
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-py-muted">
          Questions, ideas and blunt feedback are all genuinely useful right
          now — the product is early enough that they still change things.
        </p>
        <div className="mt-7">
          <a
            href={`mailto:${site.author.email}?subject=Portfoli-YOU`}
            className={buttonClass("primary", "lg")}
          >
            {site.author.email}
          </a>
        </div>
      </section>
    </PageShell>
  );
}
