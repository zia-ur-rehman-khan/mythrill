import { Dropdown } from 'antd';
import React from 'react';
import './styles.scss';

const CommonDropdown = ({ children, items }) => {
  return (
    <Dropdown
      placement="bottomRight"
      menu={{
        items
      }}
      trigger={['click']}
    >
      {children}
    </Dropdown>
  );
};

export default CommonDropdown;
