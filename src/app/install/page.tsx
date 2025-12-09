"use client";

import Navbar from "../components/pages/Navbar";
import Footer from "../components/pages/Footer";
import { FaCheckCircle } from "react-icons/fa";
import Notice from "../components/pages/Notice";
import SkeletonLoader from "../components/SkeletonLoader";
import { useLoadingDelay } from "../components/hooks/useLoadingDelay";

export default function DownloadPage() {
  const loading = useLoadingDelay();
  
  if (loading) {
    return <SkeletonLoader />;
  }

  return (
    <div 
      className="flex flex-col min-h-screen font-sans transition-all duration-300"
      style={{
        background: 'linear-gradient(to bottom, var(--bg), var(--muted), var(--surface))',
        color: 'var(--fg)',
      }}
    >
      <Navbar />
      <Notice />
      <main className="flex-grow w-full flex flex-col items-center justify-center p-6 pt-20">
        <div className="text-center mb-12 max-w-4xl mx-auto animate-fade-in-up">
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            style={{
              color: 'var(--fg)',
              fontFamily: 'var(--heading-font)',
            }}
          >
            Download Portfoli-<span style={{ color: 'var(--accent)' }}>YOU</span>
          </h1>
          <p 
            className="text-sm md:text-base max-w-2xl mx-auto"
            style={{ color: 'var(--fg-muted)' }}
          >
            Get started with <b>Portfoli-YOU</b> by downloading the installer. Build your portfolio offline or sync with the cloud—your choice, your control.
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
              className="text-xl lg:text-2xl font-semibold text-center mb-1 lg:mb-2"
              style={{ color: 'var(--accent)' }}
            >
              Coming Soon
            </p>
            <p 
              className="text-sm lg:text-base"
              style={{ color: 'var(--fg-muted)' }}
            >
              View the progress anytime in the GitHub Repositories! <br/> 
              <i>Check out the <a href="/faqs" className="link-accent hover:underline">FAQs</a> for more information</i>
            </p>
          </div>
        </div>

        <div className="mt-12 max-w-4xl text-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <h3 
            className="text-lg md:text-xl font-semibold mb-4"
            style={{ 
              color: 'var(--fg)',
              fontFamily: 'var(--heading-font)',
            }}
          >
            Why Choose <b>Portfoli-YOU</b>?
          </h3>
          <ul className="space-y-4 text-sm md:text-base" style={{ color: 'var(--fg-muted)' }}>
            <li className="flex items-center gap-3 justify-center transition-all duration-200 hover:scale-105">
              <FaCheckCircle style={{ color: 'var(--accent)' }} /> Privacy-first: Your data stays on your device.
            </li>
            <li className="flex items-center gap-3 justify-center transition-all duration-200 hover:scale-105">
              <FaCheckCircle style={{ color: 'var(--accent)' }} /> Easy-to-use drag-and-drop interface.
            </li>
            <li className="flex items-center gap-3 justify-center transition-all duration-200 hover:scale-105">
              <FaCheckCircle style={{ color: 'var(--accent)' }} /> Fully customizable themes and widgets.
            </li>
            <li className="flex items-center gap-3 justify-center transition-all duration-200 hover:scale-105">
              <FaCheckCircle style={{ color: 'var(--accent)' }} /> Offline-first with optional cloud sync.
            </li>
          </ul>
          <br />
          <p style={{ color: 'var(--fg-muted)' }}>
            Learn more at <a href="/faqs" className="link-accent hover:underline">FAQs</a>.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}