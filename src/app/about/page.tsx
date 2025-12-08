"use client";

import Navbar from "../components/pages/Navbar";
import Notice from "../components/pages/Notice";
import TooltipWrapper from "../components/ToolTipWrapper";
import ContactFormModal from "../components/ContactFormModal";
import SkeletonLoader from "../components/SkeletonLoader";
import { useLoadingDelay } from "../components/hooks/useLoadingDelay";
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
  FaReact,
  FaFire,
  FaCode,
  FaCog,
  FaCheckCircle,
} from "react-icons/fa";
import { SiElectron, SiVite, SiTypescript, SiTailwindcss, SiFirebase } from "react-icons/si";
import Image from "next/image";
import { useRef, useState, useCallback } from "react";
import Footer from "../components/pages/Footer";
import { useExternalLink } from "../components/ExternalLinkHandler";

const SITE_NAVBAR_OFFSET = 96; 

const sectionIcons: { [key: string]: typeof FaStar } = {
  what: FaBolt,
  how: FaPalette,
  why: FaStar,
  features: FaLock,
  techstack: FaCode,
  development: FaGithub,
};



const sections = [
        { id: "what", title: "What is Portfoli-YOU?" },
        { id: "why", title: "Why Portfoli-YOU?" },
        { id: "features", title: "Core Features" },
        { id: "how", title: "How to Use" },
        { id: "techstack", title: "Tech Stack" },
        { id: "development", title: "Development" },
];

