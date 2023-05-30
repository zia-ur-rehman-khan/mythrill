import React from "react";
import CommonTextField from "../TextField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import "./styles.scss";
import { Space } from "antd";

const StockCard = ({ value }) => {
  const { title, name, amount, stockUpdate, color } = value;
  return (
    <Space className="stockCard-main">
      <Space direction="vertical">
        <CommonTextField text={title} fontWeight={600} />
        <CommonTextField text={name} color={"#626D7D"} />
      </Space>
      <Space size={10}>
        <Space direction="vertical">
          <CommonTextField text={amount} fontWeight={600} />
          <div className={`color-text ${color}`}>
            <CommonTextField text={stockUpdate} topClass={"small"} />
          </div>
        </Space>
        <FontAwesomeIcon icon={faEllipsisVertical} />
      </Space>
    </Space>
  );
};

export default StockCard;
