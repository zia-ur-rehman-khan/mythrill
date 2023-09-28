import React, { Component, useEffect, useMemo, useRef, useState } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import moment from 'moment';
import './styles.scss';

import { stocksdataManipulatorObject } from '../../../manipulators/stocksName';
import initializeSocket, { socket } from '../../../socket';
import { useSelector } from 'react-redux';
import { SOCKET_URL } from '../../../config/webService';

const ChartComponent = ({ chartType, data, color }) => {
  const chartRef = useRef(null);
  const userData = useSelector((state) => state?.user?.data);

  const options = { style: 'currency', currency: 'USD' };
  const numberFormat = new Intl.NumberFormat('en-US', options);

  const candlestickData = [
    [moment('2022-01-02').valueOf(), 131.39, 147.79, 130.23, 146.36],
    [moment('2022-01-03').valueOf(), 146.05, 153.44, 143.57, 150.52],
    [moment('2022-01-04').valueOf(), 150.51, 157.26, 149.6, 152.69],
    [moment('2022-01-05').valueOf(), 153.87, 158.85, 149.77, 155.47],
    [moment('2022-01-06').valueOf(), 156.87, 160.85, 152.77, 160.47],
    [moment('2022-01-07').valueOf(), 170.87, 173.85, 162.77, 160.47],
    [moment('2022-01-08').valueOf(), 156.87, 160.85, 152.77, 160.47],
    [moment('2022-01-09').valueOf(), 156.87, 160.85, 152.77, 160.47],
    [moment('2022-01-10').valueOf(), 156.87, 160.85, 152.77, 160.47],
    [moment('2022-01-11').valueOf(), 156.87, 160.85, 152.77, 160.47],
    [moment('2022-01-12').valueOf(), 156.87, 160.85, 152.77, 160.47],
    [moment('2022-01-13').valueOf(), 156.87, 160.85, 152.77, 160.47],
    [moment('2022-01-14').valueOf(), 156.87, 160.85, 152.77, 160.47],
    [moment('2022-01-15').valueOf(), 156.87, 160.85, 152.77, 160.47]
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
              return number / 1000 + 'k';
            }
            return number;
          },
          //   x: -15,
          style: {
            // fontSize: "8px",
            color: '#fff',
            position: 'absolute'
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
      animation: false,
      height: 500,
      type: chartType
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
        // formatter: function () {
        //   return moment(this.value).format("DD MMM");
        // },
        // formatter: function () {
        //   return Highcharts.dateFormat("%HH:%M", this.value);
        // },
        formatter: function () {
          return moment(this.value).format('DD MMM');
        },
        style: {
          // fontSize: "8px",
          color: '#fff',
          position: 'absolute'
        }
      }
      // Display tick at every data point
      // min: Date.UTC(2022, 5, 6, 6, 29), // Specify the minimum date and time value in UTC
      // max: Date.UTC(2023, 5, 6, 23, 29),
      // dateFormat: "%Y-%m-%d %H:%M",
    },
    rangeSelector: {
      // inputEnabled: true, // Disable the input box
      // x: 30,

      selected: 5,

      buttons: [
        {
          type: 'minute',
          count: 5,
          text: '5M'
        },
        {
          type: 'minute',
          count: 15,
          text: '15M'
        },
        {
          type: 'minute',
          count: 30,
          text: '30M'
        },
        {
          type: 'hour',
          count: 1,
          text: '1H'
        },
        {
          type: 'hour',
          count: 4,
          text: '4H'
        },
        {
          type: 'hour',
          count: 8,
          text: '8H'
        },
        {
          type: 'day',
          count: 1,
          text: '1D'
        },
        {
          type: 'day',
          count: 7,
          text: '7D'
        },
        {
          type: 'month',
          count: 1,
          text: '1M'
        },
        {
          type: 'month',
          count: 3,
          text: '3M'
        },
        {
          type: 'year',
          count: 1,
          text: '1Y'
        },
        {
          type: 'ytd',
          text: 'YTD'
        },

        {
          type: 'all',
          text: 'ALL'
        }
      ]
    },
    series: [
      {
        name: 'Prices',
        type: chartType,
        color: color,
        upColor: color,
        data: chartType === 'areaspline' ? data : candlestickData,
        turboThreshold: data.length,
        pointInterval: 86400000,
        pointStart: 1230764400000,
        tooltip: {
          valueDecimals: 2
        },

        enabled: true,
        forced: true,
        groupAll: true,
        units: ['minute', [5]],
        dataGrouping: {
          enabled: true,
          forced: true,
          groupAll: true,
          units: [
            ['minute', [1, 15, 30]],
            ['hour', [1]],
            ['day', [1]]
          ]
        }
      }
    ],

    navigator: {
      maskFill: 'rgba(118, 101, 193, 0.2)', // Specify the desired color for the Navigator wrapper
      series: {
        type: chartType
      },
      xAxis: {
        minTickInterval: 1,
        minRange: 1,
        type: 'datetime',
        labels: {
          // formatter: function () {
          //   return moment(this.value).format("DD MMM");
          // },
          formatter: function () {
            return moment(this.value).format('DD MMM');
          },
          style: {
            color: '#fff', // Customize the color of the Navigator date text
            opacity: '1'
          }
        }
      }
    },
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            rangeSelector: {
              inputEnabled: false, // Disable the input box
              buttonEnabled: false,
              buttonTheme: {
                width: 20
              }
            },
            chart: {
              height: 400
            }
          }
        }
      ]
    }
  };

  useEffect(() => {
    const socket = initializeSocket(
      `wss://${SOCKET_URL}?stocks=${userData?.subscribedStocks || ''}`
    );

    const listener1 = (...args) => {
      const chart = chartRef.current.chart;

      const test = stocksdataManipulatorObject(JSON.parse(args).data);

      chart.series[0].addPoint(
        { x: Date.parse(test.date), y: test.currentPrice },
        true,
        true
      );
      chart.series[0].update({ color: test.color });
    };

    socket.on('stock_updates', listener1);

    return () => {
      socket.off('stock_updates', listener1);
    };
  }, [userData?.subscribedStocks]);

  return (
    <HighchartsReact
      constructorType={'stockChart'}
      highcharts={Highcharts}
      options={configPrice}
      ref={chartRef}
      key={chartType}
    />
  );
};

export default ChartComponent;
