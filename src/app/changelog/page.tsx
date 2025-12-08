"use client";

import Navbar from "../components/pages/Navbar";
import Notice from "../components/pages/Notice";
import SkeletonLoader from "../components/SkeletonLoader";
import { useLoadingDelay } from "../components/hooks/useLoadingDelay";
import Footer from "../components/pages/Footer";

export default function ChangelogPage() {
  const loading = useLoadingDelay();

  if (loading) {
    return <SkeletonLoader />;
  }

  return (
    <div>
      <div className="flex flex-col min-h-screen font-sans transition-all duration-300" style={{ backgroundColor: 'var(--bg)', color: 'var(--fg)' }}>
        <Notice />
        <Navbar />

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center px-4 py-20">
          <div 
            className="w-full max-w-2xl p-12 rounded-2xl border text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            style={{
              backgroundColor: 'var(--surface)',
              borderColor: 'var(--border)',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
            }}
          >
            <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--fg)' }}>
              Changelog
            </h1>
            <p className="text-lg mb-6" style={{ color: 'var(--fg-muted)' }}>
              Stay tuned for updates and changes to Portfoli-YOU.
            </p>
            <div className="inline-block px-6 py-3 rounded-lg font-semibold" style={{ backgroundColor: 'var(--accent)', color: '#000' }}>
              Coming Soon
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
