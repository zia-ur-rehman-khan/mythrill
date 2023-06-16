import React, { useState } from 'react';
import './styles.scss';
import { AppStyles, Images } from '../../../theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

import {
  AuthLayout,
  CommonButton,
  CommonHeading,
  CommonInputField,
  CommonTextField
} from '../../../components';
import { Checkbox, Form, Input, Space } from 'antd';
import { css } from 'aphrodite';
import { useNavigate } from 'react-router-dom';
import { EMAIL_RULE } from '../../../constants';

const Forgot = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const changeRoute = (route) => {
    navigate(route);
  };

  const onFinish = (values) => {
    setLoading(true);

    changeRoute('/email');
  };
  const onFinishFailed = (errorInfo) => {};
  return (
    <AuthLayout image={<img src={Images.forgot} className="forgot-image" />}>
      <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Space direction="vertical" className={css(AppStyles.w100)}>
          <Space className={css(AppStyles.w100, AppStyles.justifyCenter)}>
            <img src={Images.authLogo} width={'50px'} height={'58px'} />
          </Space>
          <CommonHeading
            level={3}
            textAlign={'center'}
            text={'Forgot your Mythril password'}
          />
          <CommonTextField
            width="65%"
            margin="0 auto"
            textAlign={'center'}
            text={
              'Enter your registered email below to receive password reset instruction'
            }
            opacity={'0.5'}
          />

          <Space direction="vertical" className={css(AppStyles.w100)}>
            <CommonTextField text={'Email Address'} opacity={'0.5'} />
            <CommonInputField
              name="email"
              className={'auth'}
              placeholder={'john.smith@domain.com'}
              rules={EMAIL_RULE}
            />
          </Space>

          <CommonButton
            loading={loading}
            text={'Send'}
            htmlType="submit"
            classname={css(AppStyles.mTop20)}
          />
        </Space>
      </Form>
    </AuthLayout>
  );
};
export default Forgot;
