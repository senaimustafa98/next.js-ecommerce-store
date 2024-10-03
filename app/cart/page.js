'use client';

import { useState, useEffect } from 'react';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  // Load cart from local storage on first render
  useEffect(() => {
    // Ensure this code only runs in the browser (not during server-side rendering)
    if (typeof window !== 'undefined') {
    const storedItemsInCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedItemsInCart);}
  }, []);

  // Remove item function
  const removeFromCart = (productId) => {
    // Find item based on id
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart)); // Update local storage with stringify
  };


  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.length > 0 ? (
        <>
          {cartItems.map((item, index) => (
            <div key={`cartItem-${item.id}`}>

              <div>{item.name}</div>
              <div>Price: ${item.price}</div>
              <button onClick={() => removeFromCart(item.id)}>Remove from Cart</button>
            </div>
          ))}
          <div>
          <h3>Total: ${cartItems.reduce((total, item) => total + Number(item.price), 0).toFixed(2)}</h3>

          </div>
        </>
      ) : (
        <p>You have no products in your cart.</p>
      )}
    </div>
  );
}
