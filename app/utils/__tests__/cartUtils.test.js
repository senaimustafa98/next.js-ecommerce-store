// app/utils/__tests__/cartUtils.test.js

import { calculateTotal } from '../calculate'; // Adjust the path as necessary
import { getCartItems } from '../cookies';

// Mock the cookie functions
jest.mock('../cookies', () => ({
  getCartItems: jest.fn(),
}));

describe('Cart Utility Functions', () => {
  test('should calculate total price correctly', () => {
    const mockCartItems = [
      { price: 19.99, quantity: 2 },
      { price: 29.99, quantity: 1 },
    ];

    const total = calculateTotal(mockCartItems);
    expect(total).toBe(69.97); // 19.99 * 2 + 29.99
  });

  test('should retrieve cart items from cookies', async () => {
    const mockItems = [
      { id: 1, name: 'Product 1', price: 19.99, quantity: 1 },
      { id: 2, name: 'Product 2', price: 29.99, quantity: 2 },
    ];

    getCartItems.mockResolvedValue(mockItems);

    const items = await getCartItems();
    expect(items).toEqual(mockItems);
  });
});
