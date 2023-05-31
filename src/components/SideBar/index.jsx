import React, { useState } from "react";
import "./styles.scss";
import { AlignLeftOutlined } from "@ant-design/icons";
import { Images } from "../../theme";
import { Divider, Drawer, List, Space } from "antd";
import CommonTextField from "../common/TextField";
import CommonButton from "../common/CommonButton";
import { MENU_LIST } from "../../constants";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SideBar = ({ isDrawer }) => {
  const navigate = useNavigate();

  const changeRoute = (route) => {
    navigate(route);
  };

  return (
    <>
      <div className={isDrawer ? isDrawer : "main-sideBar"}>
        {!isDrawer && (
          <div className="logo">
            <img src={Images.logo} width={"132px"} />
          </div>
        )}

        <Space size={30} direction="vertical" className="content">
          {MENU_LIST?.map((t, i) => (
            <Space key={i} size={20} onClick={() => changeRoute(t.route)}>
              <img src={t.src} width={"15px"} height={"15px"} />
              <CommonTextField text={t.title} fontWeight={600} />
            </Space>
          ))}
        </Space>

        <Divider />

        <div className="logout">
          <CommonButton text={"Logout"} />
        </div>
      </div>
    </>
  );
};

export default SideBar;
