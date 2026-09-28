import { expect, test } from '@playwright/test'

test('homepage exposes primary navigation and contact form', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('main')).toBeVisible()
  await expect(page.locator('#projects')).toBeVisible()
  await expect(page.locator('#contact')).toBeVisible()
  await expect(page.getByLabel('Open Command Palette')).toBeVisible()
})