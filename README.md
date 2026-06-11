# Rajendra Bist Portfolio

Production-grade personal portfolio for **Rajendra Bist**, a systems-first full-stack developer focused on backend foundations, web architecture, performance, scale, and AI-integrated products.

The project is built as a single **Next.js 15 App Router** application with serverless API routes for contact messages and an AI portfolio assistant powered by Gemini.

## Highlights

- Systems-first hero section with animated positioning statement and professional profile image
- About section focused on full-stack training, backend thinking, and product engineering judgment
- Skills section with categorized tool groups and icon-supported badges
- Project showcase for Todo App, WhatsApp Clone, and SocraticAI
- Contact form that stores messages in MongoDB
- Floating AI agent that streams Gemini responses and logs conversations
- SEO metadata, sitemap, robots config, PWA manifest, and Open Graph image
- Vercel-ready deployment with no separate backend server

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 15 App Router |
| UI | React 18, TypeScript, Tailwind CSS v4 |
| Animation | Framer Motion |
| Icons | Lucide React |
| API | Next.js Route Handlers |
| Database | MongoDB Atlas, Mongoose |
| AI | Google Gemini API |
| Deployment | Vercel |

## Project Structure

```text
rajendra-bist/
├── app/
│   ├── api/
│   │   ├── chat/route.ts        # Gemini streaming portfolio assistant
│   │   └── contact/route.ts     # Contact form persistence
│   ├── layout.tsx               # Metadata, viewport, global shell
│   ├── page.tsx                 # Main page assembly
│   ├── providers.tsx            # Client provider boundary
│   └── sitemap.ts               # Sitemap generation
├── components/
│   ├── Navbar.tsx
│   ├── sections/
│   │   ├── About.tsx
│   │   ├── ChatAgent.tsx
│   │   ├── Contact.tsx
│   │   ├── Hero.tsx
│   │   ├── Process.tsx
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
├── models/
│   ├── ChatMessage.ts
│   └── ContactMessage.ts
├── public/
│   ├── images/rajendra-bist.jpeg
│   ├── favicon.svg
│   ├── manifest.json
│   ├── og-image.svg
│   └── robots.txt
├── styles/globals.css
├── next.config.ts
├── package.json
└── tailwind.config.ts
```

## Environment Variables

Create `.env.local` for local development:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio-rb?retryWrites=true&w=majority&appName=Cluster0
GEMINI_API_KEY=your_gemini_api_key_here
```

Do not commit `.env.local`. Add the same variables in Vercel Project Settings before deployment.

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production Build

```bash
npm run build
npm run preview
```

Important: do not run `npm run dev` and `npm run build` at the same time locally. Both write to `.next`, which can corrupt the local development cache.

## API Routes

### `POST /api/contact`

Stores contact form submissions in MongoDB.

Request body:

```json
{
  "name": "Hiring Manager",
  "email": "person@example.com",
  "message": "Project or role details..."
}
```

### `POST /api/chat`

Streams Gemini responses for the portfolio AI assistant.

Request body:

```json
{
  "message": "What projects has Rajendra built?",
  "history": [],
  "sessionId": "optional-session-id"
}
```

The route returns plain text streaming chunks and includes `X-Session-Id` in the response headers.

## Deployment

1. Push the repository to GitHub.
2. Import the repository in Vercel.
3. Add `MONGODB_URI` and `GEMINI_API_KEY` in Vercel Environment Variables.
4. Deploy from the `main` branch.

Recommended Vercel settings:

- Framework Preset: Next.js
- Build Command: `npm run build`
- Install Command: `npm install`
- Output Directory: leave default

MongoDB Atlas must allow network access for Vercel. For a portfolio project, `0.0.0.0/0` is acceptable if credentials are strong and stored only in environment variables.

## Featured Projects

- **Todo App**: task management app with CRUD flow and clean UI delivery
- **WhatsApp Clone**: real-time messaging with Socket.io and full-stack integration
- **SocraticAI**: AI learning assistant focused on Socratic dialogue and LLM product thinking

## Quality Checklist

- `npm run build` passes
- Homepage returns `200 OK`
- `/api/contact` stores messages in MongoDB
- `/api/chat` streams Gemini responses
- Environment variables are configured in Vercel
- `.env.local` remains uncommitted

## Notes for Maintainers

- Portfolio content is centralized in `lib/portfolio-data.ts`.
- AI assistant knowledge is centralized in `lib/portfolio-context.ts`.
- Database connection reuse is handled in `lib/mongodb.ts`.
- The previous Vite/React legacy source was removed because the production app is now fully Next.js.

## License

MIT
