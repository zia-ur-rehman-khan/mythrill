import React from "react";
import { StockCard } from "../../../../components";
import { stock_List } from "../../../../constants";

const StockListing = ({ test }) => {
  return (
    <>
      {test
        ? stock_List
            .filter((d) => d?.name === test)
            .map((data, i) => <StockCard value={data} key={data.id} />)
        : stock_List.map((data, i) => <StockCard value={data} key={data.id} />)}
    </>
  );
};

export default StockListing;
