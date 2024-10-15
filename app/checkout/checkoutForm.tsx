'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getCartItems, deleteCookie } from '../utils/cookies';
import styles from './checkout.module.css';

// Define the structure of the form data
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  cardNumber: string;
  expirationDate: string;
  securityCode: string;
}

export default function CheckOutForm() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    cardNumber: '',
    expirationDate: '',
    securityCode: '',
  });
  const router = useRouter();

  useEffect(() => {
    async function loadCart() {
      const items = await getCartItems();
      setCartItems(items || []);
    }
    loadCart();
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + (parseFloat(item.price) * item.quantity), 0).toFixed(2);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name as keyof FormData]: value }));
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Check for empty fields
    for (const key in formData) {
      if (!formData[key as keyof typeof formData]) {
        alert(`${key.replace(/([A-Z])/g, ' $1')} is required.`);
        return;
      }
    }
    await deleteCookie('cart');
    router.push('/thank-you');
  };

  return (
    <div className={styles.checkoutContainer}>
      <h1>Checkout</h1>
      <div>
        {cartItems.map((item) => (
          <div key={item.id}>
            <h3>{item.name}</h3>
            <p>Price: ${parseFloat(item.price).toFixed(2)}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Subtotal: ${(parseFloat(item.price) * item.quantity).toFixed(2)}</p>
          </div>
        ))}
        <h2 className={styles.totalAmount}>Total: ${calculateTotal()}</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} className={styles.formInput} />
        <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} className={styles.formInput} />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className={styles.formInput} />
        <input type="text" name="address" placeholder="Address" onChange={handleChange} className={styles.formInput} />
        <input type="text" name="city" placeholder="City" onChange={handleChange} className={styles.formInput} />
        <input type="text" name="postalCode" placeholder="Postal Code" onChange={handleChange} className={styles.formInput} />
        <input type="text" name="country" placeholder="Country" onChange={handleChange} className={styles.formInput} />
        <input type="text" name="cardNumber" placeholder="Credit Card Number" onChange={handleChange} className={styles.formInput} />
        <input type="text" name="expirationDate" placeholder="Expiration Date (MM/YY)" onChange={handleChange} className={styles.formInput} />
        <input type="text" name="securityCode" placeholder="Security Code" onChange={handleChange} className={styles.formInput} />
        <button type="submit" className={styles.submitButton}>Confirm Order</button>
      </form>
    </div>
  );
}
