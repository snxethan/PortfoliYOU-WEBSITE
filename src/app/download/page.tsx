"use client";

import Navbar from "../components/pages/Navbar";
import Footer from "../components/pages/Footer";
import { FaCheckCircle } from "react-icons/fa";
import Notice from "../components/pages/Notice";
import { useEffect, useState } from "react";

export default function DownloadPage() {


        const [loading, setLoading] = useState(true);
    
        useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 500);
        return () => clearTimeout(timer);
        }, []);
        
        if (loading) {
            return (
                <div className="flex flex-col min-h-screen">
                <main className="flex-grow w-full flex flex-col items-center justify-center p-6 pt-24">
                    <div className="w-full max-w-2xl mx-auto text-center animate-pulse">
                    <div className="h-12 w-80 bg-[#333333] mx-auto rounded mb-6" />
                    <div className="h-6 w-96 bg-[#333333] mx-auto rounded mb-4" />
                    <div className="h-6 w-72 bg-[#333333] mx-auto rounded" />
                    </div>
                </main>
                <Footer />
                </div>
            );
            }
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#1a1a1a] via-[#121212] to-[#0d0d0d] text-white font-sans">
            <Navbar />
            <Notice />
            <main className="flex-grow w-full flex flex-col items-center justify-center p-6 pt-20">
                <div className="text-center mb-12 max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white bg-clip-text text-transparent">
                    Download Portfoli-YOU
                    </h1>
                    <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
                        Get started with <b>Portfoli-YOU</b> by downloading the installer. Build your portfolio offline or sync with the cloud—your choice, your control.
                    </p>
                </div>

                {/* <div className="bg-[#222222] rounded-xl border border-[#333333] hover:border-red-600/50 p-6 md:p-8 transition-transform duration-300 ease-out hover:scale-[1.03] active:scale-95 w-full max-w-lg text-center shadow-xl">
                    <div className="w-24 h-24 bg-gradient-to-r from-red-600 to-red-500 rounded-lg mx-auto mb-6 flex items-center justify-center">
                        <img src="/images/icon/portfoliyou.png" alt="PortfoliYOU Logo" className="w-20 h-20" />
                    </div>
                    <h2 className="text-xl font-semibold text-white mb-4"><i>A Portfolio for you, by you.</i></h2>
                    <TooltipWrapper label="Installer coming soon! Check out the FAQs for more information.">
                    <button
                        onClick={() => window.location.href = '/installer'}
                        disabled
                        className="inline-flex items-center justify-center px-6 py-3 cursor-not-allowed bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white rounded-lg gap-2 transition-all duration-200 ease-out hover:scale-105 active:scale-95 text-base font-bold"
                    >
                        Download Portfoli-YOU.
                    </button>
                    </TooltipWrapper>
                </div> */}

                <div className="mb-6 lg:mb-8">
                    <div className="inline-block bg-[#222222] rounded-xl border border-red-600/50 hover:border-red-600/70 px-4 lg:px-8 py-3 lg:py-4 shadow-lg transition-transform duration-300 ease-out hover:scale-[1.03] active:scale-95">
                        <p className="text-xl lg:text-2xl font-semibold text-center text-red-500 mb-1 lg:mb-2">Coming Soon</p>
                        <p className="text-gray-400 text-sm lg:text-base">View the progress anytime in the GitHub Repositories! <br/> <i>Check out the FAQs for more information</i></p>
                    </div>
                </div>

                <div className="mt-12 max-w-4xl text-center">
                    <h3 className="text-lg md:text-xl font-semibold text-white mb-4">Why Choose <b>Portfoli-YOU</b>?</h3>
                    <ul className="space-y-4 text-gray-400 text-sm md:text-base">
                        <li className="flex items-center gap-3">
                            <FaCheckCircle className="text-red-500" /> Privacy-first: Your data stays on your device.
                        </li>
                        <li className="flex items-center gap-3">
                            <FaCheckCircle className="text-red-500" /> Easy-to-use drag-and-drop interface.
                        </li>
                        <li className="flex items-center gap-3">
                            <FaCheckCircle className="text-red-500" /> Fully customizable themes and widgets.
                        </li>
                        <li className="flex items-center gap-3">
                            <FaCheckCircle className="text-red-500" /> Offline-first with optional cloud sync.
                        </li>
                    </ul>
                    <br />
                    Learn more at <a href="/about" className="text-red-500 hover:underline">FAQs</a>.
                </div>
            </main>
            <Footer />
        </div>
    );
}