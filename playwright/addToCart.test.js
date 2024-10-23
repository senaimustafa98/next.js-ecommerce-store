import { test, expect } from '@playwright/test';

test('Add to cart', async ({ page }) => {
  await page.goto('http://localhost:3000/products/1');
  await page.waitForSelector('[data-test-id="product-add-to-cart"]');

  // Click the add to cart button
  await page.click('[data-test-id="product-add-to-cart"]');

  // Optional: Wait a bit to ensure the cart updates
  await page.waitForTimeout(500); // Wait for 0.5 seconds for the cart to update

  // Now navigate to the cart page
  await page.goto('http://localhost:3000/cart');

  // Wait for the cart item to be visible
  await page.waitForSelector('h2:has-text("Fur Brush")');
  const cartItem = page.locator('h2:has-text("Fur Brush")');

  // Assert that the cart item is visible
  await expect(cartItem).toBeVisible();
});
