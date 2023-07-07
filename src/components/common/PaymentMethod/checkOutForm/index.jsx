import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { loadStripe } from '@stripe/stripe-js';
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement
} from '@stripe/react-stripe-js';
import { Form, Space } from 'antd';
import './styles.scss';
import CommonTextField from '../../TextField';
import { AppStyles } from '../../../../theme';
import { css } from 'aphrodite';
import CommonInputField from '../../CommonInput';
import { validatorField } from '../../../../constants';
import CommonDropdown from '../../CommonDropdown';
import CommonButton from '../../CommonButton';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const cardNumberStyle = {
    base: {
      fontSize: '12px',
      color: '#ffffff'
    },
    invalid: {
      color: '#fa755a'
    }
  };

  const onFinish = async (values) => {
    if (elements == null) {
      return;
    }

    const cardElement = elements.getElement(CardNumberElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement
    });

    if (error) {
      console.log(error.message);
    } else {
      const cardDetails = {
        currency: 'usd',
        amount: 1000,
        cardBrand: paymentMethod.card.brand,
        cardLast4: paymentMethod.card.last4,
        cardExpMonth: paymentMethod.card.exp_month,
        cardExpYear: paymentMethod.card.exp_year,
        bank_account: {
          account_number: '1234567890', // Replace with the appropriate bank account number
          country: 'US', // Replace with the appropriate country value
          routing_number: '123456789', // Replace with the appropriate routing number
          account_holder_name: 'John Doe', // Replace with the account holder name
          account_holder_type: 'individual' // Replace with the account holder type
        }
      };

      console.log('Card Details:', paymentMethod);

      const { tokenError, token } = await stripe.createToken(
        'bank_account',
        cardDetails
      );
      console.log('🚀 ~ file: index.jsx:63 ~ onFinish ~ token:', token);
    }
  };

  return (
    <Form onFinish={onFinish}>
      <Space direction="vertical" className={css(AppStyles.w100)}>
        <Space direction="vertical" className={css(AppStyles.w100)}>
          <CommonTextField text={'Card number'} />
          <CardNumberElement
            options={{
              style: cardNumberStyle,
              placeholder: 'Enter card number'
            }}
          />
        </Space>
        <div className={'expiry-section'}>
          <Space direction="vertical" className={css(AppStyles.w100)}>
            <CommonTextField text={'Expiry'} />
            <CardExpiryElement
              options={{
                style: cardNumberStyle
              }}
            />
          </Space>
          <Space direction="vertical" className={css(AppStyles.w100)}>
            <CommonTextField text={'CVC'} />
            <CardCvcElement
              options={{
                style: cardNumberStyle
              }}
            />
          </Space>
        </div>
        <div className={'expiry-section'}>
          <Space direction="vertical" className={css(AppStyles.w100)}>
            <CommonTextField text={'Country'} />
          </Space>
          <Space direction="vertical" className={css(AppStyles.w100)}>
            <CommonTextField text={'Postal code'} />
            <CommonInputField
              name={'code'}
              type={'number'}
              placeholder={'5 6 8 9 2 3'}
              className={'auth'}
              rules={[
                {
                  validator: (_, value) => {
                    return validatorField(_, value, 6, 6);
                  }
                }
              ]}
            />
          </Space>
        </div>
      </Space>
      <CommonButton text={'Login'} htmlType="submit" />
    </Form>
  );
};

export default CheckoutForm;
