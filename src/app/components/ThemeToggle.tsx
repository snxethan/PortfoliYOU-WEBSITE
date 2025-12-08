"use client"

import { useTheme } from './ThemeProvider'
import { FaSun, FaMoon } from 'react-icons/fa'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

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
