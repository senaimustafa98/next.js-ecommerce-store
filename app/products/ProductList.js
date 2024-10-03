'use client';
import { useState } from 'react';

export default function ProductList({ products }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {  // Add product to cart function
    setCartItems((prevItems) => [...prevItems, product]); // Adding the product to the previous state (already existing products)
    localStorage.setItem('cartItems', JSON.stringify([...cartItems, product])); // Update local stage with cart items
  };

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>Price: ${product.price}</p>
          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}
