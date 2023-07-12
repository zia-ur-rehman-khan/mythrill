import { Space, Table, Tabs } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { AppStyles, Images } from '../../../../theme';
import {
  CommonButton,
  CommonHeading,
  CommonTextField,
  Loader
} from '../../../../components';
import { css } from 'aphrodite';
import './styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  traendingFilter,
  trendingFilter,
  trendingImage
} from '../../../../services/utils';
import { useNavigate } from 'react-router';
import CommonTable from '../../../../components/common/CommonTable';
import { trendingListRequest } from '../../../../redux/slicers/user';
import {
  stockGraphManipulator,
  stocksNameManipulator,
  stocksdataManipulator
} from '../../../../manipulators/stocksName';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Last',
    dataIndex: 'last',
    key: 'last'
  },
  {
    title: 'Chg',
    dataIndex: 'chg',
    key: 'chg'
  },
  {
    title: 'Chg%',
    dataIndex: 'chgPer',
    key: 'chgPer'
  },
  {
    title: 'F&G',
    dataIndex: 'fg',
    key: 'fg'
  }
];

const Trending = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const navigator = useNavigate();

  useEffect(() => {
    dispatch(
      trendingListRequest({
        payloadData: {},
        responseCallback: (res) => {
          setLoading(false);

          if (res.status) {
            console.log(res, 'res');
            setTrending(stockGraphManipulator(res?.data?.data));
          } else {
            console.log(res.errors, 'error');
          }
        }
      })
    );
  }, []);

  let dataSource = useMemo(
    () =>
      trending?.map((t, i) => {
        const data = {
          key: i + 1,
          name: (
            <div className="trend-name">
              <img src={Images.netflix} width={'20px'} height={'20px'} />
              <CommonTextField text={t.title} />
            </div>
          ),
          last: t.prevPrice,
          chg: `$${t.changeInPrice}`,
          chgPer: `${t?.changeInPercent}%`,
          fg: t?.fearGreedIndex,
          color: t?.color
        };

        return data;
      }),
    [trending]
  );

  const filteredDataSource = useMemo(() => {
    switch (activeTab) {
      case 1:
        return dataSource?.filter((t) => t.color === 'green');
      case 2:
        return dataSource?.filter((t) => t.color === 'yellow');
      case 3:
        return dataSource?.filter((t) => t.color === 'red');
      default:
        return dataSource;
    }
  }, [activeTab, dataSource]);

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  const routeChange = () => {
    navigator(-1);
  };
  return (
    <div className="trending-main">
      <Space
        align="baseline"
        className={css(AppStyles.pointer)}
        onClick={routeChange}
      >
        <img src={Images.backArrow} />
        <CommonHeading level={3} text={'Back'} />
      </Space>

      <div className={`tabel-container`}>
        <Space className="button-container" wrap={true}>
          <Space>
            <CommonHeading
              level={3}
              text={`${trendingFilter(activeTab)} / Uptrend`}
            />
            <img
              src={Images[trendingImage(activeTab)]}
              width={'30px'}
              height={'30px'}
            />
          </Space>
          <Space className="filter-button">
            <CommonTextField
              text="Buy/uptrend"
              className={activeTab === 1 ? 'active' : ''}
              onClick={() => handleTabClick(1)}
            />
            <CommonTextField
              text="Hold/neutral"
              className={activeTab === 2 ? 'active' : ''}
              onClick={() => handleTabClick(2)}
            />
            <CommonTextField
              text="Sell/downtrend"
              className={activeTab === 3 ? 'active' : ''}
              onClick={() => handleTabClick(3)}
            />
          </Space>
        </Space>
        {loading ? (
          <Loader />
        ) : (
          <CommonTable dataSource={filteredDataSource} columns={columns} />
        )}
      </div>
    </div>
  );
};

export default Trending;
