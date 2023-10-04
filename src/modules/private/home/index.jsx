import React, { useEffect, useMemo, useState } from 'react';
import './styles.scss';
import { Grid, Select, Space } from 'antd';
import Market from './market';
import { useParams, useLocation } from 'react-router-dom';
import Stock from './stock';
import StockDetailes from './stockDetaile';
import Trending from './trending';
import {
  CACHE_NAME,
  HOME_ROUTE,
  NOTIFICATION_KEY,
  STOCK_NAME_LIST,
  TRENDING_ROUTE
} from '../../../constants';
import {
  collection,
  db,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  where
} from '../../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import {
  singleStockNameManipulator,
  stockListManipulator,
  stocksNameManipulator,
  stocksdataManipulatorObject
} from '../../../manipulators/stocksName';
import {
  getAllStocksRequest,
  getFavouriteStockRequest,
  getNotificationRequest,
  getNotificationsCountRequest,
  getStocksNameRequest,
  getSubscribeDataRealTime,
  getSubscribeStocksRequest,
  getUnSubscribeDataRealTime,
  setFilter,
  setStocksDataAction,
  setStocksListAction
} from '../../../redux/slicers/stocks';
import { CommonTextField, Loader } from '../../../components';
import initializeSocket, { socket } from '../../../socket';
import ChartExample from './stockDetaile/chart';
import { SOCKET_URL } from '../../../config/webService';
import { addToCache, getCachValue } from '../../../services/utils';
import { css } from 'aphrodite';
import { AppStyles } from '../../../theme';

const { useBreakpoint } = Grid;

const Home = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const { pathname } = location;
  const screens = useBreakpoint();

  const [isLoading, setIsLoading] = useState(true);
  const { data } = useSelector((state) => state?.user);

  const getContentByPathname = useMemo(() => {
    if (pathname.startsWith('/stock/')) {
      return (
        <>
          <StockDetailes id={id} />
          <ChartExample />
        </>
      );
    } else if (pathname === HOME_ROUTE) {
      return <Stock id={id} />;
    } else if (pathname === TRENDING_ROUTE) {
      return <Trending id={id} />;
    }
  }, [id, pathname]);

  useEffect(() => {
    const socket = initializeSocket(
      `wss://${SOCKET_URL}?stocks=${data?.subscribedStocks || ''}`
    );

    dispatch(
      getSubscribeStocksRequest({
        payloadData: {},
        responseCallback: (res) => {
          if (res.status) {
            setIsLoading(false);
            console.log(res.status, 'res');
          } else {
            setIsLoading(false);
            console.log(res.errors, 'error');
          }
        }
      })
    );

    dispatch(
      getAllStocksRequest({
        payloadData: {},
        responseCallback: (res) => {
          if (res.status) {
            console.log(res, 'res');
          } else {
            console.log(res.errors, 'error');
          }
        }
      })
    );

    const listener1 = (...args) => {
      console.log('home data', JSON.parse(args));
      dispatch(
        getSubscribeDataRealTime(
          stocksdataManipulatorObject(JSON.parse(args).data)
        )
      );
    };

    const listener2 = (...args) => {
      dispatch(
        getUnSubscribeDataRealTime(
          stocksdataManipulatorObject(JSON.parse(args).data)
        )
      );
    };

    socket.on('stock_updates', listener1);
    socket.on('stock_name_updates', listener2);

    return () => {
      socket.off('stock_updates', listener1);
      socket.off('stock_name_updates', listener2);
    };
  }, [data?.subscribedStocks]);

  if (isLoading) {
    return <Loader />;
  }

  const handleChange = (value) => {
    dispatch(setFilter(value));
  };

  return (
    <>
      {!screens.lg ? (
        <div className="mobile-view">
          <div className="left-side">
            <Market isLoading={isLoading} width="90%" />
          </div>
          {pathname === HOME_ROUTE ? (
            <div className={'home-filter'}>
              <Space className="select-parent">
                <CommonTextField text={'Duration'} />
                <Select
                  className="filter-select"
                  defaultValue="all"
                  style={{
                    width: 200
                  }}
                  onChange={handleChange}
                  options={[
                    {
                      value: 'all',
                      label: 'All'
                    },
                    {
                      value: '5Min',
                      label: '5 Minute'
                    },
                    {
                      value: '15Min',
                      label: '15 Minute'
                    },
                    {
                      value: '30Min',
                      label: '30 Minute'
                    },
                    {
                      value: '1H',
                      label: '1 Hour'
                    },
                    {
                      value: '4H',
                      label: '4 Hour'
                    },
                    {
                      value: '8H',
                      label: '8 Hour'
                    },
                    {
                      value: '1D',
                      label: '1 Day'
                    },
                    {
                      value: '1W',
                      label: '1 Week'
                    },
                    {
                      value: '1M',
                      label: '1 Month'
                    }
                  ]}
                />
              </Space>
              <div className="right-home-side">{getContentByPathname}</div>
            </div>
          ) : (
            <div className="right-side">{getContentByPathname}</div>
          )}
        </div>
      ) : (
        <div className="main-home">
          <div className="left-side">
            <Market width="40%" isLoading={isLoading} />
          </div>
          {pathname === HOME_ROUTE ? (
            <div className={'home-filter'}>
              <Space className="select-parent">
                <CommonTextField text={'Duration'} />
                <Select
                  className="filter-select"
                  defaultValue="all"
                  style={{
                    width: 200
                  }}
                  onChange={handleChange}
                  options={[
                    {
                      value: 'all',
                      label: 'All'
                    },
                    {
                      value: '5Min',
                      label: '5 Minute'
                    },
                    {
                      value: '15Min',
                      label: '15 Minute'
                    },
                    {
                      value: '30Min',
                      label: '30 Minute'
                    },
                    {
                      value: '1H',
                      label: '1 Hour'
                    },
                    {
                      value: '4H',
                      label: '4 Hour'
                    },
                    {
                      value: '8H',
                      label: '8 Hour'
                    },
                    {
                      value: '1D',
                      label: '1 Day'
                    },
                    {
                      value: '1W',
                      label: '1 Week'
                    },
                    {
                      value: '1M',
                      label: '1 Month'
                    }
                  ]}
                />
              </Space>
              <div className="right-home-side">{getContentByPathname}</div>
            </div>
          ) : (
            <div className="right-side">{getContentByPathname}</div>
          )}
        </div>
      )}
    </>
  );
};

export default Home;
