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
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all duration-300"
        style={{
          backgroundColor: 'var(--surface)',
          borderColor: 'var(--accent)',
          color: 'var(--fg)',
          opacity: 0,
        }}
        aria-label="Theme toggle"
        disabled
      >
        <FaSun className="text-sm" style={{ color: 'var(--accent)' }} />
        <span className="text-sm font-medium">Light</span>
      </button>
    )
  }

  return (
    <button
      onClick={toggleTheme}
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all duration-300 hover:scale-105 active:scale-95"
      style={{
        backgroundColor: 'var(--surface)',
        borderColor: 'var(--accent)',
        color: 'var(--fg)',
      }}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        <>
          <FaSun className="text-sm" style={{ color: 'var(--accent)' }} />
          <span className="text-sm font-medium">Light</span>
        </>
      ) : (
        <>
          <FaMoon className="text-sm" style={{ color: 'var(--accent)' }} />
          <span className="text-sm font-medium">Dark</span>
        </>
      )}
    </button>
  )
}
