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

const { disabel1, disabel2, disabel3, disabel4 } = Images;

const array = [disabel1, disabel2, disabel3, disabel4];

const Payment = () => {
  const [isModal, setIsModal] = useState(false);
  const [isCard, setIscard] = useState(false);
  const [isRemove, setIsRemove] = useState(false);

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
          {isCard ? (
            <Space>
              <img src={Images.card} width={'45px'} height={'32px'} />
              <CommonTextField text={'******123'} />
            </Space>
          ) : (
            array.map((d) => (
              <Space>
                <img src={d} width={'45px'} height={'28px'} />
              </Space>
            ))
          )}
        </Col>

        <Col
          lg={{ span: 12 }}
          md={{ span: 12 }}
          sm={{ span: 24 }}
          xs={{ span: 24 }}
        >
          <div className="button-side">
            <CommonButton
              text={isCard ? 'Update Card' : 'Add Your Card'}
              topClass={'payment-but'}
              onClick={() => setIsModal(!isModal)}
            />
            {isCard && (
              <CommonButton
                text={'Remove Card'}
                topClass={'payment-but'}
                background="none"
                border={'1px solid #ffff'}
                onClick={() => setIsRemove(true)}
              />
            )}
          </div>
        </Col>
      </Row>
      <CommonModal
        width={'50%'}
        title={
          <CommonHeading
            text={isCard ? 'Update Payment Method' : 'Add Payment Method'}
            textAlign="center"
            className={css(AppStyles.mTop20)}
          />
        }
        isModalVisible={isModal}
        setIsModalVisible={setIsModal}
      >
        <PaymentMethod
          setIscard={setIscard}
          setIsModal={setIsModal}
          isCard={isCard}
        />
      </CommonModal>
      <CommonModal
        title={
          <CommonHeading
            text={'Are you sure?'}
            textAlign="center"
            className={css(AppStyles.mTop20)}
          />
        }
        isModalVisible={isRemove}
        setIsModalVisible={setIsRemove}
        discription="Do you want to remove the card?"
        onConfirm={() => {
          setIscard(false);
          setIsRemove(false);
        }}
      ></CommonModal>
    </div>
  );
};

export default Payment;
