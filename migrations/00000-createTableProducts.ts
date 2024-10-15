import { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE products (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      name varchar(255) NOT NULL,
      description text NOT NULL,
      price numeric(10, 2) NOT NULL
    )
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE products`;
}
