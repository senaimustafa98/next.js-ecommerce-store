import { cache } from 'react';
import { sql } from './connect';

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
};

export const getProductsInsecure = cache(async (): Promise<Product[]> => {
  const products = await sql<
    { id: number; name: string; description: string; price: string }[]
  >`
    SELECT
      *
    FROM
      products
  `;

  // Convert the price from string to number before returning the products
  return products.map((product) => ({
    ...product,
    price: parseFloat(product.price),
  }));
});

export const getProductInsecure = cache(
  async (id: number): Promise<Product> => {
    const products = await sql<
      { id: number; name: string; description: string; price: string }[]
    >`
      SELECT
        *
      FROM
        products
      WHERE
        id = ${id}
    `;

    if (!products[0]) {
      throw new Error(`Product with id ${id} not found`);
    }

    // Convert the price from string to number before returning the product
    return {
      ...products[0],
      price: parseFloat(products[0].price),
    };
  },
);
