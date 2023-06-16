import React from "react";
import "./styles.scss";
import {
  CommonButton,
  CommonHeading,
  CommonTextField,
} from "../../../components";
import { Space } from "antd";
import { AppStyles, Images } from "../../../theme";
import { css } from "aphrodite";
import SubcriptionCard from "./subCard";

const Subscripton = () => {
  return (
    <div className="sub-parent">
      <CommonHeading
        textAlign={"center"}
        text={"Our Services Has Friendly Packages"}
      />
      <CommonTextField
        text={"Choose plans that might better for your!"}
        className={css(AppStyles.mTop10)}
      />
      <div className="sub-content">
        <SubcriptionCard title="Basic Package" amount="Free" />
        <SubcriptionCard title="Premium Package" amount="$575.00" />
      </div>
    </div>
  );
};

export default Subscripton;
