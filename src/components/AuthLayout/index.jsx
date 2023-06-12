import React from "react";
import "./styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

import {
  CommonButton,
  CommonHeading,
  CommonInputField,
  CommonTextField,
} from "../../components";
import { Checkbox, Input, Space } from "antd";
import { css } from "aphrodite";
import { Images } from "../../theme";

const AuthLayout = ({ children, image, className }) => {
  return (
    <div className="auth-box">
      <div className="left-side">
        <div className="content">{children}</div>
        <CommonTextField
          topClass={"copy-right"}
          text={"© 2023 Mythril Trends. All rights reserved"}
        />
      </div>
      <div className={`${className || ""} image`}>{image}</div>
    </div>
  );
};
export default AuthLayout;
