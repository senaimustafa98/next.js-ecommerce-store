import { test, expect } from '@playwright/test';

test('Remove item from cart', async ({ page }) => {
  // Step 1: Go to the product page and add an item to the cart
  await page.goto('http://localhost:3000/products/1');
  await page.waitForSelector('[data-test-id="product-add-to-cart"]');
  await page.click('[data-test-id="product-add-to-cart"]');

  // Step 2: Navigate to the cart page
  await page.goto('http://localhost:3000/cart');

  // Step 3: Wait for the cart item to be visible
  const cartItem = page.locator('[data-test-id="cart-product-1"]');
  await expect(cartItem).toBeVisible();

  // Step 4: Click the remove button for the item
  const removeButton = page.locator('[data-test-id="cart-product-remove-1"]');
  await removeButton.click();

  // Step 5: Verify that the cart item is no longer visible
  await expect(cartItem).toBeHidden();

  // Step 6: Optionally verify the empty cart message
  const emptyCartMessage = page.locator('text=Cart is empty');
  await expect(emptyCartMessage).toBeVisible();
});
