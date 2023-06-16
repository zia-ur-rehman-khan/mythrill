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
  passwordValidation,
  phoneValidation,
  validatorField
} from '../../../constants';
import DataHandler from '../../../services/DataHandler';
import { userLoginSuccess } from '../../../redux/slicers/user';
import {
  CommonPasswordInput,
  CommonPhoneInput
} from '../../../components/common';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();

  const changeRoute = (route) => {
    Navigate(route);
  };

  const onFinish = (values) => {
    console.log('Success:', values);

    setLoading(true);
    DataHandler.getStore().dispatch(userLoginSuccess());
    changeRoute('/');
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
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

            <CommonPhoneInput
              name={'phone number'}
              rules={[
                {
                  validator: (_, value) => {
                    return phoneValidation(_, value);
                  }
                }
              ]}
            />
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
            <img src={Images.google} width={'45px'} height={'45px'} />
            <img src={Images.fb} width={'45px'} height={'45px'} />
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