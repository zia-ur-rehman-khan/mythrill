import React from "react";
import Chart from "../../../../components/Chart";
import { CommonTextField } from "../../../../components";
import { Space } from "antd";
import { AppStyles, Colors, Images } from "../../../../theme";
import { css } from "aphrodite";
import { array } from "prop-types";
import Suggestion from "./suggestion";
import Update from "./update";
import GraphRender from "../../../../components/Meter";

const StockDetailes = () => {
  const current = [1, 2, 3, 4, 5];

  return (
    <>
      <Space className={css([AppStyles.w100, AppStyles.spaceBetween])}>
        <Space size={15} direction="vertical">
          <Update />
          <Suggestion />
        </Space>
        <GraphRender />
      </Space>
      <Chart />
    </>
  );
};

export default StockDetailes;
