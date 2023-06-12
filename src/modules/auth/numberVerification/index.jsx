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

const NumberVerification = () => {
  const navigate = useNavigate();

  const changeRoute = (route) => {
    navigate(route);
  };
  return (
    <AuthLayout
      className={"number"}
      image={<img src={Images.number} height={"552px"} />}
    >
      <Space direction="vertical">
        <Space className={css(AppStyles.w100, AppStyles.justifyCenter)}>
          <img src={Images.authLogo} width={"50px"} height={"58px"} />
        </Space>
        <CommonHeading
          textAlign={"center"}
          text={"Phone Number Verification Please Check Your Phone"}
        />
        <CommonTextField
          width="65%"
          margin="0 auto"
          textAlign={"center"}
          text={
            "Add 6 digits verification code sent on your given phone number +0 123 **** ***"
          }
          opacity={"0.5"}
        />
        <CommonInputField
          className={"auth"}
          placeholder={"5 6 8 9 2 3"}
          suffix={<CommonTextField text={"Resend"} opacity={"0.5"} />}
        />
        <CommonButton
          text={"Submit"}
          onClick={() => changeRoute("/packages")}
          classname={css(AppStyles.mTop20)}
        />
      </Space>
    </AuthLayout>
  );
};
export default NumberVerification;
