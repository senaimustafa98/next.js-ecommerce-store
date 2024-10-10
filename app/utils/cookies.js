'use server';
import { cookies } from 'next/headers';

export async function getCartCookie() {
  const cart = cookies().get('cart');
  return cart ? JSON.parse(cart.value) : [];
}

export async function setCartCookie(cart) {
  cookies().set('cart', JSON.stringify(cart), { path: '/', httpOnly: true });
}

export async function deleteCookie(name) {
  const cookieStore = cookies();
  await cookieStore.delete(name);
}


export async function getCartItems() {
  const cartData = (await cookies()).get('cart')?.value;
  return cartData ? JSON.parse(cartData) : [];
}
