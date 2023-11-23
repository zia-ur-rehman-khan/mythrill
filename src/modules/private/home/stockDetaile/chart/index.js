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
  // const stocksSubscribe = useSelector((state) => state?.stocks.stocksSubscribe);
  const filter = useSelector((state) => state?.stocks?.filter);

  // const stockInfo = stocksSubscribe?.find((item) => item?.nameId === id);

  let data = chartData[id]?.data;

  const end = Date.now();

  const filteredData = data?.filter(
    (t) =>
      moment(t.date).valueOf() >= startFilter(filter) &&
      moment(t.date).valueOf() <= end
  );

  console.log('filteredData', filteredData);

  if (filter !== 'all') {
    if (filteredData?.length > 0) {
      debugger;

      if (filteredData?.length > 1) {
        data = filteredData;
      } else {
        data =
          data?.length > 0
            ? data?.slice(data?.length - 10, data?.length)
            : [{}];
      }
    } else {
      data = data?.length > 0 ? data?.slice(0, 10) : [];
    }
  } else {
    // data = data?.length > 0 ? [data[data.length - 1]] : [{}];
  }

  const manipulatedData =
    data?.length > 0
      ? data?.map((item) => ({
          x: Date.parse(item?.date),
          y: item?.currentPrice
        }))
      : [];

  // console.log(data, 'filterdown');

  return (
    <>
      {manipulatedData?.length > 0 && (
        <Chart
          filter={filter}
          data={manipulatedData}
          color={
            filter !== 'all' ? data[0].color : data[data?.length - 1].color
          }
          stockId={
            filter !== 'all'
              ? data[0]?.stockId
              : data[data?.length - 1]?.stockId
          }
          frequency={
            filter !== 'all'
              ? data[0]?.frequency
              : data[data?.length - 1]?.frequency
          }
          name_slug={
            filter !== 'all'
              ? data[0]?.name_slug
              : data[data?.length - 1]?.name_slug
          }
          symbol={
            filter !== 'all' ? data[0]?.symbol : data[data?.length - 1]?.symbol
          }
        />
      )}
    </>
  );
};

export default ChartExample;
