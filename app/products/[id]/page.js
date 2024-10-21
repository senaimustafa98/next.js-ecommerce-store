import { getProductInsecure } from '../../../database/products';
import ProductPage from './ProductPage';

export default async function ProductDetailPage({ params }) {
  const { id } = params; // Directly destructure params
  const product = await getProductInsecure(Number(id));

  // Assuming getProductInsecure throws an error if the product is not found
  return <ProductPage product={product} />;
}
