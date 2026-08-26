export const PERSONAL = {
  name: 'Rajendra Bist',
  role: 'Backend Developer',
  tagline: 'Backend developer building full-stack products with systems-first architecture, database integrity, and production AI integration.',
  location: 'Nepal',
  email: 'rajendrabist396@gmail.com',
  github: 'https://github.com/rajendrabist07',
  linkedin: 'https://www.linkedin.com/in/rajendra-bist-169926370',
  resumeUrl: '/Resume/resume.pdf',
}

export const FEATURED_LINKS = {
  socraticAi: 'https://socratic-ai-tau.vercel.app/',
}

export const EDUCATION = [
  {
    school: 'Indira Gandhi National Open University',
    degree: 'Bachelor of Technology (B.Tech)',
    timeframe: 'Ongoing',
  },
  {
    school: 'Vcare Technical Institute',
    degree: 'Full-Stack Web Development Training',
    timeframe: 'Completed 2025',
  },
]

export const CREDENTIALS = [
  {
    institution: 'Vcare Technical Institute',
    title: 'Full-Stack Web Development Training',
    credentialType: 'Professional Engineering Training',
    timeframe: 'Completed 2025',
    status: 'Completed' as const,
    description:
      'Rigorous practical training across modern full-stack web architecture, API engineering, database schema design, and production deployment patterns.',
    topics: ['Node.js & Express.js', 'React & Next.js', 'PostgreSQL & MongoDB', 'REST APIs & WebSockets', 'System Design'],
  },
  {
    institution: 'Indira Gandhi National Open University (IGNOU)',
    title: 'Bachelor of Technology (B.Tech)',
    credentialType: 'Undergraduate Degree in Computer Science',
    timeframe: 'Ongoing',
    status: 'In Progress' as const,
    description:
      'Theoretical foundations and systems engineering coursework covering algorithms, operating systems, networking, database architecture, and software principles.',
    topics: ['Data Structures & Algorithms', 'Database Management Systems', 'Computer Networks', 'Operating Systems', 'Software Engineering'],
  },
]

export const EXPERIENCE = [
  {
    role: '[REPLACE WITH REAL ROLE: e.g. Full-Stack / Backend Engineer]',
    company: '[REPLACE WITH REAL COMPANY / CLIENT: e.g. Freelance / Stealth Project]',
    timeframe: '[REPLACE WITH DATES: e.g. 2024 — Present]',
    location: 'Remote, Nepal',
    description:
      '[REPLACE WITH ROLE OVERVIEW: Architected scalable backend services, designed normalized database schemas, and built automated full-stack workflows with production AI tooling.]',
    achievements: [
      '[REPLACE: Engineered high-throughput API endpoints with strict validation guardrails and error boundaries]',
      '[REPLACE: Designed and deployed Supabase PostgreSQL databases with pgvector embeddings for RAG pipelines]',
      '[REPLACE: Optimized client-server synchronization reducing real-time WebSocket latency]',
    ],
    stack: ['Node.js', 'Next.js', 'PostgreSQL', 'Supabase', 'Docker', 'TypeScript'],
  },
  {
    role: '[REPLACE WITH REAL ROLE: e.g. Software Engineering Intern / Junior Developer]',
    company: '[REPLACE WITH REAL COMPANY / CLIENT: e.g. Tech Internship / Client Project]',
    timeframe: '[REPLACE WITH DATES: e.g. 2023 — 2024]',
    location: 'Nepal',
    description:
      '[REPLACE WITH SCOPE: Developed full-stack web modules, implemented secure JWT authentication flows, and maintained responsive user interfaces.]',
    achievements: [
      '[REPLACE: Implemented resilient token-refresh interceptors and protected API routing]',
      '[REPLACE: Built reusable component libraries with modular Tailwind CSS design tokens]',
    ],
    stack: ['React', 'JavaScript', 'MongoDB', 'Express.js', 'REST APIs', 'Git'],
  },
]

export const SKILLS = [
  {
    category: 'Frontend',
    items: ['React', 'Next.js 15', 'TypeScript', 'Tailwind CSS', 'HTML5', 'CSS3'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Express.js', 'REST APIs', 'Socket.io', 'Zod'],
  },
  {
    category: 'Database',
    items: ['MongoDB', 'Mongoose', 'PostgreSQL', 'Supabase'],
  },
  {
    category: 'Tools & DevOps',
    items: ['Git', 'GitHub', 'Vercel', 'Railway', 'Docker', 'Clerk'],
  },
  {
    category: 'AI & APIs',
    items: ['Gemini API', 'Groq API', 'Vercel AI SDK', 'LangChain.js'],
  },
]

export const PROJECTS = [
  {
    title: 'EduMethod AI',
    status: 'Live' as const,
    description: 'The Problem: Static syllabi and textbooks fail to adapt to individual retention curves, causing rapid knowledge decay. The Solution: Built a cognitive learning workspace featuring a Persistent Learner Memory Engine, pgvector RAG grounding on student notes, an independent Verification Audit layer, and SM-2 spaced repetition roadmaps. Key Decision: Chose Supabase pgvector over external vector DBs to keep semantic embeddings inside transactional PostgreSQL, reducing query hops and coupling user state with knowledge chunks.',
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'Clerk Auth', 'Supabase (pgvector)', 'Upstash Redis', 'Groq Model Router', 'Gemini 2.5 Flash API'],
    imageUrl: '/images/edumethod-innovative.png',
    liveUrl: 'https://edumethod-ai.vercel.app',
    githubUrl: 'https://github.com/rajendrabist07/edumethod-ai',
  },
  {
    title: 'DevGuard AI',
    status: 'Live' as const,
    description: 'The Problem: Traditional AI code reviewers hallucinate on raw diffs, crash on rate limits, and output generic comments without verified proof. The Solution: Engineered an autonomous GitHub App agent that executes AST static linters, scans OSV.dev CVE databases, and runs test suites to collect empirical evidence before generating 1-click inline PR patches. Key Decision: Implemented a 3-tier fallback engine (Groq Llama 3.3 70B -> Gemini 2.5 Flash -> Deterministic Engine) with a 5-iteration cap to guarantee 100% review uptime.',
    stack: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'Supabase', 'Groq Llama 3.3', 'Gemini 2.5 Flash', 'GitHub App'],
    imageUrl: '/images/dev-guard-ai.png',
    liveUrl: 'https://dev-guard-ai.vercel.app/',
    githubUrl: 'https://github.com/rajendrabist07/dev-guard-ai',
  },
  {
    title: 'SocraticAI',
    status: 'Live' as const,
    description: 'The Problem: Generic AI assistants give immediate answers, depriving learners of the cognitive reasoning needed for deep conceptual mastery. The Solution: Developed a guided learning assistant that enforces the Socratic questioning method with saved sessions for structured concept exploration. Key Decision: Locked model temperature to 0.4-0.6 and applied strict negative system constraints to prevent solution giveaways.',
    stack: ['Next.js', 'Gemini API', 'MongoDB', 'Node.js', 'Tailwind CSS'],
    imageUrl: '/images/socratic-ai.svg',
    liveUrl: FEATURED_LINKS.socraticAi,
    githubUrl: 'https://github.com/rajendrabist07/socratic-ai.git',
  },
]
