import React from 'react';
import './styles.scss';
import { Popover } from 'antd';

const CommonPopOver = ({
  className,
  arrow,
  content,
  children,
  title,
  trigger,
  width,
  placement,
  setVisible,
  visible
}) => {
  return (
    <Popover
      overlayClassName={'notification-popover'}
      className={className}
      arrow={arrow}
      content={content}
      title={title}
      placement={placement}
      overlayStyle={{ width: width }}
      trigger={trigger}
      visible={visible}
      onVisibleChange={(visible) => setVisible(visible)}
    >
      {children}
    </Popover>
  );
};

export default CommonPopOver;
