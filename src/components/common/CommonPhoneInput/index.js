/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Form, Input } from 'antd';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';

import './styles.scss';

const CommonPhoneInput = ({
  name,
  disabled,
  className,
  rules = true,
  autoFocus,
  onKeyDown,
  reference
}) => {
  const [phoneValid, setPhoneValid] = useState(true);
  return (
    <Form.Item
      name={name}
      rules={
        rules && [
          {
            required: true,
            message: 'Phone is required'
          },
          {
            validator: (_, value) => {
              console.log({ phoneValid });
              if (value && !phoneValid) {
                return Promise.reject(new Error('Invalid Number'));
              } else {
                return Promise.resolve();
              }
            }
          }
        ]
      }
    >
      <PhoneInput
        ref={reference}
        inputProps={{
          autoFocus: autoFocus,
          onKeyDown: onKeyDown
        }}
        className={className}
        country={'us'}
        dropdownClass="test"
        disabled={disabled}
        onChange={(value, country, e, formattedValue) => {
          const { format, dialCode } = country;
          if (
            format?.length === formattedValue?.length &&
            (value.startsWith(dialCode) || dialCode.startsWith(value))
          ) {
            setPhoneValid(true);
          } else {
            setPhoneValid(false);
          }
        }}
        isValid={phoneValid}
      />
    </Form.Item>
  );
};

export default CommonPhoneInput;
