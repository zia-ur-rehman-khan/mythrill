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

const ResetPassword = () => {
  const navigate = useNavigate();

  const changeRoute = (route) => {
    navigate(route);
  };
  return (
    <AuthLayout
      arrow
      className="email"
      image={<img src={Images.reset} height={"424px"} />}
    >
      <Space direction="vertical">
        <Space className={css(AppStyles.w100, AppStyles.justifyCenter)}>
          <img src={Images.authLogo} width={"50px"} height={"58px"} />
        </Space>
        <CommonHeading
          level={3}
          textAlign={"center"}
          text={"Reset your Password Mythril"}
        />
        <Space direction="vertical" className={css(AppStyles.w100)}>
          <CommonTextField text={"New Password"} opacity={"0.5"} />
          <CommonInputField
            placeholder={"**************"}
            className={"auth"}
            type={"password"}
            suffix={<img src={Images.eye} />}
          />
        </Space>
        <Space direction="vertical" className={css(AppStyles.w100)}>
          <CommonTextField text={"Confirm Password"} opacity={"0.5"} />
          <CommonInputField
            placeholder={"**************"}
            className={"auth"}
            type={"password"}
            suffix={<img src={Images.eye} />}
          />
        </Space>
        <CommonButton
          text={"Reset Password"}
          onClick={() => changeRoute("/login")}
          classname={css(AppStyles.mTop20)}
        />
      </Space>
    </AuthLayout>
  );
};
export default ResetPassword;
