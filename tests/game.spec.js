import { test, expect } from '@playwright/test';

test.describe('Neon Arcade OS', () => {
  test('Main menu loads and can launch Cyberpunk Cat', async ({ page }) => {
    await page.goto('file://' + require('path').resolve(__dirname, '../index.html'));

    // Check main menu
    const mainMenu = page.locator('#main-menu');
    await expect(mainMenu).toBeVisible();
    await expect(page.locator('h1')).toHaveText('NEON ARCADE OS');

    // Launch game
    await page.click('#btn-game-cat');
    await page.waitForTimeout(500);

    // Verify game UI is visible
    const ui = page.locator('#ui');
    await expect(ui).toBeVisible();
    await expect(page.locator('#score-container')).toContainText('DATA: 0');
    await expect(page.locator('#lives-container')).toContainText('LIVES: 3');
  });

  test('Player can move right and jump in Cyberpunk Cat', async ({ page }) => {
    await page.goto('file://' + require('path').resolve(__dirname, '../index.html'));
    await page.click('#btn-game-cat');
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

  test('Player can reach the goal and load next level in Cyberpunk Cat', async ({ page }) => {
      await page.goto('file://' + require('path').resolve(__dirname, '../index.html'));
      await page.click('#btn-game-cat');
      await page.waitForTimeout(500);

      // Verify we are on level 0
      const currentLevelIndex = await page.evaluate(() => window.game.currentLevelIndex);
      expect(currentLevelIndex).toBe(0);

      // Teleport player near the goal
      await page.evaluate(() => {
          window.game.player.x = window.game.level.goal.x - 30;
          window.game.player.y = window.game.level.goal.y;
      });

      // Move right to touch the goal
      await page.keyboard.down('ArrowRight');
      await page.waitForTimeout(200);
      await page.keyboard.up('ArrowRight');

      // Check if "NIVEL COMPLETADO" message appears
      await expect(page.locator('#msg-container')).toBeVisible();
      await expect(page.locator('#msg-text')).toContainText('NIVEL COMPLETADO');

      // Wait for the next level to load (timeout is 2000ms)
      await page.waitForTimeout(2500);

      // Verify we are on level 1
      const newLevelIndex = await page.evaluate(() => window.game.currentLevelIndex);
      expect(newLevelIndex).toBe(1);
  });
});