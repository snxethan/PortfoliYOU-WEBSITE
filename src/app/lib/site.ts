/**
 * Single source of truth for the marketing site.
 *
 * Each block below is owned by exactly ONE page. If you find yourself rendering
 * the same block on two routes, that is the duplication this file exists to
 * prevent — move it, don't copy it.
 *
 *   home     → heroBeats, proof
 *   product  → flow, pillars, targets, codeLevels, deployTargets, included
 *   involved → involve, supportTiers
 *   faq      → faqs, roadmap, security
 *   shared   → site, status, nav, repos, domains, socialLinks
 */

export const site = {
  name: "Portfoli-YOU",
  tagline: "A portfolio for you, by you.",
  description:
    "Build a portfolio site in your browser. Drag-and-drop widgets, real themes, one-click publish, and a full export you own. Free to start.",
  url: "https://portfoliyou.snxethan.dev",
  author: {
    name: "Ethan Townsend",
    handle: "snxethan",
    email: "snxethan@gmail.com",
    site: "https://ethantownsend.dev",
  },
} as const;

/** Work-in-progress banner. Shown on the landing page only. */
export const status = {
  phase: "In development",
  updatedISO: "2026-08-26",
  updated: "August 26, 2026",
} as const;

/**
 * Accounts are frozen while the builder is being built — there is nothing to
 * sign in to yet, so the site should not pretend otherwise.
 *
 * Flip this to `true` to bring auth back: the navbar buttons become live links
 * and every "get started" CTA points at /signup again. The /login and /signup
 * routes stay reachable by direct URL either way, so the forms can still be
 * worked on; they are simply unlinked.
 */
export const authEnabled = false;

/**
 * The main call to action. While accounts are frozen this points at the product
 * walkthrough — the thing a visitor can genuinely do today — rather than at a
 * signup that would dead-end. Flipping `authEnabled` restores the real one.
 */
export const primaryCta = authEnabled
  ? { href: "/signup", label: "Start building — free" }
  : { href: "/product", label: "See how it works" };

export const nav = [
  { href: "/", label: "Home" },
  { href: "/product", label: "Product" },
  { href: "/involved", label: "Get involved" },
  { href: "/about", label: "FAQ" },
] as const;

export const repos = {
  app: "https://github.com/snxethan/PortfoliYOU-APP",
  website: "https://github.com/snxethan/PortfoliYOU-WEBSITE",
} as const;

export const domains = [
  { label: "snex.dev", href: "https://snex.dev" },
  { label: "snxethan.dev", href: "https://snxethan.dev" },
  { label: "ethantownsend.dev", href: "https://ethantownsend.dev" },
] as const;

/** Footer socials. Same shape as the personal portfolio's socialLinks. */
export const socialLinks = {
  professional: [
    {
      label: "GitHub",
      icon: "FaGithub",
      url: repos.app,
      tooltip: "Portfoli-YOU on GitHub",
    },
    {
      label: "LinkedIn",
      icon: "FaLinkedin",
      url: "https://www.linkedin.com/in/snxethan/",
      tooltip: "Ethan on LinkedIn",
    },
  ],
} as const;

/* -------------------------------------------------------------------------
   HOME — three beats and one number. Nothing else.
   ------------------------------------------------------------------------- */

export const heroBeats = [
  {
    id: "build",
    icon: "FaMousePointer",
    title: "Drag it together",
    body: "Projects, timelines, galleries, contact forms. Drop them in, edit in place.",
  },
  {
    id: "style",
    icon: "FaPalette",
    title: "Make it yours",
    body: "Start from a theme, then change any of it. No template you have to live inside.",
  },
  {
    id: "ship",
    icon: "FaRocket",
    title: "Put it online",
    body: "Publish in one click, or export a static site and host it anywhere you like.",
  },
] as const;

export const proof = {
  stat: "6–8 seconds",
  vs: "~3 minutes",
  line: "That's how long a recruiter spends on a résumé, against a portfolio site.",
  source: "StandOut CV & UX Design CC",
} as const;

/* -------------------------------------------------------------------------
   PRODUCT — the /product page owns the walkthrough, capabilities and pricing.
   ------------------------------------------------------------------------- */

/**
 * The five stages of building a site. Drives the interactive demo, so the
 * `stage` ids must stay in sync with FlowDemo's stage visuals.
 */
