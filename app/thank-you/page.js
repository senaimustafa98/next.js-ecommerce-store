import styles from './thanks.module.css';
import Head from 'next/head';

export default function ThankYouPage() {
  return (
    <>
      <Head>
        <title>Thank-you Page</title>
        <meta
          name="description"
          content="Thank you for your order! We appreciate your business and will process your order shortly."
        />
      </Head>
      <div className={styles.thankYouContainer}>
        <h1 className={styles.thankYouTitle}>Thank you for your order!</h1>
        <p className={styles.thankYouMessage}>
          🐶 Your order has been received and is being processed 🐕
        </p>
      </div>
    </>
  );
}
