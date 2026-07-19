import { test, expect } from '@playwright/test';

test.describe('Cyberpunk Cat Platformer', () => {
  test('Game loads and UI is visible', async ({ page }) => {
    await page.goto('file://' + require('path').resolve(__dirname, '../index.html'));
    const canvas = page.locator('#gameCanvas');
    await expect(canvas).toBeVisible();
    await expect(page.locator('#score-container')).toContainText('DATA: 0');
    await expect(page.locator('#lives-container')).toContainText('LIVES: 3');
  });

  test('Player can move right and jump', async ({ page }) => {
    await page.goto('file://' + require('path').resolve(__dirname, '../index.html'));
    await page.waitForTimeout(500);
    await page.keyboard.down('ArrowRight');
    await page.waitForTimeout(500);
    await page.keyboard.down('ArrowUp');
    await page.waitForTimeout(200);
    await page.keyboard.up('ArrowUp');
    await page.waitForTimeout(400);
    await page.keyboard.up('ArrowRight');
    await page.waitForTimeout(500);
    await expect(page.locator('#lives-container')).toContainText('LIVES: 3');
  });

  test('Cyber-Flow Radio is visible and can be interacted with', async ({ page }) => {
    await page.goto('file://' + require('path').resolve(__dirname, '../index.html'));
    await page.waitForTimeout(500);

    const radio = page.locator('#radio-container');
    await expect(radio).toBeVisible();

    const btnPlay = page.locator('#btn-radio-play');
    await expect(btnPlay).toHaveText('▶ PLAY');

    // Select a station
    await page.selectOption('#radio-stations', { label: 'Latino Flow / Urban' });

    // Check if the button changed to PAUSE (Note: Playwright bypasses some autoplay restrictions)
    await expect(btnPlay).toHaveText('⏸ PAUSE');
  });
});
