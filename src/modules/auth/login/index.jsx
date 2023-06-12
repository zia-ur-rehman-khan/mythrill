import React from "react";
import "./styles.scss";
import { AppStyles, Images } from "../../../theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

import {
  CommonButton,
  CommonHeading,
  CommonInputField,
  CommonTextField,
} from "../../../components";
import { Checkbox, Input, Space } from "antd";
import { css } from "aphrodite";
import AuthLayout from "../../../components/AuthLayout";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const changeRoute = (route) => {
    navigate(route);
  };

  return (
    <AuthLayout
      className="login"
      image={<img src={Images.card3} height={"636px"} />}
    >
      <Space direction="vertical">
        <Space className={css(AppStyles.w100, AppStyles.justifyCenter)}>
          <img src={Images.authLogo} width={"50px"} height={"58px"} />
        </Space>
        <CommonHeading
          textAlign={"center"}
          text={"Let’s login to your Mythril account first"}
        />
        <Space direction="vertical" className={css(AppStyles.w100)}>
          <CommonTextField text={"Phone Number"} opacity={"0.5"} />
          <CommonInputField
            className={"auth"}
            placeholder={"+0 123 456 7890"}
          />
        </Space>
        <Space direction="vertical" className={css(AppStyles.w100)}>
          <CommonTextField text={"Password"} opacity={"0.5"} />
          <CommonInputField
            placeholder={"**************"}
            className={"auth"}
            type={"password"}
            suffix={<img src={Images.eye} />}
          />
        </Space>
        <Space className={css(AppStyles.w100, AppStyles.spaceBetween)}>
          <Space>
            <Checkbox />
            <CommonTextField
              text={"Remember me"}
              opacity={"0.5"}
              fontWeight={600}
            />
          </Space>
          <Space>
            <CommonTextField
              onClick={() => changeRoute("/forgot")}
              text={"Forget Password"}
            />
          </Space>
        </Space>
        <CommonButton
          text={"Login"}
          onClick={() => changeRoute("/packages")}
          classname={css(AppStyles.mTop20)}
        />
        <CommonTextField textAlign={"center"} text={"or continue with"} />
        <Space className={css(AppStyles.justifyCenter, AppStyles.w100)}>
          <img src={Images.google} width={"45px"} height={"45px"} />
          <img src={Images.fb} width={"45px"} height={"45px"} />
        </Space>
        <Space className={css(AppStyles.justifyCenter, AppStyles.w100)}>
          <CommonTextField text={"Don’t have an account?"} />
          <CommonTextField
            color="#7665c1"
            onClick={() => changeRoute("/register")}
            text={"Register here"}
          />
        </Space>
      </Space>
    </AuthLayout>
  );
};
export default Login;
