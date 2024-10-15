import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Product Page</title>
        <meta name="description" content="Welcome to the Pawfect Pet Store." />
      </Head>
      <div className={styles.hero}>
        <h1>Welcome to the Pawfect Pet Store!</h1>
        <h2>Find almost everything your dog needs!</h2>
        <Link
          href="/products"
          data-test-id="products-link"
          className={styles.shopNowButton}
        >
          Shop Now
        </Link>
      </div>

      <div className={styles.productsSection}>
        <h2>Available Products</h2>
        <div className={styles.productGrid}>
          {/* Product 1 */}
          <Link
            href="/products/1"
            data-test-id="product-1"
            className={styles.productLink}
          >
            <Image
              src="/images/dogbrush.jpg"
              alt="Product 1"
              height={350}
              width={350}
            />
            <p>Product 1</p>
          </Link>

          {/* Product 2 */}
          <Link
            href="/products/2"
            data-test-id="product-2"
            className={styles.productLink}
          >
            <Image
              src="/images/dogtoy.jpg"
              alt="Product 2"
              height={350}
              width={350}
            />
            <p>Product 2</p>
          </Link>

          {/* Product 3 */}
          <Link
            href="/products/3"
            data-test-id="product-3"
            className={styles.productLink}
          >
            <Image
              src="/images/dognail.jpg"
              alt="Product 3"
              height={350}
              width={350}
            />
            <p>Product 3</p>
          </Link>

          {/* Product 4 */}
          <Link
            href="/products/4"
            data-test-id="product-4"
            className={styles.productLink}
          >
            <Image
              src="/images/dogcave.jpg"
              alt="Product 4"
              height={350}
              width={350}
            />
            <p>Product 4</p>
          </Link>
        </div>
      </div>
    </>
  );
}
