import { Radio, Space, message } from 'antd';
import { css } from 'aphrodite';
import React, { useState } from 'react';
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
import {
  ALERT_TYPES,
  HOME_ROUTE,
  PREMIUM_SUBSCRIPTION_ROUTE
} from '../../../../constants';
import { toastAlert } from '../../../../services/utils';

const radio = ['$25', '$64', '$210'];

const SubcriptionCard = ({ title, amount }) => {
  const [selectedValue, setSelectedValue] = useState(null);
  const Navigate = useNavigate();
  const changeRoute = () => {
    if (selectedValue) {
      Navigate(PREMIUM_SUBSCRIPTION_ROUTE);
    } else {
      toastAlert('Please select a subscription option.', ALERT_TYPES.error);
    }
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

      <Radio.Group
        onChange={(e) => setSelectedValue(e.target.value)}
        value={selectedValue}
        className={css(AppStyles.w100)}
      >
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
