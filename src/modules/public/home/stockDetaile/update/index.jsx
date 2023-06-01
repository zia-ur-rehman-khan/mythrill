import React from "react";
import { AppStyles, Colors, Images } from "../../../../../theme";
import { CommonTextField } from "../../../../../components";
import { Space } from "antd";
import { HOME_ROUTE } from "../../../../../constants";
import { css } from "aphrodite";
import { useNavigate } from "react-router-dom";

const Update = () => {
  const navigate = useNavigate();

  const changeRoute = () => {
    navigate(HOME_ROUTE);
  };

  return (
    <Space size={20} wrap={true}>
      <Space>
        <img
          src={Images.backArrow}
          onClick={changeRoute}
          className={css(AppStyles.pointer)}
        />
        <img src={Images.bitCoin} width={"36px"} height={"36px"} />
      </Space>
      <Space>
        <Space size={3} direction="vertical">
          <CommonTextField text={"Bitcoin"} fontWeight={600} />
          <CommonTextField text={"$23,568"} opacity={0.5} />
        </Space>
        <img src={Images.upSignLarge} width={"24px"} height={"20px"} />
      </Space>
      <Space size={3} direction="vertical">
        <CommonTextField text={"Last"} />
        <CommonTextField text={"$23,568"} opacity={0.5} />
      </Space>
      <Space size={3} direction="vertical">
        <CommonTextField text={"Chg"} />
        <CommonTextField text={"$2,643"} color={Colors.green} />
      </Space>
      <Space size={3} direction="vertical">
        <CommonTextField text={"Chg%"} />
        <CommonTextField text={"+12.6%"} color={Colors.green} />
      </Space>
      <Space size={3} direction="vertical">
        <CommonTextField text={"F&G idx"} />
        <CommonTextField text={"62"} color={Colors.green} />
      </Space>
      {/* <Space>
        <img src={Images.green} width={"21px"} height={"21px"} />
        <img src={Images.yellow} width={"21px"} height={"21px"} />
        <img src={Images.red} width={"21px"} height={"21px"} />
      </Space> */}
    </Space>
  );
};

export default Update;
