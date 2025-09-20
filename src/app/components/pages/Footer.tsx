"use client"
import React, { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import TooltipWrapper from "../ToolTipWrapper"
import SecurityPolicyModal from "../SecurityPolicyModal"

const Footer = () => {
  const [showSecurityPolicy, setShowSecurityPolicy] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <footer className="bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 w-full py-6 px-6">
        <div className="max-w-8xl mx-auto flex flex-col items-center gap-6">
          <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-4 text-sm">
            {/* Left: Security Policy Skeleton */}
            <div className="order-3 lg:order-1 mt-2 lg:mt-0">
              <div className="h-5 w-24 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
            </div>

            {/* Center: Logo & Name Skeleton */}
            <div className="order-1 lg:order-2 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse" />
              <div className="h-5 w-40 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
            </div>

            {/* Right: Domain Links Skeleton */}
            <div className="order-2 lg:order-3">
              <div className="footer-links flex flex-col sm:flex-row items-center gap-2">
                <div className="flex gap-4">
                  <div className="h-5 w-16 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
                  <div className="h-5 w-24 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
                </div>
                <span className="hidden sm:block text-gray-400 dark:text-gray-600">|</span>
                <div className="h-5 w-32 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    )
  }
  return (
    <footer className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black text-gray-600 dark:text-gray-400 w-full py-6 px-6 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-8xl mx-auto flex flex-col items-center gap-6">
        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-4 text-sm">
          {/* Left: Security Policy */}
          <div className="order-3 lg:order-1 mt-2 lg:mt-0">
            <TooltipWrapper label="View Security Policy">
              <button 
                onClick={() => setShowSecurityPolicy(true)}
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors duration-200 hover:scale-105"
              >
                Security Policy
              </button>
            </TooltipWrapper>
          </div>

          {/* Center: Logo & Name */}
          <div className="order-1 lg:order-2 flex items-center gap-2">
            <div className="relative group">
              <Image
                src="https://www.snxethan.dev/images/avatar/snex.png"
                alt="Ethan Townsend"
                width={32}
                height={32}
                className="rounded-full transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-orange-400 opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
            </div>
            <TooltipWrapper label="Social Page">
              <a 
                href="https://ethantownsend.dev" 
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200 hover:scale-105"
              >
                Ethan Townsend &copy; {new Date().getFullYear()}
              </a>
            </TooltipWrapper>
          </div>

          {/* Right: Domain Links */}
          <div className="order-2 lg:order-3">
            <div className="footer-links flex flex-col sm:flex-row items-center gap-2">
              <TooltipWrapper label="Portfolio">
                <div className="flex gap-4">
                  <Link 
                    href="https://snex.dev" 
                    className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-200 hover:scale-105 hover:font-medium"
                  >
                    snex.dev    
                  </Link>
                  <Link 
                    href="https://snxethan.dev" 
                    className="hover:text-orange-600 dark:hover:text-orange-400 transition-all duration-200 hover:scale-105 hover:font-medium"
                  >
                    snxethan.dev
                  </Link>
                </div>
              </TooltipWrapper>
              <span className="hidden sm:block text-gray-400 dark:text-gray-600">|</span>
              <TooltipWrapper label="Social Page">
                <Link 
                  href="https://ethantownsend.dev" 
                  className="hover:text-orange-600 dark:hover:text-orange-400 transition-all duration-200 hover:scale-105 hover:font-medium"
                >
                  ethantownsend.dev
                </Link>
              </TooltipWrapper>
            </div>
          </div>
        </div>
      </div>
      {showSecurityPolicy && <SecurityPolicyModal onClose={() => setShowSecurityPolicy(false)} />}
    </footer>
  )
}

export default Footer