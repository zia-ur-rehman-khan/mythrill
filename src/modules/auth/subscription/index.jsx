import React from 'react';
import './styles.scss';
import {
  CommonButton,
  CommonHeading,
  CommonTextField
} from '../../../components';
import { App, Col, Row, Space } from 'antd';
import { AppStyles, Images } from '../../../theme';
import { css } from 'aphrodite';
import SubcriptionCard from './subCard';
import { HOME_ROUTE } from '../../../constants';
import { useNavigate } from 'react-router-dom';

const Subscripton = () => {
  const array = [1, 2, 3, 4];
  const navigate = useNavigate();

  const changeRoute = (route) => {
    navigate(route);
  };
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
              onClick={() => changeRoute(HOME_ROUTE)}
              topClass="sub-button"
              text={'Start now'}
            />
          </Col>
        </Row>

        <Row
          justify={'space-between'}
          gutter={[30, 30]}
          className="packages-list"
        >
          {array.map((t) => (
            <Col xxl={6} xl={6} lg={11} md={12} sm={12} xs={24}>
              <SubcriptionCard title="Basic Package" />
            </Col>
          ))}
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
    </div>
  );
};

export default Subscripton;
