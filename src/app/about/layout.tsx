import type { Metadata } from "next";

/**
 * The FAQ page itself is a client component (scroll-spy), so its metadata
 * lives here instead.
 */
export const metadata: Metadata = {
  title: "FAQ",
  description:
    "What Portfoli-YOU is, what it costs, how your data is handled, and where the project is going next.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
