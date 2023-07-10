import React, { useState } from 'react';
import {
  CommonButton,
  CommonHeading,
  CommonModal,
  CommonTextField
} from '../../../../components';
import { Col, Row, Space } from 'antd';
import { AppStyles, Images } from '../../../../theme';
import { css } from 'aphrodite';
import './styles.scss';

const Subscription = () => {
  const [isPause, setIsPause] = useState(false);
  const [isCancel, setIsCanscel] = useState(false);

  const modalOpen = (cancel) => {
    setIsCanscel(cancel);
    setIsPause(true);
  };

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
              onClick={() => modalOpen(false)}
            />
            <CommonButton
              text={'Cancel Renewal'}
              topClass={'payment-but'}
              background="none"
              border={'1px solid #ffff'}
              onClick={() => modalOpen(true)}
            />
          </div>
        </Col>
      </Row>
      <CommonModal
        title={
          <CommonHeading
            text={'Are you sure?'}
            textAlign="center"
            className={css(AppStyles.mTop20)}
          />
        }
        isModalVisible={isPause}
        setIsModalVisible={setIsPause}
        discription={`Do you want to ${
          isCancel ? 'cancel the renewal' : 'pause the subscription'
        }?`}
        onConfirm={() => {
          setIsPause(false);
        }}
      ></CommonModal>
    </div>
  );
};

export default Subscription;
