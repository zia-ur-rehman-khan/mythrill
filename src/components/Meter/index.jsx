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
import { Colors, Images } from '../../theme';
import { Grid } from 'antd';
const { useBreakpoint } = Grid;

function GraphRender({ stock }) {
  const screens = useBreakpoint();

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

  // const backgroundColor =
  //   stock?.overallTrend.toLowerCase() === ' strong buy'
  //     ? '#8FC64033'
  //     : stock?.overallTrend.toLowerCase() === ' buy'
  //     ? '#EECB3933'
  //     : stock?.overallTrend.toLowerCase() === ' sell'
  //     ? '#F77F3C33'
  //     : stock?.overallTrend.toLowerCase() === ' strong sell'
  //     ? '#EB212733'
  //     : stock?.overallTrend.toLowerCase() === ' neutral sell'
  //     ? '#FFCF6533'
  //     : '#89740933';

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
      type: 'gauge',
      
      // height:  260,
      // width:  420,
      height:  200,
      width:  380,
      
    },
    title: {
      text: null
      // style: {
      //   color: stock?.color // Specify your desired color here
      // }
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
      center: ['50%', '90%'],

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
          color: meterValue === 50 ? '#8C1912' : '#8C191266',
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
          color: meterValue === 145 ? '#8C4213' : '#8C421366',
          thickness: 65,

          label: {
            text: 'SELL',
            className: `label sell  ${meterValue === 145 && 'active'}`
          }
        },
        {
          from: 205,
          to: 300,
          color: meterValue === 250 ? '#F7AF0F' : '#F7AF0F66',
          thickness: 65,
          label: {
            text: 'NEUTRAL',
            className: `label sell-neutral ${meterValue === 250 && 'active'}`
          }
        },
        {
          from: 305,
          to: 400,
          color: meterValue === 350 ? '#897409' : '#89740966',
          thickness: 65,
          label: {
            text: 'NEUTRAL',
            className: `label buy-neutral ${meterValue === 350 && 'active'}`
          }
        },
        {
          from: 405,
          to: 500,
          color: meterValue === 450 ? '#5E7410' : '#5E741066',
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
          color: meterValue === 550 ? '#2E6D14' : '#2E6D1466',
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
    <div
      className="meter"
      // style={{
      //   backgroundColor: '#121212'
      // }}
    >

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
          text={stock?.title}
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

export default GraphRender;
