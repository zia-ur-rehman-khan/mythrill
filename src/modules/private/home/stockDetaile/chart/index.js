import React, { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Chart from '../../../../../components/Chart';
import { CommonHeading, GraphFilter } from '../../../../../components';
import { startFilter } from '../../../../../constants';
import { AppStyles } from '../../../../../theme';

const ChartExample = () => {
  const { id } = useParams();
  const chartData = useSelector((state) => state?.stocks.stocksData);
  const stocksSubscribe = useSelector((state) => state?.stocks.stocksSubscribe);
  const filter = useSelector((state) => state?.stocks?.filter);

  const stockInfo = stocksSubscribe?.find((item) => item?.nameId === id);

  // const allStocksInfo = useSelector((state) => state?.stocks?.stocksSubscribe)

  let data = chartData[id]?.data;

  console.log('simple Data', data);

  const end = Date.now();

  let filteredData = [];

  if (filter === 'all') {
    filteredData = data;
  } else {
    filteredData = data?.filter(
      (t) =>
        moment(t.date).valueOf() >= startFilter(filter) &&
        moment(t.date).valueOf() <= end
    );
  }

  // if (filteredData?.length > 0) {
  //   data = [...filteredData];
  // }

  console.log('filteredData', filteredData);

  const manipulatedData =
    filteredData?.length > 0
      ? filteredData?.map((item) => ({
          x: Date.parse(item?.date),
          y: item?.currentPrice
        }))
      : [];

  // console.log(data, 'filterdown');

  debugger;
  return (
    <>
      {manipulatedData?.length > 1 ? (
        <Chart
          filter={filter}
          data={manipulatedData}
          color={filteredData[0].color}
          stockId={filteredData[filteredData.length - 1]?.stockId}
          frequency={filteredData[filteredData.length - 1]?.frequency}
          name_slug={filteredData[filteredData.length - 1]?.name_slug}
          symbol={filteredData[filteredData.length - 1]?.symbol}
        />
      ) : (
        <CommonHeading
          className={[AppStyles.mBottom20, AppStyles.textAlignCenter]}
          text={'No Data Found'}
        />
      )}
    </>
  );
};

export default ChartExample;
