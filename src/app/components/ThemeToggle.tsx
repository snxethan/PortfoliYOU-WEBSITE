"use client"

import { useTheme } from '@/app/contexts/ThemeContext'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  let theme: 'dark' | 'light' = 'dark'
  let toggleTheme = () => {}

  try {
    const themeContext = useTheme()
    theme = themeContext.theme
    toggleTheme = themeContext.toggleTheme
  } catch {
    // Fallback when outside ThemeProvider
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="h-8 w-16 bg-slate-300 dark:bg-slate-700 rounded-full animate-pulse"></div>
    )
  }

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative inline-flex h-8 w-16 items-center rounded-full border-2 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95
        ${theme === 'dark' 
          ? 'bg-slate-800 border-cyan-500/50 shadow-lg shadow-cyan-500/20' 
          : 'bg-orange-100 border-orange-500/50 shadow-lg shadow-orange-500/20'
        }
      `}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {/* Toggle circle */}
      <span
        className={`
          inline-block h-6 w-6 transform rounded-full transition-all duration-300 ease-in-out flex items-center justify-center text-xs font-bold
          ${theme === 'dark'
            ? 'translate-x-1 bg-cyan-500 text-slate-800 shadow-lg shadow-cyan-500/30'
            : 'translate-x-8 bg-orange-500 text-white shadow-lg shadow-orange-500/30'
          }
        `}
      >
        {theme === 'dark' ? '🌙' : '☀️'}
      </span>
      
      {/* Text labels */}
      <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
        <span 
          className={`text-xs font-semibold transition-opacity duration-300 ${
            theme === 'dark' ? 'opacity-0' : 'opacity-100 text-slate-700'
          }`}
        >
          Dark
        </span>
        <span 
          className={`text-xs font-semibold transition-opacity duration-300 ${
            theme === 'dark' ? 'opacity-100 text-cyan-300' : 'opacity-0'
          }`}
        >
          Light
        </span>
      </div>
    </button>
  )
}