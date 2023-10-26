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
    stock?.overallTrend.toLowerCase() === ' strong buy'
      ? 550
      : stock?.overallTrend.toLowerCase() === ' buy'
      ? 450
      : stock?.overallTrend.toLowerCase() === ' sell'
      ? 145
      : stock?.overallTrend.toLowerCase() === ' strong sell'
      ? 50
      : stock?.overallTrend.toLowerCase() === ' neutral sell'
      ? 250
      : 350;

  const backgroundColor =
    stock?.overallTrend.toLowerCase() === ' strong buy'
      ? '#8FC64033'
      : stock?.overallTrend.toLowerCase() === ' buy'
      ? '#EECB3933'
      : stock?.overallTrend.toLowerCase() === ' sell'
      ? '#F77F3C33'
      : stock?.overallTrend.toLowerCase() === ' strong sell'
      ? '#EB212733'
      : stock?.overallTrend.toLowerCase() === ' neutral sell'
      ? '#FFCF6533'
      : '#89740933';

  // const textColor =
  //   stock?.overallTrend?.toLowerCase() === ' strong buy'
  //     ? '#3DB54A'
  //     : stock?.overallTrend?.toLowerCase() === ' buy'
  //     ? '#DEBC31'
  //     : stock?.overallTrend?.toLowerCase() === ' sell'
  //     ? '#E67230'
  //     : stock?.overallTrend?.toLowerCase() === ' strong sell'
  //     ? '#EB2127'
  //     : '#F7EC35';

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
        color: stock?.color // Specify your desired color here
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
      max: 600,
      labels: {
        enabled: false // Disable the axis labels for the Y-axis
      },
      minorTickLength: 0,
      tickLength: 0,
      plotBands: [
        {
          from: 0,
          to: 100,
          color: '#8C1912',
          thickness: 65
        },
        {
          from: 105,
          to: 200,
          color: '#8C4213',
          thickness: 65
        },
        {
          from: 205,
          to: 300,
          color: '#F7AF0F',
          thickness: 65
        },
        {
          from: 305,
          to: 400,
          color: '#897409',
          thickness: 65
        },
        {
          from: 405,
          to: 500,
          color: '#5E7410',
          thickness: 65
        },
        {
          from: 505,
          to: 600,
          color: '#2E6D14',
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
