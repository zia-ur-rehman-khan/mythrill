import { Grid, Space } from 'antd';
import React, { useState } from 'react';
import { AppStyles, Colors, Images } from '../../../../../theme';
import {
  CommonHeading,
  CommonModal,
  CommonTextField
} from '../../../../../components';
import { css } from 'aphrodite';
import './styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { isSubscribeRequest } from '../../../../../redux/slicers/stocks';
import { useNavigate } from 'react-router-dom';
import { STOCK_DETAILE_ROUTE } from '../../../../../constants';
const { useBreakpoint } = Grid;

const Suggestion = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const stocksList = useSelector((state) => state?.stocks?.allStocks);

  const navigate = useNavigate();

  const handelStock = (id) => {
    dispatch(
      isSubscribeRequest({
        payloadData: { name_id: id },
        responseCallback: (res) => {
          if (res.status) {
            console.log(res, 'res');
            if (res?.data?.is_subscribe) {
              navigate(STOCK_DETAILE_ROUTE.replace(':id', id));
            } else {
              setIsOpen(true);
            }
          } else {
            console.log(res.errors, 'error');
          }
        }
      })
    );
  };

  return (
    <Space
      direction="vertical"
      className={`main-sugest ${css([
        AppStyles.theme3Color,
        AppStyles.padding5,
        AppStyles.mTop10
      ])}`}
    >
      <Space className={css([AppStyles.spaceBetween, AppStyles.w100])}>
        <Space>
          <img src={Images.fire} />
          <CommonTextField text={'Current Strong Buys'} color={Colors.green} />
        </Space>
        <Space align="baseline">
          <CommonTextField text={'More'} />
          <img src={Images.arrow} />
        </Space>
      </Space>
      <Space className={css([AppStyles.spaceBetween, AppStyles.w100])}>
        {stocksList
          ?.filter((d) => d?.overallTrend?.toLowerCase() === ' strong buy')
          ?.slice(0, 4)
          ?.map((t) => (
            <Space key={Math.random()}>
              <img
                src={t?.src}
                style={{ borderRadius: '50%' }}
                width={'25px'}
                height={'25px'}
              />
              <Space size={0} direction="vertical">
                <CommonTextField
                  className={`${css(AppStyles.ellipsisText)} text-title `}
                  text={t.title}
                  onClick={() => handelStock(t.nameId)}
                />
                <Space size={4} align="baseline">
                  <CommonTextField
                    text={`${t.changeInPercent}%`}
                    topClass={'small'}
                    color={Colors.green}
                  />
                  <img src={Images.up} />
                </Space>
              </Space>
            </Space>
          ))}
      </Space>
      <CommonModal
        title={
          <CommonHeading
            text={'Un Available'}
            textAlign="center"
            className={css(AppStyles.mTop20)}
          />
        }
        isModalVisible={isOpen}
        setIsModalVisible={setIsOpen}
      >
        <CommonHeading
          level={3}
          text={
            'This stock is not in your subscribe list if you want to see detailes so please add it in your list!!'
          }
        />
      </CommonModal>
    </Space>
  );
};

export default Suggestion;
