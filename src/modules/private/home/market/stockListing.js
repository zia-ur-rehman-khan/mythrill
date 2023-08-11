import React from 'react';
import { CommonTextField, StockCard } from '../../../../components';
import { useSelector } from 'react-redux';
import { Typography } from 'antd';

const StockListing = ({ test, addIcon, search, ...props }) => {
  const stocks = useSelector((state) => state?.stocks?.stocksSubscribe);
  const unSubstocks = useSelector((state) => state?.stocks?.stocksUnSubscribe);

  const searchText = useSelector((state) => state?.user.search);

  const noStockInTheList = () => {
    return <CommonTextField text={'No Stocks in the list'} />;
  };

  let filteredStocks = test ? stocks?.filter((d) => d?.type === test) : stocks;

  if (searchText) {
    filteredStocks = filteredStocks?.filter((d) =>
      d.nameId.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  return (
    <>
      {addIcon
        ? unSubstocks
            ?.filter((d) =>
              d?.nameId?.toLowerCase().includes(search.toLowerCase())
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
