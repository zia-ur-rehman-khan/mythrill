import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import {
  CommonInputField,
  CommonTextField,
  Loader
} from '../../../../../components';
import StockListing from '../stockListing';
import { css } from 'aphrodite';
import { AppStyles } from '../../../../../theme';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllStocksRequest,
  getSubscribeStocksRequest,
  getUnSubscribeDataRealTime
} from '../../../../../redux/slicers/stocks';
import initializeSocket, { socket } from '../../../../../socket';
import { stocksdataManipulatorObject } from '../../../../../manipulators/stocksName';
import './styles.scss';

const AddStock = ({ isModalVisible }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const { data } = useSelector((state) => state?.user);
  const limit = useSelector((state) => state?.stocks.stockLimitExceed);

  useEffect(() => {
    const socket = initializeSocket(
      `wss://app-dev.mythril.ai?stocks=${data?.subscribedStocks || ''}`
    );

    dispatch(
      getAllStocksRequest({
        payloadData: {},
        responseCallback: (res) => {
          setIsLoading(false);
          if (res.status) {
            console.log(res, 'res');
          } else {
            console.log(res.errors, 'error');
          }
        }
      })
    );

    const listener2 = (...args) => {
      dispatch(
        getUnSubscribeDataRealTime(
          stocksdataManipulatorObject(JSON.parse(args).data)
        )
      );
    };
    socket.on('stock_name_updates', listener2);

    return () => {
      socket.off('stock_name_updates', listener2);
    };
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <CommonInputField
        placeholder="Search..."
        suffix={<FontAwesomeIcon icon={faSearch} />}
        onChange={(e) => setSearch(e.target.value)}
      />
      {limit && (
        <div className="limit-error">
          <CommonTextField
            text={'Cant Add More Stocks Buy Premium Package'}
            textAlign={'center'}
          />
        </div>
      )}
      <div className={css(AppStyles.padding10)}>
        <StockListing addIcon={true} search={search} />
      </div>
    </>
  );
};

export default AddStock;
