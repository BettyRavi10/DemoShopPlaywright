import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('should log in successfully with valid credentials', async ({ page }) => {

  const loginPage = new LoginPage(page);

  // Navigate to the SauceDemo login page
  await page.goto('/');

  // Enter valid credentials and log in
  await loginPage.login('standard_user', 'secret_sauce');

  // Verify successful login
  await expect(page).toHaveURL(/inventory.html/);
  await expect(page.locator('.title')).toHaveText('Products');

});