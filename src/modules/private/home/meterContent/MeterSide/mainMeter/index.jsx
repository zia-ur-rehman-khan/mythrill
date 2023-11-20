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
import { Images } from '../../../../../../theme';
import { Grid, Space } from 'antd';

const { useBreakpoint } = Grid;

function MainMeter({ value, stockName }) {
  const screens = useBreakpoint();

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

  const options = {
    tooltip: {
      enabled: false
    },
    chart: {
      type: 'gauge',
      height: screens.sm ? 230 : 160,
      width: screens.sm ? 380 : 320
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
          borderWidth: 20,
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
      center: screens.sm ? ['50%', '90%'] : ['35%', '90%'],
      size: '160%'
    },

    yAxis: {
      lineWidth: 0,

      min: 0,
      max: 600,
      labels: {
        enabled: false
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
            text: 'STRONG <br/> SELL',
            className: `label strong-sell ${meterValue === 50 && 'active'} `,
            textAlign: 'center'
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
            text: 'STRONG <br/> BUY',
            className: `label strong-buy ${meterValue === 550 && 'active'}`,
            textAlign: 'center'
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
      <div className="meter-title">
        <CommonTextField
          text={'M-RISK INDEX:'}
          fontWeight={700}
          color={'#ffffff'}
          fontSize={'18px'}
        />
        <CommonTextField
          className={'title-text'}
          text={stockName}
          fontWeight={700}
          color={'#ffffff'}
          fontSize={'18px'}
        />
      </div>
      <img
        className="meter-img"
        src={Images.meterLogo}
        width={'20px'}
        height={'22px'}
      />
    </div>
  );
}

export default MainMeter;
