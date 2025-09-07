# PortfoliYOU Website 

> **A Portfolio for you, by you.**

**PortfoliYOU** is a modern portfolio creation platform that empowers users to build stunning, personalized digital portfolios showcasing their unique talents and achievements - no coding experience required.

![Development Status](https://img.shields.io/badge/Status-In%20Development-orange)
![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.x-38B2AC)

## About

This repository contains the **marketing website** for PortfoliYOU - a landing page that introduces users to the platform and provides information about the upcoming portfolio creation tool.

### Related Repositories
- **[PortfoliYOU App](https://github.com/snxethan/PortfoliYOU-APP)** - The main application for creating portfolios
- **PortfoliYOU Website** (this repo) - Marketing/landing page

## Features

- **Modern Design** - Clean, responsive interface with smooth animations
- **Fast Performance** - Built with Next.js 15 and Turbopack for optimal speed
- **Mobile-First** - Fully responsive design that works on all devices
- **Privacy-Focused** - Built with user privacy and security in mind
- **Coming Soon Page** - Engaging landing page with development updates

##  Technology Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with Turbopack
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/) & [Lucide React](https://lucide.dev/)
- **Analytics**: [Vercel Analytics](https://vercel.com/analytics) & [Speed Insights](https://vercel.com/docs/speed-insights)
- **Notifications**: [React Hot Toast](https://react-hot-toast.com/)

##  Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/snxethan/PortfoliYOU-WEBSITE.git
   cd PortfoliYOU-WEBSITE
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the website.

### 🔧 Available Scripts

```bash
npm run dev     # Start development server with Turbopack
npm run build   # Build for production with Turbopack
npm run start   # Start production server
npm run lint    # Run ESLint for code quality
```

## Project Structure

```
src/
├── app/
│   ├── components/        # Reusable UI components
│   │   ├── pages/        # Page-specific components
│   │   ├── ContactFormModal.tsx
│   │   ├── PDFModalViewer.tsx
│   │   └── ...
│   ├── download/         # Download page
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Homepage
public/
├── images/               # Static images
└── ...                   # Favicons and other assets
```

## Deployment

The easiest way to deploy this website is using the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

For other deployment options, check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).


## Author(s)

- [**Ethan Townsend (snxethan)**](https://www.ethantownsend.dev)