'use client';

import { useState, useEffect } from 'react';
import { setCartCookie, getCartCookie } from '../utils/cookies';
import styles from './ProductList.module.css';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  price: number;
  quantity?: number; // Optional property for quantity
}

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [quantities, setQuantities] = useState<Record<number, number>>({}); // Track quantity for each product

  useEffect(() => {
    getCartCookie()
      .then((initialCart) => {
        setCartItems(initialCart || []);
      })
      .catch((error) => {
        console.error('Failed to fetch cart items', error);
      });
  }, []);

  const addToCart = async (product: Product) => {
    const quantity = quantities[product.id] || 1; // Default to 1 if not set
    const foundProduct = cartItems.find((item) => item.id === product.id);
    let updatedCart;

    if (foundProduct) {
      updatedCart = cartItems.map((item) =>
        item.id === product.id
          ? { ...item, quantity: (item.quantity || 0) + quantity }
          : item,
      );
    } else {
      updatedCart = [...cartItems, { ...product, quantity }];
    }

    setCartItems(updatedCart);
    await setCartCookie(updatedCart);
  };

  const imageMap: Record<number, string> = {
    1: 'dogbrush.jpg',
    2: 'dogtoy.jpg',
    3: 'dognail.jpg',
    4: 'dogcave.jpg',
  };

  return (
    <>
      <Head>
        <title>Product Page</title>
        <meta
          name="description"
          content="Browse our collection of pet products. Find the perfect items for your furry friends at great prices!"
        />
      </Head>
      <div className={styles.productGrid}>
        {products.map((product) => (
          <div key={`product-${product.id}`} className={styles.productCard}>
            <Link
              href={`/products/${product.id}`}
              data-test-id={`product-${product.id}`}
            >
              <Image
                src={`/images/${imageMap[product.id]}`}
                alt={product.name}
                width={200}
                height={200}
                className={styles.productImage}
                data-test-id="product-image"
              />
              <h3 className={styles.productName}>{product.name}</h3>
            </Link>
            <p className={styles.productPrice} data-test-id="product-price">
              Price: {product.price ? product.price.toFixed(2) : 'N/A'}
            </p>

            <label>
              Quantity:
              <input
                type="number"
                min="1"
                value={quantities[product.id] || 1}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  if (value >= 1) {
                    setQuantities((prev) => ({ ...prev, [product.id]: value }));
                  }
                }}
                data-test-id="product-quantity"
              />
            </label>
            <button
              onClick={() => addToCart(product)}
              className={styles.addToCartButton}
              data-test-id="product-add-to-cart"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
