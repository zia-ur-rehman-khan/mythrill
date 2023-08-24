import React, { useState } from 'react';
import './styles.scss';
import { AppStyles, Images } from '../../../theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

import {
  CommonButton,
  CommonHeading,
  CommonInputField,
  CommonTextField
} from '../../../components';
import { Checkbox, Form, Input, Space } from 'antd';
import { css } from 'aphrodite';
import AuthLayout from '../../../components/AuthLayout';
import { useNavigate } from 'react-router-dom';
import {
  CommonPasswordInput,
  CommonPhoneInput
} from '../../../components/common';
import DataHandler from '../../../services/DataHandler';
import {
  checkPasswordValidation,
  getFieldValue,
  userPlatform
} from '../../../services/utils';
import {
  EMAIL_RULE,
  HOME_ROUTE,
  NUMBER_VERIFICATION_ROUTE,
  SUBSCRIPTION_ROUTE,
  handlePassworMatch,
  handlePasswordConfirm,
  passwordValidation,
  phoneValidation,
  validatorField
} from '../../../constants';
import {
  facebookLoginRequest,
  googleLoginRequest,
  userLoginRequest,
  userRegisterRequest
} from '../../../redux/slicers/user';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

import { useDispatch, useSelector } from 'react-redux';
import { useGoogleLogin } from '@react-oauth/google';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const deviceToken = useSelector((state) => state?.user?.deviceToken);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const changeRoute = (route) => {
    navigate(route);
  };

  const onFinish = (values) => {
    setLoading(true);
    const { fullName, phoneNumber, password, email } = values;

    const payloadData = {
      name: fullName,
      email: email,
      phone: '+' + phoneNumber,
      password: password,
      platform: userPlatform(),
      token: deviceToken
    };

    dispatch(
      userRegisterRequest({
        payloadData,
        responseCallback: (res) => {
          if (res.status) {
            navigate(NUMBER_VERIFICATION_ROUTE, {
              state: { number: phoneNumber }
            });

            setLoading(false);
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

  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      if (!tokenResponse.access_token) return;
      console.log(tokenResponse, 'google');
      const payloadData = {
        token: tokenResponse.access_token,
        platform: userPlatform(),
        device_token: deviceToken
      };
      dispatch(
        googleLoginRequest({
          payloadData,
          responseCallback: (res) => {
            if (res.status) {
              if (res.data.data.subscribe_status === '') {
                changeRoute(SUBSCRIPTION_ROUTE);
              } else {
                changeRoute(HOME_ROUTE);
              }
            } else {
              console.log(res.errors, 'error');
            }
          }
        })
      );
    }
  });

  const responseFacebook = (response) => {
    if (!response.accessToken) return;
    console.log(response, 'fb');

    const payloadData = {
      token: response.accessToken,
      platform: userPlatform(),
      device_token: deviceToken
    };
    dispatch(
      facebookLoginRequest({
        payloadData,
        responseCallback: (res) => {
          if (res.status) {
            if (res.data.data.subscribe_status === '') {
              changeRoute(SUBSCRIPTION_ROUTE);
            } else {
              changeRoute(HOME_ROUTE);
            }
          } else {
            console.log(res.errors, 'error');
          }
        }
      })
    );
  };

  return (
    <AuthLayout
      className={'email'}
      image={<img src={Images.register} height={'531px'} />}
    >
      <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Space direction="vertical" className={css(AppStyles.w100)}>
          <Space className={css(AppStyles.w100, AppStyles.justifyCenter)}>
            <img src={Images.authLogo} width={'50px'} height={'58px'} />
          </Space>
          <CommonHeading
            level={3}
            textAlign={'center'}
            text={'Create new account'}
          />
          <Space direction="vertical" className={css(AppStyles.w100)}>
            <CommonTextField text={'Full Name'} opacity={'0.5'} />
            <CommonInputField
              name="fullName"
              className={'auth'}
              placeholder={'John Smith'}
              rules={[
                {
                  validator: (_, value) => {
                    return validatorField(_, value, 3, 80);
                  }
                }
              ]}
            />
          </Space>
          <Space direction="vertical" className={css(AppStyles.w100)}>
            <CommonTextField text={'Email Address'} opacity={'0.5'} />
            <CommonInputField
              name="email"
              type={'email'}
              className={'auth'}
              placeholder={'john.smith@domain.com'}
              rules={EMAIL_RULE}
            />
          </Space>
          <Space direction="vertical" className={css(AppStyles.w100)}>
            <CommonTextField text={'Phone Number'} opacity={'0.5'} />
            <CommonPhoneInput name={'phoneNumber'} />
          </Space>
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
              name={'newPassword'}
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
            text={'Register'}
            htmlType="submit"
            classname={css(AppStyles.mTop20, AppStyles.mBottom10)}
          />
          <Space direction="vertical" size={15} className={css(AppStyles.w100)}>
            <CommonTextField textAlign={'center'} text={'or continue with'} />
            <Space className={css(AppStyles.justifyCenter, AppStyles.w100)}>
              <img
                src={Images.google}
                width={'45px'}
                height={'45px'}
                onClick={() => googleLogin()}
                className={css(AppStyles.pointer)}
              />
              <FacebookLogin
                appId={process.env.REACT_APP_FB_KEY}
                callback={responseFacebook}
                render={(renderProps) => (
                  <img
                    src={Images.fb}
                    width={'45px'}
                    height={'45px'}
                    onClick={renderProps.onClick}
                    className={css(AppStyles.pointer)}
                  />
                )}
              />
            </Space>
            <Space className={css(AppStyles.justifyCenter, AppStyles.w100)}>
              <CommonTextField text={'already have an account?'} />
              <CommonTextField
                color="#7665c1"
                onClick={() => changeRoute('/login')}
                text={'Login'}
              />
            </Space>
          </Space>
        </Space>
      </Form>
    </AuthLayout>
  );
};
export default Register;
