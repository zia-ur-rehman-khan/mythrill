import React from "react";
import "./styles.scss";
import { Button, Input, Space, Switch, Tabs } from "antd";
import { CommonButton, CommonHeading, StockCard } from "../../../components";
import Typography from "antd/es/typography/Typography";
import CommonTextField from "../../../components/common/TextField";
import Market from "./market";
const Home = () => {
  return (
    <section className="main-home">
      <div className="left-side">
        <Market />
      </div>
      <div className="right-side">da</div>
    </section>
  );
};

export default Home;
