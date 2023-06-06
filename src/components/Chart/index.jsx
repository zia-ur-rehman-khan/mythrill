import React, { Component, useState } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import priceData from "../../assets/json/btcdata.json";
import moment from "moment";
import "./styles.scss";
import { css } from "aphrodite";
import { AppStyles, Images } from "../../theme";
import { Space } from "antd";

const Chart = () => {
  const [chartType, setChartType] = useState("areaspline");
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
          color: "#fff",
          position: "absolute",
        },
      },
      dateFormat: "%Y-%m-%d %H:%M",
      dateGroupingInterval: 1,
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
        type: chartType,
        color: "#1ABF17", // Specify your desired color here

        data: [
          {
            x: new Date("2023-06-06T06:29:00"),
            y: 9792.77,
          },
          {
            x: new Date("2023-06-06T07:29:00"),
            y: 100,
          },
          {
            x: new Date("2023-06-06T08:29:00"),
            y: 9764.57,
          },
          {
            x: new Date("2023-06-06T09:29:00"),
            y: 200,
          },
          {
            x: new Date("2023-06-06T10:29:00"),
            y: 9734.89,
          },
          {
            x: new Date("2023-06-06T11:29:00"),
            y: 2000,
          },
          {
            x: new Date("2023-06-06T12:29:00"),
            y: 9707.19,
          },
          {
            x: new Date("2023-06-06T13:29:00"),
            y: 100,
          },
          {
            x: new Date("2023-06-06T14:29:00"),
            y: 9679.49,
          },
          {
            x: new Date("2023-06-06T15:29:00"),
            y: 9900,
          },
          {
            x: new Date("2023-06-06T16:29:00"),
            y: 9651.79,
          },
          {
            x: new Date("2023-06-06T17:29:00"),
            y: 200,
          },
          {
            x: new Date("2023-06-06T18:29:00"),
            y: 9624.09,
          },
          {
            x: new Date("2023-06-06T19:29:00"),
            y: 9610.24,
          },
          {
            x: new Date("2023-06-06T20:29:00"),
            y: 9596.39,
          },
          {
            x: new Date("2023-06-06T21:29:00"),
            y: 2000,
          },
          {
            x: new Date("2023-06-06T22:29:00"),
            y: 9568.69,
          },
          {
            x: new Date("2023-06-06T23:29:00"),
            y: 9554.84,
          },
        ],
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

  const chartChange = (type) => {
    setChartType(type);
  };

  return (
    <div className={`bigchart ${css(AppStyles.mTop20)}`}>
      <Space size={20} className="extra-detailes">
        <Space>
          <img src={Images.green} width={"30px"} height={"30px"} />
          <img src={Images.yellow} width={"30px"} height={"30px"} />
          <img src={Images.red} width={"30px"} height={"30px"} />
        </Space>
        <Space
          onClick={() => {
            chartChange("areaspline");
          }}
          className={`${css(AppStyles.pointer)} ${
            chartType === "areaspline" && "active"
          }`}
        >
          <svg
            width="21"
            height="8"
            viewBox="0 0 27 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.84585 1.02375C2.69004 0.841994 2.45729 0.746536 2.24593 0.705352C2.02701 0.662692 1.78035 0.667636 1.55123 0.733546C1.32871 0.797559 1.11352 0.923252 0.99549 1.12652C0.93407 1.2323 0.900841 1.35797 0.91491 1.49192C0.928916 1.62528 0.987176 1.74256 1.06871 1.83767L6.54245 8.22311C6.81737 8.54383 7.20967 8.75176 7.62278 8.87316C8.0385 8.99533 8.49874 9.03713 8.93993 9.00755C9.3802 8.97804 9.81825 8.87629 10.1858 8.69702C10.5503 8.51918 10.8769 8.24851 11.0321 7.86531L12.6647 3.83505C12.668 3.83115 12.682 3.81638 12.7208 3.79744C12.778 3.7695 12.8626 3.74683 12.9626 3.74011C13.1871 3.72504 13.3368 3.79364 13.3763 3.83967L15.1483 5.90449C15.4326 6.23573 15.8398 6.44644 16.2667 6.56597C16.6963 6.68626 17.1706 6.72153 17.6213 6.68244C18.0706 6.64346 18.5151 6.52887 18.8796 6.33315C19.2416 6.13877 19.5591 5.84399 19.6768 5.43209L20.5338 2.43305C20.5383 2.42864 20.5478 2.42058 20.5659 2.40999C20.611 2.38357 20.6839 2.35781 20.7775 2.3454C20.9788 2.31872 21.1556 2.36599 21.2328 2.42944L24.8104 5.36969C24.991 5.51815 25.2285 5.59043 25.4475 5.6124C25.6704 5.63476 25.9161 5.60948 26.134 5.5205C26.345 5.43432 26.5495 5.27731 26.6216 5.03613C26.7018 4.76759 26.5829 4.5219 26.3916 4.36471L22.8141 1.42447C22.1746 0.898881 21.1985 0.756954 20.3753 0.866085C19.9566 0.921587 19.5494 1.04498 19.217 1.23961C18.8865 1.43315 18.6011 1.71561 18.4919 2.09759L17.6346 5.09772C17.6296 5.10269 17.6179 5.11264 17.5938 5.12561C17.5407 5.15413 17.4572 5.17936 17.3548 5.18825C17.2537 5.19702 17.1525 5.18821 17.0694 5.16496C16.9837 5.14096 16.941 5.10867 16.9249 5.08993L15.1529 3.02512C14.6124 2.39534 13.6113 2.18387 12.7555 2.24136C12.3153 2.27093 11.8773 2.37271 11.5099 2.55198C11.1455 2.72982 10.819 3.00045 10.6638 3.38356L9.03118 7.41384C9.02788 7.41774 9.01394 7.43252 8.97511 7.45146C8.91782 7.4794 8.83322 7.50207 8.73323 7.50877C8.63415 7.51541 8.5365 7.50523 8.45697 7.48186C8.37481 7.45772 8.33446 7.42654 8.31959 7.40919L2.84585 1.02375ZM17.6376 5.09424C17.6376 5.09424 17.6374 5.09456 17.6369 5.09515L17.6376 5.09424Z"
              fill="#B8C3D6"
              stroke="#B8C3D6"
              stroke-width="0.7"
              stroke-linecap="round"
            />
          </svg>
        </Space>
        <Space
          onClick={() => {
            chartChange("column");
          }}
          className={` ${css(AppStyles.pointer)} ${
            chartType === "column" && "active"
          }`}
        >
          <svg
            width="16"
            height="14"
            viewBox="0 0 21 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M15.0334 0.214069C14.7699 0.394348 14.7079 0.585206 14.7079 1.21624V1.9957H13.7392C12.5949 1.9957 12.0443 2.14269 11.7968 2.51427C11.6782 2.69243 11.6162 3.85283 11.6162 5.89302C11.6162 7.93322 11.6782 9.09362 11.7968 9.27178C12.0443 9.64336 12.5949 9.79035 13.7392 9.79035H14.7079V11.6277C14.7079 13.3165 14.7343 13.483 15.0334 13.6877C15.4444 13.9689 16.1852 13.9735 16.6833 13.6978C17.0549 13.4921 17.0691 13.4245 17.1191 11.6378L17.1708 9.79035H18.2249C19.1271 9.79035 19.3367 9.75093 19.6784 9.51698L20.0779 9.24372V5.89302V2.54233L19.6784 2.26907C19.3372 2.03546 19.1268 1.9957 18.2323 1.9957H17.1856L17.12 1.20288C17.0652 0.538549 16.9933 0.375975 16.6769 0.200707C16.1847 -0.0721056 15.4427 -0.0659814 15.0334 0.214069ZM3.92019 2.24638C3.74607 2.378 3.6429 2.70248 3.61019 3.22072L3.56121 6.031L2.36681 6.08668C0.537115 6.17198 0.550784 6.15049 0.550784 8.93228C0.550784 11.1563 0.557617 11.202 0.937908 11.5045C1.27979 11.7763 1.46107 11.8177 2.4838 11.8573L3.64258 11.9022V14.7291C3.64258 17.4075 3.65966 17.5676 3.96803 17.7786C4.29299 18.001 4.84642 18.0628 5.34388 17.9322C5.99299 17.7617 6.08347 17.3487 6.08347 14.555V11.877H6.87285C7.93285 11.877 8.60344 11.7014 8.82735 11.3651C8.94598 11.1869 9.01254 10.2874 9.01254 8.86013C9.01254 6.64433 9.01058 6.63197 8.61304 6.36005C8.27181 6.12643 8.0614 6.08668 7.1669 6.08668H6.12024L6.05645 3.28196C5.97883 2.34204 5.67584 2.04896 4.78166 2.04896C4.41357 2.04896 4.08015 2.12535 3.92019 2.24638Z"
              fill="#B8C3D6"
            />
          </svg>
        </Space>
      </Space>
      <HighchartsReact
        constructorType={"stockChart"}
        highcharts={Highcharts}
        options={configPrice}
      />
    </div>
  );
};

export default Chart;
