/* eslint-disable react/prop-types */
import React from 'react';
import { Form, Input } from 'antd';
import './styles.scss';
import { AppStyles, Images } from '../../../theme';
import { css } from 'aphrodite';

const CommonPasswordInput = ({
  placeholder,
  name,
  className,
  type,
  height,
  rules,
  autoFocus,
  reference,
  onKeyDown
}) => {
  return (
    <Form.Item name={name} rules={rules}>
      <Input.Password
        onKeyDown={onKeyDown}
        ref={reference}
        autoFocus={autoFocus}
        iconRender={(visible) =>
          visible ? <img src={Images.eye} /> : <img src={Images.crossEye} />
        }
        style={{ height }}
        type={type}
        className={`ad-input  ${className || 'common-password'}`}
        placeholder={placeholder}
      />
    </Form.Item>
  );
};

export default CommonPasswordInput;
