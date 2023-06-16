import React from "react";
import { css } from "aphrodite";
import { AppStyles, Images } from "../../../theme";
import { CommonPopOver, CommonTextField } from "../../common";
import { Divider, Space } from "antd";
import "./styles.scss";

const NotificationContent = ({ mobile }) => {
  const { bitCoin, netflix } = Images;
  const title = (
    <Space className={css(AppStyles.w100, AppStyles.spaceBetween)}>
      <CommonTextField
        text={"Notifications"}
        fontWeight={600}
        fontSize={"15px"}
      />
      <CommonTextField
        onClick={() => {}}
        text={"Mark all as read"}
        topClass={"small"}
        textDecoration="underline"
      />
    </Space>
  );

  const array = [netflix, bitCoin, netflix, bitCoin, netflix, bitCoin, netflix];

  const content = array.map((t, index) => (
    <div className={`main ${t < index + 1 === 3 && "hide"}`}>
      <div className={`notification-content }`}>
        <Space
          align="start"
          className={css(AppStyles.w100, AppStyles.spaceBetween)}
        >
          <Space align="start">
            <img src={t} />
            <Space size={2} direction="vertical">
              <CommonTextField text={"Bessie Cooper"} fontWeight={600} />
              <CommonTextField
                text={"Enrichment will be created"}
                topClass={"small"}
              />
            </Space>
          </Space>
          <CommonTextField text={"2 hr ago"} color={"#93969E"} />
        </Space>
      </div>
      <Divider className="border-line" />
    </div>
  ));

  return (
    <CommonPopOver
      placement={mobile ? "leftBottom" : ""}
      content={content}
      title={title}
      trigger="click"
    >
      <img
        src={Images.notification}
        width={"20px"}
        height={"22px"}
        className={css(AppStyles.pointer)}
      />
    </CommonPopOver>
  );
};

export default NotificationContent;
