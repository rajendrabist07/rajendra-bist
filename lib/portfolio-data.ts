export const PERSONAL = {
  name: 'Rajendra Bist',
  role: 'Full-Stack Developer | Backend-Focused Engineering & Production AI Systems',
  tagline: 'Full-stack developer from Nepal building typed React interfaces, scalable APIs, database-driven products, RAG pipelines, and production AI integrations.',
  location: 'Nepal',
  email: 'rajendrabist396@gmail.com',
  github: 'https://github.com/rajendrabist07',
  linkedin: 'https://www.linkedin.com/in/rajendra-bist-169926370',
  facebook: 'https://www.facebook.com/rajendra.bist.302275',
  resumeUrl: '/Resume/resume.pdf',
}

export const FEATURED_LINKS = {
  socraticAi: 'https://socratic-ai-tau.vercel.app/',
}

export const EDUCATION = [
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
    institution: 'Project-Based Engineering Practice',
    title: 'Continuous Learning',
    credentialType: 'Applied Self-Directed Learning',
    timeframe: 'Ongoing',
    status: 'Ongoing' as const,
    description:
      'Skills developed by building and shipping production-focused projects such as DevGuard AI, EduMethod AI, and SocraticAI, with learning driven by real product constraints rather than formal coursework.',
    topics: ['Production Projects', 'API Contracts', 'Frontend State', 'Database Design', 'AI Integration'],
  },
]

export const EXPERIENCE = [
  {
    role: 'Independent Full-Stack & AI Systems Developer',
    company: 'Project-Based Engineering',
    timeframe: '2024 - Present',
    location: 'Remote, Nepal',
    description:
      'Designing and shipping production-oriented full-stack products with backend-first architecture, database integrity, authentication boundaries, and AI-assisted workflows.',
    achievements: [
      'Built EduMethod AI with learner memory, pgvector RAG grounding, independent verification logic, and spaced-repetition workflows.',
      'Engineered DevGuard AI as a GitHub App review agent using static analysis, CVE checks, test evidence, and multi-model fallback routing.',
      'Developed SocraticAI with constrained LLM behavior, saved learning sessions, and structured guided-question flows.',
    ],
    stack: ['Node.js', 'Next.js', 'TypeScript', 'PostgreSQL', 'Supabase', 'MongoDB', 'Groq', 'Gemini API'],
  },
  {
    role: 'Full-Stack Web Development Trainee',
    company: 'Vcare Technical Institute',
    timeframe: 'Completed 2025',
    location: 'Nepal',
    description:
      'Completed practical full-stack engineering training focused on frontend delivery, backend API design, database modeling, authentication flows, and deployment patterns.',
    achievements: [
      'Implemented REST API modules, protected routes, database schemas, and reusable React interface patterns.',
      'Practiced production workflow fundamentals including Git, environment variables, deployment checks, and debugging discipline.',
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
    description: 'Adaptive learning platform with learner memory, pgvector RAG grounding, verification audits, and SM-2 spaced repetition.',
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'Clerk Auth', 'Supabase (pgvector)', 'Upstash Redis', 'Groq Model Router', 'Gemini 2.5 Flash API'],
    imageUrl: '/images/edumethod-ai-card.svg',
    liveUrl: 'https://edumethod-ai.vercel.app',
    githubUrl: 'https://github.com/rajendrabist07/edumethod-ai',
    frontendImplementation:
      'Built the learning workspace around authenticated Next.js/React flows that connect upload, memory, verification, and spaced-repetition states to typed backend responses.',
  },
  {
    title: 'DevGuard AI',
    status: 'Live' as const,
    description: 'Autonomous GitHub review agent using AST checks, CVE scans, test evidence, and multi-model fallback routing.',
    stack: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'Supabase', 'Groq Llama 3.3', 'Gemini 2.5 Flash', 'GitHub App'],
    imageUrl: '/images/devguard-ai-card.svg',
    liveUrl: 'https://dev-guard-ai.vercel.app/',
    githubUrl: 'https://github.com/rajendrabist07/dev-guard-ai',
    frontendImplementation:
      'Designed the dashboard experience around traceable review states, exposing agent steps, PR simulation, and review evidence without hiding the backend verification flow.',
  },
  {
    title: 'SocraticAI',
    status: 'Live' as const,
    description: 'Guided learning assistant that uses constrained LLM behavior, saved sessions, and Socratic questioning flows.',
    stack: ['Next.js', 'Gemini API', 'MongoDB', 'Node.js', 'Tailwind CSS'],
    imageUrl: '/images/socratic-ai-card.svg',
    liveUrl: FEATURED_LINKS.socraticAi,
    githubUrl: 'https://github.com/rajendrabist07/socratic-ai.git',
    frontendImplementation:
      'Shaped the chat interface around saved learning sessions and guided-question pacing so the UI reinforces Socratic learning instead of direct answer delivery.',
  },
]
