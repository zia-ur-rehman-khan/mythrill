import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './checkOutForm';

const PaymentMethod = ({ setIsModal, subscription }) => {
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_GENERAL_KEY);

  const onAdd = () => {
    setIsModal(false);
  };

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm subscription={subscription} onAdd={onAdd} />
    </Elements>
  );
};

export default PaymentMethod;
