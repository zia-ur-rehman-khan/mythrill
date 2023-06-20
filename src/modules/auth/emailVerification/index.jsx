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
import { useLocation, useNavigate } from 'react-router-dom';
import {
  EMAIL_RULE,
  handlePassworMatch,
  handlePasswordConfirm,
  passwordValidation,
  phoneValidation,
  validatorField,
  numberValidatorField,
  SUBSCRIPTION_ROUTE,
  RESET_PASSWORD_ROUTE
} from '../../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { VerificationRequest } from '../../../redux/slicers/user';

const EmailVerification = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();

  const hash = useSelector((state) => state?.user?.hash);

  const navigate = useNavigate();

  const changeRoute = (route, code) => {
    navigate(route, { state: { email: location.state.email, code: code } });
  };

  const onFinish = (values) => {
    setLoading(true);
    const { code } = values;

    const payloadData = {
      hash: hash,
      otp: code
    };
    changeRoute(RESET_PASSWORD_ROUTE, values?.code);

    // dispatch(
    //   VerificationRequest({
    //     payloadData,
    //     responseCallback: (res) => {
    //       if (res.status) {
    //         setLoading(false);
    //         console.log(res.status, 'res');
    //       } else {
    //         setLoading(false);
    //         console.log(res.errors, 'error');
    //       }
    //     }
    //   })
    // );
  };
  const onFinishFailed = (errorInfo) => {};
  return (
    <AuthLayout
      className="email"
      image={<img src={Images.email} className="email-image" />}
    >
      <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Space direction="vertical" className={css(AppStyles.w100)}>
          <Space className={css(AppStyles.w100, AppStyles.justifyCenter)}>
            <img src={Images.authLogo} width={'50px'} height={'58px'} />
          </Space>
          <CommonHeading
            level={3}
            textAlign={'center'}
            text={'Email Verification Please Check Your Email'}
          />
          <Space>
            <CommonTextField text={'john.smith@domain.com'} opacity={'0.5'} />
            <CommonTextField text={'Not You?'} color="#7665c1" />
          </Space>
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
            loading={loading}
            htmlType="submit"
            text={'Submit'}
            classname={css(AppStyles.mTop20)}
          />
        </Space>
      </Form>
    </AuthLayout>
  );
};
export default EmailVerification;
