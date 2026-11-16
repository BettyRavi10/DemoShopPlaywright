
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('should handle failed product image requests', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // First, log in normally
    await page.goto('/');
    await loginPage.login('standard_user', 'secret_sauce');

    // Verify successful login
    await expect(page.locator('.title')).toHaveText('Products');

    // Now intercept product image requests
    let interceptedCount = 0;

    await page.route('**/*.{jpg,jpeg,png,webp}', async route => {
        interceptedCount++;

        console.log('Image request intercepted:', route.request().url());

        await route.fulfill({
            status: 404,
            contentType: 'text/plain',
            body: 'Image Not Found'
        });
    });

    // Reload the products page to trigger image requests again
    await page.reload();

    // Verify products are still displayed
    await expect(page.locator('.inventory_item')).toHaveCount(6);

    // Verify image requests were intercepted
    expect(interceptedCount).toBeGreaterThan(0);
});
