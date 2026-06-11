import { motion } from 'framer-motion'
import StatusBadge from './StatusBadge'
import SkillBadge from './SkillBadge'

export type ProjectCardProps = {
  title: string
  status: 'Live' | 'In Development'
  description: string
  stack: string[]
  liveUrl?: string
  githubUrl?: string
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

const hoverVariants = {
  rest: { y: 0 },
  hover: { y: -8 },
}

const borderVariants = {
  rest: { borderColor: 'rgba(255, 255, 255, 0.1)' },
  hover: { borderColor: 'rgba(99, 102, 241, 0.3)' },
}

export default function ProjectCard({ title, status, description, stack, liveUrl, githubUrl }: ProjectCardProps) {
  return (
    <motion.article
      variants={cardVariants}
      initial="rest"
      whileHover="hover"
      className="surface-panel group flex h-full flex-col justify-between gap-6 rounded-3xl p-6 shadow-glow transition border border-white/10"
    >
      <motion.div
        variants={borderVariants}
        className="absolute inset-0 rounded-3xl border transition pointer-events-none"
        style={{ borderWidth: '1px' }}
      />
      
      <motion.div variants={hoverVariants} className="relative space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <StatusBadge status={status} />
        </div>
        <p className="text-slate-300">{description}</p>
      </motion.div>

      <motion.div variants={hoverVariants} className="relative space-y-4">
        <div className="flex flex-wrap gap-2">
          {stack.map(item => (
            <SkillBadge key={item} label={item} />
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          {liveUrl ? (
            <motion.a
              href={liveUrl}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05 }}
              className="inline-flex rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white outline-none ring-indigo-500/20 transition hover:bg-indigo-500"
            >
              Live Demo ↗
            </motion.a>
          ) : null}
          {githubUrl ? (
            <motion.a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05 }}
              className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-white/20 hover:bg-white/10"
            >
              GitHub ↗
            </motion.a>
          ) : null}
        </div>
      </motion.div>
    </motion.article>
  )
}
