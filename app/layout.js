import './globals.css';
import Image from 'next/image';
import localFont from 'next/font/local';
import Link from 'next/link';
import { getCartItems } from './utils/cookies';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata = {
  title: {
    default: 'Home | Pawfect Pet Store',
    template: '%s | Pawfect Pet Store',
  },
  description: 'Generated by create next app',
};

export default async function RootLayout({ children }) {
  const cartItems = await getCartItems();
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <header>
          <nav>
            <Link href="/">
              <Image src="/logo.svg" alt="UpLeveled" height={50} width={150} />
            </Link>
          </nav>
          <nav>
            <Link href="/">Home</Link>
          </nav>
          <nav>
            <Link href="/products">Products</Link>
          </nav>
          <nav>
            <Link href="/cart">Cart ({cartCount})</Link>
          </nav>
          <nav>
            <Link href="/checkout">Checkout</Link>
          </nav>
        </header>
        <main>{children}</main>
        <footer>
          Disclaimer: This is a student project for learning purposes only. The
          products and images displayed are not owned by me and are not
          available for purchase.
        </footer>
      </body>
    </html>
  );
}
