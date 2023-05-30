import React from "react";

import { Button, Input, Space, Switch, Tabs } from "antd";
import CommonTextField from "../../../../components/common/TextField";
import StockListing from "./stockListing";
import { CommonButton } from "../../../../components";
import { Colors } from "../../../../theme";

const Market = () => {
  const items = [
    {
      key: "1",
      label: `All`,
      children: <StockListing />,
    },
    {
      key: "2",
      label: `Stocks`,
      children: <StockListing test="Stock" />,
    },
    {
      key: "3",
      label: `Crypto`,
      children: <StockListing test="Cryptocurrency" />,
    },
    {
      key: "4",
      label: `Favorites`,
      children: <StockListing />,
    },
  ];

  const onChange = (key) => {
    console.log(key);
  };

  return (
    <>
      <CommonTextField text={"Market"} />
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      <CommonButton text={"Add Stock"} />
    </>
  );
};

export default Market;
