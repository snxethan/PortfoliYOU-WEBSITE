"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { FaGithub, FaExclamationTriangle } from "react-icons/fa"
import Footer from "./components/pages/Footer"
import { useExternalLink } from "./components/ExternalLinkHandler"
import TooltipWrapper from "./components/ToolTipWrapper"
import Navbar from "./components/pages/Navbar"

export default function PortfoliYouPage() {
  const [loading, setLoading] = useState(true)
  const { handleExternalClick } = useExternalLink()
  const [disclaimerOpen, setDisclaimerOpen] = useState(false)

  useEffect(() => {
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow w-full flex items-center justify-center p-6 bg-gradient-to-b from-[#1a1a1a] via-[#121212] to-[#0d0d0d] text-white font-sans">
          <div className="w-full max-w-2xl mx-auto text-center animate-pulse">
            <div className="w-32 h-32 mx-auto rounded-full bg-[#333333] mb-8 flex items-center justify-center">
              <div className="w-20 h-20 bg-[#444444] rounded"></div>
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
    <div className="flex flex-col  lg:min-h-screen overflow-hidden pt-11 lg:pt-5">
          <Navbar />
          {/* Spacer for Navbar height */}
          <div className="w-full"></div>
          {/* Disclaimer: compact → expands in place, sticky/fixed */}
          <div
            className="fixed z-50"
            style={{
              // Offset for navbar height (2.5rem) plus safe area
              top: "calc(env(safe-area-inset-top, 0px) + 3.5rem)",
              left: "calc(env(safe-area-inset-left, 0px) + 1rem)",
            }}
          >
            <button
              onClick={() => setDisclaimerOpen((v) => !v)}
              aria-expanded={disclaimerOpen}
              aria-controls="py-disclaimer"
              aria-label={disclaimerOpen ? "Hide Portfoli-YOU notice" : "Show Portfoli-YOU notice"}
              className={[
                // closed = tight chip; open = wide card
                "group flex transition-all duration-300 overflow-hidden text-left",
                disclaimerOpen
                  ? "items-start gap-3 w-[min(92vw,28rem)] p-4"
                  : "items-center justify-center w-11 h-11 p-4",
                // visuals
                "rounded-xl border bg-orange-500/15 border-orange-400/40 backdrop-blur-sm",
                "hover:bg-orange-500/25 hover:border-orange-400/60",
                disclaimerOpen ? "shadow-xl" : "shadow-none"
              ].join(" ")}
            >
              {/* Icon */}
              <FaExclamationTriangle
                className={[
                  "text-orange-300 flex-shrink-0 transition-transform duration-300",
                  disclaimerOpen ? "text-xl scale-105 mt-0.5" : "text-lg scale-100"
                ].join(" ")}
              />

              {/* Expanding content */}
              <div
                id="py-disclaimer"
                className={[
                  "grid transition-all duration-300 ease-in-out",
                  disclaimerOpen ? "grid-rows-[1fr] opacity-100 ml-1" : "grid-rows-[0fr] opacity-0 ml-0"
                ].join(" ")}
              >
                <div className="overflow-hidden">
                  <p className="text-sm leading-relaxed text-orange-100/90">
                    <strong className="text-orange-200">Notice:</strong>{" "} <br />
                    Portfoli-YOU is currently under development.
                    <br />
                    Check back soon for updates!
                  </p>

                  <div className="mt-2 flex items-center gap-3 text-[11px] text-orange-200/70">
                    <span className="inline-flex items-center rounded-md border border-orange-300/30 bg-orange-400/10 px-2 py-0.5">
                      snxethan  
                    </span>
                    <span>(September 7th, 2025)</span>
                  </div>
                </div>
              </div>
            </button>
          </div>



      <main className="flex-grow w-full flex items-center justify-center p-6 bg-gradient-to-b from-[#1a1a1a] via-[#121212] to-[#0d0d0d] text-white font-sans">
        <div className="w-full max-w-4xl mx-auto text-center h-full flex flex-col justify-center">
          {/* Coming Soon Animation with extra spacing */}
          <div className="mb-6 relative">
            <div className="w-24 h-24 lg:w-32 lg:h-32 mx-auto rounded-full overflow-hidden animate-pulse">
              <Image
                src="/images/icon/portfoliyou.png"
                alt="Portfoli-YOU Logo"
                width={128}
                height={128}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <div className="absolute inset-0 w-24 h-24 lg:w-32 lg:h-32 mx-auto rounded-full border-4 border-red-500 opacity-50 animate-ping"></div>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 lg:mb-6 bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
            Portfoli-YOU
          </h1>
          
          <div className="mb-6 lg:mb-8 space-y-2 lg:space-y-4">
            <p className="text-lg md:text-xl lg:text-2xl text-gray-300 leading-relaxed italic">
              A Portfolio for you, by you.
            </p>
            <p className="text-sm md:text-base lg:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Build stunning, personalized digital portfolios that showcase your unique talents and achievements. No coding experience required.
            </p>
          </div>

          <div className="mb-6 lg:mb-8">
            <div className="inline-block bg-[#222222] rounded-xl border border-red-600/50 hover:border-red-600/70 px-4 lg:px-8 py-3 lg:py-4 shadow-lg transition-transform duration-300 ease-out hover:scale-[1.03] active:scale-95">
              <p className="text-xl lg:text-2xl font-semibold text-red-500 mb-1 lg:mb-2">Coming Soon</p>
              <p className="text-gray-400 text-sm lg:text-base">View the progress anytime in the GitHub Repositories!</p>
            </div>
          </div>

          {/* GitHub Repository Buttons */}
          <div className="mb-6 lg:mb-8 flex justify-center gap-4">
            <TooltipWrapper label="https://github.com/snxethan/PortfoliYOU-APP">
              <button
                onClick={() => handleExternalClick("https://github.com/snxethan/PortfoliYOU-APP", true)}
                className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white rounded-lg gap-2 transition-all duration-200 ease-out hover:scale-105 active:scale-95 text-sm lg:text-base"
              >
                <FaGithub />
                App Repository
              </button>
            </TooltipWrapper>
             <TooltipWrapper label="https://github.com/snxethan/PortfoliYOU-WEBSITE">
              <button
                onClick={() => handleExternalClick("https://github.com/snxethan/PortfoliYOU-WEBSITE", true)}
                className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white rounded-lg gap-2 transition-all duration-200 ease-out hover:scale-105 active:scale-95 text-sm lg:text-base"
              >
                <FaGithub />
                Website Repository
              </button>
            </TooltipWrapper>
          </div>

          {/* Features Preview - Scaled down and condensed */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            <div className="bg-[#222222] rounded-xl border border-[#333333] hover:border-red-600/50 p-4 lg:p-6 transition-transform duration-300 ease-out hover:scale-[1.03] active:scale-95">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-red-600 to-red-500 rounded-lg mx-auto mb-3 lg:mb-4 flex items-center justify-center">
                <span className="text-white font-bold text-lg lg:text-xl">🎨</span>
              </div>
              <h3 className="text-base lg:text-lg font-semibold text-white mb-2">Customizable Designs</h3>
              <p className="text-gray-400 text-xs lg:text-sm">Choose from carefully crafted widgets and modules</p>
            </div>

            <div className="bg-[#222222] rounded-xl border border-[#333333] hover:border-red-600/50 p-4 lg:p-6 transition-transform duration-300 ease-out hover:scale-[1.03] active:scale-95">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-red-600 to-red-500 rounded-lg mx-auto mb-3 lg:mb-4 flex items-center justify-center">
                <span className="text-white font-bold text-lg lg:text-xl">⚡</span>
              </div>
              <h3 className="text-base lg:text-lg font-semibold text-white mb-2">Easy to Use</h3>
              <p className="text-gray-400 text-xs lg:text-sm">Design your digital portfolio in minutes, not hours</p>
            </div>

            <div className="bg-[#222222] rounded-xl border border-[#333333] hover:border-red-600/50 p-4 lg:p-6 transition-transform duration-300 ease-out hover:scale-[1.03] active:scale-95">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-red-600 to-red-500 rounded-lg mx-auto mb-3 lg:mb-4 flex items-center justify-center">
                <span className="text-white font-bold text-lg lg:text-xl">🚀</span>
              </div>
              <h3 className="text-base lg:text-lg font-semibold text-white mb-2">Share Anywhere</h3>
              <p className="text-gray-400 text-xs lg:text-sm">Deploy and share your portfolio anywhere with one click</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
