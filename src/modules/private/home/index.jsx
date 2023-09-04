import React, { useEffect, useMemo, useState } from 'react';
import './styles.scss';
import { Grid } from 'antd';
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
  getNotificationRequest,
  getNotificationsCountRequest,
  getStocksNameRequest,
  getSubscribeDataRealTime,
  getSubscribeStocksRequest,
  setStocksDataAction,
  setStocksListAction
} from '../../../redux/slicers/stocks';
import { Loader } from '../../../components';
import initializeSocket, { socket } from '../../../socket';
import ChartExample from './stockDetaile/chart';
import { SOCKET_URL } from '../../../config/webService';
import { addToCache, getCachValue } from '../../../services/utils';

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

    const listener1 = (...args) => {
      console.log('🚀 ~ file: index.jsx:141 ~ listener1 ~ args:', args);
      dispatch(
        getSubscribeDataRealTime(
          stocksdataManipulatorObject(JSON.parse(args).data)
        )
      );
    };

    socket.on('stock_updates', listener1);

    return () => {
      socket.off('stock_updates', listener1);
    };
  }, [data?.subscribedStocks]);

  useEffect(() => {
    const notification = () => {
      dispatch(
        getNotificationRequest({
          payloadData: {},
          responseCallback: (res) => {
            if (res.status) {
              console.log(res, 'check');
            } else {
              console.log(res.errors, 'error');
            }
          }
        })
      );

      dispatch(
        getNotificationsCountRequest({
          payloadData: {},
          responseCallback: (res) => {
            if (res.status) {
              console.log(res, 'check');
            } else {
              console.log(res.errors, 'error');
            }
          }
        })
      );
    };

    notification();

    const checkCache = () => {
      if (document.visibilityState === 'visible' && document.hidden === false) {
        getCachValue(CACHE_NAME, NOTIFICATION_KEY)
          .then((notificationValue) => {
            if (notificationValue !== null && notificationValue) {
              console.log('cache value', notificationValue);
              notification();
              addToCache(CACHE_NAME, NOTIFICATION_KEY, false).catch((error) => {
                console.log('add cache value error', error);
              });
            } else {
              console.log('cache value not found');
            }
          })
          .catch((error) => {
            console.error('Error reading value from cache:', error);
          });
      }
    };

    document.addEventListener('visibilitychange', checkCache);

    return () => {
      document.removeEventListener('visibilitychange', checkCache);
    };
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {!screens.lg ? (
        <div className="mobile-view">
          <div className="left-side">
            <Market isLoading={isLoading} width="90%" />
          </div>
          <div className="right-side">{getContentByPathname}</div>
        </div>
      ) : (
        <div className="main-home">
          <div className="left-side">
            <Market width="40%" isLoading={isLoading} />
          </div>
          <div className="right-side">{getContentByPathname}</div>
        </div>
      )}
    </>
  );
};

export default Home;
