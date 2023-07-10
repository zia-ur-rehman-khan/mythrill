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
import { ALERT_TYPES, validatorField } from '../../../../constants';
import CommonDropdown from '../../CommonDropdown';
import CommonButton from '../../CommonButton';
import { error } from 'highcharts';
import { toastAlert } from '../../../../services/utils';

const CheckoutForm = ({ onAdd, isCard, subscription }) => {
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
    console.log(values, 'values');
    const cardElement = elements.getElement(CardNumberElement);
    const { tokenError, token } = await stripe.createToken(cardElement);

    if (tokenError) {
      console.log(error.message, 'error');
      toastAlert(error.message, ALERT_TYPES.error);
    } else {
      console.log('Card Details:', token);
      toastAlert(
        `Card ${isCard ? 'updated ' : ' added'} successfully`,
        ALERT_TYPES.success
      );
      {
        !subscription && onAdd();
      }
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
        <div className={!subscription && 'expiry-section'}>
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
        <div className={!subscription && 'expiry-section'}>
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
      <CommonButton text={isCard ? 'Update' : 'Add'} htmlType="submit" />
    </Form>
  );
};

export default CheckoutForm;
