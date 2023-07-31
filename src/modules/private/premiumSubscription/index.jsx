import React, { useState } from 'react';
import { AppStyles, Images } from '../../../theme';

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
import { PaymentMethod } from '../../../components/common';

const PremiumSubscription = () => {
  const [loading, setLoading] = useState(false);
  // const deviceToken = useSelector((state) => state?.user?.deviceToken);

  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const changeRoute = (route) => {
    navigate(route);
  };

  const onFinish = (values) => {
    // setLoading(true);
    // const { phoneNumber, password } = values;
    // const payloadData = {
    //   phone: '+' + phoneNumber,
    //   password: password,
    //   platform: userPlatform(),
    //   token: deviceToken
    // };
    // dispatch(
    //   userLoginRequest({
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
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <AuthLayout
      arrow
      className="subscription-auth"
      image={<img src={Images.subscription} className="sub-image" />}
    >
      <Space direction="vertical" className={css(AppStyles.w100)}>
        <Space className={css(AppStyles.w100, AppStyles.spaceAround)}>
          <img src={Images.authLogo} width={'50px'} height={'58px'} />
          <Space>
            <CommonHeading text={'$575.00'} />
            <CommonTextField text={'/ year'} />
          </Space>
        </Space>
        <CommonHeading
          level={3}
          textAlign={'center'}
          text={'Premium Package'}
        />
        <PaymentMethod subscription />
      </Space>
    </AuthLayout>
  );
};
export default PremiumSubscription;
