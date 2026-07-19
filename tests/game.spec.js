
import { test, expect } from '@playwright/test';

test.describe('Cyberpunk Cat Platformer', () => {
  test('Game loads and UI is visible', async ({ page }) => {
    // Navigating to the local HTML file (adjust path as needed for CI/CD)
    await page.goto('file://' + require('path').resolve(__dirname, '../index.html'));

    // Check if the canvas exists
    const canvas = page.locator('#gameCanvas');
    await expect(canvas).toBeVisible();

    // Check initial UI state
    await expect(page.locator('#score-container')).toContainText('DATA: 0');
    await expect(page.locator('#lives-container')).toContainText('LIVES: 3');
  });

  test('Player can move right and jump', async ({ page }) => {
    await page.goto('file://' + require('path').resolve(__dirname, '../index.html'));

    // Give it a moment to load and render
    await page.waitForTimeout(500);

    // Simulate running right
    await page.keyboard.down('ArrowRight');
    await page.waitForTimeout(500);

    // Simulate jumping while running
    await page.keyboard.down('ArrowUp');
    await page.waitForTimeout(200);
    await page.keyboard.up('ArrowUp');

    // Keep running a bit then stop
    await page.waitForTimeout(400);
    await page.keyboard.up('ArrowRight');

    // Wait to land
    await page.waitForTimeout(500);

    // If we didn't die, the lives counter should still be 3
    await expect(page.locator('#lives-container')).toContainText('LIVES: 3');
  });
});
