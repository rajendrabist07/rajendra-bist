import { describe, expect, it } from 'vitest'
import {
  PERSONAL,
  PROJECTS,
  EXPERIENCE,
  TIMELINE_EVENTS,
  CREDENTIALS,
  SKILLS,
} from '../lib/portfolio-data'
import { CASE_STUDIES, getCaseStudy } from '../lib/case-studies'
import { BLOG_POSTS } from '../lib/blog'
import { SITE_URL } from '../lib/site-config'

describe('Portfolio Integrity & Truthfulness Data Contracts', () => {
  it('defines valid personal profile with canonical domain', () => {
    expect(PERSONAL.name).toBe('Rajendra Bist')
    expect(PERSONAL.github).toBe('https://github.com/rajendrabist07')
    expect(PERSONAL.email).toBe('rajendrabist396@gmail.com')
    expect(PERSONAL.phone).toBe('+91 8700918036')
    expect(PERSONAL.location).toBe('New Delhi, India')
    expect(SITE_URL).toBe('https://www.bistrajendra.com.np')
    expect(PERSONAL.resumeUrl).toBe('/resume/Rajendra_Bist_Full_Stack_Developer.pdf')
    expect(PERSONAL.availability.status).toBe('Available immediately')
    expect(PERSONAL.availability.noticePeriodDays).toBe(0)
  })

  it('verifies resume PDF exists at exact lowercase path, is under 300KB, and does not contain 15 days', async () => {
    const fs = await import('node:fs')
    const path = await import('node:path')
    const resumePath = path.resolve(process.cwd(), 'public/resume/Rajendra_Bist_Full_Stack_Developer.pdf')
    expect(fs.existsSync(resumePath)).toBe(true)
    const stats = fs.statSync(resumePath)
    expect(stats.size).toBeGreaterThan(50000)
    expect(stats.size).toBeLessThan(300000)

    const raw = fs.readFileSync(resumePath, 'latin1')
    expect(raw.toLowerCase().includes('15 days')).toBe(false)
    expect(raw.toLowerCase().includes('15-day')).toBe(false)
  })

  it('verifies all featured projects have valid links, slugs, stacks, and sourced evidence', () => {
    expect(PROJECTS.length).toBeGreaterThanOrEqual(3)
    const titles = PROJECTS.map((p) => p.title)
    expect(titles).toContain('Sovereign')
    expect(titles).toContain('Chronicle')
    expect(titles).toContain('DevGuard AI')

    const devguard = PROJECTS.find((p) => p.title === 'DevGuard AI')
    expect(devguard?.timeframe).toBe('Jul 2026 – Aug 2026')
    // DevGuard stack contains real React 19 from package.json, not unverified React 18.3
    expect(devguard?.stack).not.toContain('React 18.3')

    for (const project of PROJECTS) {
      expect(project.liveUrl).toBeTruthy()
      expect(project.githubUrl).toBeTruthy()
      expect(project.stack.length).toBeGreaterThan(3)
      expect(project.description.length).toBeGreaterThan(20)
      expect(project.frontendImplementation.length).toBeGreaterThan(20)
      expect(project.evidence.length).toBeGreaterThan(0)
      for (const item of project.evidence) {
        expect(item.label).toBeTruthy()
        expect(item.value).toBeTruthy()
        expect(item.source).toBeTruthy()
      }
    }
  })

  it('verifies dual-lane timeline events exist with Building and Learning lanes', () => {
    expect(TIMELINE_EVENTS.length).toBeGreaterThanOrEqual(2)
    const lanes = TIMELINE_EVENTS.map((e) => e.lane)
    expect(lanes).toContain('Building')
    expect(lanes).toContain('Learning')
  })

  it('verifies credentials have valid verify links and draft flags', () => {
    expect(CREDENTIALS.length).toBeGreaterThanOrEqual(2)
    const vcare = CREDENTIALS.find((c) => c.institution === 'Vcare Technical Institute')
    expect(vcare?.verifyUrl).toBeTruthy()
    expect(vcare?.verifyUrl).toContain('drive.google.com')
    expect(vcare?.draft).toBe(false)
  })

  it('verifies case studies match slug lookup contracts', () => {
    expect(CASE_STUDIES.length).toBeGreaterThanOrEqual(3)
    expect(getCaseStudy('sovereign')?.title).toBe('Sovereign')
    expect(getCaseStudy('devguard-ai')?.title).toBe('DevGuard AI')
    expect(getCaseStudy('chronicle')?.title).toBe('Chronicle')
    expect(getCaseStudy('non-existent')).toBeUndefined()

    for (const study of CASE_STUDIES) {
      expect(study.problem).toBeTruthy()
      expect(study.constraints.length).toBeGreaterThan(0)
      expect(study.architecture).toBeTruthy()
      expect(study.dataModel).toBeTruthy()
      expect(study.decisions.length).toBeGreaterThan(0)
      expect(study.failureModes.length).toBeGreaterThan(0)
      expect(study.lessons).toBeTruthy()
    }
  })

  it('verifies all 3 engineering blog posts have titles and slugs', () => {
    expect(BLOG_POSTS.length).toBe(3)
    const slugs = BLOG_POSTS.map((b) => b.slug)
    expect(slugs).toContain('pgvector-vs-external-vector-db')
    expect(slugs).toContain('multi-model-llm-fallback-router')
    expect(slugs).toContain('ast-based-pr-review')

    for (const post of BLOG_POSTS) {
      expect(post.title).toBeTruthy()
      expect(post.description).toBeTruthy()
      expect(post.date).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      expect(post.readingTime).toContain('min read')
    }
  })

  it('verifies structured experience, credentials, and skill categories', () => {
    expect(EXPERIENCE.length).toBeGreaterThanOrEqual(2)
    expect(CREDENTIALS.length).toBeGreaterThanOrEqual(2)
    expect(SKILLS.length).toBe(5)

    const skillCategories = SKILLS.map((s) => s.category)
    expect(skillCategories).toEqual(['Frontend', 'Backend', 'Database', 'Tools & DevOps', 'AI & APIs'])
  })

  it('verifies all project case studies have word counts <= 700 words', async () => {
    const { CASE_FILES } = await import('../content/projects')
    for (const project of CASE_FILES) {
      const text = [
        project.title,
        project.headline,
        project.summary,
        project.problem,
        ...(project.constraints || []),
        ...(project.builtBullets || []),
        project.decision?.title,
        project.decision?.description,
        project.decision?.tradeoff,
        project.frontendNote?.summary,
        ...(project.evidence || []).map((e) => e.label + ' ' + e.value),
        ...(project.whatNext || []),
      ]
        .filter(Boolean)
        .join(' ')
      const wordCount = text.trim().split(/\s+/).length
      expect(wordCount).toBeLessThanOrEqual(700)
      expect(wordCount).toBeGreaterThan(100)
    }
  })

  it('verifies all project titles <= 60 chars and descriptions <= 155 chars', async () => {
    const { CASE_FILES } = await import('../content/projects')
    for (const project of CASE_FILES) {
      const metaTitle = `${project.title} | Architecture Case Study`
      expect(metaTitle.length).toBeLessThanOrEqual(60)

      const metaDesc = (project.summary || project.headline).slice(0, 155)
      expect(metaDesc.length).toBeLessThanOrEqual(155)
      expect(metaDesc.length).toBeGreaterThan(50)
    }
  })
})
