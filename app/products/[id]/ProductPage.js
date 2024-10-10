"use client";

import { useState, useEffect } from 'react';
import { setCartCookie, getCartCookie } from '../../utils/cookies';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import styles from './product.module.css';

const imageMap = {
  1: "dogbrush.jpg",
  2: "dogtoy.jpg",
  3: "dognail.jpg",
  4: "dogcave.jpg",
};

export default function ProductPage({ product }) {
  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchCart = async () => {
      const initialCart = await getCartCookie();
      setCartItems(initialCart || []);
      //console.log("Fetched cart items:", initialCart);
    };
    fetchCart();
  }, []);

  const addToCart = async () => {
    const foundProduct = cartItems.find((item) => item.id === product.id);
    let updatedCart;

    if (foundProduct) {
      updatedCart = cartItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
      );
    } else {
      updatedCart = [...cartItems, { ...product, quantity }];
    }

    console.log("Updated cart items:", updatedCart);
    setCartItems(updatedCart);
    await setCartCookie(updatedCart);
  };

  if (!product) {
    notFound();
  }

  return (
    <div className={styles.productContainer}>
      <h1 className={styles.productName}>{product.name}</h1>
      <Image src={`/images/${imageMap[product.id]}`} alt={product.name} width={350} height={350} />
      <p className={styles.productDescription}>{product.description}</p>
      <p className={styles.productPrice}>Price: ${product.price}</p>
      <label>
        Quantity:
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          data-test-id="product-quantity"
        />
      </label>
      <button className={styles.buttonAdd} onClick={addToCart} data-test-id="product-add-to-cart">
        Add to Cart
      </button>
    </div>
  );
}
