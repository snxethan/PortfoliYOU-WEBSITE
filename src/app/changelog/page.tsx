import type { Metadata } from "next";
import PageShell from "../components/pages/PageShell";
import { Badge, Card, Eyebrow } from "../components/ui";
import { changelog, repos } from "../lib/site";

export const metadata: Metadata = {
  title: "Changelog",
  description:
    "What has changed in Portfoli-YOU, newest first. Development happens in the open.",
};

const stateTone = { shipped: "brand", progress: "action" } as const;
const stateLabel = { shipped: "Shipped", progress: "In progress" } as const;

export default function ChangelogPage() {
  return (
    <PageShell>
      <section className="py-container pb-20 pt-12 md:pb-28 md:pt-16">
        <div className="max-w-2xl">
          <Eyebrow>Changelog</Eyebrow>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-5xl">
            What&apos;s changed
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-py-muted md:text-base">
            Newest first. Everything is developed in the open — the{" "}
            <a
              href={repos.website}
              target="_blank"
              rel="noreferrer"
              className="text-py-blue-text underline underline-offset-2"
            >
              commit history
            </a>{" "}
            has the full detail.
          </p>
        </div>

        <ol className="mt-12 max-w-2xl space-y-4">
          {changelog.map((release) => (
            <li key={release.version}>
              <Card className="p-5 md:p-6">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <h2 className="font-mono text-sm font-bold text-white">
                    v{release.version}
                  </h2>
                  <span className="text-sm font-semibold text-py-text">
                    {release.title}
                  </span>
                  <Badge tone={stateTone[release.state]} className="ml-auto">
                    {stateLabel[release.state]}
                  </Badge>
                </div>

                <time
                  dateTime={release.dateISO}
                  className="mt-1 block font-mono text-[11px] uppercase tracking-[0.14em] text-py-subtle"
                >
                  {release.date}
                </time>

                <ul className="mt-4 space-y-2 border-t border-py-blue-text/10 pt-4">
                  {release.changes.map((change) => (
                    <li
                      key={change}
                      className="flex items-start gap-2.5 text-sm text-py-muted"
                    >
                      <span
                        aria-hidden
                        className="mt-[7px] inline-block h-1 w-1 shrink-0 rounded-full bg-py-orange"
                      />
                      {change}
                    </li>
                  ))}
                </ul>
              </Card>
            </li>
          ))}
        </ol>
      </section>
    </PageShell>
  );
}
