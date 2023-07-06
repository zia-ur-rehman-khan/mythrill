import { Space, Table, Tabs } from 'antd';
import React, { useState } from 'react';
import { AppStyles, Images } from '../../../../theme';
import {
  CommonButton,
  CommonHeading,
  CommonTextField
} from '../../../../components';
import { css } from 'aphrodite';
import './styles.scss';
import { useSelector } from 'react-redux';
import { traendingFilter, trendingFilter } from '../../../../services/utils';

const Trending = () => {
  const stocksSubscribe = useSelector((state) => state?.stocks.stocksSubscribe);
  const [activeTab, setActiveTab] = useState(1);

  const dataSource = stocksSubscribe?.map((t, i) => {
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
      fg: t?.fearGreedIndex
    };

    return data;
  });

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

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };
  return (
    <div className="trending-main">
      <Space align="baseline">
        <img src={Images.backArrow} />
        <CommonHeading level={3} text={'Back'} />
      </Space>

      <div className={`tabel-container`}>
        <Space className="button-container">
          <CommonHeading
            level={3}
            text={`${trendingFilter(activeTab)} / Uptrend`}
          />
          <Space size={10} className="filter-button">
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
        <Table pagination={false} dataSource={dataSource} columns={columns} />
      </div>
    </div>
  );
};

export default Trending;
