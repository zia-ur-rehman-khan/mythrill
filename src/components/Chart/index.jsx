import React, { Component, useMemo, useState } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import priceData from "../../assets/json/btcdata.json";
import moment from "moment";
import "./styles.scss";
import { css } from "aphrodite";
import { AppStyles, Images } from "../../theme";
import { Checkbox, Grid, Radio, Space, Switch } from "antd";
import {
  CommonButton,
  CommonHeading,
  CommonInputField,
  CommonModal,
  CommonTextField,
} from "../common";
import ExtraDetailes from "./extraDetailes";
const { useBreakpoint } = Grid;

const Chart = () => {
  const [chartType, setChartType] = useState("areaspline");

  const screens = useBreakpoint();

  const options = { style: "currency", currency: "USD" };
  const numberFormat = new Intl.NumberFormat("en-US", options);

  const data = [
    {
      x: new Date("2023-06-06T06:29:00"),
      y: 200000,
    },
    {
      x: new Date("2023-06-06T07:29:00"),
      y: 300000,
    },
    {
      x: new Date("2023-06-06T08:29:00"),
      y: 500000,
    },
    {
      x: new Date("2023-06-06T09:29:00"),
      y: 200000,
    },
    {
      x: new Date("2023-06-06T10:29:00"),
      y: 700000,
    },
    {
      x: new Date("2023-06-06T11:29:00"),
      y: 500000,
    },
    {
      x: new Date("2023-06-06T12:29:00"),
      y: 300000,
    },
    {
      x: new Date("2023-06-06T13:29:00"),
      y: 500000,
    },
    {
      x: new Date("2023-06-06T14:29:00"),
      y: 200000,
    },
    {
      x: new Date("2023-06-06T15:29:00"),
      y: 700000,
    },
    {
      x: new Date("2023-06-06T16:29:00"),
      y: 200000,
    },
    {
      x: new Date("2023-06-06T17:29:00"),
      y: 500000,
    },
    {
      x: new Date("2023-06-06T18:29:00"),
      y: 200000,
    },
    {
      x: new Date("2023-06-06T19:29:00"),
      y: 700000,
    },
    {
      x: new Date("2023-06-06T20:29:00"),
      y: 200000,
    },
    {
      x: new Date("2023-06-06T21:29:00"),
      y: 300000,
    },
    {
      x: new Date("2023-06-06T22:29:00"),
      y: 500000,
    },
    {
      x: new Date("2023-06-06T23:29:00"),
      y: 9554.84,
    },
  ];

  const candlestickData = [
    [moment("2022-01-01").valueOf(), 127.52, 135.62, 125.86, 132.05],
    [moment("2022-02-01").valueOf(), 131.39, 147.79, 130.23, 146.36],
    [moment("2022-03-01").valueOf(), 146.05, 153.44, 143.57, 150.52],
    [moment("2022-04-01").valueOf(), 150.51, 157.26, 149.6, 152.69],
    [moment("2022-05-01").valueOf(), 153.87, 158.85, 149.77, 155.47],
  ];

  let configPrice = {
    yAxis: [
      {
        opposite: false,
        // offset: 20,

        labels: {
          formatter: function () {
            const number = this.value;
            if (number >= 1000) {
              // Convert to "k" form
              return number / 1000 + "k";
            }
            return number;
          },
          //   x: -15,
          style: {
            // fontSize: "8px",
            color: "#fff",
            position: "absolute",
          },
          //   align: "right",
        },
      },
    ],
    tooltip: {
      shared: true,
      formatter: function () {
        return (
          numberFormat.format(this.y, 0) +
          "</b><br/>" +
          moment(this.x).format("MMMM Do YYYY, h:mm")
        );
      },
    },
    plotOptions: {
      series: {
        showInNavigator: true,
        gapSize: 0,
      },
    },
    rangeSelector: {
      selected: 1,
    },

    chart: {
      height: 500,
      type: chartType,
    },

    credits: {
      enabled: false,
    },

    legend: {
      enabled: true,
    },
    xAxis: {
      type: "date",
      labels: {
        // formatter: function () {
        //   return moment(this.value).format("DD MMM");
        // },
        style: {
          // fontSize: "8px",
          color: "#fff",
          position: "absolute",
        },
      },
      dateFormat: "%Y-%m-%d %H:%M",
      dateGroupingInterval: 1,
    },
    rangeSelector: {
      buttonTheme: {
        width: 25, // Change the width of the rangeSelector buttons
      },
      selected: 5,

      buttons: [
        {
          type: "day",
          count: 1,
          text: "1D",
        },
        {
          type: "day",
          count: 7,
          text: "7D",
        },
        {
          type: "month",
          count: 1,
          text: "1M",
        },
        {
          type: "month",
          count: 3,
          text: "3M",
        },
        {
          type: "year",
          count: 1,
          text: "1Y",
        },
        {
          type: "ytd",
          text: "YTD",
        },

        {
          type: "all",
          text: "ALL",
        },
      ],
    },
    series: [
      {
        name: "Price",
        type: chartType,
        color: "#1ABF17",
        upColor: "#1ABF17",

        data: chartType === "areaspline" ? data : candlestickData,
        tooltip: {
          valueDecimals: 2,
        },
      },
    ],

    navigator: {
      maskFill: "rgba(118, 101, 193, 0.2)", // Specify the desired color for the Navigator wrapper
      series: {
        type: chartType,
      },
      xAxis: {
        labels: {
          formatter: function () {
            return moment(this.value).format("DD MMM");
          },
          style: {
            color: "#fff", // Customize the color of the Navigator date text
            opacity: "1",
          },
        },
      },
    },
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            chart: {
              height: 400,
            },
          },
        },
      ],
    },
  };

  const chartChange = (type) => {
    setChartType(type);
  };

  const chartComponent = useMemo(
    () => (
      <HighchartsReact
        constructorType={"stockChart"}
        highcharts={Highcharts}
        options={configPrice}
        key={chartType}
      />
    ),
    [chartType]
  );

  return (
    <>
      {!screens.lg && (
        <Space
          className={css(
            AppStyles.w100,
            AppStyles.justifyEnd,
            AppStyles.mTop10
          )}
        >
          <img src={Images.green} width={"30px"} height={"30px"} />
          <img src={Images.yellow} width={"30px"} height={"30px"} />
          <img src={Images.red} width={"30px"} height={"30px"} />
        </Space>
      )}

      <div className={`bigchart ${css(AppStyles.mTop20)}`}>
        <ExtraDetailes chartChange={chartChange} chartType={chartType} />
        {chartType && chartComponent}
      </div>
    </>
  );
};

export default Chart;