export default function AboutPage() {

    // Default expand the first section
    const [expanded, setExpanded] = useState<string | null>(sections[0].id);
    const [showContactModal, setShowContactModal] = useState(false);
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
        // Delay scrolling to allow expansion animation to complete (300ms duration + small buffer)
        setTimeout(() => {
            scrollToSection(id);
        }, 350);
        },
        [scrollToSection]
    );

    const handleNavClick = (id: string) => handleExpand(id);

    const loading = useLoadingDelay();

    if (loading) {
        return <SkeletonLoader />;
    }

    return (
        <div>
        <div 
          className="flex min-h-screen font-sans transition-all duration-300"
          style={{
            background: 'linear-gradient(to bottom, var(--bg), var(--muted), var(--surface))',
            color: 'var(--fg)',
          }}
        >
            <Navbar />
            
            <main className="flex-grow w-full flex">
            {/* Left-side Navigator (centered vertically) */}
            
            <aside 
              className="hidden lg:flex sticky top-[64px] h-[calc(100vh-64px)] min-w-[260px] max-w-[300px] border-r pl-2"
              style={{
                borderColor: 'var(--border)',
                backgroundColor: 'color-mix(in oklab, var(--surface) 70%, transparent)',
              }}
            >
                <nav className="m-auto flex w-full max-w-[260px] flex-col items-stretch gap-3 px-4 py-4">
                {sections.map((s) => {
                    const Icon = sectionIcons[s.id];
                    const isActive = expanded === s.id;
                    return (
                    <button
                        key={s.id}
                        onClick={() => handleNavClick(s.id)}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-left font-semibold transition-all duration-200 outline-none ring-0 focus-visible:ring-2`}
                        style={{
                          backgroundColor: isActive ? 'color-mix(in oklab, var(--accent) 20%, transparent)' : 'transparent',
                          color: isActive ? 'var(--accent)' : 'var(--fg-muted)',
                          boxShadow: isActive ? '0 0 0 2px var(--accent)' : 'none',
                        }}
                        onMouseEnter={(e) => {
                          if (!isActive) {
                            e.currentTarget.style.backgroundColor = 'color-mix(in oklab, var(--accent) 15%, transparent)'
                            e.currentTarget.style.color = 'var(--accent)'
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isActive) {
                            e.currentTarget.style.backgroundColor = 'transparent'
                            e.currentTarget.style.color = 'var(--fg-muted)'
                          }
                        }}
                        aria-current={isActive ? "true" : undefined}
                    >
                        <Icon style={{ color: 'var(--accent)' }} className="shrink-0" />
                        <span className="truncate">{s.title}</span>
                    </button>
                    );
                })}
                </nav>
            </aside>

            

            {/* Content column */}
            <div className="flex-1 min-w-0">
                <div className="mx-auto max-w-4xl px-4 md:px-25 pt-24 pb-16 ">
                    <div className="text-center mb-12 animate-fade-in-up">
                        <h1 
                          className="text-4xl md:text-5xl lg:text-6xl font-bold"
                          style={{
                            color: 'var(--fg)',
                            fontFamily: 'var(--heading-font)',
                          }}
                        >
                        About Portfoli-<span style={{ color: 'var(--accent)' }}>YOU</span>
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
                            className="group w-full flex items-center justify-between gap-3 text-left transition-all duration-200"
                            onClick={() => handleExpand(section.id)}
                            aria-expanded={expanded === section.id}
                            aria-controls={`${section.id}-panel`}
                        >
                            <div className="flex items-center gap-3">
                            {(() => {
                                const Icon = sectionIcons[section.id];
                                return (
                                <span 
                                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg transition-transform duration-200 hover:scale-110"
                                  style={{
                                    backgroundColor: 'var(--accent)',
                                  }}
                                >
                                    <Icon className="text-white" />
                                </span>
                                );
                            })()}
                            <h2 
                              className="text-xl md:text-2xl font-bold"
                              style={{
                                color: 'var(--fg)',
                                fontFamily: 'var(--heading-font)',
                              }}
                            >
                                {section.title}
                            </h2>
                            </div>
                            <FaChevronDown
                            className={`transition-transform duration-200 ${
                                expanded === section.id ? "rotate-180" : "rotate-0"
                            }`}
                            style={{ color: 'var(--accent)' }}
                            aria-hidden
                            />
                        </button>

                        {/* Always-visible preview line under header */}
                        <p className="mt-2 text-sm md:text-base" style={{ color: 'var(--fg-muted)' }}>
                            {section.id === "what" && <>A Portfolio for you, by you.</>}
                            {section.id === "how" && <>Download → Design → Deploy</>}
                            {section.id === "why" && <>Resumes earn seconds; portfolios earn minutes.</>}
                            {section.id === "features" && <>Themes, privacy-first data, easy sharing, and more.</>}
                            {section.id === "techstack" && <>Electron, React, TypeScript, Firebase, and more.</>}
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
                            <p className="leading-relaxed" style={{ color: 'var(--fg)' }}>
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
                                  className="px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 ease-out hover:scale-105 active:scale-95 text-white"
                                  style={{
                                    backgroundColor: 'var(--accent)',
                                  }}
                                >
                                  <FaFile /> View Project Proposal
                                </a>
                              </TooltipWrapper>
                            </div>                        
                            </>
                            )}

                            {section.id === "how" && (
                            <ol className="list-decimal list-inside space-y-2" style={{ color: 'var(--fg)' }}>
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
                                <blockquote 
                                  className="border-l-4 p-4 md:p-6 rounded-xl italic flex items-start gap-3"
                                  style={{
                                    backgroundColor: 'var(--surface)',
                                    borderColor: 'var(--accent)',
                                    color: 'var(--fg)',
                                  }}
                                >
                                <FaQuoteLeft className="mt-1 shrink-0" style={{ color: 'var(--accent)' }} />
                                <span>
                                    &quot;On average, recruiters spend only 6–8 seconds scanning a resume, but that
                                    jumps to roughly 3 minutes when reviewing a portfolio website.&quot;
                                    (StandOut CV & UX Design CC)
                                </span>
                                </blockquote>

                                <p className="mt-3" style={{ color: 'var(--fg)' }}>
                                The aim is simple: make portfolio building fast, easy, and intuitive for everyone.
                                <b> Portfoli-YOU</b> lowers the barrier so anyone can create a site that truly represents them.
                                </p>

                                <section aria-labelledby="why-local-first" className="mt-4 space-y-4 leading-relaxed" style={{ color: 'var(--fg)' }}>
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

                                <h5 className="font-bold" style={{ color: 'var(--fg-strong)' }}>Pros of Local-First:</h5>
                                <ul className="list-disc list-inside ml-4 space-y-2">
                                    <li><b>Privacy:</b> Your data stays on your machine, reducing exposure to potential breaches.</li>
                                    <li><b>Offline Access:</b> Build and edit your portfolio without needing an internet connection.</li>
                                    <li><b>Performance:</b> Local processing ensures faster load times and smoother interactions.</li>
                                </ul>

                                <h5 className="font-bold" style={{ color: 'var(--fg-strong)' }}>Cons of Local-First:</h5>
                                <ul className="list-disc list-inside ml-4 space-y-2">
                                    <li><b>Limited Collaboration:</b> Real-time team collaboration is not available without cloud integration.</li>
                                    <li><b>Manual Backups:</b> Users need to manage their own backups unless opting for cloud services.</li>
                                </ul>

                                <h5 className="font-bold" style={{ color: 'var(--fg-strong)' }}>Competitor Comparison:</h5>
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
                                <div 
                                  className="rounded-xl border p-6 transition-all duration-300 ease-out hover:scale-105 active:scale-95"
                                  style={{
                                    backgroundColor: 'var(--surface)',
                                    borderColor: 'var(--border)',
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = 'var(--accent)'
                                    e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)'
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = 'var(--border)'
                                    e.currentTarget.style.boxShadow = 'none'
                                  }}
                                >
                                <div 
                                  className="w-12 h-12 rounded-lg mx-auto mb-4 flex items-center justify-center"
                                  style={{
                                    backgroundColor: 'var(--accent)',
                                  }}
                                >
                                    <FaPalette className="text-white text-2xl" />
                                </div>
                                <h3 className="text-base font-semibold mb-2" style={{ color: 'var(--fg-strong)' }}>Customizable Designs</h3>
                                <p className="text-sm" style={{ color: 'var(--fg-muted)' }}>Carefully crafted & specialized widgets and modules. Tailor your portfolio to reflect your unique style.</p>
                                </div>
                                <div 
                                  className="rounded-xl border p-6 transition-all duration-300 ease-out hover:scale-105 active:scale-95"
                                  style={{
                                    backgroundColor: 'var(--surface)',
                                    borderColor: 'var(--border)',
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = 'var(--accent)'
                                    e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)'
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = 'var(--border)'
                                    e.currentTarget.style.boxShadow = 'none'
                                  }}
                                >
                                <div 
                                  className="w-12 h-12 rounded-lg mx-auto mb-4 flex items-center justify-center"
                                  style={{
                                    backgroundColor: 'var(--accent)',
                                  }}
                                >
                                    <FaBolt className="text-white text-2xl" />
                                </div>
                                <h3 className="text-base font-semibold mb-2" style={{ color: 'var(--fg-strong)' }}>Easy to Use</h3>
                                <p className="text-sm" style={{ color: 'var(--fg-muted)' }}>Design digital pages with no experience required. Drag and drop your way to stunning layouts, all while maintaining full control over your design.</p>
                                </div>
                                <div 
                                  className="rounded-xl border p-6 transition-all duration-300 ease-out hover:scale-105 active:scale-95"
                                  style={{
                                    backgroundColor: 'var(--surface)',
                                    borderColor: 'var(--border)',
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = 'var(--accent)'
                                    e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)'
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = 'var(--border)'
                                    e.currentTarget.style.boxShadow = 'none'
                                  }}
                                >
                                <div 
                                  className="w-12 h-12 rounded-lg mx-auto mb-4 flex items-center justify-center"
                                  style={{
                                    backgroundColor: 'var(--accent)',
                                  }}
                                >
                                    <FaRocket className="text-white text-2xl" />
                                </div>
                                <h3 className="text-base font-semibold mb-2" style={{ color: 'var(--fg-strong)' }}>Share Anywhere</h3>
                                <p className="text-sm" style={{ color: 'var(--fg-muted)' }}>One-click deployment to our provided deployment methods, or statically export to modify and take your project anywhere, on your own terms.</p>
                                </div>
                                <div 
                                  className="rounded-xl border p-6 transition-all duration-300 ease-out hover:scale-105 active:scale-95"
                                  style={{
                                    backgroundColor: 'var(--surface)',
                                    borderColor: 'var(--border)',
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = 'var(--accent)'
                                    e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)'
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = 'var(--border)'
                                    e.currentTarget.style.boxShadow = 'none'
                                  }}
                                >
                                <div 
                                  className="w-12 h-12 rounded-lg mx-auto mb-4 flex items-center justify-center"
                                  style={{
                                    backgroundColor: 'var(--accent)',
                                  }}
                                >
                                    <FaStar className="text-white text-2xl" />
                                </div>
                                <h3 className="text-base font-semibold mb-2" style={{ color: 'var(--fg-strong)' }}>Your pages, your rules.</h3>
                                <p className="text-sm" style={{ color: 'var(--fg-muted)' }}>No limitations on design or functionality, use the editor and explore your pages visually, or export and modify the code directly.</p>
                                </div>
                                <div 
                                  className="rounded-xl border p-6 transition-all duration-300 ease-out hover:scale-105 active:scale-95"
                                  style={{
                                    backgroundColor: 'var(--surface)',
                                    borderColor: 'var(--border)',
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = 'var(--accent)'
                                    e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)'
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = 'var(--border)'
                                    e.currentTarget.style.boxShadow = 'none'
                                  }}
                                >
                                <div 
                                  className="w-12 h-12 rounded-lg mx-auto mb-4 flex items-center justify-center"
                                  style={{
                                    backgroundColor: 'var(--accent)',
                                  }}
                                >
                                    <FaCloud className="text-white text-2xl" />
                                </div>
                                <h3 className="text-base font-semibold mb-2" style={{ color: 'var(--fg-strong)' }}>Cloud Sync</h3>
                                <p className="text-sm" style={{ color: 'var(--fg-muted)' }}>Sync across devices when you want. Optional sign in for cloud services, or stay offline and explore the same features for the same price: for free.</p>
                                </div>
                                 <div 
                                  className="rounded-xl border p-6 transition-all duration-300 ease-out hover:scale-105 active:scale-95"
                                  style={{
                                    backgroundColor: 'var(--surface)',
                                    borderColor: 'var(--border)',
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = 'var(--accent)'
                                    e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)'
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = 'var(--border)'
                                    e.currentTarget.style.boxShadow = 'none'
                                  }}
                                >
                                <div 
                                  className="w-12 h-12 rounded-lg mx-auto mb-4 flex items-center justify-center"
                                  style={{
                                    backgroundColor: 'var(--accent)',
                                  }}
                                >
                                    <FaLock className="text-white text-2xl" />
                                </div>
                                <h3 className="text-base font-semibold mb-2" style={{ color: 'var(--fg-strong)' }}>Privacy</h3>
                                <p className="text-sm" style={{ color: 'var(--fg-muted)' }}>Local-first. Your data, your choice. Even when using the cloud services, your data remains private and secure. Your projects are backed up, but nothing is shared.</p>
                                </div>
                            </div>
                            )}

                            {section.id === "development" && (
                            <div className="space-y-8">
                                {/* Philosophy & Vision */}
                                <div>
                                <h3 className="text-base md:text-lg font-bold mb-2" style={{ color: 'var(--fg-strong)', fontFamily: 'var(--heading-font)' }}>Project Development:</h3>
                                <p className="text-sm md:text-base" style={{ color: 'var(--fg)' }}>
                                    <b>Portfoli-YOU</b> is designed to be as intuitive and user-friendly as possible. The goal is to make an open-source, privacy-first portfolio builder
                                    that anyone can use. I encourage you to try it out and provide feedback or contribute on GitHub if you&apos;re so willing.
                                    <br />
                                    <br />
                                    You can share any suggestions, feedback or personal portfolios made with <b>Portfoli-YOU</b> by{" "}
                                    <button 
                                        onClick={() => setShowContactModal(true)}
                                        className="hover:underline bg-transparent border-none p-0 cursor-pointer"
                                        style={{ color: 'var(--accent)' }}
                                        onMouseEnter={(e) => {
                                          e.currentTarget.style.opacity = '0.8'
                                        }}
                                        onMouseLeave={(e) => {
                                          e.currentTarget.style.opacity = '1'
                                        }}
                                    >
                                        contacting me
                                    </button>.
                                </p>
                                </div>

                                {/* Roadmap */}
                                <div>
                                <h3 className="text-base md:text-lg font-bold text-white mb-2">Timeline & Roadmap:</h3>
                                <div className="flex flex-col items-start gap-4">
                                    <div className="flex items-center gap-3 text-gray-300 text-sm md:text-base">
                                    <span className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold animate-pulse" style={{ backgroundColor: 'var(--accent)' }}>1</span>
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




                                {/* Repos */}
                                <div>
                                <h3 className="text-base md:text-lg font-bold mb-3" style={{ color: 'var(--fg-strong)', fontFamily: 'var(--heading-font)' }}>Repositories:</h3>
                                <div className="flex flex-wrap gap-4 ml-5">
                                    <TooltipWrapper label="GitHub App Repository">
                                    <button
                                        onClick={() => handleExternalClick("https://github.com/snxethan/PortfoliYOU-APP", true)}
                                        className="inline-flex items-center px-4 py-2 text-white rounded-lg gap-2 transition-all duration-200 ease-out hover:scale-105 active:scale-95 text-sm md:text-base font-semibold"
                                        style={{
                                          backgroundColor: 'var(--accent)',
                                        }}
                                    >
                                        <FaGithub /> App Repository
                                    </button>
                                    </TooltipWrapper>
                                    <TooltipWrapper label="GitHub Website Repository">
                                    <button
                                        onClick={() => handleExternalClick("https://github.com/snxethan/PortfoliYOU-WEBSITE", true)}
                                        className="inline-flex items-center px-4 py-2 text-white rounded-lg gap-2 transition-all duration-200 ease-out hover:scale-105 active:scale-95 text-sm md:text-base font-semibold"
                                        style={{
                                          backgroundColor: 'var(--accent)',
                                        }}
                                    >
                                        <FaGithub /> Website Repository
                                    </button>
                                    </TooltipWrapper>
                                </div>
                                </div>

                                {/* Author */}
                                <div>
                                <h3 className="text-base md:text-lg font-bold mb-3" style={{ color: 'var(--fg-strong)', fontFamily: 'var(--heading-font)' }}>Author:</h3>
                                <div className="flex flex-col items-start gap-2">
                                <p className="text-sm md:text-base" style={{ color: 'var(--fg)' }}>
                                        <b>Portfoli-YOU</b> was created & developed as a College Capstone Project for the Neumont College of Computer Science 
                                        course.
                                        <br />
                                        <br />
                                        The project was created, developed, and is maintained solely by:
                                    </p>
                                    <Image
                                        src="/images/author/snxethan.png"
                                        alt="snxethan avatar"
                                        width={96}
                                        height={96}
                                        className="rounded-full border-2 shadow transition-all duration-300 hover:scale-110 hover:rotate-12"
                                        style={{
                                          borderColor: 'var(--accent)',
                                        }}
                                    />
                                    <span className="text-sm md:text-base font-semibold" style={{ color: 'var(--fg-strong)' }}>
                                      <a href="https://www.ethantownsend.dev" className="link-accent hover:underline">
                                        Ethan Townsend (snxethan)
                                      </a>
                                    </span>
                                </div>
                                </div>
                            </div>
                            )}

                            {section.id === "techstack" && (
                            <div className="space-y-6">
                                {/* Tech Stack Overview */}
                                <div>
                                <h3 className="text-base md:text-lg font-bold mb-4" style={{ color: 'var(--fg-strong)', fontFamily: 'var(--heading-font)' }}>Architecture Overview:</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Platform Layer */}
                                    <div 
                                      className="rounded-xl border p-5 transition-all duration-300 ease-out"
                                      style={{
                                        backgroundColor: 'var(--surface)',
                                        borderColor: 'var(--border)',
                                      }}
                                      onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor = 'var(--accent)'
                                        e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)'
                                      }}
                                      onMouseLeave={(e) => {
                                        e.currentTarget.style.borderColor = 'var(--border)'
                                        e.currentTarget.style.boxShadow = 'none'
                                      }}
                                    >
                                      <div className="flex items-center gap-3 mb-3">
                                        <div 
                                          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                                          style={{ backgroundColor: 'var(--accent)' }}
                                        >
                                          <SiElectron className="text-white text-lg" />
                                        </div>
                                        <h4 className="text-base font-bold" style={{ color: 'var(--fg-strong)' }}>Core Platform</h4>
                                      </div>
                                      <p className="text-sm leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
                                        <span className="font-semibold" style={{ color: 'var(--fg)' }}>Electron shell + Vite-powered React renderer.</span> Electron handles native dialogs, filesystem access, and IPC bridges so the editor can save/export locally while staying sandboxed.
                                      </p>
                                    </div>

                                    {/* Application Layer */}
                                    <div 
                                      className="rounded-xl border p-5 transition-all duration-300 ease-out"
                                      style={{
                                        backgroundColor: 'var(--surface)',
                                        borderColor: 'var(--border)',
                                      }}
                                      onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor = 'var(--accent)'
                                        e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)'
                                      }}
                                      onMouseLeave={(e) => {
                                        e.currentTarget.style.borderColor = 'var(--border)'
                                        e.currentTarget.style.boxShadow = 'none'
                                      }}
                                    >
                                      <div className="flex items-center gap-3 mb-3">
                                        <div className="flex -space-x-2 flex-shrink-0">
                                          <div 
                                            className="w-9 h-9 rounded-lg flex items-center justify-center"
                                            style={{ backgroundColor: 'var(--accent)' }}
                                          >
                                            <FaReact className="text-white text-lg" />
                                          </div>
                                          <div 
                                            className="w-9 h-9 rounded-lg flex items-center justify-center"
                                            style={{ backgroundColor: 'var(--accent)' }}
                                          >
                                            <SiTypescript className="text-white text-lg" />
                                          </div>
                                        </div>
                                        <h4 className="text-base font-bold" style={{ color: 'var(--fg-strong)' }}>Renderer UI</h4>
                                      </div>
                                      <p className="text-sm leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
                                        <span className="font-semibold" style={{ color: 'var(--fg)' }}>React 18 with TypeScript,</span> Zustand-style ProjectsProvider, and <span className="font-semibold" style={{ color: 'var(--fg)' }}>Tailwind</span> utility tokens. The canvas, preview, and widget settings all run from the same component library for consistency.
                                      </p>
                                    </div>

                                    {/* Data Layer */}
                                    <div 
                                      className="rounded-xl border p-5 transition-all duration-300 ease-out"
                                      style={{
                                        backgroundColor: 'var(--surface)',
                                        borderColor: 'var(--border)',
                                      }}
                                      onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor = 'var(--accent)'
                                        e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)'
                                      }}
                                      onMouseLeave={(e) => {
                                        e.currentTarget.style.borderColor = 'var(--border)'
                                        e.currentTarget.style.boxShadow = 'none'
                                      }}
                                    >
                                      <div className="flex items-center gap-3 mb-3">
                                        <div className="flex -space-x-2 flex-shrink-0">
                                          <div 
                                            className="w-9 h-9 rounded-lg flex items-center justify-center"
                                            style={{ backgroundColor: 'var(--accent)' }}
                                          >
                                            <SiFirebase className="text-white text-lg" />
                                          </div>
                                          <div 
                                            className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold text-white"
                                            style={{ backgroundColor: 'var(--accent)' }}
                                          >
                                            JSON
                                          </div>
                                        </div>
                                        <h4 className="text-base font-bold" style={{ color: 'var(--fg-strong)' }}>State & Data</h4>
                                      </div>
                                      <p className="text-sm leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
                                        Projects are stored as normalized <span className="font-semibold" style={{ color: 'var(--fg)' }}>JSON snapshots</span> (pages → sections → widget trees). Autosave syncs snapshots to <span className="font-semibold" style={{ color: 'var(--fg)' }}>Firebase Firestore</span> plus a local cache; assets live in Firebase Storage with per-user security rules.
                                      </p>
                                    </div>

                                    {/* Widget Architecture */}
                                    <div 
                                      className="rounded-xl border p-5 transition-all duration-300 ease-out"
                                      style={{
                                        backgroundColor: 'var(--surface)',
                                        borderColor: 'var(--border)',
                                      }}
                                      onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor = 'var(--accent)'
                                        e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)'
                                      }}
                                      onMouseLeave={(e) => {
                                        e.currentTarget.style.borderColor = 'var(--border)'
                                        e.currentTarget.style.boxShadow = 'none'
                                      }}
                                    >
                                      <div className="flex items-center gap-3 mb-3">
                                        <div 
                                          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                                          style={{ backgroundColor: 'var(--accent)' }}
                                        >
                                          <FaCog className="text-white text-lg" />
                                        </div>
                                        <h4 className="text-base font-bold" style={{ color: 'var(--fg-strong)' }}>Widget Architecture</h4>
                                      </div>
                                      <p className="text-sm leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
                                        Each widget registers a manifest (props schema, defaults, static renderers). Widgets expose <span className="font-semibold" style={{ color: 'var(--fg)' }}>getStatic*</span> helpers so the compiler can transform saved props into pure HTML/CSS/JS, while advanced widgets (GitHub Repos, Contact forms) cache API data during editing for static playback.
                                      </p>
                                    </div>

                                    {/* Compilation Pipeline */}
                                    <div 
                                      className="rounded-xl border p-5 transition-all duration-300 ease-out"
                                      style={{
                                        backgroundColor: 'var(--surface)',
                                        borderColor: 'var(--border)',
                                      }}
                                      onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor = 'var(--accent)'
                                        e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)'
                                      }}
                                      onMouseLeave={(e) => {
                                        e.currentTarget.style.borderColor = 'var(--border)'
                                        e.currentTarget.style.boxShadow = 'none'
                                      }}
                                    >
                                      <div className="flex items-center gap-3 mb-3">
                                        <div 
                                          className="w-9 h-9 rounded-lg flex items-center justify-center text-lg flex-shrink-0"
                                          style={{ backgroundColor: 'var(--accent)' }}
                                        >
                                          🟢
                                        </div>
                                        <h4 className="text-base font-bold" style={{ color: 'var(--fg-strong)' }}>Compilation Pipeline</h4>
                                      </div>
                                      <p className="text-sm leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
                                        <span className="font-semibold" style={{ color: 'var(--fg)' }}>Static compiler</span> (Node + DOMPurify + JSDOM) walks project JSON, sanitizes user content, emits minified HTML/CSS bundles, and packages assets. Vite builds the editor/preview bundles; Electron main/preload scripts are compiled separately.
                                      </p>
                                    </div>

                                    {/* Live Preview */}
                                    <div 
                                      className="rounded-xl border p-5 transition-all duration-300 ease-out"
                                      style={{
                                        backgroundColor: 'var(--surface)',
                                        borderColor: 'var(--border)',
                                      }}
                                      onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor = 'var(--accent)'
                                        e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)'
                                      }}
                                      onMouseLeave={(e) => {
                                        e.currentTarget.style.borderColor = 'var(--border)'
                                        e.currentTarget.style.boxShadow = 'none'
                                      }}
                                    >
                                      <div className="flex items-center gap-3 mb-3">
                                        <div 
                                          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                                          style={{ backgroundColor: 'var(--accent)' }}
                                        >
                                          <SiVite className="text-white text-lg" />
                                        </div>
                                        <h4 className="text-base font-bold" style={{ color: 'var(--fg-strong)' }}>Live Preview</h4>
                                      </div>
                                      <p className="text-sm leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
                                        Dev-mode iframe served by the same <span className="font-semibold" style={{ color: 'var(--fg)' }}>Vite server</span> as the editor. ProjectsProvider streams changes; the preview subscribes and re-renders instantly with HMR. LAN sharing simply exposes that dev server on 0.0.0.0, so other devices see live edits.
                                      </p>
                                    </div>
                                </div>
                                </div>

                                {/* Testing & Quality */}
                                <div 
                                  className="rounded-xl border p-5 transition-all duration-300 ease-out"
                                  style={{
                                    backgroundColor: 'var(--surface)',
                                    borderColor: 'var(--border)',
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = 'var(--accent)'
                                    e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)'
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = 'var(--border)'
                                    e.currentTarget.style.boxShadow = 'none'
                                  }}
                                >
                                  <div className="flex items-center gap-3 mb-3">
                                    <div 
                                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                                      style={{ backgroundColor: 'var(--accent)' }}
                                    >
                                      <FaCheckCircle className="text-white text-lg" />
                                    </div>
                                    <h4 className="text-base font-bold" style={{ color: 'var(--fg-strong)' }}>Testing & Quality</h4>
                                  </div>
                                  <p className="text-sm leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
                                    Vitest unit suites for providers/widgets, Playwright/Vite smoke tests for editor flows, ESLint + TypeScript strictness across renderer and Electron code.
                                  </p>
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
    {showContactModal && <ContactFormModal onClose={() => setShowContactModal(false)} />}
    </div>
    );
}
