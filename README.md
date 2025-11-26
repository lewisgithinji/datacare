# Datacare Limited - Corporate Website

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![License](https://img.shields.io/badge/License-Proprietary-red.svg)](https://datacare.co.ke)

Official corporate website for **Datacare Limited**, a leading East African IT services company specializing in Microsoft 365, Google Workspace, cybersecurity, cloud infrastructure, and enterprise web solutions.

**🌐 Live Site**: [https://datacare.co.ke](https://datacare.co.ke)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Running the Project](#running-the-project)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Security](#security)
- [Contributing](#contributing)
- [Credits](#credits)
- [License](#license)

---

## 🎯 Overview

Datacare Limited's corporate website showcases the company's comprehensive IT services portfolio, industry expertise, and successful client implementations. The platform serves as the primary digital touchpoint for enterprise clients across East Africa, featuring:

- **34+ Portfolio Projects** - Real-world implementations across banking, healthcare, education, and government sectors
- **8 Industry Verticals** - Specialized solutions for SMEs, legal, banking, healthcare, education, manufacturing, NGOs, and government
- **6 Core Solutions** - Cloud & licensing, AI automation, web design, digital transformation, security, and data analytics
- **Interactive AI Chatbot** - Supabase-powered support system with analytics
- **Lead Generation** - EmailJS-integrated contact forms with Zod validation
- **Legal Compliance** - Kenya DPA 2019 and GDPR-compliant privacy policy

---

## ✨ Key Features

### Enterprise Capabilities
- **🎨 Modern UI/UX** - Built with shadcn/ui component library and Tailwind CSS
- **📱 Fully Responsive** - Mobile-first design with optimized layouts for all devices
- **⚡ Performance Optimized** - Vite build system with code splitting and lazy loading
- **🔒 Security Hardened** - Comprehensive security headers, input validation, and rate limiting
- **♿ Accessible** - WCAG 2.1 Level AA compliant with semantic HTML
- **🌍 SEO Optimized** - React Helmet Async with structured data and Open Graph tags
- **🎭 Dark Mode** - System-aware theme switching with next-themes
- **📊 Analytics Ready** - Supabase analytics integration for chatbot interactions

### Developer Experience
- **TypeScript** - Full type safety across the codebase
- **React Router v6** - Client-side routing with code splitting
- **React Query** - Server state management with caching
- **React Hook Form** - Performant form handling with Zod validation
- **ESLint** - Code quality enforcement with TypeScript ESLint
- **Hot Module Replacement** - Instant feedback during development

---

## 🛠️ Technology Stack

### Core Framework
- **React 18.3** - UI library with concurrent features
- **TypeScript 5.5** - Static type checking
- **Vite 7.2** - Next-generation build tool

### UI & Styling
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **shadcn/ui** - Re-usable component library built on Radix UI
- **Radix UI** - Unstyled, accessible component primitives
- **Lucide React** - Beautiful & consistent icon library
- **next-themes** - Dark mode support

### State Management & Data Fetching
- **TanStack React Query 5.5** - Async state management
- **React Router DOM 6.26** - Client-side routing
- **Supabase 2.56** - Backend as a Service (BaaS)

### Forms & Validation
- **React Hook Form 7.53** - Performant form library
- **Zod 3.23** - TypeScript-first schema validation
- **@hookform/resolvers** - Validation resolver integration

### Additional Libraries
- **EmailJS Browser 4.4** - Client-side email delivery
- **React Helmet Async 2.0** - Document head management
- **date-fns 3.6** - Modern date utility library
- **recharts 2.12** - Composable charting library
- **cmdk** - Command palette interface
- **Sonner** - Toast notification system

### Development Tools
- **ESLint 9.9** - JavaScript/TypeScript linter
- **TypeScript ESLint 8.0** - TypeScript-specific linting rules
- **@vitejs/plugin-react-swc** - Fast React refresh with SWC
- **Autoprefixer** - PostCSS plugin for vendor prefixes

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** - Version 18.18.0 or higher ([Download](https://nodejs.org/))
- **npm** - Version 10.0.0 or higher (bundled with Node.js)
- **Git** - For version control ([Download](https://git-scm.com/))

**Verify installations:**
```bash
node --version  # Should output v18.18.0 or higher
npm --version   # Should output 10.0.0 or higher
git --version   # Should output git version 2.x or higher
```

---

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/lewisgithinji/datacare-ai-nexus.git
cd datacare
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages as defined in `package.json`. The installation may take 2-3 minutes depending on your internet connection.

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Then edit the `.env` file with your credentials:

```env
# EmailJS Configuration
# Get credentials from https://www.emailjs.com/
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here

# Supabase Configuration
# Get credentials from https://supabase.com/dashboard
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**⚠️ Important:** Never commit the `.env` file to version control. It's already included in `.gitignore`.

---

## 🏃 Running the Project

### Development Mode

Start the Vite development server with hot module replacement:

```bash
npm run dev
```

The application will be available at **http://localhost:8080**

### Production Build

Create an optimized production build:

```bash
npm run build
```

Build output will be in the `dist/` directory.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

### Linting

Run ESLint to check code quality:

```bash
npm run lint
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 8080 |
| `npm run build` | Create production build |
| `npm run build:dev` | Create development build |
| `npm run lint` | Run ESLint code quality checks |
| `npm run preview` | Preview production build locally |

---

## 📁 Project Structure

```
datacare/
├── public/                      # Static assets
│   ├── .well-known/
│   │   └── security.txt         # Security contact information (RFC 9116)
│   ├── _headers                 # Cloudflare Pages security headers
│   ├── robots.txt               # Search engine directives
│   └── sitemap.xml              # SEO sitemap
├── src/
│   ├── components/              # Reusable UI components
│   │   ├── ui/                  # shadcn/ui components
│   │   ├── Navigation.tsx       # Main navigation bar
│   │   ├── Footer.tsx           # Site footer
│   │   ├── Chatbot.tsx          # AI chatbot widget
│   │   └── SEO.tsx              # SEO meta tags component
│   ├── pages/                   # Route pages
│   │   ├── Index.tsx            # Homepage
│   │   ├── About.tsx            # About page with team
│   │   ├── Contact.tsx          # Contact form with validation
│   │   ├── Portfolio.tsx        # Projects showcase
│   │   ├── PrivacyPolicy.tsx    # GDPR/Kenya DPA compliant
│   │   ├── TermsOfService.tsx   # Legal terms
│   │   ├── solutions/           # Solution pages
│   │   ├── products/            # Product pages
│   │   ├── industries/          # Industry pages
│   │   └── resources/           # Resource pages
│   ├── integrations/
│   │   └── supabase/            # Supabase client & types
│   ├── hooks/                   # Custom React hooks
│   ├── lib/                     # Utility functions
│   ├── App.tsx                  # Root component with routing
│   ├── main.tsx                 # Application entry point
│   └── index.css                # Global styles & Tailwind imports
├── supabase/                    # Supabase configuration
│   ├── functions/               # Edge functions
│   └── migrations/              # Database migrations
├── .env.example                 # Environment variables template
├── .gitignore                   # Git ignore rules
├── .node-version                # Node.js version (18.18.0)
├── .nvmrc                       # NVM configuration
├── package.json                 # NPM dependencies & scripts
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
├── vite.config.ts               # Vite build configuration
└── README.md                    # This file
```

---

## 🔐 Environment Variables

The application requires the following environment variables to function:

### EmailJS Configuration

Used for contact form email delivery. Sign up at [EmailJS](https://www.emailjs.com/) and create an email service + template.

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_EMAILJS_SERVICE_ID` | EmailJS service identifier | Yes |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS template identifier | Yes |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS public API key | Yes |

**EmailJS Template Variables:**
Your template should include these variables:
- `{{from_name}}` - Sender's name
- `{{from_email}}` - Sender's email
- `{{to_email}}` - Recipient email (info@datacare.co.ke)
- `{{subject}}` - Email subject line
- `{{message}}` - Message content
- `{{company}}` - Company name (optional)
- `{{phone}}` - Phone number (optional)
- `{{service_interest}}` - Service they're interested in

### Supabase Configuration

Used for the AI chatbot backend. Create a project at [Supabase](https://supabase.com/dashboard).

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SUPABASE_URL` | Supabase project URL | Yes |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous/public key | Yes |

**Note:** The Supabase anon key is safe to expose in client-side code. Security is enforced through Row Level Security (RLS) policies on the database.

---

## 🚀 Deployment

### Cloudflare Pages (Recommended)

This project is optimized for deployment on Cloudflare Pages with automatic builds and edge delivery.

#### Setup Instructions

1. **Connect Repository**
   - Go to [Cloudflare Pages Dashboard](https://dash.cloudflare.com/?to=/:account/pages)
   - Click "Create a project"
   - Connect your GitHub account and select the `datacare-ai-nexus` repository

2. **Configure Build Settings**
   ```
   Framework preset: None
   Build command: npm install && npm run build
   Build output directory: dist
   Root directory: /
   Node.js version: 18
   ```

3. **Add Environment Variables**

   In Cloudflare Pages settings, add all variables from your `.env` file:
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

4. **Deploy**
   - Click "Save and Deploy"
   - Cloudflare will build and deploy your site automatically
   - Custom domain can be configured in the Pages settings

#### Why Cloudflare Pages?

- ✅ **Global CDN** - Edge delivery with 200+ data centers
- ✅ **Automatic HTTPS** - Free SSL certificates
- ✅ **Security Headers** - Configured via `public/_headers` file
- ✅ **Instant Rollbacks** - One-click deployment history
- ✅ **Preview Deployments** - Automatic previews for pull requests
- ✅ **Zero Configuration** - Works with `.node-version` file

### Alternative Platforms

The project can also be deployed to:

| Platform | Build Command | Output Directory | Notes |
|----------|---------------|------------------|-------|
| **Vercel** | `npm run build` | `dist` | Add environment variables in project settings |
| **Netlify** | `npm run build` | `dist` | Configure redirects for SPA routing |
| **AWS Amplify** | `npm run build` | `dist` | Use Node.js 18 runtime |
| **GitHub Pages** | `npm run build` | `dist` | Requires base path configuration |

---

## 🔒 Security

This project implements comprehensive security measures:

### Security Headers

Configured in `public/_headers` for Cloudflare Pages:

- **X-Frame-Options: DENY** - Prevents clickjacking attacks
- **X-Content-Type-Options: nosniff** - Prevents MIME sniffing
- **X-XSS-Protection: 1; mode=block** - Enables browser XSS filter
- **Strict-Transport-Security** - Enforces HTTPS with preload
- **Referrer-Policy** - Controls referrer information leakage
- **Permissions-Policy** - Restricts browser features
- **Content-Security-Policy** - Prevents XSS and injection attacks

### Application Security

- ✅ **Input Validation** - Zod schema validation on all forms
- ✅ **Rate Limiting** - Client-side rate limiting with 60s cooldown
- ✅ **HTTPS Only** - All production traffic encrypted
- ✅ **No Secrets in Code** - Environment variables for all credentials
- ✅ **Dependencies Audited** - Zero known vulnerabilities (npm audit)
- ✅ **Security.txt** - RFC 9116 compliant security contact disclosure

### Reporting Security Issues

If you discover a security vulnerability, please email:
- **Primary**: security@datacare.co.ke
- **Alternative**: lewis@datacare.co.ke

Do not disclose security issues publicly until they have been addressed.

---

## 🤝 Contributing

We welcome contributions to improve the Datacare website. Please follow these guidelines:

### Development Workflow

1. **Fork the repository** on GitHub
2. **Clone your fork** locally
   ```bash
   git clone https://github.com/your-username/datacare-ai-nexus.git
   ```
3. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
4. **Make your changes** and test thoroughly
5. **Run linting** to ensure code quality
   ```bash
   npm run lint
   ```
6. **Build the project** to verify no errors
   ```bash
   npm run build
   ```
7. **Commit your changes** with clear commit messages
   ```bash
   git commit -m "Add: Brief description of your changes"
   ```
8. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```
9. **Create a Pull Request** on GitHub

### Code Standards

- Follow the existing TypeScript and React patterns
- Use functional components with hooks
- Maintain type safety - avoid `any` types
- Write descriptive commit messages
- Keep components small and focused
- Add comments for complex logic

### Before Submitting

- ✅ All ESLint checks pass (`npm run lint`)
- ✅ Production build succeeds (`npm run build`)
- ✅ No console errors in development
- ✅ Changes are tested on multiple screen sizes
- ✅ No new security vulnerabilities introduced

---

## 👥 Credits

### Development

**Lewis Githinji** - Lead Developer & Technical Architect
🌐 [https://sirlewis.pages.dev](https://sirlewis.pages.dev)
📧 lewis@datacare.co.ke
📱 +254 784 155 752

Senior Full-Stack Developer & AI Solutions Architect with 12+ years of experience building enterprise solutions across East Africa. Specializes in React, TypeScript, cloud infrastructure, and AI integration.

### Client & Domain Expertise

**Datacare Limited** - IT Solutions & Information Management
🌐 [https://datacare.co.ke](https://datacare.co.ke)
📧 info@datacare.co.ke
📱 +254 784 155 752
📍 Nairobi, Kenya

Established in 2012, Datacare Limited provides enterprise-grade IT solutions to organizations across East Africa, including Microsoft 365, Google Workspace, cybersecurity services, cloud infrastructure, and custom web development.

### Technology Partners

- [Supabase](https://supabase.com/) - Backend infrastructure
- [EmailJS](https://www.emailjs.com/) - Email delivery service
- [Cloudflare](https://www.cloudflare.com/) - Hosting and CDN
- [shadcn/ui](https://ui.shadcn.com/) - Component library

---

## 📄 License

**Copyright © 2025 Datacare Limited. All rights reserved.**

This project is proprietary software owned by Datacare Limited. Unauthorized copying, modification, distribution, or use of this software, via any medium, is strictly prohibited without explicit written permission from Datacare Limited.

For licensing inquiries, contact:
- **Email**: legal@datacare.co.ke
- **Website**: [https://datacare.co.ke/contact](https://datacare.co.ke/contact)

---

## 📞 Support

For technical support or inquiries:

- **Website**: [https://datacare.co.ke](https://datacare.co.ke)
- **Email**: info@datacare.co.ke
- **Phone**: +254 784 155 752
- **Address**: Nairobi, Kenya

**Business Hours**: Monday - Friday, 8:00 AM - 6:00 PM EAT

---

<div align="center">

**Built with ❤️ by [SirLewis](https://sirlewis.pages.dev) for [Datacare Limited](https://datacare.co.ke)**

</div>
