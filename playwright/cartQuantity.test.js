import { test, expect } from '@playwright/test';

test('Change quantity of item in cart', async ({ page }) => {
  // Go to the product page
  await page.goto('http://localhost:3000/products/1');

  // Wait for the quantity input and add to cart button to be visible
  await page.waitForSelector('[data-test-id="product-quantity"]');
  await page.waitForSelector('[data-test-id="product-add-to-cart"]');

  // Set the quantity to 2
  const quantityInput = page.locator('[data-test-id="product-quantity"]');
  await quantityInput.fill('2');

  // Confirm the button is visible before clicking
  const addToCartButton = page.locator('[data-test-id="product-add-to-cart"]');
  await expect(addToCartButton).toBeVisible();

  // Click the add to cart button
  await addToCartButton.click();

  // Optional: Wait a bit to ensure the cart updates
  await page.waitForTimeout(500); // Wait for 0.5 seconds for the cart to update


  await page.goto('http://localhost:3000/cart');

  // Verify that the quantity input now has a value of 2
  const cartQuantityInput = page.locator('[data-test-id="cart-product-quantity-1"]');
  await expect(cartQuantityInput).toHaveValue('2');
});
