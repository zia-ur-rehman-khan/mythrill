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
import {
  EMAIL_RULE,
  EMAIL_VERIFICATION_ROUTE,
  NUMBER_VERIFICATION_ROUTE
} from '../../../constants';
import { ForgotRequest } from '../../../redux/slicers/user';
import { useDispatch } from 'react-redux';
import { CommonPhoneInput } from '../../../components/common';

const Forgot = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const changeRoute = (route, phoneNumber) => {
    navigate(route, { state: { number: phoneNumber, forgot: true } });
  };

  const onFinish = (values) => {
    setLoading(true);
    const { phoneNumber } = values;

    const payloadData = {
      phone: '+' + phoneNumber
    };

    dispatch(
      ForgotRequest({
        payloadData,
        responseCallback: (res) => {
          if (res.status) {
            changeRoute(NUMBER_VERIFICATION_ROUTE, '+' + phoneNumber);
            setLoading(false);
            console.log(res, 'res');
          } else {
            setLoading(false);
            console.log(res.errors, 'error');
          }
        }
      })
    );
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
              'Enter your registered phone number below to receive password reset instruction'
            }
            opacity={'0.5'}
          />

          <Space direction="vertical" className={css(AppStyles.w100)}>
            <CommonTextField text={'Phone Number'} opacity={'0.5'} />

            <CommonPhoneInput name={'phoneNumber'} autoFocus={true} />
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
