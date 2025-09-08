"use client";

import Navbar from "../components/pages/Navbar";
import Notice from "../components/pages/Notice";

export default function AboutPage() {
    return (
          <>
                <div className="flex flex-col  lg:min-h-screen overflow-hidden pt-11 lg:pt-5">
                      <Navbar />
                  <main className="flex-grow w-full flex items-center justify-center p-6 bg-gradient-to-b from-[#1a1a1a] via-[#121212] to-[#0d0d0d] text-white font-sans">
                   <Notice />
                     <div className="flex flex-col items-center justify-center mt-12">
                         <div className="bg-[#222222] rounded-xl border border-[#333333] hover:border-red-600/50 p-6 lg:p-8 transition-transform duration-300 ease-out hover:scale-[1.03] active:scale-95 w-full max-w-md text-center shadow-xl">
                             <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-red-600 to-red-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                                 <span className="text-white font-bold text-xl lg:text-2xl">🚧</span>
                             </div>
                             <h2 className="text-lg lg:text-xl font-bold text-white mb-2">UNDER CONSTRUCTION</h2>
                             <p className="text-gray-400 text-lg font-bold mb-2">Check back soon!</p>
                             <button
                                 onClick={() => window.location.href = '/'}
                                 className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white rounded-lg gap-2 transition-all duration-200 ease-out hover:scale-105 active:scale-95 text-lg font-bold mt-4"
                             >
                                 View Portfoli-YOU
                             </button>
                         </div>
                     </div>
                   </main>
                   </div>
           </>
    );
}