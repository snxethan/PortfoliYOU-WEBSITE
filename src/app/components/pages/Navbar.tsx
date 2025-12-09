"use client"
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleInstallClick = () => {
    router.push('/install');
  };

  return (
    <nav 
      className="fixed top-0 left-0 right-0 w-full z-40 border-b shadow-sm transition-all duration-300"
      style={{
        backgroundColor: 'var(--surface)',
        borderColor: 'var(--border)',
      }}
    >
      <div className="max-w-6xl mx-auto py-3 px-4 flex items-center justify-center gap-6">
        {/* Install */}
        <button
          onClick={handleInstallClick}
          disabled
          className={`text-xl font-bold select-none cursor-not-allowed transition-all duration-200 bg-transparent border-none p-0 m-0 ${
            pathname === "/install" ? "" : ""
          }`}
          style={{
            color: pathname === "/install" ? 'var(--accent)' : 'var(--fg-muted)',
          }}
        >
          Install
        </button>
        
        {/* Logo/Brand */}
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
        
        {/* FAQs */}
        <Link
          href="/faqs"
          className={`text-xl font-bold transition-all duration-200 hover:scale-105 active:scale-95`}
          style={{
            color: pathname === "/faqs" ? 'var(--accent)' : 'var(--fg-muted)',
          }}
        >
          FAQs
        </Link>
      </div>
    </nav>
  );
}
