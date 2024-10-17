import { test, expect } from '@playwright/test';

test('Change quantity of item in cart', async ({ page }) => {
    // Go to the product page and add the item to the cart
    await page.goto('http://localhost:3000/products/1');
    await page.waitForSelector('[data-test-id="product-add-to-cart"]');
    await page.click('[data-test-id="product-add-to-cart"]');

    // Navigate to the cart page
    await page.goto('http://localhost:3000/cart');

    // Change quantity to 2
    const quantityInput = page.locator('[data-test-id="cart-product-quantity"]');
    await quantityInput.fill('2');  // Sets the quantity to 2
    await quantityInput.press('Enter'); // Optional, in case an update action is required

    // Verify that the quantity input now has a value of 2
    await expect(quantityInput).toHaveValue('2');
});