export const flow = [
  {
    id: "create",
    step: "01",
    title: "Create the project",
    lead: "Name it and set what the whole site inherits.",
    body: "Site title, author, tagline and description. Upload one icon and get a full favicon pack out. Pick a colour theme, choose the kind of site you're making — portfolio, résumé, sandbox, landing page — and set your metadata, robots rules and security contact.",
    points: [
      "Favicon pack generated from a single upload",
      "Open Graph and Twitter card metadata",
      "Security contact and policy metadata",
      "Theme preset, then editable down to the token",
    ],
  },
  {
    id: "pages",
    step: "02",
    title: "Lay out the pages",
    lead: "A dashboard for everything your site contains.",
    body: "Add, rename, reorder, duplicate and delete pages. Each one carries its own route, title, per-page metadata, background and the breakpoints it's enabled for.",
    points: [
      "Drag to reorder, duplicate in one click",
      "Per-page routes and metadata",
      "Desktop, tablet and mobile toggles",
    ],
  },
  {
    id: "compose",
    step: "03",
    title: "Drop in widgets",
    lead: "A blank canvas and a palette beside it.",
    body: "Drag a widget onto the page, then move, resize and snap it where you want. Text, images, video, carousels, project cards, GitHub repos, links, navigation and contact forms — all typed, all responsive.",
    points: [
      "Drag, drop, resize and snap",
      "Nine widget types and growing",
      "Live preview at every breakpoint",
    ],
  },
  {
    id: "edit",
    step: "04",
    title: "Edit it three ways",
    lead: "Settings, JSON, or the actual source.",
    body: "Every widget opens a panel with three tabs. Fill in a form, copy the widget as JSON to reuse or share it, or open the real generated code and edit it directly. Most builders stop at the first tab.",
    points: [
      "Form controls generated from each widget's schema",
      "Copy widget JSON between projects, or save your own",
      "Open and edit the emitted source, then eject or revert",
    ],
  },
  {
    id: "deploy",
    step: "05",
    title: "Ship it",
    lead: "Download it, or publish it in a click.",
    body: "Package the project and take it anywhere. Export a zip for free with no account at all, connect GitHub Pages, Vercel or Netlify, or publish to a Portfoli-YOU subdomain and point your own domain at it.",
    points: [
      "Free local export, no account required",
      "GitHub Pages, Vercel and Netlify",
      "project.you.portfoliyou.dev, or your own domain",
    ],
  },
] as const;

/**
 * Framework targets. `state` drives the badge — only `static` is being built
 * right now, and the site must not imply otherwise.
 */
export const targets = [
  {
    id: "static",
    label: "HTML · CSS · JS",
    detail: "No dependencies, no build step. Hostable literally anywhere.",
    state: "building" as const,
  },
  {
    id: "react-ts",
    label: "React + TypeScript",
    detail: "A Vite project with typed props and CSS modules.",
    state: "planned" as const,
  },
  {
    id: "next",
    label: "Next.js",
    detail: "App Router, static generation and generated metadata.",
    state: "planned" as const,
  },
  {
    id: "go",
    label: "Go",
    detail: "html/template and net/http, compiled to one binary.",
    state: "exploring" as const,
  },
] as const;

/** The three depths of editing, rendered on /product. */
export const codeLevels = [
  {
    id: "settings",
    label: "Settings",
    body: "A generated form for every widget — text, fonts, colour, spacing, borders, shadows. No code, and it survives every future update.",
  },
  {
    id: "json",
    label: "JSON",
    body: "The widget as data. Copy it into another project, hand it to someone else, or save it to your own library as a custom widget.",
  },
  {
    id: "code",
    label: "Code",
    body: "The real emitted source for your chosen framework. Read it, edit it, eject the widget to own it outright — and revert whenever you want.",
  },
] as const;

export const deployTargets = [
  { label: "Download a zip", detail: "Free, no account", state: "building" as const },
  { label: "GitHub Pages", detail: "Your repo", state: "planned" as const },
  { label: "Vercel / Netlify", detail: "Your account", state: "planned" as const },
  { label: "Portfoli-YOU subdomain", detail: "One site free", state: "planned" as const },
] as const;

