import { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    INSERT INTO
      products (name, description, price)
    VALUES
      (
        'Fur Brush',
        'A gentle brush designed to remove loose fur and prevent matting.',
        19.99
      ),
      (
        'Chew Tug Toy',
        'Durable toy for interactive play, perfect for chewing.',
        29.99
      ),
      (
        'Nail Clippers',
        'User-friendly clippers for quick and safe nail trimming.',
        39.99
      ),
      (
        'Dog Cave Bed',
        'Cozy bed that provides a sense of security and comfort.',
        49.99
      )
  `;
}

export async function down(sql: Sql) {
  await sql`
    DELETE FROM products
    WHERE
      name IN (
        'Fur Brush',
        'Chew Tug Toy',
        'Nail Clippers',
        'Dog Cave Bed'
      );
  `;
}
