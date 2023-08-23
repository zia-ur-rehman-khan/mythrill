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
  HOME_ROUTE,
  SUBSCRIPTION_ROUTE,
  USER_SUBSCRIPTION_STATUS,
  passwordValidation,
  phoneValidation,
  validatorField
} from '../../../constants';
import DataHandler from '../../../services/DataHandler';
import {
  facebookLoginRequest,
  googleLoginRequest,
  userLoginRequest,
  userLoginSuccess
} from '../../../redux/slicers/user';
import {
  CommonPasswordInput,
  CommonPhoneInput
} from '../../../components/common';
import { isMobile, userPlatform } from '../../../services/utils';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const deviceToken = useSelector((state) => state?.user?.deviceToken);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeRoute = (route) => {
    navigate(route);
  };

  const onFinish = (values) => {
    setLoading(true);
    const { phoneNumber, password } = values;

    const payloadData = {
      phone: '+' + phoneNumber,
      password: password,
      platform: userPlatform(),
      token: deviceToken
    };

    dispatch(
      userLoginRequest({
        payloadData,
        responseCallback: (res) => {
          if (res.status) {
            setLoading(false);
            console.log(res.data.data.subscribe_status, 'res');
            if (res.data.data.subscribe_status === '') {
              changeRoute(SUBSCRIPTION_ROUTE);
            } else {
              changeRoute(HOME_ROUTE);
            }
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
      arrow
      className="login"
      image={<img src={Images.card3} className="login-image" />}
    >
      <Form name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Space direction="vertical" className={css(AppStyles.w100)}>
          <Space className={css(AppStyles.w100, AppStyles.justifyCenter)}>
            <img src={Images.authLogo} width={'50px'} height={'58px'} />
          </Space>
          <CommonHeading
            level={3}
            textAlign={'center'}
            text={'Let’s login to your Mythril account first'}
          />
          <Space direction="vertical" className={css(AppStyles.w100)}>
            <CommonTextField text={'Phone Number'} opacity={'0.5'} />

            <CommonPhoneInput name={'phoneNumber'} />
          </Space>
          <Space direction="vertical" className={css(AppStyles.w100)}>
            <CommonTextField text={'Password'} opacity={'0.5'} />
            <CommonPasswordInput
              name={'password'}
              placeholder={'**************'}
              rules={[
                {
                  required: true,
                  message: 'Please input your password!'
                }
              ]}
            />
          </Space>
          <Space className={css(AppStyles.w100, AppStyles.spaceBetween)}>
            <Space>
              <Checkbox />
              <CommonTextField
                text={'Remember me'}
                opacity={'0.5'}
                fontWeight={600}
              />
            </Space>
            <Space>
              <CommonTextField
                onClick={() => changeRoute('/forgot')}
                text={'Forgot Password'}
              />
            </Space>
          </Space>
          <CommonButton
            loading={loading}
            text={'Login'}
            htmlType="submit"
            classname={css(AppStyles.mTop20)}
          />
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
            <CommonTextField text={'Don’t have an account?'} />
            <CommonTextField
              color="#7665c1"
              onClick={() => changeRoute('/register')}
              text={'Register here'}
            />
          </Space>
        </Space>
      </Form>
    </AuthLayout>
  );
};
export default Login;
