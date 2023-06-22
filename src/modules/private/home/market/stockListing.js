import React from 'react';
import { CommonTextField, StockCard } from '../../../../components';
import { useSelector } from 'react-redux';
import { Typography } from 'antd';

const StockListing = ({ test, addIcon, search, ...props }) => {
  const stocks = useSelector((state) => state?.stocks?.stocksSubscribe);
  const unSubstocks = useSelector((state) => state?.stocks?.stocksUnSubscribe);

  const noStockInTheList = () => {
    return <CommonTextField text={'No Stocks in the list'} />;
  };

  const filteredStocks = test
    ? stocks?.filter((d) => d?.type === test)
    : stocks;

  return (
    <>
      {filteredStocks?.length > 0
        ? addIcon
          ? unSubstocks
              ?.filter((d) =>
                d.title.toLowerCase().includes(search.toLowerCase())
              )
              ?.map((data) => (
                <StockCard addIcon={addIcon} value={data} key={data.id} />
              ))
          : filteredStocks?.map((data) => (
              <StockCard value={data} key={data.id} />
            ))
        : noStockInTheList()}
    </>
  );
};

export default StockListing;
