import { Github, Mail, Linkedin } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import { PERSONAL } from '@/lib/portfolio-data'

const links = [
  { label: 'GitHub', href: PERSONAL.github, icon: Github },
  { label: 'Email', href: `mailto:${PERSONAL.email}`, icon: Mail },
  { label: 'LinkedIn', href: PERSONAL.linkedin, icon: Linkedin },
]

export default function Contact() {
  return (
    <section id="contact" className="px-6 py-20 md:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeader subtitle="Contact" title="Let's Build Something" />
        <div className="surface-panel rounded-4xl border border-white/10 p-8 shadow-glow">
          <p className="max-w-2xl text-lg text-slate-300">
            Open to full-stack roles, freelance projects, and collaborations.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {links.map(link => {
              const Icon = link.icon
              return (
                <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="group rounded-3xl border border-white/10 bg-white/5 px-6 py-5 transition hover:border-white/20 hover:bg-white/10">
                  <div className="flex items-center gap-4">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#1f1f2c] text-indigo-300 transition group-hover:bg-indigo-500 group-hover:text-white">
                      <Icon size={18} />
                    </span>
                    <div>
                      <p className="text-base font-semibold text-white">{link.label}</p>
                      <p className="mt-1 text-sm text-slate-400">{link.href.replace(/https?:\/\//, '')}</p>
                    </div>
                  </div>
                </a>
              )
            })}
          </div>
          <p className="mt-10 text-sm text-slate-500">© 2026 Rajendra Bist. Built with Next.js &amp; ☕</p>
        </div>
      </div>
    </section>
  )
}
