import React, { useEffect } from 'react';
import './styles.scss';
import { Select, Space } from 'antd';
import { CommonTextField } from '../common';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../redux/slicers/stocks';
import { useLocation } from 'react-router-dom';

const GraphFilter = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state?.stocks?.filter);
  const location = useLocation();

  const handleChange = (value) => {
    dispatch(setFilter(value));
  };

  const temp = [
    {
      value: 'all',
      label: 'All'
    },
    {
      value: '5Min',
      label: '5 Minute'
    },
    {
      value: '15Min',
      label: '15 Minute'
    },
    {
      value: '30Min',
      label: '30 Minute'
    },
    {
      value: '1H',
      label: '1 Hour'
    },
    {
      value: '4H',
      label: '4 Hour'
    },
    {
      value: '8H',
      label: '8 Hour'
    },
    {
      value: '1D',
      label: '1 Day'
    },
    {
      value: '1W',
      label: '1 Week'
    },
    {
      value: '1M',
      label: '1 Month'
    }
  ];

  useEffect(() => {
    handleChange('all');
  }, [location]);

  return (
    <Space className="select-parent">
      <CommonTextField text={'Timeframe:'} />
      <Select
        className="filter-select"
        defaultValue="all"
        style={{
          width: 200
        }}
        onChange={handleChange}
        options={temp}
      />
      {temp.map((t) => (
        <Space
          className={`filter-box ${t.value === filter && 'filter-active'}`}
          key={Math.random()}
          onClick={() => handleChange(t.value)}
        >
          <CommonTextField topClass={'small'} text={t.value} />
        </Space>
      ))}
    </Space>
  );
};

export default GraphFilter;
