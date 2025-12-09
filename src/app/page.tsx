"use client"

import Image from "next/image"
import Footer from "./components/pages/Footer"
import Navbar from "./components/pages/Navbar"
import Notice from "./components/pages/Notice"
import SkeletonLoader from "./components/SkeletonLoader"
import { useLoadingDelay } from "./components/hooks/useLoadingDelay"

export default function PortfoliYouPage() {
  const loading = useLoadingDelay()

  if (loading) {
    return <SkeletonLoader />
  }

  return (
    <div 
      className="min-h-dvh flex flex-col font-sans transition-all duration-300"
      style={{
        background: 'linear-gradient(to bottom, var(--bg), var(--muted), var(--surface))',
        color: 'var(--fg)',
      }}
    >
      <Navbar />

      <main className="flex-1 w-full px-6 pt-16 pb-8">
        <Notice />

        <div className="w-full max-w-4xl mx-auto text-center animate-fade-in-up">
          <div className="mb-4">
            <div className="w-48 h-48 lg:w-64 lg:h-64 mx-auto rounded-full overflow-hidden shadow-lg transition-transform duration-300 hover:scale-110 hover:rotate-3">
              <Image
                src="/images/icon/portfoliyou.png"
                alt="Portfoli-YOU Logo"
                width={1024}
                height={1024}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>

          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            style={{
              color: 'var(--fg)',
              fontFamily: 'var(--heading-font)',
            }}
          >
            Portfoli-<span style={{ color: 'var(--accent)' }}>YOU</span>
          </h1>

          <div className="mb-6 lg:mb-8 space-y-2 lg:space-y-4">
            <p 
              className="text-lg md:text-xl lg:text-2xl leading-relaxed italic"
              style={{ color: 'var(--fg)' }}
            >
              A Portfolio for you, by you.
            </p>
            <p 
              className="text-sm md:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed"
              style={{ color: 'var(--fg-muted)' }}
            >
              Build stunning, personalized digital portfolios that showcase your unique talents and achievements. No coding experience required.
            </p>
          </div>

          <div className="mb-6 lg:mb-8">
            <div 
              className="inline-block rounded-xl px-4 lg:px-8 py-3 lg:py-4 shadow-lg transition-all duration-300 ease-out hover:scale-105 hover:rotate-1 active:scale-95 animate-pulse-glow border"
              style={{
                backgroundColor: 'var(--surface)',
                borderColor: 'var(--accent)',
              }}
            >
              <p 
                className="text-xl lg:text-2xl font-semibold mb-1 lg:mb-2"
                style={{ color: 'var(--accent)' }}
              >
                Coming Soon
              </p>
              <p 
                className="text-sm lg:text-base"
                style={{ color: 'var(--fg-muted)' }}
              >
                View the progress anytime in the GitHub Repositories!<br />
                <i>Check out the <a href="/faqs" className="link-accent hover:underline">FAQs</a> for more information</i>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
