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
  NUMBER_VERIFICATION_ROUTE,
  SUBSCRIPTION_ROUTE,
  validatorField
} from '../../../constants';
import { useDispatch, useSelector } from 'react-redux';
import {
  NumberVerificationRequest,
  VerificationRequest
} from '../../../redux/slicers/user';

const NumberVerification = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const hash = useSelector((state) => state?.user?.hash);
  const navigate = useNavigate();

  const changeRoute = (route) => {
    navigate(route);
  };

  const onFinish = (values) => {
    setLoading(true);
    const { code } = values;

    const payloadData = {
      hash: hash,
      otp: code
    };

    dispatch(
      VerificationRequest({
        payloadData,
        responseCallback: (res) => {
          if (res.status) {
            changeRoute(SUBSCRIPTION_ROUTE);
            setLoading(false);
            console.log(res.status, 'res');
          } else {
            setLoading(false);
            console.log(res.errors, 'error');
          }
        }
      })
    );
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <AuthLayout
      className={'number'}
      image={<img src={Images.number} height={'552px'} />}
    >
      <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Space direction="vertical" className={css(AppStyles.w100)}>
          <Space className={css(AppStyles.w100, AppStyles.justifyCenter)}>
            <img src={Images.authLogo} width={'50px'} height={'58px'} />
          </Space>
          <CommonHeading
            level={3}
            textAlign={'center'}
            text={'Phone Number Verification Please Check Your Phone'}
          />
          <CommonTextField
            width="65%"
            margin="0 auto"
            textAlign={'center'}
            text={
              'Add 6 digits verification code sent on your given phone number +0 123 **** ***'
            }
            opacity={'0.5'}
          />
          <CommonInputField
            name={'code'}
            type={'number'}
            className={'auth'}
            placeholder={'5 6 8 9 2 3'}
            suffix={<CommonTextField text={'Resend'} opacity={'0.5'} />}
            rules={[
              {
                validator: (_, value) => {
                  return validatorField(_, value, 6, 6);
                }
              }
            ]}
          />
          <CommonButton
            text={'Submit'}
            loading={loading}
            htmlType="submit"
            classname={css(AppStyles.mTop20)}
          />
        </Space>
      </Form>
    </AuthLayout>
  );
};
export default NumberVerification;
