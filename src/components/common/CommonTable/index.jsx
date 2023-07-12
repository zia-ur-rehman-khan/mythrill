import { Table } from 'antd';
import React from 'react';
import './styles.scss';

const CommonTable = ({ dataSource, columns, loading }) => {
  return (
    <Table
      pagination={false}
      dataSource={dataSource}
      columns={columns}
      loading={loading}
    />
  );
};

export default CommonTable;
