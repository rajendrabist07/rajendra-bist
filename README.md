# Rajendra Bist — Developer Portfolio

A production-ready portfolio built with **Next.js 15**, **Tailwind CSS v4**, **Framer Motion**, and an AI-powered chat widget backed by **Google Gemini** and **MongoDB**.

## Overview

This portfolio highlights Rajendra Bist's core strengths:

- Senior-minded full-stack development
- Backend architecture and API systems
- AI-integrated product thinking
- Real project showcases with live deployment status
- A chat agent that answers questions about Rajendra only

## Tech stack

- Next.js 15 App Router
- Tailwind CSS v4
- TypeScript
- Framer Motion
- MongoDB Atlas
- Mongoose
- Google Gemini API
- Vercel deployment

## Project structure

```
rajendra-portfolio/
├── app/
│   ├── api/chat/route.ts
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Navbar.tsx
│   ├── sections/
│   │   ├── About.tsx
│   │   ├── ChatAgent.tsx
│   │   ├── Contact.tsx
│   │   ├── Hero.tsx
│   │   ├── Projects.tsx
│   │   └── Skills.tsx
│   └── ui/
│       ├── ProjectCard.tsx
│       ├── SectionHeader.tsx
│       ├── SkillBadge.tsx
│       └── StatusBadge.tsx
├── lib/
│   ├── gemini.ts
│   ├── mongodb.ts
│   ├── portfolio-context.ts
│   └── portfolio-data.ts
├── models/ChatMessage.ts
├── public/og-image.svg
├── styles/globals.css
├── next.config.ts
├── tailwind.config.ts
├── postcss.config.js
├── package.json
└── tsconfig.json
```

## Local setup

```bash
git clone https://github.com/rajendrabist07/rajendraportfolio.git
cd rajendrabist07
npm install
cp .env.example .env.local
# Fill .env.local with your MongoDB and Gemini secrets
npm run dev
```

## Environment variables

Create `.env.local` with:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio-rb?retryWrites=true&w=majority&appName=Cluster0
GEMINI_API_KEY=your_gemini_api_key_here
```

> Never commit `.env.local`.

## Deployment checklist

- Add `MONGODB_URI` and `GEMINI_API_KEY` in Vercel project settings
- Allow MongoDB Atlas network access from `0.0.0.0/0`
- Set `NODE_ENV=production` in Vercel environment settings
- Deploy the repository from the `main` branch

## Features

- Hero section with gradient role text and CTA buttons
- About section with education timeline
- Categorized skills grid
- Project cards with live and in-development status badges
- Floating AI chat widget powered by Gemini
- MongoDB chat logging
- Responsive mobile navigation and layout
- Open Graph metadata for social sharing

## Useful commands

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## License

MIT
