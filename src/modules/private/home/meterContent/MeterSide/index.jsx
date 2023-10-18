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
import moment from 'moment';
import { startFilter } from '../../../../../constants';

const MeterSide = ({ select }) => {
  const trend = useSelector((state) => state?.stocks?.trendData);
  const filter = useSelector((state) => state?.stocks?.filter);

  let meterValue = trend[select]?.overallTrend;

  const end = Date.now();

  const filteredData = trend[select]?.preData.filter(
    (t) =>
      moment(t.date).valueOf() >= startFilter(filter) &&
      moment(t.date).valueOf() <= end
  );

  if (filteredData?.length > 0) {
    meterValue = filteredData[0]?.overallTrend;
  }

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
        <MainMeter filteredData={filteredData} value={meterValue} />
      </div>
    </div>
  );
};

export default MeterSide;
