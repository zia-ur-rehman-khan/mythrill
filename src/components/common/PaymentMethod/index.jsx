import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './checkOutForm';

const PaymentMethod = ({ setIscard, setIsModal, isCard }) => {
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_GENERAL_KEY);

  const onAdd = () => {
    setIscard(true);
    setIsModal(false);
  };

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm onAdd={onAdd} isCard={isCard} />
    </Elements>
  );
};

export default PaymentMethod;
