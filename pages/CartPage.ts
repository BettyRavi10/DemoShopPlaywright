
import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly addToCartButton: Locator;
  readonly cartLink: Locator;
  readonly cartItem: Locator;

  constructor(page: Page) {
    this.page = page;

    this.addToCartButton = page.locator('#add-to-cart-sauce-labs-backpack');
    this.cartLink = page.locator('.shopping_cart_link');
    this.cartItem = page.locator('.cart_item');
  }

  async addProductToCart() {
    await this.addToCartButton.click();
  }

  async openCart() {
    await this.cartLink.click();
  }
}
