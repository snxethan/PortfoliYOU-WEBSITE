"use client"
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import ThemeToggle from "../ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleInstallClick = () => {
    router.push('/download');
  };

  return (
    <nav 
      className="fixed top-0 left-0 right-0 w-full z-40 border-b shadow-sm transition-all duration-300"
      style={{
        backgroundColor: 'var(--surface)',
        borderColor: 'var(--border)',
      }}
    >
      <div className="max-w-6xl mx-auto py-3 px-4 flex items-center justify-between">
        {/* Left: Install */}
        <div className="flex-1 flex justify-start">
          <button
            onClick={handleInstallClick}
            disabled
            className={`text-xl font-bold select-none cursor-not-allowed transition-all duration-200 bg-transparent border-none p-0 m-0 ${
              pathname === "/download" ? "" : ""
            }`}
            style={{
              color: pathname === "/download" ? 'var(--accent)' : 'var(--fg-muted)',
            }}
          >
            Install
          </button>
        </div>
        
        {/* Center: Logo/Brand */}
        <div className="flex-1 flex justify-center">
          <Link
            href="/"
            className={`text-2xl font-bold transition-all duration-200 hover:scale-105 active:scale-95`}
            style={{
              color: pathname === "/" ? 'var(--accent)' : 'var(--fg-muted)',
              fontFamily: 'var(--heading-font)',
            }}
          >
            Portfoli-<span style={{ color: 'var(--accent)' }}>YOU</span>
          </Link>
        </div>
        
        {/* Right: FAQs and Theme Toggle */}
        <div className="flex-1 flex justify-end items-center gap-4">
          <Link
            href="/about"
            className={`text-xl font-bold transition-all duration-200 hover:scale-105 active:scale-95`}
            style={{
              color: pathname === "/about" ? 'var(--accent)' : 'var(--fg-muted)',
            }}
          >
            FAQs
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