export const pillars = [
  {
    id: "no-code",
    icon: "FaMousePointer",
    title: "Build without code",
    body: "Compose pages from typed widgets. Drag to arrange, click to edit, and watch the real page update as you go.",
  },
  {
    id: "code",
    icon: "FaCode",
    title: "Then edit the code",
    body: "Open any widget's generated source and change it. Eject it to own it outright, or revert to the generated version whenever you want.",
  },
  {
    id: "frameworks",
    icon: "FaCubes",
    title: "Pick your framework",
    body: "The same project emits plain HTML and CSS, React and TypeScript, or Next.js — and you can convert between them later.",
  },
  {
    id: "themes",
    icon: "FaPalette",
    title: "Themes you can override",
    body: "Type scale, colour, spacing and layout are all editable. Themes are a starting point, not a cage.",
  },
  {
    id: "ship",
    icon: "FaRocket",
    title: "Publish or export",
    body: "One click to a subdomain, or download clean source and assets. Leaving is a download, never a support ticket.",
  },
  {
    id: "open",
    icon: "FaCodeBranch",
    title: "Open source",
    body: "The builder and this site are both public. Read the code, file an issue, or fork it outright.",
  },
] as const;

/** What the free tier covers. Rendered on /product only. */
export const included = [
  "Unlimited projects",
  "Every widget and theme",
  "Full code access and export",
  "Custom domains",
  "Responsive previews",
  "No Portfoli-YOU branding on your site",
] as const;

/* -------------------------------------------------------------------------
   GET INVOLVED — the /involved page owns every ask.
   ------------------------------------------------------------------------- */

/**
 * Four audiences, four asks. `href` is either a route, a mailto or an external
 * URL; `external` decides whether the link opens off-site.
 */
export const involve = [
  {
    id: "learn",
    icon: "FaLightbulb",
    title: "Want to learn more",
    body: "Read the architecture plan, the roadmap and the reasoning behind the design decisions. Everything is written down and public.",
    cta: "Read the plan",
    href: `${repos.app}/blob/main/PLAN.md`,
    external: true,
  },
  {
    id: "build",
    icon: "FaCode",
    title: "Help build it",
    body: "Widgets, framework targets, accessibility, docs and tests are all open. Good first issues are labelled, and the widget contract is documented.",
    cta: "Browse open issues",
    href: `${repos.app}/issues`,
    external: true,
  },
  {
    id: "partner",
    icon: "FaHandshake",
    title: "Partner or integrate",
    body: "Hosting, education, bootcamps, career services — if Portfoli-YOU would help the people you work with, there's room to build that together.",
    cta: "Start a conversation",
    href: `mailto:${site.author.email}?subject=Portfoli-YOU%20partnership`,
    external: false,
  },
  {
    id: "support",
    icon: "FaHeart",
    title: "Support the work",
    body: "This is one person building in the open with no funding behind it. Sponsorship pays for domains, storage and the hosted free tier.",
    cta: "Sponsor the project",
    href: "https://github.com/sponsors/snxethan",
    external: true,
  },
] as const;

/** What funding actually pays for. Concrete, not a thermometer. */
export const supportTiers = [
  {
    label: "Domains & certificates",
    body: "The portfoliyou domain and every subdomain published on the free tier.",
  },
  {
    label: "Asset storage",
    body: "Images and files for hosted projects — the one cost that scales with every new user.",
  },
  {
    label: "Build minutes",
    body: "Compiling and deploying published sites on every save.",
  },
  {
    label: "Time",
    body: "More hours on widgets, framework targets and accessibility instead of on contract work.",
  },
] as const;

/* -------------------------------------------------------------------------
   FAQ — questions, roadmap and policy live here and nowhere else.
   ------------------------------------------------------------------------- */

