import { Col, Space } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CommonTextField, Loader, SmallChart } from '../../../../components';
import {
  forGreen,
  forRed,
  forYellow,
  icons,
  startFilter
} from '../../../../constants';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { css } from 'aphrodite';
import { AppStyles, Images } from '../../../../theme';

const MainStock = ({ nameId }) => {
  const navigate = useNavigate();
  const [filterData, setFilterData] = useState([]);
  const [graphDetail, setGraphDetail] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const chartData = useSelector((state) => state?.stocks.stocksData);
  const filter = useSelector((state) => state?.stocks?.filter);

  const changeRoute = (id) => {
    navigate(`stock/${id}`);
  };

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      filterGraphData();
    }, 500);
  }, [chartData, filter]);

  const filterGraphData = async () => {
    const data = chartData[nameId]?.data;

    if (!_.isEmpty(data)) {
      const end = Date.now();

      if (filter !== 'all') {
        const filteredData = data?.filter(
          (t) =>
            moment(t.date).valueOf() >= startFilter(filter) &&
            moment(t.date).valueOf() <= end
        );

        if (filteredData?.length > 0) {
          const temp = filteredData[0];
          setGraphDetail(temp);
          if (filteredData?.length > 1) {
            setFilterData(filteredData);
          } else {
            setFilterData(
              data?.length > 0
                ? data?.slice(data?.length - 10, data?.length)
                : []
            );
          }
        } else {
          setFilterData(
            data?.length > 0 ? data?.slice(data?.length - 10, data.length) : []
          );
          setGraphDetail(data[data?.length - 1]);
        }
      } else {
        setFilterData(data);
        setGraphDetail(data[data?.length - 1]);
      }
    } else {
      setFilterData([]);
    }
    setIsLoading(false);
  };

  const manipulatedData = useMemo(() => {
    return filterData?.length > 0
      ? filterData?.map((item) => ({
          x: Date.parse(item?.date),
          y: item?.currentPrice
        }))
      : [];
  }, [filterData]);

  return (
    <Col
      lg={{ span: 8 }}
      md={{ span: 24 }}
      sm={{ span: 24 }}
      xs={{ span: 24 }}
      key={graphDetail?.id}
      onClick={() => changeRoute(graphDetail?.nameId)}
      className="child"
    >
      {isLoading ? (
        <Loader />
      ) : (
        <Space className="box" direction="vertical">
          <SmallChart color={graphDetail?.color} data={manipulatedData} />

          <Space direction="vertical" className={css(AppStyles.padding10)}>
            <Space size={10} wrap={true}>
              <Space>
                <CommonTextField
                  text={graphDetail?.title}
                  fontWeight={600}
                  className={'graph-title'}
                />
                <img src={icons(graphDetail)} width={'13px'} height={'12px'} />
              </Space>
              <Space>
                <CommonTextField
                  text={'Fear & Greed index:'}
                  fontSize={'8px'}
                  opacity={0.5}
                />
                <CommonTextField
                  text={graphDetail?.fearGreedIndex}
                  color={graphDetail?.color}
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
                  text={graphDetail?.overallTrend}
                  color={graphDetail?.color}
                  fontSize={'8px'}
                />
              </Space>
            </Space>
            <Space size={10} wrap={true}>
              <img
                style={{ borderRadius: '50%' }}
                src={graphDetail?.src}
                width={'36px'}
                height={'36px'}
              />
              <Space size={3} direction="vertical">
                <CommonTextField text={'Last'} opacity={0.5} />
                <CommonTextField
                  text={graphDetail?.prevPrice || ' '}
                  opacity={0.5}
                />
              </Space>
              <Space size={3} direction="vertical">
                <CommonTextField text={'Chg'} />
                <CommonTextField
                  text={graphDetail?.changeInPrice || ' '}
                  color={graphDetail?.color}
                />
              </Space>
              <Space size={3} direction="vertical">
                <CommonTextField text={'Chg%'} />
                <CommonTextField
                  text={graphDetail?.changeInPercent || ' '}
                  color={graphDetail?.color}
                />
              </Space>
              <Space>
                <img
                  src={Images[forGreen(graphDetail?.color)]}
                  width={'21px'}
                  height={'21px'}
                />
                <img
                  src={Images[forYellow(graphDetail?.color)]}
                  width={'21px'}
                  height={'21px'}
                />
                <img
                  src={Images[forRed(graphDetail?.color)]}
                  width={'21px'}
                  height={'21px'}
                />
              </Space>
            </Space>
          </Space>
        </Space>
      )}
    </Col>
  );
};

export default MainStock;
