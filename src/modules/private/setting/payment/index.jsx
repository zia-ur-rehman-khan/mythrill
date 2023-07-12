import React, { useState } from 'react';
import {
  CommonButton,
  CommonTextField,
  ConfirmationModal
} from '../../../../components';
import { Col, Row, Space } from 'antd';
import { AppStyles, Images } from '../../../../theme';
import { css } from 'aphrodite';
import './styles.scss';
import {
  CommonHeading,
  CommonModal,
  PaymentMethod
} from '../../../../components/common';
import { useSelector } from 'react-redux';
import { USER_SUBSCRIPTION_STATUS } from '../../../../constants';

const { disabel1, disabel2, disabel3, disabel4 } = Images;

const array = [disabel1, disabel2, disabel3, disabel4];

const Payment = () => {
  const [isModal, setIsModal] = useState(false);
  const { data } = useSelector((state) => state?.user);
  console.log('🚀 ~ file: index.jsx:26 ~ Payment ~ data:', data);

  if (
    data['subscribe_status'] === USER_SUBSCRIPTION_STATUS.FREE ||
    data['subscribe_status'] === USER_SUBSCRIPTION_STATUS.CANCLED
  )
    return '';

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
          <CommonButton
            width="180px"
            text={'Update Card'}
            topClass={'payment-but'}
            onClick={() => setIsModal(!isModal)}
          />
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
        <PaymentMethod setIsModal={setIsModal} />
      </CommonModal>
    </div>
  );
};

export default Payment;
