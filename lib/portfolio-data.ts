export const PERSONAL = {
  name: 'Rajendra Bist',
  role: 'Full-Stack Developer',
  tagline: 'Systems-first developer focused on web architecture, backend foundations, performance, and scale.',
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
    description: 'A production-oriented, AI-powered learning workspace designed to outclass generic chat interfaces. Engineered with a Persistent Learner Memory Engine, RAG grounding on student materials via pgvector, an independent Verification Audit layer, and an empirical Outcome Data Flywheel to dynamically optimize teaching strategies.',
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'Clerk Auth', 'Supabase (pgvector)', 'Upstash Redis', 'Groq Model Router', 'Gemini 2.5 Flash API'],
    imageUrl: '/images/edumethod-innovative.png',
    liveUrl: 'https://edumethod-ai.vercel.app',
    githubUrl: 'https://github.com/rajendrabist07/edumethod-ai',
  },
  {
    title: 'SocraticAI',
    status: 'Live' as const,
    description: 'Completed AI learning assistant that uses Socratic questioning, guided chat, and saved learning sessions to help learners reason through concepts.',
    stack: ['Next.js', 'Gemini API', 'MongoDB', 'Vercel'],
    imageUrl: '/images/socratic-ai.svg',
    liveUrl: FEATURED_LINKS.socraticAi,
    githubUrl: 'https://github.com/rajendrabist07/socratic-ai.git',
  },
  {
    title: 'WhatsApp Clone',
    status: 'Live' as const,
    description: 'Real-time WhatsApp-style MERN chat application featuring user search, protected sessions, JWT refresh-token retries, and instant Socket.io message delivery.',
    stack: ['React 19', 'Vite 8', 'Node.js', 'Socket.io', 'Tailwind CSS', 'React Router 7'],
    imageUrl: '/images/whatsapp-clone.svg',
    liveUrl: 'https://whats-app-clone-client-liart.vercel.app/',
    githubUrl: 'https://github.com/rajendrabist07/whats-app-clone-client-',
  },
]
