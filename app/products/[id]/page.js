import { getProductInsecure } from '../../../database/products';
import ProductPage from './ProductPage';

export default async function ProductDetailPage({ params }) {
  const resolvedParams = await params;
  const { id } = resolvedParams; // Directly destructure params
  const product = await getProductInsecure(Number(id));

  return <ProductPage product={product} />;
}
