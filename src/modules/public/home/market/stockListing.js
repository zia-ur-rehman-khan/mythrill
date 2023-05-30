import React from "react";
import { StockCard } from "../../../../components";

const StockListing = ({ test }) => {
  const stoc_kList = [
    {
      title: "BTCUSDT",
      name: "Cryptocurrency",
      amount: "$23,738",
      stockUpdate: "+23,6%",
      color: "green",
    },
    {
      title: "BTCUSDT",
      name: "Cryptocurrency",
      amount: "$23,738",
      stockUpdate: "+23,6%",
      color: "green",
    },
    {
      title: "Netflix",
      name: "Stock",
      amount: "$738.00",
      stockUpdate: "+23,6%",
      color: "red",
    },
    {
      title: "BTCUSDT",
      name: "Cryptocurrency",
      amount: "$23,738",
      stockUpdate: "+23,6%",
      color: "green",
    },
    {
      title: "Netflix",
      name: "Stock",
      amount: "$738.00",
      stockUpdate: "+23,6%",
      color: "red",
    },
    {
      title: "BTCUSDT",
      name: "Cryptocurrency",
      amount: "$23,738",
      stockUpdate: "+23,6%",
      color: "green",
    },
    {
      title: "Netflix",
      name: "Stock",
      amount: "$738.00",
      stockUpdate: "+23,6%",
      color: "red",
    },
  ];

  return (
    <>
      {test
        ? stoc_kList
            .filter((d) => d?.name === test)
            .map((data, i) => <StockCard value={data} key={i} />)
        : stoc_kList.map((data, i) => <StockCard value={data} key={i} />)}
    </>
  );
};

export default StockListing;
