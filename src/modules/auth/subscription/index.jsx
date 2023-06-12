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

const Subscripton = () => {
  return (
    <div className="sub-parent">
      <CommonHeading text={"Our Services Has Friendly Packages"} />
      <CommonTextField
        text={"Choose plans that might better for your!"}
        className={css(AppStyles.mTop10)}
      />
      <div className="sub-content">
        <Space size={30} direction="vertical" className="sub-box">
          <Space className={css(AppStyles.w100, AppStyles.spaceBetween)}>
            <img src={Images.authLogo} width={"50px"} height={"58px"} />
            <CommonHeading text={"Free"} />
          </Space>
          <CommonTextField
            fontWeight={600}
            fontSize={"23px"}
            text={"Basic Package"}
          />
          <ul>
            <li>
              <CommonTextField
                opacity={0.5}
                text={"Lorem ipsum dolor sit amet"}
              />
            </li>
            <li>
              <CommonTextField
                opacity={0.5}
                text={"Lorem ipsum dolor sit amet consectetur adipiscing elit"}
              />
            </li>
            <li>
              <CommonTextField
                opacity={0.5}
                text={"Integer sed felis felis."}
              />
            </li>
            <li>
              <CommonTextField
                opacity={0.5}
                text={"ed efficitur fermentum laoreet"}
              />
            </li>
          </ul>
          <CommonButton text={"Start Now"} />
        </Space>
        <Space size={30} direction="vertical" className="sub-box">
          <Space className={css(AppStyles.w100, AppStyles.spaceBetween)}>
            <img src={Images.authLogo} width={"50px"} height={"58px"} />
            <Space>
              <CommonHeading text={"$575.00"} />
              <CommonTextField text={"/ year"} />
            </Space>
          </Space>
          <CommonTextField
            fontWeight={600}
            fontSize={"23px"}
            text={"Premium Package"}
          />
          <ul>
            <li>
              <CommonTextField
                opacity={0.5}
                text={"Lorem ipsum dolor sit amet"}
              />
            </li>
            <li>
              <CommonTextField
                opacity={0.5}
                text={"Lorem ipsum dolor sit amet consectetur adipiscing elit"}
              />
            </li>
            <li>
              <CommonTextField
                opacity={0.5}
                text={"Integer sed felis felis."}
              />
            </li>
            <li>
              <CommonTextField
                opacity={0.5}
                text={"ed efficitur fermentum laoreet"}
              />
            </li>
          </ul>
          <CommonButton text={"Start Now"} />
        </Space>
      </div>
    </div>
  );
};

export default Subscripton;
