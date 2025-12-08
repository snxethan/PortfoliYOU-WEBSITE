import React from "react";
import Navbar from "./pages/Navbar";
import Footer from "./pages/Footer";

const SkeletonLoader = () => {
  return (
    <div 
      className="min-h-dvh flex flex-col font-sans transition-all duration-300"
      style={{
        background: 'linear-gradient(to bottom, var(--bg), var(--muted), var(--surface))',
        color: 'var(--fg)',
      }}
    >
      <Navbar />
      <main className="flex-1 w-full px-6 py-6 pt-20">
        <div className="w-full max-w-2xl mx-auto text-center animate-pulse">
          <div 
            className="w-32 h-32 mx-auto rounded-full mb-8 flex items-center justify-center"
            style={{
              backgroundColor: 'var(--surface)',
            }}
          >
            <div 
              className="w-20 h-20 rounded"
              style={{
                backgroundColor: 'var(--muted)',
              }}
            />
          </div>
          <div 
            className="h-12 w-80 mx-auto rounded mb-6"
            style={{
              backgroundColor: 'var(--surface)',
            }}
          />
          <div 
            className="h-6 w-96 mx-auto rounded mb-4"
            style={{
              backgroundColor: 'var(--surface)',
            }}
          />
          <div 
            className="h-6 w-72 mx-auto rounded"
            style={{
              backgroundColor: 'var(--surface)',
            }}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SkeletonLoader;