import { render, screen, fireEvent, act } from '@testing-library/react';
import CartPage from '../../components/CartPage';
import { getCartCookie, setCartCookie } from '../cookies';
import '@testing-library/jest-dom';
import { describe, expect, test, jest, beforeEach } from '@jest/globals';

jest.mock('../cookies', () => ({
  getCartCookie: jest.fn(),
  setCartCookie: jest.fn(),
}));

describe('CartPage', () => {
  const mockCartItems = [
    { id: 1, name: 'Product 1', price: 19.99, quantity: 2 },
    { id: 2, name: 'Product 2', price: 29.99, quantity: 1 },
  ];

  beforeEach(() => {
    getCartCookie.mockResolvedValue(mockCartItems);
  });

  test('should render cart items', () => {
    act(() => {
      render(<CartPage />);
    });

    // Await the expected results
    expect(screen.getByText(/Your Cart/i)).toBeInTheDocument();
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });

  test('should remove an item from the cart', () => {
    act(() => {
      render(<CartPage />);
    });

    // Click the first Remove button
    fireEvent.click(screen.getAllByRole('button', { name: 'Remove' })[0]);
    expect(setCartCookie).toHaveBeenCalled();
  });

  test('should remove all items from the cart', () => {
    act(() => {
      render(<CartPage />);
    });

    // Click the Remove All button
    fireEvent.click(screen.getByText('Remove All'));
    expect(setCartCookie).toHaveBeenCalledWith([]);
  });
});
