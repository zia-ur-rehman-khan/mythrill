import React from 'react';
import { CommonTextField } from '../../../../components';
import { Col, Row, Space } from 'antd';
import { AppStyles, Images } from '../../../../theme';
import { css } from 'aphrodite';
import './styles.scss';

const SocialLogin = () => {
  return (
    <Row gutter={[0, 20]} className="social-login-main" align={'middle'}>
      <Col
        lg={{ span: 12 }}
        md={{ span: 12 }}
        sm={{ span: 24 }}
        xs={{ span: 24 }}
      >
        <CommonTextField
          fontSize={'16px'}
          text={'Change Password'}
          fontWeight={600}
        />
      </Col>

      <Col
        lg={{ span: 12 }}
        md={{ span: 12 }}
        sm={{ span: 24 }}
        xs={{ span: 24 }}
        className="account"
      >
        <div size={20} className="account-card">
          <img src={Images.google} width={'45px'} height={'45px'} />
          <CommonTextField
            fontSize={'16px'}
            text={'Connect'}
            fontWeight={600}
          />
        </div>
        <div size={20} className="account-card">
          <img src={Images.fb} width={'45px'} height={'45px'} />
          <CommonTextField
            fontSize={'16px'}
            text={'Connect'}
            fontWeight={600}
          />
        </div>
      </Col>
    </Row>
  );
};

export default SocialLogin;
