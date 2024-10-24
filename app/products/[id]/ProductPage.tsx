'use client';

import { useState, useEffect } from 'react';
import { setCartCookie, getCartCookie } from '../../utils/cookies';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import styles from './product.module.css';
import Head from 'next/head';

// Define product interface
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

interface ProductPageProps {
  product: Product | null; // Allow product to be null
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const imageMap: Record<number, string> = {
  1: 'dogbrush.jpg',
  2: 'dogtoy.jpg',
  3: 'dognail.jpg',
  4: 'dogcave.jpg',
};

export default function ProductPage({ product }: ProductPageProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    getCartCookie()
      .then((initialCart) => {
        setCartItems(initialCart || []);
      })
      .catch((error) => {
        console.error('Failed to fetch cart:', error);
      });
  }, []);

  const addToCart = async () => {
    if (!product) return; // Safeguard to prevent accessing product properties when it's null

    try {
      const foundProduct = cartItems.find((item) => item.id === product.id);
      let updatedCart: CartItem[];

      if (foundProduct) {
        updatedCart = cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      } else {
        updatedCart = [
          ...cartItems,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity,
          } as CartItem,
        ];
      }

      setCartItems(updatedCart);
      await setCartCookie(updatedCart);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  if (!product) {
    notFound(); // Simply call notFound without awaiting or chaining
    return null; // Return null to ensure the function exits
  }

  /* const formattedPrice = product.price ? product.price.toFixed(2) : 'N/A';
  console.log('Formatted Price:', formattedPrice); */

  return (
    <>
      <Head>
        <title>{product.name} - Paw Perfect Store</title>
        <meta
          name="description"
          content={`Buy ${product.name}, a top-quality product that ${product.description}`}
        />
      </Head>

      <div className={styles.productContainer}>
        <h1 className={styles.productName}>{product.name}</h1>
        <Image
          src={`/images/${imageMap[product.id]}`}
          alt={product.name}
          width={350}
          height={350}
          data-test-id="product-image"
        />
        <p className={styles.productDescription}>{product.description}</p>
        Price:
        <p data-test-id="product-price">
          {isNaN(product.price) ? 'N/A' : product.price.toFixed(2)}
        </p>
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
        <button
          className={styles.buttonAdd}
          onClick={addToCart}
          data-test-id="product-add-to-cart"
        >
          Add to Cart
        </button>
      </div>
    </>
  );
}
