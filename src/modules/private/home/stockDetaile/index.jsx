import React, { useEffect, useMemo } from 'react';
import Chart from '../../../../components/Chart';
import { CommonHeading, CommonTextField } from '../../../../components';
import { Col, Divider, Row, Space } from 'antd';
import { AppStyles, Colors, Images } from '../../../../theme';
import { css } from 'aphrodite';
import { array } from 'prop-types';
import Suggestion from './suggestion';
import Update from './update';
import GraphRender from '../../../../components/Meter';
import styles from '../../../../theme/AppStyles';
import { useNavigate, useParams } from 'react-router-dom';
import { HOME_ROUTE, startFilter } from '../../../../constants';
import { collection, db, getDocs, query, where } from '../../../../firebase';
import { stockListManipulator } from '../../../../manipulators/stocksName';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { isEmptyValue } from '../../../../services/utils';
import './styles.scss';

const StockDetailes = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // const stocksSubscribe = useSelector((state) => state?.stocks.stocksSubscribe);
  const trend = useSelector((state) => state?.stocks?.trendData);
  const filter = useSelector((state) => state?.stocks?.filter);
  const chartData = useSelector((state) => state?.stocks.stocksData);
  const preClose = trend.find((stock) => stock.nameId === id);

  let data = chartData[id]?.data;

  const end = Date.now();
  const filteredData = data?.filter(
    (t) =>
      moment(t.date).valueOf() >= startFilter(filter) &&
      moment(t.date).valueOf() <= end
  );

  console.log(filteredData, 'filteredData');

  if (filter !== 'all') {
    if (filteredData?.length > 0) {
      // data = filteredData[0];
      if (filteredData?.length > 1) {
        data = filteredData[0];
      } else {
        const newData =
          data?.length > 0
            ? data?.slice(data?.length - 10, data?.length)
            : [{}];
        data = newData[0];
      }
    } else {
      data = data?.[0] ?? {};
    }
  } else {
    debugger;
    data = data?.[data?.length - 1] ?? {};
  }

  // console.log(selectedStockData, 'filterabove');

  // useEffect(() => {
  //   const selectedStockData = stocksSubscribe.find(
  //     (stock) => stock.nameId === id
  //   );

  //   // if (isEmptyValue(selectedStockData)) {
  //   //   navigate(HOME_ROUTE);
  //   // }
  // }, [stocksSubscribe]);

  console.log(data, filteredData, 'datadatadatadatadata', chartData[id]?.data);

  return (
    <>
      <div
        className="detaile-graph-parent"
        // wrap={true}
        // gutter={[20, 20]}
        // className={css(AppStyles.spaceBetween)}
      >
        <div className="left-side-detail">
          <Update stock={data && data} />
          <Suggestion />
          <div className={'pre-data'}>
            <CommonTextField
              className="title-ellip"
              // fontWeight={600}
              text={preClose?.title?.toUpperCase()}
            />
            <CommonTextField text={'Previous Closes'} fontWeight={400} />
            {Object.values(preClose?.preClosed || {}).map((t, i) => (
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
                  text={t == null ? 'NEUTRAL' : t?.toUpperCase()}
                  fontWeight={600}
                  topClass={'small'}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="meter-detail-side">
          <GraphRender stock={data} />
        </div>
      </div>
      {/* {manipulatedData?.length > 0 && (
        <Chart data={manipulatedData} color={selectedStockData?.color} />
      )} */}
    </>
  );
};

export default StockDetailes;
