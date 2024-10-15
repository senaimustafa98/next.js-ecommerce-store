import { cache } from 'react';
import { sql } from './connect';

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
};

export const getProductsInsecure = cache(async () => {
  const products = await sql<Product[]>`
    SELECT
      *
    FROM
      products
  `;
  return products;
});

export const getProductInsecure = cache(async (id: number) => {
  const products = await sql<Product[]>`
    SELECT
      *
    FROM
      products
    WHERE
      id = ${id}
  `;
  return products[0];
});
