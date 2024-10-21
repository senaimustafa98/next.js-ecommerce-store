import { calculateTotal } from '../calculate';
import { describe, expect, test } from '@jest/globals';

describe('calculateTotal', () => {
  test('should return 0 for an empty array', () => {
    expect(calculateTotal([])).toBe(0);
  });

  test('should calculate the total price correctly for multiple items', () => {
    const items = [
      { price: 19.99, quantity: 2 },
      { price: 29.99, quantity: 1 },
    ];
    expect(calculateTotal(items)).toBe(69.97);
  });

  test('should calculate the total price correctly for a single item', () => {
    const items = [{ price: 9.99, quantity: 3 }];
    expect(calculateTotal(items)).toBe(29.97);
  });
});
