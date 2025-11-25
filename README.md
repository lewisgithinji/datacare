# Datacare Limited - Corporate Website

Official website for Datacare Limited, a leading East African IT services company providing Microsoft 365, Google Workspace, cybersecurity, cloud solutions, and web design services.

**Live URL**: https://datacare.co.ke

## Technology Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS with shadcn/ui components
- **Routing**: React Router v6
- **Email**: EmailJS integration
- **Forms**: React Hook Form with Zod validation

## Development

### Prerequisites

- Node.js 18+ and npm
- Git

### Local Setup

```bash
# Clone the repository
git clone https://github.com/lewisgithinji/datacare.git

# Navigate to project directory
cd datacare

# Install dependencies
npm install

# Start development server
npm run dev
```

The development server will start at http://localhost:8080

### Build

```bash
# Production build
npm run build

# Preview production build locally
npm run preview
```

## Deployment

### Cloudflare Pages

This project is configured for deployment on Cloudflare Pages:

1. **Connect Repository**: Link your GitHub repository to Cloudflare Pages
2. **Build Settings**:
   - Framework preset: `None`
   - Build command: `npm install && npm run build`
   - Build output directory: `dist`
   - Root directory: `/`
   - Node version: `18`
3. **Environment Variables**: Add your EmailJS credentials in Cloudflare Pages settings:
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`

**Note**: The `.node-version` file ensures npm is used instead of Bun for consistent builds.

### Other Platforms

The project can also be deployed to:
- Vercel
- Netlify
- AWS Amplify
- GitHub Pages

## Project Structure

```
datacare/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page components
│   ├── lib/            # Utilities and helpers
│   └── main.tsx        # Application entry point
├── public/             # Static assets
└── dist/               # Build output
```

## License

© 2025 Datacare Limited. All rights reserved.
