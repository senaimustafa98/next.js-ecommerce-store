'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getCartItems, deleteCookie } from '../utils/cookies';

export default function CheckOutForm() {
  const [cartItems, setCartItems] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function loadCart() {
      const items = await getCartItems();
      setCartItems(items || []);
    }
    loadCart();
  }, []);


  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  };

  const handleSubmit = async () => {
    await deleteCookie('cart');
    router.push('/order-confirmed');
  };

  return (
    <div>
      <h1>Checkout</h1>
      <div>
        {cartItems.map((item) => (
          <div key={item.id}>
            <h3>{item.name}</h3>
            <p>Price: ${item.price}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
        <h2>Total: ${calculateTotal()}</h2>
      </div>
      <button onClick={handleSubmit}>Confirm Order</button>
    </div>
  );
}
