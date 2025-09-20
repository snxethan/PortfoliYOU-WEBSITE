"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "../ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="fixed top-0 left-0 right-0 w-full z-40 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-cyan-200 dark:border-cyan-500/30 shadow-sm">
      <div className="max-w-4xl mx-auto py-2 flex items-center justify-between px-4">
        {/* Left section */}
        <div className="flex-1 flex justify-start">
          <button
            onClick={() => window.location.href = '/download'}
            disabled
            className={[
              "text-xl font-bold select-none cursor-not-allowed transition-all duration-300",
              "text-gray-400 dark:text-gray-500 bg-transparent border-none p-2 m-0 rounded-lg",
              pathname === "/download" ? "text-cyan-500 dark:text-cyan-400" : ""
            ].join(" ")}
          >
            Install
          </button>
        </div>

        {/* Center section - Logo */}
        <div className="flex-1 flex justify-center">
          <Link
            href="/"
            className={[
              "text-xl lg:text-2xl font-bold transition-all duration-300 px-2 py-1 rounded-lg",
              "hover:scale-105 hover:animate-text-glow",
              pathname === "/" 
                ? "text-transparent bg-gradient-to-r from-cyan-500 to-orange-500 bg-clip-text animate-gradient-shift" 
                : "text-gray-700 dark:text-gray-300 hover:text-cyan-500 dark:hover:text-cyan-400"
            ].join(" ")}
          >
            Portfoli-<span className="font-black text-transparent bg-gradient-to-r from-orange-500 to-cyan-500 bg-clip-text">YOU</span>
          </Link>
        </div>

        {/* Right section */}
        <div className="flex-1 flex justify-end items-center gap-4">
          <Link
            href="/about"
            className={[
              "text-xl font-bold transition-all duration-300 px-2 py-1 rounded-lg hover:scale-105",
              pathname === "/about" 
                ? "text-orange-500 dark:text-orange-400" 
                : "text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400"
            ].join(" ")}
          >
            FAQs
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
