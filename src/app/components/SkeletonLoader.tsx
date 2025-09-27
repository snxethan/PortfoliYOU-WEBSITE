import React from "react";
import Navbar from "./pages/Navbar";
import Footer from "./pages/Footer";

const SkeletonLoader = () => {
  return (
    <div className="min-h-dvh flex flex-col bg-gradient-to-b from-[#1a1a1a] via-[#121212] to-[#0d0d0d] text-white font-sans">
      <Navbar />
      <main className="flex-1 w-full px-6 py-6 pt-20">
        <div className="w-full max-w-2xl mx-auto text-center animate-pulse">
          <div className="w-32 h-32 mx-auto rounded-full bg-[#333333] mb-8 flex items-center justify-center">
            <div className="w-20 h-20 bg-[#444444] rounded" />
          </div>
          <div className="h-12 w-80 bg-[#333333] mx-auto rounded mb-6" />
          <div className="h-6 w-96 bg-[#333333] mx-auto rounded mb-4" />
          <div className="h-6 w-72 bg-[#333333] mx-auto rounded" />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SkeletonLoader;