import React, { useEffect, useState } from 'react';

import { Tabs } from 'antd';

import CommonTextField from '../../../../components/common/TextField';
import StockListing from './stockListing';
import {
  CommonButton,
  CommonModal,
  CommonInputField,
  CommonHeading,
  Loader
} from '../../../../components';
import { css } from 'aphrodite';
import { AppStyles } from '../../../../theme';

import { stocksNameManipulator } from '../../../../manipulators/stocksName';
import { useDispatch } from 'react-redux';
import { setStocksListAction } from '../../../../redux/slicers/stocks';
import AddStock from './addStock';

const items = [
  {
    key: '1',
    label: `All`,
    children: <StockListing />
  },
  {
    key: '2',
    label: `Stocks`,
    children: <StockListing test="Market" />
  },
  {
    key: '3',
    label: `Crypto`,
    children: <StockListing test="CryptoCurrency" />
  },
  {
    key: '4',
    label: `Favorites`,
    children: <></>
  }
];

const Market = ({ isLoading, width }) => {
  const dispatch = useDispatch();
  const [isModal, setIsModal] = useState(false);

  const [currentKey, setCurrentKey] = useState(items?.[0]);

  // change tab handler
  const onChange = (key) => {
    const findItem = items.find((item) => item.key === key);

    if (findItem) setCurrentKey(findItem);
  };

  // if fetch stocks name from firebase is in progress
  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <CommonTextField text={'Market'} />
      <Tabs activeKey={currentKey?.key} items={items} onChange={onChange} />
      <CommonButton
        text={'Add Stock'}
        background="rgba(118, 101, 193, 0.1)"
        onClick={() => setIsModal(true)}
      />
      {isModal && (
        <CommonModal
          width={width}
          title={
            <CommonHeading
              text={'Add Stock'}
              textAlign="center"
              className={css(AppStyles.mBottom10)}
            />
          }
          isModalVisible={isModal}
          setIsModalVisible={setIsModal}
        >
          <AddStock isModalVisible={isModal} />
        </CommonModal>
      )}
    </>
  );
};

export default Market;
