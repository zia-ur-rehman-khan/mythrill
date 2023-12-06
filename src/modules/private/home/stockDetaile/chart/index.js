import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Chart from '../../../../../components/Chart';
import { CommonHeading, GraphFilter } from '../../../../../components';
import { startFilter } from '../../../../../constants';
import { AppStyles } from '../../../../../theme';
import { setFilter } from '../../../../../redux/slicers/stocks';
import _ from 'lodash';

const ChartExample = () => {
  const { id } = useParams();
  const [filterData, setFilterData] = useState([]);
  const [graphDetail, setGraphDetail] = useState({});
  const chartData = useSelector((state) => state?.stocks.stocksData);
  const filter = useSelector((state) => state?.stocks?.filter);
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    filterGraphData();
  }, [chartData, filter, pathname]);

  const filterGraphData = () => {
    const data = chartData[id]?.data;

    debugger;

    if (!_.isEmpty(data)) {
      const end = Date.now();

      if (filter !== 'all') {
        const filteredData = data?.filter(
          (t) =>
            moment(t.date).valueOf() >= startFilter(filter) &&
            moment(t.date).valueOf() <= end
        );

        // debugger;

        if (filteredData?.length > 0) {
          const temp = filteredData[0];
          setGraphDetail(temp);
          if (filteredData?.length > 1) {
            setFilterData(filteredData);
          } else {
            setFilterData(
              data?.length > 0
                ? data?.slice(data?.length - 10, data?.length)
                : []
            );
          }
        } else {
          setFilterData(
            data?.length > 0 ? data?.slice(data?.length - 10, data.length) : []
          );
          setGraphDetail(data[data?.length - 1]);
        }
      } else {
        setFilterData(data);
        setGraphDetail(data[data?.length - 1]);
      }
    } else {
      setFilterData([]);
    }
  };

  const manipulatedData = useMemo(() => {
    return filterData?.length > 0
      ? filterData?.map((item) => ({
          x: Date.parse(item?.date),
          y: item?.currentPrice
        }))
      : [];
  }, [filterData]);

  return (
    <>
      {manipulatedData?.length > 0 && (
        <Chart
          filter={filter}
          data={manipulatedData}
          color={graphDetail?.color}
          stockId={graphDetail?.stockId}
          frequency={graphDetail?.frequency}
          name_slug={graphDetail?.name_slug}
          symbol={graphDetail?.symbol}
        />
      )}
    </>
  );
};

export default ChartExample;
