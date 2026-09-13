import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";
import StatusBadge from "./StatusBadge";
import SkillBadge from "./SkillBadge";

export type ProjectCardProps = {
  title: string;
  status: "Live" | "In Development";
  description: string;
  stack: string[];
  imageUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const hoverVariants = {
  rest: { y: 0 },
  hover: { y: -8 },
};

const borderVariants = {
  rest: { borderColor: "rgba(255, 255, 255, 0.1)" },
  hover: { borderColor: "rgba(224, 185, 166, 0.42)" },
};

export default function ProjectCard({
  title,
  status,
  description,
  stack,
  imageUrl,
  liveUrl,
  githubUrl,
}: ProjectCardProps) {
  const visibleStack = stack.slice(0, 5);
  const hiddenStackCount = stack.length - visibleStack.length;

  return (
    <motion.article
      variants={cardVariants}
      initial="rest"
      whileHover="hover"
      className="project-card group relative flex h-full flex-col overflow-hidden rounded-[1.65rem] p-5 transition-all duration-200 ease-out"
    >
      <motion.div
        variants={borderVariants}
        className="absolute inset-0 rounded-[1.65rem] border transition-colors duration-200 ease-out pointer-events-none"
        style={{ borderWidth: "1px" }}
      />

      {imageUrl ? (
        <motion.div
          variants={hoverVariants}
          className="relative aspect-[16/10] overflow-hidden rounded-[1.15rem] border border-[--border] bg-[--bg-code]"
        >
          <Image
            src={imageUrl}
            alt={`Rajendra Bist — ${title} project preview and architecture`}
            fill
            sizes="(min-width: 1024px) 360px, 92vw"
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
          />
        </motion.div>
      ) : null}

      <motion.div
        variants={hoverVariants}
        className="relative mt-5 flex flex-1 flex-col"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-slate-600">
              Featured Build
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-white">{title}</h3>
          </div>
          <StatusBadge status={status} />
        </div>

        <p className="mt-4 min-h-[72px] text-sm leading-6 text-slate-400">
          {description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {visibleStack.map((item) => (
            <SkillBadge key={item} label={item} />
          ))}
          {hiddenStackCount > 0 ? (
            <SkillBadge label={`+${hiddenStackCount}`} />
          ) : null}
        </div>

        <div className="mt-auto flex flex-wrap gap-3 pt-6">
          {liveUrl ? (
            <motion.a
              href={liveUrl}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.03 }}
              className="premium-button-primary inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold outline-none transition-all duration-200 ease-out"
            >
              Live Demo <ExternalLink size={15} />
            </motion.a>
          ) : null}
          {githubUrl ? (
            <motion.a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.03 }}
              className="premium-button-secondary inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ease-out"
            >
              GitHub <Github size={15} />
            </motion.a>
          ) : null}
        </div>
      </motion.div>
    </motion.article>
  );
}
