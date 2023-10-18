import React, { useEffect } from 'react';
import {
  CommonHeading,
  CommonInputField,
  CommonTextField
} from '../../../../../components';
import { Divider, Space } from 'antd';
import './styles.scss';
import { css } from 'aphrodite';
import { AppStyles } from '../../../../../theme';
import MainMeter from './mainMeter';
import { useSelector } from 'react-redux';

const MeterSide = ({ select }) => {
  const trend = useSelector((state) => state?.stocks?.trendData);
  console.log('🚀 ~ file: index.jsx:17 ~ MeterSide ~ trend:', trend);

  return (
    <div className="meterSide-parent">
      <div className="meterSide-left">
        <CommonHeading level={3} text={'NASDAQ'} />
        <CommonTextField
          className={css(AppStyles.mTop15)}
          text={'Previous Closes'}
          fontWeight={500}
        />
        <div className={css(AppStyles.mTop10)}>
          {Object.values(trend[select]?.preClosed || {}).map((t, i) => (
            <div className="list" key={Math.random()}>
              <CommonTextField
                text={`${i + 1} Day ago`}
                fontWeight={400}
                topClass={'small'}
              />
              <Divider />
              <CommonTextField
                text={t == null ? 'Neutral' : t}
                fontWeight={600}
                topClass={'small'}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="meterSide-right">
        <MainMeter value={trend[select]?.overallTrend} />
      </div>
    </div>
  );
};

export default MeterSide;
