import { Table } from 'antd';
import React from 'react';
import './styles.scss';

const CommonTable = ({ dataSource, columns }) => {
  return <Table pagination={false} dataSource={dataSource} columns={columns} />;
};

export default CommonTable;
