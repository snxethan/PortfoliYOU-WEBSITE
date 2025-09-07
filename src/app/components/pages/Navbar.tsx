"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="fixed top-0 left-0 right-0 w-full z-40 bg-[#1a1a1a] border-b border-red-600/30 shadow-sm">
      <div className="max-w-5xl mx-auto py-2 flex items-center justify-center">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className={`text-lg font-bold transition ${pathname === "/" ? "text-red-500" : "text-gray-400 hover:text-red-400"}`}
          >
            Portfoli-YOU
          </Link>
          <span
            className={`text-base font-semibold select-none transition ${pathname === "/installer" ? "text-red-500" : "text-gray-400 opacity-50 cursor-not-allowed"}`}
          >
            Installer
          </span>
          <span
            className={`text-base font-semibold select-none transition ${pathname === "/about" ? "text-red-500" : "text-gray-400 opacity-50 cursor-not-allowed"}`}
          >
            About / FAQ
          </span>
        </div>
      </div>
    </nav>
  );
}
