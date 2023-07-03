import React, { useEffect, useMemo, useState } from 'react';
import './styles.scss';
import { Grid } from 'antd';
import Market from './market';
import { useParams, useLocation } from 'react-router-dom';
import Stock from './stock';
import StockDetailes from './stockDetaile';
import Trending from './trending';
import {
  HOME_ROUTE,
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
  getStocksNameRequest,
  getSubscribeDataRealTime,
  getSubscribeStocksRequest,
  setStocksDataAction,
  setStocksListAction
} from '../../../redux/slicers/stocks';
import { Loader } from '../../../components';
import initializeSocket, { socket } from '../../../socket';
import ChartExample from './stockDetaile/chart';

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
    // const stockListCollectionRef = collection(db, 'stocks');
    // const stocksListQuery = query(
    //   stockListCollectionRef,
    //   orderBy('date_time', 'desc'),
    //   limit(200),
    //   where('name_id', 'in', STOCK_NAME_LIST)
    // );
    // console.log('stocksListQuery', stocksListQuery);
    // const unSubscribe = onSnapshot(
    //   stocksListQuery,
    //   (querySnapshot) => {
    //     const stocksList = [];
    //     querySnapshot.forEach((doc) => {
    //       stocksList.push(doc.data());
    //     });

    //     const stocksDataPayload = {};
    //     const stockNamesPayload = [];

    //     for (const stock of STOCK_NAME_LIST) {
    //       const filteredStock = stocksList?.filter(
    //         (item) => item.name_id === stock
    //       );

    //       if (filteredStock?.length === 0) continue;

    //       const stockNameManipulatedData = singleStockNameManipulator(
    //         filteredStock?.[0]
    //       );
    //       const manipulatedData = stockListManipulator(filteredStock);

    //       manipulatedData?.sort(
    //         (a, b) => new Date(a?.date) - new Date(b?.date)
    //       );
    //       stockNamesPayload.push(stockNameManipulatedData);
    //       stocksDataPayload[stock] = manipulatedData;
    //     }

    //     dispatch(setStocksListAction(stockNamesPayload));
    //     dispatch(setStocksDataAction(stocksDataPayload));
    //     setIsLoading(false);
    //   },
    //   (error) => {
    //     console.error(error);
    //     setIsLoading(false);
    //   }
    // );

    // return unSubscribe;

    const socket = initializeSocket(
      `wss://app-dev.mythril.ai?stocks=${data?.subscribedStocks}`
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
