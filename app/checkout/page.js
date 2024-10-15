import CheckOutForm from './checkoutForm.js';
import Head from 'next/head.js';

export default function CheckoutPage() {
  return (
    <>
      <Head>
        <title>Checkout Page</title>
        <meta
          name="description"
          content="Complete your order with our secure checkout process. Fill in your shipping and payment information to finalize your purchase."
        />
      </Head>
      <div>
        <CheckOutForm />
      </div>
    </>
  );
}
