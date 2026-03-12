import React, { Suspense, lazy } from 'react'
import { useTheme } from './hooks/useTheme'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Footer from './components/Footer'


const About = lazy(() => import('./components/About'))
const Skills = lazy(() => import('./components/Skills'))
const Projects = lazy(() => import('./components/Projects'))
const CaseStudy = lazy(() => import('./components/CaseStudy'))
const Philosophy = lazy(() => import('./components/Philosophy'))
const Contact = lazy(() => import('./components/Contact'))


function SectionSkeleton() {
  return (
    <div style={{
      height: '400px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        width: '40px',
        height: '40px',
        border: '2px solid var(--border-subtle)',
        borderTopColor: 'var(--accent-cyan)',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

export default function App() {
  const { theme, toggleTheme } = useTheme()

  return (
    <>
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main>

        <Hero />

        <div className="divider" />

        <Suspense fallback={<SectionSkeleton />}>
          <About />
        </Suspense>

        <div className="divider" />

        <Suspense fallback={<SectionSkeleton />}>
          <Skills />
        </Suspense>

        <div className="divider" />

        <Suspense fallback={<SectionSkeleton />}>
          <Projects />
        </Suspense>

        <div className="divider" />

        <Suspense fallback={<SectionSkeleton />}>
          <CaseStudy />
        </Suspense>

        <div className="divider" />

        <Suspense fallback={<SectionSkeleton />}>
          <Philosophy />
        </Suspense>

        <div className="divider" />

        <Suspense fallback={<SectionSkeleton />}>
          <Contact />
        </Suspense>
      </main>

      <Footer />
    </>
  )
}
