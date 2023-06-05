import React, { useState } from "react";
import "./styles.scss";
import { AlignLeftOutlined } from "@ant-design/icons";
import { AppStyles, Images } from "../../theme";
import { Divider, Drawer, List, Space } from "antd";
import CommonTextField from "../common/TextField";
import CommonButton from "../common/CommonButton";
import { MENU_LIST } from "../../constants";
import { useLocation, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { css } from "aphrodite";

const SideBar = ({ isDrawer }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const changeRoute = (route) => {
    navigate(route);
  };

  return (
    <>
      <div className={isDrawer ? isDrawer : "main-sideBar"}>
        {!isDrawer && (
          <div className="logo">
            <img
              src={Images.logo}
              width={"132px"}
              className={css(AppStyles.pointer)}
              onClick={() => changeRoute("/")}
            />
          </div>
        )}
        <Space className="sidebar-routes" direction="vertical">
          <Space direction="vertical" className="content">
            {MENU_LIST?.map((t, i) => (
              <div
                className={`content-list ${
                  location.pathname === t.route ? "active" : ""
                }`}
                key={i}
                size={20}
                onClick={() => changeRoute(t.route)}
              >
                <img src={t.src} width={"15px"} height={"15px"} />
                <CommonTextField text={t.title} />
              </div>
            ))}
            <Divider className="line" />
          </Space>

          <div className="logout">
            <CommonButton text={"Logout"} />
          </div>
        </Space>
      </div>
    </>
  );
};

export default SideBar;
