import React, { useState } from "react";
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
import { Checkbox, Form, Input, Space } from "antd";
import { css } from "aphrodite";
import AuthLayout from "../../../components/AuthLayout";
import { useNavigate } from "react-router-dom";
import {
  CommonPasswordInput,
  CommonPhoneInput,
} from "../../../components/common";
import DataHandler from "../../../services/DataHandler";
import {
  checkPasswordValidation,
  getFieldValue,
} from "../../../services/utils";
import {
  EMAIL_RULE,
  handlePassworMatch,
  handlePasswordConfirm,
  passwordValidation,
  phoneValidation,
  validatorField,
} from "../../../constants";

const Register = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const changeRoute = (route) => {
    navigate(route);
  };

  const onFinish = (values) => {
    setLoading(true);

    console.log("Success:", values);

    changeRoute("/number");
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const [form] = Form.useForm();
  const { getFieldValue } = form;

  return (
    <AuthLayout
      className={"email"}
      image={<img src={Images.register} height={"531px"} />}
    >
      <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
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
            <CommonInputField
              name="full name"
              className={"auth"}
              placeholder={"John Smith"}
              rules={[
                {
                  validator: (_, value) => {
                    return validatorField(_, value, 3, 80);
                  },
                },
              ]}
            />
          </Space>
          <Space direction="vertical" className={css(AppStyles.w100)}>
            <CommonTextField text={"Email Address"} opacity={"0.5"} />
            <CommonInputField
              name="email"
              type={"email"}
              className={"auth"}
              placeholder={"john.smith@domain.com"}
              rules={EMAIL_RULE}
            />
          </Space>
          <Space direction="vertical" className={css(AppStyles.w100)}>
            <CommonTextField text={"Phone Number"} opacity={"0.5"} />
            <CommonPhoneInput
              name={"phone number"}
              rules={[
                {
                  validator: (_, value) => {
                    return phoneValidation(_, value);
                  },
                },
              ]}
            />
          </Space>
          <Space direction="vertical" className={css(AppStyles.w100)}>
            <CommonTextField text={"New Password"} opacity={"0.5"} />
            <CommonPasswordInput
              name={"password"}
              placeholder={"**************"}
              rules={[
                {
                  validator: (_, value) => {
                    return passwordValidation(_, value);
                  },
                },
              ]}
            />
          </Space>
          <Space direction="vertical" className={css(AppStyles.w100)}>
            <CommonTextField text={"Confirm Password"} opacity={"0.5"} />
            <CommonPasswordInput
              name={"new password"}
              placeholder={"**************"}
              rules={[
                {
                  validator: (_, value) => {
                    return handlePassworMatch(
                      _,
                      value,
                      getFieldValue("password")
                    );
                  },
                },
              ]}
            />
          </Space>

          <CommonButton
            loading={loading}
            text={"Register"}
            htmlType="submit"
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
      </Form>
    </AuthLayout>
  );
};
export default Register;
