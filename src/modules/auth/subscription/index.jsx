import React, { useEffect, useState } from 'react';
import './styles.scss';
import {
  CommonButton,
  CommonHeading,
  CommonModal,
  CommonTextField,
  Loader
} from '../../../components';
import { App, Col, Row, Space } from 'antd';
import { AppStyles, Images } from '../../../theme';
import { css } from 'aphrodite';
import SubcriptionCard from './subCard';
import { ALERT_TYPES, HOME_ROUTE } from '../../../constants';
import { useNavigate } from 'react-router-dom';
import { getSubscriptionsRequest } from '../../../redux/slicers/subscription';
import { useDispatch, useSelector } from 'react-redux';
import { subscriptionRequest } from '../../../redux/slicers/user';
import { toastAlert } from '../../../services/utils';

const Subscripton = () => {
  const array = [1, 2, 3, 4];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state?.user);
  const [isRemove, setIsRemove] = useState(false);

  const [loading, setLoading] = useState(true);
  const [packages, setPackages] = useState(null);

  const changeRoute = (route) => {
    navigate(route);
  };

  useEffect(() => {
    dispatch(
      getSubscriptionsRequest({
        payloadData: {},
        responseCallback: (res) => {
          setLoading(false);
          if (res.status) {
            setPackages(res?.data?.data);
          } else {
            console.log(res.errors, 'error');
          }
        }
      })
    );
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="subscription-main-page">
      <div className="sub-heading">
        <CommonHeading
          textAlign={'center'}
          text={'Our Services Has Friendly Packages'}
        />
        <CommonTextField
          text={'Choose plans that might better for your!'}
          className={css(AppStyles.mTop10)}
        />
      </div>
      <Space size={20} direction="vertical">
        {!data.avail_free && (
          <Row
            gutter={[0, 20]}
            align={'middle'}
            className={` free ${css(AppStyles.spaceBetween, AppStyles.w100)}`}
          >
            <Col lg={12} md={12} xs={24}>
              <Space size={20}>
                <img src={Images.authLogo} width={'50px'} height={'58px'} />
                <Space size={0} direction="vertical">
                  <CommonHeading text={'M-Trend Free'} />
                  <CommonTextField text={'2 crypto/stock tracking indices'} />
                </Space>
              </Space>
            </Col>
            <Col lg={6} md={6} xs={24}>
              <CommonButton
                onClick={() => setIsRemove(true)}
                topClass="sub-button"
                text={'Start now'}
              />
            </Col>
          </Row>
        )}

        <Row
          justify={'space-between'}
          gutter={[30, 30]}
          className="packages-list"
        >
          {Object.entries(packages || {})?.map((obj) => {
            if (obj[0] === 'free') return '';
            return (
              <Col xxl={6} xl={6} lg={11} md={12} sm={12} xs={24}>
                <SubcriptionCard title={obj[0]} subData={obj[1]} />
              </Col>
            );
          })}
        </Row>
        <Row
          gutter={[0, 20]}
          align={'middle'}
          className={` free ${css(AppStyles.spaceBetween, AppStyles.w100)}`}
        >
          <Col lg={12} md={12} xs={24}>
            <Space size={20}>
              <img src={Images.authLogo} width={'50px'} height={'58px'} />
              <Space size={0} direction="vertical">
                <CommonHeading text={'M-Trend Enterprise'} />
                <CommonTextField
                  text={
                    'More than 100 crypto/stock tracking indices & multiple users'
                  }
                />
              </Space>
            </Space>
          </Col>
          <Col lg={6} md={6} xs={24}>
            <CommonButton
              topClass="sub-button"
              text={'Contact us for pricing'}
            />
          </Col>
        </Row>
      </Space>
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
        discription="Do you want to subcribe free?"
        onConfirm={() => {
          const payloadData = { subscription_type: 'FREE' };
          dispatch(
            subscriptionRequest({
              payloadData,
              responseCallback: (res) => {
                if (res.status) {
                  toastAlert('Subscription successfully', ALERT_TYPES.success);
                  navigate(HOME_ROUTE);
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

export default Subscripton;
