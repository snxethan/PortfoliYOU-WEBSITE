import type { Metadata } from "next";
import PageShell from "./components/pages/PageShell";
import { ButtonLink, Eyebrow } from "./components/ui";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <PageShell>
      <div className="py-container flex min-h-[calc(100dvh-var(--nav-h))] flex-col items-center justify-center py-20 text-center">
        <Eyebrow>404</Eyebrow>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
          We couldn&apos;t find that page
        </h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-py-muted">
          The link may be out of date, or the page may have moved while the site
          is being rebuilt.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/">Back home</ButtonLink>
          <ButtonLink href="/faqs" variant="secondary">
            Read the FAQ
          </ButtonLink>
        </div>
      </div>
    </PageShell>
  );
}
