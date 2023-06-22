import React from 'react';
import { CommonTextField, StockCard } from '../../../../components';
import { useSelector } from 'react-redux';
import { Typography } from 'antd';

const StockListing = ({ test, addIcon, ...props }) => {
  const stocks = useSelector((state) => state?.stocks?.stocksSubscribe);

  const noStockInTheList = () => {
    return <CommonTextField text={'No Stocks in the list'} />;
  };

  const filteredStocks = test
    ? stocks?.filter((d) => d?.type === test)
    : stocks;

  return (
    <>
      {filteredStocks?.length > 0 &&
        filteredStocks?.map((data) => (
          <StockCard addIcon={addIcon} value={data} key={data.id} />
        ))}

      {filteredStocks?.length === 0 && noStockInTheList()}
    </>
  );
};

export default StockListing;
