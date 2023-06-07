import React from "react";
import "./styles.scss";
import { Popover } from "antd";

const CommonPopOver = ({
  className,
  arrow,
  content,
  children,
  title,
  trigger,
  width,
}) => {
  return (
    <Popover
      className={className}
      arrow={arrow}
      content={content}
      title={title}
      overlayStyle={{ width: width }}
      trigger={trigger}
    >
      {children}
    </Popover>
  );
};

export default CommonPopOver;
