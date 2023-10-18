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
import { CommonTextField } from '../../../../../../components';

function MainMeter({ value }) {
  const meterValue =
    value?.toLowerCase() === ' strong buy'
      ? 50
      : value?.toLowerCase() === ' buy'
      ? 145
      : value?.toLowerCase() === ' sell'
      ? 350
      : value?.toLowerCase() === ' strong sell'
      ? 450
      : 250;

  const options = {
    tooltip: {
      enabled: false
    },
    chart: {
      type: 'gauge',
      height: 160,
      width: 245
    },
    title: {
      text: null
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
      center: ['50%', '95%'],
      size: '180%'
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
    <div className="main-meter">
      <HighchartsReact highcharts={Highcharts} options={options} />
      <CommonTextField
        lineHeight={'30px'}
        text={'M-trend'}
        textAlign={'center'}
        fontWeight={800}
        color={'#ffffff'}
        fontSize={'20px'}
      />
    </div>
  );
}

export default MainMeter;
