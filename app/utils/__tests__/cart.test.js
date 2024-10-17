import { render, screen, fireEvent, act } from '@testing-library/react';
import CartPage from '../../cart/page';
import { getCartCookie, setCartCookie } from '../cookies';
import '@testing-library/jest-dom';


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

  test('should render cart items', async () => {
    await act(async () => {
      render(<CartPage />);
    });
    expect(await screen.findByText(/Your Cart/i)).toBeInTheDocument();
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });

  test('should remove an item from the cart', async () => {
    await act(async () => {
      render(<CartPage />);
    });
    fireEvent.click(screen.getAllByRole('button', { name: 'Remove' })[0]); // Click the first Remove button
    expect(setCartCookie).toHaveBeenCalled();
  });

  test('should remove all items from the cart', async () => {
    await act(async () => {
      render(<CartPage />);
    });
    fireEvent.click(screen.getByText('Remove All'));
    expect(setCartCookie).toHaveBeenCalledWith([]);
  });
});
