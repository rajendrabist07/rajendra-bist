import { describe, expect, it } from 'vitest'
import { PERSONAL, PROJECTS, EXPERIENCE, CREDENTIALS, SKILLS } from '../lib/portfolio-data'
import { CASE_STUDIES, getCaseStudy } from '../lib/case-studies'
import { BLOG_POSTS } from '../lib/blog'
import { SITE_URL } from '../lib/site-config'

describe('Portfolio Integrity & Truthfulness Data Contracts', () => {
  it('defines valid personal profile with canonical domain', () => {
    expect(PERSONAL.name).toBe('Rajendra Bist')
    expect(PERSONAL.github).toBe('https://github.com/rajendrabist07')
    expect(PERSONAL.email).toBe('rajendrabist396@gmail.com')
    expect(SITE_URL).toBe('https://www.bistrajendra.com.np')
  })

  it('verifies all 3 core projects have valid links, slugs and stacks', () => {
    expect(PROJECTS.length).toBe(3)
    const titles = PROJECTS.map((p) => p.title)
    expect(titles).toContain('EduMethod AI')
    expect(titles).toContain('DevGuard AI')
    expect(titles).toContain('SocraticAI')

    for (const project of PROJECTS) {
      expect(project.liveUrl).toBeTruthy()
      expect(project.githubUrl).toBeTruthy()
      expect(project.stack.length).toBeGreaterThan(3)
      expect(project.description.length).toBeGreaterThan(20)
    }
  })

  it('verifies case studies match slug lookup contracts', () => {
    expect(CASE_STUDIES.length).toBe(3)
    expect(getCaseStudy('devguard-ai')?.title).toBe('DevGuard AI')
    expect(getCaseStudy('edumethod-ai')?.title).toBe('EduMethod AI')
    expect(getCaseStudy('socratic-ai')?.title).toBe('SocraticAI')
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
})
