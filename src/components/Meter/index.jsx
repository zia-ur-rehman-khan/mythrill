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
      ? 12.5
      : stock?.overallTrend?.toLowerCase() === ' buy'
      ? 38
      : stock?.overallTrend?.toLowerCase() === ' sell'
      ? 84
      : stock?.overallTrend?.toLowerCase() === ' strong sell'
      ? 114
      : 62;

  const backgroundColor =
    stock?.overallTrend?.toLowerCase() === ' strong buy'
      ? 'rgba(25, 62, 29, 0.7)'
      : stock?.overallTrend?.toLowerCase() === ' buy'
      ? 'rgba(143, 198, 64, 0.3)'
      : stock?.overallTrend?.toLowerCase() === ' sell'
      ? 'rgba(251, 176, 67, 0.3)'
      : stock?.overallTrend?.toLowerCase() === ' strong sell'
      ? 'rgba(235, 33, 39, 0.3)'
      : 'rgba(247, 236, 53, 0.3)';

  const textColor =
    stock?.overallTrend?.toLowerCase() === ' strong buy'
      ? '#3DB54A'
      : stock?.overallTrend?.toLowerCase() === ' buy'
      ? '#8FC640'
      : stock?.overallTrend?.toLowerCase() === ' sell'
      ? '#FBB043'
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
          backgroundColor: '#424244'
        },
        pivot: {
          backgroundColor: '#7665c1'
        }
      }
    ],

    credits: {
      enabled: false
    },

    pane: {
      startAngle: -90,
      endAngle: 89.9,
      background: null,
      center: ['50%', '80%'],
      size: '200%'
    },

    yAxis: {
      min: 0,
      max: 125,
      labels: {
        enabled: false // Disable the axis labels for the Y-axis
      },
      plotBands: [
        {
          from: 0,
          to: 25,
          color: '#3DB54A',
          thickness: 15
        },
        {
          from: 25,
          to: 50,
          color: '#8FC640',
          thickness: 15
        },
        {
          from: 50,
          to: 75,
          color: '#F7EC35',
          thickness: 15
        },
        {
          from: 75,
          to: 100,
          color: '#FBB043',
          thickness: 15
        },
        {
          from: 100,
          to: 125,
          color: '#EB2127',
          thickness: 15
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
