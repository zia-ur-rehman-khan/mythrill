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

  const filterData = () => {
    let temp;

    switch (test) {
      case 'Market':
        temp = stocks?.filter((d) => d?.type === test);
        break;
      case 'CryptoCurrency':
        temp = stocks?.filter((d) => d?.type === test);
        break;
      case 'favourite':
        temp = stocks?.filter((d) => d?.favourite);
        break;
      default:
        temp = stocks;
        break;
    }

    return temp;
  };

  let filteredStocks = filterData();

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
            ?.map((d,i) => (
              <StockCard addIcon={addIcon} value={d} key={Math.random()} count={i + 1}/>
            ))
        : filteredStocks?.length > 0
        ? filteredStocks?.map((data , i) => (
            <StockCard test={test} value={data} key={Math.random()} count={i + 1} />
          ))
        : noStockInTheList()}
    </>
  );
};

export default StockListing;
