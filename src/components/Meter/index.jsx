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

function GraphRender({ stock }) {
  console.log('🚀 ~ file: index.jsx:13 ~ GraphRender ~ stock:', stock);

  const meterValue =
    stock?.overallTrend?.toLowerCase() === ' strong buy'
      ? 0
      : stock?.overallTrend?.toLowerCase() === ' buy'
      ? 25
      : stock?.overallTrend?.toLowerCase() === ' sell'
      ? 50
      : stock?.overallTrend?.toLowerCase() === ' strong sell'
      ? 75
      : 37.5;

  const meterColor =
    stock?.overallTrend?.toLowerCase() === ' strong buy'
      ? '#3DB54A'
      : stock?.overallTrend?.toLowerCase() === ' buy'
      ? '#3DB54A'
      : stock?.overallTrend?.toLowerCase() === ' sell'
      ? '#EB2127'
      : stock?.overallTrend?.toLowerCase() === ' strong sell'
      ? '#EB2127'
      : '#F7EC35';

  const options = {
    chart: {
      type: 'gauge'
    },
    title: {
      text: stock?.overallTrend?.toUpperCase(),
      style: {
        color: meterColor // Specify your desired color here
      }
    },

    series: [
      {
        dataLabels: {
          enabled: false // Disable data labels for all series
        },
        data: [meterValue ?? 0],
        dial: {
          backgroundColor: 'white'
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
      max: 75,
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
          color: '#F7EC35',
          thickness: 15
        },
        // {
        //   from: 50,
        //   to: 75,
        //   color: '#F7EC35',
        //   thickness: 15
        // },
        {
          from: 50,
          to: 75,
          color: '#EB2127',
          thickness: 15
        }
      ]
    }
  };
  return (
    <div className="meter">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}

export default GraphRender;
