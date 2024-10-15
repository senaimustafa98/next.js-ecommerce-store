import { notFound } from 'next/navigation';
import { getProductInsecure } from '../../../database/products';
import ProductPage from './ProductPage';

export default async function ProductDetailPage({ params }) {
  const { id } = await params; // Await params directly and destructure the id
  const product = await getProductInsecure(Number(id));

  if (!product) {
    notFound();
  }

  return <ProductPage product={product} />;
}
