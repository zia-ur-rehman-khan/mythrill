import React, { useEffect, useMemo, useState } from 'react';
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
import { useLocation, useNavigate, useParams } from 'react-router-dom';
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
  const trend = useSelector((state) => state?.stocks?.trendData);
  const filter = useSelector((state) => state?.stocks?.filter);
  const chartData = useSelector((state) => state?.stocks.stocksData);
  const [graphDetail, setGraphDetail] = useState({});
  const location = useLocation();
  const { pathname } = location;

  const preClose = trend.find((stock) => stock.nameId === id);

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

        if (filteredData?.length > 0) {
          const temp = filteredData[0];
          setGraphDetail(temp);
        } else {
          setGraphDetail(data[data?.length - 1]);
        }
      } else {
        setGraphDetail(data[data?.length - 1]);
      }
    } else {
      setGraphDetail({});
    }
  };

  return (
    <>
      <div
        className="detaile-graph-parent"
        // wrap={true}
        // gutter={[20, 20]}
        // className={css(AppStyles.spaceBetween)}
      >
        <div className="left-side-detail">
          <Update stock={graphDetail && graphDetail} />
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
          <GraphRender stock={graphDetail} />
        </div>
      </div>
      {/* {manipulatedData?.length > 0 && (
        <Chart data={manipulatedData} color={selectedStockData?.color} />
      )} */}
    </>
  );
};

export default StockDetailes;
