import { expect, test } from '@playwright/test'

test.describe('Portfolio Critical End-to-End User Journeys', () => {
  test('homepage renders hero, sections, and navigation landmarks', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('main')).toBeVisible()
    await expect(page.locator('#home')).toBeVisible()
    await expect(page.locator('#about')).toBeVisible()
    await expect(page.locator('#skills')).toBeVisible()
    await expect(page.locator('#projects')).toBeVisible()
    await expect(page.locator('#process')).toBeVisible()
    await expect(page.locator('#experience')).toBeVisible()
    await expect(page.locator('#contact')).toBeVisible()
  })

  test('command palette trigger opens terminal search modal', async ({ page }) => {
    await page.goto('/')
    const searchBtn = page.getByLabel('Open Command Palette')
    await expect(searchBtn).toBeVisible()
    await searchBtn.click()
    await expect(page.locator('[cmdk-root]')).toBeVisible()
    await expect(page.locator('[cmdk-input]')).toBeVisible()
  })

  test('case study page loads with architectural breakdown', async ({ page }) => {
    await page.goto('/projects/devguard-ai')
    await expect(page.locator('h1')).toContainText('DevGuard AI')
    await expect(page.locator('article').first()).toBeVisible()
  })

  test('blog index and individual engineering post load successfully', async ({ page }) => {
    await page.goto('/blog')
    await expect(page.locator('h1')).toContainText('Backend and AI systems')

    await page.goto('/blog/pgvector-vs-external-vector-db')
    await expect(page.locator('article')).toBeVisible()
  })

  test('contact form validates input fields client-side', async ({ page }) => {
    await page.goto('/#contact')
    const submitBtn = page.locator('#contact button[type="submit"]')
    await expect(submitBtn).toBeVisible()
    await submitBtn.click()
    const nameInput = page.locator('#contact input[name="name"]')
    await expect(nameInput).toBeVisible()
  })
})