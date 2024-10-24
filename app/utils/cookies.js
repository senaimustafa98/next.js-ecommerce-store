'use server';
import { cookies } from 'next/headers';

// Update cart
export async function getCartCookie() {
  const cookieStore = await cookies();
  const cart = cookieStore.get('cart');
  return cart ? JSON.parse(cart.value) : [];
}

export async function setCartCookie(cart) {
  const validatedCart = cart.map((item) => ({
    ...item,
    price: item.price || 0,
    quantity: item.quantity || 1,
  }));

  const cookieStore = await cookies();
  cookieStore.set('cart', JSON.stringify(validatedCart), {
    path: '/',
    httpOnly: true,
  });
}

export async function deleteCookie(name) {
  const cookieStore = cookies();
  await cookieStore.delete(name);
}

// Retrieve the cart data
export async function getCartItems() {
  const cartData = (await cookies()).get('cart')?.value;
  return cartData ? JSON.parse(cartData) : [];
}
