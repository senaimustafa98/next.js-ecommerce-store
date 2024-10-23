import { test, expect } from '@playwright/test';

test('Add to cart', async ({ page }) => {
  await page.goto('http://localhost:3000/products/1');
  await page.waitForSelector('[data-test-id="product-add-to-cart"]');

  // Click the add to cart button
  await page.click('[data-test-id="product-add-to-cart"]');

  await page.waitForTimeout(500); // Wait for 0.5 seconds for the cart to update
  await page.goto('http://localhost:3000/cart');

  await page.waitForSelector('h2:has-text("Fur Brush")');
  const cartItem = page.locator('h2:has-text("Fur Brush")');


  await expect(cartItem).toBeVisible();
});
