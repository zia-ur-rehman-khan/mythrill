import React, { useEffect, useMemo, useState } from "react";
import "./styles.scss";
import { Button, Input, Space, Switch, Tabs } from "antd";
import { CommonButton, CommonHeading, StockCard } from "../../../components";
import Typography from "antd/es/typography/Typography";
import CommonTextField from "../../../components/common/TextField";
import Market from "./market";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Stock from "./stock";
import StockDetailes from "./stockDetaile";
import Trending from "./trending";
import { HOME_ROUTE, TRENDING_ROUTE } from "../../../constants";

const Home = () => {
  const { id } = useParams();
  const location = useLocation();
  const [content, setContent] = useState(null);
  const { pathname } = location;

  useEffect(() => {
    setContent(getContentByPathname(pathname, id));
  }, [id, pathname]);

  const getContentByPathname = useMemo(() => {
    return (pathname, id) => {
      if (pathname.startsWith("/stock/")) {
        return <StockDetailes id={id} />;
      } else if (pathname === HOME_ROUTE) {
        return <Stock id={id} />;
      } else if (pathname === TRENDING_ROUTE) {
        return <Trending id={id} />;
      }
    };
  });

  return (
    <section className="main-home">
      <div className="left-side">
        <Market />
      </div>
      <div className="right-side">{content}</div>
    </section>
  );
};

export default Home;
