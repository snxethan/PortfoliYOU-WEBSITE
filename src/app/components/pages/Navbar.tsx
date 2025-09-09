"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="fixed top-0 left-0 right-0 w-full z-40 bg-[#181818] border-b border-red-600/30 shadow-sm">
  <div className="max-w-4xl mx-auto py-2 flex items-center justify-center">
        <div className="flex items-center justify-center w-full text-center">
          <div className="flex-1 max-w-xs flex justify-end">
            <button
              onClick={() => window.location.href = '/download'}
              disabled
              className={`text-2xl font-bold select-none cursor-not-allowed transition text-gray-400 bg-transparent border-none p-0 m-0 ${pathname === "/download" ? "text-red-500" : "" }`} //"hover:text-red-500
            >
              Install
            </button>
          </div>
          <div className="flex-1 max-w-xs flex justify-center">
            <Link
              href="/"
              className={`text-2xl font-bold transition ${pathname === "/" ? "text-red-500" : "text-gray-400 hover:text-red-500"}`}
            >
              Portfoli-YOU
            </Link>
          </div>
          <div className="flex-1 max-w-xs flex justify-start">
            <Link
              href="/about"
              className={`text-2xl font-bold transition ${pathname === "/about" ? "text-red-500" : "text-gray-400 hover:text-red-500"}`}
            >
              FAQs
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
