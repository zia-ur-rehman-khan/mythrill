import React, { useState } from 'react';
import './styles.scss';
import { CommonTextField } from '../../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { Space } from 'antd';
import { AppStyles } from '../../../../theme';
import { css } from 'aphrodite';
import MeterSide from './MeterSide';
import {
  preCloseDataRequest,
  trendingListRequest
} from '../../../../redux/slicers/stocks';
import { trendGraphManipulator } from '../../../../manipulators/stocksName';

const MeterContent = () => {
  // const trend = useSelector((state) => state?.stocks?.trendData);
  const [trendData, setTrendData] = useState(null);
  console.log('🚀 ~ file: index.jsx:18 ~ MeterContent ~ trendData:', trendData);
  const [select, setSelect] = useState(0);
  const dispatch = useDispatch();

  dispatch(
    preCloseDataRequest({
      payloadData: {},
      responseCallback: (res) => {
        if (res.status) {
          console.log(res, 'res');
          setTrendData(trendGraphManipulator(res?.data?.data));
        } else {
          console.log(res.errors, 'error');
        }
      }
    })
  );

  return (
    <div className="meter-content-parent">
      <div className="left-content">
        <CommonTextField fontWeight={500} text={'Please choose your index:'} />
        <Space className={css(AppStyles.mTop10)} size={5} direction="vertical">
          {trendData?.map((t, i) => (
            <Space>
              <CommonTextField topClass={'small'} text={`${i + 1}.`} />
              <Space size={4} align="center">
                <img
                  style={{ borderRadius: '50%' }}
                  width={'20px'}
                  height={'20px'}
                  src={t.src}
                />
                <CommonTextField
                  fontWeight={i === select && 700}
                  fontSize={i === select && '11px'}
                  onClick={() => setSelect(i)}
                  topClass={'small title-text'}
                  text={t.title}
                />
              </Space>
            </Space>
          ))}
        </Space>
      </div>
      <div className="right-content">
        <MeterSide select={select} />
      </div>
    </div>
  );
};

export default MeterContent;
