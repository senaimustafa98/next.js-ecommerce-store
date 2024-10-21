'use client';

import { useEffect, useState } from 'react';
import { getCartCookie, setCartCookie } from '../utils/cookies';
import styles from './cart.module.css';
import Image from 'next/image';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    getCartCookie()
      .then((savedCart) => {
        setCartItems(savedCart);
      })
      .catch((error) => {
        console.error('Failed to load cart:', error);
      });
  }, []);

  const updateQuantity = async (id: number, newQuantity: number) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item,
    );
    setCartItems(updatedCart);
    await setCartCookie(updatedCart);
  };

  const removeItem = async (id: number) => {
    const updatedCart = cartItems
      .map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
      )
      .filter((item) => item.quantity > 0);

    setCartItems(updatedCart);
    await setCartCookie(updatedCart);
  };

  const removeAllItems = async () => {
    setCartItems([]);
    await setCartCookie([]);
  };

  const imageMap: Record<number, string> = {
    1: 'dogbrush.jpg',
    2: 'dogtoy.jpg',
    3: 'dognail.jpg',
    4: 'dogcave.jpg',
  };

  return (
    <div>
      <h1 className={styles.CartTitle}>Your Cart</h1>
      {cartItems.length ? (
        cartItems.map((item) => (
          <div key={`cart-item-${item.id}`} className={styles.cartItem}>
            <Image
              src={`/images/${imageMap[item.id]}`}
              alt={item.name || 'Product image'}
              width={200}
              height={200}
              className={styles.productImage}
            />
            <div className={styles.cartDetails}>
              <h2>{item.name}</h2>
              <div className={styles.cartPriceQuantity}>
                <p>Price: ${item.price}</p>
                <label>
                  Quantity:
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.id, Number(e.target.value))
                    }
                    data-test-id="cart-product-quantity"
                  />
                </label>
              </div>
            </div>
            <button
              onClick={() => removeItem(item.id)}
              className={styles.removeButton}
            >
              Remove
            </button>
          </div>
        ))
      ) : (
        <p className={styles.emptyCart}>Cart is empty.</p>
      )}
      <button onClick={removeAllItems} className={styles.removeAllButton}>
        Remove All
      </button>
    </div>
  );
};

export default CartPage;
