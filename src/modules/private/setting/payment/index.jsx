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
import { useDispatch, useSelector } from 'react-redux';
import { USER_SUBSCRIPTION_STATUS } from '../../../../constants';
import { removeCardRequest } from '../../../../redux/slicers/user';
import { cardHandel } from '../../../../services/utils';

const { disabel1, disabel2, disabel3, disabel4 } = Images;

const array = [disabel1, disabel2, disabel3, disabel4];

const Payment = () => {
  const [isModal, setIsModal] = useState(false);
  const [isRemove, setIsRemove] = useState(false);
  const dispatch = useDispatch();

  const { data } = useSelector((state) => state?.user);

  console.log('🚀 ~ file: index.jsx:29 ~ Payment ~ data:', data);

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
          {data?.card_exist ? (
            <Space>
              <img
                src={Images[cardHandel(data?.pay_details?.brand)]}
                width={'45px'}
                height={'32px'}
              />
              <CommonTextField text={`******${data?.pay_details?.last4}`} />
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
              text={data?.card_exist ? 'Update Card' : 'Add Your Card'}
              topClass={'payment-but'}
              onClick={() => setIsModal(!isModal)}
            />
            {data?.card_exist && (
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
            text={
              data?.card_exist ? 'Update Payment Method' : 'Add Payment Method'
            }
            textAlign="center"
            className={css(AppStyles.mTop20)}
          />
        }
        isModalVisible={isModal}
        setIsModalVisible={setIsModal}
      >
        <PaymentMethod setIsModal={setIsModal} />
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
          dispatch(
            removeCardRequest({
              payloadData: {},
              responseCallback: (res) => {
                console.log('🚀 ~ file: index.jsx:123 ~ Payment ~ res:', res);
                if (res.status) {
                  toastAlert('Card remove successfully', ALERT_TYPES.success);
                  setIsRemove(false);
                } else {
                  console.log(res.errors, 'error');
                }
              }
            })
          );
        }}
      ></CommonModal>
    </div>
  );
};

export default Payment;
