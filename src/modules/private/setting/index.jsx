import React from 'react';

import UserInfo from './userInfo';
import UserPassword from './userPassword';
import { Space } from 'antd';
import { AppStyles } from '../../../theme';
import { css } from 'aphrodite';
import './styles.scss';

const Setting = () => {
  return (
    <Space
      size={25}
      direction="vertical"
      className={`setting-main ${css(AppStyles.w100)}`}
    >
      <UserInfo />
      <UserPassword />
    </Space>
  );
};

export default Setting;
