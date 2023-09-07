import React, { useState } from 'react';
import {
  CommonButton,
  CommonHeading,
  CommonModal,
  CommonTextField
} from '../../../../../components';
import { Col, Row, Space } from 'antd';
import { AppStyles, Images } from '../../../../../theme';
import { css } from 'aphrodite';
import './styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  cancelSubscriptionRequest,
  pauseSubscriptionRequest,
  resumeSubscriptionRequest,
  updateCardRequest
} from '../../../../../redux/slicers/user';
import {
  ALERT_TYPES,
  SUBSCRIPTION_ROUTE,
  USER_SUBSCRIPTION_STATUS
} from '../../../../../constants';
import {
  getFormattedDateTime,
  toastAlert
} from '../../../../../services/utils';
import { useNavigate } from 'react-router-dom';

const Detailes = ({ cancel, paused, detailes }) => {
  const [isPause, setIsPause] = useState(false);
  const [isCancel, setIsCancel] = useState(false);
  const [isResume, setIsResume] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const modalOpen = (cancel) => {
    paused && setIsResume(true);
    setIsCancel(cancel);
    setIsPause(true);
  };

  console.log(detailes, 'detailes');

  const { amount, start_at, end_at, renewal_period, package_name } =
    detailes ?? {};

  return (
    <div className="subscription-main">
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
              <Space size={5} direction="vertical">
                <CommonTextField
                  fontSize={'16px'}
                  text={package_name}
                  fontWeight={600}
                />
                <CommonTextField text={'2 crypto/stock tracking indices'} />
                <CommonTextField text={`$${amount}.00 / ${renewal_period}`} />
              </Space>
            </Space>
            <Space>
              <CommonTextField text={'Subscription Date:'} fontWeight={600} />
              <CommonTextField
                text={getFormattedDateTime(start_at, 'MMM Do, YYYY')}
              />
            </Space>
            <CommonTextField
              width={'60%'}
              text={`Next Payment $${amount}.00 on ${getFormattedDateTime(
                end_at,
                'MMM Do, YYYY'
              )} Automatic renewal every year`}
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
            {cancel ? (
              <>
                <CommonButton
                  width="180px"
                  text={'Buy Subscriptions'}
                  topClass={'payment-but'}
                  onClick={() => navigate(SUBSCRIPTION_ROUTE)}
                />

                <CommonButton
                  text={'Canceled'}
                  topClass={'payment-but cancel'}
                  width="180px"
                />
              </>
            ) : (
              <>
                <CommonButton
                  text={paused ? 'Resume' : 'Pause Subscriptions'}
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
              </>
            )}
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
        loading={isLoading}
        isModalVisible={isPause}
        setIsModalVisible={setIsPause}
        discription={`Do you want to ${
          isCancel
            ? 'cancel the renewal'
            : isResume
            ? 'resume the subscription'
            : 'pause the subscription'
        }?`}
        onConfirm={() => {
          setIsLoading(true);

          {
            isCancel
              ? dispatch(
                  cancelSubscriptionRequest({
                    payloadData: {},
                    responseCallback: (res) => {
                      setIsLoading(false);
                      if (res.status) {
                        toastAlert(
                          'Canceled subscription successfully',
                          ALERT_TYPES.success
                        );
                        setIsPause(false);
                      } else {
                        console.log(res.errors, 'error');
                      }
                    }
                  })
                )
              : isResume
              ? dispatch(
                  resumeSubscriptionRequest({
                    payloadData: {},
                    responseCallback: (res) => {
                      setIsLoading(false);
                      if (res.status) {
                        toastAlert(
                          'Resumed subscription successfully',
                          ALERT_TYPES.success
                        );
                        setIsPause(false);
                        setIsResume(false);
                      } else {
                        console.log(res.errors, 'error');
                      }
                    }
                  })
                )
              : dispatch(
                  pauseSubscriptionRequest({
                    payloadData: {},
                    responseCallback: (res) => {
                      setIsLoading(false);
                      console.log(res, 'res');

                      if (res.status) {
                        toastAlert(
                          'Paused subscription successfully',
                          ALERT_TYPES.success
                        );
                        setIsPause(false);
                      } else {
                        console.log(res.errors, 'error');
                      }
                    }
                  })
                );
          }
        }}
      ></CommonModal>
    </div>
  );
};

export default Detailes;
