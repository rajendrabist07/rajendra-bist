import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react'
import { PERSONAL } from '@/lib/portfolio-data'

const explore = [
  ['About', '#about'],
  ['Skills', '#skills'],
  ['Projects', '#projects'],
  ['Experience', '#experience'],
  ['Resume', PERSONAL.resumeUrl],
]

const socials = [
  [Github, PERSONAL.github, 'GitHub'],
  [Linkedin, PERSONAL.linkedin, 'LinkedIn'],
  [Mail, `mailto:${PERSONAL.email}`, 'Email'],
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 px-6 py-16 md:px-8">
      <div className="star-field opacity-40" />
      <div className="relative mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr_1fr]">
          <div>
            <a href="#home" className="text-2xl font-black tracking-normal text-white">
              RB<span className="text-sky-400">.</span>
            </a>
            <p className="mt-5 max-w-sm leading-7 text-slate-500">
              Backend developer in Nepal building scalable APIs, RAG pipelines, and AI-integrated products.
            </p>
            <p className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-sky-300">
              <span className="h-2.5 w-2.5 rounded-full bg-sky-400" />
              Open to Work
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-white">Explore</h2>
            <div className="mt-5 flex flex-col gap-3">
              {explore.map(([label, href]) => (
                <a key={label} href={href} className="w-fit text-slate-500 transition hover:text-white">
                  {label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-white">Get in touch</h2>
            <a href={`mailto:${PERSONAL.email}`} className="mt-5 block break-words text-slate-500 transition hover:text-white">
              {PERSONAL.email}
            </a>
            <p className="mt-3 text-slate-600">UTC+5:45</p>
            <div className="mt-6 flex gap-4">
              {socials.map(([Icon, href, label]) => (
                <a
                  key={label as string}
                  href={href as string}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label as string}
                  className="text-slate-500 transition hover:text-sky-300"
                >
                  <Icon size={22} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Rajendra Bist. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            <span>Built with Next.js</span>
            <span>Deployed on Vercel</span>
            <a href="#home" className="inline-flex items-center gap-1 transition hover:text-white">
              Back to top <ArrowUp size={14} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
