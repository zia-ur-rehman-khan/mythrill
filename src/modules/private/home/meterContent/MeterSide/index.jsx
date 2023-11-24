import React, { useEffect, useState } from 'react';
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
import moment from 'moment';
import { startFilter } from '../../../../../constants';

const MeterSide = ({ select, trend }) => {
  console.log('🚀 ~ file: index.jsx:17 ~ MeterSide ~ trend:', trend);
  // const trend = useSelector((state) => state?.stocks?.trendData);

  const filter = useSelector((state) => state?.stocks?.filter);
  const [meterValue, setMeterValue] = useState({});

  useEffect(() => {
    filterGraphData();
  }, [trend, filter]);

  const filterGraphData = () => {
    const meterValue = trend[select]?.preData;

    if (!_.isEmpty(meterValue)) {
      const end = Date.now();

      if (filter !== 'all') {
        const filteredData = meterValue?.filter(
          (t) =>
            moment(t.date).valueOf() >= startFilter(filter) &&
            moment(t.date).valueOf() <= end
        );

        if (filteredData?.length > 0) {
          const temp = filteredData[0];
          setMeterValue(temp);
        } else {
          setMeterValue(meterValue[meterValue?.length - 1]);
        }
      } else {
        setMeterValue(meterValue[meterValue?.length - 1]);
      }
    } else {
      setGraphDetail({});
    }
  };

  return (
    <div className="meterSide-parent">
      <div className="meterSide-left">
        <CommonHeading
          className="title-ellip"
          level={3}
          text={
            trend[select]?.title
              ? trend[select]?.title?.toUpperCase()
              : 'Stock Not Selected'
          }
        />
        <CommonTextField
          className={css(AppStyles.mTop15)}
          text={'Previous Closes'}
          fontWeight={500}
        />
        <div className={css(AppStyles.mTop10)}>
          {Object.values(trend[select]?.preClosed || {}).map((t, i) => (
            <div className="list" key={Math.random()}>
              <CommonTextField
                width={'60px'}
                text={`${i + 1} Day ago`}
                fontWeight={400}
                topClass={'small'}
              />
              <Divider />
              <CommonTextField
                width={'80px'}
                text={t == null ? 'NEUTRAL' : t?.trim()?.toUpperCase()}
                fontWeight={600}
                topClass={'small'}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="meterSide-right">
        <MainMeter
          stockName={trend[select]?.title}
          value={meterValue.overallTrend}
        />
      </div>
    </div>
  );
};

export default MeterSide;
