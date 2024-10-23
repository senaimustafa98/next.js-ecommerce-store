import { test, expect } from '@playwright/test';

test('Remove item from cart', async ({ page }) => {
  await page.goto('http://localhost:3000/cart');


  const removeButton = page.locator('[data-test-id="cart-product-remove-1"]');
  await removeButton.click();


  const emptyCartMessage = page.locator('text=Cart is empty');
  await expect(emptyCartMessage).toBeVisible();
});
