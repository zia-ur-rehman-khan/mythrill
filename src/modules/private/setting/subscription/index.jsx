import React from 'react';
import { CommonButton, CommonTextField } from '../../../../components';
import { Col, Row, Space } from 'antd';
import { AppStyles, Images } from '../../../../theme';
import { css } from 'aphrodite';
import './styles.scss';

const Subscription = () => {
  return (
    <div className="payment-main">
      <CommonTextField
        fontSize={'16px'}
        text={'Manage Subscription'}
        fontWeight={600}
        className={css(AppStyles.mBottom15)}
      />
      <Row gutter={[0, 20]} align={'middle'}>
        <Col
          lg={{ span: 12 }}
          md={{ span: 12 }}
          sm={{ span: 24 }}
          xs={{ span: 24 }}
        >
          <Space direction="vertical">
            <Space>
              <img src={Images.authLogo} width={'50'} height={'57px'} />
              <Space direction="vertical">
                <CommonTextField
                  fontSize={'16px'}
                  text={'Manage Subscription'}
                  fontWeight={600}
                />
                <CommonTextField text={'$575.00 / yearly'} />
              </Space>
            </Space>
            <Space>
              <CommonTextField text={'Subscription Date:'} fontWeight={600} />
              <CommonTextField text={' Dec 17th, 2023'} />
            </Space>
            <CommonTextField
              width={'60%'}
              text={
                'Next Payment $575.00 on Dec 17th, 2024 Automatic renewal every year'
              }
            />
          </Space>
        </Col>

        <Col
          lg={{ span: 12 }}
          md={{ span: 12 }}
          sm={{ span: 24 }}
          xs={{ span: 24 }}
        >
          <div className="button-side">
            <CommonButton
              text={'Pause Subscriptions'}
              topClass={'payment-but'}
            />
            <CommonButton
              text={'Cancel Renewal'}
              topClass={'payment-but'}
              background="none"
              border={'1px solid #ffff'}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Subscription;
