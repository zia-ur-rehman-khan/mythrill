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

const EmailVerification = () => {
  const navigate = useNavigate();

  const changeRoute = (route) => {
    navigate(route);
  };
  return (
    <AuthLayout
      className="email"
      image={<img src={Images.email} height={"374px"} />}
    >
      <Space direction="vertical">
        <Space className={css(AppStyles.w100, AppStyles.justifyCenter)}>
          <img src={Images.authLogo} width={"50px"} height={"58px"} />
        </Space>
        <CommonHeading
          level={3}
          textAlign={"center"}
          text={"Email Verification Please Check Your Email"}
        />
        <Space>
          <CommonTextField text={"john.smith@domain.com"} opacity={"0.5"} />
          <CommonTextField text={"Not You?"} color="#7665c1" />
        </Space>
        <CommonInputField
          className={"auth"}
          placeholder={"5 6 8 9 2 3"}
          suffix={<CommonTextField text={"Resend"} opacity={"0.5"} />}
        />
        <CommonButton
          text={"Submit"}
          onClick={() => changeRoute("/reset-password")}
          classname={css(AppStyles.mTop20)}
        />
      </Space>
    </AuthLayout>
  );
};
export default EmailVerification;
