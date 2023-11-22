import React, { Component, useEffect, useRef } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import moment from 'moment';
import './styles.scss';
import { css } from 'aphrodite';
import { AppStyles } from '../../../theme';
import { startFilter } from '../../../constants';

const SmallChart = ({ color, data, filter }) => {
  const options = { style: 'currency', currency: 'USD' };
  const numberFormat = new Intl.NumberFormat('en-US', options);
  const chartRef = useRef(null);

  const end = Date.now();

  const filteredData = data?.filter(
    (t) =>
      moment(t.date).valueOf() >= startFilter(filter) &&
      moment(t.date).valueOf() <= end
  );

  if (filteredData?.length > 0) {
    data = filteredData;
  }

  //   const test = [
  //     {
  //       x: new Date("2023-06-06T06:29:00"),
  //       y: 200000,
  //     },
  //     {
  //       x: new Date("2023-06-06T07:29:00"),
  //       y: 300000,
  //     },
  //     {
  //       x: new Date("2023-06-06T08:29:00"),
  //       y: 500000,
  //     },
  //     {
  //       x: new Date("2023-06-06T09:29:00"),
  //       y: 200000,
  //     },
  //     {
  //       x: new Date("2023-06-06T10:29:00"),
  //       y: 700000,
  //     },
  //     {
  //       x: new Date("2023-06-06T11:29:00"),
  //       y: 500000,
  //     },
  //     {
  //       x: new Date("2023-06-06T12:29:00"),
  //       y: 300000,
  //     },
  //     {
  //       x: new Date("2023-06-06T13:29:00"),
  //       y: 500000,
  //     },
  //     {
  //       x: new Date("2023-06-06T14:29:00"),
  //       y: 200000,
  //     },
  //     {
  //       x: new Date("2023-06-06T15:29:00"),
  //       y: 700000,
  //     },
  //     {
  //       x: new Date("2023-06-06T16:29:00"),
  //       y: 200000,
  //     },
  //     {
  //       x: new Date("2023-06-06T17:29:00"),
  //       y: 500000,
  //     },
  //     {
  //       x: new Date("2023-06-06T18:29:00"),
  //       y: 200000,
  //     },
  //     {
  //       x: new Date("2023-06-06T19:29:00"),
  //       y: 700000,
  //     },
  //     {
  //       x: new Date("2023-06-06T20:29:00"),
  //       y: 200000,
  //     },
  //     {
  //       x: new Date("2023-06-06T21:29:00"),
  //       y: 300000,
  //     },
  //     {
  //       x: new Date("2023-06-06T22:29:00"),
  //       y: 500000,
  //     },
  //     {
  //       x: new Date("2023-06-06T23:29:00"),
  //       y: 9554.84,
  //     },
  //   ];

  //   console.log(test, "test");

  const configPrice = {
    yAxis: [
      {
        opposite: false,
        // offset: 20,

        labels: {
          //   formatter: function () {
          //     const number = this.value;
          //     if (number >= 1000) {
          //       // Convert to "k" form
          //       return number / 1000 + "k";
          //     }
          //     return number;
          //   },
          //   x: -15,
          // y: -50,
          style: {
            color: '#fff',
            // position: "absolute",
            fontSize: '10px'
          }
          //   align: "right",
        }
      }
    ],
    tooltip: {
      shared: true,
      formatter: function () {
        return (
          numberFormat.format(this.y, 0) +
          '</b><br/>' +
          moment(this.x).format('MMMM Do YYYY, h:mm A')
        );
      }
    },
    plotOptions: {
      series: {
        showInNavigator: true,
        gapSize: 0
      }
    },

    chart: {
      height: 300
    },

    credits: {
      enabled: false
    },

    legend: {
      enabled: true
    },
    xAxis: {
      minTickInterval: 1,
      minRange: 1,

      type: 'datetime',
      labels: {
        formatter: function () {
          return moment(this.value).format('DD MMM');
        },
        style: {
          color: '#fff',
          position: 'absolute',
          fontSize: '10px'
        }
      },
      //   dateFormat: "%Y-%m-%d %H:%M:%S",

      dateGroupingInterval: 1
    },
    rangeSelector: {
      enabled: false
    },
    series: [
      {
        name: 'Price',
        type: 'areaspline',
        color: color, // Specify your desired color here
        turboThreshold: data.length,

        data: data,

        tooltip: {
          valueDecimals: 2
        }
      }
    ],

    navigator: {
      enabled: false
    }
  };

  // useEffect(() => {
  //   const chart = chartRef?.current?.chart;

  //   const end = Date.now();
  //   const start = end - 15 * 60 * 1000;

  //   chart?.xAxis[0].setExtremes(start, end);
  // }, [filter]);

  return (
    <div className={`smallChart`}>
      <HighchartsReact
        constructorType={'stockChart'}
        highcharts={Highcharts}
        options={configPrice}
        ref={chartRef}
      />
    </div>
  );
};

export default SmallChart;
