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
    school: 'Vcare Technical Institute',
    degree: 'Full-Stack Web Development Training',
    timeframe: 'Completed',
  },
]

export const SKILLS = [
  {
    category: 'Frontend',
    items: ['React', 'Next.js 15', 'TypeScript', 'Tailwind CSS', 'HTML5', 'CSS3'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Express.js', 'REST APIs', 'Socket.io'],
  },
  {
    category: 'Database',
    items: ['MongoDB', 'Mongoose', 'PostgreSQL'],
  },
  {
    category: 'Tools & DevOps',
    items: ['Git', 'GitHub', 'Vercel', 'Railway', 'Docker'],
  },
  {
    category: 'AI & APIs',
    items: ['Gemini API', 'Vercel AI SDK', 'LangChain.js'],
  },
]

export const PROJECTS = [
  {
    title: 'Todo App',
    status: 'Live' as const,
    description: 'Task management app with clean CRUD operations, responsive state handling, and polished UI execution.',
    stack: ['Next.js', 'Tailwind CSS', 'Vercel'],
    imageUrl: '/images/todo-app.svg',
    liveUrl: 'https://todo-app-azure-five-70.vercel.app/',
    githubUrl: 'https://github.com/rajendrabist07/todo-app-frontend',
  },
  {
    title: 'WhatsApp Clone',
    status: 'Live' as const,
    description: 'Real-time messaging experience built with WebSocket integration, multi-user sessions, and instant delivery.',
    stack: ['React', 'Node.js', 'Socket.io', 'Tailwind CSS'],
    imageUrl: '/images/whatsapp-clone.svg',
    liveUrl: 'https://whats-app-clone-client-liart.vercel.app/',
    githubUrl: 'https://github.com/rajendrabist07/whats-app-clone-client-',
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
]
