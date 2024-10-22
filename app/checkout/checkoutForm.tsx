'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getCartItems, deleteCookie } from '../utils/cookies';
import styles from './checkout.module.css';

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

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export default function CheckOutForm() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
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
    getCartItems()
      .then((items) => {
        setCartItems(items || []);
      })
      .catch((error) => {
        console.error('Error loading cart items:', error);
      });
  }, []);

  const calculateTotal = () => {
    return cartItems
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name as keyof FormData]: value,
    }));
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
    void router.push('/thank-you');
  };

  return (
    <div className={styles.checkoutContainer}>
      <h1>Checkout</h1>
      <div>
        {cartItems.map((item) => (
          <div key={`item-${item.id}`}>
            <h3>{item.name}</h3>
            <p>Price: ${item.price.toFixed(2)}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
        <h2 className={styles.totalAmount}>Total: ${calculateTotal()}</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          name="firstName"
          placeholder="First Name"
          onChange={handleChange}
          className={styles.formInput}
          data-test-id="checkout-first-name" // Added test id
        />
        <input
          name="lastName"
          placeholder="Last Name"
          onChange={handleChange}
          className={styles.formInput}
          data-test-id="checkout-last-name" // Added test id
        />
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className={styles.formInput}
          data-test-id="checkout-email" // Added test id
        />
        <input
          name="address"
          placeholder="Address"
          onChange={handleChange}
          className={styles.formInput}
          data-test-id="checkout-address" // Added test id
        />
        <input
          name="city"
          placeholder="City"
          onChange={handleChange}
          className={styles.formInput}
          data-test-id="checkout-city" // Added test id
        />
        <input
          name="postalCode"
          placeholder="Postal Code"
          onChange={handleChange}
          className={styles.formInput}
          data-test-id="checkout-postal-code" // Added test id
        />
        <input
          name="country"
          placeholder="Country"
          onChange={handleChange}
          className={styles.formInput}
          data-test-id="checkout-country" // Added test id
        />
        <input
          name="cardNumber"
          placeholder="Credit Card Number"
          onChange={handleChange}
          className={styles.formInput}
          data-test-id="checkout-credit-card" // Added test id
        />
        <input
          name="expirationDate"
          placeholder="Expiration Date (MM/YY)"
          onChange={handleChange}
          className={styles.formInput}
          data-test-id="checkout-expiration-date" // Added test id
        />
        <input
          name="securityCode"
          placeholder="Security Code"
          onChange={handleChange}
          className={styles.formInput}
          data-test-id="checkout-security-code" // Added test id
        />
        <button className={styles.submitButton} data-test-id="checkout-confirm-order">
          Confirm Order
        </button>
      </form>
    </div>
  );
}
