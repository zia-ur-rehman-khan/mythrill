import React from "react";
import Header from "../Header";
import SideBar from "../SideBar";
import "./styles.scss";
import { Col, Input, Row, Space } from "antd";
import CommonTextField from "../common/TextField";
import CommonHeading from "../common/CommonHeading";
import CommonButton from "../common/CommonButton";
import CommonInputField from "../common/CommonInput";
import { useNavigate } from "react-router-dom";
import { TRENDING_ROUTE } from "../../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { css } from "aphrodite";
import { AppStyles } from "../../theme";

const Layout = ({ children }) => {
  return (
    <div className="main-layout">
      <SideBar />
      <div className="content">
        <Header />
        <div className="child-content">
          <div className="top-section">
            <CommonTextField text={"Good Morning"} fontSize={"12px"} />

            <Row gutter={[20, 10]}>
              <Col
                lg={{ span: 8 }}
                md={{ span: 8 }}
                sm={{ span: 12 }}
                xs={{ span: 24 }}
              >
                <Space size={0} direction="vertical">
                  <CommonHeading text={"Welcome Back Andy!"} />
                </Space>
              </Col>
              <Col
                lg={{ span: 10 }}
                md={{ span: 10 }}
                sm={{ span: 12 }}
                xs={{ span: 24 }}
              >
                <CommonInputField
                  placeholder="Search..."
                  suffix={
                    <FontAwesomeIcon
                      className={css(AppStyles.cursorPointer)}
                      icon={faSearch}
                    />
                  }
                />
              </Col>
              <Col
                lg={{ span: 6 }}
                md={{ span: 6 }}
                sm={{ span: 12 }}
                xs={{ span: 24 }}
              >
                <CommonButton text={"Trending Stock"} />
              </Col>
            </Row>
          </div>
          <div className="child-layout">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
