import React from "react";
import "./styles.scss";
import { AppStyles, Images } from "../../../theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

import {
  AuthLayout,
  CommonButton,
  CommonHeading,
  CommonInputField,
  CommonTextField,
} from "../../../components";
import { Checkbox, Input, Space } from "antd";
import { css } from "aphrodite";
import { useNavigate } from "react-router-dom";

const Forgot = () => {
  const navigate = useNavigate();

  const changeRoute = (route) => {
    navigate(route);
  };
  return (
    <AuthLayout image={<img src={Images.forgot} height={"446px"} />}>
      <Space direction="vertical">
        <Space className={css(AppStyles.w100, AppStyles.justifyCenter)}>
          <img src={Images.authLogo} width={"50px"} height={"58px"} />
        </Space>
        <CommonHeading
          textAlign={"center"}
          text={"Forgot your Mythril password"}
        />
        <CommonTextField
          width="65%"
          margin="0 auto"
          textAlign={"center"}
          text={
            "Enter your registered email below to receive password reset instruction"
          }
          opacity={"0.5"}
        />

        <Space direction="vertical" className={css(AppStyles.w100)}>
          <CommonTextField text={"Email Address"} opacity={"0.5"} />
          <CommonInputField
            className={"auth"}
            placeholder={"john.smith@domain.com"}
          />
        </Space>

        <CommonButton
          text={"Send"}
          onClick={() => changeRoute("/email")}
          classname={css(AppStyles.mTop20)}
        />
      </Space>
    </AuthLayout>
  );
};
export default Forgot;
