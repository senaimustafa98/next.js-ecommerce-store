import styles from './thanks.module.css';

export default function ThankYouPage() {
  return (
    <div className={styles.thankYouContainer}>
      <h1 className={styles.thankYouTitle}>Thank you for your order!</h1>
      <p className={styles.thankYouMessage}>
        🐶 Your order has been received and is being processed 🐕
      </p>
    </div>
  );
}
