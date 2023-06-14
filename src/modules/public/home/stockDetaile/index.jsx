import React from "react";
import Chart from "../../../../components/Chart";
import { CommonTextField } from "../../../../components";
import { Col, Row, Space } from "antd";
import { AppStyles, Colors, Images } from "../../../../theme";
import { css } from "aphrodite";
import { array } from "prop-types";
import Suggestion from "./suggestion";
import Update from "./update";
import GraphRender from "../../../../components/Meter";
import styles from "../../../../theme/AppStyles";

const StockDetailes = () => {
  const current = [1, 2, 3, 4, 5];

  return (
    <>
      <Row
        wrap={true}
        gutter={[20, 20]}
        className={css(AppStyles.justifyCenter)}
      >
        <Col
          lg={{ span: 16 }}
          md={{ span: 24 }}
          sm={{ span: 24 }}
          xs={{ span: 24 }}
        >
          <Update />
          <Suggestion />
        </Col>
        <Col lg={{ span: 8 }} md={{ span: 6 }}>
          <GraphRender />
        </Col>
      </Row>
      <Chart />
    </>
  );
};

export default StockDetailes;
