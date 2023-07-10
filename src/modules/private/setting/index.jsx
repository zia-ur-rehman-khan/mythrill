import React from 'react';

import UserInfo from './userInfo';
import UserPassword from './userPassword';
import { Space } from 'antd';
import { AppStyles } from '../../../theme';
import { css } from 'aphrodite';
import './styles.scss';
import SocialLogin from './socialLogin';
import Payment from './payment';
import Subscription from './subscription';
import PaymentList from './paymentList';

const Setting = () => {
  return (
    <Space
      size={25}
      direction="vertical"
      className={`setting-main ${css(AppStyles.w100)}`}
    >
      <UserInfo />
      {/* <SocialLogin /> */}
      <UserPassword />
      <Payment />
      <PaymentList />
      <Subscription />
    </Space>
  );
};

export default Setting;
