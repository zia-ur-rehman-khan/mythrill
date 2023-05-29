import React from "react";
import "./styles.scss";
import CommonTextField from "../common/TextField";
import { Space } from "antd";
import { Images } from "../../theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
  return (
    <header className="main-header">
      <Space className="profile" align="center">
        <img src={Images.profile} width={"33.75px"} height={"33.75px"} />
        <Space direction="vertical" align="baseline">
          <CommonTextField
            text={"Andy Warhol"}
            fontWeight={700}
            fontSize={"10.5px"}
            lineHeight={"10px"}
          />
          <CommonTextField
            text={"andywarhol@mail.com"}
            className={"small"}
            fontSize={"9px"}
            lineHeight={"10px"}
          />
        </Space>
      </Space>
    </header>
  );
};

export default Header;
