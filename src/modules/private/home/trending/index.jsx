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
    key: 'name',
    width: '100px'
  },
  {
    title: 'Last',
    dataIndex: 'last',
    key: 'last',
    width: '100px'
  },
  {
    title: 'Chg',
    dataIndex: 'chg',
    key: 'chg',
    width: '100px'
  },
  {
    title: 'Chg%',
    dataIndex: 'chgPer',
    key: 'chgPer',
    width: '100px'
  },
  {
    title: 'F&G',
    dataIndex: 'fg',
    key: 'fg',
    width: '100px'
  }
];

const Trending = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const searchText = useSelector((state) => state?.user.search);

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

  let trendingItems = trending;

  if (searchText) {
    trendingItems = trendingItems?.filter((d) =>
      d.nameId.includes(searchText.toLowerCase())
    );
  }

  let dataSource = useMemo(
    () =>
      trendingItems?.map((t, i) => {
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
    [trendingItems]
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
        <div className="button-container">
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
          <div className="filter-parent">
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
          </div>
        </div>
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
