"use client";

import { useEffect, useState } from 'react';
import { getCartCookie, setCartCookie } from '../utils/cookies';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const loadCart = async () => {
      const savedCart = await getCartCookie();
      setCartItems(savedCart);
    };
    loadCart();
  }, []);

  const updateQuantity = (id, quantity) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
    setCartItems(updatedCart);
    setCartCookie(updatedCart);
  };

  const removeItem = (id) => {
    const updatedCart = cartItems
      .map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0);

    setCartItems(updatedCart);
    setCartCookie(updatedCart);
  };


  return (
    <div>
      <h1>Your Cart</h1>
      {cartItems.length ? (
        cartItems.map((item) => (
          <div key={item.id}>
            <h2>{item.name}</h2>
            <p>Price: ${item.price}</p>
            <p>Quantity: {item.quantity}</p>
            <button onClick={() => removeItem(item.id)}>Remove</button>
          </div>
        ))
      ) : (
        <p>Cart is empty.</p>
      )}
    </div>
  );
}
