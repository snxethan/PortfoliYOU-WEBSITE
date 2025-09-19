"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "../ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="fixed top-0 left-0 right-0 w-full z-40 bg-slate-800/90 dark:bg-[#181818]/90 backdrop-blur-md border-b border-orange-500/30 dark:border-orange-600/30 shadow-lg shadow-orange-500/10 dark:shadow-cyan-500/10 transition-all duration-300">
      <div className="max-w-6xl mx-auto py-3 px-4 flex items-center justify-between">
        
        {/* Left: Install button */}
        <div className="flex-1 flex justify-start">
          <button
            onClick={() => window.location.href = '/download'}
            disabled
            className={`text-xl font-bold select-none cursor-not-allowed transition-all duration-300 text-slate-400 dark:text-gray-400 bg-transparent border-none p-2 rounded-lg hover:bg-slate-200/10 dark:hover:bg-slate-700/30 ${pathname === "/download" ? "text-orange-500" : "" }`}
          >
            Install
          </button>
        </div>

        {/* Center: Logo with hover animation */}
        <div className="flex-1 flex justify-center">
          <Link
            href="/"
            className={`text-2xl font-bold transition-all duration-300 transform hover:scale-110 hover:rotate-1 active:scale-95 ${
              pathname === "/" 
                ? "text-orange-500 drop-shadow-lg" 
                : "text-slate-700 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-500"
            }`}
          >
            <span className="inline-block hover:animate-pulse">Portfoli-YOU</span>
          </Link>
        </div>

        {/* Right: Theme toggle and FAQs */}
        <div className="flex-1 flex justify-end items-center gap-4">
          <Link
            href="/about"
            className={`text-xl font-bold transition-all duration-300 p-2 rounded-lg hover:bg-slate-200/10 dark:hover:bg-slate-700/30 transform hover:scale-105 ${
              pathname === "/about" 
                ? "text-orange-500 drop-shadow-lg" 
                : "text-slate-700 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-500"
            }`}
          >
            FAQs
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
