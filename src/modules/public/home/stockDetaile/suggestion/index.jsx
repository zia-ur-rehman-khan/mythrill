import { Space } from "antd";
import React from "react";
import { AppStyles, Colors, Images } from "../../../../../theme";
import { CommonTextField } from "../../../../../components";
import { css } from "aphrodite";
import "./styles.scss";

const Suggestion = () => {
  const current = [1, 2, 3, 4, 5];

  return (
    <Space
      direction="vertical"
      className={`main-sugest ${css([
        AppStyles.theme3Color,
        AppStyles.padding5,
      ])}`}
    >
      <Space className={css([AppStyles.spaceBetween, AppStyles.w100])}>
        <Space>
          <img src={Images.fire} />
          <CommonTextField
            text={"Current Strong Buy Stock/Crypto"}
            color={Colors.green}
          />
        </Space>
        <Space>
          <CommonTextField text={"More"} />
          <img src={Images.arrow} />
        </Space>
      </Space>
      <Space size={20}>
        {current.map((d) => (
          <Space>
            <img src={Images.netflix} width={"25px"} height={"25px"} />
            <Space size={0} direction="vertical">
              <CommonTextField text={"Tesla"} />
              <CommonTextField
                text={"12.3%"}
                topClass={"small"}
                color={Colors.green}
              />
            </Space>
          </Space>
        ))}
      </Space>
    </Space>
  );
};

export default Suggestion;
