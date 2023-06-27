import React, { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Chart from '../../../../../components/Chart';

const ChartExample = () => {
  const { id } = useParams();
  const chartData = useSelector((state) => state?.stocks.stocksData);
  console.log('🚀 ~ file: index.js:24 ~ ChartExample ~ chartData:', chartData);

  const data = chartData[id];

  const manipulatedData =
    data?.length > 0
      ? data?.map((item) => ({
          x: Date.parse(item?.date),
          y: item?.currentPrice
        }))
      : [];

  return <>{manipulatedData?.length > 0 && <Chart data={manipulatedData} />}</>;
};

export default ChartExample;
