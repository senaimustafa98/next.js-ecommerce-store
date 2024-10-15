import { getProductsInsecure } from '../../database/products';
import ProductList from './ProductList';
import styles from './ProductList.module.css';

export default async function ProductsPage() {
  const products = await getProductsInsecure();
  return (
    <>
      <div className={styles.pageContainer}>
        <h1 className={styles.pageTitle}>Our Products:</h1>
        <ProductList products={products} />
      </div>
    </>
  );
}
