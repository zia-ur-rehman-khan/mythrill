import React, { useState } from "react";

import { Button, Input, Space, Switch, Tabs } from "antd";
import CommonTextField from "../../../../components/common/TextField";
import StockListing from "./stockListing";
import {
  CommonButton,
  CommonModal,
  CommonInputField,
  CommonHeading,
} from "../../../../components";
import { css } from "aphrodite";
import { AppStyles } from "../../../../theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

const Market = ({ width }) => {
  const [isModal, setIsModal] = useState(false);

  const items = [
    {
      key: "1",
      label: `All`,
      children: <StockListing />,
    },
    {
      key: "2",
      label: `Stocks`,
      children: <StockListing test="Stock" />,
    },
    {
      key: "3",
      label: `Crypto`,
      children: <StockListing test="Cryptocurrency" />,
    },
    {
      key: "4",
      label: `Favorites`,
      children: <StockListing />,
    },
  ];

  const onChange = (key) => {
    console.log(key);
  };

  return (
    <>
      <CommonTextField text={"Market"} />
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      <CommonButton
        text={"Add Stock"}
        background="rgba(118, 101, 193, 0.1)"
        onClick={() => setIsModal(true)}
      />
      <CommonModal
        width={width}
        title={
          <CommonHeading
            text={"Add Stock"}
            textAlign="center"
            className={css(AppStyles.mBottom10)}
          />
        }
        isModalVisible={isModal}
        setIsModalVisible={setIsModal}
      >
        <CommonInputField
          placeholder="Search..."
          suffix={<FontAwesomeIcon icon={faSearch} />}
        />
        <div className={css(AppStyles.padding10)}>
          <StockListing addIcon={true} />
        </div>
      </CommonModal>
    </>
  );
};

export default Market;
