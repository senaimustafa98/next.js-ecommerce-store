'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getCartItems, deleteCookie } from '../utils/cookies';
import styles from './checkout.module.css';


export default function CheckOutForm() {
  const [cartItems, setCartItems] = useState([]);
  const [formData, setFormData] = useState({
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
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check for empty fields
    for (const key in formData) {
      if (!formData[key]) {
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
          <div key={item.id} className={styles.productItem}>
            <h3 className={styles.productName}>{item.name}</h3>
            <p className={styles.productPrice}>Price: ${item.price}</p>
            <p className={styles.productQuantity}>Quantity: {item.quantity}</p>
            <p className={styles.productSubtotal}>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
        <h2 className={styles.totalAmount}>Total: ${calculateTotal()}</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} className={styles.formInput} data-test-id="checkout-first-name" />
        <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} className={styles.formInput} data-test-id="checkout-last-name" />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className={styles.formInput} data-test-id="checkout-email" />
        <input type="text" name="address" placeholder="Address" onChange={handleChange} className={styles.formInput} data-test-id="checkout-address" />
        <input type="text" name="city" placeholder="City" onChange={handleChange} className={styles.formInput} data-test-id="checkout-city" />
        <input type="text" name="postalCode" placeholder="Postal Code" onChange={handleChange} className={styles.formInput} data-test-id="checkout-postal-code" />
        <input type="text" name="country" placeholder="Country" onChange={handleChange} className={styles.formInput} data-test-id="checkout-country" />
        <input type="text" name="cardNumber" placeholder="Credit Card Number" onChange={handleChange} className={styles.formInput} data-test-id="checkout-credit-card" />
        <input type="text" name="expirationDate" placeholder="Expiration Date (MM/YY)" onChange={handleChange} className={styles.formInput} data-test-id="checkout-expiration-date" />
        <input type="text" name="securityCode" placeholder="Security Code" onChange={handleChange} className={styles.formInput} data-test-id="checkout-security-code" />
        <button type="submit" className={styles.submitButton} data-test-id="checkout-confirm-order">Confirm Order</button>
      </form>
    </div>
  );
}
