import { getProducts } from '../../database/products';
import ProductList from './ProductList';

export default function ProductsPage() {
  const products = getProducts();
  return (
    <div>
      <h1>Available Products</h1>
      <ProductList products={products} />
    </div>
  );
}
