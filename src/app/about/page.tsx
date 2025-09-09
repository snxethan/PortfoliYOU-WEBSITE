"use client";

import Navbar from "../components/pages/Navbar";
import Notice from "../components/pages/Notice";
import TooltipWrapper from "../components/ToolTipWrapper";
import {
  FaGithub,
  FaPalette,
  FaBolt,
  FaRocket,
  FaStar,
  FaLock,
  FaCloud,
  FaQuoteLeft,
  FaChevronDown,
  FaFile,
  FaExclamationTriangle,
} from "react-icons/fa";
import Image from "next/image";
import { useRef, useState, useCallback, useEffect } from "react";
import Footer from "../components/pages/Footer";
import { useExternalLink } from "../components/ExternalLinkHandler";

const SITE_NAVBAR_OFFSET = 96; 

const sectionIcons: { [key: string]: typeof FaStar } = {
  what: FaBolt,
  how: FaPalette,
  why: FaStar,
  features: FaLock,
  development: FaGithub,
};



const sections = [
        { id: "what", title: "What is Portfoli-YOU?" },
        { id: "why", title: "Why Portfoli-YOU?" },
        { id: "features", title: "Core Features" },
        { id: "how", title: "How to Use" },
        { id: "development", title: "Development" },
];

export default function AboutPage() {

    // Default expand the first section
    const [expanded, setExpanded] = useState<string | null>(sections[0].id);
    const { handleExternalClick } = useExternalLink();

    // map of refs for precise scroll w/ offset
    const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>(
        sections.reduce((acc: { [key: string]: HTMLElement | null }, s) => {
        acc[s.id] = null;
        return acc;
        }, {})
    );

    const scrollToSection = useCallback((id: string) => {
        const el = sectionRefs.current[id];
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const absoluteTop = rect.top + window.scrollY;
        const y = Math.max(absoluteTop - SITE_NAVBAR_OFFSET - 16, 0); // 16px extra breathing room
        window.scrollTo({ top: y, behavior: "smooth" });
    }, []);

    const handleExpand = useCallback(
        (id: string) => {
        setExpanded(id);
        // keep most info visible; expand just increases content density
        scrollToSection(id);
        },
        [scrollToSection]
    );

    const handleNavClick = (id: string) => handleExpand(id);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
    }, []);
    
    if (loading) {
        return (
            <div className="flex flex-col min-h-screen">
            <main className="flex-grow w-full flex items-center justify-center p-6 bg-gradient-to-b from-[#1a1a1a] via-[#121212] to-[#0d0d0d] text-white font-sans">
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
        <div>
        <div className="flex min-h-screen bg-gradient-to-b from-[#1a1a1a] via-[#121212] to-[#0d0d0d] text-white font-sans">
            <Navbar />
            
            <main className="flex-grow w-full flex">
            {/* Left-side Navigator (centered vertically) */}
            
            <aside className="hidden lg:flex sticky top-[64px] h-[calc(100vh-64px)] min-w-[260px] max-w-[300px] border-r border-[#333] bg-[#181818]/70 pl-2">
                <nav className="m-auto flex w-full max-w-[260px] flex-col items-stretch gap-3 px-4 py-4">
                {sections.map((s) => {
                    const Icon = sectionIcons[s.id];
                    const isActive = expanded === s.id;
                    return (
                    <button
                        key={s.id}
                        onClick={() => handleNavClick(s.id)}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-left font-semibold transition-all duration-200 outline-none ring-0 focus-visible:ring-2 focus-visible:ring-red-500/60 ${
                        isActive
                            ? "bg-red-700/40 text-red-500"
                            : "text-gray-400 hover:text-red-500 hover:bg-red-700/30"
                        }`}
                        aria-current={isActive ? "true" : undefined}
                    >
                        <Icon className="text-red-500 shrink-0" />
                        <span className="truncate">{s.title}</span>
                    </button>
                    );
                })}
                </nav>
            </aside>

            

            {/* Content column */}
            <div className="flex-1 min-w-0">
                <div className="mx-auto max-w-7xl px-4 md:px-25 pt-24 pb-16 ">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white bg-clip-text text-transparent">
                        About Portfoli-YOU
                        </h1>
                    </div>
                <Notice />

                {/* Sections */}
                <div className="space-y-10 space-x">
                    {sections.map((section) => (
                    <article
                        key={section.id}
                        ref={(el) => {
                        sectionRefs.current[section.id] = el;
                        }}
                        // ensure native anchor scrolls stop under fixed navbar
                        className="scroll-mt-28 md:scroll-mt-24"
                    >
                        {/* Section Header (click anywhere to expand) */}
                        <header>
                        <button
                            className="group w-full flex items-center justify-between gap-3 text-left"
                            onClick={() => handleExpand(section.id)}
                            aria-expanded={expanded === section.id}
                            aria-controls={`${section.id}-panel`}
                        >
                            <div className="flex items-center gap-3">
                            {(() => {
                                const Icon = sectionIcons[section.id];
                                return (
                                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-red-600 to-red-500">
                                    <Icon className="text-white" />
                                </span>
                                );
                            })()}
                            <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
                                {section.title}
                            </h2>
                            </div>
                            <FaChevronDown
                            className={`transition-transform duration-200 ${
                                expanded === section.id ? "rotate-180" : "rotate-0"
                            }`}
                            aria-hidden
                            />
                        </button>

                        {/* Always-visible preview line under header */}
                        <p className="mt-2 text-sm md:text-base text-gray-400">
                            {section.id === "what" && <>A Portfolio for you, by you.</>}
                            {section.id === "how" && <>Download → Design → Deploy</>}
                            {section.id === "why" && <>Resumes earn seconds; portfolios earn minutes.</>}
                            {section.id === "features" && <>Themes, privacy-first data, easy sharing, and more.</>}
                            {section.id === "development" && <>Roadmap, Repos and Author</>}
                        </p>
                        </header>

                        {/* Expandable body */}
                        <div
                        id={`${section.id}-panel`}
                        className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${
                            expanded === section.id
                            ? "max-h-[1500px] opacity-100"
                            : "max-h-0 opacity-70"
                        }`}
                        >
                        <div className="pt-4">
                            {section.id === "what" && (
                            <>
                            <p className="text-gray-300 leading-relaxed">
                              <b>Portfoli-YOU</b> is a cutting-edge digital portfolio builder tailored for individuals of all skill levels. Whether you are a student, job seeker, freelancer, or seasoned professional, <b>Portfoli-YOU</b> empowers you to create a stunning, personalized website that authentically represents your unique identity.
                              <br />
                              <br />
                              Designed with simplicity and efficiency in mind, <b>Portfoli-YOU</b> offers an intuitive interface that allows you to build your portfolio entirely offline or leverage cloud services for seamless backup and deployment. Your privacy and control remain paramount, ensuring your data stays secure.
                              <br />
                              <br />
                              Backed by open-source principles and a transparent development process, <b>Portfoli-YOU</b> is more than just a tool—it’s a platform you can trust to showcase your skills and accomplishments. From drag-and-drop widgets to customizable themes, every feature is crafted to make portfolio creation effortless and impactful.
                              <br />
                              <br />
                              Originally conceived as a semester-long project at Neumont College of Computer Science, <b>Portfoli-YOU</b> has evolved into a fully realized capstone initiative. What began as a classroom concept has grown into a platform designed to simplify and elevate portfolio creation for individuals worldwide, regardless of technical expertise.
                              <br />
                              <br />
                            </p>
                            <div className="pl-2 pb-2">
                              <TooltipWrapper label="Capstone Proposal" url="/proposal/portfoliyou_capstone_proposal.pdf">
                                <a
                                  href="/proposal/portfoliyou_capstone_proposal.pdf"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-transform duration-200 ease-out hover:scale-105 active:scale-95"
                                >
                                  <FaFile /> View Project Proposal
                                </a>
                              </TooltipWrapper>
                            </div>                        
                            </>
                            )}

                            {section.id === "how" && (
                            <ol className="list-decimal list-inside text-gray-300 space-y-2">
                                <li>Download and run the installer.</li>
                                <li>Log in for cloud services or build fully offline.</li>
                                <li>Explore and create pages through the editor.</li>
                                <li>Drag-and-drop widgets themed around your content.</li>
                                <li>Preview live and tweak typography/layout.</li>
                                <li>Deploy to method of your choice, or export and take your project anywhere</li>
                            </ol>
                            )}

                           {section.id === "why" && (
                            <>
                                <blockquote className="bg-[#202020] border-l-4 border-red-500 p-4 md:p-6 rounded-xl text-gray-200 italic flex items-start gap-3">
                                <FaQuoteLeft className="text-red-400 mt-1 shrink-0" />
                                <span>
                                    &quot;On average, recruiters spend only 6–8 seconds scanning a resume, but that
                                    jumps to roughly 3 minutes when reviewing a portfolio website.&quot;
                                    (StandOut CV & UX Design CC)
                                </span>
                                </blockquote>

                                <p className="mt-3 text-gray-300">
                                The aim is simple: make portfolio building fast, easy, and intuitive for everyone.
                                <b> Portfoli-YOU</b> lowers the barrier so anyone can create a site that truly represents them.
                                </p>

                                <section aria-labelledby="why-local-first" className="mt-4 space-y-4 text-gray-300 leading-relaxed">
                                <p>
                                    <b>Portfoli-YOU</b> adopts a local-first approach to portfolio creation, prioritizing user
                                    privacy and control. Unlike many competitors that rely heavily on cloud-based systems,
                                    <b> Portfoli-YOU</b> ensures your data remains on your device unless you choose to sync or deploy it.

                                    <br />
                                    <br />
                                    <i>
                                    Plans for enhanced features (such as an online/mobile editor, AI assistant, and real-time collaboration) are currently planned;
                                    however, the core, local & user-first philosophy will remain unchanged. <b>Portfoli-YOU</b> will always strive to to help the user build a Portfolio for the user, by the user.
                                    </i>
                                </p>

                                <h5 className="text-white font-bold">Pros of Local-First:</h5>
                                <ul className="list-disc list-inside ml-4 space-y-2">
                                    <li><b>Privacy:</b> Your data stays on your machine, reducing exposure to potential breaches.</li>
                                    <li><b>Offline Access:</b> Build and edit your portfolio without needing an internet connection.</li>
                                    <li><b>Performance:</b> Local processing ensures faster load times and smoother interactions.</li>
                                </ul>

                                <h5 className="text-white font-bold">Cons of Local-First:</h5>
                                <ul className="list-disc list-inside ml-4 space-y-2">
                                    <li><b>Limited Collaboration:</b> Real-time team collaboration is not available without cloud integration.</li>
                                    <li><b>Manual Backups:</b> Users need to manage their own backups unless opting for cloud services.</li>
                                </ul>

                                <h5 className="text-white font-bold">Competitor Comparison:</h5>
                                <p>
                                    Many cloud-based portfolio builders offer features like real-time collaboration and automatic
                                    backups. However, these often come at the cost of user privacy and data ownership, or the requirements of templates & themes.
                                    <b> Portfoli-YOU</b> bridges this gap by providing optional cloud services for those who need them,
                                    while maintaining a strong local-first foundation and emphasizing creative freedom.
                                </p>

                                <p>
                                    Whether you value privacy, performance, or flexibility, <b>Portfoli-YOU</b> is designed to adapt
                                    to your needs, making it a versatile choice for portfolio creation.
                                </p>
                                </section>
                            </>
                            )}


                            {section.id === "features" && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 pl-2 pr-2 pb-2">
                                <div className="bg-[#222222] rounded-xl border border-[#333333] hover:border-red-600/50 p-6 transition-transform duration-300 ease-out hover:scale-[1.03] active:scale-95">
                                <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-red-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                                    <FaPalette className="text-white text-2xl" />
                                </div>
                                <h3 className="text-base font-semibold text-white mb-2">Customizable Designs</h3>
                                <p className="text-gray-400 text-sm">Carefully crafted & specialized widgets and modules. Tailor your portfolio to reflect your unique style.</p>
                                </div>
                                <div className="bg-[#222222] rounded-xl border border-[#333333] hover:border-red-600/50 p-6 transition-transform duration-300 ease-out hover:scale-[1.03] active:scale-95">
                                <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-red-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                                    <FaBolt className="text-white text-2xl" />
                                </div>
                                <h3 className="text-base font-semibold text-white mb-2">Easy to Use</h3>
                                <p className="text-gray-400 text-sm">Design digital pages with no experience required. Drag and drop your way to stunning layouts, all while maintaining full control over your design.</p>
                                </div>
                                <div className="bg-[#222222] rounded-xl border border-[#333333] hover:border-red-600/50 p-6 transition-transform duration-300 ease-out hover:scale-[1.03] active:scale-95">
                                <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-red-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                                    <FaRocket className="text-white text-2xl" />
                                </div>
                                <h3 className="text-base font-semibold text-white mb-2">Share Anywhere</h3>
                                <p className="text-gray-400 text-sm">One-click deployment to our provided deployment methods, or statically export to modify and take your project anywhere, on your own terms.</p>
                                </div>
                                <div className="bg-[#222222] rounded-xl border border-[#333333] hover:border-red-600/50 p-6 transition-transform duration-300 ease-out hover:scale-[1.03] active:scale-95">
                                <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-red-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                                    <FaStar className="text-white text-2xl" />
                                </div>
                                <h3 className="text-base font-semibold text-white mb-2">Your pages, your rules.</h3>
                                <p className="text-gray-400 text-sm">No limitations on design or functionality, use the editor and explore your pages visually, or export and modify the code directly.</p>
                                </div>
                                <div className="bg-[#222222] rounded-xl border border-[#333333] hover:border-red-600/50 p-6 transition-transform duration-300 ease-out hover:scale-[1.03] active:scale-95">
                                <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-red-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                                    <FaCloud className="text-white text-2xl" />
                                </div>
                                <h3 className="text-base font-semibold text-white mb-2">Cloud Sync</h3>
                                <p className="text-gray-400 text-sm">Sync across devices when you want. Optional sign in for cloud services, or stay offline and explore the same features for the same price: for free.</p>
                                </div>
                                 <div className="bg-[#222222] rounded-xl border border-[#333333] hover:border-red-600/50 p-6 transition-transform duration-300 ease-out hover:scale-[1.03] active:scale-95">
                                <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-red-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                                    <FaLock className="text-white text-2xl" />
                                </div>
                                <h3 className="text-base font-semibold text-white mb-2">Privacy</h3>
                                <p className="text-gray-400 text-sm">Local-first. Your data, your choice. Even when using the cloud services, your data remains private and secure. Your projects are backed up, but nothing is shared.</p>
                                </div>
                            </div>
                            )}

                            {section.id === "development" && (
                            <div className="space-y-8">
                                {/* Philosophy & Vision */}
                                <div>
                                <h3 className="text-base md:text-lg font-bold text-white mb-2">Project Development:</h3>
                                <p className="text-gray-300 text-sm md:text-base">
                                    <b>Portfoli-YOU</b> is designed to be as intuitive and user-friendly as possible. The goal is to make an open-source, privacy-first portfolio builder
                                    that anyone can use. I encourage you to try it out and provide feedback or contribute on GitHub if you&apos;re so willing.
                                    <br />
                                    <br />
                                    You can share any suggestions, feedback or personal portfolios made with <b>Portfoli-YOU</b> at: <a href="mailto:snxethan@gmail.com" className="text-red-500">snxethan@gmail.com</a>
                                </p>
                                </div>

                                {/* Roadmap */}
                                <div>
                                <h3 className="text-base md:text-lg font-bold text-white mb-2">Timeline & Roadmap:</h3>
                                <div className="flex flex-col items-start gap-4">
                                    <div className="flex items-center gap-3 text-white-300 text-sm md:text-base">
                                    <span className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-white font-bold animate-pulse">1</span>
                                    <span className="font-semibold">MVP Release</span>
                                    </div>
                                    <ul className="list-disc list-inside text-gray-400 ml-8 text-sm">
                                    <li>Core UI Builder</li>
                                    <li>Widget drag-and-drop System</li>
                                    <li>Local-first data storage</li>
                                    <li>Basic export & deploy options</li>
                                    <li>Cloud saving & syncing (opt-in)</li>
                                    </ul>
                                    <div className="flex items-center gap-3 text-gray-300 text-sm md:text-base">
                                    <span className="w-6 h-6 rounded-full bg-gray-500 flex items-center justify-center text-white font-bold animate-pulse">2</span>
                                    <span className="font-semibold">Full Release</span>
                                    </div>
                                    <ul className="list-disc list-inside text-gray-400 ml-8 text-sm">
                                    <li>Builder & Widget Optimization</li>
                                    <li>Expanded export & deploy options</li>
                                    <li>Optimized codebase</li>
                                    </ul>
                                    <div className="flex items-center gap-3 text-gray-300 text-sm md:text-base">
                                    <span className="w-6 h-6 rounded-full bg-gray-500 flex items-center justify-center text-white font-bold animate-pulse">3</span>
                                    <span className="font-semibold">Enhanced Cloud Support</span>
                                    </div>
                                    <ul className="list-disc list-inside text-gray-400 ml-8 text-sm">
                                    <li>Optimized Cloud storage, saving & syncing</li>
                                    <li>Online UI Builder</li>
                                    <li>Community Sharing (Themes & Widgets)</li>
                                    <li>Real-time Team collaboration (Teams & Shared Projects)</li>
                                    <li>Mobile app companion</li>
                                    </ul>
                                    <div className="flex items-center gap-3 text-gray-300 text-sm md:text-base">
                                    <span className="w-6 h-6 rounded-full bg-gray-500 flex items-center justify-center text-white font-bold animate-pulse">4</span>
                                    <span className="font-semibold">AI Assistant</span>
                                    </div>
                                    <ul className="list-disc list-inside text-gray-400 ml-8 text-sm">
                                    <li>Smart content suggestions</li>
                                    <li>Automated resume-to-portfolio conversion</li>
                                    <li>Design and accessibility tips</li>
                                    </ul>
                        
                                </div>
                                </div>

                                {/* Tech Stack */}
                                <div>
                                <h3 className="text-base md:text-lg font-bold text-white mb-2">Tech Stack:</h3>
                                <ul className="list-disc list-inside text-gray-400 ml-4 text-sm">
                                    {/* <li></li> */}
                                    <FaExclamationTriangle className="text-orange-300" />
                                </ul>
                                </div>


                                {/* Repos */}
                                <div>
                                <h3 className="text-base md:text-lg font-bold text-white mb-3">Repositories:</h3>
                                <div className="flex flex-wrap gap-4 ml-5">
                                    <TooltipWrapper label="GitHub App Repository">
                                    <button
                                        onClick={() => handleExternalClick("https://github.com/snxethan/PortfoliYOU-APP", true)}
                                        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white rounded-lg gap-2 transition-all duration-200 ease-out hover:scale-105 active:scale-95 text-sm md:text-base font-semibold"
                                    >
                                        <FaGithub /> App Repository
                                    </button>
                                    </TooltipWrapper>
                                    <TooltipWrapper label="GitHub Website Repository">
                                    <button
                                        onClick={() => handleExternalClick("https://github.com/snxethan/PortfoliYOU-WEBSITE", true)}
                                        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white rounded-lg gap-2 transition-all duration-200 ease-out hover:scale-105 active:scale-95 text-sm md:text-base font-semibold"
                                    >
                                        <FaGithub /> Website Repository
                                    </button>
                                    </TooltipWrapper>
                                </div>
                                </div>

                                {/* Author */}
                                <div>
                                <h3 className="text-base md:text-lg font-bold text-white mb-3">Author:</h3>
                                <div className="flex flex-col items-start gap-2">
                                <p className="text-gray-300 text-sm md:text-base">
                                        <b>Portfoli-YOU</b> was created & developed as a College Capstone Project for the Neumont College of Computer Science 
                                        course.
                                        <br />
                                        <br />
                                        The project was created, developed, and is maintained solely by:
                                    </p>
                                    <TooltipWrapper label="snxethan (GitHub)">
                                    <Image
                                        src="/images/author/snxethan.png"
                                        alt="snxethan avatar"
                                        width={96}
                                        height={96}
                                        className="rounded-full border-2 border-red-500 shadow"
                                    />
                                    </TooltipWrapper>
                                    <span className="text-sm md:text-base font-semibold text-white"><a href="https://www.ethantownsend.dev" className="text-red-500">Ethan Townsend (snxethan)</a></span>
                                </div>
                                </div>
                            </div>
                            )}
                        </div>
                        </div>
                    </article>
                    ))}
                </div>
                </div>
            </div>
            </main>
        </div>
    <Footer />
    </div>
    );
}
