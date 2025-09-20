"use client"

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { FiSun, FiMoon } from 'react-icons/fi'

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-16 h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
    )
  }

  const isDark = theme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={[
        "relative flex items-center justify-between w-16 h-8 rounded-full transition-all duration-300",
        "bg-gradient-to-r border-2 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2",
        isDark 
          ? "from-blue-600 to-cyan-600 border-cyan-400 focus:ring-cyan-400" 
          : "from-orange-400 to-orange-600 border-orange-300 focus:ring-orange-400",
        "shadow-lg hover:shadow-xl"
      ].join(" ")}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {/* Sliding indicator */}
      <div
        className={[
          "absolute w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 flex items-center justify-center",
          isDark ? "transform translate-x-8" : "transform translate-x-1"
        ].join(" ")}
      >
        {isDark ? (
          <FiMoon className="w-3 h-3 text-blue-600" />
        ) : (
          <FiSun className="w-3 h-3 text-orange-600" />
        )}
      </div>

      {/* Background text labels */}
      <span className="absolute left-2 text-xs font-medium text-white opacity-70">
        {!isDark && "Light"}
      </span>
      <span className="absolute right-2 text-xs font-medium text-white opacity-70">
        {isDark && "Dark"}
      </span>
    </button>
  )
}