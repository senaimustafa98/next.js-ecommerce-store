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
  product: Product;
}

const imageMap: Record<number, string> = {
  1: 'dogbrush.jpg',
  2: 'dogtoy.jpg',
  3: 'dognail.jpg',
  4: 'dogcave.jpg',
};

export default function ProductPage({ product }: ProductPageProps) {


  const [cartItems, setCartItems] = useState<Array<{ id: number; name: string; quantity: number; price: number }>>([]);
  const [quantity, setQuantity] = useState<number>(1); // Specify quantity type

  useEffect(() => {
    const fetchCart = async () => {
      const initialCart = await getCartCookie();
      setCartItems(initialCart || []);
    };
    fetchCart();
  }, []);

  const addToCart = async () => {
    const foundProduct = cartItems.find((item) => item.id === product.id);
    let updatedCart;

    if (foundProduct) {
      updatedCart = cartItems.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item,
      );
    } else {
      updatedCart = [
        ...cartItems,
        { id: product.id, name: product.name, price: product.price, quantity },
      ];
    }

    setCartItems(updatedCart);
    await setCartCookie(updatedCart);
  };

  if (!product) {
    notFound();
  }


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
        />
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
