import React, { Component } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import priceData from "../../assets/json/btcdata.json";
import moment from "moment";
import "./styles.scss";
import { css } from "aphrodite";
import { AppStyles } from "../../theme";

const Chart = () => {
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
          style: {
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
        },
      },
    },
    rangeSelector: {
      buttons: [
        {
          type: "day",
          count: 1,
          text: "1d",
        },
        {
          type: "day",
          count: 7,
          text: "7d",
        },
        {
          type: "month",
          count: 1,
          text: "1m",
        },
        {
          type: "month",
          count: 3,
          text: "3m",
        },
        {
          type: "all",
          text: "All",
        },
      ],
      selected: 4,
    },
    series: [
      {
        name: "Price",
        type: "area",
        color: "#1ABF17", // Specify your desired color here

        data: priceData,
        tooltip: {
          valueDecimals: 2,
        },
      },
    ],

    navigator: {
      maskFill: "rgba(118, 101, 193, 0.2)", // Specify the desired color for the Navigator wrapper
      series: {
        type: "area",
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
    // responsive: {
    //   rules: [
    //     {
    //       condition: {
    //         maxWidth: 500,
    //       },
    //       chartOptions: {
    //         chart: {
    //           height: 300,
    //         },
    //         subtitle: {
    //           text: null,
    //         },
    //         navigator: {
    //           enabled: false,
    //         },
    //       },
    //     },
    //   ],
    // },
  };

  return (
    <div className={`bigchart ${css(AppStyles.mTop20)}`}>
      <HighchartsReact
        constructorType={"stockChart"}
        highcharts={Highcharts}
        options={configPrice}
      />
    </div>
  );
};

export default Chart;
