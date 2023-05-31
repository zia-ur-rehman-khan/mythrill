import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { stock_List } from "../../../../constants";
import "./styles.scss";
import { Col, Row, Space } from "antd";
import { CommonTextField } from "../../../../components";
import { css } from "aphrodite";
import { Colors } from "../../../../theme";
import { Images } from "../../../../theme";

const Stock = () => {
  const navigate = useNavigate();

  const changeRoute = (id) => {
    navigate(`/stock/${id}`);
  };

  return (
    <Row gutter={[20, 20]}>
      {stock_List.map((d) => (
        <Col
          lg={{ span: 12 }}
          md={{ span: 24 }}
          sm={{ span: 24 }}
          xs={{ span: 24 }}
          key={d.id}
          onClick={() => changeRoute(d.id)}
          className="child"
        >
          <Space className="box" direction="vertical">
            <Space size={10} wrap={true}>
              <Space>
                <CommonTextField text={d.title} fontWeight={600} />
                <img src={Images.upSign} width={"13px"} height={"12px"} />
              </Space>
              <Space>
                <CommonTextField
                  text={"Fear & Greed index:"}
                  fontSize={"8px"}
                  opacity={0.5}
                />
                <CommonTextField
                  text={"57"}
                  color={Colors.green}
                  fontSize={"8px"}
                />
              </Space>
              <Space>
                <CommonTextField
                  text={"Overall Trend:"}
                  fontSize={"8px"}
                  opacity={0.5}
                />
                <CommonTextField
                  text={"UP/BUY"}
                  color={Colors.green}
                  fontSize={"8px"}
                />
              </Space>
            </Space>
            <Space size={10} wrap={true}>
              <img src={d.src} width={"36px"} height={"36px"} />
              <Space size={3} direction="vertical">
                <CommonTextField text={"Last"} opacity={0.5} />
                <CommonTextField text={"$23,568"} opacity={0.5} />
              </Space>
              <Space size={3} direction="vertical">
                <CommonTextField text={"Chg"} />
                <CommonTextField text={"$2,643"} color={Colors.green} />
              </Space>
              <Space size={3} direction="vertical">
                <CommonTextField text={"Chg%"} />
                <CommonTextField text={"+12.6%"} color={Colors.green} />
              </Space>
              <Space>
                <img src={Images.green} width={"21px"} height={"21px"} />
                <img src={Images.yellow} width={"21px"} height={"21px"} />
                <img src={Images.red} width={"21px"} height={"21px"} />
              </Space>
            </Space>
          </Space>
        </Col>
      ))}
    </Row>
  );
};

export default Stock;
