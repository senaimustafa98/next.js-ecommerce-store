'use client';

import { useEffect, useState } from 'react';
import { getCartCookie, setCartCookie } from '../utils/cookies';
import styles from './cart.module.css';
import Image from 'next/image';
import Head from 'next/head';

// Define cart item interface
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const loadCart = async () => {
      const savedCart = await getCartCookie();
      setCartItems(savedCart);
    };
    loadCart();
  }, []);

  const updateQuantity = (id: number, newQuantity: number) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item,
    );

    setCartItems(updatedCart);
    setCartCookie(updatedCart);
  };

  const removeItem = (id: number) => {
    const updatedCart = cartItems
      .map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
      )
      .filter((item) => item.quantity > 0);

    setCartItems(updatedCart);
    setCartCookie(updatedCart);
  };

  // Function to remove all items
  const removeAllItems = () => {
    setCartItems([]);
    setCartCookie([]); // Clear the cart cookie
  };

  // Map each product ID to a local image file
  const imageMap: Record<number, string> = {
    1: 'dogbrush.jpg',
    2: 'dogtoy.jpg',
    3: 'dognail.jpg',
    4: 'dogcave.jpg',
  };

  return (
    <>
      <Head>
        <title>Shopping Cart</title>
        <meta
          name="description"
          content="View and manage the items in your shopping cart. Proceed to checkout when you're ready."
        />
      </Head>
      <div>
        <h1 className={styles.CartTitle}>Your Cart</h1>
        {cartItems.length ? (
          cartItems.map((item) => (
            <div key={item.id} className={styles.cartItem}>
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
    </>
  );
}
