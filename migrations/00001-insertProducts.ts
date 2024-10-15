import { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    INSERT INTO
      products (name, description, price)
    VALUES
      (
        'Product 1',
        'Description for product 1',
        19.99
      ),
      (
        'Product 2',
        'Description for product 2',
        29.99
      ),
      (
        'Product 3',
        'Description for product 3',
        39.99
      ),
      (
        'Product 4',
        'Description for product 4',
        49.99
      )
  `;
}

export async function down(sql: Sql) {
  await sql`
    DELETE FROM products
    WHERE
      name IN (
        'Product 1',
        'Product 2',
        'Product 3',
        'Product 4'
      );
  `;
}
