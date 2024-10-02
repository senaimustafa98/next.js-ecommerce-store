import 'server-only';

const products = [
  {
    id: 1,
    name: 'Product1',
    price: '19.99',
  },
  {
    id: 2,
    name: 'Product2',
    price: '29.99',
  },
  {
    id: 3,
    name: 'Product3',
    price: '39.99',
  },
  {
    id: 4,
    name: 'Product4',
    price: '49.99',
  },
];

export function getProducts() {
  return products;
}

export function getProduct(id) {
  return products.find((product) => product.id === id);
}
