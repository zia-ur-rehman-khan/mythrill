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
import { AppStyles, Images } from '../../../../theme';
import { css } from 'aphrodite';
import CommonInputField from '../../CommonInput';
import { ALERT_TYPES, HOME_ROUTE, validatorField } from '../../../../constants';
import CommonDropdown from '../../CommonDropdown';
import CommonButton from '../../CommonButton';
import { error } from 'highcharts';
import {
  cardHandel,
  cardfeildHandel,
  cardfieldHandel,
  toastAlert
} from '../../../../services/utils';
import { useDispatch } from 'react-redux';
import {
  subscriptionRequest,
  updateCardRequest
} from '../../../../redux/slicers/user';
import { useNavigate } from 'react-router';

const CheckoutForm = ({ onAdd, subscription }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [cardIcon, setCardIcon] = useState('unknown');
  const [isValid, setIsValid] = useState({
    card: false,
    expiry: false,
    cvc: false
  });
  const [showError, setShowError] = useState(null);

  const navigate = useNavigate();

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
    const { card, expiry, cvc } = isValid;
    if (!card || !expiry || !cvc) {
      return setShowError(isValid);
    }
    setIsLoading(true);
    const cardElement = elements.getElement(CardNumberElement);
    const cardExpiryElement = elements.getElement(CardExpiryElement);
    const cardCvcElement = elements.getElement(CardCvcElement);

    const { error, token } = await stripe.createToken(cardElement);

    if (error) {
      console.log(error.message, 'error');
      toastAlert(error.message, ALERT_TYPES.error);
      setIsLoading(false);
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
                    navigate(HOME_ROUTE);
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
                    cardElement.clear();
                    cardExpiryElement.clear();
                    cardCvcElement.clear();
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
          <div className="card-field">
            <CardNumberElement
              onChange={(e) => {
                setIsValid((pre) => ({ ...pre, card: e?.complete }));
                setCardIcon(e?.brand);
              }}
              options={{
                style: cardNumberStyle,
                placeholder: 'Enter card number'
              }}
            />
            {showError?.card === false && !isValid?.card && (
              <CommonTextField
                text={'Please enter valid card data'}
                color={'#ff4d4f'}
                fontSize={'12px'}
              />
            )}
            <Space size={0} className="card-icons">
              <img
                src={Images[cardfieldHandel(cardIcon)]}
                width={'45px'}
                height={'28px'}
              />
            </Space>
          </div>
        </Space>
        <div className={'expiry-section'}>
          <Space direction="vertical" className={css(AppStyles.w100)}>
            <CommonTextField text={'Expiry'} />
            <CardExpiryElement
              onChange={(e) => {
                setIsValid((pre) => ({ ...pre, expiry: e?.complete }));
              }}
              options={{
                style: cardNumberStyle
              }}
            />
            {showError?.expiry === false && !isValid?.expiry && (
              <CommonTextField
                text={'Please enter valid expiry date'}
                color={'#ff4d4f'}
                fontSize={'12px'}
              />
            )}
          </Space>
          <Space direction="vertical" className={'csv-feild'}>
            <CommonTextField text={'CVC'} />
            <CardCvcElement
              onChange={(e) => {
                setIsValid((pre) => ({ ...pre, cvc: e?.complete }));
              }}
              options={{
                style: cardNumberStyle
              }}
            />
            {showError?.cvc === false && !isValid?.cvc && (
              <CommonTextField
                text={'Please enter valid cvc data'}
                color={'#ff4d4f'}
                fontSize={'12px'}
              />
            )}
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
