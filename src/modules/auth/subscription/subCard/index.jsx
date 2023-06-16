import { Space } from 'antd';
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

const SubcriptionCard = ({ title, amount }) => {
  const Navigate = useNavigate();
  const changeRoute = (route) => {
    DataHandler.getStore().dispatch(userLoginSuccess());

    Navigate(route);
  };
  return (
    <Space size={30} direction="vertical" className="sub-box">
      <Space className={css(AppStyles.w100, AppStyles.spaceBetween)}>
        <img src={Images.authLogo} width={'50px'} height={'58px'} />
        {amount === 'Free' ? (
          <CommonHeading text={amount} />
        ) : (
          <Space>
            <CommonHeading text={'$575.00'} />
            <CommonTextField text={'/ year'} />
          </Space>
        )}
      </Space>
      <CommonTextField fontWeight={600} fontSize={'23px'} text={title} />
      <ul className={css(AppStyles.mLeft20)}>
        <li>
          <CommonTextField opacity={0.5} text={'Lorem ipsum dolor sit amet'} />
        </li>
        <li>
          <CommonTextField
            opacity={0.5}
            text={'Lorem ipsum dolor sit amet consectetur adipiscing elit'}
          />
        </li>
        <li>
          <CommonTextField opacity={0.5} text={'Integer sed felis felis.'} />
        </li>
        <li>
          <CommonTextField
            opacity={0.5}
            text={'ed efficitur fermentum laoreet'}
          />
        </li>
      </ul>
      <CommonButton text={'Start Now'} onClick={() => changeRoute('/')} />
    </Space>
  );
};

export default SubcriptionCard;
