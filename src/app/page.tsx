import { iconMap } from "./lib/icons";
import PageShell from "./components/pages/PageShell";
import Notice from "./components/pages/Notice";
import BuilderMock from "./components/visuals/BuilderMock";
import { ButtonLink } from "./components/ui";
import { heroBeats, primaryCta, proof, site } from "./lib/site";

/**
 * Landing page. Deliberately short: pitch, picture, three beats, one number,
 * one call to action. Everything else lives on /product, /involved or the FAQ.
 */
export default function HomePage() {
  return (
    <PageShell>
      {/* Hero -------------------------------------------------------------- */}
      <section className="py-container pb-16 pt-10 text-center md:pb-24 md:pt-16">
        <div className="animate-rise flex justify-center">
          <Notice />
        </div>

        <h1 className="animate-rise py-delay-1 mx-auto mt-8 max-w-3xl text-4xl font-bold tracking-tight text-white md:text-6xl">
          Your portfolio,{" "}
          <span className="py-gradient-text">built in an afternoon</span>
        </h1>

        <p className="animate-rise py-delay-2 mx-auto mt-5 max-w-xl text-base leading-relaxed text-py-muted md:text-lg">
          {site.name} is a drag-and-drop builder for personal sites. Pick a
          theme, drop in your work, publish. No code, no lock-in, free to start.
        </p>

        <div className="animate-rise py-delay-3 mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink href={primaryCta.href} size="lg">
            {primaryCta.label}
          </ButtonLink>
          <ButtonLink href="/about" variant="secondary" size="lg">
            Read the FAQ
          </ButtonLink>
        </div>

        {/* Product shot */}
        <div className="animate-rise py-delay-4 relative mx-auto mt-14 max-w-4xl md:mt-20">
          {/* Bleeds vertically only — horizontal bleed pushes past the
              viewport on narrow screens and causes sideways scroll. */}
          <div
            aria-hidden
            className="absolute inset-x-0 -top-8 bottom-0 -z-10 rounded-[2rem] bg-py-blue/10 blur-3xl"
          />
          <BuilderMock />
        </div>
      </section>

      {/* Three beats ------------------------------------------------------- */}
      <section className="py-container pb-16 md:pb-24">
        <ul className="grid gap-6 md:grid-cols-3 md:gap-10">
          {heroBeats.map((beat) => {
            const Icon = iconMap[beat.icon];
            return (
              <li key={beat.id}>
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-py-blue/25 bg-py-blue/10 text-py-blue-text">
                  <Icon aria-hidden className="text-sm" />
                </span>
                <h2 className="mt-4 text-base font-semibold text-white">
                  {beat.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-py-muted">
                  {beat.body}
                </p>
              </li>
            );
          })}
        </ul>
      </section>

      {/* The number -------------------------------------------------------- */}
      <section className="py-container pb-16 md:pb-24">
        <div className="py-rule" />
        <div className="mx-auto max-w-2xl py-12 text-center md:py-16">
          <p className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            <span className="text-py-muted">{proof.stat}</span>
            <span className="mx-3 text-py-subtle">vs</span>
            <span className="text-py-orange-text">{proof.vs}</span>
          </p>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-py-muted">
            {proof.line} Portfoli-YOU exists to make the second one easy enough
            to actually have.
          </p>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-py-subtle">
            {proof.source}
          </p>
        </div>
        <div className="py-rule" />
      </section>

      {/* Close ------------------------------------------------------------- */}
      <section className="py-container pb-20 text-center md:pb-28">
        <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
          Built in the open, by one person
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-py-muted">
          It isn&apos;t finished yet. If you want to follow along, contribute a
          widget, partner up or help fund the hosted free tier — there&apos;s a
          way in.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/involved" size="lg">
            Get involved
          </ButtonLink>
          <ButtonLink href="/product" variant="secondary" size="lg">
            See how it works
          </ButtonLink>
        </div>
      </section>
    </PageShell>
  );
}
