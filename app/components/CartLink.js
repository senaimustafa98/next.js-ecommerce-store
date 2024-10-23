'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getCartItems } from '../utils/cookies';

export default function CartLink() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    async function fetchCartItems() {
      const cartItems = await getCartItems();
      const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
      setCartCount(totalCount);
    }

    fetchCartItems();
  }, []);

  return (
    <Link href="/cart" data-test-id="cart-link">
      Cart ({cartCount})
    </Link>
  );
}
