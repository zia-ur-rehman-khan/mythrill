import { Radio, Space, message } from 'antd';
import { css } from 'aphrodite';
import React, { useEffect, useState } from 'react';
import { AppStyles, Images } from '../../../../theme';
import './styles.scss';

import {
  CommonButton,
  CommonHeading,
  CommonModal,
  CommonTextField
} from '../../../../components';
import { useNavigate } from 'react-router-dom';
import DataHandler from '../../../../services/DataHandler';
import {
  subscriptionRequest,
  userLoginSuccess
} from '../../../../redux/slicers/user';
import {
  ALERT_TYPES,
  HOME_ROUTE,
  PREMIUM_SUBSCRIPTION_ROUTE,
  SUBSCRIPTION_ROUTE
} from '../../../../constants';
import { toastAlert } from '../../../../services/utils';
import { useDispatch, useSelector } from 'react-redux';
import { stockLimitExceed } from '../../../../redux/slicers/stocks';

const SubcriptionCard = ({ title, subData }) => {
  const { data } = useSelector((state) => state?.user);
  const [isRemove, setIsRemove] = useState(false);

  const [selectedValue, setSelectedValue] = useState(subData[0].amount);
  const [detail, setDetail] = useState(subData[0]);

  const Navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    let filter = subData.filter((t) => {
      return t?.amount === selectedValue;
    });

    if (filter.length > 0) {
      setDetail(filter);
    }
  }, [selectedValue]);

  const changeRoute = () => {
    if (data?.subscribe_status !== detail[0]?.package_name) {
      data.card_exist
        ? setIsRemove(true)
        : Navigate(PREMIUM_SUBSCRIPTION_ROUTE, {
            state: { subscription_detailes: { ...detail[0], title } }
          });
    } else {
      toastAlert('You already subscribe this package', ALERT_TYPES.error);
    }
  };

  return (
    <>
      <Space size={30} direction="vertical" className="sub-box">
        <Space className={css(AppStyles.w100, AppStyles.spaceBetween)}>
          <img src={Images.authLogo} width={'50px'} height={'58px'} />
          <Space>
            <CommonHeading text={`$${detail[0]?.amount}`} />
            <CommonTextField text={`/ ${detail[0]?.period}`} />
          </Space>
        </Space>
        <Space direction="vertical">
          <CommonTextField
            fontWeight={600}
            fontSize={'23px'}
            text={`${title[0].toUpperCase()}${title.slice(1)} Tier`}
          />
          <CommonTextField
            text={`${detail[0]?.period} crypto/stock tracking indices`}
          />
        </Space>

        <Radio.Group
          onChange={(e) => setSelectedValue(e.target.value)}
          value={selectedValue}
          className={css(AppStyles.w100)}
        >
          {subData?.map((t, index) => {
            return (
              <Space
                key={index}
                className={css([AppStyles.w100, AppStyles.mBottom20])}
              >
                <Radio value={t?.amount} />
                <CommonTextField text={`$${t?.amount}`} fontWeight={600} />
                <CommonTextField text={t?.slug} opacity={0.5} />
              </Space>
            );
          })}
        </Radio.Group>
        <CommonButton text={'Start Now'} onClick={() => changeRoute()} />
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
        discription={`Do you want to subcribe ${detail[0]?.package_name}?`}
        onConfirm={() => {
          const payloadData = { subscription_type: detail[0]?.package_name };
          dispatch(
            subscriptionRequest({
              payloadData,
              responseCallback: (res) => {
                if (res.status) {
                  toastAlert('Subscription successfully', ALERT_TYPES.success);
                  Navigate(HOME_ROUTE);
                  dispatch(stockLimitExceed(true));
                } else {
                  console.log(res.errors, 'error');
                }
              }
            })
          );
        }}
      ></CommonModal>
    </>
  );
};

export default SubcriptionCard;
