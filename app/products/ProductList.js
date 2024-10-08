'use client';
import { useState } from 'react';

export default function ProductList({ products }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {  // Add product to cart function
    const foundProduct = cartItems.find((item) => item.id === product.id);
    if (foundProduct) {
    const updatedCart = cartItems.map((item) => // Mapping through all the files to match id
      item.id === product.id
        ? { ...item, quantity: item.quantity + 1 } // Increment quantity if found item by id exists
        : item
    );
    setCartItems(updatedCart);
    // Update local state with cart items
    localStorage.setItem('cartItems', JSON.stringify(updatedCart)); // Update local storage

  } else {
    const oneCart = [...cartItems, { ...product, quantity: 1 }];
    setCartItems(oneCart);
    localStorage.setItem('cartItems', JSON.stringify(oneCart));
  }
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
