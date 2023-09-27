import React from 'react';
import { AppStyles, Colors, Images } from '../../../../../theme';
import { CommonTextField } from '../../../../../components';
import { Space } from 'antd';
import { HOME_ROUTE, icons } from '../../../../../constants';
import { css } from 'aphrodite';
import { useNavigate } from 'react-router-dom';

const Update = ({ stock }) => {
  const navigate = useNavigate();

  const changeRoute = () => {
    navigate(HOME_ROUTE);
  };

  return (
    <Space
      wrap={true}
      className={css([AppStyles.w100, AppStyles.spaceBetween])}
    >
      <Space>
        <Space>
          <img
            src={Images.backArrow}
            onClick={changeRoute}
            className={css(AppStyles.pointer)}
          />
          <img
            style={{ borderRadius: '50%' }}
            src={stock?.src}
            width={'36px'}
            height={'36px'}
          />
        </Space>
        <Space>
          <Space size={3} direction="vertical">
            <CommonTextField text={stock?.title} fontWeight={600} />
            <CommonTextField text={`${stock?.amount}`} opacity={0.5} />
          </Space>
          <img src={icons(stock)} width={'24px'} height={'20px'} />
        </Space>
      </Space>
      <Space size={3} direction="vertical">
        <CommonTextField text={'Last'} />
        <CommonTextField text={`$${stock?.prevPrice}`} opacity={0.5} />
      </Space>
      <Space size={3} direction="vertical">
        <CommonTextField text={'Chg'} />
        <CommonTextField
          text={`$${stock?.changeInPrice}`}
          color={stock?.color}
        />
      </Space>
      <Space size={3} direction="vertical">
        <CommonTextField text={'Chg%'} />
        <CommonTextField
          text={`${stock?.changeInPercent}%`}
          color={stock?.color}
        />
      </Space>
      <Space size={3} direction="vertical">
        <CommonTextField text={'F&G idx'} />
        <CommonTextField text={stock?.fearGreedIndex || " "} color={stock?.color} />
      </Space>
      {/* <Space>
        <img src={Images.green} width={"21px"} height={"21px"} />
        <img src={Images.yellow} width={"21px"} height={"21px"} />
        <img src={Images.red} width={"21px"} height={"21px"} />
      </Space> */}
    </Space>
  );
};

export default Update;
