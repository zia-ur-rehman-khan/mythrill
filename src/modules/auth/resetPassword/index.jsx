import React, { useEffect, useState } from 'react';
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
import { useLocation, useNavigate, useRoutes } from 'react-router-dom';
import {
  HOME_ROUTE,
  NUMBER_VERIFICATION_ROUTE,
  handlePassworMatch,
  lOGIN_ROUTE,
  passwordValidation
} from '../../../constants';
import { CommonPasswordInput } from '../../../components/common';
import {
  ResetPasswordRequest,
  userLoginRequest
} from '../../../redux/slicers/user';
import { useDispatch } from 'react-redux';

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { email, code } = location?.state || {};

  const changeRoute = (route) => {
    navigate(route);
  };

  useEffect(() => {
    if (!email && !code) {
      console.log(email, code);
      navigate(HOME_ROUTE);
    }
  }, [email, code]);

  const onFinish = (values) => {
    setLoading(true);
    const { password } = values;

    const payloadData = {
      email: email,
      password: password,
      otp: code
    };

    dispatch(
      ResetPasswordRequest({
        payloadData,
        responseCallback: (res) => {
          if (res.status) {
            changeRoute(lOGIN_ROUTE);
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

  const [form] = Form.useForm();
  const { getFieldValue } = form;
  return (
    <AuthLayout
      className="email"
      image={<img src={Images.reset} className="reset-image" />}
    >
      <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Space direction="vertical" className={css(AppStyles.w100)}>
          <Space className={css(AppStyles.w100, AppStyles.justifyCenter)}>
            <img src={Images.authLogo} width={'50px'} height={'58px'} />
          </Space>
          <CommonHeading
            level={3}
            textAlign={'center'}
            text={'Reset your Password Mythril'}
          />
          <Space direction="vertical" className={css(AppStyles.w100)}>
            <CommonTextField text={'New Password'} opacity={'0.5'} />
            <CommonPasswordInput
              name={'password'}
              placeholder={'**************'}
              rules={[
                {
                  validator: (_, value) => {
                    return passwordValidation(_, value);
                  }
                }
              ]}
            />
          </Space>
          <Space direction="vertical" className={css(AppStyles.w100)}>
            <CommonTextField text={'Confirm Password'} opacity={'0.5'} />
            <CommonPasswordInput
              name={'confirm password'}
              placeholder={'**************'}
              rules={[
                {
                  validator: (_, value) => {
                    return handlePassworMatch(
                      _,
                      value,
                      getFieldValue('password')
                    );
                  }
                }
              ]}
            />
          </Space>
          <CommonButton
            loading={loading}
            htmlType="submit"
            text={'Reset Password'}
            classname={css(AppStyles.mTop20)}
          />
        </Space>
      </Form>
    </AuthLayout>
  );
};
export default ResetPassword;
