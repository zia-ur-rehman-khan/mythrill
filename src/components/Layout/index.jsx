import React from "react";
import Header from "../Header";
import SideBar from "../SideBar";
import "./styles.scss";
import { Col, Input, Row, Space } from "antd";
import CommonTextField from "../common/TextField";
import CommonHeading from "../common/CommonHeading";
import CommonButton from "../common/CommonButton";
import CommonInputField from "../common/CommonInput";

const Layout = ({ children }) => {
  return (
    <div className="main-layout">
      <SideBar />
      <div className="content">
        <Header />
        <div className="child-content">
          <CommonTextField text={"Good Morning"} fontSize={"12px"} />

          <Row gutter={[20, 20]}>
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
              <CommonInputField placeholder="search..." />
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
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
