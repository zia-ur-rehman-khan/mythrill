import React from 'react';
import { CommonButton, CommonTextField } from '../../../../../components';
import { css } from 'aphrodite';
import { AppStyles, Images } from '../../../../../theme';
import { Col, Row, Space } from 'antd';
import { useNavigate } from 'react-router';
import { PREMIUM_SUBSCRIPTION_ROUTE } from '../../../../../constants';
import { getFormattedDateTime } from '../../../../../services/utils';

const Free = ({ detailes }) => {
  const navigate = useNavigate();

  console.log(detailes, 'detailes');
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
              <Space direction="vertical">
                <CommonTextField
                  fontSize={'16px'}
                  text={'Free Package'}
                  fontWeight={600}
                />
                <CommonTextField text={'$0.00 / yearly'} />
              </Space>
            </Space>
            <Space>
              <CommonTextField text={'Subscription Date:'} fontWeight={600} />
              <CommonTextField
                text={getFormattedDateTime(detailes, 'MMM Do, YYYY')}
              />
            </Space>
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
              width="180px"
              text={'Buy Subscriptions'}
              onClick={() => navigate(PREMIUM_SUBSCRIPTION_ROUTE)}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Free;
