"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Footer from "./components/pages/Footer"
import Navbar from "./components/pages/Navbar"
import Notice from "./components/pages/Notice"

export default function PortfoliYouPage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  // --- SIMPLE SKELETON (unchanged) ---
  if (loading) {
    return (
      <div className="min-h-dvh flex flex-col bg-gradient-to-b from-[#1a1a1a] via-[#121212] to-[#0d0d0d] text-white font-sans">
        <Navbar />
        <main className="flex-1 w-full px-6 py-6">
          <div className="w-full max-w-2xl mx-auto text-center animate-pulse">
            <div className="w-32 h-32 mx-auto rounded-full bg-[#333333] mb-8 flex items-center justify-center">
              <div className="w-20 h-20 bg-[#444444] rounded" />
            </div>
            <div className="h-12 w-80 bg-[#333333] mx-auto rounded mb-6" />
            <div className="h-6 w-96 bg-[#333333] mx-auto rounded mb-4" />
            <div className="h-6 w-72 bg-[#333333] mx-auto rounded" />
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <>
      <Navbar />

      {/* MAIN is just a flow container; no vertical centering */}
      <main className="flex-1 w-full px-6 pt-20 pb-8">
        <Notice />

        {/* Remove h-full and justify-center to avoid extra space */}
        <div className="w-full max-w-4xl mx-auto text-center">
          <div className="mb-6">
            <div className="w-48 h-48 lg:w-64 lg:h-64 mx-auto rounded-full overflow-hidden shadow-2xl group">
              <Image
                src="/images/icon/portfoliyou.png"
                alt="Portfoli-YOU Logo"
                width={1024}
                height={1024}
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:brightness-110"
                priority
              />
            </div>
          </div>

          {/* Drop the negative margin; use normal spacing */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 dark:text-white bg-clip-text transition-all duration-500 hover:scale-105 transform">
            <span className="inline-block hover:animate-bounce cursor-default">Portfoli-YOU</span>
          </h1>

          <div className="mb-6 lg:mb-8 space-y-2 lg:space-y-4">
            <p className="text-lg md:text-xl lg:text-2xl text-slate-600 dark:text-gray-300 leading-relaxed italic transition-colors duration-300 hover:text-orange-500">
              A Portfolio for you, by you.
            </p>
            <p className="text-sm md:text-base lg:text-lg text-slate-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed transition-colors duration-300">
              Build stunning, personalized digital portfolios that showcase your unique talents and achievements. No coding experience required.
            </p>
          </div>

          <div className="mb-6 lg:mb-8">
            <div className="inline-block bg-white/80 dark:bg-[#222222] backdrop-blur-sm rounded-xl border border-orange-500/50 hover:border-orange-500/80 dark:border-orange-600/50 dark:hover:border-orange-600/70 px-4 lg:px-8 py-3 lg:py-4 shadow-xl shadow-orange-500/20 dark:shadow-cyan-500/10 transition-all duration-500 ease-out hover:scale-105 hover:rotate-1 active:scale-95 group">
              <p className="text-xl lg:text-2xl font-semibold text-orange-500 mb-1 lg:mb-2 group-hover:animate-pulse">Coming Soon</p>
              <p className="text-slate-600 dark:text-gray-400 text-sm lg:text-base transition-colors duration-300">
                View the progress anytime in the GitHub Repositories!<br />
                <i>Check out the <a href="/about" className="text-cyan-500 hover:text-cyan-400 transition-colors duration-200 hover:underline decoration-2 underline-offset-2">FAQs</a> for more information</i>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
