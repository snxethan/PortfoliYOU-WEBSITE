"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Footer from "./components/pages/Footer"
import Navbar from "./components/pages/Navbar"
import Notice from "./components/pages/Notice"

export default function PortfoliYouPage() {
  const [loading, setLoading] = useState(true)
  const [logoHovered, setLogoHovered] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  // --- SIMPLE SKELETON (updated for theme support) ---
  if (loading) {
    return (
      <div className="min-h-dvh flex flex-col bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:via-black dark:to-gray-900 text-gray-900 dark:text-white font-sans">
        <Navbar />
        <main className="flex-1 w-full px-6 py-6">
          <div className="w-full max-w-2xl mx-auto text-center animate-pulse">
            <div className="w-32 h-32 mx-auto rounded-full bg-gray-300 dark:bg-gray-700 mb-8 flex items-center justify-center">
              <div className="w-20 h-20 bg-gray-400 dark:bg-gray-600 rounded" />
            </div>
            <div className="h-12 w-80 bg-gray-300 dark:bg-gray-700 mx-auto rounded mb-6" />
            <div className="h-6 w-96 bg-gray-300 dark:bg-gray-700 mx-auto rounded mb-4" />
            <div className="h-6 w-72 bg-gray-300 dark:bg-gray-700 mx-auto rounded" />
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    // ROOT wrapper with theme-aware gradient background
    <div className="min-h-dvh flex flex-col bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-black dark:to-gray-900 text-gray-900 dark:text-white font-sans animate-fade-in">
      <Navbar />

      {/* MAIN content area */}
      <main className="flex-1 w-full px-6 pt-20 pb-8 animate-fade-up">
        <Notice />

        {/* Hero section with enhanced animations */}
        <div className="w-full max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div 
              className={[
                "w-48 h-48 lg:w-64 lg:h-64 mx-auto rounded-full overflow-hidden shadow-2xl",
                "transition-all duration-300 cursor-pointer",
                "hover:scale-110 hover:rotate-6 animate-pulse-glow",
                logoHovered ? "animate-logo-hover" : ""
              ].join(" ")}
              onMouseEnter={() => setLogoHovered(true)}
              onMouseLeave={() => setLogoHovered(false)}
            >
              <Image
                src="/images/icon/portfoliyou.png"
                alt="Portfoli-YOU Logo"
                width={1024}
                height={1024}
                className="w-full h-full object-cover transition-transform duration-300"
                priority
              />
            </div>
          </div>

          {/* Enhanced hero title with gradient text */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-up">
            <span className="text-gray-800 dark:text-white">Portfoli-</span>
            <span className="font-black text-transparent bg-gradient-to-r from-cyan-500 via-orange-500 to-cyan-500 bg-clip-text animate-gradient-shift">
              YOU
            </span>
          </h1>

          <div className="mb-8 space-y-4 animate-fade-up" style={{animationDelay: '0.2s'}}>
            <p className="text-xl md:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 leading-relaxed italic font-medium">
              A Portfolio for <span className="text-transparent bg-gradient-to-r from-cyan-500 to-orange-500 bg-clip-text font-bold">you</span>, by <span className="text-transparent bg-gradient-to-r from-orange-500 to-cyan-500 bg-clip-text font-bold">you</span>.
            </p>
            <p className="text-base md:text-lg lg:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Build stunning, personalized digital portfolios that showcase your unique talents and achievements. No coding experience required.
            </p>
          </div>

          <div className="mb-8 animate-fade-up" style={{animationDelay: '0.4s'}}>
            <div className="inline-block bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-xl border-2 border-cyan-300 dark:border-cyan-500/50 hover:border-orange-400 dark:hover:border-orange-400/70 px-6 lg:px-8 py-4 lg:py-6 shadow-lg hover:shadow-2xl transition-all duration-300 ease-out hover:scale-105 active:scale-95 group">
              <p className="text-xl lg:text-2xl font-bold text-transparent bg-gradient-to-r from-cyan-600 to-orange-600 bg-clip-text mb-2 group-hover:animate-text-glow">
                Coming Soon
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-sm lg:text-base leading-relaxed">
                View the progress anytime in the GitHub Repositories!<br />
                <i>Check out the <a href="/about" className="text-orange-500 dark:text-orange-400 hover:text-cyan-500 dark:hover:text-cyan-400 hover:underline transition-colors duration-200 font-medium">FAQs</a> for more information</i>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
