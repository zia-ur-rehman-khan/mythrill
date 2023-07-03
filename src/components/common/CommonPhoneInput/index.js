/* eslint-disable react/prop-types */
import React from 'react';
import { Form, Input } from 'antd';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';

import './styles.scss';

const CommonPhoneInput = ({ name, disabled, rules }) => {
  return (
    <Form.Item name={name} rules={rules}>
      <PhoneInput country={'us'} dropdownClass="test" disabled={disabled} />
    </Form.Item>
  );
};

export default CommonPhoneInput;
