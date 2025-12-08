"use client"

import { useTheme } from './ThemeProvider'
import { FaSun, FaMoon } from 'react-icons/fa'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Return a placeholder that matches the initial state to prevent layout shift
    return (
      <button
        className="inline-flex items-center justify-center w-8 h-8 rounded-lg border transition-all duration-300"
        style={{
          backgroundColor: 'var(--surface)',
          borderColor: 'var(--accent)',
          color: 'var(--accent)',
          opacity: 0,
        }}
        aria-label="Theme toggle"
        disabled
      >
        <FaSun className="text-base" />
      </button>
    )
  }

  return (
    <button
      onClick={toggleTheme}
      className="inline-flex items-center justify-center w-8 h-8 rounded-lg border transition-all duration-300 hover:scale-105 active:scale-95"
      style={{
        backgroundColor: 'var(--surface)',
        borderColor: 'var(--accent)',
        color: 'var(--accent)',
      }}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        <FaSun className="text-base" />
      ) : (
        <FaMoon className="text-base" />
      )}
    </button>
  )
}
