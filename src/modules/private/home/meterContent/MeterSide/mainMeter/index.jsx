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
      ? 550
      : value?.toLowerCase() === ' buy'
      ? 450
      : value?.toLowerCase() === ' sell'
      ? 145
      : value?.toLowerCase() === ' strong sell'
      ? 50
      : value?.toLowerCase() === ' neutral sell'
      ? 250
      : 350;

  //GRADIENT COLOR FOR SLOTS

  // color: {
  //   linearGradient: { x1: 0.1504, x2: 0.8328, y1: 0.1504, y2: 0.8328 },
  //   stops: [
  //     [0.1504, '#F77F3C'],
  //     [0.8328, '#A33D03']
  //   ]
  // },

  console.log(meterValue, 'meterValue');

  const options = {
    tooltip: {
      enabled: false
    },
    chart: {
      type: 'gauge',
      height: 200,
      width: 320
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
      center: ['50%', '90%'],
      size: '160%'
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
          thickness: 65,
          label: {
            text: 'STRONG SELL',
            className: `label strong-sell ${meterValue === 50 && 'active'} `
          }
        },
        {
          from: 105,
          to: 200,
          color: '#8C4213',
          thickness: 65,
          label: {
            text: 'SELL',
            className: `label sell  ${meterValue === 145 && 'active'}`
          }
        },
        {
          from: 205,
          to: 300,
          color: '#F7AF0F',
          thickness: 65,
          label: {
            text: 'NEUTRAL',
            className: `label sell-neutral ${meterValue === 250 && 'active'}`
          }
        },
        {
          from: 305,
          to: 400,
          color: '#897409',
          thickness: 65,
          label: {
            text: 'NEUTRAL',
            className: `label buy-neutral ${meterValue === 350 && 'active'}`
          }
        },
        {
          from: 405,
          to: 500,
          color: '#5E7410',
          thickness: 65,
          label: {
            text: 'STRONG BUY',
            className: `label strong-buy  ${meterValue === 550 && 'active'}`
          }
        },
        {
          from: 505,
          to: 600,
          color: '#2E6D14',
          thickness: 65,
          label: {
            text: 'BUY',
            className: `label buy ${meterValue === 450 && 'active'}`
          }
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
