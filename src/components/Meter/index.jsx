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
    stock?.color === 'green' ? 0 : stock?.color === 'yellow' ? 37.5 : 75;

  const options = {
    chart: {
      type: 'gauge'
    },
    title: {
      text: 'BUY',
      style: {
        color: '#1ABF17' // Specify your desired color here
      }
    },

    series: [
      {
        dataLabels: {
          enabled: false // Disable data labels for all series
        },
        data: [meterValue ?? 0]
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
