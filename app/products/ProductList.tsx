'use client';

import { useState, useEffect } from 'react';
import { setCartCookie, getCartCookie } from '../utils/cookies';
import styles from './ProductList.module.css';
import Image from 'next/image';
import Head from 'next/head';

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
    const fetchCart = async () => {
      const initialCart = await getCartCookie();
      setCartItems(initialCart || []);
    };
    fetchCart();
  }, []);

  const addToCart = async (product: Product) => {
    const quantity = quantities[product.id] || 1; // Default to 1 if not set
    const foundProduct = cartItems.find((item) => item.id === product.id);
    let updatedCart;

    if (foundProduct) {
      updatedCart = cartItems.map((item) =>
        item.id === product.id ? { ...item, quantity: (item.quantity || 0) + quantity } : item,
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
                value={quantities[product.id] || 1} // Controlled by local state
                onChange={(e) => {
                  const value = Number(e.target.value);
                  if (value >= 1) {
                    setQuantities((prev) => ({ ...prev, [product.id]: value })); // Update quantity for this product
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
