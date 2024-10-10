import { getProductsInsecure } from '../../database/products';
import ProductList from './ProductList';

export default async function ProductsPage() {
  const products = await getProductsInsecure();
  return (
    <div>
      <h1>Available Products</h1>
      <ProductList products={products} />
    </div>
  );
}
