import React, { useState } from 'react';
import { CommonButton, CommonTextField } from '../../../../components';
import { Col, Row, Space } from 'antd';
import { AppStyles, Images } from '../../../../theme';
import { css } from 'aphrodite';
import './styles.scss';
import {
  CommonHeading,
  CommonModal,
  PaymentMethod
} from '../../../../components/common';

const Payment = () => {
  const [isModal, setIsModal] = useState(false);

  return (
    <div className="payment-main">
      <CommonTextField
        fontSize={'16px'}
        text={'Payment Method'}
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
          <Space>
            <img src={Images.card} width={'45px'} height={'32px'} />
            <CommonTextField text={'******123'} />
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
              text={'Update Card'}
              topClass={'payment-but'}
              onClick={() => setIsModal(!isModal)}
            />
            <CommonButton
              text={'Remove Card'}
              topClass={'payment-but'}
              background="none"
              border={'1px solid #ffff'}
            />
          </div>
        </Col>
      </Row>
      <CommonModal
        width={'50%'}
        title={
          <CommonHeading
            text={'Update Payment Method'}
            textAlign="center"
            className={css(AppStyles.mTop20)}
          />
        }
        isModalVisible={isModal}
        setIsModalVisible={setIsModal}
      >
        <PaymentMethod />
      </CommonModal>
    </div>
  );
};

export default Payment;
