import React from 'react';
import { getProduct} from '../../../database/products.js';
import Image from 'next/image.js';

export async function generateMetaData(props) {
  const product = getProduct(Number((await props.params).id)); // fetching product based on id
  return {
    title: product.name,
    description: 'This is my single product page ',
  };
}


export default async function ProductPage(props) {
  const product = getProduct(Number((await props.params).id)); // extracting id from params and using Number to get it as a number not a string
  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <h2>{product.name} page</h2>
      <div>
      <Image src={`/images/${product.name.toLowerCase()}.svg`} alt={product.name}
      height={250}
      width={350} />
      </div>
    </div>
  )
}
