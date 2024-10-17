import { test, expect } from '@playwright/test';

test('Remove item from cart', async ({ page }) => {
    await page.goto('http://localhost:3000/products/1');
    await page.waitForSelector('[data-test-id="product-add-to-cart"]');
    await page.click('[data-test-id="product-add-to-cart"]');
    await page.goto('http://localhost:3000/cart');

    // Click the "Remove" button for the item
    const removeButton = page.locator('button:has-text("Remove")');
    await removeButton.click();

    // Verify that the cart is now empty
    const emptyCartMessage = page.locator('text=Cart is empty');
    await expect(emptyCartMessage).toBeVisible();
});
