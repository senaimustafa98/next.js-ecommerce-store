"use client";

import { useState, useEffect } from 'react';
import { setCartCookie, getCartCookie } from '../utils/cookies';

export default function ProductList({ products }) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      const initialCart = await getCartCookie();
      setCartItems(initialCart);
    };
    fetchCart();
  }, []);

  const addToCart = async (product) => {
    const foundProduct = cartItems.find((item) => item.id === product.id);
    let updatedCart;

    if (foundProduct) {
      updatedCart = cartItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [...cartItems, { ...product, quantity: 1 }];
    }

    setCartItems(updatedCart);
    await setCartCookie(updatedCart);
  };

  return (
    <div>
      {products?.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>Price: ${product.price}</p>
          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}
