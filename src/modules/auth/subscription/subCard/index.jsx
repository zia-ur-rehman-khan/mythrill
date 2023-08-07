import { Radio, Space } from 'antd';
import { css } from 'aphrodite';
import React from 'react';
import { AppStyles, Images } from '../../../../theme';
import './styles.scss';

import {
  CommonButton,
  CommonHeading,
  CommonTextField
} from '../../../../components';
import { useNavigate } from 'react-router-dom';
import DataHandler from '../../../../services/DataHandler';
import { userLoginSuccess } from '../../../../redux/slicers/user';
import { HOME_ROUTE, PREMIUM_SUBSCRIPTION_ROUTE } from '../../../../constants';

const radio = ['$25', '$64', '$210'];

const SubcriptionCard = ({ title, amount }) => {
  const Navigate = useNavigate();
  const changeRoute = () => {
    Navigate(PREMIUM_SUBSCRIPTION_ROUTE);
  };
  return (
    <Space size={30} direction="vertical" className="sub-box">
      <Space className={css(AppStyles.w100, AppStyles.spaceBetween)}>
        <img src={Images.authLogo} width={'50px'} height={'58px'} />
        <Space>
          <CommonHeading text={'$25'} />
          <CommonTextField text={'/ monthly'} />
        </Space>
      </Space>
      <Space direction="vertical">
        <CommonTextField
          fontWeight={600}
          fontSize={'23px'}
          text={'Basic Tier'}
        />
        <CommonTextField text={'10 crypto/stock tracking indices'} />
      </Space>

      <Radio.Group className={css(AppStyles.w100)}>
        {radio.map((t, index) => (
          <Space className={css([AppStyles.w100, AppStyles.mBottom20])}>
            <Radio value={t} />
            <CommonTextField text={t} fontWeight={600} />
            <CommonTextField text={'Quarter savings of 15%'} opacity={0.5} />
          </Space>
        ))}
      </Radio.Group>
      <CommonButton text={'Start Now'} onClick={() => changeRoute()} />
    </Space>
  );
};

export default SubcriptionCard;
