import 'server-only'

const products = [
  {
    id: 1,
    name: 'Product 1',
    image: '/logo.svg',
    price: '19.99',
  },
  {
    id: 2,
    name: 'Product 2',
    image: '/logo.svg',
    price: '29.99',
  },
  {
    id: 3,
    name: 'Product 3',
    image: '/logo.svg',
    price: '39.99',
  },
  {
    id: 4,
    name: 'Product 4',
    image: '/logo.svg',
    price: '49.99',
  },
];
export function getProducts() {
  return products;
}

export function getProduct(id) {
  return products.find((product) => product.id === id);
}
