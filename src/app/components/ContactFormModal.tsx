"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import toast from 'react-hot-toast'
import { ANIMATION_DURATION } from './constants'

interface Props {
  onClose: () => void
}

export default function ContactFormModal({ onClose }: Props) {
  const [isAnimatingOut, setIsAnimatingOut] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [mounted, setMounted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      })

      const data = await response.json().catch(() => ({}))

      if (response.ok) {
        toast.success("Message sent successfully!")
        onClose()
      } else {
        toast.error(data.message || "Something went wrong.")
      }
    } catch (err) {
      console.error(err)
      toast.error("Network error. Please try again later.")
    }
  }

  useEffect(() => {
    setMounted(true)
    document.body.classList.add("overflow-hidden")
    return () => document.body.classList.remove("overflow-hidden")
  }, [])

  const close = () => {
    setIsAnimatingOut(true)
    setTimeout(onClose, ANIMATION_DURATION.MODAL_CLOSE)
  }

  const modalContent = (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={close}
    >
      <div
        className={`rounded-xl border p-6 max-w-md w-full relative ${
          isAnimatingOut ? "animate-elastic-out" : "animate-elastic-in"
        }`}
        style={{
          backgroundColor: 'var(--surface)',
          borderColor: 'var(--border)',
          color: 'var(--fg)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={close}
          className="absolute top-1 right-3 text-3xl transition-colors"
          style={{
            color: 'var(--fg-muted)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--accent)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--fg-muted)'
          }}
        >
          &times;
        </button>

        <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--fg-strong)' }}>Contact Me</h3>
      
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            required
            placeholder="Your Name"
            className="w-full p-2 rounded border focus:outline-none focus:ring-2 transition-all"
            style={{
              backgroundColor: 'var(--muted)',
              borderColor: 'var(--border)',
              color: 'var(--fg)',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent)'
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)'
            }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            required
            placeholder="Your Email"
            className="w-full p-2 rounded border focus:outline-none focus:ring-2 transition-all"
            style={{
              backgroundColor: 'var(--muted)',
              borderColor: 'var(--border)',
              color: 'var(--fg)',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent)'
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)'
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <textarea
            required
            placeholder="Your Message"
            className="w-full p-2 rounded border h-32 focus:outline-none focus:ring-2 transition-all"
            style={{
              backgroundColor: 'var(--muted)',
              borderColor: 'var(--border)',
              color: 'var(--fg)',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent)'
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)'
            }}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type="submit"
            className="w-full py-2 rounded transition-all duration-200 text-black font-medium"
            style={{
              backgroundColor: 'var(--accent)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--accent-600)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--accent)'
            }}
          >
            Send Message
          </button>
        </form>
        
        <div className="mt-4 pt-4 border-t text-center" style={{ borderColor: 'var(--border)' }}>
          <p className="text-sm" style={{ color: 'var(--fg-muted)' }}>
            Or email me directly:{" "}
            <a 
              href="mailto:snxethan@gmail.com" 
              className="underline transition-colors"
              style={{
                color: 'var(--accent)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--accent-600)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--accent)'
              }}
            >
              snxethan@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )

  // Only render if mounted (client-side) to avoid hydration issues
  if (!mounted) return null

  // Use portal to render the modal at the document root level
  return createPortal(modalContent, document.body)
}
