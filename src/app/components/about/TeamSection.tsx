import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { iconMap } from "../../lib/icons";
import { Card } from "../ui";
import { team } from "../../lib/site";

/**
 * Who builds Portfoli-YOU.
 *
 * Driven entirely by the `team` array — add a person there and they appear
 * here, with the grid widening to two columns on its own. Nothing in the copy
 * assumes a particular headcount.
 */
export default function TeamSection() {
  const many = team.length > 1;

  return (
    <div>
      <p className="text-sm leading-relaxed text-py-muted">
        {many
          ? `Portfoli-YOU is built and maintained by ${team.length} people, in the open.`
          : "Portfoli-YOU is built and maintained in the open."}
      </p>

      <ul className={`mt-6 grid gap-4 ${many ? "sm:grid-cols-2" : ""}`}>
        {team.map((person) => (
          <li key={person.id}>
            <Card className="h-full p-5">
              <div className="flex items-start gap-4">
                <Image
                  src={person.avatar}
                  alt=""
                  width={72}
                  height={72}
                  className="h-14 w-14 shrink-0 rounded-full ring-1 ring-py-orange/40"
                />
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-white">
                    {person.name}
                  </h3>
                  <p className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.14em] text-py-subtle">
                    {person.role}
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-py-muted">
                {person.bio}
              </p>

              {/* Links — same icon treatment as the footer. */}
              <div className="mt-5 flex flex-wrap items-center gap-3">
                {person.portfolio ? (
                  <a
                    href={person.portfolio}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-md border border-py-blue-text/15 bg-py-blue-text/[0.05] px-3 py-1.5 text-xs font-medium text-py-text transition-colors hover:border-py-orange/50 hover:bg-py-orange/[0.08] hover:text-py-orange-text"
                  >
                    Portfolio
                    <ArrowUpRight aria-hidden size={13} />
                  </a>
                ) : null}

                <span className="flex items-center gap-3">
                  {person.links.map((link) => {
                    const Icon = iconMap[link.icon];
                    return (
                      <a
                        key={link.label}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${person.name} on ${link.label}`}
                        title={link.label}
                        className={`inline-flex items-center justify-center ${
                          link.icon === "FaLinkedin"
                            ? "rounded-none"
                            : "rounded-full"
                        } p-1 text-lg text-py-muted transition-all duration-200 ease-out hover:scale-125 hover:text-py-orange-soft hover:drop-shadow-[0_0_10px_rgba(255,128,31,0.5)] active:scale-100 focus-visible:text-py-orange-soft focus-visible:outline-none`}
                      >
                        <Icon />
                      </a>
                    );
                  })}
                </span>

                {person.sponsorHandle ? (
                  <span className="ml-auto flex h-8 items-center">
                    {/* GitHub's own Sponsors button. Needs `frame-src
                        https://github.com` in the CSP — see next.config.ts. */}
                    <iframe
                      src={`https://github.com/sponsors/${person.sponsorHandle}/button`}
                      title={`Sponsor ${person.name} on GitHub`}
                      height={32}
                      width={114}
                      loading="lazy"
                      className="rounded-md border-0"
                    />
                  </span>
                ) : null}
              </div>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}
