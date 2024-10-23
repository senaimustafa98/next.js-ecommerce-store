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

  const addToCartButton = page.locator('[data-test-id="product-add-to-cart"]');
  await expect(addToCartButton).toBeVisible();
  await addToCartButton.click();

  await page.waitForTimeout(500); // Wait for 0.5 seconds for the cart to update


  await page.goto('http://localhost:3000/cart');

  const cartQuantityInput = page.locator('[data-test-id="cart-product-quantity-1"]');
  await expect(cartQuantityInput).toHaveValue('2');
});
