import React, { Component } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import priceData from "../../../assets/json/btcdata.json";
import moment from "moment";
import "./styles.scss";
import { css } from "aphrodite";
import { AppStyles } from "../../../theme";

const SmallChart = ({ color }) => {
  const options = { style: "currency", currency: "USD" };
  const numberFormat = new Intl.NumberFormat("en-US", options);
  const configPrice = {
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
          // y: -50,
          style: {
            color: "#fff",
            // position: "absolute",
            fontSize: "10px",
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

    chart: {
      height: 300,
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
        style: {
          color: "#fff",
          position: "absolute",
          fontSize: "10px",
        },
      },
    },
    rangeSelector: {
      enabled: false,
    },
    series: [
      {
        name: "Price",
        type: "areaspline",
        color: color, // Specify your desired color here

        data: [2, 3, 5, 2, 7, 2, 7, 3, 5, 2, 7, 2],

        tooltip: {
          valueDecimals: 2,
        },
      },
    ],

    navigator: {
      enabled: false,
    },
  };

  return (
    <div className={`smallChart`}>
      <HighchartsReact
        constructorType={"stockChart"}
        highcharts={Highcharts}
        options={configPrice}
      />
    </div>
  );
};

export default SmallChart;
