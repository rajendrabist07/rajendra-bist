export const PERSONAL = {
  name: 'Rajendra Bist',
  role: 'Full-Stack Developer',
  tagline: 'Systems-first developer focused on web architecture, backend foundations, performance, and scale.',
  location: 'Nepal',
  email: 'rajendrabist396@gmail.com',
  github: 'https://github.com/rajendrabist07',
  linkedin: 'https://www.linkedin.com/in/rajendra-bist-169926370',
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
    liveUrl: 'https://todo-app-azure-five-70.vercel.app/',
  },
  {
    title: 'WhatsApp Clone',
    status: 'Live' as const,
    description: 'Real-time messaging experience built with WebSocket integration, multi-user sessions, and instant delivery.',
    stack: ['React', 'Node.js', 'Socket.io', 'Tailwind CSS'],
    liveUrl: 'https://whats-app-clone-client-liart.vercel.app/',
  },
  {
    title: 'SocraticAI',
    status: 'In Development' as const,
    description: 'AI-driven learning assistant using Socratic questioning to guide learners through deeper understanding.',
    stack: ['Next.js', 'Gemini API', 'MongoDB'],
    githubUrl: 'https://github.com/rajendrabist07/socratic-ai.git',
  },
]
