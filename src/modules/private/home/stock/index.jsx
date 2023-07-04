import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './styles.scss';
import { Col, Row, Space } from 'antd';
import {
  CommonHeading,
  CommonTextField,
  SmallChart
} from '../../../../components';
import { css } from 'aphrodite';
import { AppStyles, Colors } from '../../../../theme';
import { Images } from '../../../../theme';
import { useSelector } from 'react-redux';
import moment from 'moment';
import {
  forGreen,
  forRed,
  forYellow,
  signalClass
} from '../../../../constants';

const Stock = () => {
  const navigate = useNavigate();
  const stocksData = useSelector((state) => state?.stocks?.stocksData);
  // console.log('🚀 ~ file: index.jsx:25 ~ Stock ~ stocksData:', stocksData);
  const stocksList = useSelector((state) => state?.stocks?.stocksSubscribe);

  const changeRoute = (id) => {
    navigate(`stock/${id}`);
  };

  return (
    <Row gutter={[20, 20]}>
      {stocksList?.length > 0 &&
        stocksList?.map((stock) => {
          const stockDetailData = stocksData[stock?.nameId]?.data;

          const data = stockDetailData?.map((item) => ({
            x: Date.parse(item?.date),
            y: item?.currentPrice
          }));

          return (
            <Col
              lg={{ span: 12 }}
              md={{ span: 24 }}
              sm={{ span: 24 }}
              xs={{ span: 24 }}
              key={stock?.slug}
              onClick={() => changeRoute(stock?.nameId)}
              className="child"
            >
              <Space className="box" direction="vertical">
                {data?.length > 0 && (
                  <SmallChart color={stock?.color} data={data} />
                )}
                <Space
                  direction="vertical"
                  className={css(AppStyles.padding10)}
                >
                  <Space size={10} wrap={true}>
                    <Space>
                      <CommonTextField text={stock?.title} fontWeight={600} />
                      <img src={Images.upSign} width={'13px'} height={'12px'} />
                    </Space>
                    <Space>
                      <CommonTextField
                        text={'Fear & Greed index:'}
                        fontSize={'8px'}
                        opacity={0.5}
                      />
                      <CommonTextField
                        text={stock?.fearGreedIndex}
                        color={Colors.green}
                        fontSize={'8px'}
                      />
                    </Space>
                    <Space>
                      <CommonTextField
                        text={'Overall Trend:'}
                        fontSize={'8px'}
                        opacity={0.5}
                      />
                      <CommonTextField
                        text={stock?.overallTrend}
                        color={Colors.green}
                        fontSize={'8px'}
                      />
                    </Space>
                  </Space>
                  <Space size={10} wrap={true}>
                    <img src={stock?.src} width={'36px'} height={'36px'} />
                    <Space size={3} direction="vertical">
                      <CommonTextField text={'Last'} opacity={0.5} />
                      <CommonTextField
                        text={stock?.prevPrice || ' '}
                        opacity={0.5}
                      />
                    </Space>
                    <Space size={3} direction="vertical">
                      <CommonTextField text={'Chg'} />
                      <CommonTextField
                        text={stock?.changeInPrice || ' '}
                        color={Colors.green}
                      />
                    </Space>
                    <Space size={3} direction="vertical">
                      <CommonTextField text={'Chg%'} />
                      <CommonTextField
                        text={stock?.changeInPercent || ' '}
                        color={Colors.green}
                      />
                    </Space>
                    <Space>
                      <img
                        src={Images[forGreen(stock?.color)]}
                        width={'21px'}
                        height={'21px'}
                      />
                      <img
                        src={Images[forYellow(stock?.color)]}
                        width={'21px'}
                        height={'21px'}
                      />
                      <img
                        src={Images[forRed(stock?.color)]}
                        width={'21px'}
                        height={'21px'}
                      />
                    </Space>
                  </Space>
                </Space>
              </Space>
            </Col>
          );
        })}

      {stocksList?.length === 0 && (
        <div style={{ width: '100%', marginTop: '30px' }}>
          <CommonHeading
            level={3}
            text={'No Stocks to show'}
            textAlign={'center'}
          />
        </div>
      )}
    </Row>
  );
};

export default Stock;
