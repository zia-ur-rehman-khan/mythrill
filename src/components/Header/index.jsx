import React, { useState } from "react";
import "./styles.scss";
import CommonTextField from "../common/TextField";
import { faBars, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

import { Space } from "antd";
import { Drawer } from "antd";

import { AppStyles, Images } from "../../theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { css } from "aphrodite";
import SideBar from "../SideBar";
import { CommonDropdown } from "../common";

const Header = () => {
  const [isMobile, setIsMobile] = useState(false);

  const items = [
    {
      label: "profile setting",
      key: "0",
    },
    {
      label: "sign out",
      key: "1",
    },
  ];

  return (
    <header className="main-header">
      <div className="mobile">
        <FontAwesomeIcon icon={faBars} onClick={() => setIsMobile(true)} />

        <div className="logo">
          <img src={Images.logo} width={"132px"} />
        </div>
      </div>
      <Space size={20} className="right-side">
        <img src={Images.notification} width={"20px"} height={"22px"} />
        <Space className="profile" align="center" size={20}>
          <img src={Images.profile} width={"33.75px"} height={"33.75px"} />
          <Space direction="vertical" align="baseline">
            <CommonTextField
              text={"Andy Warhol"}
              fontSize={"10.5px"}
              lineHeight={"10px"}
              className={`${css(AppStyles.weight7)}`}
            />
            <CommonTextField
              text={"andywarhol@mail.com"}
              fontSize={"9px"}
              lineHeight={"10px"}
            />
          </Space>

          <CommonDropdown items={items}>
            <FontAwesomeIcon
              className={css(AppStyles.pointer)}
              icon={faEllipsisVertical}
            />
          </CommonDropdown>
        </Space>
      </Space>

      <Drawer
        title={
          <div className="logo">
            <img src={Images.logo} width={"132px"} />
          </div>
        }
        placement="left"
        onClose={() => setIsMobile(false)}
        open={isMobile}
        width="50%"
        className="side-drawer"
      >
        <SideBar isDrawer={"drawer"} />
      </Drawer>
    </header>
  );
};

export default Header;
