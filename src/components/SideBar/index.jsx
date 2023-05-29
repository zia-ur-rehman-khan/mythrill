import React, { useState } from "react";
import "./styles.scss";
import { AlignLeftOutlined } from "@ant-design/icons";
import { Images } from "../../theme";
import { Divider, Drawer, List, Space } from "antd";
import CommonTextField from "../common/TextField";
import CommonButton from "../common/CommonButton";
import { MENU_LIST } from "../../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SideBar = () => {
  const [isMobile, setIsMobile] = useState(false);

  const navList = [
    { name: "Home", url: "/" },
    { name: "About", url: "/about" },
    { name: "Shop", url: "/shop" },
    { name: "Event", url: "/event" },
    { name: "Academy", url: "/academy" },
    { name: "School", url: "/school" },
  ];

  return (
    <>
      <div className="main-sideBar">
        <div className="logo">
          <img src={Images.logo} width={"132px"} />
        </div>

        <Space size={30} direction="vertical" className="content">
          {MENU_LIST?.map((t, i) => (
            <Space key={i} size={20}>
              <img src={t.url} width={"15px"} height={"15px"} />
              <CommonTextField
                text={t.title}
                fontWeight={600}
                fontSize={"10.5px"}
              />
            </Space>
          ))}
        </Space>

        <Divider />

        <div className="logout">
          <CommonButton text={"Logout"} />
        </div>
      </div>
      {/* <div className="mobile">
        <CommonTextField text={"dasds"} color={"white"} />
      </div> */}

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
        <List
          dataSource={navList}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={
                  <a href={item.url}>
                    <CommonTextField
                      className={isActive(item.url) ? "primary" : ""}
                      text={item.name}
                    />
                  </a>
                }
              />
            </List.Item>
          )}
        />
      </Drawer>
    </>
  );
};

export default SideBar;
