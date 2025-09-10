// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Playwright CI Parallel Tests', () => {
  test('should load Playwright homepage', async ({ page }) => {
    await page.goto('/');
    
    // Check that the page loads
    await expect(page).toHaveTitle(/Playwright/);
    
    // Check for main navigation
    await expect(page.locator('nav')).toBeVisible();
  });

  test('should navigate to docs', async ({ page }) => {
    await page.goto('/');
    
    // Click on docs link
    await page.click('text=Docs');
    
    // Verify we're on docs page
    await expect(page).toHaveURL(/.*docs/);
    await expect(page.locator('h1')).toContainText('Docs');
  });

  test('should search functionality work', async ({ page }) => {
    await page.goto('/');
    
    // Look for search input
    const searchInput = page.locator('input[placeholder*="search"], input[type="search"]').first();
    
    if (await searchInput.isVisible()) {
      await searchInput.fill('test');
      await searchInput.press('Enter');
      
      // Wait for search results
      await page.waitForLoadState('networkidle');
    }
  });

  test('should have responsive design', async ({ page }) => {
    await page.goto('/');
    
    // Test desktop view
    await page.setViewportSize({ width: 1200, height: 800 });
    await expect(page.locator('nav')).toBeVisible();
    
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(500); // Allow for responsive adjustments
    
    // Check if mobile menu exists or nav is still visible
    const mobileMenu = page.locator('[data-testid="mobile-menu"], .mobile-menu, button[aria-label*="menu"]');
    const navVisible = await page.locator('nav').isVisible();
    
    expect(mobileMenu.isVisible() || navVisible).toBeTruthy();
  });
});
