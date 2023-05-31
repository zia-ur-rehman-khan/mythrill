import React from "react";
import CommonTextField from "../TextField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import "./styles.scss";
import { Space } from "antd";
import { useNavigate } from "react-router-dom";

const StockCard = ({ value }) => {
  const { title, name, amount, stockUpdate, color, id } = value;

  const navigate = useNavigate();

  const changeRoute = (id) => {
    navigate(`/stock/${id}`);
  };

  return (
    <Space className="stockCard-main" onClick={() => changeRoute(id)}>
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
