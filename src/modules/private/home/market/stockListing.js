import React from 'react';
import { CommonTextField, StockCard } from '../../../../components';
import { useSelector } from 'react-redux';
import { Typography } from 'antd';

const StockListing = ({ test, addIcon, search, ...props }) => {
  const stocks = useSelector((state) => state?.stocks?.stocksSubscribe);
  const unSubstocks = useSelector((state) => state?.stocks?.stocksUnSubscribe);

  console.log(stocks, 'stocks');

  const noStockInTheList = () => {
    return <CommonTextField text={'No Stocks in the list'} />;
  };

  const filteredStocks = test
    ? stocks?.filter((d) => d?.type === test)
    : stocks;

  return (
    <>
      {addIcon
        ? unSubstocks
            ?.filter((d) =>
              d.title.toLowerCase().includes(search.toLowerCase())
            )
            ?.map((d) => (
              <StockCard addIcon={addIcon} value={d} key={Math.random()} />
            ))
        : filteredStocks?.length > 0
        ? filteredStocks?.map((data) => (
            <StockCard value={data} key={Math.random()} />
          ))
        : noStockInTheList()}
    </>
  );
};

export default StockListing;
