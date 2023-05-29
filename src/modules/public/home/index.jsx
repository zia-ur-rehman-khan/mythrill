import React from "react";
import "./styles.scss";
import { Button, Input, Space, Switch } from "antd";
import { CommonButton, CommonHeading } from "../../../components";
import Typography from "antd/es/typography/Typography";
import CommonTextField from "../../../components/common/TextField";
const Home = () => {
  return (
    <section className="main-home">
      <CommonTextField text={"Home"} mt="30px" />
    </section>
  );
};

export default Home;
