
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test('should add a product to the shopping cart', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const cartPage = new CartPage(page);

  // Login
  await page.goto('/');
  await loginPage.login('standard_user', 'secret_sauce');

  // Add product to cart
  await cartPage.addProductToCart();

  // Open shopping cart
  await cartPage.openCart();

  // Verify product is displayed in the cart
  await expect(cartPage.cartItem).toHaveCount(1);
  await expect(page.locator('.inventory_item_name'))
    .toHaveText('Sauce Labs Backpack');

});

test('should complete checkout successfully', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  // Login
  await page.goto('/');
  await loginPage.login('standard_user', 'secret_sauce');

  // Add product to cart
  await cartPage.addProductToCart();

  // Open cart
  await cartPage.openCart();

  // Start checkout
  await checkoutPage.startCheckout();

  // Enter customer information
  await checkoutPage.enterCustomerDetails(
    'Betty',
    'QA',
    '08816'
  );

  // Continue to order overview
  await checkoutPage.continueToOverview();

  // Verify order overview
  await expect(page.locator('.cart_item')).toHaveCount(1);

  // Finish order
  await checkoutPage.finishOrder();

  // Verify order confirmation
  await expect(checkoutPage.confirmationMessage)
    .toHaveText('Thank you for your order!');

});
