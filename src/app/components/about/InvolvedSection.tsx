import { ArrowUpRight } from "lucide-react";
import { iconMap } from "../../lib/icons";
import { buttonClass } from "../../lib/buttonClass";
import { Card } from "../ui";
import { involve, supportTiers } from "../../lib/site";

/**
 * The four asks — learn, contribute, partner, sponsor — plus what funding
 * actually pays for. This used to be its own /involved route; folded into the
 * FAQ so the site keeps three tabs.
 */
export default function InvolvedSection() {
  return (
    <div>
      <p className="text-sm leading-relaxed text-py-muted">
        Portfoli-YOU is open source and unfunded. If any of the following is
        you, there is a way in.
      </p>

      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {involve.map((item) => {
          const Icon = iconMap[item.icon];
          return (
            <li key={item.id}>
              <Card interactive className="flex h-full flex-col p-5">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-py-blue/25 bg-py-blue/10 text-py-blue-text">
                  <Icon aria-hidden className="text-sm" />
                </span>
                <h3 className="mt-3.5 text-sm font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-py-muted">
                  {item.body}
                </p>
                <div className="mt-5">
                  <a
                    href={item.href}
                    {...(item.external
                      ? { target: "_blank", rel: "noreferrer" }
                      : {})}
                    className={buttonClass(
                      item.id === "support" ? "primary" : "secondary",
                      "sm",
                    )}
                  >
                    {item.cta}
                    {item.external ? (
                      <ArrowUpRight aria-hidden size={14} />
                    ) : null}
                  </a>
                </div>
              </Card>
            </li>
          );
        })}
      </ul>

      <h3 className="mt-10 text-sm font-semibold text-white">
        What funding actually pays for
      </h3>
      <p className="mt-1.5 text-sm text-py-muted">
        No thermometer and no stretch goals — just the four things that cost
        money.
      </p>
      <dl className="mt-5 grid gap-x-8 gap-y-5 sm:grid-cols-2">
        {supportTiers.map((tier) => (
          <div key={tier.label}>
            <dt className="text-sm font-medium text-white">{tier.label}</dt>
            <dd className="mt-1 text-sm leading-relaxed text-py-muted">
              {tier.body}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
