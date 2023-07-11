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
import { useDispatch } from 'react-redux';
import {
  subscriptionRequest,
  updateCardRequest
} from '../../../../redux/slicers/user';

const CheckoutForm = ({ onAdd, subscription }) => {
  const [isLoading, setIsLoading] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  const cardNumberStyle = {
    base: {
      fontSize: '12px',
      color: '#ffffff'
    },
    invalid: {
      color: '#fa755a'
    }
  };

  const onFinish = async () => {
    setIsLoading(true);
    const cardElement = elements.getElement(CardNumberElement);
    const { tokenError, token } = await stripe.createToken(cardElement);

    if (tokenError) {
      console.log(error.message, 'error');
      toastAlert(error.message, ALERT_TYPES.error);
    } else {
      const payloadData = { token: token.id };
      {
        subscription
          ? dispatch(
              subscriptionRequest({
                payloadData,
                responseCallback: (res) => {
                  setIsLoading(false);
                  if (res.status) {
                    toastAlert(
                      'Subscription successfully',
                      ALERT_TYPES.success
                    );
                  } else {
                    console.log(res.errors, 'error');
                  }
                }
              })
            )
          : dispatch(
              updateCardRequest({
                payloadData,
                responseCallback: (res) => {
                  setIsLoading(false);
                  if (res.status) {
                    toastAlert(
                      'Card updated successfully',
                      ALERT_TYPES.success
                    );
                    onAdd();
                  } else {
                    console.log(res.errors, 'error');
                  }
                }
              })
            );
      }
    }
  };

  return (
    <Form onFinish={onFinish}>
      <Space
        direction="vertical"
        className={subscription ? 'subscription' : 'add-card'}
      >
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
          <Space direction="vertical" className={'csv-feild'}>
            <CommonTextField text={'CVC'} />
            <CardCvcElement
              options={{
                style: cardNumberStyle
              }}
            />
          </Space>
        </div>
        <CommonButton
          text={subscription ? 'Confirm' : 'Update'}
          htmlType="submit"
          topClass={'card-but'}
          loading={isLoading}
        />
      </Space>
    </Form>
  );
};

export default CheckoutForm;
