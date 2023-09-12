import React, { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Chart from '../../../../../components/Chart';

const ChartExample = () => {
  const { id } = useParams();
  const chartData = useSelector((state) => state?.stocks.stocksData);
  // const allStocksInfo = useSelector((state) => state?.stocks?.stocksSubscribe)

  // const stockInfo = allStocksInfo.find((item) => item?.nameId === id)

  const data = chartData[id];

  const manipulatedData =
    data?.data?.length > 0
      ? data?.data?.map((item) => ({
          x: Date.parse(item?.date),
          y: item?.currentPrice
        }))
      : [];

  return (
    <>
      {manipulatedData?.length > 0 && (
        <Chart
          data={manipulatedData}
          color={data.color}
          stockId={data?.stockId}
          frequency={data?.frequency}
          name_slug={data?.name_slug}
        />
      )}
    </>
  );
};

export default ChartExample;
