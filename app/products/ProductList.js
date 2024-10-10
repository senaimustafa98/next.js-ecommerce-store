"use client";

import { useState, useEffect } from 'react';
import { setCartCookie, getCartCookie } from '../utils/cookies';
import styles from './ProductList.module.css';
import Image from 'next/image';

export default function ProductList({ products }) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      const initialCart = await getCartCookie();
      setCartItems(initialCart);
    };
    fetchCart();
  }, []);

  const addToCart = async (product, quantity) => {
    const foundProduct = cartItems.find((item) => item.id === product.id);
    let updatedCart;

    if (foundProduct) {
      updatedCart = cartItems.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      updatedCart = [...cartItems, { ...product, quantity }];
    }

    setCartItems(updatedCart);
    await setCartCookie(updatedCart);
  };

  // Map each product ID to a local image file
  const imageMap = {
    1: "dogbrush.jpg",
    2: "dogtoy.jpg",
    3: "dognail.jpg",
    4: "dogcave.jpg",
  };

  return (
    <div className={styles.productGrid}>
      {products?.map((product) => (
        <div key={product.id} className={styles.productCard}>
          <Image
            src={`/images/${imageMap[product.id]}`}
            alt={product.name}
            width={200}
            height={200}
            className={styles.productImage}
          />
          <h3 className={styles.productName}>{product.name}</h3>
          <p className={styles.productPrice}>Price: ${product.price}</p>
          <label>
            Quantity:
            <input
              type="number"
              min="1"
              defaultValue="1"
              onChange={(e) => product.quantity = Number(e.target.value)}
              data-test-id="product-quantity"
            />
          </label>
          <button
            onClick={() => addToCart(product, product.quantity || 1)}
            className={styles.addToCartButton}
            data-test-id="product-add-to-cart"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
