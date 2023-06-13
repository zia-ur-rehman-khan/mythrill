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

const Register = () => {
  const navigate = useNavigate();

  const changeRoute = (route) => {
    navigate(route);
  };
  return (
    <AuthLayout
      className={"email"}
      image={<img src={Images.register} height={"531px"} />}
    >
      <Space direction="vertical" className={css(AppStyles.w100)}>
        <Space className={css(AppStyles.w100, AppStyles.justifyCenter)}>
          <img src={Images.authLogo} width={"50px"} height={"58px"} />
        </Space>
        <CommonHeading
          level={3}
          textAlign={"center"}
          text={"Create new account"}
        />
        <Space direction="vertical" className={css(AppStyles.w100)}>
          <CommonTextField text={"Full Name"} opacity={"0.5"} />
          <CommonInputField className={"auth"} placeholder={"John Smith"} />
        </Space>
        <Space direction="vertical" className={css(AppStyles.w100)}>
          <CommonTextField text={"Email Address"} opacity={"0.5"} />
          <CommonInputField
            className={"auth"}
            placeholder={"john.smith@domain.com"}
          />
        </Space>
        <Space direction="vertical" className={css(AppStyles.w100)}>
          <CommonTextField text={"Phone Number"} opacity={"0.5"} />
          <CommonInputField
            className={"auth"}
            placeholder={"+0 123 456 7890"}
          />
        </Space>
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
          text={"Register"}
          onClick={() => changeRoute("/number")}
          classname={css(AppStyles.mTop20, AppStyles.mBottom10)}
        />
        <Space direction="vertical" size={15} className={css(AppStyles.w100)}>
          <CommonTextField textAlign={"center"} text={"or continue with"} />
          <Space className={css(AppStyles.justifyCenter, AppStyles.w100)}>
            <img src={Images.google} width={"45px"} height={"45px"} />
            <img src={Images.fb} width={"45px"} height={"45px"} />
          </Space>
          <Space className={css(AppStyles.justifyCenter, AppStyles.w100)}>
            <CommonTextField text={"already have an account?"} />
            <CommonTextField
              color="#7665c1"
              onClick={() => changeRoute("/login")}
              text={"Login"}
            />
          </Space>
        </Space>
      </Space>
    </AuthLayout>
  );
};
export default Register;
