"use client";

import { useEffect, useState } from 'react';
import { getCartCookie, setCartCookie } from '../utils/cookies';
import styles from './cart.module.css'
import Image from 'next/image';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const loadCart = async () => {
      const savedCart = await getCartCookie();
      setCartItems(savedCart);
    };
    loadCart();
  }, []);

 /*  const updateQuantity = (id, quantity) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
    setCartItems(updatedCart);
    setCartCookie(updatedCart);
  }; */

  const removeItem = (id) => {
    const updatedCart = cartItems
      .map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0);

    setCartItems(updatedCart);
    setCartCookie(updatedCart);
  };

  // Map each product ID to a local image file
  const imageMap = {
    1: "dogbrush.jpg",
    2: "dogtoy.jpg",
    3: "dognail.jpg",
    4: "dogcave.jpg",
  };

  return (
    <div>
      <h1 className={styles.CartTitle}>Your Cart</h1>
      {cartItems.length ? (
        cartItems.map((item) => (
          <div key={item.id} className={styles.cartItem}>
            <Image
              src={`/images/${imageMap[item.id]}`}
              alt={item.name}
              width={200}
              height={200}
              className={styles.productImage}
            />
            <div className={styles.cartDetails}>
              <h2>{item.name}</h2>
              <div className={styles.cartPriceQuantity}>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            </div>
            <button onClick={() => removeItem(item.id)} className={styles.removeButton}>
              Remove
            </button>
          </div>
        ))
      ) : (
        <p className={styles.emptyCart}>Cart is empty.</p>
      )}
    </div>
  );
}
