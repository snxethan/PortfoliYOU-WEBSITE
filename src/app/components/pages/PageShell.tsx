import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

/**
 * Every route renders the same frame: fixed navbar, shell background, footer.
 * Pages only supply the content between them.
 */
export default function PageShell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="py-shell flex min-h-dvh flex-col">
      <Navbar />
      <main
        id="main"
        className={`flex-1 pt-[var(--nav-h)] ${className}`.trim()}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}
