import { test, expect } from '@playwright/test';

test('Add to cart', async ({ page }) => {
  await page.goto('http://localhost:3000/products/1');
  await page.waitForSelector('[data-test-id="product-add-to-cart"]');
  await page.click('[data-test-id="product-add-to-cart"]');

  // Wait for navigation to the cart page
  await Promise.all([
    page.waitForNavigation(),
    page.goto('http://localhost:3000/cart'),
  ]);

  // Wait for the cart item to be visible
  await page.waitForSelector('h2:has-text("Fur Brush")');
  const cartItem = page.locator('h2:has-text("Fur Brush")');

  // Assert that the cart item is visible
  await expect(cartItem).toBeVisible();
});
