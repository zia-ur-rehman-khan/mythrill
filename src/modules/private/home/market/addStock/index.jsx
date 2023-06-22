import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { CommonInputField, Loader } from '../../../../../components';
import StockListing from '../stockListing';
import { css } from 'aphrodite';
import { AppStyles } from '../../../../../theme';
import { useDispatch } from 'react-redux';
import {
  getAllStocksRequest,
  getSubscribeStocksRequest
} from '../../../../../redux/slicers/stocks';

const AddStock = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
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
      <div className={css(AppStyles.padding10)}>
        <StockListing addIcon={true} search={search} />
      </div>
    </>
  );
};

export default AddStock;
