import { ArrowUp, Github, Linkedin, Mail, Facebook } from 'lucide-react'
import { PERSONAL } from '@/lib/portfolio-data'
import Container from '@/components/ui/Container'

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
  [Facebook, PERSONAL.facebook, 'Facebook'],
  [Mail, `mailto:${PERSONAL.email}`, 'Email'],
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 py-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(1,138,190,0.12),transparent_45%)]" />
      <Container className="relative">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr_1fr]">
          <div>
            <a href="#home" className="text-2xl font-black tracking-normal text-white transition-colors duration-200 ease-out hover:text-[--accent-primary]">
              RB<span className="text-[--accent-primary]">.</span>
            </a>
            <p className="mt-5 max-w-sm leading-7 text-slate-500">
              Full-stack developer in Nepal building typed interfaces, scalable APIs, RAG pipelines, and AI-integrated products.
            </p>
            <p className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[--accent-primary]">
              <span className="h-2.5 w-2.5 rounded-full bg-[--accent-primary]" />
              Open to Work
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-white">Explore</h2>
            <div className="mt-5 flex flex-col gap-3">
              {explore.map(([label, href]) => (
                <a key={label} href={href} className="w-fit text-slate-500 transition-colors duration-200 ease-out hover:text-white">
                  {label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-white">Get in touch</h2>
            <a href={`mailto:${PERSONAL.email}`} className="mt-5 block break-words text-slate-500 transition-colors duration-200 ease-out hover:text-white">
              {PERSONAL.email}
            </a>
            <p className="mt-3 text-slate-600">UTC+5:45</p>
            <div className="mt-6 flex gap-3">
              {socials.map(([Icon, href, label]) => (
                <a
                  key={label as string}
                  href={href as string}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label as string}
                  className="premium-button-secondary inline-flex h-10 w-10 items-center justify-center rounded-xl text-slate-400 transition-all duration-200 ease-out hover:text-[--accent-primary] hover:scale-105 hover:shadow-[0_0_15px_rgba(1,138,190,0.25)]"
                >
                  <Icon size={18} />
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
            <a href="#home" className="inline-flex items-center gap-1 transition-colors duration-200 ease-out hover:text-white">
              Back to top <ArrowUp size={14} />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  )
}