export const faqs = [
  {
    id: "what",
    q: "What is Portfoli-YOU?",
    a: "A portfolio builder that runs in your browser. You assemble a personal site from drag-and-drop widgets, style it with a theme you can override, and publish it — or export it as a plain static site and host it yourself. There's no code to write.",
  },
  {
    id: "ready",
    q: "Can I use it yet?",
    a: "Not yet. The builder is in active development and accounts open in early access first. Everything on this site describes where the product is heading; dates and features can still move. Progress is public in the GitHub repositories.",
  },
  {
    id: "cost",
    q: "What does it cost?",
    a: "The builder, every widget, every theme, custom domains and the full export are free. If paid plans ever arrive they'll cover things with a real per-user bill — several published sites at once, large asset storage, team seats — not the things above.",
  },
  {
    id: "desktop",
    q: "Is there a desktop app?",
    a: "Not planned for launch. An Electron build exists from the project's earlier life and the codebase is still structured so it could return, but a portfolio is a public artefact — shipping and maintaining two surfaces for one person is cost without much payoff. The web app is the product.",
  },
  {
    id: "own",
    q: "Do I own what I build?",
    a: "Yes, outright. Export produces clean source and your assets with no watermark, no attribution requirement and no Portfoli-YOU runtime. Host it on Netlify, GitHub Pages, your own server — wherever.",
  },
  {
    id: "frameworks",
    q: "Can I choose what my site is built with?",
    a: "That's the plan. A project is stored as data rather than as code, so the same site can be emitted as plain HTML and CSS, as a React and TypeScript project, or as something else. Plain HTML/CSS/JS is the target being built first; React, Next.js and Go follow. You pick a target when you create the project.",
  },
  {
    id: "convert",
    q: "Can I change frameworks later?",
    a: "Yes, and it copies rather than overwrites — your original project is untouched. Everything the builder generated converts cleanly, because conversion is just re-emitting the same project data through a different target. Code you hand-edited yourself does not convert, and you'll be told exactly which widgets those are before anything happens.",
  },
  {
    id: "code",
    q: "Can I edit the code, not just the settings?",
    a: "Yes. Every widget opens three ways: a generated settings form, the widget as copyable JSON, and the real emitted source. You can edit that source and eject the widget to own it outright — or revert to the generated version at any point. Ejected widgets stop receiving automatic updates, which is the trade you're making and we say so at the time.",
  },
  {
    id: "widgets",
    q: "Can I make and share my own widgets?",
    a: "Copy any widget as JSON and paste it into another project, or save it to your own library to reuse. A public community library is on the roadmap but needs moderation to exist first, so personal libraries come first.",
  },
  {
    id: "account",
    q: "Why do I need an account?",
    a: "To save projects to the cloud and to publish them. That's it. Publishing needs somewhere to publish to, which needs to know who you are.",
  },
  {
    id: "data",
    q: "What happens to my data?",
    a: "Projects are private to your account until you publish them; a published site is public by definition. Passwords are handled by the identity provider and never touch Portfoli-YOU. Analytics on this marketing site are anonymised, with no tracking cookies. Everything is served over HTTPS.",
  },
  {
    id: "who",
    q: "Who makes this?",
    a: "One person. Portfoli-YOU started as a semester project at Neumont College of Computer Science, grew into a capstone, and is designed, built and maintained solely by Ethan Townsend.",
  },
] as const;

export const roadmap = [
  {
    step: 1,
    title: "Builder beta",
    state: "active" as const,
    detail:
      "Editor, widgets, themes, live preview and export to plain HTML, CSS and JS.",
  },
  {
    step: 2,
    title: "Accounts & publishing",
    state: "next" as const,
    detail:
      "Sign-in, cloud sync, GitHub Pages and Vercel deploys, custom domains.",
  },
  {
    step: 3,
    title: "Code & frameworks",
    state: "planned" as const,
    detail:
      "Per-widget source editing and eject, the React/TypeScript target, and project conversion between targets.",
  },
  {
    step: 4,
    title: "Community & assistance",
    state: "planned" as const,
    detail:
      "Shared widget libraries, more framework targets, résumé import and accessibility checks.",
  },
] as const;

/**
 * Security policy. Surfaced in page metadata and on the FAQ — deliberately not
 * in the footer, which mirrors the personal portfolio's layout exactly.
 */
export const security = {
  contact: `mailto:${site.author.email}`,
  summary:
    "Report vulnerabilities privately before disclosing them publicly. Every report is acknowledged and investigated.",
  points: [
    "Projects are private to your account until you choose to publish them.",
    "Passwords are handled by the identity provider and never seen by Portfoli-YOU.",
    "Analytics are anonymised and used only for performance. No tracking cookies.",
    "All traffic is served over HTTPS.",
    "Both the builder and this site are open source and auditable.",
  ],
} as const;
