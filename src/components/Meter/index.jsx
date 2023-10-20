import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import _ from 'lodash';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsAccessibility from 'highcharts/modules/accessibility';
HighchartsExporting(Highcharts);
HighchartsMore(Highcharts);
HighchartsAccessibility(Highcharts);
import './styles.scss';
import { CommonTextField } from '../common';

function GraphRender({ stock }) {
  console.log('🚀 ~ file: index.jsx:13 ~ GraphRender ~ stock:', stock);

  const meterValue =
    stock?.overallTrend?.toLowerCase() === ' strong buy'
      ? 450
      : stock?.overallTrend?.toLowerCase() === ' buy'
      ? 350
      : stock?.overallTrend?.toLowerCase() === ' sell'
      ? 145
      : stock?.overallTrend?.toLowerCase() === ' strong sell'
      ? 50
      : 250;

  const backgroundColor =
    stock?.overallTrend?.toLowerCase() === ' strong buy'
      ? 'rgba(25, 62, 29, 0.7)'
      : stock?.overallTrend?.toLowerCase() === ' buy'
      ? 'rgba(200, 170, 48, 0.3)'
      : stock?.overallTrend?.toLowerCase() === ' sell'
      ? 'rgba(247, 127, 60, 0.3)'
      : stock?.overallTrend?.toLowerCase() === ' strong sell'
      ? 'rgba(235, 33, 39, 0.3)'
      : 'rgba(247, 236, 53, 0.3)';

  const textColor =
    stock?.overallTrend?.toLowerCase() === ' strong buy'
      ? '#3DB54A'
      : stock?.overallTrend?.toLowerCase() === ' buy'
      ? '#DEBC31'
      : stock?.overallTrend?.toLowerCase() === ' sell'
      ? '#E67230'
      : stock?.overallTrend?.toLowerCase() === ' strong sell'
      ? '#EB2127'
      : '#F7EC35';

  const options = {
    tooltip: {
      enabled: false
    },
    chart: {
      type: 'gauge'
    },
    title: {
      text: stock?.overallTrend?.toUpperCase(),
      style: {
        color: textColor // Specify your desired color here
      }
    },

    series: [
      {
        dataLabels: {
          enabled: false
        },
        data: [meterValue ?? 0],
        dial: {
          backgroundColor: '#FEFEFE',
          baseWidth: 5
        },
        pivot: {
          backgroundColor: '#FEFEFE',
          borderWidth: 10,
          borderColor: '#FEFEFE'
        }
      }
    ],

    credits: {
      enabled: false
    },

    pane: {
      startAngle: -90,
      endAngle: 90,
      background: null,
      center: ['50%', '90%'],
      size: '200%'
    },

    yAxis: {
      lineWidth: 0,

      min: 0,
      max: 500,
      labels: {
        enabled: false // Disable the axis labels for the Y-axis
      },
      minorTickLength: 0,
      tickLength: 0,
      plotBands: [
        {
          from: 0,
          to: 100,
          color: {
            linearGradient: { x1: 0.1445, x2: 0.8459, y1: 0.1445, y2: 0.8459 },
            stops: [
              [0.1445, '#D34E4B'],
              [0.8459, '#89100E']
            ]
          },
          thickness: 65
          // label: {
          //   text: 'Strong Buy',
          //   align: 'center',
          //   style: {
          //     color: '#ffffff',
          //     fontSize: '8px'
          //   },
          //   verticalAlign: 'bottom',
          //   y: 10,
          //   x: 20
          // }
        },
        {
          from: 105,
          to: 200,
          color: {
            linearGradient: { x1: 0.1504, x2: 0.8328, y1: 0.1504, y2: 0.8328 },
            stops: [
              [0.1504, '#F77F3C'],
              [0.8328, '#A33D03']
            ]
          },
          thickness: 65
        },
        {
          from: 205,
          to: 300,
          color: {
            linearGradient: { x1: 0, x2: 1, y1: 0, y2: 0 },
            stops: [
              [-0.1818, '#FFCF65'],
              [1, '#9E6D00']
            ]
          },
          thickness: 65
        },
        {
          from: 305,
          to: 400,
          color: {
            linearGradient: { x1: 0.2084, x2: 0.858, y1: 0.2084, y2: 0.858 },
            stops: [
              [0.2084, '#EECB39'],
              [0.858, '#6F5900']
            ]
          },
          thickness: 65
        },
        {
          from: 405,
          to: 500,
          color: {
            linearGradient: { x1: 0.1763, x2: 0.8741, y1: 0.1763, y2: 0.8741 },
            stops: [
              [0.1763, '#71DF3E'],
              [0.8741, '#2A7707']
            ]
          },
          thickness: 65
        }
      ]
    }
  };
  return (
    <div
      className="meter"
      style={{
        backgroundColor: backgroundColor
      }}
    >
      <HighchartsReact highcharts={Highcharts} options={options} />
      <CommonTextField
        lineHeight={'30px'}
        text={'M-trend'}
        textAlign={'center'}
        fontWeight={800}
      />
    </div>
  );
}

export default GraphRender;
