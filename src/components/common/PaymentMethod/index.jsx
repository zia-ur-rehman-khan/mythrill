import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './checkOutForm';

const PaymentMethod = () => {
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_GENERAL_KEY);

  // const options = {
  //   mode: 'payment',
  //   amount: 1099,
  //   currency: 'usd',
  //   // Fully customizable with appearance API.
  //   appearance: {
  //     /*...*/
  //   }
  // };
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default PaymentMethod;
