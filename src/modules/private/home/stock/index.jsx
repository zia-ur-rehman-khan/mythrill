import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './styles.scss';
import { Col, Row, Space } from 'antd';
import {
  CommonButton,
  CommonHeading,
  CommonModal,
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
  icons,
  signalClass
} from '../../../../constants';
import AddStock from '../market/addStock';
import styles from '../../../../theme/AppStyles';

const Stock = () => {
  const [isModal, setIsModal] = useState(false);

  const navigate = useNavigate();
  const stocksData = useSelector((state) => state?.stocks?.stocksData);
  const collapse = useSelector((state) => state?.stocks?.collapse);
  console.log('🚀 ~ file: index.jsx:33 ~ Stock ~ collapse:', collapse);

  const stocksList = useSelector((state) => state?.stocks?.stocksSubscribe);
  const searchText = useSelector((state) => state?.user.search);
  const filter = useSelector((state) => state?.stocks?.filter);

  const changeRoute = (id) => {
    navigate(`stock/${id}`);
  };

  let stocksItems = stocksList;

  if (searchText) {
    stocksItems = stocksItems?.filter((d) =>
      d.nameId.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  return (
    <>
      <Row gutter={[20, 20]}>
        {stocksItems?.length > 0 &&
          stocksItems?.map((stock) => {
            const stockDetailData = stocksData[stock?.nameId]?.data;

            const data = stockDetailData?.map((item) => ({
              x: Date.parse(item?.date),
              y: item?.currentPrice
            }));

            return (
              <Col
                lg={{ span: collapse ? 8 : 12 }}
                md={{ span: 24 }}
                sm={{ span: 24 }}
                xs={{ span: 24 }}
                key={stock?.slug}
                onClick={() => changeRoute(stock?.nameId)}
                className="child"
              >
                <Space className="box" direction="vertical">
                  {data?.length > 0 && (
                    <SmallChart
                      filter={filter}
                      color={stock?.color}
                      data={data}
                    />
                  )}
                  <Space
                    direction="vertical"
                    className={css(AppStyles.padding10)}
                  >
                    <Space size={10} wrap={true}>
                      <Space>
                        <CommonTextField text={stock?.title} fontWeight={600} />
                        <img
                          src={icons(stock)}
                          width={'13px'}
                          height={'12px'}
                        />
                      </Space>
                      <Space>
                        <CommonTextField
                          text={'Fear & Greed index:'}
                          fontSize={'8px'}
                          opacity={0.5}
                        />
                        <CommonTextField
                          text={stock?.fearGreedIndex}
                          color={stock?.color}
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
                          color={stock?.color}
                          fontSize={'8px'}
                        />
                      </Space>
                    </Space>
                    <Space size={10} wrap={true}>
                      <img
                        style={{ borderRadius: '50%' }}
                        src={stock?.src}
                        width={'36px'}
                        height={'36px'}
                      />
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
                          color={stock?.color}
                        />
                      </Space>
                      <Space size={3} direction="vertical">
                        <CommonTextField text={'Chg%'} />
                        <CommonTextField
                          text={stock?.changeInPercent || ' '}
                          color={stock?.color}
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
      </Row>
      {stocksItems?.length === 0 && (
        <>
          <div className="empty-stock">
            <img src={Images.emptyStock} width={'225px'} height={'216px'} />
            <CommonHeading
              level={1}
              text={'Stock Not Selected'}
              textAlign={'center'}
            />
            <CommonButton
              text={'Add Stock/Crypto'}
              background="rgba(118, 101, 193, 0.1)"
              onClick={() => setIsModal(true)}
            />
          </div>
          {isModal && (
            <CommonModal
              title={
                <CommonHeading
                  text={'Add Stock/Crypto'}
                  textAlign="center"
                  className={css(AppStyles.mBottom10)}
                />
              }
              isModalVisible={isModal}
              setIsModalVisible={setIsModal}
            >
              <AddStock />
            </CommonModal>
          )}
        </>
      )}
    </>
  );
};

export default Stock;
