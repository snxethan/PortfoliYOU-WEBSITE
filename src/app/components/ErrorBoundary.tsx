"use client"

import React from 'react'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error?: Error; reset: () => void }>
}

const DefaultErrorFallback = ({ error, reset }: { error?: Error; reset: () => void }) => (
  <div className="min-h-screen flex items-center justify-center bg-[#1a1a1a] text-white">
    <div className="text-center p-8">
      <h2 className="text-2xl font-bold mb-4 text-red-500">Something went wrong</h2>
      <p className="text-gray-400 mb-6">
        {error?.message || 'An unexpected error occurred'}
      </p>
      <button
        onClick={reset}
        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
      >
        Try again
      </button>
    </div>
  </div>
)

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback
      return (
        <FallbackComponent
          error={this.state.error}
          reset={() => this.setState({ hasError: false, error: undefined })}
        />
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary