import React from "react";
import Chart from "../../../../components/Chart";
import { CommonTextField } from "../../../../components";
import { Space } from "antd";
import { AppStyles, Colors, Images } from "../../../../theme";
import { css } from "aphrodite";
import { array } from "prop-types";
import Suggestion from "./suggestion";
import Update from "./update";

const StockDetailes = () => {
  const current = [1, 2, 3, 4, 5];

  return (
    <div>
      <Space direction="vertical">
        <Update />
        <Suggestion />
      </Space>
      <Chart />
    </div>
  );
};

export default StockDetailes;
