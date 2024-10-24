import { test, expect } from '@playwright/test';

test('Change quantity of item in cart', async ({ page }) => {
  // Go to the product page and add the item to the cart
  await page.goto('http://localhost:3000/products/1');
  await page.waitForSelector('[data-test-id="product-add-to-cart"]');

  // Set the quantity to 2
  const quantityInput = page.locator('[data-test-id="product-quantity"]');
  await quantityInput.fill('2'); // Sets the quantity to 2

  // Click the add to cart button
  await page.click('[data-test-id="product-add-to-cart"]');

  // Navigate to the cart page
  await page.goto('http://localhost:3000/cart');

  // Change quantity for the first item in the cart
  const cartQuantityInput = page.locator(
    '[data-test-id="cart-product-quantity-1"]',
  );
  await cartQuantityInput.fill('2'); // Sets the quantity to 2

  // Verify that the quantity input now has a value of 2
  await expect(cartQuantityInput).toHaveValue('2'); // Check that the quantity in the cart is 2
});
